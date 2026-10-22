/**
 * 
 * returns a 16-character string
 */
export default () => {
	
	// 1. Получаем 16 случайных байт
	const bytes = new Uint8Array(16);
	crypto.getRandomValues(bytes);

	// 2. Устанавливаем версию 4 (старшие 4 бита 7-го байта в 0100)
	bytes[6] = (bytes[6]! & 0x0f) | 0x40;

	// 3. Устанавливаем вариант RFC 4122 (старшие биты 9-го байта в 10)
	bytes[8] = (bytes[8]! & 0x3f) | 0x80;

	// 4. Переводим в hex-строку с разделителями
	const toHex = (byte: any) => byte.toString(16).padStart(2, '0');

	return [
	Array.from(bytes.slice(0, 4)).map(toHex).join(''),
	Array.from(bytes.slice(4, 6)).map(toHex).join(''),
	Array.from(bytes.slice(6, 8)).map(toHex).join(''),
	Array.from(bytes.slice(8, 10)).map(toHex).join(''),
	Array.from(bytes.slice(10, 16)).map(toHex).join('')
	].join('-');

}