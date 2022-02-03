import { Card } from './Card';
import Link from 'next/link';
import styled from '@emotion/styled';
import CardData from '../data/CardData.json';

export const CardContainer = () => {
  return (
    <Container>
      <h2 className="sr-only">하트링 상품 리스트</h2>
      <CardUl>
        {CardData.map((data) => {
          return (
            <li key={`Card-key-${data.label}`}>
              <Link href="/details">
                <a>
                  <Card data={data} />
                </a>
              </Link>
            </li>
          );
        })}
      </CardUl>
    </Container>
  );
};
const Container = styled.section`
  margin: 0 100px;
`;
const CardUl = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 50px;
`;
