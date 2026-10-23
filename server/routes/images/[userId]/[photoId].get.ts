import { readFile } from 'node:fs/promises'

import {
  createError,
  defineEventHandler,
  getRouterParam,
  setResponseHeaders,
} from 'h3'

import {
  getPhotoPath,
  validateUuid,
} from '../../../utils/photos'

export default defineEventHandler(async (event) => {
  const userId = validateUuid(
    getRouterParam(event, 'userId'),
  )

  const photoId = validateUuid(
    getRouterParam(event, 'photoId'),
  )

  let image: Buffer

  try {
    image = await readFile(getPhotoPath(userId, photoId))
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code

    if (code === 'ENOENT') {
      throw createError({
        statusCode: 404,
        message: 'Фотография не найдена',
      })
    }

    throw createError({
      statusCode: 500,
      message: 'Не удалось прочитать фотографию',
    })
  }

  setResponseHeaders(event, {
    'Content-Type': 'image/webp',
    'Content-Length': String(image.length),
    'X-Content-Type-Options': 'nosniff',

    // URL неизменяемый: для другого изображения создаётся новый UUID.
    'Cache-Control': 'public, max-age=31536000, immutable',
  })

  return image
})
