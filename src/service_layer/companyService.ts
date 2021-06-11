import { Company } from "../modals";
import { Collection, collection, OperationResult } from "./common";
import FirebaseCollection from './firebaseCollection'

export default class CompanyService extends FirebaseCollection<Company>{
	constructor() {
		super(Collection.COMPANIES);
	}
}
