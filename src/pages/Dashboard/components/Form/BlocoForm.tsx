import React, { useState } from "react";
import styles from "../../Dashboard.module.css";
import * as api from "../../../../services/api";
import { Bloco } from "../../../../services/api";

interface BlocoFormProps {
    setBlocos: React.Dispatch<React.SetStateAction<Bloco[]>>;
    setMensagem: React.Dispatch<React.SetStateAction<{ texto: string; tipo: "sucesso" | "erro" | null }>>;
}

const BlocoForm: React.FC<BlocoFormProps> = ({ setBlocos, setMensagem }) => {
    const [novoBloco, setNovoBloco] = useState("");

    const adicionarBloco = async () => {
        if (!novoBloco.trim()) {
            setMensagem({ texto: "Por favor, digite o nome do bloco.", tipo: "erro" });
            return;
        }

        try {
            const novo = await api.adicionarBloco(novoBloco);
            setBlocos(prevBlocos => [...prevBlocos, novo]);
            setNovoBloco("");
            setMensagem({ texto: "Bloco adicionado com sucesso!", tipo: "sucesso" });
        } catch (error: any) {
            setMensagem({ texto: error.message, tipo: "erro" });
        }
    };

    return (
        <div className={styles.formGroup}>
            <label className={styles.formGroup__label}>Criar Bloco:</label>
            <input
                type="text"
                placeholder="Digite o nome do Bloco"
                value={novoBloco}
                onChange={(e) => setNovoBloco(e.target.value)}
                data-testid="novo-bloco-input"
                className={styles.formGroup__input}
            />
            <button onClick={adicionarBloco} data-testid="adicionar-bloco-button" className={styles.formGroup__button}>Adicionar Bloco</button>
        </div>
    );
};

export default BlocoForm;