import { AcademicDetail, CompletedRequest, PendingRequest, PersonalDetail } from '../modals';
import { OperationResult, Result, Collection, converter } from './common';
import FirebaseCollection from './firebaseCollection';
import { firebase } from '../firebase';
import { AcademicDetailService, CompletedRequestService } from '.';
import { map } from '../utils';
import { ResultWithId } from './common/result';

export default class PendingRequestService extends FirebaseCollection<PendingRequest> {
	constructor() {
		super(Collection.PENDING_REQUESTS);
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

	public async getPendingRequestsOf(userId: string): Promise<OperationResult<Result<PendingRequest>[]>> {
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
					const { updatesRequired } = pendingRequestData
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
}
