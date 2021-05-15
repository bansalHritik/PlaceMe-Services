import { Student } from '../modals'
import { collection, OperationResult } from "./common";
export default class StudentService {
    static studentCollection = collection<Student>(
		"Students"
	);
	static getStudentDetail = async (
		id: string
	): Promise<OperationResult<Student>> => {
		try {
			let doc = await StudentService.studentCollection
				.doc(id)
				.get();
			if (!doc.exists) {
				throw Error("Students Details not Found");
			}
			let data = await doc.data();
			return { data, successful: true };
		} catch (e) {
			return { successful: false, error: e?.message };
		}
	};
}

// StudentService.studentCollection.get().then((i)=>{
// 		i.forEach((j) =>  console.log(j.id,"---->",j.data()))
// 	})
// StudentService.getStudentDetail('17egjcs161@gitjaipur.com').then((i)=>{
// 	console.log(i);
// })