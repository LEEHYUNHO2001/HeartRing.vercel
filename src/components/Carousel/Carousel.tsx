import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { CarouselCard } from './CarouselCard';
import CardData from '../../data/CardData.json';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

type WrapperProps = {
  curIdx: number;
  imgSRCLen: number;
};

type ContainerProps = {
  curIdx: number;
};

export const Carousel = () => {
  const [curIdx, setCurIdx] = useState(0);
  const [isHover, setIsHover] = useState(true);
  const [mouseDownClientX, setMouseDownClientX] = useState(0);
  const [mouseUpClientX, setMouseUpClientX] = useState(0);
  const imgSRCLen = CardData.length;

  const prevBtn = () => {
    setCurIdx(curIdx - 1);
  };
  const nextBtn = () => {
    setCurIdx(curIdx + 1);
  };

  const onMouseOver = () => {
    setIsHover(false);
  };
  const onMouseOut = () => {
    setIsHover(true);
  };

  const onMouseDown = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setMouseDownClientX(e.clientX);
  };
  const onMouseUp = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setMouseUpClientX(e.clientX);
  };

  useEffect(() => {
    const dragSpace = Math.abs(mouseDownClientX - mouseUpClientX);

    if (mouseDownClientX !== 0) {
      if (mouseUpClientX < mouseDownClientX && dragSpace > 100) {
        setCurIdx(curIdx + 1);
      } else if (mouseUpClientX > mouseDownClientX && dragSpace > 100) {
        setCurIdx(curIdx - 1);
      }
    }
  }, [mouseUpClientX]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (isHover) {
      intervalId = setInterval(() => {
        setCurIdx(curIdx + 1);
      }, 3000);
    }
    return () => clearTimeout(intervalId);
  }, [isHover, setCurIdx, curIdx]);

  const getStaticIdx = useCallback(
    (newID) => {
      let rest = newID % imgSRCLen;
      if (rest < 0) {
        rest += imgSRCLen;
      }
      return rest;
    },
    [imgSRCLen]
  );

  return (
    <Container
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      <CarouselWrapper curIdx={curIdx} imgSRCLen={imgSRCLen}>
        <CarouselContainer curIdx={curIdx}>
          {Array(imgSRCLen * 2 + 1)
            .fill(1)
            .map((_, i) => {
              const newID = curIdx + i - imgSRCLen;
              return {
                staticIdx: getStaticIdx(newID),
                newID,
              };
            })
            .map(({ staticIdx, newID }, i) => {
              return (
                <CarouselItem key={newID}>
                  <Link href={CardData[staticIdx].path}>
                    <a>
                      {curIdx === curIdx - i + 2 ? (
                        <ImgCurrent src={CardData[staticIdx].src} />
                      ) : (
                        <ImgOther src={CardData[staticIdx].src} />
                      )}
                    </a>
                  </Link>
                  {curIdx === curIdx - i + 2 && (
                    <CarouselCard data={CardData[staticIdx]} />
                  )}
                </CarouselItem>
              );
            })}
        </CarouselContainer>
      </CarouselWrapper>
      <Btn onClick={prevBtn} className="prev" aria-label="이전 버튼">
        <ArrowBackIosNewIcon />
      </Btn>
      <Btn onClick={nextBtn} className="next" aria-label="다음 버튼">
        <ArrowForwardIosIcon />
      </Btn>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  overflow: hidden;
  margin: 25px 0;
`;

const WrapperTransform = ({ curIdx, imgSRCLen }: WrapperProps) => css`
  transform: translateX(${-1885 - 1090 * curIdx}px);
`;

const CarouselWrapper = styled.div`
  ${WrapperTransform}
  transition: 1s;
`;

const ContainerTransform = ({ curIdx }: ContainerProps) => css`
  transform: translateX(${1090 * curIdx}px);
`;

const CarouselContainer = styled.div`
  ${ContainerTransform}
  display: inline-flex;
`;
const Btn = styled.button`
  position: absolute;
  top: 120px;
  height: 60px;
  width: 30px;
  border-radius: 15px;
  opacity: 0.5;
  background-color: #fff;
  &.prev {
    left: 10vw;
  }
  &.next {
    right: 10vw;
  }
  svg {
    width: 16px;
    height: 16px;
  }
`;
const CarouselItem = styled.div`
  width: 1060px;
  margin: 0 15px;
`;
const ImgCurrent = styled.img`
  height: 350px;
  display: block;
  border-radius: 5px;
  -webkit-user-drag: none;
`;
const ImgOther = styled.img`
  height: 350px;
  border-radius: 5px;
  filter: brightness(0.5);
`;
