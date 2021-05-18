import { PlacedStudent } from '../modals';
import FirebaseCollection from './firebaseCollection';

export default class PlacedStudentService extends FirebaseCollection<PlacedStudent> {
	constructor() {
		super("PlacedStudents");
	}
}



// PlacedStudentService.placedStudentCollection.get().then((i)=>{
// 		i.forEach((j) =>  console.log(j.id,"---->",j.data()))
// 	})
// PlacedStudentService.getPlacedStudentDetail('cDPO96sVbzw4lrR0egzF').then((i)=>{
// 	console.log(i);
// })