import { CompletedRequest } from "../modals";
import FirebaseCollection from './firebaseCollection'

export default class CompletedRequestService extends FirebaseCollection<CompletedRequest>{

	constructor() {
		super("CompletedRequests");
	}
}
/**
 * static completedRequestCollection = collection<CompletedRequest>(
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

	static addCompletedRequestDetail = async (data: CompletedRequest): Promise<OperationResult<any>> => {
		try {
			await CompletedRequestService.completedRequestCollection
				.add(data);
			return { successful: true }
		}
		catch (e) {
			return { successful: false, error: "Failed to add CompletedRequest data." }
		}
 */

// const data:CompletedRequest = {
//     message: 'nahi hua tera update',
//     verifiedBy: 'nitin.jain@gitjaipur.com',
//     studentEmail: '17egjcs161@gitjaipur.com',
//     isAccepted: true,    
//     updatesRequired: {},      
//   }


// CompletedRequestService.getCompletedRequestDetail('c4NhJaB3DxjH2WqqKUYr').then((i)=>{
// 	console.log(i);
// })

// CompletedRequestService.addCompletedRequestDetail(data).then((i)=>{
// 	console.log(i);
// })

// CompletedRequestService.completedRequestCollection.get().then((i)=>{
// 		i.forEach((j) =>  console.log(j.id,"---->",j.data()))
// 	})