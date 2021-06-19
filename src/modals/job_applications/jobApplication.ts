import Status from "./status";

export default interface JobApplication {
	isPlaced: boolean;
	job: string;
	status: Status;
	studentEmail: string;
}
