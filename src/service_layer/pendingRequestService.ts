import { AcademicDetail, CompletedRequest, PendingRequest, PersonalDetail } from '../modals';
import { OperationResult, Result, Collection, converter } from './common';
import FirebaseCollection from './firebaseCollection';
import { firebase } from '../firebase';
import { map } from '../utils';
import { ResultWithId } from './common/result';
import { PersonalDetailsUpdates, DocumentsUpdates } from '../modals';

export default class PendingRequestService extends FirebaseCollection<PendingRequest> {
	constructor() {
		super(Collection.PENDING_REQUESTS);
	}

	public async add(data: PendingRequest): Promise<OperationResult<Result<PendingRequest>>> {
		const { type, updatesRequired, requestedOn } = data;
		switch (type) {
			case 'PERSONAL': {
				const updates = updatesRequired as PersonalDetailsUpdates;
				if (updates.dob) {
					updates.dob = firebase.firestore.Timestamp.fromDate(updates.dob as Date);
				}
				break;
			}
			case 'DOCUMENT': {
				const { doc, title, type } = updatesRequired as DocumentsUpdates;
				const studentEmail = firebase.auth().currentUser?.email!
				const fullPath = `/PendingRequest/${studentEmail}/${new Date().toISOString()}/${title}`
				const file = doc as File

				await firebase.storage().ref(fullPath).put(file);

				const downloadURL = await firebase.storage().ref(fullPath).getDownloadURL();

				data.studentEmail = studentEmail;
				data.updatesRequired = {
					doc: downloadURL,
					title,
					type,
					path: fullPath,
				}
				break;
			}
			default: {
				break;
			}
		};
		data.requestedOn = requestedOn ?? firebase.firestore.Timestamp.fromDate(new Date());
		return super.add(data);
	}

	public async update(data: PendingRequest, id: string): Promise<OperationResult<ResultWithId>> {
		try {
			const { type } = data;
			await this.collection.doc(id).update(data);
			return { successful: true };
		} catch (error) {
			return { successful: false, error };
		}
	}

	private async getPendingRequestsOf(userId: string): Promise<OperationResult<Result<PendingRequest>[]>> {
		try {
			const { docs } = await this.collection.where('studentEmail', '==', userId).get();
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

	public async getCurrentUserPendingRequests(): Promise<OperationResult<Result<PendingRequest>[]>> {
		return await this.getPendingRequestsOf(firebase.auth().currentUser?.email ?? '');
	}

	public async approveRequest(id: string): Promise<OperationResult<undefined>> {
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
				.withConverter(converter<CompletedRequest>());

			db.runTransaction(async (transaction) => {
				// get the pending request data
				const pendingRequestDoc = await transaction.get(pendingRequestRef);
				if (pendingRequestDoc.exists) {
					const pendingRequestData = pendingRequestDoc.data()!;
					const { updatesRequired } = pendingRequestData;
					const studentEmail = pendingRequestData.studentEmail;

					switch (pendingRequestData.type) {
						case 'ACADEMICS': {
							const adacdemicDetailDocRef = db
								.collection(Collection.ACADEMIC_DETAIL)
								.withConverter(converter<AcademicDetail>())
								.doc(studentEmail)

							const academicDataDoc = await transaction.get(adacdemicDetailDocRef);

							if (academicDataDoc.exists) {
								const academicData = academicDataDoc.data()!;
								map(updatesRequired, academicData);
								transaction.set(adacdemicDetailDocRef, academicData);
							}
							else {
								throw new Error(`Academic details corresponding ${studentEmail} not found.`)
							}
							break;
						}
						case 'PERSONAL': {
							const personalDetailsRef = db.collection(Collection.PERSONAL_DETAIL)
								.withConverter(converter<PersonalDetail>())
								.doc(studentEmail)

							const personalDetailsDoc = await transaction.get(personalDetailsRef);

							if (personalDetailsDoc.exists) {
								const personalDetailsData = personalDetailsDoc.data();
								map(updatesRequired, personalDetailsData);
								transaction.set(personalDetailsRef, personalDetailsData);
							}
							else {
								throw new Error(`Personal details corresponding ${studentEmail} not found.`)
							}
						}
						case 'DOCUMENT': {
							const { doc, title, type, path } = updatesRequired as DocumentsUpdates;
							const adacdemicDetailDocRef = db
								.collection(Collection.ACADEMIC_DETAIL)
								.withConverter(converter<AcademicDetail>())
								.doc(studentEmail)
							const academicDataDoc = await transaction.get(adacdemicDetailDocRef);
							const file = doc as string;
							const academicData = academicDataDoc.data()!;
							const date = firebase.firestore.Timestamp.fromDate(new Date());
							if (academicData.docsAndCertificates) {
								academicData.docsAndCertificates.push({ type, uploadedOn: date, path, title, url: file })
							}
							else {
								academicData.docsAndCertificates = [{ type, uploadedOn: date, path, title, url: file }]
							}
							transaction.set(adacdemicDetailDocRef, academicData)
						}
						default:
							break;
					}

					// adding new document in the completedRequest collection
					let completedRequestData: CompletedRequest = {
						isAccepted: true,
						studentEmail,
						title: pendingRequestData.title,
						type: pendingRequestData.type,
						updatesRequired: pendingRequestData.updatesRequired,
						requestedOn: pendingRequestData.requestedOn,
						verifiedBy: firebase.auth().currentUser?.email!,
						verifiedOn: firebase.firestore.Timestamp.now(),
					};
					transaction.set(completedRequestRef.doc(), completedRequestData);
					transaction.delete(pendingRequestRef);
				}
				else {
					throw new Error("No pending request with this id.")
				}
			});
			return { successful: true, }
		} catch (error) {
			return { successful: false, error };
		}
	}

	public async rejectRequest(id: string): Promise<OperationResult<undefined>> {
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
				.withConverter(converter<CompletedRequest>());

			db.runTransaction(async (transaction) => {
				// get the pending request data
				const pendingRequestDoc = await transaction.get(pendingRequestRef);
				if (pendingRequestDoc.exists) {
					const pendingRequestData = pendingRequestDoc.data()!;
					const studentEmail = pendingRequestData.studentEmail;
					// adding new document in the completedRequest collection
					let completedRequestData: CompletedRequest = {
						isAccepted: false,
						studentEmail,
						title: pendingRequestData.title,
						type: pendingRequestData.type,
						updatesRequired: pendingRequestData.updatesRequired,
						requestedOn: pendingRequestData.requestedOn,
						verifiedBy: firebase.auth().currentUser?.email!,
						verifiedOn: firebase.firestore.Timestamp.now(),
					};
					transaction.set(completedRequestRef.doc(), completedRequestData);
					transaction.delete(pendingRequestRef);
				}
				else {
					throw new Error("No pending request with this id.")
				}
			});
			return { successful: true, }
		} catch (error) {
			return { successful: false, error };
		}
	}
}
