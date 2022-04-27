import { initializeApp } from 'firebase/app';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAiE4MkUwKgKFGf8EBFBakuX8I-Z7-1WvI",
    authDomain: "bof-app-fc36e.firebaseapp.com",
    projectId: "bof-app-fc36e",
    databaseURL: "https://bof-app-fc36e-default-rtdb.firebaseio.com/",
    storageBucket: "bof-app-fc36e.appspot.com",
    messagingSenderId: "472713110706",
    appId: "1:472713110706:web:e3e7bd9caf5733e3c3d5ab"
  };

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default storage;