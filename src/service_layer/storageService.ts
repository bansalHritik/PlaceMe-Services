import { firebase } from "../firebase";

export const uploadFile = async (file: File, path: string): Promise<string> => {
	await firebase.storage().ref(path).put(file);
	return await firebase.storage().ref(path).getDownloadURL();
};

export async function deleteFile(url: string): Promise<void> {
	await firebase.storage().ref(url).delete();
}