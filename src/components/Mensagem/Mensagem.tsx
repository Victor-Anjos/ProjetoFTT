// Mensagem.tsx
import React, { useEffect, useState } from "react";
import styles from "./Mensagem.module.css";

interface MensagemProps {
  texto: string;
  tipo: "sucesso" | "erro";
  tempoExibicao?: number;
  onClose: () => void;
}

const Mensagem: React.FC<MensagemProps> = ({ texto, tipo, tempoExibicao = 3000, onClose }) => {
  const [visivel, setVisivel] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisivel(false);
      onClose();
    }, tempoExibicao);

    return () => clearTimeout(timer);
  }, [tempoExibicao, onClose]);

  if (!visivel) return null;

  return <div className={`${styles.mensagem} ${styles[tipo]}`} data-testid="mensagem-component">{texto}</div>;
};

export default Mensagem;