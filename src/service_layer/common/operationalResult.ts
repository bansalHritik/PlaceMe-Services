export default interface OperationResult<T> {
	data?: T;
	successful: boolean;
	error?: string | undefined;
}
