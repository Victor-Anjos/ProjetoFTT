import React from 'react';
import styles from './MainCard.module.css';

interface MainCardProps {
  title: string;
  children: React.ReactNode;
}

const MainCard: React.FC<MainCardProps> = ({ title, children }) => {
  return (
    <div className={styles.mainCardContainer}>
      <div className={styles.cardHeader}>
        <h2>{title}</h2>
      </div>
      <div className={styles.cardContent}>
        {children}
      </div>
    </div>
  );
};

export default MainCard;