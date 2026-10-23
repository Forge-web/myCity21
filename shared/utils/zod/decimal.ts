import { z } from 'zod';

export default z.number().refine(
		(val) => {
			// Check if the number has at most 2 decimal places
			const parts = val.toString().split('.');
			return parts.length < 2 || parts[1]!.length <= 2;
		},
		{ message: "Max 2 decimal places allowed" }
	);
