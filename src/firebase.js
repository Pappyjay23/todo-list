import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB9GDhI2j6n3clejLFtFlRdNd-63Vg5ypU",
  authDomain: "todo-list-a1cd3.firebaseapp.com",
  databaseURL: "https://todo-list-a1cd3-default-rtdb.firebaseio.com",
  projectId: "todo-list-a1cd3",
  storageBucket: "todo-list-a1cd3.appspot.com",
  messagingSenderId: "493877322020",
  appId: "1:493877322020:web:fddfe636225d3ff8c493b1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);