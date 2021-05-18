import { Course } from "../modals";
import { collection, OperationResult } from "./common";
import FirebaseCollection from './firebaseCollection'


export default class CourseService extends FirebaseCollection<Course> {
	constructor() {
		super("Courses");
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
