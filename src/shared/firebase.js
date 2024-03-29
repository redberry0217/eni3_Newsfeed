import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { signInWithPopup, GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

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
    const signUpDate = new Date().toISOString();
    const generateRandomNickname = () => {
      const randomNumber = Math.floor(Math.random() * 10000);
      const formattedNumber = randomNumber.toString().padStart(4, '0');
      return `익명유저${formattedNumber}`;
    };

    const userDocSnapshot = await getDoc(userDocRef);
    let nickname;

    if (userDocSnapshot.exists()) {
      nickname = userDocSnapshot.data().nickname;
      alert(`안녕하세요, ${nickname}님!`);
    } else {
      nickname = user.displayName || generateRandomNickname();
      await setDoc(userDocRef, {
        fullEmail: user.email,
        nickname,
        status: '',
        avatar: 'cat',
        token: '470bf4b0-975d-4d2b-a924-a78554a2b97c',
        signUpDate
      });
      alert(`안녕하세요, ${nickname}님!`);
    }
    return {
      fullEmail: user.email,
      nickname,
      status: '',
      avatar: 'cat',
      token: '470bf4b0-975d-4d2b-a924-a78554a2b97c',
      signUpDate,
      id: user.uid
    };
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
    const signUpDate = new Date().toISOString();
    const generateRandomNickname = () => {
      const randomNumber = Math.floor(Math.random() * 10000);
      const formattedNumber = randomNumber.toString().padStart(4, '0');
      return `익명유저${formattedNumber}`;
    };

    const userDocSnapshot = await getDoc(userDocRef);
    let nickname;

    if (userDocSnapshot.exists()) {
      nickname = userDocSnapshot.data().nickname;
      alert(`안녕하세요, ${nickname}님!`);
    } else {
      nickname = user.displayName || generateRandomNickname();
      await setDoc(userDocRef, {
        fullEmail: user.email,
        nickname,
        status: '',
        avatar: 'cat',
        token: '470bf4b0-975d-4d2b-a924-a78554a2b97c',
        signUpDate
      });
      alert(`안녕하세요, ${nickname}님!`);
    }
    return {
      fullEmail: user.email,
      nickname,
      status: '',
      avatar: 'cat',
      token: '470bf4b0-975d-4d2b-a924-a78554a2b97c',
      signUpDate,
      id: user.uid
    };
  } catch (error) {
    console.error(error);
  }
};
