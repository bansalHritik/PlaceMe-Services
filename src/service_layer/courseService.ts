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

	static addCourseDetail = async (data: Course): Promise<OperationResult<any>> => {
		try {
			await CourseService.courseCollection
				.doc(data.id)
				.set(data);
			return { successful: true}
		}
		catch (e) {
			return { successful: false, error: "Failed to add Course data." }
		}

	}
}

// const data:Course = {
// 	id:'M.Tech',
// 	departments: [ 'CSE' ],
// 	name: 'Master in Technology',
// 	numOfSemester: 4,
// 	timeDurationInYear: 2,
// 	abbrivation: 'M.Tech'
//   }

// CourseService.courseCollection.get().then((i)=>{
// 		i.forEach((j) =>  console.log(j.id,"---->",j.data()))
// 	})
// CourseService.getCourseDetail('B.Tech').then((i)=>{
// 	console.log(i.data);
// })

// CourseService.addCourseDetail(data).then((i)=>{
// 	console.log(i);
// })
