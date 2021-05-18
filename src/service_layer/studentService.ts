import { Student } from '../modals'
import FirebaseCollection from './firebaseCollection';


export default class StudentService extends FirebaseCollection<Student>{
	constructor() {
		super("Students");
	}
}

// StudentService.studentCollection.get().then((i)=>{
// 		i.forEach((j) =>  console.log(j.id,"---->",j.data()))
// 	})
// StudentService.getStudentDetail('17egjcs161@gitjaipur.com').then((i)=>{
// 	console.log(i);
// })