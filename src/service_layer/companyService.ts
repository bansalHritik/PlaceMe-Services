import { Company } from "../modals";
import { firebase } from "../firebase";
import { Collection, OperationResult, Result } from "./common";
import FirebaseCollection from "./firebaseCollection";
import { uploadFile } from "./storageService";

export default class CompanyService extends FirebaseCollection<Company> {
	constructor() {
		super(Collection.COMPANIES);
	}

	public async add(data: Company): Promise<OperationResult<Result<Company>>> {
		const path = `/Company/logo/${data.name}`;
		const url = await uploadFile(data.logo as File, path);
		data.otherDetails = data.otherDetails ?? "";
		data.registeredOn = firebase.firestore.Timestamp.now();
		data.logo = { url, path };
		return super.add(data);
	}
}
