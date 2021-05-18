import { JobApplication } from "../modals";
import { collection, OperationResult } from "./common";
import FirebaseCollection from './firebaseCollection';


export default class JobApplicationService extends FirebaseCollection<JobApplication> {
	constructor() {
		super("JobApplications");
	}
}

// const data:JobApplication ={
// 	status: {
// 	  roundsQualified: 5,
// 	  message: 'mt kr wait tu',
// 	  isPending: true
// 	},
// 	job: 'NErdTImczEBj15NQhs2x',
// 	isPlaced: false,
// 	studentEmail: '17egjcs162@gitjaipur.com'
//   }

// JobApplicationService.jobApplicationCollection.get().then((i)=>{
// 		i.forEach((j) =>  console.log(j.id,"---->",j.data()))
// 	})
// JobApplicationService.getJobApplicationDetail('l9OowOHzyKjIVqbW2IRZ').then((i)=>{
// 	console.log(i);
// })

// JobApplicationService.addJobApplicationDetail(data).then((i)=>{
// 	console.log(i);
// })