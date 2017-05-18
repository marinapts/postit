import firebase from 'firebase';

try {
    var config = {
        apiKey: "AIzaSyCmcy7h7IxIuL5mdDBToPxkm85ysbmqWDE",
        authDomain: "post-it-b009d.firebaseapp.com",
        databaseURL: "https://post-it-b009d.firebaseio.com",
        projectId: "post-it-b009d",
        storageBucket: "post-it-b009d.appspot.com",
        messagingSenderId: "515684164765"
    };
    
    firebase.initializeApp(config);
} catch(e) {

}

export var firebaseRef = firebase.database().ref();
export default firebase;
