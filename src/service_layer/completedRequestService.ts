import { CompletedRequest } from "../modals";
import { collection, OperationResult } from "./common";

export default class CompletedRequestService {
    static completedRequestCollection = collection<CompletedRequest>(
		"CompletedRequests"
	);
	static getCompletedRequestDetail = async (
		id: string
	): Promise<OperationResult<CompletedRequest>> => {
		try {
			let doc = await CompletedRequestService.completedRequestCollection
				.doc(id)
				.get();
			if (!doc.exists) {
				throw Error("Completed Request Details not Found");
			}
			let data = await doc.data();
			return { data, successful: true };
		} catch (e) {
			return { successful: false, error: e?.message };
		}
	};
}

// CompletedRequestService.completedRequestCollection.get().then((i)=>{
// 		i.forEach((j) =>  console.log(j.id,"---->",j.data()))
// 	})
// CompletedRequestService.getCompletedRequestDetail('c4NhJaB3DxjH2WqqKUYr').then((i)=>{
// 	console.log(i);
// })