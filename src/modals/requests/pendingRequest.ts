import { DeepPartial, Timestamp, UpdateRequestType } from "../../utils";
import { AcademicDetail, DocsAndCertificates } from "../academic_details";
import { PersonalDetail } from "../personal_details";

export type AcademicDetailUpdate = DeepPartial<AcademicDetail>;
export type PersonalDetailUpdate = DeepPartial<PersonalDetail>;
export type DocumentUpdate = DeepPartial<DocsAndCertificates>;
export interface PendingRequest {
	requestedOn?: Timestamp;
	studentEmail?: string;
	updatesRequired: AcademicDetailUpdate | PersonalDetailUpdate | DocumentUpdate;
	type: UpdateRequestType;
	title: string;
	comment?: string;
}

//https://gist.github.com/navix/6c25c15e0a2d3cd0e5bce999e0086fc9
