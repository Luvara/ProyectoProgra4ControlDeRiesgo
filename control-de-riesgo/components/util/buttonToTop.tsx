import React, { useState, useEffect } from 'react';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <button
      onClick={handleScrollToTop}
      className={`fixed bottom-4 right-4 text-white  bg-slate-500 bg-opacity-50 font-bold py-3 px-2 rounded-full border shadow-lg hover:bg-white hover:text-black focus:outline-none ${
        isVisible ? 'block' : 'hidden'
      }`}
    >
      ↑ Inicio
    </button>
  );
};

export default ScrollToTopButton;