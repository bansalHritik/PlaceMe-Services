import { PendingRequest } from '../modals'
import { OperationResult, Result } from './common';
import FirebaseCollection from './firebaseCollection';


export default class PendingRequestService extends FirebaseCollection<PendingRequest>{

	constructor() {
		super("PendingRequests");
	}

	public async update(
		data: PendingRequest,
		id: string
	): Promise<OperationResult<Result<PendingRequest>>> {
		try {
			const { type } = data;
			await this.collection.doc(id).update(data);
			return this.successResult();
		} catch (error) {
			return { successful: false, error }
		}
	}
}