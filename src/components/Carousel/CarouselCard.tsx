import Link from 'next/link';
import styled from '@emotion/styled';

import { CarouselData } from '../../types/CarouselData';
import { COLOR } from '../../constants';

interface Data {
  data: CarouselData;
}

export const CarouselCard = ({ data }: Data) => {
  const { label, content, path } = data;
  return (
    <Container>
      <CarouselComment>
        <H3>{label}</H3>
        <P>{content}</P>
        <SvgContainer>
          <Link href={path}>
            <a>
              <span>바로가기</span>
              <svg className="SvgIcon" viewBox="0 0 18 18">
                <path d="m11.955 9-5.978 5.977a.563.563 0 0 0 .796.796l6.375-6.375a.563.563 0 0 0 0-.796L6.773 2.227a.562.562 0 1 0-.796.796L11.955 9z"></path>
              </svg>
            </a>
          </Link>
        </SvgContainer>
      </CarouselComment>
    </Container>
  );
};

const Container = styled.li`
  list-style: none;
  position: relative;
  width: 100%;
  margin: 0 10px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;
const CarouselComment = styled.article`
  position: absolute;
  bottom: 90px;
  right: 200px;
  background-color: #fff;
  width: 330px;
  height: 200px;
  border-radius: 4px;
  box-sizing: border-box;
  border: 1px solid ${COLOR.MAIN};
`;
const H3 = styled.h3`
  font-size: 20px;
  line-height: 1.5;
  margin: 20px 0 0 20px;
`;
const P = styled.p`
  font-size: 14px;
  line-height: 1.5;
  margin: 5px 0 20px 20px;
  width: 240px;
  height: 70px;
`;
const SvgContainer = styled.div`
  position: relative;
  span {
    color: ${COLOR.MAIN};
    font-size: 14px;
    font-weight: 700;
  }
  svg {
    fill: ${COLOR.MAIN};
  }
  &::before {
    position: absolute;
    top: 0;
    left: 0;
    content: '';
    width: 100%;
    height: 1px;
    background-color: #ececec;
  }
  span {
    display: inline-block;
    margin: 20px 5px 0 20px;
  }
  .SvgIcon {
    width: 10px;
    height: 10px;
  }
`;
