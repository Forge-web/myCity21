import { resolve, join } from 'node:path'
import {
  createError,
  getHeader,
  type H3Event,
} from 'h3'

import { MAX_PHOTO_BYTES } from '#shared/types/announcements/photos'

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export function validateUuid(value: unknown): string {
  if (typeof value !== 'string' || !UUID_PATTERN.test(value)) {
    throw createError({
      statusCode: 400,
      message: 'Некорректный UUID',
    })
  }

  return value.toLowerCase()
}

export function getPhotosDirectory(): string {
  const config = useRuntimeConfig()

  return resolve(String(config.photosDir))
}

export function getPhotoPath(
  userId: string,
  photoId: string,
): string {
  return join(
    getPhotosDirectory(),
    validateUuid(userId),
    validateUuid(photoId),
  )
}

export async function requirePhotoOwner(
  event: H3Event,
): Promise<string> {
  // Защита мутаций от обычных межсайтовых запросов.
  // Не разрешай произвольный CORS для этих маршрутов.
  if (getHeader(event, 'x-photo-request') !== '1') {
    throw createError({
      statusCode: 403,
      message: 'Недопустимый запрос',
    })
  }

  const session = await requireUserSession(event)

  // UUID никогда не принимается из тела запроса или URL.
  return validateUuid(session.user.uuid)
}

export async function readPhotoBody(
  event: H3Event,
): Promise<Buffer> {
  const declaredLength = getHeader(event, 'content-length')

  if (
    declaredLength &&
    Number(declaredLength) > MAX_PHOTO_BYTES
  ) {
    throw createError({
      statusCode: 413,
      message: 'Размер фотографии превышает 10 МБ',
    })
  }

  const chunks: Buffer[] = []
  let size = 0

  // Node.js 20+.
  // При превышении лимита не уничтожаем соединение автоматически,
  // чтобы сервер мог вернуть ответ 413.
  for await (
    const chunk of event.node.req.iterator({
      destroyOnReturn: false,
    })
  ) {
    const buffer = Buffer.isBuffer(chunk)
      ? chunk
      : Buffer.from(chunk)

    size += buffer.length

    if (size > MAX_PHOTO_BYTES) {
      event.node.req.resume()

      throw createError({
        statusCode: 413,
        message: 'Размер фотографии превышает 10 МБ',
      })
    }

    chunks.push(buffer)
  }

  if (size === 0) {
    throw createError({
      statusCode: 400,
      message: 'Передан пустой файл',
    })
  }

  return Buffer.concat(chunks, size)
}
