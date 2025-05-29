// ReservaForm.tsx
import React from "react";
import styles from "../../Reservas.module.css";
import { Bloco, Sala } from "../../../../services/api";

interface ReservaFormProps {
    formData: {
        bloco: string;
        sala: string;
        data: string;
        horaInicio: string;
        horaFim: string;
    };
    blocos: Bloco[];
    salasFiltradas: Sala[];
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleSubmit: (e: React.FormEvent) => void;
    handleReset: () => void;
}

const ReservaForm: React.FC<ReservaFormProps> = ({
    formData,
    blocos,
    salasFiltradas,
    handleInputChange,
    handleSubmit,
    handleReset,
}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className={styles.reservas_form_group}>
                <label htmlFor="bloco" className={styles.reservas_form_group_label}>Bloco:</label>
                <select id="bloco" name="bloco" value={formData.bloco} onChange={handleInputChange} data-testid="reserva-bloco-select" className={styles.reservas_form_group_select}>
                    <option value="">Selecione um bloco</option>
                    {blocos.map((bloco) => (
                        <option key={bloco.id} value={bloco.id}>
                            {bloco.nome}
                        </option>
                    ))}
                </select>
            </div>

            <div className={styles.reservas_form_group}>
                <label htmlFor="sala" className={styles.reservas_form_group_label}>Sala:</label>
                <select id="sala" name="sala" value={formData.sala} onChange={handleInputChange} data-testid="reserva-sala-select" className={styles.reservas_form_group_select}>
                    <option value="">Selecione uma sala</option>
                    {salasFiltradas.map((sala) => (
                        <option key={sala.id} value={sala.id}>
                            {sala.nome}
                        </option>
                    ))}
                </select>
            </div>

            <div className={styles.reservas_form_group}>
                <label htmlFor="data" className={styles.reservas_form_group_label}>Data:</label>
                <input type="date" id="data" name="data" value={formData.data} onChange={handleInputChange} data-testid="reserva-data-input" className={styles.reservas_form_group_input} />
            </div>

            <div className={styles.reservas_form_group}>
                <label htmlFor="horaInicio" className={styles.reservas_form_group_label}>Horário Inicial:</label>
                <input type="time" id="horaInicio" name="horaInicio" value={formData.horaInicio} onChange={handleInputChange} data-testid="reserva-hora-inicio-input" className={styles.reservas_form_group_input} />
            </div>

            <div className={styles.reservas_form_group}>
                <label htmlFor="horaFim" className={styles.reservas_form_group_label}>Horário Final:</label>
                <input type="time" id="horaFim" name="horaFim" value={formData.horaFim} onChange={handleInputChange} data-testid="reserva-hora-fim-input" className={styles.reservas_form_group_input} />
            </div>

            <div className={styles.reservas_button_group}>
                <button type="submit" className={`${styles.reservas_button} ${styles.reservas_button_submit}`} data-testid="criar-reserva-button">Criar Reserva</button >
            </div>
        </form>
    );
};

export default ReservaForm;