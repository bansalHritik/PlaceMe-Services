import {
	DocsAndCertificates,
	Graduation,
	Secondary,
	SeniorSecondary,
} from "../academic_details";
import {
	Aadhar,
	Address,
	FatherDetail,
	MotherDetail,
} from "../personal_details";
import { BloodGroup, DocumentType } from "../../utils";
import { firebase } from './../../firebase'

export interface AcademicDetailsUpdates {
	secondary?: Secondary;
	seniorSecondary?: SeniorSecondary;
	graduation?: Graduation;
	academicGap?: number;
	docsAndCertificates?: DocsAndCertificates;
}

export interface PersonalDetailsUpdates {
	aadhar?: Aadhar;
	address?: Address;
	bloodGroup?: BloodGroup;
	dob?: Date | firebase.firestore.Timestamp;
	email?: string;
	emergencyContact?: number;
	father?: FatherDetail;
	mother?: MotherDetail;
}

export interface DocumentsUpdates {
	title: string;
	doc: File | string;
	type: DocumentType
}


export interface PendingRequest {
	requestedOn?: firebase.firestore.Timestamp;
	studentEmail?: string;
	updatesRequired: AcademicDetailsUpdates | PersonalDetailsUpdates | DocumentsUpdates;
	type: "ACADEMICS" | "PERSONAL" | "DOCUMENT";
	title: string,
	comment?: string
}

enum UpdateRequestType {
	ACADEMICS = "ACADEMICS",
	PERSONAL = "PERSONAL",
	DOCUMENT = "DOCUMENT",
}
