export const arrayTo = (length: number): number[] => {
	return [...Array(length).keys()]
}

export const ordinalDay = (day: number): string => {
	switch (day) {
		case 1:
			return `1st`
		case 2:
			return `2nd`
		case 3:
			return `3rd`
		case 21:
			return `21st`
		case 22:
			return `22nd`
		case 23:
			return `23rd`
		case 31:
			return `31st`
		// future proof!
		case 32:
			return `32nd`
		case 33:
			return `33rd`
		default:
			return day + "th"
	}
}
