import React, { useState } from 'react';
import styled from '@emotion/styled';
import { CategoryData } from './CategoryData';
import { COLOR } from '../../../../constants';
import Link from 'next/link';

const Category = () => {
  return (
    <CategoryContainer>
      <CategoryList>
        {CategoryData.map((data) => {
          const { name, path, submenu } = data;
          return (
            <CategoryItem key={`Category-${name}`}>
              <Link href={path}>{name}</Link>
              {submenu && (
                <SubMenuList className={`subMenu-${name}`}>
                  {submenu.map((submenuData) => {
                    const { path: subPath, name: subName } = submenuData;
                    return (
                      <SubMenuItem key={`SubMenu-${subName}`}>
                        <Link href={subPath}>{subName}</Link>
                      </SubMenuItem>
                    );
                  })}
                </SubMenuList>
              )}
            </CategoryItem>
          );
        })}
      </CategoryList>
    </CategoryContainer>
  );
};

export default Category;

const CategoryContainer = styled.div`
  width: 100%;
  height: 10vh;
  margin: auto;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
`;

const CategoryList = styled.ul`
  width: 100%;
  margin: 30px 0;
  display: flex;
  justify-content: center;
`;
const CategoryItem = styled.li`
  margin: 10px 40px;
  position: relative;
  font-size: 16px;
  height: 20px;
  :hover {
    color: ${COLOR.MAIN};
    font-weight: 700;
    cursor: pointer;
    .subMenu-더보기 {
      display: block;
      font-weight: 400;
      color: #000;
    }
  }
  &::before {
    content: '💖';
    margin: 0 5px;
  }
`;
const SubMenuList = styled.ul`
  display: none;
  position: absolute;
  font-size: 14px;
  width: 70px;
  top: 20px;
  left: 30px;
`;

const SubMenuItem = styled.li`
  border: 1px solid #dbdbdb;
  height: 20px;
  text-align: center;
  line-height: 1.3;
  background-color: #fff;
  &:hover {
    color: ${COLOR.MAIN};
    font-weight: 700;
  }
`;
