import { CompletedRequest } from "../modals";
import { Collection } from "./common";
import FirebaseCollection from './firebaseCollection'

export default class CompletedRequestService extends FirebaseCollection<CompletedRequest>{

	constructor() {
		super(Collection.COMPLETED_REQUESTS);
	}
}