import SemesterDetail from "./semester";
import Batch from './batch';

export default interface CollegeDegree {
	rollNum: string,
	semesters: SemesterDetail,
	batch: Batch,
	department: string,
	academicGap: number,
};
