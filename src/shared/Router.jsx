import Layout from '../components/Layout';
import Auth from 'pages/Auth';
import CodeSubmit from 'pages/CodeSubmit';
import Detail from 'pages/Detail';
import Home from 'pages/Home';
import MyPage from 'pages/MyPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/submit" element={<CodeSubmit />} />
          <Route path="/auth" element={<Auth />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
