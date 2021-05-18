import { collection as firebaseCollection, OperationResult } from "./common";
import { firebase } from "../firebase";

export default class FirebaseCollection<T> {
    private collection: firebase.firestore.CollectionReference<T>;

    constructor(name: string) {
        this.collection = firebaseCollection<T>(name);
    }

    private successResult(data?: T): OperationResult<T> {
        return { successful: true, data }
    }

    private failureResult(error?: string): OperationResult<T> {
        return { successful: false, error }
    }

    public async set(data: T, id: string): Promise<OperationResult<T>> {
        try {
            await this.collection.doc(id).set(data);
            return this.successResult();
        } catch (error) {
            return this.failureResult(error)
        }
    }

    public async add(data: T): Promise<OperationResult<T>> {
        try {
            const { id } = await this.collection.add(data);
            return this.successResult({ ...data, id });
        } catch (error) {
            return this.failureResult(error);
        }
    }

    public async update(data: T, id: string): Promise<OperationResult<T>> {
        try {
            await this.collection.doc(id).update(data);
            return this.successResult();
        } catch (error) {
            return this.failureResult(error)
        }
    }

    public async remove(id: string): Promise<OperationResult<T>> {
        try {
            await this.collection.doc(id).delete();
            return this.successResult();
        } catch (error) {
            return this.failureResult(error);
        }
    }

    public async get(docId: string): Promise<OperationResult<T>> {
        try {
            const { exists, data, id, } = await this.collection.doc(docId).get();
            if (!exists) {
                throw new Error("No document found with this id.")
            }
            const result = data();
            return this.successResult(result)
        } catch (error) {
            return this.failureResult(error)
        }
    }

    public async getAll(): Promise<OperationResult<T[]>> {
        try {
            const { docs } = await this.collection.get();
            const result: T[] = [];
            docs.forEach((doc) => {
                const data = doc.data();
                result.push(data);
            })
            return { successful: true, data: result };
        }
        catch (error) {
            return { successful: false, error }
        }
    }
}