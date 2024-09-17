import { Button } from 'flowbite-react';
import { useEffect, useState } from 'react';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  const buttonStyle = {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    opacity: isVisible ? 1 : 0,
    transition: 'opacity 0.3s ease',
  };
  return (
    <Button
      outline
      gradientDuoTone="tealToLime"
      type="button"
      style={buttonStyle}
      onClick={scrollToTop}
    >
      Vissza az oldal tetejére
    </Button>
  );
}
