import React from 'react';
import { Card, Typography } from 'antd';

const { Title, Paragraph } = Typography;

const TreinoBasicoII = () => {
  return (
    <Card
      title={<Title level={4}>Treino Básico II</Title>}
      bordered={false}
      style={{ width: '100%', height: '100%' }}
    >
      <Paragraph>
        Este é o Treino Básico II. Focado em aumentar a resistência e força.
      </Paragraph>
    </Card>
  );
};

export default TreinoBasicoII;
