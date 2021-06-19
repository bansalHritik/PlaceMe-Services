import { PendingRequest } from "../modals";
import { OperationResult, Result } from "./common";
import { firebase } from "../firebase";
import { DocumentsUpdates } from '../modals/requests/pendingRequest'
import { PendingRequestService } from ".";

export default class DocumentUploadService {
	public async add(
		data: DocumentsUpdates
	): Promise<OperationResult<Result<PendingRequest>>> {
		try {
			const updateService = new PendingRequestService();
			const { doc, title, type } = data;
			const studentEmail = firebase.auth().currentUser?.email!
			const date = new Date();
			const fullPath = `/PendingRequest/${studentEmail}/${date.toISOString()}/${title}`

			const file = doc as File
			await firebase.storage().ref(fullPath).put(file);

			const downloadURL = await firebase.storage().ref(fullPath).getDownloadURL();

			let updateData: PendingRequest = {
				studentEmail,
				title,
				updatesRequired: {
					doc: downloadURL,
					title,
					type,
				},
				type: "DOCUMENT",
			};

			return await updateService.add(updateData);
		} catch (error) {
			console.log(error);
			return { successful: false, error };
		}
	}

	public async remove(path: string): Promise<OperationResult<Result<boolean>>> {
		try {
			await firebase.storage().ref(path).delete();
			return { successful: true }
		} catch (error) {
			return { successful: false, error }
		}
	}

}