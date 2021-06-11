import PendingRequest from "./pendingRequest";

import { firebase } from "../../firebase";
export default interface CompletedRequest extends PendingRequest {
	isAccepted: boolean;
	message?: string;
	verifiedBy: string;
	verifiedOn: firebase.firestore.Timestamp;
	title: string,
	comment?: string
}
