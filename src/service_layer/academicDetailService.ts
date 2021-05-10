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
			console.log("hello bhai 1")
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
