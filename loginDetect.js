
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

        const firebaseConfig = {
            apiKey: "AIzaSyDjd0LhA79LsayHtLjeOzil5LgIsXky_rU"
        };

        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);

        // Auth state listener
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("User is signed in: ", user);
            } else {
                console.log("No user is signed in. Redirecting to login page.");
                window.location.href = "login.html";  // Redirect to login page if not signed in
            }
        });

        function signOutUser() {
            signOut(auth);
			window.location.href = "login.html";
        }