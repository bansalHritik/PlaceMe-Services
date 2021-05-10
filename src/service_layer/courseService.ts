import { Course } from "../modals";
import { collection, OperationResult } from "./common";

export default class CourseService {
     static courseCollection = collection<Course>(
		"Courses"
	);
	static getCourseDetail = async (
		id: string
	): Promise<OperationResult<Course>> => {
		try {
			let doc = await CourseService.courseCollection
				.doc(id)
				.get();
			if (!doc.exists) {
				throw Error("Courses Details not Found");
			}
			let data = await doc.data();
			return { data, successful: true };
		} catch (e) {
			return { successful: false, error: e?.message };
		}
	};
}


// CourseService.courseCollection.get().then((i)=>{
// 		i.forEach((j) =>  console.log(j.id,"---->",j.data()))
// 	})
// CourseService.getCourseDetail('B.Tech').then((i)=>{
// 	console.log(i);
// })