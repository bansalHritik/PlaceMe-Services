import { User } from "../modals";
import { collection, OperationResult } from "./common";
import { firebase } from '../firebase';

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

	static loginUser = async (email: string, password: string): Promise<OperationResult<firebase.User>> => {
		try {
			const { user } = await firebase.auth().signInWithEmailAndPassword(email, password);
			return { successful: true, data: user }
		}
		catch (error) {
			return { successful: false, error: error?.message }
		}
	}

	static signupUser = async (email: string, password: string, user: User): Promise<OperationResult<User>> => {
		try {
			await firebase.auth().createUserWithEmailAndPassword(email, password);
			const firebaseUser = firebase.auth().currentUser;
			await UserService.userCollection.doc(email).set(user);
			return { successful: true }
		} catch (error) {
			return { successful: false, error: error?.message }
		}
	}
}

//https://stackoverflow.com/questions/54465851/using-js-and-ts-in-a-react-project