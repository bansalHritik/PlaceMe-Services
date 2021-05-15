import PersonalDetail from "../modals/personal_details/personalDetail";
import { collection, OperationResult } from "./common";

export default class PersonalDetailService {
	static personalDetailCollection = collection<PersonalDetail>(
		"PersonalDetails"
	);

	static getPersonalDetail = async (
		id: string
	): Promise<OperationResult<PersonalDetail>> => {
		try {
			let personalDetailRef = await PersonalDetailService.personalDetailCollection
				.doc(id)
				.get();
			if (!personalDetailRef.exists) {
				throw Error("Personal details not found");
			}
			let data = await personalDetailRef.data();
			return { data, successful: true };
		} catch (e) {
			return { successful: false, error: e?.message };
		}
	};

	static addPersonalDetail = async (data: PersonalDetail): Promise<OperationResult<any>> => {
		try {
			await PersonalDetailService.personalDetailCollection
				.add(data);
			return { successful: true}
		}
		catch (e) {
			return { successful: false, error: "Failed to add PersonalDetailService data." }
		}

	}
}

// PersonalDetailService.personalDetailCollection.get().then((i)=>{
// 		i.forEach((j) =>  console.log(j.id,"---->",j.data()))
// 	})
// PersonalDetailService.getPersonalDetail('g7fvDsheJH9liD6Z9yqN').then((i)=>{
// 	console.log(i.data);
// })

// PersonalDetailService.addPersonalDetail(data).then((i)=>{
// 	console.log(i);
// })