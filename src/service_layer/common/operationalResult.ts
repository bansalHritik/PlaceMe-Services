export default interface OperationResult<T> {
	data?: T | null;
	successful: boolean;
	error?: string | undefined;
}
