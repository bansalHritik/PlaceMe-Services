import { Company } from "../modals";
import { collection, OperationResult } from "./common";

export default class CompanyService {
    private static academicDetailCollection = collection<Company>(
		"AcademicDetails"
	);
}