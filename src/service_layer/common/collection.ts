import { firebase } from "../../firebase";
import converter from "./convertor";

const collection = <T>(collectionName: string) => {
	console.log("2222222222222222222");
	return firebase
		.firestore()
		.collection(collectionName)
		.withConverter(converter<T>());
};

export default collection;
