import Status from "./status";

export default interface JobApplication {
	id?: string;
	isPlaced: boolean;
	job: string;
	status: Status;
	studentEmail: string;
}
