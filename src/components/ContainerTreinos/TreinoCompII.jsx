import React from 'react';
import { Card, Typography } from 'antd';

const { Title, Paragraph } = Typography;

const TreinoCompII = () => {
  return (
    <Card
      title={<Title level={4}>Treino Completo II</Title>}
      bordered={false}
      style={{ width: '100%', height: '100%' }}
    >
      <Paragraph>
        Este é o Treino Completo II. Focado em técnicas avançadas e performance.
      </Paragraph>
    </Card>
  );
};

export default TreinoCompII;
