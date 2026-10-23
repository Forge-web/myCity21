export type createAnnouncements = {
	title: string,
	description?: string,
	price: number | null,
	area?: number,
	rooms?: number,
	address: string,
	images?: string[],
	previewImage?: string,
	activity: boolean
}