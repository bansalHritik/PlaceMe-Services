import { JobApplication } from "../modals";
import { collection, OperationResult } from "./common";
export default class JobApplicationService {
    static jobApplicationCollection = collection<JobApplication>(
		"JobApplications"
	);
	static getJobApplicationDetail = async (
		id: string
	): Promise<OperationResult<JobApplication>> => {
		try {
			let doc = await JobApplicationService.jobApplicationCollection
				.doc(id)
				.get();
			if (!doc.exists) {
				throw Error("Job Application Details not Found");
			}
			let data = await doc.data();
			return { data, successful: true };
		} catch (e) {
			return { successful: false, error: e?.message };
		}
	};
}



// JobApplicationService.jobApplicationCollection.get().then((i)=>{
// 		i.forEach((j) =>  console.log(j.id,"---->",j.data()))
// 	})
// JobApplicationService.getJobApplicationDetail('l9OowOHzyKjIVqbW2IRZ').then((i)=>{
// 	console.log(i);
// })