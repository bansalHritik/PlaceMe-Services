export default interface Result<T> extends ResultWithId {
	data?: T;
}

export interface ResultWithId {
	id?: string;
}
