import { DeepPartial, DocumentType, Timestamp, UpdateRequestType } from "../../utils";
import { AcademicDetail } from "../academic_details";
import { PersonalDetail } from "../personal_details";

export type AcademicDetailUpdate = DeepPartial<AcademicDetail>;
export type PersonalDetailUpdate = DeepPartial<PersonalDetail>;
export type DocumentUpdate = {
	file?: File,
	title: string,
	type: DocumentType
	url?: string,
	path?: string,
	uploadedOn: Timestamp
};
export interface PendingRequest {
	requestedOn?: Timestamp;
	studentEmail?: string;
	updatesRequired: AcademicDetailUpdate | PersonalDetailUpdate | DocumentUpdate;
	type: UpdateRequestType;
	title: string;
	comment?: string;
}

//https://gist.github.com/navix/6c25c15e0a2d3cd0e5bce999e0086fc9
