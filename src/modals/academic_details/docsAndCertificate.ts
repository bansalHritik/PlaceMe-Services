import { DocumentType, Timestamp } from "../../utils";
export default interface DocsAndCertificates {
	title: string;
	path: string;
	url: string;
	uploadedOn: Timestamp;
	type: DocumentType;
	file?: File;
}
