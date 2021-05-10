import PersonalDetail from "../modals/personal_details/personalDetail";
import { collection, OperationResult } from "./common";

export default class PersonalDetailService {
	private static personalDetailCollection = collection<PersonalDetail>(
		"PersonalDetails"
	);

	getPersonalDetail = async (
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
}
