import { Department } from '../modals'
import { collection, OperationResult } from "./common";

export default class DepartmentService {
    static departmentCollection = collection<Department>(
		"Departments"
	);
	static getDepartmentDetail = async (
		id: string
	): Promise<OperationResult<Department>> => {
		try {
			let doc = await DepartmentService.departmentCollection
				.doc(id)
				.get();
			if (!doc.exists) {
				throw Error("Departments Details not Found");
			}
			let data = await doc.data();
			return { data, successful: true };
		} catch (e) {
			return { successful: false, error: e?.message };
		}
	};

	static addDepartmentDetail = async (data: Department): Promise<OperationResult<any>> => {
		try {
			await DepartmentService.departmentCollection
				.doc(data.id)
				.set(data);
			return { successful: true}
		}
		catch (e) {
			return { successful: false, error: "Failed to add Department data." }
		}

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