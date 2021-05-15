import { collection as firebaseCollection, OperationResult } from "./common";
import { firebase } from "../firebase";

class FirebaseCollection<T> {
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

    public async set(data: T, id: string) {
        try {
            await this.collection.doc(id).set(data);
            
            return this.successResult();
        } catch (error) {

        }
    }

    public async add(data: T) {
        const { id } = await this.collection.add(data);
        return this.successResult({ ...data, id });
    }

    public async update(data: T, id: string) {
        await this.update(data, id);
        return this.successResult();
    }

    public async remove(id: string) {
        await this.collection.doc(id).delete();
        return this.successResult();
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

    public async getAll() {
        const { } = await this.collection.get();
    }
}