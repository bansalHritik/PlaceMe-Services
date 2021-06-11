import { Department } from '../modals'
import { Collection, collection, OperationResult } from "./common";
import FirebaseCollection from './firebaseCollection'

export default class DepartmentService extends FirebaseCollection<Department> {
	constructor() {
		super(Collection.DEPARTMENTS);
	}
}
