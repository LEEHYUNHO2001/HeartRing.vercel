import React, { useState } from 'react';
import styled from '@emotion/styled';

import { DUMMY_DATA } from '../../constants/index';
import Link from 'next/link';

interface propsData {
  datas: [
    {
      src: string;
      seller: string;
      title: string;
      price: number;
      sale: number;
      content: string;
      orderNum: number;
    }
  ];
}
interface CalcData {
  data: {
    price: number;
    discount_percent: number;
  };
}
const Calculate = (price: number, discount_percent: number) => {
  return price - (price / 100) * discount_percent;
};

const Cart = ({ datas }: propsData) => {
  const FAKE_DATA = [
    ...[DUMMY_DATA],
    ...[DUMMY_DATA],
    ...[DUMMY_DATA],
    ...[DUMMY_DATA],
  ];
  const [totalPrice, setTotalPrice] = useState(0);
  return (
    <Container>
      <CartHeader>장바구니</CartHeader>
      <CartInfo>
        <CardInfoList>
          <StyleText color="#a26f59">
            장바구니 상품은 최대 30일간 저장됩니다.
          </StyleText>
        </CardInfoList>
        <CardInfoList>
          가격, 옵션 등 정보가 변경된 경우 주문이 불가할 수 있습니다.
        </CardInfoList>
        <CardInfoList>
          오늘출발 상품은 판매자 설정 시점에 따라 오늘출발 여부가 변경될 수
          있으니 주문 시 꼭 다시 확인해 주시기 바랍니다.
        </CardInfoList>
      </CartInfo>
      <CartContainer>
        <thead>
          <tr>
            <th>
              <input type="checkbox" id={'SelectAll'} />
              <label htmlFor={'SelectAll'} />
            </th>
            <th>
              <span>상품정보</span>
            </th>
            <th>옵션</th>
            <th>상품금액</th>
            <th>배송비</th>
          </tr>
        </thead>
        <tbody>
          {FAKE_DATA &&
            FAKE_DATA.map((data, idx) => {
              return (
                <CartList key={idx}>
                  <td>
                    <input type="checkbox" id={String(idx)} />
                    <label htmlFor={String(idx)} />
                  </td>
                  <td>
                    <img src={data.imageArray[0]} />
                    <div>
                      <p>
                        <Link href="#">{data.seller}</Link>
                      </p>
                      <p>
                        <Link href="/details">{data.title}</Link>
                      </p>
                      <p>
                        <span>
                          {Calculate(
                            data.price,
                            data.discount_percent
                          ).toLocaleString()}
                          원
                        </span>
                        <span>{data.price.toLocaleString()}원</span>
                      </p>
                    </div>
                  </td>
                  <AlginCenterTd>
                    <span>
                      {data.description}
                      {idx + 1}개
                    </span>
                  </AlginCenterTd>
                  <AlginCenterTd>
                    {(
                      Calculate(data.price, data.discount_percent) *
                      (idx + 1)
                    ).toLocaleString()}
                    원
                  </AlginCenterTd>
                  <td>
                    <SmallText>기본배송비 2,500원</SmallText>
                  </td>
                </CartList>
              );
            })}
          <tr>
            <td>
              <input type={'checkbox'} id={'SelectItem'} />
              <label htmlFor={'SelectItem'} />
            </td>
            <td className={'BtnContainer'}>
              <button>선택상품 삭제</button>
              <button>선택상품 찜</button>
            </td>
          </tr>
          <tr>
            <td></td>
            <AlginCenterTd>
              <p>
                <span>총 상품금액</span>
                <span>배송비</span>
                <span>할인예상금액</span>
              </p>
            </AlginCenterTd>
            <AlginCenterTd>
              총 주문금액 &nbsp;
              <StyleText color="#a26f59">
                {totalPrice.toLocaleString()}원
              </StyleText>
            </AlginCenterTd>
          </tr>
        </tbody>
      </CartContainer>
      <ButtonContainer>
        <Button>쇼핑계속하기</Button>
        <Button color={'#a26f59'}>주문하기</Button>
      </ButtonContainer>
      <ADD>
        <a href="https://plusdeal.naver.com/?ic=K07106&pcode=Naver_shopping_A">
          <img
            src={
              'https://phinf.pstatic.net/shop/20220118_257/1642501771990zItwR_JPEG/pc_EC87BCED9591EC9EA5EBB094EAB5ACEB8B88_2308x120.jpg'
            }
          />
        </a>
      </ADD>
    </Container>
  );
};

export default Cart;
const Container = styled.section`
  width: 95%;
  margin: auto;
`;
const CartHeader = styled.div`
  display: flex;
`;
const CartInfo = styled.ul`
  margin-top: 20px;
  padding: 10px;
  list-style: inside;
  background-color: #fafbfc;
  border: 1px solid #dadada;
  border-radius: 4px;
`;
const StyleText = styled.span`
  color: ${(props) => (props.color ? props.color : 'black')};
`;
const CardInfoList = styled.li`
  font-size: 14px;
  line-height: 1.6;
`;
const CartContainer = styled.table`
  width: 100%;
  margin-top: 20px;
  border-top: 2px solid black;
  border-bottom: 2px solid black;
  input {
    display: none;
  }
  input + label {
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 1px solid #dadada;
    position: relative;
    margin-right: 10px;
    cursor: pointer;
  }
  input:checked + label::after {
    content: '✔';
    font-size: 12px;
    width: 20px;
    height: 20px;
    text-align: center;
    position: absolute;
    left: 0;
    top: 0;
  }
  tr {
    display: grid;
    grid-template-columns: 60px 4fr 3fr 1fr 1fr;
  }
  tr > th {
    padding: 20px 0;
    font-size: 16px;
    border-bottom: 1px solid #dadada;
  }
  tr > td {
    padding: 20px 0;
    font-size: 16px;
  }
  tr > * > input {
    border: none;
  }
  tbody > tr {
    border-bottom: 1px solid #dadada;
  }
  tbody > tr > td {
    padding: 10px;
  }
  tr > td {
    display: flex;
    align-items: center;
  }
  tr > td > img {
    width: 100px;
    margin-right: 10px;
  }
  tr > td > div > p {
    font-size: 16px;
    line-height: 1.6;
    :nth-of-type(3) > :nth-of-type(2) {
      margin-left: 10px;
      color: #dadada;
      text-decoration: line-through;
    }
  }
  .BtnContainer {
    border-right: none;
    button {
      padding: 5px 10px;
      margin-right: 10px;
      background-color: white;
      border: 1px solid #dadada;
      border-radius: 4px;
      cursor: pointer;
    }
  }
`;
const CartList = styled.tr``;
const AlginCenterTd = styled.td`
  margin: auto;
  text-align: center;
`;
const SmallText = styled.p`
  font-size: 12px;
  margin: auto;
`;
const ButtonContainer = styled.div`
  margin: 40px auto;
  justify-content: center;
  display: flex;
`;
const Button = styled.button`
  padding: 10px 40px;
  color: ${(props) => (props.color ? 'white' : 'black')};
  border: 1px solid ${(props) => (props.color ? props.color : '#dadada')};
  border-radius: 3px;
  background-color: ${(props) => (props.color ? props.color : 'white')};
  cursor: pointer;
  :first-of-type {
    margin-right: 5px;
  }
`;
const ADD = styled.div`
  cursor: pointer;
  img {
    width: 100%;
  }
`;
