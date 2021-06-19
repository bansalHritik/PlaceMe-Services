import Salary from "./salary";
import Bond from "./bond";
import Period from "./period";
import Round from "./round";

export default interface Job {
	title: string;
	description: string;
	salary: Salary;
	bond: Bond;
	forBatchs: number[];
	lastDateToApply?: Date;
	isActive: boolean;
	rounds: Round[];
	company: string;
	forCourses: string[];
	maxBacklogs: number;
	forDepartments: string[];
	postDate?: Date;
	placedStudents: string[];
	maxAcademicGap: number;
}
