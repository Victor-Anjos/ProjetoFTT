import React, { useState, useEffect } from "react";
import styles from "./Dashboard.module.css";
import SideBar from "../../components/SideBar/SideBar";
import MainCard from "../../components/MainCard/MainCard";
import * as api from "../../services/api";
import { Bloco, Sala, Reserva } from "../../services/api";
import BlocoForm from "./components/Form/BlocoForm";
import SalaForm from "./components/Form/SalaForm";
import ListCard from "./components/List/ListCard";
import Mensagem from "../../components/Mensagem/Mensagem";

interface FilterState {
    bloco: string;
    sala: string;
    capacidade: string;
    recursos: string;
}

const Dashboard = () => {
    const [blocos, setBlocos] = useState<Bloco[]>([]);
    const [salas, setSalas] = useState<Sala[]>([]);
    const [filters, setFilters] = useState<FilterState>({ bloco: "", sala: "", capacidade: "", recursos: "" });
    const [mensagem, setMensagem] = useState<{ texto: string; tipo: "sucesso" | "erro" | null }>({ texto: "", tipo: null });
    const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
    const [selectedTime, setSelectedTime] = useState<string>("08:00");
    const [reservas, setReservas] = useState<Reserva[]>([]);
    const [carouselIndices, setCarouselIndices] = useState<{ [blocoId: string]: number }>({});

    useEffect(() => {
        const loadData = async () => {
            try {
                const blocosData = await api.getBlocos();
                setBlocos(blocosData);
                const salasData = await api.getSalas();
                setSalas(salasData);
                const reservasData = await api.getReservas();
                setReservas(reservasData);
            } catch (error: any) {
                setMensagem({ texto: error.message, tipo: "erro" });
            }
        };

        loadData();
    }, []);

        // Chamando API real:
    // useEffect(() => {
    //     const loadData = async () => {
    //         try {
    //             const responseBlocos = await fetch("https://minha-api.com/blocos");
    //             const blocosData = await responseBlocos.json();
    //             setBlocos(blocosData);

    //             const responseSalas = await fetch("https://minha-api.com/salas");
    //             const salasData = await responseSalas.json();
    //             setSalas(salasData);

    //             const responseReservas = await fetch("https://minha-api.com/reservas");
    //             const reservasData = await responseReservas.json();
    //             setReservas(reservasData);
    //         } catch (error: any) {
    //             setMensagem({ texto: error.message, tipo: "erro" });
    //         }
    //     };
    //
    //     loadData();
    // }, []);

    const handleMensagemClose = () => {
        setMensagem({ texto: "", tipo: null });
    };

    const handleFilterChange = (newFilters: FilterState) => {
        setFilters(newFilters);
    };

    const filteredSalas = salas.filter((sala) => {
        if (filters.bloco && sala.blocoId !== filters.bloco) return false;
        if (filters.sala && !sala.nome.toLowerCase().includes(filters.sala.toLowerCase())) return false;

        if (filters.capacidade !== "" && Number(sala.capacidade) < Number(filters.capacidade)) return false;

        return true;
    });

    const filteredBlocos = blocos.filter((bloco) => {
        return filteredSalas.some((sala) => sala.blocoId === bloco.id);
    });

    const blocosExibidos = filters.bloco ? filteredBlocos : blocos;

    const isSalaOcupada = (salaId: string): boolean => {
        const [horaSelecionada, minutoSelecionado] = selectedTime.split(':').map(Number);

        return reservas.some(reserva => {
            if (reserva.salaId === salaId && reserva.data === selectedDate) {
                const [horaInicio, minutoInicio] = reserva.horaInicio.split(':').map(Number);
                const [horaFim, minutoFim] = reserva.horaFim.split(':').map(Number);

                const inicioReserva = new Date();
                inicioReserva.setHours(horaInicio, minutoInicio, 0, 0);

                const fimReserva = new Date();
                fimReserva.setHours(horaFim, minutoFim, 0, 0);

                const horaSelecionadaDate = new Date();
                horaSelecionadaDate.setHours(horaSelecionada, minutoSelecionado, 0, 0);

                return horaSelecionadaDate >= inicioReserva && horaSelecionadaDate < fimReserva;
            }
            return false;
        });
    };

    const handlePrev = (blocoId: string) => {
        const salasDoBloco = filteredSalas.filter((sala) => sala.blocoId === blocoId);
        setCarouselIndices(prevIndices => ({
            ...prevIndices,
            [blocoId]: (prevIndices[blocoId] || 0) > 0 ? prevIndices[blocoId]! - 1 : salasDoBloco.length - 1,
        }));
    };

    const handleNext = (blocoId: string) => {
        const salasDoBloco = filteredSalas.filter((sala) => sala.blocoId === blocoId);
        setCarouselIndices(prevIndices => ({
            ...prevIndices,
            [blocoId]: (prevIndices[blocoId] || 0) < salasDoBloco.length - 1 ? prevIndices[blocoId]! + 1 : 0,
        }));
    };

    return (
        <div className={styles.dashboardContainer} data-testid="dashboard-container">
            <SideBar />
            <div className={styles.dashboardContent}>
                <MainCard title="DASHBOARD">
                    <div className={styles.mainCard}>
                        <div className={styles.card}>
                            <h3 className={styles.card__title}>Adicionar Blocos e Salas</h3>
                            <div className={styles.formContainer}>
                                <div className={styles.mensagemContainer} data-testid="mensagem-container">
                                    {mensagem.texto && mensagem.tipo && (
                                        <Mensagem
                                            texto={mensagem.texto}
                                            tipo={mensagem.tipo}
                                            onClose={handleMensagemClose}
                                            data-testid="mensagem-component"
                                        />
                                    )}
                                </div>
                                <BlocoForm setBlocos={setBlocos} setMensagem={setMensagem} />
                                <SalaForm blocos={blocos} setSalas={setSalas} setMensagem={setMensagem} />
                            </div>
                        </div>

                        <ListCard
                            filters={filters}
                            onFilterChange={handleFilterChange}
                            blocos={blocos}
                            selectedDate={selectedDate}
                            setSelectedDate={setSelectedDate}
                            selectedTime={selectedTime}
                            setSelectedTime={setSelectedTime}
                            blocosExibidos={blocosExibidos}
                            filteredSalas={filteredSalas}
                            carouselIndices={carouselIndices}
                            isSalaOcupada={isSalaOcupada}
                            handlePrev={handlePrev}
                            handleNext={handleNext}
                            setCarouselIndices={setCarouselIndices}
                        />
                    </div>
                </MainCard>
            </div>
        </div>
    );
};

export default Dashboard;