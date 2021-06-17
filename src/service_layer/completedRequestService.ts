import { CompletedRequest } from "../modals";
import { Collection, OperationResult, Result } from "./common";
import FirebaseCollection from './firebaseCollection';
import { firebase } from '../firebase'

export default class CompletedRequestService extends FirebaseCollection<CompletedRequest>{

	constructor() {
		super(Collection.COMPLETED_REQUESTS);
	}

	private async getCompletedRequestOf(id: string): Promise<OperationResult<Result<CompletedRequest>[]>> {
		try {
			const { docs } = await this.collection.where('studentEmail', '==', id).get();
			let resultDocuments: Result<CompletedRequest>[] = [];
			docs.forEach((doc) => {
				const data = doc.data();
				resultDocuments.push({ data, id: doc.id });
			});
			return { successful: true, result: resultDocuments };
		} catch (error) {
			return { successful: false, error };
		}
	}

	public async getCurrentUserCompletedRequests(): Promise<OperationResult<Result<CompletedRequest>[]>> {
		return this.getCompletedRequestOf(firebase.auth().currentUser?.email ?? '');
	}

}