import { Company } from "../modals";
import { collection, OperationResult } from "./common";

export default class CompanyService {
static companyCollection = collection<Company>(
		"Companies"
	);
	static getCompanyDetail = async (
		id: string
	): Promise<OperationResult<Company>> => {
		try {
			let doc = await CompanyService.companyCollection
				.doc(id)
				.get();
			if (!doc.exists) {
				throw Error("Company Details not Found");
			}
			let data = await doc.data();
			return { data, successful: true };
		} catch (e) {
			return { successful: false, error: e?.message };
		}
	};
}


// CompanyService.companyCollection.get().then((i)=>{
// 		i.forEach((j) =>  console.log(j.id,"---->",j.data()))
// 	})

// CompanyService.getCompanyDetail('PDIwVSDUHZoc71y2qxeO').then((i)=>{
// 	console.log(i);
// })