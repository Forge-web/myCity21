import { z } from 'zod'
import { users } from '#server/database/schema'
import { useDb } from '#server/utils/db'
import { eq } from 'drizzle-orm'

const db = useDb();

const bodySchema = z.object({
	login: z.string(),
	password: z.string(),
})

export default defineEventHandler(async (event) => {
  const { login, password } = await readValidatedBody(event, bodySchema.parse)

  // Ищем пользователя по login
  const user = await db!.query.users.findFirst({
    where: eq(users.login, login),
  })
  console.log(password)
  // Проверяем пароль (важно использовать одинаковое сообщение об ошибке)
  if (!user || !(await verifyPassword(user.password, password))) {
    throw createError({ status: 401, message: 'Invalid credentials' })
  }

  // Устанавливаем сессию
  await setUserSession(event, {
    user: {
      uuid: user.uuid,
      login: user.login,
    },
  })

  return { success: true }
})