export type DeepPartial<T> = T extends Function
	? T
	: T extends object
	? T extends unknown[]
		? DeepPartial<T[number]>[]
		: { [P in keyof T]?: DeepPartial<T[P]> }
	: T;
