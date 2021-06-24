import { Timestamp } from "./timestamp";
export * from "./constants";
export * from "./deepPartial";
export * from "./timestamp";

export const resolveDate = (date: Timestamp) => new Date(date.toDate());

export const isObject = (obj: any) => typeof obj === "object";

export const map = (source: any, target: any) => {
	if (!isObject(source) || !isObject(target)) {
		return;
	}

	Object.keys(source).forEach((key) => {
		const sourceValue = source[key];
		const targetValue = target[key];
		if (!targetValue || !isObject(sourceValue) || !isObject(targetValue)) {
			target[key] = source[key];
		} else {
			map(source[key], target[key]);
		}
	});
};

export const generateJobApplicationId = (id: string, email: string): string =>
	id + "#" + email;
