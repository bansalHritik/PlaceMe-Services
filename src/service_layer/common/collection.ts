import { firebase } from "../../firebase";
import converter from "./convertor";

const collection = <T>(collectionName: string) => {
	return firebase
		.firestore()
		.collection(collectionName)
		.withConverter(converter<T>());
};

export const Collection = {
	ACADEMIC_DETAIL: "AcademicDetails",
	COMPANIES: "Companies",
	COMPLETED_REQUESTS: "CompletedRequests",
	COURSES: "Courses",
	DEPARTMENTS: "Departments",
	JOB_APPLICATIONS: "JobApplications",
	JOBS: "Jobs",
	PENDING_REQUESTS: "PendingRequests",
	PERSONAL_DETAIL: "PersonalDetails",
	PLACED_STUDENTS: "PlacedStudents",
	USERS: "Users",
};

export default collection;
