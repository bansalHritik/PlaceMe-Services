import { PlacedStudent } from '../modals';
import { Collection } from './common';
import FirebaseCollection from './firebaseCollection';

export default class PlacedStudentService extends FirebaseCollection<PlacedStudent> {
	constructor() {
		super(Collection.PLACED_STUDENTS);
	}
}