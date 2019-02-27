import Firebase from 'firebase'

var config = {
    apiKey: "AIzaSyAQWC9D-OMe-9CV11HBNAFEo56z8aot4Hc",
    authDomain: "food-service-10b7a.firebaseapp.com",
    databaseURL: "https://food-service-10b7a.firebaseio.com",
    projectId: "food-service-10b7a",
    storageBucket: "",
    messagingSenderId: "1021902458928"
};

const firebaseApp = Firebase.initializeApp(config);
const db = firebaseApp.database();

export const dbOrdersRef = db.ref('orders')

