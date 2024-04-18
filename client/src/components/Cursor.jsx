import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useLocation } from 'react-router-dom';
import './Cursor.css';

function Cursor() {
  const location = useLocation();

  const onMouseMove = useRef((event) => {
    const { clientX, clientY } = event;
    gsap.set(dotRef.current, { x: clientX, y: clientY });
    gsap.to(cursorRef.current, { x: clientX - 17, y: clientY - 17 }).delay(0.01);
  });

  const onMouseEnterText = useRef((event) => {
    const circleElement = event.target;
    const circleBig = circleElement.classList.contains('circleBig');
    const noCircle = circleElement.classList.contains('noCircle');
    const dotBig = circleElement.classList.contains('dotBig');

    if (circleBig) {
      gsap.to(cursorRef.current, { scale: 3 });
      gsap.to(dotRef.current, { scale: 0 });
    }
    if (noCircle) {
      gsap.to(cursorRef.current, { scale: 0 });
      gsap.to(dotRef.current, { scale: 1 });
    }
    if (dotBig) {
      gsap.to(cursorRef.current, { scale: 0 });
      gsap.to(dotRef.current, { scale: 6 });
      // cursorTextRef.current.style.display = 'block';
    }
  });

  const onMouseLeaveText = useRef(() => {
    gsap.to(cursorRef.current, { scale: 1 });
    gsap.to(dotRef.current, { scale: 1 });
    cursorTextRef.current.style.display = 'none';
  });

  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const cursorTextRef = useRef(null);

  useEffect(() => {
    const onMouseMoveHandler = onMouseMove.current;
    const onMouseEnterHandler = onMouseEnterText.current;
    const onMouseLeaveHandler = onMouseLeaveText.current;
  
    document.addEventListener('mousemove', onMouseMoveHandler);
  
    const circleBigElements = document.querySelectorAll('.circleBig');
    const noCircleElements = document.querySelectorAll('.noCircle');
    const dotBigElements = document.querySelectorAll('.dotBig');
  
    circleBigElements.forEach((element) => {
      element.addEventListener('mouseenter', onMouseEnterHandler);
      element.addEventListener('mouseleave', onMouseLeaveHandler);
    });
  
    noCircleElements.forEach((element) => {
      element.addEventListener('mouseenter', onMouseEnterHandler);
      element.addEventListener('mouseleave', onMouseLeaveHandler);
    });
  
    dotBigElements.forEach((element) => {
      element.addEventListener('mouseenter', onMouseEnterHandler);
      element.addEventListener('mouseleave', onMouseLeaveHandler);
    });
  
    return () => {
      document.removeEventListener('mousemove', onMouseMoveHandler);
  
      circleBigElements.forEach((element) => {
        element.removeEventListener('mouseenter', onMouseEnterHandler);
        element.removeEventListener('mouseleave', onMouseLeaveHandler);
      });
  
      noCircleElements.forEach((element) => {
        element.removeEventListener('mouseenter', onMouseEnterHandler);
        element.removeEventListener('mouseleave', onMouseLeaveHandler);
      });
  
      dotBigElements.forEach((element) => {
        element.removeEventListener('mouseenter', onMouseEnterHandler);
        element.removeEventListener('mouseleave', onMouseLeaveHandler);
      });
    };
  }, [location]);

  return (
    <>
      <div id='custom-cursor' className='custom-cursor' ref={cursorRef}></div>
      <div id='dot' className='dot' ref={dotRef}>
        <span className='cursor-text' ref={cursorTextRef}>
          Click to View
        </span>
      </div>
    </>
  );
}

export default Cursor;
