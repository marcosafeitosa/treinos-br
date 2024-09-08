import React from 'react';
import { Row, Col, Typography, Card } from 'antd';
import { useNavigate } from 'react-router-dom'; // Importa o hook useNavigate para navegação

const { Title, Text } = Typography;

const ContainerTreinos = () => {
  const navigate = useNavigate(); // Hook para navegação

  // Recupera e converte os dados do localStorage
  const loginDataString = localStorage.getItem('loginData');
  let isSegundaCompanhia = false;

  if (loginDataString) {
    const convertObject = JSON.parse(loginDataString);
    isSegundaCompanhia = convertObject.supervisor === 'sim';
  }

  // Função para lidar com a navegação ao clicar no card
  const handleNavigate = (path) => {
    navigate(path); // Navega para o componente especificado
  };

  return (
    <div style={{ padding: '20px' }}>
      <Row gutter={[16, 16]}>
        {/* Bloco Treino Básico I */}
        <Col xs={24} sm={12} md={12} lg={6}>
          <Card
            bordered={false}
            style={{ width: '100%', height: '100%', textAlign: 'center', cursor: 'pointer' }}
            onClick={() => handleNavigate('/treino-basico-i')}
          >
            <Title level={1}>T1</Title>
            <Text type="secondary" style={{ fontSize: '12px' }}>
              Treinamento Básico I
            </Text>
          </Card>
        </Col>

        {/* Bloco Treino Básico II */}
        <Col xs={24} sm={12} md={12} lg={6}>
          <Card
            bordered={false}
            style={{ width: '100%', height: '100%', textAlign: 'center', cursor: 'pointer' }}
            onClick={() => handleNavigate('/treino-basico-ii')}
          >
            <Title level={1}>T2</Title>
            <Text type="secondary" style={{ fontSize: '12px' }}>
              Treinamento Básico II
            </Text>
          </Card>
        </Col>

        {/* Bloco Treino Complementar I */}
        <Col xs={24} sm={12} md={12} lg={6}>
          <Card
            bordered={false}
            style={{ width: '100%', height: '100%', textAlign: 'center', cursor: 'pointer' }}
            onClick={() => handleNavigate('/treino-comp-i')}
          >
            <Title level={1}>T3</Title>
            <Text type="secondary" style={{ fontSize: '12px' }}>
              Treinamento Complementar I
            </Text>
          </Card>
        </Col>

        {/* Bloco Treino Complementar II */}
        <Col xs={24} sm={12} md={12} lg={6}>
          <Card
            bordered={false}
            style={{ width: '100%', height: '100%', textAlign: 'center', cursor: 'pointer' }}
            onClick={() => handleNavigate('/treino-comp-ii')}
          >
            <Title level={1}>T4</Title>
            <Text type="secondary" style={{ fontSize: '12px' }}>
              Treinamento Complementar II
            </Text>
          </Card>
        </Col>

        {/* Bloco Módulo Ortográfico (MO) condicional */}
        {isSegundaCompanhia && (
          <Col xs={24} sm={12} md={12} lg={6}>
            <Card
              bordered={false}
              style={{ width: '100%', height: '100%', textAlign: 'center', cursor: 'pointer' }}
              onClick={() => handleNavigate('/modulo-ortografico')}
            >
              <Title level={1}>MO</Title>
              <Text type="secondary" style={{ fontSize: '12px' }}>
                Módulo Ortográfico
              </Text>
            </Card>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default ContainerTreinos;
