export default interface Course {
	id: string;
	name: string;
	abbrivation: string;
	numberOfSemester: number;
	timeDurationInYears: number;
	departments: string[];
}
