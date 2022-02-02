import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from '@emotion/styled';
import Image from 'next/image';
import Modal from '../../Modal';
import AppFooter from '../AppFooter';
import CateGory from './CateGory';
// import Search from './Search'
const AppHeaer: React.FC = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const router = useRouter();

  const [modalVisible, setModalVisible] = useState(false);
  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };
  return (
    <Container>
      <AppHeaderMenuWrapper>
        {isLoggedIn ? (
          <AppHeaderMenu>
            <AppHeaderMenuList>마이페이지</AppHeaderMenuList>
            <AppHeaderMenuList>
              <Link href="/cart">장바구니</Link>
            </AppHeaderMenuList>
            <AppHeaderMenuList>
              <Link href="/wish">위시리스트</Link>
            </AppHeaderMenuList>
            <AppHeaderMenuList>주문배송조회</AppHeaderMenuList>
            <AppHeaderMenuList>고객센터</AppHeaderMenuList>
            <AppHeaderMenuList onClick={() => setIsLoggedIn(!isLoggedIn)}>
              로그아웃
            </AppHeaderMenuList>
          </AppHeaderMenu>
        ) : (
          <AppHeaderMenu>
            <SignInButton onClick={openModal}>로그인</SignInButton>
            {modalVisible && (
              <Modal
                ModalTitle={'로그인'}
                width={360}
                visible={modalVisible}
                closable={true}
                maskClosable={true}
                onClose={closeModal}
                submitEvent={() => setIsLoggedIn(true)}
              >
                dd
              </Modal>
            )}
          </AppHeaderMenu>
        )}
      </AppHeaderMenuWrapper>
      <AppHeaerContainer>
        <AppHeaderMain>
          <AppHeaderMainWrapper>
            <Link href="/">메인화면</Link>
            <span>Heart Ring</span>
          </AppHeaderMainWrapper>
        </AppHeaderMain>
        <CateGory />
      </AppHeaerContainer>
      <Main>{children}</Main>
      <AppFooter />
    </Container>
  );
};

export default AppHeaer;
const Container = styled.div``;

const Main = styled.main`
  height: 100%;
  padding: 50px 30px;
`;

const AppHeaerContainer = styled.div`
  width: 100%;
`;
const AppHeaderMenuWrapper = styled.div`
  position: -webkit-sticky;
  background-color: white;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.2);
  position: sticky;
  top: 0;
`;
const AppHeaderMenu = styled.ul`
  position: relative;
  height: 1.1vh;
  list-style: none;
  display: flex;
  justify-content: end;
  padding: 10px 20px;
`;
const AppHeaderMenuList = styled.li`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.5);
  margin-left: 10px;
  :hover {
    font-weight: 700;
    color: rgba(0, 0, 0, 0.9);
    cursor: pointer;
  }
`;
const SignInButton = styled.button`
  width: 100px;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.5);
  border: none;
`;
const AppHeaderMain = styled.div`
  margin: auto;
  padding: 0 10%;
`;
const AppHeaderMainWrapper = styled.div`
  height: 2vh;
  margin: 20px 0 0 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-grow: 1;
  justify-content: space-between;
`;
