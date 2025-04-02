import React, { useRef, useEffect } from "react";
import styles from '../Graficos/Graficos.module.css';
import Chart from 'chart.js/auto';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';

interface GraficoProps {
  titulo: string;
  tipo: 'bar' | 'line' | 'pie' | 'doughnut';
  dados: any;
  temDados: boolean;
  dataTestId?: string;
}

const RelatorioGrafico: React.FC<GraficoProps> = ({ titulo, tipo, dados, temDados, dataTestId }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);
  const graficoCardTestId = `grafico-card-${titulo.replace(/\s+/g, '-')}`;
  const graficoCanvasTestId = `grafico-canvas-${titulo.replace(/\s+/g, '-')}`;
  const graficoSemDadosTestId = `grafico-sem-dados-${titulo.replace(/\s+/g, '-')}`;

  useEffect(() => {
    const ctx = chartRef.current?.getContext('2d');
    if (!ctx) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    if (temDados) {
      chartInstanceRef.current = new Chart(ctx, {
        type: tipo,
        data: dados,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: titulo,
              font: {
                size: 16
              }
            },
            legend: {
              display: true,
              position: 'bottom',
            }
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [tipo, dados, titulo, temDados]);

  return (
    <div className={styles["grafico-card"]} data-testid={dataTestId || graficoCardTestId}>
      {!temDados ? (
        <div className={styles["grafico-card__sem-dados"]} data-testid={graficoSemDadosTestId}>
          <FontAwesomeIcon icon={faChartLine} size="3x" className={styles["grafico-card__sem-dados-icon"]} />
          <p className={styles["grafico-card__sem-dados-texto"]}>Nenhuma reserva encontrada para exibir neste gráfico.</p>
        </div>
      ) : (
        <canvas ref={chartRef} className={styles["grafico-card__canvas"]} data-testid={graficoCanvasTestId}></canvas>
      )}
    </div>
  );
};

export default RelatorioGrafico;