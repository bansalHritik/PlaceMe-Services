import { Job } from "../modals";
import { Collection, OperationResult, Result } from "./common";
import FirebaseCollection from "./firebaseCollection";
import { firebase } from "../firebase";

export default class JobService extends FirebaseCollection<Job> {
	constructor() {
		super(Collection.JOBS);
	}

	public async add(data: Job): Promise<OperationResult<Result<Job>>> {
		data.placedStudents = [];
		data.postDate = firebase.firestore.Timestamp.now();
		return super.add(data);
	}
}
