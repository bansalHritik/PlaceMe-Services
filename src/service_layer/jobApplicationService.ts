import { JobApplication } from "../modals";
import { Collection, collection, OperationResult } from "./common";
import FirebaseCollection from './firebaseCollection';

export default class JobApplicationService extends FirebaseCollection<JobApplication> {
	constructor() {
		super(Collection.JOB_APPLICATIONS);
	}
}
