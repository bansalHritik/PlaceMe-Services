import { User } from "../modals";
import { collection, OperationResult } from "./common";

export default class UserService {
	private static userCollection = collection<User>("Users");
	static getUserDetail = async (id: string): Promise<OperationResult<User>> => {
		try {
			const userRef = await UserService.userCollection.doc(id).get();
			if (!userRef.exists) {
				throw Error("User not found.");
			}
			const data = await userRef.data();
			return { data, successful: true };
		} catch (e) {
			return { successful: false, error: e?.message };
		}
	};

	static updateUserDetail = async (
		id: string,
		updatedUser: User
	): Promise<OperationResult<User>> => {
		try {
			const userRef = await UserService.userCollection.doc(id).get();
			if (!userRef.exists) {
				throw Error("No user exists with this id");
			}
			await UserService.userCollection.doc(id).update(updatedUser);
			return { successful: true };
		} catch (error) {
			return { successful: false, error: error?.message };
		}
	};
}

//https://stackoverflow.com/questions/54465851/using-js-and-ts-in-a-react-project