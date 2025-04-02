// Reservas.tsx
import React, { useState, useEffect } from "react";
import styles from "./Reservas.module.css";
import SideBar from "../../components/SideBar/SideBar";
import { useNavigate } from "react-router-dom";
import Mensagem from "../../components/Mensagem/Mensagem";
import MainCard from "../../components/MainCard/MainCard";
import * as api from "../../services/api";
import { Sala, Bloco, Notificacao, ReservaPayload } from "../../services/api";
import ReservaForm from "./components/Form/ReservaForm";
import NotificacoesCard from "./components/NotificationsCard/NotificationsCard"; // Importe o NotificacoesCard

const Reservas = () => {
    const [formData, setFormData] = useState({
        bloco: "",
        sala: "",
        data: "",
        horaInicio: "",
        horaFim: "",
    });

    const [salas, setSalas] = useState<Sala[]>([]);
    const [salasFiltradas, setSalasFiltradas] = useState<Sala[]>([]);
    const [blocos, setBlocos] = useState<Bloco[]>([]);
    const [mensagem, setMensagem] = useState<{ texto: string; tipo: "sucesso" | "erro" | null }>({
        texto: "",
        tipo: null,
    });
    const [notificacoes, setNotificacoes] = useState<Notificacao[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlocosESalas = async () => {
            try {
                const blocosData = await api.getBlocos();
                setBlocos(blocosData);
                const salasData = await api.getSalas();
                setSalas(salasData);
            } catch (error: any) {
                setMensagem({ texto: error.message, tipo: "erro" });
            }
        };

        fetchBlocosESalas();
    }, []);

    useEffect(() => {
        if (formData.bloco) {
            const salasNoBloco = salas.filter((sala) => sala.blocoId === formData.bloco);
            setSalasFiltradas(salasNoBloco);
        } else {
            setSalasFiltradas([]);
        }
    }, [formData.bloco, salas]);

    useEffect(() => {
        const savedNotificacoes = localStorage.getItem("notificacoes");
        if (savedNotificacoes) {
            setNotificacoes(JSON.parse(savedNotificacoes));
        }
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleMensagemClose = () => {
        setMensagem({ texto: "", tipo: null });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMensagem({ texto: "", tipo: null });

        const { bloco, sala, data, horaInicio, horaFim } = formData;

        if (!bloco || !sala || !data || !horaInicio || !horaFim) {
            setMensagem({ texto: "Por favor, preencha todos os campos.", tipo: "erro" });
            return;
        }

        try {
            const blocoSelecionado = blocos.find((b) => b.id === bloco);
            const salaSelecionada = salas.find((s) => s.id === sala);

            if (!blocoSelecionado || !salaSelecionada) {
                setMensagem({ texto: "Bloco ou sala inválidos.", tipo: "erro" });
                return;
            }

            const novaReservaPayload: ReservaPayload = {
                blocoId: bloco,
                blocoNome: blocoSelecionado.nome,
                salaId: sala,
                salaNome: salaSelecionada.nome,
                data,
                horaInicio,
                horaFim,
            };

            const novaReserva = await api.adicionarReserva(
                novaReservaPayload.blocoId,
                novaReservaPayload.blocoNome,
                novaReservaPayload.salaId,
                novaReservaPayload.salaNome,
                novaReservaPayload.data,
                novaReservaPayload.horaInicio,
                novaReservaPayload.horaFim
            );

            setMensagem({ texto: "Reserva criada com sucesso!", tipo: "sucesso" });
            setFormData({ bloco: "", sala: "", data: "", horaInicio: "", horaFim: "" });

            const novaNotificacao: Notificacao = {
                id: Date.now().toString(),
                reservaId: novaReserva.id,
                texto: `Reserva: Sala (${novaReserva.salaNome}) | Bloco (${novaReserva.blocoNome}) | ${data} ${horaInicio} - ${horaFim}`,
            };
            const novasNotificacoes = [novaNotificacao, ...notificacoes];
            setNotificacoes(novasNotificacoes);
            localStorage.setItem("notificacoes", JSON.stringify(novasNotificacoes));
        } catch (error: any) {
            console.error("Erro ao criar reserva:", error);
            setMensagem({ texto: "Não foi possível criar a reserva.", tipo: "erro" });
        }
    };

    const handleReset = () => {
        setFormData({ bloco: "", sala: "", data: "", horaInicio: "", horaFim: "" });
    };

    const handleCancelReserva = (notificacaoId: string) => {
        const notificacoesSalvas = JSON.parse(localStorage.getItem("notificacoes") || "[]") as Notificacao[];
        const novasNotificacoes = notificacoesSalvas.filter(n => n.id !== notificacaoId);
        setNotificacoes(novasNotificacoes);
        localStorage.setItem("notificacoes", JSON.stringify(novasNotificacoes));

        setMensagem({ texto: "Notificação removida com sucesso!", tipo: "sucesso" });
    };


    return (
        <div className={styles.reservas} data-testid="reservas-container">
            <SideBar />
            <div className={styles.reservas_main_content}>
                <div className={styles.reservas_form_container}>
                    <MainCard title="Reservar Sala">
                        {mensagem.texto && mensagem.tipo && (
                            <Mensagem texto={mensagem.texto} tipo={mensagem.tipo} onClose={handleMensagemClose} data-testid="mensagem-component" />
                        )}
                        <ReservaForm
                            formData={formData}
                            blocos={blocos}
                            salasFiltradas={salasFiltradas}
                            handleInputChange={handleInputChange}
                            handleSubmit={handleSubmit}
                            handleReset={handleReset}
                        />
                    </MainCard>
                </div>

                <NotificacoesCard
                    notificacoes={notificacoes}
                    handleCancelReserva={handleCancelReserva}
                />
            </div>
        </div>
    );
};

export default Reservas;