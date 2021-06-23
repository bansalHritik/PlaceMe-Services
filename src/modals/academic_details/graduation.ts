import SemesterDetail from "./semester";
import Batch from "./batch";

export default interface Graduation {
	rollNumber: string;
	semesters: SemesterDetail[];
	batch: Batch;
	department: string;
}
