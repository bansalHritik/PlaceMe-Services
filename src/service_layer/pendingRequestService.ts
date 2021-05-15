import { PendingRequest } from '../modals'
import { collection, OperationResult } from "./common";
export default class PendingRequestService {
    static pendingRequestCollection = collection<PendingRequest>(
		"PendingRequests"
	);
	static getPendingRequestDetail = async (
		id: string
	): Promise<OperationResult<PendingRequest>> => {
		try {
			let doc = await PendingRequestService.pendingRequestCollection
				.doc(id)
				.get();
			if (!doc.exists) {
				throw Error("PendingRequests Details not Found");
			}
			let data = await doc.data();
			return { data, successful: true };
		} catch (e) {
			return { successful: false, error: e?.message };
		}
	};
	static addPendingRequestDetail = async (data: PendingRequest): Promise<OperationResult<any>> => {
		try {
			await PendingRequestService.pendingRequestCollection
				.add(data);
			return { successful: true}
		}
		catch (e) {
			return { successful: false, error: "Failed to add PendingRequest data." }
		}

	}
}

// const data:PendingRequest = {
//   studentEmail: '17egjcs163@gitjaipur.com',
//   updatesRequired: {}
// }

// PendingRequestService.pendingRequestCollection.get().then((i)=>{
// 		i.forEach((j) =>  console.log(j.id,"---->",j.data()))
// 	})
// PendingRequestService.getPendingRequestDetail('g7fvDsheJH9liD6Z9yqN').then((i)=>{
// 	console.log(i.data);
// })

// PendingRequestService.addPendingRequestDetail(data).then((i)=>{
// 	console.log(i);
// })