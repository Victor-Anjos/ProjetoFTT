import React, { useState } from "react";
import styles from "./Filters.module.css";

interface FiltersProps {
  onFilterChange: (filters: FilterState) => void;
  blocos: { id: string; nome: string }[];
}

interface FilterState {
  bloco: string;
  sala: string;
  capacidade: string;
  recursos: string;
}

const Filters: React.FC<FiltersProps> = ({ onFilterChange, blocos }) => {
  const [filters, setFilters] = useState<FilterState>({
    bloco: "",
    sala: "",
    capacidade: "",
    recursos: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <div className={styles.filtersContainer}>
      <select
        name="bloco"
        value={filters.bloco}
        onChange={handleChange}
        className={styles.select}
      >
        <option value="">Todos os Blocos</option>
        {blocos.map((bloco) => (
          <option key={bloco.id} value={bloco.id}>
            {bloco.nome}
          </option>
        ))}
      </select>

      <input
        type="text"
        name="sala"
        placeholder="Número da Sala"
        value={filters.sala}
        onChange={handleChange}
        className={styles.input}
      />

      <input
        type="number"
        name="capacidade" 
        placeholder="Capacidade mínima"
        value={filters.capacidade}
        onChange={handleChange}
        className={styles.input}
      />
    </div>
  );
};

export default Filters;