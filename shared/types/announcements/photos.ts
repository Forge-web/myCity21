export const MAX_PHOTO_BYTES = 10 * 1024 * 1024
export const MAX_LISTING_PHOTOS = 20

export const PHOTO_INPUT_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
] as const

export interface ListingPhoto {
	id: string
	url: string
	width: number
	height: number
	size: number
}
