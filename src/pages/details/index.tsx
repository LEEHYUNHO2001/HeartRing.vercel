import React, { useState, useEffect, useRef } from 'react';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { DetailsHeader } from '../../components/Details/DetailsHeader';

import FacebookIcon from '@mui/icons-material/Facebook';
import ShareIcon from '@mui/icons-material/Share';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import { DUMMY_DATA } from '../../constants';
const DetailsIndexPage: NextPage = () => {
  const imageListRef = useRef<HTMLUListElement>(null);
  const [current, setCurrent] = useState(0);
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    if (imageListRef.current) {
      [...imageListRef.current.children].map((child) => {
        child.addEventListener('mouseover', function () {
          if (child && child.getAttribute('id')) {
            const id = Number(child.getAttribute('id'));
            setCurrent(id);
          }
        });
      });
    }
  }, [imageListRef]);
  const handleQuantityChange = (e: any) => {
    if (Number(e.target.value) == 0) {
      alert('최소주문수량은 1개 입니다.');
      setQuantity(1);
      return;
    }
    setQuantity(Number(e.target.value));
  };
  const minusClick = () => {
    if (quantity === 1) {
      alert('최소주문수량은 1개 입니다.');
      setQuantity(1);
      return;
    }
    setQuantity(quantity - 1);
  };

  const handleLikeClick = () => {};
  const handleOrderClick = () => {
    const result = confirm(
      `${DUMMY_DATA.title} 제품 ${quantity}개 주문하시겠습니까? 가격은 ${
        quantity * DUMMY_DATA.price -
        (DUMMY_DATA.price / 100) * DUMMY_DATA.discount_percent
      }원 입니다`
    );
    if (result) {
      alert('주문페이지로 이동합니다');
    } else {
      alert('주문을 취소합니다.');
    }
  };
  const handleCartClick = () => {
    alert('장바구니에 추가되었습니다');
  };
  const handleWishClick = () => {
    alert('위시리스트에 추가되었습니다');
  };
  return (
    <Container>
      <article>
        <h2 className="sr-only">하트링 상세 페이지</h2>
        <ItemContainer>
          <ItemImageContainer>
            <ItemImageList ref={imageListRef}>
              {DUMMY_DATA &&
                DUMMY_DATA.imageArray.map((item: string, idx: number) => {
                  return (
                    <ItemImage key={idx} id={String(idx)}>
                      <Image src={item} />
                    </ItemImage>
                  );
                })}
            </ItemImageList>
            <ItemImageMain>
              <img src={DUMMY_DATA.imageArray[current]} />
              <Button color={'#da967a'} onClick={() => handleLikeClick()}>
                좋아요 {DUMMY_DATA.likes}
              </Button>
            </ItemImageMain>
          </ItemImageContainer>
          <ItemInfoContainer>
            <ItemInfoTitleContainer>
              <ItemInfoTitle>{DUMMY_DATA.title}</ItemInfoTitle>
            </ItemInfoTitleContainer>
            <ItmeInfoWrapper>
              <ItmeInfo>
                <ItemInfoContent color={'#a26f59'}>
                  {DUMMY_DATA.discount_percent}%
                </ItemInfoContent>
              </ItmeInfo>
              <div>
                <ItmeInfo>
                  <ItemInfoContent color={'#A6A6A6'}>
                    {DUMMY_DATA.price.toLocaleString()}원
                  </ItemInfoContent>
                </ItmeInfo>
                <ItmeInfo>
                  <ItemInfoContent>
                    {(
                      DUMMY_DATA.price -
                      (DUMMY_DATA.price / 100) * DUMMY_DATA.discount_percent
                    ).toLocaleString()}
                    원
                  </ItemInfoContent>
                </ItmeInfo>
              </div>
            </ItmeInfoWrapper>
            <SnsShareContainer>
              <span>SNS으로 공유하기</span>
              <img src={'./images/naverIcon.png'} />
              <img src={'./images/kakaotalkIcon.png'} />
              <ShareIcon />
              <FacebookIcon />
            </SnsShareContainer>
            <ResultContainer>
              <span>{DUMMY_DATA.title}</span>
              <QuantityContainer>
                <QuantityBtn onClick={() => minusClick()}>-</QuantityBtn>
                <OrderNumInput
                  type={'number'}
                  onChange={handleQuantityChange}
                  value={quantity}
                />
                <QuantityBtn onClick={() => setQuantity(quantity + 1)}>
                  +
                </QuantityBtn>
              </QuantityContainer>

              <Price>
                {(
                  quantity * DUMMY_DATA.price -
                  (DUMMY_DATA.price / 100) * DUMMY_DATA.discount_percent
                ).toLocaleString()}
                원
              </Price>
            </ResultContainer>
            <DeliveryContainer>
              <DeliveryIcon />
              <div>
                <p>
                  <span color={'#black'}>오늘출발 휴무일</span>
                </p>
                <p>
                  <span color={'#a26f59'}>지금 주문시 2/4(금)</span>에
                  발송됩니다
                </p>
              </div>
            </DeliveryContainer>
            <DeliveryInfoContainer>
              <p>
                <span>택배배송 </span>
                <span>2500원(주문시 결제)</span>
              </p>
              <p>
                <span>
                  일반 배송비 2,500원 | 도서산간지방(제주,울릉도) 10,000원
                </span>
              </p>
            </DeliveryInfoContainer>
            <OrderContainer>
              <Button color={'#a26f59'} onClick={() => handleOrderClick()}>
                BUY
              </Button>
              <div>
                <Button onClick={() => handleCartClick()}>장바구니</Button>
                <Button onClick={() => handleWishClick()}>위시리스트</Button>
              </div>
            </OrderContainer>
          </ItemInfoContainer>
        </ItemContainer>
      </article>
      <DetailsHeader />
      <h2 className="sr-only">상세정보 | 리뷰 | Q&A | 반품/교환</h2>
    </Container>
  );
};
// rgba(0,0,0,0.5);
export default DetailsIndexPage;

