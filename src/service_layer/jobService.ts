import { Job } from "../modals";
import { Collection, OperationResult, Result } from "./common";
import FirebaseCollection from "./firebaseCollection";
import { firebase } from "../firebase";

export default class JobService extends FirebaseCollection<Job> {
	constructor() {
		super(Collection.JOBS);
	}

	public add(data: Job): Promise<OperationResult<Result<Job>>> {
		data.placedStudents = [];
		const { lastDateToApply } = data
		data.postDate = firebase.firestore.Timestamp.now();
		data.lastDateToApply = firebase.firestore.Timestamp.fromDate(lastDateToApply as Date)
		return super.add(data);
	}

	public async set(data: Job, id: string): Promise<OperationResult<Result<Job>>> {
		try {
			await this.collection.doc(id).set(data, { merge: true });
			const { lastDateToApply } = data;
			data.lastDateToApply = firebase.firestore.Timestamp.fromDate(lastDateToApply as Date)
			return this.successResult({ data, id });
		} catch (error) {
			return { successful: false, error };
		}
	}

	public async getAllByCompanyId(
		id: string
	): Promise<OperationResult<Result<Job>[]>> {
		try {
			const { docs } = await this.collection.where("company", "==", id).get();
			const result: Result<Job>[] = [];
			docs.forEach((doc) => {
				const { id } = doc;
				const data = doc.data();
				result.push({ data, id });
			});
			return { successful: true, result: result };
		} catch (error) {
			return { successful: false, error };
		}
	}
}
