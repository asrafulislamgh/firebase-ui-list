import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase.config";
import {getFirestore} from "@firebase/firestore"

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

export default db;