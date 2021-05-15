import SemesterDetail from "./semester";
import Batch from './batch';

export default interface CollegeDegree {
	rollNumber: string,
	semesters: SemesterDetail[],
	batch: Batch,
	department: string,
	course: string
};
