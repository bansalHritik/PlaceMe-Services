import Secondary from "./secondary";
import SeniorSecondary from "./seniorSecondary";
import Graduation from "./graduation";
import PostGraduation from "./graduation";

export default interface AcademicDetail {
	id: string;
	email: string;
	secondary: Secondary;
	seniorSecondary: SeniorSecondary;
	graduation: Graduation;
	postGraduation: PostGraduation;
	academicGap: number;
};
