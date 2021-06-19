import { AcademicDetail, DocsAndCertificates } from "../academic_details";
import { PersonalDetail } from "../personal_details";
import { DeepPartial } from "../../utils";

export interface UpdatesRequired {
	academics?: DeepPartial<AcademicDetail>;
	personal?: DeepPartial<PersonalDetail>;
	document?: DeepPartial<DocsAndCertificates>;
}
