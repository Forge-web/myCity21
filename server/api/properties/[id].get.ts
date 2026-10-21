import propertiesHandler from './index.get'

export default defineEventHandler((event) => {
  const id = Number(getRouterParam(event, 'id'))
  const list = propertiesHandler(event) as any[]
  return list.find((p) => p.id === id) ?? null
})