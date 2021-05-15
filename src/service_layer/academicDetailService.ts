import { AcademicDetail } from "./../modals";
import { collection, OperationResult } from "./common";


export default class AcademicDetailService {
	static academicDetailCollection = collection<AcademicDetail>(
		"AcademicDetails"
	);
	static getAcademicDetail = async (
		id: string
	): Promise<OperationResult<AcademicDetail>> => {
		try {
			let doc = await AcademicDetailService.academicDetailCollection
				.doc(id)
				.get();
			if (!doc.exists) {
				throw Error("Academic Details not Found");
			}
			let data = await doc.data();
			return { data, successful: true };
		} catch (e) {
			return { successful: false, error: e?.message };
		}
	};

	static addAcademicDetail = async (data: AcademicDetail): Promise<OperationResult<any>> => {
		try {
			await AcademicDetailService.academicDetailCollection
				.doc(data.id)
				.set(data);
			return { successful: true}
		}
		catch (e) {
			return { successful: false, error: "Failed to add academic data." }
		}

	}
}

// const data: AcademicDetail = {
// 	id: "17EGJCS162@gitjaipur.com",
// 	graduation: {
// 		course: 'B.Tech',
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


// AcademicDetailService.addAcademicDetail(data).then((i) => {
// 	console.log(i);
// })


// AcademicDetailService.academicDetailCollection.get().then((i) => {
// 	i.forEach((j) => console.log(j.data().graduation.semesters))
// })

// AcademicDetailService.getAcademicDetail('17EGJCS162@gitjaipur.com').then((i)=>{
// 	console.log(i);
// })