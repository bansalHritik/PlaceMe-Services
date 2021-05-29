export default interface OperationResult<T> {
	result?: T | null;
	successful: boolean;
	error?: string | undefined;
}
