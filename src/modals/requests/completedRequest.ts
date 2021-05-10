import PendingRequest from "./pendingRequest";

export default interface CompletedRequest extends PendingRequest {
	isAccepted: boolean;
	message: string;
	verifiedBy: string;
	verifiedOn: Date;
}
