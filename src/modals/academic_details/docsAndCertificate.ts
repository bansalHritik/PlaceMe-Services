import { firebase } from '../../firebase'
import { DocumentType } from '../../utils/common/documentTypes';
export default interface DocsAndCertificates {
    title: string,
    path: string,
    url: string
    uploadedOn: firebase.firestore.Timestamp,
    type: DocumentType
}