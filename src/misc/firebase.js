import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const config = {
  apiKey: 'AIzaSyAN7W8Ho2V4liUUpZCBQJ2n47lXNThKAUU',
  authDomain: 'chat-web-app-a1184.firebaseapp.com',
  databaseURL:
    'https://chat-web-app-a1184-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'chat-web-app-a1184',
  storageBucket: 'chat-web-app-a1184.appspot.com',
  messagingSenderId: '959691983639',
  appId: '1:959691983639:web:d10287c519511ec2550552',
};

// Initialize Firebase
const app = firebase.initializeApp(config);

export const auth = app.auth();
export const database = app.database();
export const storage = app.storage();
