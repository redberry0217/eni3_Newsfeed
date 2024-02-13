import React from 'react';
import Header from './Header';
import styled from 'styled-components';
import Footer from './Footer';

function Layout({ children }) {
  return (
    <div>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </div>
  );
}

const Main = styled.main`
  max-width: 1500px;
  width: 100%;
  margin: 2rem auto;
`;

export default Layout;
