import { unlink } from 'node:fs/promises'
import {
  createError,
  defineEventHandler,
  getRouterParam,
} from 'h3'

import {
  getPhotoPath,
  requirePhotoOwner,
  validateUuid,
} from '../../utils/photos'

export default defineEventHandler(async (event) => {
  const userId = await requirePhotoOwner(event)
  const photoId = validateUuid(getRouterParam(event, 'id'))

  try {
    await unlink(getPhotoPath(userId, photoId))
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
      throw createError({
        statusCode: 500,
        message: 'Не удалось удалить фотографию',
      })
    }

    // Повторное удаление уже отсутствующего файла безопасно.
  }

  return { success: true }
})
