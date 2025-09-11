import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getAuth,} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";
import { getFirestore} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";
            
const firebaseConfig = {
    apiKey: "AIzaSyBKxA7I3Jg0z2JrrvlLw2oFfev-DBlJL1o",
    authDomain: "leavesandpaw.firebaseapp.com",
    projectId: "leavesandpaw",
    storageBucket: "leavesandpaw.firebasestorage.app",
    messagingSenderId: "69456394857",
    appId: "1:69456394857:web:d5417ba545ad6bc3aac0f8"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);