import React, { useEffect, useState } from 'react';
import '../styles/foot.css';
import { FaCopyright } from 'react-icons/fa';

const Foot = () => {
  const [showFooter, setShowFooter] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const isScrollable = document.body.scrollHeight > window.innerHeight;

      if (!isScrollable) {
        setShowFooter(true); // Always show the footer if scrolling is not available
        return;
      }

      setShowFooter(scrollTop > lastScrollTop && scrollTop > 100); // Show footer if scrolling down and not at the very top

      setLastScrollTop(scrollTop <= 0 ? 0 : scrollTop); // For Mobile or negative scrolling
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollTop]);

  useEffect(() => {
    const isScrollable = document.body.scrollHeight > window.innerHeight;
    if (!isScrollable) {
      setShowFooter(true); // Always show the footer if scrolling is not available
    }
  }, []); // Run once on mount

  return (
    <div className={showFooter ? 'footers visible' : 'footers'}>
      <footer>
        <div className="foot"> 
          <p>
            <FaCopyright style={{ verticalAlign: 'middle', marginRight: '5px' }} />
            ClinicLink 2024 - Your Trusted Healthcare Provider
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Foot;
