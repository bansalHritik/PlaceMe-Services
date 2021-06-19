import Logo from "./logo";
import Repersentative from "./representative";

export default interface Company {
	name: string;
	type: string;
	representatives: Repersentative[];
	logo: Logo | File;
	website: string;
	otherDetails: string;
}
