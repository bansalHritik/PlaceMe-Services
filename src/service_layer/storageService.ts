import { firebase } from "../firebase";

export const uploadFile = async (file: File, path: string): Promise<string> => {
	await firebase.storage().ref(path).put(file);
	return await firebase.storage().ref(path).getDownloadURL();
};
