import { collection, getDocs } from 'firebase/firestore';
import { db } from 'shared/firebase';

export const getUsers = async () => {
  let usersList = [];
  try {
    const userRef = collection(db, 'users');
    const userSnapshot = await getDocs(userRef);

    userSnapshot.forEach((doc) => {
      usersList.push({ id: doc.id, ...doc.data() });
    });
  } catch (error) {
    console.error('유저 정보 저장 에러', error);
  }
  return usersList;
};

export const getArticles = async () => {
  let articlesList = [];
  try {
    const articlesRef = collection(db, 'articles');
    const articlesSnapshot = await getDocs(articlesRef);

    articlesSnapshot.forEach((doc) => {
      articlesList.push({ id: doc.id, ...doc.data() });
    });
  } catch (error) {
    console.error('글목록 가져오기 에러', error);
  }
  return articlesList;
};

export const getComments = async () => {
  let commentsList = [];
  try {
    const commentsRef = collection(db, 'comments');
    const commentSnapshot = await getDocs(commentsRef);

    commentSnapshot.forEach((doc) => {
      commentsList.push({ id: doc.id, ...doc.data() });
    });
  } catch (error) {
    console.error('댓글 목록 가져오기 에러', error);
  }
  return commentsList;
};
