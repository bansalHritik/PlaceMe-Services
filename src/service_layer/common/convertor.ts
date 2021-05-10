import { firebase } from "../../firebase";

const converter = <T>() => ({
	toFirestore: (data: T) => data,
	fromFirestore: (snap: firebase.firestore.QueryDocumentSnapshot<T>) =>
		snap.data(),
});

export default converter;
