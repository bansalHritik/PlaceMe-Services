import firebase from 'firebase';

let firebaseConfig = {
	apiKey: "AIzaSyAtdUNcyEgyxl8mLF7tiwdSdwSnB1uxgiM",
	authDomain: "placeme-d4e2a.firebaseapp.com",
	projectId: "placeme-d4e2a",
	storageBucket: "placeme-d4e2a.appspot.com",
	messagingSenderId: "563503747128",
	appId: "1:563503747128:web:bfbcc4352a924b637dd6cd",
	measurementId: "G-SD74K5P2H6",
};

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
	firebase.analytics();
}

export default firebase;