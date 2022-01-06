import React ,{ useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import {
  CarouSelContainer,
  EmblaViewport,
  EmblaContainer,
  EmblaSlide,
  EmblaSlideInner,
  EmblaSlideImg,
  EmblaButton,
  EmblaButtonSVG
} from './style'
type ButtonProps = {
  next : boolean,
  enabled: boolean,
  onClick: React.MouseEventHandler
}
type SlideProps = {
  slides: React.ReactNode
}
const CarouSel = ({slides}: SlideProps) => {
  const [viewportRef, embla] = useEmblaCarousel({ skipSnaps: false });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);

  const onSelect = useCallback(() => {
    if (!embla) return;
    setPrevBtnEnabled(embla.canScrollPrev());
    setNextBtnEnabled(embla.canScrollNext());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    embla.on("select", onSelect);
    onSelect();
  }, [embla, onSelect]);
  const NextButton = ({ next,enabled, onClick }: ButtonProps) => (
    <EmblaButton
      next={true}
      onClick={onClick}
      disabled={!enabled}
    >
      
      <EmblaButtonSVG viewBox="0 0 238.003 238.003">
        <path d="M181.776 107.719L78.705 4.648c-6.198-6.198-16.273-6.198-22.47 0s-6.198 16.273 0 22.47l91.883 91.883-91.883 91.883c-6.198 6.198-6.198 16.273 0 22.47s16.273 6.198 22.47 0l103.071-103.039a15.741 15.741 0 0 0 4.64-11.283c0-4.13-1.526-8.199-4.64-11.313z" />
      </EmblaButtonSVG>
    </EmblaButton>
  );
  
  const PrevButton = ({ next,enabled, onClick }: ButtonProps) => (
    <EmblaButton
      next={false}
      onClick={onClick}
      disabled={!enabled}
    >
      <EmblaButtonSVG viewBox="137.718 -1.001 366.563 644">
        <path d="M428.36 12.5c16.67-16.67 43.76-16.67 60.42 0 16.67 16.67 16.67 43.76 0 60.42L241.7 320c148.25 148.24 230.61 230.6 247.08 247.08 16.67 16.66 16.67 43.75 0 60.42-16.67 16.66-43.76 16.67-60.42 0-27.72-27.71-249.45-249.37-277.16-277.08a42.308 42.308 0 0 1-12.48-30.34c0-11.1 4.1-22.05 12.48-30.42C206.63 234.23 400.64 40.21 428.36 12.5z" />
      </EmblaButtonSVG>
    </EmblaButton>
  );
  return (
    <CarouSelContainer>
      <EmblaViewport ref={viewportRef}>
        <EmblaContainer>
        {slides && slides.map((index) => (
            <EmblaSlide key={index}>
              <EmblaSlideInner >
                <EmblaSlideImg
                  src={(index)}
                />
              </EmblaSlideInner>
            </EmblaSlide>
          ))}
        </EmblaContainer>
      </EmblaViewport>
      <PrevButton next={false} onClick={scrollPrev} enabled={prevBtnEnabled} />
      <NextButton next={true} onClick={scrollNext} enabled={nextBtnEnabled} />
    </CarouSelContainer>
  );
}
export default CarouSel