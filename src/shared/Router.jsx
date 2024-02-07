import { BrowserRouter, Route, Routes } from 'react-router-dom';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route to="/" element={<Home />} />
        <Route to="/detail/:id" element={<Detail />} />
        <Route to="/mypage" element={<MyPage />} />
        <Route to="/submit" element={<CodeSubmit />} />
        <Route to="/auth" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
