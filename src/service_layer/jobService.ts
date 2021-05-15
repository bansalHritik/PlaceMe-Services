import { Job } from '../modals'
import { collection, OperationResult } from "./common";
export default class JobService {
    static jobCollection = collection<Job>(
		"Jobs"
	);
	static getJobDetail = async (
		id: string
	): Promise<OperationResult<Job>> => {
		try {
			let doc = await JobService.jobCollection
				.doc(id)
				.get();
			if (!doc.exists) {
				throw Error("Jobs Details not Found");
			}
			let data = await doc.data();
			return { data, successful: true };
		} catch (e) {
			return { successful: false, error: e?.message };
		}
	};

	static addJobApplicationDetail = async (data: Job): Promise<OperationResult<any>> => {
		try {
			await JobService.jobCollection
				.add(data);
			return { successful: true}
		}
		catch (e) {
			return { successful: false, error: "Failed to add Department data." }
		}

	}
}

// const data:Job ={
// 	description: 'Package lai lo nagarro or mtx mai',
// 	rounds: [
// 	  { name: 'Aptitude', description: '100 m se 100 ane chaiye' },       
// 	  { name: 'Technical', description: 'DSA, OOPs pad k ana' }
// 	],
// 	maxBacklogs: 1,
// 	forCourses: [ 'B.Tech' ],
// 	forBatchs: [ 2021 ],
// 	maxAcademicGap: 1,
// 	title: 'Software Engineer',
// 	company: 'PDIwVSDUHZoc71y2qxeO',
// 	salary: { max: 550000, min: 450000 },
// 	isActive: true,
// 	forDepartments: [ 'CSE' ],
// 	bond: {
// 	  doesExist: false,
// 	  amount: 200000,
// 	  period: { day: 0, year: 0, month: 0 }
// 	},
// 	placedStudents: [],   
//   };


// JobService.jobCollection.get().then((i)=>{
// 		i.forEach((j) =>  console.log(j.id,"---->",j.data()))
// 	})
// JobService.getJobDetail('NErdTImczEBj15NQhs2x').then((i)=>{
// 	console.log(i.data);
// })

// JobService.addJobApplicationDetail(data).then((i)=>{
// 	console.log(i.data);
// })