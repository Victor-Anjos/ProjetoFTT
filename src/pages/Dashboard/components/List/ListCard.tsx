import React from "react";
import styles from "../../Dashboard.module.css";
import Filters from "../../../../components/Filters/Filters";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faChevronLeft, faChevronRight, faUserGroup, faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import { Bloco, Sala } from "../../../../services/api";


interface ListCardProps {
    filters: { bloco: string; sala: string; capacidade: string; recursos: string };
    onFilterChange: (newFilters: { bloco: string; sala: string; capacidade: string; recursos: string }) => void;
    blocos: Bloco[];
    selectedDate: string;
    setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
    selectedTime: string;
    setSelectedTime: React.Dispatch<React.SetStateAction<string>>;
    blocosExibidos: Bloco[];
    filteredSalas: Sala[];
    carouselIndices: { [blocoId: string]: number };
    isSalaOcupada: (salaId: string) => boolean;
    handlePrev: (blocoId: string) => void;
    handleNext: (blocoId: string) => void;
    setCarouselIndices: React.Dispatch<React.SetStateAction<{ [blocoId: string]: number }>>;
}

interface SalaCarouselProps {
    sala: Sala | undefined;
    isSalaOcupada: (salaId: string) => boolean;
}

const SalaCarousel: React.FC<SalaCarouselProps> = ({ sala, isSalaOcupada }) => {
    if (!sala) {
        return null;
    }

    return (
        <div className={styles.salaCarousel}>
            <div className={`${styles.salaCard} ${isSalaOcupada(sala.id) ? styles['salaCard--ocupada'] : styles['salaCard--livre']}`}>
                <p className={styles.salaCard__paragraph}>
                    <FontAwesomeIcon icon={faDoorOpen} className={styles.blocoCard__icon} /> {sala.nome}
                </p>
                <p className={styles.salaCard__paragraph}>
                    <FontAwesomeIcon icon={faUserGroup} className={styles.blocoCard__icon} /> {sala.capacidade}
                </p>
                <div className={styles['salaCard__status']}>
                    {isSalaOcupada(sala.id) ? "Ocupada" : "Livre"}
                </div>
            </div>
        </div>
    );
};

const ListCard: React.FC<ListCardProps> = ({
    filters,
    onFilterChange,
    blocos,
    selectedDate,
    setSelectedDate,
    selectedTime,
    setSelectedTime,
    blocosExibidos,
    filteredSalas,
    carouselIndices,
    isSalaOcupada,
    handlePrev,
    handleNext,
    setCarouselIndices,
}) => {
    return (
        <div className={styles.card}>
            <h3 className={styles.card__title}>Lista de Blocos e Salas Cadastradas</h3>

            <Filters onFilterChange={onFilterChange} blocos={blocos} />

            <div className={styles.filterTime}>
                <label htmlFor="date" className={styles.filterTime__label}>Data:</label>
                <input
                    type="date"
                    id="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className={styles.filterTime__input}
                />
                <label htmlFor="time" className={styles.filterTime__label}>Horário:</label>
                <input
                    type="time"
                    id="time"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className={styles.filterTime__input}
                />
            </div>

            <div className={styles.listContainer}>
                <div className={styles.listContainer__scroll}>
                    {blocosExibidos.length > 0 ? (
                        blocosExibidos.map((bloco) => {
                            const salasDoBloco = filteredSalas.filter((sala) => sala.blocoId === bloco.id);
                            const hasMultipleSalas = salasDoBloco.length > 1;
                            const currentIndexBloco = carouselIndices[bloco.id] !== undefined ? carouselIndices[bloco.id] : (hasMultipleSalas ? 0 : -1);
                            const salaExibida = salasDoBloco[currentIndexBloco] || salasDoBloco[0];

                            if (hasMultipleSalas && carouselIndices[bloco.id] === undefined) {
                                setCarouselIndices(prevIndices => ({ ...prevIndices, [bloco.id]: 0 }));
                            }

                            return (
                                <div key={bloco.id} className={styles.blocoCard} data-testid={`bloco-card-${bloco.nome.toLowerCase().replace(/\s+/g, '-')}`}>
                                    <div className={styles.blocoCard__title}>
                                        {hasMultipleSalas && (
                                            <button className={styles.salaCarousel__button} onClick={() => handlePrev(bloco.id)}>
                                                <FontAwesomeIcon icon={faChevronLeft} />
                                            </button>
                                        )}
                                        <h4>{bloco.nome}</h4>
                                        {hasMultipleSalas && (
                                            <button className={styles.salaCarousel__button} onClick={() => handleNext(bloco.id)}>
                                                <FontAwesomeIcon icon={faChevronRight} />
                                            </button>
                                        )}
                                    </div>
                                    {salasDoBloco.length > 0 && currentIndexBloco !== -1 ? (
                                        <SalaCarousel
                                            sala={salaExibida}
                                            isSalaOcupada={isSalaOcupada}
                                        />
                                    ) : salasDoBloco.length === 1 ? (
                                        <SalaCarousel
                                            sala={salasDoBloco[0]}
                                            isSalaOcupada={isSalaOcupada}
                                        />
                                    ) : (
                                        <p className={styles.blocoCard__paragraph}>Nenhuma sala criada</p>
                                    )}
                                </div>
                            );
                        })
                    ) : (
                        <div className={styles.notificacaoInnerContainer} data-testid="nenhum-item-cadastrado">
                            <FontAwesomeIcon icon={faBell} className={styles.notificacaoInnerContainer__icon} />
                            <h3 className={styles.notificacaoInnerContainer__title}>Nenhum bloco ou sala cadastrado</h3>
                            <p className={styles.notificacaoInnerContainer__message}>
                                Adicione as salas para visualizá-los aqui
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ListCard;