const Container = styled.section`
  width: 95%;
  margin: auto;
`;
const ItemContainer = styled.div`
  width: 100%;
  display: flex;
`;

const ItemImageList = styled.ul`
  margin: 0 20px;
  width: auto;
  text-align: center;
`;
const ItemImage = styled.li`
  display: block;
  margin: 0 5px 10px 0px;
  font-size: 12px;
  line-height: 14px;
  width: 100%;
`;
const Image = styled.img`
  width: 100px;
  :hover {
    cursor: pointer;
  }
`;
const ItemImageMain = styled.div`
  width: 80%;
  height: auto;
  display: flex;
  flex-direction: column;
  img {
    border: 1px solid #dadada;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const ItemImageContainer = styled.div`
  padding: 0 20px;
  width: 50%;
  display: flex;
`;
const ItemInfoContainer = styled.div`
  padding: 0 20px;
  width: 50%;
`;
const ItemInfoTitleContainer = styled.div`
  padding: 10px 0;
  /* background: linear-gradient(#353131, 80%, #726666); */
  border-radius: 4px;
  vertical-align: middle;
`;
const ItemInfoTitle = styled.span`
  font-size: 20px;
`;

const ItmeInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  div {
    display: flex;
    :first-of-type {
      margin-right: 10px;
    }
  }
`;

const ItmeInfo = styled.div`
  display: flex;
  margin-top: 15px;
`;
const ItemInfoContent = styled.span`
  color: ${(props) => (props.color ? props.color : 'black')};
`;
const SnsShareContainer = styled.div`
  width: 100%;
  margin: 20px 0;
  border: 1px solid #dadada;
  display: flex;
  justify-content: end;
  align-items: center;
  & > :first-of-type {
    font-size: 18px;
  }
  & > * {
    color: #353131;
    margin: 5px 15px 5px 0;
  }
  & > *:hover {
    cursor: pointer;
  }
  & :first-of-type {
    cursor: default;
    font-size: 12px;
  }
  svg {
    font-size: 24px;
    color: #a26f59;
  }
  img {
    width: 24px;
  }
`;
const ResultContainer = styled.div`
  width: 100%;
  margin: 20px 0;
  border: 1px solid #dadada;
  display: grid;
  grid-template-columns: 3fr 1fr 1fr;
  justify-content: space-between;
  align-items: center;
  & > span {
    font-size: 12px;
    color: #828282;
  }
  & > * {
    margin: 5px 20px;
  }
`;
const QuantityContainer = styled.div`
  display: flex;
  border: 1px solid #dadada;
`;
const OrderNumInput = styled.input`
  font-size: 12px;
  -moz-appearance: textfield;
  text-align: center;
  border: none;
  :focus {
    outline: none;
  }
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`;
const QuantityBtn = styled.button`
  background-color: white;
  border: none;
  :hover {
    cursor: pointer;
  }
`;
const Price = styled.span``;

const DeliveryContainer = styled.div`
  display: flex;
  padding: 10px;
  border: 1px solid #dadada;
  align-items: center;
  margin-bottom: 5px;
  div {
    margin-left: 10px;
    p {
      font-size: 12px;
      color: #828282;
    }
  }
`;
const DeliveryIcon = styled(DirectionsCarFilledIcon)`
  padding: 10px;
  border: 1px solid #dadada;
  color: white;
  background-color: #a26f59;
  padding: 3px;
  border-radius: 50%;
`;
const DeliveryInfoContainer = styled.div`
  padding: 10px;
  p > :nth-of-type(2) {
    color: #a26f59;
  }
  span {
    font-size: 12px;
  }
`;
const OrderContainer = styled.div`
  padding: 10px 0;
  text-align: center;
  div {
    margin: 10px 0;
    display: flex;
    button:first-of-type {
      margin-right: 10px;
    }
  }
`;
const Button = styled.button`
  height: 36px;
  padding: 0 28px;
  outline: none;
  font-size: 14px;
  font-weight: 700;
  border: 1px solid #dadada;
  width: 100%;
  background-color: ${(props) => (props.color ? `${props.color}` : 'white')};
  color: ${(props) => (props.color ? 'white' : '#dadada')};
  :hover {
    cursor: pointer;
    border: 1px solid ${(props) => (props.color ? '#dadada' : 'black')};
  }
`;
