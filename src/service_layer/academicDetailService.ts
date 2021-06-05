import { AcademicDetail } from "./../modals";
import FirebaseCollection  from './firebaseCollection'


const col = new FirebaseCollection<AcademicDetail>("AcademicDetails");

export default class AcademicDetailService extends FirebaseCollection<AcademicDetail> {
	/**
	 *
	 */
	constructor() {
		super("AcademicDetails");
		
	}
	
}

// const data: AcademicDetail = {
// 	id: "17EGJCS162@gitjaipur.com",
// 	graduation: {
// 		course: 'MARCH',
// 		rollNumber: '17EGJCS161',
// 		batch: { passingYear: 2021, startingYear: 2017 },
// 		department: 'CSE',
// 		semesters: [{
// 			percentage: 75.0,
// 			marksheet: "sdddsds",
// 			activeBacklogs: 2
// 		}]
// 	},
// 	seniorSecondary: { percentage: 60, schoolName: 'lbs', board: 'RBSE' },
// 	secondary: { board: 'CBSE', schoolName: 'JVP', percentage: 95 },
// 	email: '17egjcs161@gitjaipur.com',
// 	academicGap: 1
// }

// col.update(data,"17EGJCS162@gitjaipur.com").then(i=>console.log(i));

// AcademicDetailService.addAcademicDetail(data).then((i) => {
// 	console.log(i);
// })


// AcademicDetailService.academicDetailCollection.get().then((i) => {
// 	i.forEach((j) => console.log(j.data().graduation.semesters))
// })

// AcademicDetailService.getAcademicDetail('17EGJCS162@gitjaipur.com').then((i)=>{
// 	console.log(i);
// })