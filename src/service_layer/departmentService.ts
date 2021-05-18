import { Department } from '../modals'
import { collection, OperationResult } from "./common";
import FirebaseCollection from './firebaseCollection'


export default class DepartmentService extends FirebaseCollection<Department> {
	constructor() {
		super("Departments");
	}
}

// const data:Department = {
// 	id:'CIVIL',
// 	faculties: {
// 	  studentAssigned: [ '17egjcs162@gitjaipur.com' ],
// 	  email: 'nitin.jain@gitjaipur.com'
// 	},
// 	name: 'Pata Nahi',
// 	abbrivation: 'CSE',
// 	hodEmail: 'hod.cse@gitjaipur.com'
//   }

// DepartmentService.departmentCollection.get().then((i)=>{
// 		i.forEach((j) =>  console.log(j.id,"---->",j.data()))
// 	})
// DepartmentService.getDepartmentDetail('CSE').then((i)=>{
// 	console.log(i.data);
// })

// DepartmentService.addDepartmentDetail(data).then((i)=>{
// 	console.log(i);
// })