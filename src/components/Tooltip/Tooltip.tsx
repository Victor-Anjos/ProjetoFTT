import React, { useState, useRef, useEffect } from 'react';
import styles from './Tooltip.module.css';

interface TooltipProps {
  children: React.ReactNode;
  text: string;
}

const Tooltip: React.FC<TooltipProps> = ({ children, text }) => {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setIsVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      className={styles.tooltipContainer}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={tooltipRef}
    >
      {children}
      {isVisible && <div className={styles.tooltip}>{text}</div>}
    </div>
  );
};

export default Tooltip;