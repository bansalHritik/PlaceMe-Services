import { firebase } from "../../firebase";
import converter from "./convertor";

const collection = <T>(collectionName: string) => {
	return firebase
		.firestore()
		.collection(collectionName)
		.withConverter(converter<T>());
};

export default collection;
