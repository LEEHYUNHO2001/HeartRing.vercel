import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from '@emotion/styled';
import Modal from '../../Modal';
import AppFooter from '../AppFooter';
import Category from './Category/Category';
import { Logined } from './AppHeaderData';

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
      <AppHeaderContainer>
        {isLoggedIn ? (
          <AppHeaderMenu>
            {Logined.map((data) => {
              const { name, path } = data;
              return (
                <AppHeaderMenuList key={`AppHeaderMenuList-${name}`}>
                  <Link href={path}>{name}</Link>
                </AppHeaderMenuList>
              );
            })}
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
      </AppHeaderContainer>
      <CategoryContainer>
        <ImgContainer>
          <Link href="/">
            <a>
              <img src="./images/heartring.jpg" alt="" />
            </a>
          </Link>
        </ImgContainer>
        <Category />
      </CategoryContainer>
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

const CategoryContainer = styled.div`
  margin-top: 50px;
  width: 100%;
`;
const AppHeaderContainer = styled.div`
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
const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
`;
