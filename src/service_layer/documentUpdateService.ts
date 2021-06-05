import { PendingRequest } from "../modals";
import { OperationResult, Result } from "./common";
import FirebaseCollection from "./firebaseCollection";
import { firebase } from "../firebase";
import { AcademicDetailsUpdates, DocumentsUpdates } from '../modals/requests/pendingRequest'

interface Document {
	title: string;
	doc: File;
}

export default class DocumentUpdateService extends FirebaseCollection<PendingRequest> {
	constructor() {
		super("PendingRequests");
	}
	public async add(
		data: PendingRequest
	): Promise<OperationResult<Result<PendingRequest>>> {
		try {
			const { updatesRequired } = data;
			data.studentEmail = firebase.auth().currentUser?.email;
			let file = updatesRequired as DocumentsUpdates;
			const date = new Date();
			const fullPath =
				"PendingRequest/" +
				data.studentEmail +
				"/" +
				date.toISOString() +
				"/" +
				file?.doc?.name;
			await firebase.storage().ref(fullPath).put(file.doc);
			const downloadURL = await firebase.storage().ref(fullPath).getDownloadURL();
			data.updatesRequired = { title: file.title, doc: downloadURL };
			data.requestedOn = date;
			return await super.add(data);
		} catch (error) {
			return { successful: false, error };
		}
	}
}