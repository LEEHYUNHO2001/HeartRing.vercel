import { Card } from './Card';
import Link from 'next/link';
import styled from '@emotion/styled';

export const CardContainer = () => {
  const CardData = [
    {
      src: './images/라인꽃반지.jpg',
      label: '라인 꽃 반지',
      price: 160000,
      sale: 18,
      content:
        '아기자기한 꽃과 블링한 다이아가 조화롭게 선을 이룬 반지입니다. 가드링으로 착용하시기 좋고, 쌍가락지로 착용하기도 좋습니다.',
    },
    {
      src: './images/쁘띠플라워링.jpg',
      label: '쁘띠 플라워링',
      price: 285000,
      sale: 14,
      content:
        '메인에 청 다이아가 조각되어있는 꽃무늬 반지입니다. 부담없이 어디에도 착용할 수 있는 반지입니다.',
    },
    {
      src: './images/크라운하트링.jpg',
      label: '크라운 하트링',
      price: 278000,
      sale: 19,
      content:
        '두줄 레이어드 링처럼 착용하실 수 있는 청 다이아 크라운 하트링 입니다.',
    },
    {
      src: './images/딸랑이이니셜링.jpg',
      label: '딸랑이 이니셜 링',
      price: 212000,
      sale: 25,
      content:
        '그린 다이아몬드가 세공되어 있어 세련되 보이는 딸랑이 Forever 반지입니다.',
    },
  ];

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
