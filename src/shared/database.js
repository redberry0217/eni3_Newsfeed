import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
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
    const articleRef = collection(db, 'articles');
    const articlesSnapshot = await getDocs(articleRef);

    articlesSnapshot.forEach((doc) => {
      articlesList.push({ id: doc.id, ...doc.data() });
    });
  } catch (error) {
    console.error('글목록 가져오기 에러', error);
  }
  return articlesList;
};

export const createArticle = async (article) => {
  try {
    const articleRef = collection(db, 'articles');
    const res = await addDoc(articleRef, article);
    return res;
  } catch (error) {
    console.error('게시글 추가 오류', error);
  }
};

export const updateArticle = async (id, updated) => {
  try {
    const collectionRef = doc(db, 'articles', id);
    await updateDoc(collectionRef, updated);
  } catch (error) {
    console.error('게시글 수정 오류', error);
  }
};

export const deleteArticle = async (id) => {
  try {
    const articleRef = doc(db, 'articles', id);
    await deleteDoc(articleRef);
  } catch (error) {
    console.error('게시글 삭제 오류', error);
  }
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

export const createComment = async (comment) => {
  try {
    const commentRef = collection(db, 'comments');
    const res = await addDoc(commentRef, comment);
    return res;
  } catch (error) {
    console.error('댓글 추가 오류', error);
  }
};

export const updateComment = async (id, updated) => {
  try {
    const commentRef = doc(db, 'comments', id);
    await updateDoc(commentRef, updated);
  } catch (error) {
    console.error('댓글 수정 오류', error);
  }
};

export const deleteComment = async (id) => {
  try {
    const commentRef = doc(db, 'comments', id);
    await deleteDoc(commentRef);
  } catch (error) {
    console.error('댓글 삭제 오류', error);
  }
};
