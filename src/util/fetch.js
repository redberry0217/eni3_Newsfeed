import { collection, getDocs } from 'firebase/firestore';
import { db } from 'shared/firebase';

export const fetchUsers = async () => {
  let usersList = [];
  try {
    const userRef = collection(db, 'users');
    const userSnapshot = await getDocs(userRef);

    userSnapshot.forEach((doc) => {
      usersList.push({ id: doc.id, ...doc.data() });
    });
  } catch (error) {
    console.error('Error fetching users:', error);
  }
  return usersList;
};

export const fetchArticle = async () => {
  let articlesList = [];
  try {
    const articlesRef = collection(db, 'articles');
    const articlesSnapshot = await getDocs(articlesRef);

    articlesSnapshot.forEach((doc) => {
      articlesList.push({ id: doc.id, ...doc.data() });
    });
  } catch (error) {
    console.error('Error fetching articles:', error);
  }
  return articlesList;
};
