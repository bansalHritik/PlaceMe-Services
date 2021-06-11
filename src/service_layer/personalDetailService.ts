import PersonalDetail from "../modals/personal_details/personalDetail";
import { Collection } from "./common";
import FirebaseCollection from './firebaseCollection';

export default class PersonalDetailService extends FirebaseCollection<PersonalDetail>  {
	constructor() {
		super(Collection.PERSONAL_DETAIL);
	}
}
