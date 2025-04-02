import React from "react";
import Grafico from "../Graficos/Graficos";

interface DadosProps<T> {
  data: T[];
  getKey: (item: T) => string;
  titulo: string;
  tipo: "bar" | "pie" | "line";
  backgroundColor?: string;
  borderColor?: string;
  dataTestId?: string;
}

const Dados = <T,>({
  data,
  getKey,
  titulo,
  tipo,
  backgroundColor = 'rgba(54, 162, 235, 0.8)',
  borderColor = 'rgba(54, 162, 235, 1)',
  dataTestId,
}: DadosProps<T>) => {
  const counts: { [key: string]: number } = {};
  data.forEach(item => {
    const key = getKey(item);
    counts[key] = (counts[key] || 0) + 1;
  });

  const labels = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
  const contagens = labels.map(key => counts[key]);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Número de Reservas',
        data: contagens,
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: 1,
      },
    ],
  };

  console.log(`Dados component rendered for: ${titulo}`);
  console.log(`  dataTestId: ${dataTestId}`);
  if (titulo === "Salas Mais Reservadas") {
    console.log("  Data for Salas Mais Reservadas:", data);
  }

  return (
    <Grafico
      titulo={titulo}
      tipo={tipo}
      dados={chartData}
      temDados={data.length > 0}
      data-testid={dataTestId}
    />
  );
};

export default Dados;