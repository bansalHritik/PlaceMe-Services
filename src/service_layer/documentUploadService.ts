import { PendingRequest } from "../modals";
import { OperationResult, Result } from "./common";
import { firebase } from "../firebase";
import { DocumentsUpdates } from '../modals/requests/pendingRequest'
import { PendingRequestService } from ".";

export default class DocumentUploadService {
	private storageRef = firebase.storage().ref;
	public async add(
		data: DocumentsUpdates
	): Promise<OperationResult<Result<PendingRequest>>> {
		try {

			const updateService = new PendingRequestService();
			const { doc, title, type } = data;
			const studentEmail = firebase.auth().currentUser?.email

			const date = new Date();

			const fullPath =
				"PendingRequest/" +
				studentEmail +
				"/" +
				date.toISOString() +
				"/" +
				doc?.name;

			await firebase.storage().ref(fullPath).put(doc);

			const downloadURL = await this.storageRef(fullPath).getDownloadURL();

			let updateData: PendingRequest = {
				studentEmail: firebase.auth().currentUser?.email!,
				title,
				updatesRequired: {
					doc: downloadURL,
					title,
					type,

				},
				type: "DOCUMENT",
				requestedOn: date

			};

			// data.requestedOn = date;
			return await updateService.add(updateData);
		} catch (error) {
			return { successful: false, error };
		}
	}

	public async remove(path: string): Promise<OperationResult<Result<boolean>>> {
		try {
			await this.storageRef(path).delete();
			return { successful: true }
		} catch (error) {
			return { successful: false, error }
		}
	}

}