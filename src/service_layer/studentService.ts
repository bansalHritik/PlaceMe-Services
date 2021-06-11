import { Student } from '../modals'
import { Collection } from './common';
import FirebaseCollection from './firebaseCollection';

export default class StudentService extends FirebaseCollection<Student>{
	constructor() {
		super(Collection.STUDENTS);
	}
}
