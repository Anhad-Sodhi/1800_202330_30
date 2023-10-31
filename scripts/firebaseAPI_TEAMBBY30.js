//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
var firebaseConfig = {

    apiKey: "AIzaSyAgg36PjlgMmyYzrtBjkeCarompZs-qe7Q",
    authDomain: "almostfresh-4ee10.firebaseapp.com",
    projectId: "almostfresh-4ee10",
    storageBucket: "almostfresh-4ee10.appspot.com",
    messagingSenderId: "930752400293",
    appId: "1:930752400293:web:70bd8dd62543534184b64c"

};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(); //create a new database for us, "db"