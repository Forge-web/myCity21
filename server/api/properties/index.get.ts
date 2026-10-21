const PROPERTIES = [
  { id: 1, title: '2-комнатная квартира, 54 м²', price: 3200000, area: 54, rooms: 2, floor: 3, address: 'ул. Ленина, 12', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800', type: 'apartment', isNew: true },
  { id: 2, title: '1-комнатная квартира, 38 м²', price: 2100000, area: 38, rooms: 1, floor: 5, address: 'ул. Гагарина, 8', image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800', type: 'apartment' },
  { id: 3, title: 'Дом 120 м² с участком', price: 5800000, area: 120, rooms: 4, address: 'ул. Садовая, 45', image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800', type: 'house', isNew: true },
  { id: 4, title: '3-комнатная квартира, 78 м²', price: 4600000, area: 78, rooms: 3, floor: 2, address: 'ул. Московская, 21', image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800', type: 'apartment' },
]

export default defineEventHandler((event) => {
  const q = getQuery(event)
  let items = [...PROPERTIES]

  if (q.type) items = items.filter((p) => p.type === q.type)
  if (q.rooms) items = items.filter((p) => String(p.rooms) === q.rooms)
  if (q.minPrice) items = items.filter((p) => p.price >= Number(q.minPrice))
  if (q.maxPrice) items = items.filter((p) => p.price <= Number(q.maxPrice))
  if (q.limit) items = items.slice(0, Number(q.limit))

  return items
})