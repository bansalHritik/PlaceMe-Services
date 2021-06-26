import Salary from "./salary";
import Round from "./round";
import { Timestamp } from "../../utils";

export default interface Job {
	title: string;
	description: string;
	salary: Salary;
	bond: string;
	forBatchs: number[];
	lastDateToApply: Date | Timestamp;
	rounds: Round[];
	company: string;
	maxBacklogs: number;
	forDepartments: string[];
	postDate?: Timestamp;
	placedStudents?: string[];
	maxAcademicGap: number;
}
