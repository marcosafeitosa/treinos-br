// NotFound.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 5000); // Redireciona após 5 segundos
    return () => clearTimeout(timer); // Limpa o timer quando o componente desmonta
  }, [navigate]);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404 - Página Não Encontrada</h1>
      <p style={styles.message}>Desculpe, mas a página que você está procurando não existe.</p>
      <p>Você será redirecionado para a página inicial em breve.</p>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center',
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: '3rem',
    color: '#333',
  },
  message: {
    fontSize: '1.2rem',
    color: '#666',
  },
};

export default NotFound;
