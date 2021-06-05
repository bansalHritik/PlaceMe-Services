import {
	AcademicDetail,
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
import { BloodGroup } from "../../utils";

export interface AcademicDetailsUpdates {
	secondary?: Secondary;
	seniorSecondary?: SeniorSecondary;
	graduation?: Graduation;
	academicGap?: number;
	docsAndCertificates?: [DocsAndCertificates];
}

export interface PersonalDetailsUpdates {
	aadhar?: Aadhar;
	address?: Address;
	bloodGroup?: BloodGroup;
	dob?: Date;
	email?: string;
	emergencyContact?: number;
	father?: FatherDetail;
	mother?: MotherDetail;
}

export interface DocumentsUpdates {
	title: string;
	doc: File;
}
export default interface PendingRequest {
	requestedOn?: Date;
	studentEmail?: string | undefined | null;
	updatesRequired: AcademicDetailsUpdates | PersonalDetailsUpdates | DocumentsUpdates;
	type: UpdateRequestType;
}

enum UpdateRequestType {
	ACADEMICS = "ACADEMICS",
	PERSONAL = "PERSONAL",
	DOCUMENT = "DOCUMENT",
}
