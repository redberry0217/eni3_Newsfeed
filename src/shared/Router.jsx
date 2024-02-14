import Layout from '../components/layout/Layout';
import Auth from 'pages/Auth';
import CodeSubmit from 'pages/CodeSubmit';
import Detail from 'pages/Detail';
import Home from 'pages/Home';
import MyPage from 'pages/MyPage';
import SignUp from 'pages/SignUp';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthLayout from './AuthLayout';

function Router() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route element={<AuthLayout />}>
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/submit" element={<CodeSubmit />} />
          </Route>
          <Route path="/auth" element={<Auth />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default Router;
