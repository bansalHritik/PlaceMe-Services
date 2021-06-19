import { PendingRequest } from "./pendingRequest";
import { Timestamp } from "../../utils";
export default interface CompletedRequest extends PendingRequest {
	isAccepted: boolean;
	message?: string;
	verifiedBy: string;
	verifiedOn: Timestamp;
}
