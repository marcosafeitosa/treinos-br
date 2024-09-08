import React from 'react';
import { Card, Typography } from 'antd';
import { LeftOutlined } from '@ant-design/icons'; // Importa o ícone de seta para a esquerda
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const ModuloOrtografico = () => {
  const navigate = useNavigate();

  // Função para lidar com a navegação ao clicar no ícone
  const handleBack = () => {
    navigate('/pagina-treinos'); // Substitua pela rota desejada
  };

  return (
    <Card
      bordered={false}
      style={{ width: '100%', height: '100%', textAlign: 'center', position: 'relative' }}
    >
      {/* Ícone de Voltar */}
      <LeftOutlined
        onClick={handleBack}
        style={{
          fontSize: '20px',
          position: 'absolute',
          color: 'red',
          left: 10,
          bottom: 10,
          cursor: 'pointer',
        }} // Estilo para o ícone
      />

      {/* Conteúdo do Card */}
      <Title level={2}>MO</Title>
      <Text type="secondary" style={{ fontSize: '12px' }}>
        Treinamento Básico I
      </Text>
    </Card>
  );
};

export default ModuloOrtografico;
