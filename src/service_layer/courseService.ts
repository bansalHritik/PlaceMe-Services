import { Course } from "../modals";
import { Collection, collection, OperationResult } from "./common";
import FirebaseCollection from "./firebaseCollection";

export default class CourseService extends FirebaseCollection<Course> {
	constructor() {
		super(Collection.COURSES);
	}
}
