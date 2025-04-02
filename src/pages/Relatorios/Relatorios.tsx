import React, { useState, useEffect } from "react";
import styles from "./Relatorios.module.css";
import SideBar from "../../components/SideBar/SideBar";
import Grafico from "./components/Graficos/Graficos";
import Dados from "./components/Dados/Dados";
import MainCard from "../../components/MainCard/MainCard";
import { getReservas, Reserva } from "../../services/api";

const Relatorios = () => {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadReservas = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getReservas();
        setReservas(data);
      } catch (e: any) {
        setError("Erro ao carregar as reservas.");
        console.error("Erro ao carregar as reservas:", e);
      } finally {
        setLoading(false);
      }
    };

    loadReservas();
  }, []);

  const processarDadosDiaSemana = () => {
    const reservasPorDia: { [dia: string]: number } = { 'Domingo': 0, 'Segunda': 0, 'Terça': 0, 'Quarta': 0, 'Quinta': 0, 'Sexta': 0, 'Sábado': 0 };
    const diasSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 0, 'Sexta', 0, 'Sábado', 0];
    reservas.forEach(reserva => {
      const dataReserva = new Date(reserva.data);
      const dia = diasSemana[dataReserva.getDay()];
      reservasPorDia[dia] = (reservasPorDia[dia] || 0) + 1;
    });
    const dias = Object.keys(reservasPorDia);
    const contagens = dias.map(dia => reservasPorDia[dia]);
    return { labels: dias, datasets: [{ label: 'Número de Reservas', data: contagens, backgroundColor: 'rgba(144, 238, 144, 0.8)', borderColor: 'rgba(144, 238, 144, 1)', borderWidth: 1 }] };
  };

  if (loading) {
    return <div data-testid="relatorios-loading">Carregando relatórios...</div>;
  }

  if (error) {
    return <div data-testid="relatorios-error">Erro ao carregar os relatórios: {error}</div>;
  }

  return (
    <div className={styles.container} data-testid="relatorios-container">
      <SideBar />
      <div className={styles.dashboard}>
        <MainCard title="Relatórios">
          <div className={styles.report__container}>
            <div className={styles.chart}>
              <Dados
                data={reservas}
                getKey={(reserva) => reserva.horaInicio.split(":")[0]}
                titulo="Horários Mais Concorridos"
                tipo="bar"
                backgroundColor="rgba(54, 162, 235, 0.8)"
                borderColor="rgba(54, 162, 235, 1)"
                dataTestId="dados-Horários-Mais-Concorridos"
              />
              <Dados
                data={reservas}
                getKey={(reserva) => reserva.salaNome}
                titulo="Salas Mais Reservadas"
                tipo="bar"
                backgroundColor="rgba(255, 99, 132, 0.8)"
                borderColor="rgba(255, 99, 132, 1)"
                dataTestId="dados-Salas-Mais-Reservadas"
              />
              <Dados
                data={reservas}
                getKey={(reserva) => reserva.blocoNome}
                titulo="Blocos Mais Reservados"
                tipo="bar"
                backgroundColor="rgba(75, 192, 192, 0.8)"
                borderColor="rgba(75, 192, 192, 1)"
                dataTestId="dados-Blocos-Mais-Reservadas"
              />
              <Grafico
                titulo="Reservas por Dia da Semana"
                tipo="bar"
                dados={processarDadosDiaSemana()}
                temDados={reservas.length > 0}
                dataTestId="grafico-Reservas-por-Dia-da-Semana"
              />
            </div>
          </div>
        </MainCard>
      </div>
    </div>
  );
};

export default Relatorios;