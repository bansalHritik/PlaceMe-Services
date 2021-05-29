import { collection as firebaseCollection, OperationResult } from "./common";
import { firebase } from "../firebase";

interface Result<T> {
	data?: T;
	id?: string;
}
export default class FirebaseCollection<T> {
	private collection: firebase.firestore.CollectionReference<T>;

	constructor(name: string) {
		this.collection = firebaseCollection<T>(name);
	}

	private successResult(result?: Result<T>): OperationResult<Result<T>> {
		return { successful: true, result };
	}

	private failureResult(error?: string): OperationResult<T> {
		return { successful: false, error };
	}

	public async set(data: T, id: string): Promise<OperationResult<Result<T>>> {
		try {
			await this.collection.doc(id).set(data);
			return this.successResult();
		} catch (error) {
			return this.failureResult(error);
		}
	}

	public async add(data: T): Promise<OperationResult<Result<T>>> {
		try {
			const { id } = await this.collection.add(data);
			return this.successResult({ ...data, id });
		} catch (error) {
			return this.failureResult(error);
		}
	}

	public async update(
		data: T,
		id: string
	): Promise<OperationResult<Result<T>>> {
		try {
			await this.collection.doc(id).update(data);
			return this.successResult();
		} catch (error) {
			return this.failureResult(error);
		}
	}

	public async remove(id: string): Promise<OperationResult<Result<T>>> {
		try {
			await this.collection.doc(id).delete();
			return this.successResult();
		} catch (error) {
			return this.failureResult(error);
		}
	}

	public async get(docId: string): Promise<OperationResult<Result<T>>> {
		try {
			const doc = await this.collection.doc(docId).get();
			if (!doc.exists) {
				throw new Error("No document found with this id.");
			}
			const result = doc.data();
			return this.successResult({ data: result, id: doc.id});
		} catch (error) {
			return this.failureResult(error);
		}
	}

	public async getAll(): Promise<OperationResult<Result<T>[]>> {
		try {
			const { docs } = await this.collection.get();
			const result: Result<T>[] = [];
			docs.forEach((doc) => {
				const { id } = doc;
				const data = doc.data();
				result.push({ data, id });
			});
			return { successful: true, result: result };
		} catch (error) {
			return { successful: false, error };
		}
	}
}
