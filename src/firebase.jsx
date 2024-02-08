// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { signInWithPopup, GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: 'AIzaSyCD953jEEZ4_nTYXeIrlWvUiKa9bDR_gmU',
  authDomain: 'test-32d7a.firebaseapp.com',
  projectId: 'test-32d7a',
  storageBucket: 'test-32d7a.appspot.com',
  messagingSenderId: '740492037203',
  appId: '1:740492037203:web:91f941dd0fc271aee80aa6'
};

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FB_API_KEY,
//   authDomain: process.env.REACT_APP_FB_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_APP_ID
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
const analytics = getAnalytics(app);

export const setGithubLogin = async () => {
  const githubProvider = new GithubAuthProvider();
  try {
    const result = await signInWithPopup(auth, githubProvider);
    const user = result.user;
    console.log(user);
  } catch (error) {
    console.error(error);
  }
};

export function setGooGleLogin() {
  const googleProvider = new GoogleAuthProvider();
  const auth = getAuth();
  signInWithPopup(auth, googleProvider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
}
