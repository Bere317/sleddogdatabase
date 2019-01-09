import firebase from "firebase/app";
import "firebase/firestore";

var config = {
  apiKey: "AIzaSyDukM0GFrWWsgfFwmn0Be7HyEX9CKejdKc",
  authDomain: "sleddogdatabase.firebaseapp.com",
  databaseURL: "https://sleddogdatabase.firebaseio.com",
  projectId: "sleddogdatabase",
  storageBucket: "sleddogdatabase.appspot.com",
  messagingSenderId: "1021436596412"
};

let app = firebase.initializeApp(config);
const db = app.firestore();
db.settings({ timestampsInSnapshots: true });
export default db;
