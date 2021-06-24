import { User } from "../modals";
import { Collection, collection, OperationResult } from "./common";
import { uploadFile } from "./storageService";
import { firebase } from "../firebase";

export default class UserService {
	private static userCollection = collection<User>(Collection.USERS);

	static getFirebaseUser = (): firebase.User | null => {
		return firebase.auth().currentUser;
	};

	static getUserDetail = async (id: string): Promise<OperationResult<User>> => {
		try {
			const userRef = await UserService.userCollection.doc(id).get();
			if (!userRef.exists) {
				throw Error("User not found.");
			}
			const result = userRef.data();
			return { successful: true, result };
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

	static loginUser = async (
		email: string,
		password: string
	): Promise<OperationResult<User>> => {
		try {
			let currentUser: User;
			const userEmail = email.toLowerCase();
			const { user } = await firebase
				.auth()
				.signInWithEmailAndPassword(userEmail, password);
			const { successful, error, result } = await UserService.getUserDetail(
				userEmail
			);
			if (successful) {
				currentUser = { ...result!, photoUrl: user?.photoURL! };
			} else {
				throw Error(error);
			}
			return { successful: true, result: currentUser };
		} catch (error) {
			return { successful: false, error: error?.message };
		}
	};

	static signupUser = async (
		user: User,
		password: string
	): Promise<OperationResult<User>> => {
		try {
			const userEmail = user.email.toLowerCase();
			await firebase.auth().createUserWithEmailAndPassword(userEmail, password);
			await UserService.userCollection.doc(userEmail).set(user);
			return { successful: true, result: user };
		} catch (error) {
			return { successful: false, error: error?.message };
		}
	};

	static logout = async (): Promise<OperationResult<undefined>> => {
		try {
			await firebase.auth().signOut();
			return { successful: true };
		} catch (error) {
			return { successful: false, error };
		}
	};
	static async sendResetPasswordMail(
		email: string
	): Promise<OperationResult<undefined>> {
		try {
			await firebase.auth().sendPasswordResetEmail(email);
			return { successful: true };
		} catch (error) {
			return { successful: false, error };
		}
	}

	static async resetPassword(
		currentPassword: string,
		newPassword: string
	): Promise<OperationResult<undefined>> {
		try {
			const currentUser = firebase.auth().currentUser!;
			const email = currentUser.email!;
			const cred = firebase.auth.EmailAuthProvider.credential(
				email,
				currentPassword
			);
			await currentUser.reauthenticateWithCredential(cred);
			currentUser.updatePassword(newPassword);
			return { successful: true };
		} catch (error) {
			return { successful: false, error };
		}
	}

	static async updateProfilePic(
		profilePic: File
	): Promise<OperationResult<undefined>> {
		try {
			const currentUser = firebase.auth().currentUser;
			const email = currentUser?.email!;
			const path = `USERS/PROFILE/${email}`;
			const url = await uploadFile(profilePic, path);
			await currentUser?.updateProfile({ photoURL: url });
			return { successful: true };
		} catch (error) {
			return { successful: false, error };
		}
	}

	static firebaseRef = firebase;
}
