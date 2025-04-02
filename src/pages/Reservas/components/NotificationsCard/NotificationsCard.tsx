// NotificacoesCard.tsx
import React from "react";
import styles from "../../Reservas.module.css";
import MainCard from "../../../../components/MainCard/MainCard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Notificacao } from "../../../../services/api";

interface NotificacoesCardProps {
    notificacoes: Notificacao[];
    handleCancelReserva: (notificacaoId: string) => void;
}

const NotificacoesCard: React.FC<NotificacoesCardProps> = ({ notificacoes, handleCancelReserva }) => {
    return (
        <div className={styles.reservas_notifications_container}>
            <MainCard title="Notificações">
                <ul>
                    {notificacoes.length > 0 ? (
                        notificacoes.map((notificacao) => (
                            <li key={notificacao.id} className={styles.reservas_notification_item} data-testid={`notificacao-item-${notificacao.id}`}>
                                <p className={styles.reservas_notification_item_text}>{notificacao.texto}</p>
                                <button
                                    className={styles.reservas_notification_item_cancel}
                                    onClick={() => handleCancelReserva(notificacao.id)}
                                    data-testid={`cancelar-reserva-${notificacao.id}`}
                                >
                                    <FontAwesomeIcon icon={faTrashAlt} />
                                </button>
                            </li>
                        ))
                    ) : (
                        <div className={styles.reservas_notifications_empty} data-testid="nenhuma-notificacao">
                            <FontAwesomeIcon icon={faBell} className={styles.reservas_notifications_empty_icon} />
                            <h3 className={styles.reservas_notifications_empty_title}>Nenhuma notificação por enquanto</h3>
                            <p className={styles.reservas_notifications_empty_message}>Crie uma reserva para gerar uma notificação</p>
                        </div>
                    )}
                </ul>
            </MainCard>
        </div>
    );
};

export default NotificacoesCard;