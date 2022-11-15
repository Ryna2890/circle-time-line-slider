import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Mousewheel, Navigation, Pagination } from "swiper";
import { dataTimeLine, TimeLineItem } from "../../shared/consts";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { gsap } from "gsap";
import "@fontsource/pt-sans";
import "@fontsource/bebas-neue";

export const TimeLine = () => {
  const [dataCard, setDataCard] = useState<TimeLineItem>(dataTimeLine[0]);
  const [isDesktop, setIsDesktop] = useState<boolean>(true);
  const [swipe, setSwipe] = useState<any>();
  const anim = useRef(null);

  const handlerMainSlideChange = useCallback(
    (index: number) => {
      const card = dataTimeLine[index];
      setDataCard(card);
    },
    [setDataCard]
  );

  const handleWindowSizeChange = useCallback(() => {
    setIsDesktop(window.innerWidth >= 1390);
  }, [setIsDesktop]);

  // function handleWindowSizeChange() {
  //   setIsDesktop(window.innerWidth >= 1390);
  // }

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.to(".circleWrapper", {
        rotation: `${330 - 60 * swipe?.activeIndex}`,
      });
    }, anim);

    return () => ctx.revert();
  }, [swipe?.activeIndex]);

  return (
    <div className="wrapper">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <div className="wrapperLineX"></div>
      <div className="wrapperLineY"></div>
      <div className="layout">
        <div className="mainSwiperWrapper" ref={anim}>
          <div className="circleWrapper">
            {dataTimeLine.map((item, index) => {
              return (
                <div
                  id={index.toString()}
                  className={
                    swipe?.activeIndex === index ? "circleActive" : "circle"
                  }
                  style={{
                    transform: `rotate(${
                      (360 / dataTimeLine.length + 1) * index - index
                    }deg) translateX(265px)`,
                  }}
                  onClick={() => swipe?.slideTo(index)}
                >
                  <div
                    className="circleText"
                    style={{
                      transform: `rotate(${28}deg)`,
                    }}
                  >
                    {index + 1}
                  </div>
                  <div className="circlePoint"></div>
                  <div
                    className="circleType"
                    style={{
                      transform: `rotate(${28}deg)`,
                    }}
                  >
                    {item.type}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="layout_title">
            Исторические даты
            <div className="layout_line"></div>
          </div>
          <Swiper
            onBeforeInit={(swiper) => setSwipe(swiper)}
            onSlideChange={(swiper) =>
              handlerMainSlideChange(swiper.activeIndex)
            }
            slidesPerGroup={1}
            longSwipesMs={300}
            longSwipes={false}
            speed={300}
            loop={false}
            loopFillGroupWithBlank={false}
            cssMode={true}
            navigation={false}
            pagination={{
              el: ".pagination",
              clickable: true,
            }}
            mousewheel={true}
            keyboard={true}
            modules={[Navigation, Pagination, Mousewheel, Keyboard]}
            className="rangeSwiper"
          >
            {dataTimeLine.map((item) => {
              const [first, second] = item.range.split(" ");
              return (
                <>
                  <SwiperSlide className="rangeSwiperSlide" id={item.range}>
                    <div className="range">
                      <span>{first}</span>
                      <span>{second}</span>
                    </div>
                  </SwiperSlide>
                </>
              );
            })}
          </Swiper>
        </div>
        <div className="factsSwiperWrapper">
          <div className="line"></div>
          <Swiper
            className={"swiperFacts"}
            slidesPerView={isDesktop ? 3 : 2}
            speed={300}
            spaceBetween={25}
            slidesPerGroup={1}
            loop={false}
            loopFillGroupWithBlank={false}
            pagination={false}
            navigation={isDesktop}
            modules={[Pagination, Navigation]}
          >
            {dataCard?.facts.map((item) => {
              return (
                <SwiperSlide>
                  <div className="year">
                    {item.year}
                    <div className="text">{item.text}</div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        <div className="navWrapper">
          <div className="navigation">
            <div className="navigationText">
              {swipe?.activeIndex + 1}/{dataTimeLine?.length}
            </div>

            <div className="navigation-button">
              <div
                className={"navigation-button_prev"}
                onClick={() => swipe?.slidePrev()}
              ></div>
              <div
                className="navigation-button_next"
                onClick={() => swipe?.slideNext()}
              ></div>
            </div>
          </div>
          <div className="pagination"></div>
        </div>
      </div>
    </div>
  );
};
export default TimeLine;
