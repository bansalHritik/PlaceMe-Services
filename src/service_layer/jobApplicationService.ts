import { Job, JobApplication } from "../modals";
import { Collection, OperationResult, Result } from "./common";
import FirebaseCollection from "./firebaseCollection";
import { firebase } from "../firebase";
import { generateJobApplicationId } from "../utils";

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
			return super.set(
				jobApplication,
				generateJobApplicationId(id, studentEmail)
			);
		} catch (error) {
			return { successful: false, error };
		}
	}

	public getAllApplicationsOfCurrentUser(): Promise<
		OperationResult<Result<JobApplication>[]>
	> {
		const currentUserEmail = firebase.auth().currentUser?.email!;
		return this.getApplicationsOf(currentUserEmail);
	}

	private async getApplicationsOf(
		userId: string
	): Promise<OperationResult<Result<JobApplication>[]>> {
		try {
			const result: Result<JobApplication>[] = [];
			const { docs } = await this.collection
				.where("studentEmail", "==", userId)
				.get();
			docs.forEach((doc) => {
				result.push({ data: doc.data(), id: doc.id });
			});
			return { successful: true, result };
		} catch (error) {
			return { successful: false, error };
		}
	}
}
