import { AcademicDetail } from "./../modals";
import { collection, OperationResult } from "./common";


export default class AcademicDetailService {
	private static academicDetailCollection = collection<AcademicDetail>(
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
}

// AcademicDetailService.academicDetailCollection.get().then((i)=>{
// 	i.forEach((j) =>  console.log(j.data()))
// })

AcademicDetailService.getAcademicDetail('17egjcs161@gitjaipur.com').then((i)=>{
	console.log(i);
})