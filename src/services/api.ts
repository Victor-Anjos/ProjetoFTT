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
};

// Função para adicionar um novo bloco
export const adicionarBloco = async (nome: string): Promise<Bloco> => {
  const blocos = await getBlocos();
  const novoBloco: Bloco = { id: generateId(), nome };
  blocos.push(novoBloco);
  localStorage.setItem(LOCAL_STORAGE_KEY_BLOCO, JSON.stringify(blocos));
  console.log('[API Simulation] adicionarBloco chamado. Novo bloco:', novoBloco, 'Dados atualizados:', blocos);
  return novoBloco;
};

// Função para obter a lista de salas
export const getSalas = async (): Promise<Sala[]> => {
  const salas = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_SALA) || '[]');
  console.log('[API Simulation] getSalas chamado. Dados:', salas);
  return salas;
};

// Função para adicionar uma nova sala
export const adicionarSala = async (nome: string, capacidade: number, blocoId: string): Promise<Sala> => {
  const salas = await getSalas();
  const novaSala: Sala = { id: generateId(), nome, capacidade, blocoId };
  salas.push(novaSala);
  localStorage.setItem(LOCAL_STORAGE_KEY_SALA, JSON.stringify(salas));
  console.log('[API Simulation] adicionarSala chamado. Nova sala:', novaSala, 'Dados atualizados:', salas);
  return novaSala;
};

// Função para obter a lista de reservas
export const getReservas = async (): Promise<Reserva[]> => {
  const reservas = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_RESERVA) || '[]');
  console.log('[API Simulation] getReservas chamado. Dados:', reservas);
  return reservas;
};

// Função para adicionar uma nova reserva
export const adicionarReserva = async (blocoId: string, blocoNome: string, salaId: string, salaNome: string, data: string, horaInicio: string, horaFim: string): Promise<Reserva> => {
  const reservas = await getReservas();
  const novaReserva: Reserva = { id: generateId(), blocoId, blocoNome, salaId, salaNome, data, horaInicio, horaFim };
  reservas.push(novaReserva);
  localStorage.setItem(LOCAL_STORAGE_KEY_RESERVA, JSON.stringify(reservas));
  console.log('[API Simulation] adicionarReserva chamado. Nova reserva:', novaReserva, 'Dados atualizados:', reservas);
  return novaReserva;
};

// Exemplo de função para simular a exclusão de uma reserva 
export const cancelarReserva = async (reservaId: string): Promise<void> => {
  let reservas = await getReservas();
  reservas = reservas.filter(reserva => reserva.id !== reservaId);
  localStorage.setItem(LOCAL_STORAGE_KEY_RESERVA, JSON.stringify(reservas));
  console.log('[API Simulation] cancelarReserva chamado. ID da reserva removida:', reservaId, 'Dados atualizados:', reservas);
};
