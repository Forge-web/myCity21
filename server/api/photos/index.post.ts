import { randomUUID } from 'node:crypto'
import { mkdir, rename, rm, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import sharp from 'sharp'

import {
  createError,
  defineEventHandler,
  getHeader,
  setResponseStatus,
} from 'h3'

import {
  PHOTO_INPUT_TYPES,
  type ListingPhoto,
} from '#shared/types/announcements/photos'

import {
  getPhotosDirectory,
  readPhotoBody,
  requirePhotoOwner,
} from '../../utils/photos'

export default defineEventHandler(
  async (event): Promise<ListingPhoto> => {
    const userId = await requirePhotoOwner(event)

    const contentType = (
      getHeader(event, 'content-type') ?? ''
    ).split(';')[0]!.trim().toLowerCase()

    if (
      !PHOTO_INPUT_TYPES.some(type => type === contentType)
    ) {
      throw createError({
        statusCode: 415,
        message: 'Разрешены только JPEG, PNG и WebP',
      })
    }

    const input = await readPhotoBody(event)

    const converted = await (async () => {
      try {
        const image = sharp(input, {
          limitInputPixels: 40_000_000,
          failOn: 'warning',
        })

        const metadata = await image.metadata()

        // Не доверяем Content-Type клиента.
        if (
          !metadata.format ||
          !['jpeg', 'png', 'webp'].includes(metadata.format)
        ) {
          throw new Error('Unsupported image')
        }

        if ((metadata.pages ?? 1) !== 1) {
          throw new Error('Animated image')
        }

        return await image
          .rotate()
          .resize({
            width: 2560,
            height: 2560,
            fit: 'inside',
            withoutEnlargement: true,
          })
          .webp({ quality: 85 })
          .toBuffer({ resolveWithObject: true })
      } catch {
        throw createError({
          statusCode: 422,
          message:
            'Не удалось обработать фотографию. ' +
            'Нужен корректный JPEG, PNG или WebP ' +
            'без анимации и размером до 40 мегапикселей.',
        })
      }
    })()

    const photoId = randomUUID()
    const directory = join(getPhotosDirectory(), userId)

    await mkdir(directory, { recursive: true })

    const destination = join(directory, photoId)
    const temporary = join(
      directory,
      `.${photoId}.${randomUUID()}.tmp`,
    )

    // В итоговом пути файл появляется только после полной записи.
    try {
      await writeFile(temporary, converted.data, {
        flag: 'wx',
        mode: 0o600,
      })

      await rename(temporary, destination)
    } finally {
      await rm(temporary, { force: true })
    }

    setResponseStatus(event, 201)

    return {
      id: photoId,
      url: `/images/${userId}/${photoId}`,
      width: converted.info.width,
      height: converted.info.height,
      size: converted.info.size,
    }
  },
)
