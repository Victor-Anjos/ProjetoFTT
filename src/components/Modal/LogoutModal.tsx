import React, { useEffect, useRef } from 'react';
import styles from './LogoutModal.module.css'; // Importa o CSS do LogoutModal
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'; // Ícone de aviso

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // Permite fechar ao clicar no overlay apenas se não estiver desativado
    // Como queremos forçar o uso dos botões, vamos desativar isso por padrão
    // if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
    //   onClose();
    // }
  };

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden'; // Impede o scroll do corpo
    } else {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset'; // Restaura o scroll
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset'; // Garante restauração no unmount
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modalContent} ref={modalRef}>
        {/* Ícone específico para o modal de logout */}
        <div className={styles.modalIconContainer}>
          <FontAwesomeIcon icon={faExclamationTriangle} className={styles.modalIcon} style={{ color: '#dc3545' }} />
        </div>

        <h2 className={styles.modalTitle}>Confirmação de Logout</h2>
        
        <div className={styles.modalBody}>
          <p>Você tem certeza que deseja sair da aplicação?</p>
        </div>
        
        <div className={styles.modalActions}>
          {/* Botões com classes de estilo definidas diretamente neste CSS */}
          <button className={styles.cancelButton} onClick={onClose}>
            Não
          </button>
          <button className={styles.confirmButton} onClick={onConfirm}>
            Sim
          </button>
        </div>
        
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
      </div>
    </div>
  );
};

export default LogoutModal;