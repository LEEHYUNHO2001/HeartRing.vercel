import styled from '@emotion/styled';
import { COLOR } from '../constants';

interface CardData {
  data: {
    src: string;
    label: string;
    price: number;
    sale: number;
    content: string;
  };
}

export const Card = ({ data }: CardData) => {
  const { src, label, price, sale, content } = data;

  const salePrice = (price * (100 - sale) * 0.01).toLocaleString(undefined);
  const OriginPrice = price.toLocaleString(undefined);

  return (
    <Container>
      <Img src={src} alt={label} />
      <div>
        <Label>[하트링] {label}</Label>
        <PriceContainer>
          <SalePrice>{salePrice}원</SalePrice>
          <Price>{OriginPrice}원</Price>
          <Sale>{sale}%</Sale>
        </PriceContainer>
        <Content>{content}</Content>
      </div>
    </Container>
  );
};

const Container = styled.article`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const Img = styled.img`
  width: 100%;
`;
const Label = styled.h3`
  font-size: 20px;
  font-weight: 700;
  margin: 5px 0;
`;
const PriceContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;
const SalePrice = styled.span`
  font-weight: 700;
`;
const Price = styled.span`
  position: relative;
  font-size: 14px;
  opacity: 0.5;
  margin: 0 10px 0 5px;
  &::before {
    content: '';
    position: absolute;
    top: 8px;
    left: 2px;
    width: 100%;
    height: 1px;
    background-color: #000;
  }
`;
const Sale = styled.span`
  font-size: 24px;
  font-weight: 700;
  color: ${COLOR.MAIN};
`;
const Content = styled.p`
  font-size: 14px;
  opacity: 0.4;
  width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
