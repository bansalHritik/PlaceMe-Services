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

	static addCompanyDetail = async (data: Company): Promise<OperationResult<any>> => {
		try {
			await CompanyService.companyCollection
				.add(data);
			return { successful: true }
		}
		catch (e) {
			return { successful: false, error: "Failed to add company data." }
		}

	}
}

// const data:Company = {
// 	  name: 'Apple',
// 	  type: 'product',
// 	  logo: 'https://pbs.twimg.com/profile_images/1370380607365246977/py2NQaCZ_400x400.pngQaCZ_400x400.png',
// 	  representatives: [  {
// 		mobile: 9639633699,
// 		email: 'tanya.jain@nagarro.com',
// 		name: 'tanya jain'
// 	  } ],
// 	  website: 'nagarro.com',
// 	  otherDetails: 'Bekar Company'
//   }


// CompanyService.companyCollection.get().then((i)=>{
// 		i.forEach((j) =>  console.log(j.id,"---->",j.data()))
// 	})

// CompanyService.getCompanyDetail('PDIwVSDUHZoc71y2qxeO').then((i)=>{
// 	console.log(i);
// })

// CompanyService.addCompanyDetail(data).then((i)=>{
// 	console.log(i);
// })