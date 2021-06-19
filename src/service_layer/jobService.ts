import { Job } from "../modals";
import { Collection } from "./common";
import FirebaseCollection from "./firebaseCollection";

export default class JobService extends FirebaseCollection<Job> {
	constructor() {
		super(Collection.JOBS);
	}
}
