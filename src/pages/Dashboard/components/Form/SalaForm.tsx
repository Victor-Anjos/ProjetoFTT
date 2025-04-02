import React, { useState } from "react";
import styles from "../../Dashboard.module.css";
import * as api from "../../../../services/api";
import { Sala, Bloco } from "../../../../services/api";

interface SalaFormProps {
    blocos: Bloco[];
    setSalas: React.Dispatch<React.SetStateAction<Sala[]>>;
    setMensagem: React.Dispatch<React.SetStateAction<{ texto: string; tipo: "sucesso" | "erro" | null }>>;
}

const SalaForm: React.FC<SalaFormProps> = ({ blocos, setSalas, setMensagem }) => {
    const [novaSala, setNovaSala] = useState({ nome: "", capacidade: "", blocoId: "" });

    const adicionarSala = async () => {
        if (!novaSala.nome.trim() || !novaSala.capacidade.trim() || !novaSala.blocoId) {
            setMensagem({ texto: "Por favor, preencha todos os campos da sala.", tipo: "erro" });
            return;
        }

        try {
            const nova = await api.adicionarSala(
                novaSala.nome,
                Number(novaSala.capacidade),
                novaSala.blocoId
            );
            setSalas(prevSalas => [...prevSalas, nova]);
            setNovaSala({ nome: "", capacidade: "", blocoId: "" });
            setMensagem({ texto: "Sala adicionada com sucesso!", tipo: "sucesso" });
        } catch (error: any) {
            setMensagem({ texto: error.message, tipo: "erro" });
        }
    };

    return (
        <div className={styles.formGroup}>
            <label className={styles.formGroup__label}>Criar Sala:</label>
            <input
                type="text"
                placeholder="Digite o nome da Sala"
                value={novaSala.nome}
                onChange={(e) => setNovaSala({ ...novaSala, nome: e.target.value })}
                data-testid="nova-sala-nome-input"
                className={styles.formGroup__input}
            />
            <label className={styles.formGroup__label}>Capacidade total:</label>
            <input
                type="number"
                placeholder="Digite a capacidade total"
                value={novaSala.capacidade}
                onChange={(e) => setNovaSala({ ...novaSala, capacidade: e.target.value })}
                data-testid="nova-sala-capacidade-input"
                className={styles.formGroup__input}
            />
            <label className={styles.formGroup__label}>Selecionar Bloco:</label>
            <select
                value={novaSala.blocoId}
                onChange={(e) => setNovaSala({ ...novaSala, blocoId: e.target.value })}
                data-testid="nova-sala-bloco-select"
                className={styles.formGroup__select}
            >
                <option value="">Selecione um bloco</option>
                {blocos.map((bloco) => (
                    <option key={bloco.id} value={bloco.id}>
                        {bloco.nome}
                    </option>
                ))}
            </select>
            <button onClick={adicionarSala} data-testid="adicionar-sala-button" className={styles.formGroup__button}>Adicionar Sala</button>
        </div>
    );
};

export default SalaForm;