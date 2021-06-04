import { PendingRequest } from '../modals'
import { OperationResult, Result } from './common';
import FirebaseCollection from './firebaseCollection';
import { firebase } from "../firebase";

interface Document {
    title: string, 
    doc: File | string | null
}

export default class DocumentUpdateService extends FirebaseCollection<PendingRequest>{
    constructor() {
        super("PendingRequests");
    }
    public async update(
        data: PendingRequest,
        id: string
    ): Promise<OperationResult<Result<PendingRequest>>> {
        const { updatesRequired, studentEmail } = data;
        let file: Document = data.updatesRequired;
        const date = new Date().toISOString();
        const {downloadURL} = await firebase.storage().ref('PendingRequest/'+studentEmail + '/' + date).put(file.doc);
        file.doc = downloadURL;
        return super.update(data, id);
    }
}