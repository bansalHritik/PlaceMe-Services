export default interface PendingRequest {
	id: string;
	requestedOn: Date;
	studentEmail: string;
	updatesRequired: any;
}
