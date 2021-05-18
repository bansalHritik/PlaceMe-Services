import { Job } from '../modals'
import FirebaseCollection from './firebaseCollection';

export default class JobService extends FirebaseCollection<Job> {
	/**
	 *
	 */
	constructor() {
		super("Jobs");
		
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