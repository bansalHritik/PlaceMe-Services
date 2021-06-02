import { PendingRequest } from '../modals'
import FirebaseCollection from './firebaseCollection';

export default class PendingRequestService extends FirebaseCollection<PendingRequest>{
    
	constructor() {
		super("PendingRequests");
	}
}