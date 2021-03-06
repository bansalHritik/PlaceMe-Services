import {
	AcademicDetail,
	CompletedRequest,
	DocsAndCertificates,
	PendingRequest,
	PersonalDetail,
} from "../modals";
import { OperationResult, Result, Collection, converter } from "./common";
import FirebaseCollection from "./firebaseCollection";
import { firebase } from "../firebase";
import { map, Timestamp, UpdateRequestType } from "../utils";
import { PersonalDetailUpdate, DocumentUpdate } from "../modals";
import { deleteFile, uploadFile } from "./storageService";

export default class PendingRequestService extends FirebaseCollection<PendingRequest> {
	constructor() {
		super(Collection.PENDING_REQUESTS);
	}

	public async add(
		data: PendingRequest
	): Promise<OperationResult<Result<PendingRequest>>> {
		const { type, updatesRequired } = data;
		const currentDate = new Date();
		const currentTimestamp = firebase.firestore.Timestamp.fromDate(currentDate);
		const studentEmail = firebase.auth().currentUser?.email!;
		data.studentEmail = studentEmail;
		data.requestedOn = currentTimestamp;
		switch (type) {
			case "PERSONAL": {
				const updates = updatesRequired as PersonalDetailUpdate;
				if (updates.dob) {
					updates.dob = firebase.firestore.Timestamp.fromDate(
						updates.dob as Date
					);
				}
				break;
			}
			case "DOCUMENT": {
				const docUpdates = updatesRequired as DocumentUpdate;
				const { title, file } = docUpdates;
				const fullPath = `/PendingRequest/${studentEmail}/${currentDate.toISOString()}/${title}`;

				const downloadURL = await uploadFile(file!, fullPath);

				const updates: DocumentUpdate = {
					...docUpdates,
					uploadedOn: currentTimestamp,
					url: downloadURL,
					path: fullPath,
				};
				delete updates.file;

				data.updatesRequired = updates;

				break;
			}
			default: {
				break;
			}
		}
		return super.add(data);
	}

	private async getPendingRequestsOf(
		userId: string
	): Promise<OperationResult<Result<PendingRequest>[]>> {
		try {
			const { docs } = await this.collection
				.where("studentEmail", "==", userId)
				.get();
			let resultDocuments: Result<PendingRequest>[] = [];
			docs.forEach((doc) => {
				const data = doc.data();
				resultDocuments.push({ data, id: doc.id });
			});
			return { successful: true, result: resultDocuments };
		} catch (error) {
			return { successful: false, error };
		}
	}

	public async getCurrentUserPendingRequests(): Promise<
		OperationResult<Result<PendingRequest>[]>
	> {
		return await this.getPendingRequestsOf(
			firebase.auth().currentUser?.email ?? ""
		);
	}

