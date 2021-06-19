import { Job, JobApplication } from "../modals";
import { Collection, OperationResult, Result } from "./common";
import FirebaseCollection from "./firebaseCollection";
import { firebase } from "../firebase";

export default class JobApplicationService extends FirebaseCollection<JobApplication> {
	constructor() {
		super(Collection.JOB_APPLICATIONS);
	}
	public async add(
		jobId: JobApplication | string
	): Promise<OperationResult<Result<JobApplication>>> {
		const id = jobId as string;
		const studentEmail = firebase.auth().currentUser?.email!;

		try {
			const { empty } = await this.collection
				.where("studentEmail", "==", studentEmail)
				.where("job", "==", id)
				.get();

			if (!empty) {
				throw new Error("You have already applied to this Job");
			}

			const jobApplication: JobApplication = {
				isPlaced: false,
				job: id,
				status: { isPending: true, roundsQualified: 0, message: "" },
				studentEmail,
			};
			return super.add(jobApplication);
		} catch (error) {
			return { successful: false, error };
		}
	}
}
