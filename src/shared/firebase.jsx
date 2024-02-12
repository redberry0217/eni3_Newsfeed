// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore, serverTimestamp } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { signInWithPopup, GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
// https://firebase.google.com/docs/web/setup#available-libraries

let nickname;

const getUserInfo = async (uid) => {
  const userDocRef = doc(db, 'users', uid);
  const userDocSnap = await getDoc(userDocRef);

  if (userDocSnap.exists()) {
    const userData = userDocSnap.data();
    nickname = userData.nickname;
  } else {
    nickname = null;
  }
};

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_API_KEY,
  authDomain: process.env.REACT_APP_FB_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
// const analytics = getAnalytics(app);

export const setGithubLogin = async () => {
  const githubProvider = new GithubAuthProvider();
  try {
    const result = await signInWithPopup(auth, githubProvider);
    const user = result.user;

    const userDocRef = doc(db, 'users', user.uid);
    const signUpDate = serverTimestamp();
    await setDoc(userDocRef, {
      fullEmail: user.email,
      nickname: user.displayName,
      status: '',
      selectedIcon: 'cat',
      signUpDate
    });
    await getUserInfo(user.uid);
    alert(`안녕하세요, ${nickname}님!`);
  } catch (error) {
    console.error(error);
  }
};

export const setGooGleLogin = async () => {
  const googleProvider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    const userDocRef = doc(db, 'users', user.uid);
    const signUpDate = serverTimestamp();
    await setDoc(userDocRef, {
      fullEmail: user.email,
      nickname: user.displayName,
      status: '',
      selectedIcon: 'cat',
      signUpDate
    });
    await getUserInfo(user.uid);
    alert(`안녕하세요, ${nickname}님!`);
  } catch (error) {
    console.error(error);
  }
};
