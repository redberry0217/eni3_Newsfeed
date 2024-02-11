import Router from 'shared/Router';
import './App.css';
import GlobalStyle from './GlobalStyle';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { Provider } from 'react-redux';
import store from 'store/config/configStore';

function App() {
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log('user', user); // 사용자 인증 정보가 변경될 때마다 해당 이벤트를 받아 처리합니다. 로그인 로그아웃 확인
    });
  }, []);
  return (
    <Provider store={store}>
      <GlobalStyle />
      <Router />
    </Provider>
  );
}

export default App;
