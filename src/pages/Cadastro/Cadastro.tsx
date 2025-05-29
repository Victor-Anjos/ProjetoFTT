import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Cadastro.module.css'; // Importa os estilos do módulo CSS para o cadastro
import Logo from '../../assets/logoUniEvangelica.png'; // Importe a imagem do seu logo aqui

const Cadastro = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState(''); // Estado correto: confirmarSenha
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // CORREÇÃO 1: Adicionando o tipo explícito para 'e'
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // CORREÇÃO 2: Usando a variável de estado correta 'confirmarSenha'
    if (senha !== confirmarSenha) {
      setError('As senhas não coincidem.');
      setIsLoading(false);
      return;
    }
    if (senha.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      setIsLoading(false);
      return;
    }
    // Adicione mais validações conforme necessário (email válido, etc.)

    try {
      console.log('Dados de cadastro:', { nome, email, senha });
      await new Promise(resolve => setTimeout(resolve, 2000));

      alert('Cadastro realizado com sucesso! Faça login.');
      navigate('/login');
    } catch (apiError) {
      setError('Erro ao cadastrar. Tente novamente mais tarde.');
      console.error('Erro no cadastro:', apiError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      {isLoading ? (
        // Se você tiver um componente de Loading, pode exibi-lo aqui
        // <Loading />
        <p>Carregando...</p>
      ) : (
        <div className={styles.loginCard}>
          {/* Painel Esquerdo (Logo) */}
          <div className={styles.loginCard__logo}>
            <img src={Logo} alt="Logo UniEvangélica" className={styles.loginCard__logoImage} />
          </div>

          {/* Painel Direito (Formulário de Cadastro) */}
          <div className={styles.loginCard__form}>
            {/* Título "Cadastro" agora dentro do painel do formulário */}
            <h2 className={styles.loginCard__title}>Cadastro</h2> 
            
            {/* O evento onSubmit deve ser no FORM, não no botão */}
            <form className={styles.loginCard__formContent} onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <label htmlFor="nome" className={styles.inputGroup__label}>Nome Completo:</label>
                <input
                  type="text"
                  id="nome"
                  className={styles.inputGroup__input}
                  placeholder="Digite seu nome completo"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="email" className={styles.inputGroup__label}>E-mail Acadêmico:</label>
                <input
                  type="email"
                  id="email"
                  className={styles.inputGroup__input}
                  placeholder="seuemail@uni.edu.br"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="senha" className={styles.inputGroup__label}>Senha:</label>
                <input
                  type="password"
                  id="senha"
                  className={styles.inputGroup__input}
                  placeholder="Crie uma senha segura"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="confirmarSenha" className={styles.inputGroup__label}>Confirmar Senha:</label>
                <input
                  type="password"
                  id="confirmarSenha"
                  className={styles.inputGroup__input}
                  placeholder="Confirme sua senha"
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                  required
                />
              </div>

              {/* Mensagem de erro com visibilidade controlada */}
              {error && <p className={`${styles.errorMessage} ${!error ? styles.hidden : ''}`}>{error}</p>}

              <button type="submit" className={styles.button} disabled={isLoading}>
                {isLoading ? 'Cadastrando...' : 'Criar Conta'}
              </button>
            </form>

            {/* Texto e Link para login abaixo do botão */}
            <p className={styles.registerText}>
              Já possui uma conta?{' '}
              <Link to="/login" className={styles.registerLink}>Fazer login</Link>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cadastro;