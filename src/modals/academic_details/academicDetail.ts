import Secondary from "./secondary";
import SeniorSecondary from "./seniorSecondary";
import Graduation from "./graduation";
import DocsAndCertificates from "./docsAndCertificate";

export default interface AcademicDetail {
	secondary: Secondary;
	seniorSecondary: SeniorSecondary;
	graduation: Graduation;
	academicGap: number;
	docsAndCertificates: [DocsAndCertificates];
};
