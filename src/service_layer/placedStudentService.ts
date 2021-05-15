import { PlacedStudent } from '../modals'
import { collection, OperationResult } from "./common";
export default class PlacedStudentService {
    static placedStudentCollection = collection<PlacedStudent>(
		"PlacedStudents"
	);
	static getPlacedStudentDetail = async (
		id: string
	): Promise<OperationResult<PlacedStudent>> => {
		try {
			let doc = await PlacedStudentService.placedStudentCollection
				.doc(id)
				.get();
			if (!doc.exists) {
				throw Error("PlacedStudents Details not Found");
			}
			let data = await doc.data();
			return { data, successful: true };
		} catch (e) {
			return { successful: false, error: e?.message };
		}
	};
}

// PlacedStudentService.placedStudentCollection.get().then((i)=>{
// 		i.forEach((j) =>  console.log(j.id,"---->",j.data()))
// 	})
// PlacedStudentService.getPlacedStudentDetail('cDPO96sVbzw4lrR0egzF').then((i)=>{
// 	console.log(i);
// })