	public async approveRequest(
		id: string,
		message = ""
	): Promise<OperationResult<undefined>> {
		try {
			const db = firebase.firestore();
			//getting pending request with given id.
			const pendingRequestRef = db
				.collection(Collection.PENDING_REQUESTS)
				.withConverter(converter<PendingRequest>())
				.doc(id);
			// getting ref to completed request
			const completedRequestRef = db
				.collection(Collection.COMPLETED_REQUESTS)
				.withConverter(converter<CompletedRequest>())
				.doc();

			db.runTransaction(async (transaction) => {
				// get the pending request data
				const pendingRequestDoc = await transaction.get(pendingRequestRef);
				if (pendingRequestDoc.exists) {
					const pendingRequestData = pendingRequestDoc.data()!;
					const { updatesRequired, type } = pendingRequestData;
					const studentEmail = pendingRequestData.studentEmail;
					console.log("1      Pending request ddata", pendingRequestData);
					switch (type) {
						case "ACADEMICS": {
							const academicDetailDocRef = db
								.collection(Collection.ACADEMIC_DETAIL)
								.withConverter(converter<AcademicDetail>())
								.doc(studentEmail);

							const academicDataDoc = await transaction.get(
								academicDetailDocRef
							);

							// TODO: update method not set method
							if (academicDataDoc.exists) {
								const academicData = academicDataDoc.data()!;
								map(updatesRequired, academicData);
								transaction.set(academicDetailDocRef, academicData);
							} else {
								throw new Error(
									`Academic details corresponding ${studentEmail} not found.`
								);
							}
							break;
						}
						case "PERSONAL": {
							const personalDetailsRef = db
								.collection(Collection.PERSONAL_DETAIL)
								.withConverter(converter<PersonalDetail>())
								.doc(studentEmail);

							const personalDetailsDoc = await transaction.get(
								personalDetailsRef
							);
							console.log("Personal Data", personalDetailsDoc);

							if (personalDetailsDoc.exists) {
								const personalDetailsData = personalDetailsDoc.data();
								map(updatesRequired, personalDetailsData);
								console.log("Personal Data after map", personalDetailsData);

								transaction.set(personalDetailsRef, personalDetailsData);
								console.log("set personal complete");
							} else {
								throw new Error(
									`Personal details corresponding ${studentEmail} not found.`
								);
							}
							break;
						}
						case "DOCUMENT": {
							const { title, type, path, uploadedOn, url } =
								updatesRequired as DocumentUpdate;

							const academicDetailDocRef = db
								.collection(Collection.ACADEMIC_DETAIL)
								.withConverter(converter<AcademicDetail>())
								.doc(studentEmail);

							const academicDataDoc = await transaction.get(
								academicDetailDocRef
							);

							const academicData = academicDataDoc.data()!;
							const newDocument: DocsAndCertificates = {
								path: path!,
								title: title!,
								type: type!,
								uploadedOn: uploadedOn as Timestamp,
								url: url!,
							};
							if (academicData.docsAndCertificates) {
								academicData.docsAndCertificates.push(newDocument);
							} else {
								academicData.docsAndCertificates = [newDocument];
							}
							transaction.set(academicDetailDocRef, academicData);
							break;
						}
						default:
							break;
					}

					// adding new document in the completedRequest collection
					let completedRequestData: CompletedRequest = {
						...pendingRequestData,
						isAccepted: true,
						verifiedBy: firebase.auth().currentUser?.email!,
						verifiedOn: firebase.firestore.Timestamp.now(),
						message,
					};
					transaction.set(completedRequestRef, completedRequestData);
					transaction.delete(pendingRequestRef);
				} else {
					throw new Error("No pending request with this id.");
				}
			});
			return { successful: true };
		} catch (error) {
			return { successful: false, error };
		}
	}

	public async rejectRequest(
		id: string,
		message = ""
	): Promise<OperationResult<undefined>> {
		try {
			const db = firebase.firestore();
			//getting pending request with given id.
			const pendingRequestRef = db
				.collection(Collection.PENDING_REQUESTS)
				.withConverter(converter<PendingRequest>())
				.doc(id);
			// getting ref to completed request
			const completedRequestRef = db
				.collection(Collection.COMPLETED_REQUESTS)
				.withConverter(converter<CompletedRequest>())
				.doc();

			db.runTransaction(async (transaction) => {
				// get the pending request data
				const pendingRequestDoc = await transaction.get(pendingRequestRef);
				if (pendingRequestDoc.exists) {
					const pendingRequestData = pendingRequestDoc.data()!;
					const studentEmail = pendingRequestData.studentEmail;
					// adding new document in the completedRequest collection
					let completedRequestData: CompletedRequest = {
						...pendingRequestData,
						isAccepted: true,
						verifiedBy: firebase.auth().currentUser?.email!,
						verifiedOn: firebase.firestore.Timestamp.now(),
						message,
					};
					transaction.set(completedRequestRef, completedRequestData);
					transaction.delete(pendingRequestRef);
				} else {
					throw new Error("No pending request with this id.");
				}
			});
			return { successful: true };
		} catch (error) {
			return { successful: false, error };
		}
	}

	public async remove(id: string): Promise<OperationResult<undefined>> {
		try {
			const { successful, result } = await this.get(id);
			if (successful) {
				const { data: { updatesRequired, type } = {} } = result!;
				switch (type) {
					case UpdateRequestType.DOCUMENT: {
						const updates = updatesRequired as DocumentUpdate;
						const { path } = { ...updates }
						await deleteFile(path!);
					}
					default:
						break;
				}
			}
			await super.remove(id);
			return { successful: true }
		} catch (error) {
			return { successful: false }
		}
	}
}
