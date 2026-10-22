import { z } from 'zod'
import { users } from '#server/database/schema/users'
import { useDb } from '#server/utils/db'
import { eq } from 'drizzle-orm'

const db = useDb();

const bodySchema = z.object({
  login: z.string(),
  password: z.string().min(8),
})

export default defineEventHandler(async (event) => {
  const { login, password } = await readValidatedBody(event, bodySchema.parse)

  // Проверяем, существует ли пользователь
  const existingUser = await db!.query.users.findFirst({
    where: eq(users.login, login),
  })
  if (existingUser) {
    throw createError({ status: 409, message: 'User already exists' })
  }

  // Хешируем пароль и создаем пользователя
  const _hashedPassword = await hashPassword(password)
  const [newUser] = await db!.insert(users).values({
    login,
    password: _hashedPassword,
  }).$returningId()

  // Устанавливаем сессию для нового пользователя
  await setUserSession(event, {
    user: {
      uuid: newUser!.uuid,
      login: login,
    },
  })

  return { success: true }
})