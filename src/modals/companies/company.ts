import Logo from "./logo";
import Repersentative from "./representative";
import { Timestamp } from "../../utils";

export default interface Company {
	name: string;
	type: string;
	representatives: Repersentative[];
	logo: Logo | File;
	website: string;
	otherDetails?: string;
	registeredOn?: Timestamp;
}
