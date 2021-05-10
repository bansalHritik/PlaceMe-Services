import { Role } from "../../utils";
import Name from "./name";
export default interface User {
	email: string;
	mobile: string;
	name: Name;
	otherDetails: any;
	photoUrl?: string;
	role: Role;
}
