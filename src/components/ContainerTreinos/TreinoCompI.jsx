import React from 'react';
import { Card, Typography } from 'antd';

const { Title, Paragraph } = Typography;

const TreinoCompI = () => {
  return (
    <Card
      title={<Title level={4}>Treino Completo I</Title>}
      bordered={false}
      style={{ width: '100%', height: '100%' }}
    >
      <Paragraph>
        Este é o Treino Completo I. Exercícios avançados para melhoria geral.
      </Paragraph>
    </Card>
  );
};

export default TreinoCompI;
