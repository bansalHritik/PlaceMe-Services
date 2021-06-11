import { AcademicDetail } from "./../modals";
import { Collection } from "./common";
import FirebaseCollection from './firebaseCollection'

export default class AcademicDetailService extends FirebaseCollection<AcademicDetail> {
	constructor() {
		super(Collection.ACADEMIC_DETAIL);
	}
}
