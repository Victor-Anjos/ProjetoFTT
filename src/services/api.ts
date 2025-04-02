// Tipagens para auxiliar no uso dos dados (mantendo as do dashboard para consistência)
export interface Bloco {
  id: string;
  nome: string;
}

export interface Sala {
  id: string;
  nome: string;
  capacidade: number;
  blocoId: string;
}

export interface Notificacao {
  id: string;
  texto: string;
  reservaId?: string;
}

export interface ReservaPayload {
  blocoId: string;
  blocoNome: string;
  salaId: string;
  salaNome: string;
  data: string;
  horaInicio: string;
  horaFim: string;
}

export interface Reserva {
  id: string;
  blocoId: string;
  blocoNome: string;
  salaId: string;
  salaNome: string;
  data: string;
  horaInicio: string;
  horaFim: string;
}

const LOCAL_STORAGE_KEY_BLOCO = 'blocos';
const LOCAL_STORAGE_KEY_SALA = 'salas';
const LOCAL_STORAGE_KEY_RESERVA = 'reservas';

// URL base da API
const API_BASE_URL = "https://minha-api.com"; // Substitua pelo endpoint real da API

// Função para gerar um ID único (simples para demonstração)
const generateId = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

// Inicializa os dados no localStorage se não existirem
if (!localStorage.getItem(LOCAL_STORAGE_KEY_BLOCO)) {
  localStorage.setItem(LOCAL_STORAGE_KEY_BLOCO, JSON.stringify([]));
}
if (!localStorage.getItem(LOCAL_STORAGE_KEY_SALA)) {
  localStorage.setItem(LOCAL_STORAGE_KEY_SALA, JSON.stringify([]));
}
if (!localStorage.getItem(LOCAL_STORAGE_KEY_RESERVA)) {
  localStorage.setItem(LOCAL_STORAGE_KEY_RESERVA, JSON.stringify([]));
}

// Função para obter a lista de blocos
export const getBlocos = async (): Promise<Bloco[]> => {
  const blocos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_BLOCO) || '[]');
  console.log('[API Simulation] getBlocos chamado. Dados:', blocos);
  return blocos;

  // Chamando API real:
  // const response = await fetch(`${API_BASE_URL}/blocos`);
  // return await response.json();
};

// Função para adicionar um novo bloco
export const adicionarBloco = async (nome: string): Promise<Bloco> => {
  const blocos = await getBlocos();
  const novoBloco: Bloco = { id: generateId(), nome };
  blocos.push(novoBloco);
  localStorage.setItem(LOCAL_STORAGE_KEY_BLOCO, JSON.stringify(blocos));
  console.log('[API Simulation] adicionarBloco chamado. Novo bloco:', novoBloco);
  return novoBloco;
  
  // Chamando API real:
  // const response = await fetch(`${API_BASE_URL}/blocos`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ nome }),
  // });
  // return await response.json();
};

// Função para obter a lista de salas
export const getSalas = async (): Promise<Sala[]> => {
  const salas = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_SALA) || '[]');
  console.log('[API Simulation] getSalas chamado. Dados:', salas);
  return salas;
  
  // Chamando API real:
  // const response = await fetch(`${API_BASE_URL}/salas`);
  // return await response.json();
};

// Função para adicionar uma nova sala
export const adicionarSala = async (nome: string, capacidade: number, blocoId: string): Promise<Sala> => {
  const salas = await getSalas();
  const novaSala: Sala = { id: generateId(), nome, capacidade, blocoId };
  salas.push(novaSala);
  localStorage.setItem(LOCAL_STORAGE_KEY_SALA, JSON.stringify(salas));
  console.log('[API Simulation] adicionarSala chamado. Nova sala:', novaSala);
  return novaSala;
  
  // Chamando API real:
  // const response = await fetch(`${API_BASE_URL}/salas`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ nome, capacidade, blocoId }),
  // });
  // return await response.json();
};

// Função para obter a lista de reservas
export const getReservas = async (): Promise<Reserva[]> => {
  const reservas = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_RESERVA) || '[]');
  console.log('[API Simulation] getReservas chamado. Dados:', reservas);
  return reservas;
  
  // Chamando API real:
  // const response = await fetch(`${API_BASE_URL}/reservas`);
  // return await response.json();
};

// Função para adicionar uma nova reserva
export const adicionarReserva = async (blocoId: string, blocoNome: string, salaId: string, salaNome: string, data: string, horaInicio: string, horaFim: string): Promise<Reserva> => {
  const reservas = await getReservas();
  const novaReserva: Reserva = { id: generateId(), blocoId, blocoNome, salaId, salaNome, data, horaInicio, horaFim };
  reservas.push(novaReserva);
  localStorage.setItem(LOCAL_STORAGE_KEY_RESERVA, JSON.stringify(reservas));
  console.log('[API Simulation] adicionarReserva chamado. Nova reserva:', novaReserva);
  return novaReserva;
  
  // Chamando API real:
  // const response = await fetch(`${API_BASE_URL}/reservas`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ blocoId, blocoNome, salaId, salaNome, data, horaInicio, horaFim }),
  // });
  // return await response.json();
};
