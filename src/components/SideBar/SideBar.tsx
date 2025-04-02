import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./SideBar.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleRight, faHouse, faChartBar, faCalendarAlt, faCircleLeft } from '@fortawesome/free-solid-svg-icons';
import Logo from '../../assets/logoUniEvangelica.png';
import Tooltip from '../Tooltip/Tooltip';

const SideBar: React.FC = () => {
  const [isMinimized, setIsMinimized] = useState(() => {
    const storedMinimized = localStorage.getItem('sidebarMinimized');
    return storedMinimized ? JSON.parse(storedMinimized) : false;
  });
  const [showToggleButton, setShowToggleButton] = useState(true); // Novo estado para controlar a visibilidade do botão

  const toggleSidebar = () => {
    const newMinimized = !isMinimized;
    setIsMinimized(newMinimized);
    localStorage.setItem('sidebarMinimized', JSON.stringify(newMinimized));
  };

  useEffect(() => {
    const storedMinimized = localStorage.getItem('sidebarMinimized');
    if (storedMinimized) {
      setIsMinimized(JSON.parse(storedMinimized));
    }

    const handleResize = () => {
      if (window.innerWidth <= 1220) {
        setIsMinimized(true);
        setShowToggleButton(false);
      } else {
        setShowToggleButton(true);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const location = useLocation();

  return (
    <div className={`${styles.sidebar} ${isMinimized ? styles.minimized : ""}`}>
      {!isMinimized && (
        <div className={styles.logo}>
          <img src={Logo} alt="Logo UniEvangelica" />
        </div>
      )}

      {showToggleButton && (
        <button className={styles.toggleButton} onClick={toggleSidebar}>
          {isMinimized ? <FontAwesomeIcon icon={faCircleRight} /> : <FontAwesomeIcon icon={faCircleLeft} />}
        </button>
      )}

      {!isMinimized && (
        <>
          <div className={styles.menuItem}>
            <Link to="/dashboard" className={`${styles.itemHeader} ${location.pathname === '/dashboard' ? styles.active : ''}`}>
              <FontAwesomeIcon icon={faHouse} className={styles.menuIcon} />
              Dashboard
            </Link>
          </div>

          <div className={styles.menuItem}>
            <Link to="/relatorios" className={`${styles.itemHeader} ${location.pathname === '/relatorios' ? styles.active : ''}`}>
              <FontAwesomeIcon icon={faChartBar} className={styles.menuIcon} />
              Relatórios
            </Link>
          </div>

          <div className={styles.menuItem}>
            <Link to="/reservas" className={`${styles.itemHeader} ${location.pathname === '/reservas' ? styles.active : ''}`}>
              <FontAwesomeIcon icon={faCalendarAlt} className={styles.menuIcon} />
              Reservas
            </Link>
          </div>
        </>
      )}

      {isMinimized && (
        <div className={styles.minimizedMenu}>
          <Tooltip text="Dashboard">
            <Link to="/dashboard" className={styles.minimizedItem}>
              <FontAwesomeIcon icon={faHouse} className={styles.icon} />
            </Link>
          </Tooltip>
          <Tooltip text="Relatórios">
            <Link to="/relatorios" className={styles.minimizedItem}>
              <FontAwesomeIcon icon={faChartBar} className={styles.icon} />
            </Link>
          </Tooltip>
          <Tooltip text="Reservas">
            <Link to="/reservas" className={styles.minimizedItem}>
              <FontAwesomeIcon icon={faCalendarAlt} className={styles.icon} />
            </Link>
          </Tooltip>
        </div>
      )}
    </div>
  );
};

export default SideBar;