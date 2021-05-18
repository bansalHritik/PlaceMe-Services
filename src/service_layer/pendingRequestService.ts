import { PendingRequest } from '../modals'
import FirebaseCollection from './firebaseCollection';


export default class PendingRequestService extends FirebaseCollection<PendingRequest>{
    /**
	 *
	 */
	constructor() {
		super("PendingRequests");
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