import React, { useState, useRef } from 'react';
import { Card, Typography, Button, notification } from 'antd';
import { LeftOutlined, ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Clipboard from 'clipboard';

const { Title, Text } = Typography;

const paragrafoArray = [
  "Este é o primeiro parágrafo do Treinamento Básico I. (Balão Verde)",
  "Aqui você encontrará informações importantes sobre o treinamento.",
  "Certifique-se de revisar todos os pontos abordados para uma melhor compreensão. (Balão Verde)",
  "Caso tenha dúvidas, consulte o material adicional ou entre em contato com o instrutor."
];

const TreinoBasicoI = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const copyButtonRef = useRef(null);

  // Função para lidar com a navegação ao clicar no ícone
  const handleBack = () => {
    navigate('/pagina-treinos');
  };

  // Função para copiar o texto para a área de transferência
  const copyToClipboard = (text) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        notification.success({ message: 'Texto copiado para a área de transferência!' });
      }).catch((err) => {
        notification.error({ message: 'Falha ao copiar o texto.', description: err.toString() });
      });
    } else if (copyButtonRef.current) {
      const clipboard = new Clipboard(copyButtonRef.current, {
        text: () => text,
      });
      clipboard.on('success', () => {
        notification.success({ message: 'Texto copiado para a área de transferência!' });
        clipboard.destroy();
      });
      clipboard.on('error', (err) => {
        notification.error({ message: 'Falha ao copiar o texto.', description: err.toString() });
        clipboard.destroy();
      });
      copyButtonRef.current.click();
    }
  };

  const handlePrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : 0;
    setCurrentIndex(newIndex);
    copyToClipboard(paragrafoArray[newIndex]);
  };

  const handleNext = () => {
    const newIndex = currentIndex < paragrafoArray.length - 1 ? currentIndex + 1 : paragrafoArray.length - 1;
    setCurrentIndex(newIndex);
    copyToClipboard(paragrafoArray[newIndex]);
  };

  return (
    <Card
      bordered={false}
      style={{ width: '100%', height: '100%', textAlign: 'center', position: 'relative' }}
    >
      <LeftOutlined
        onClick={handleBack}
        style={{
          fontSize: '20px',
          position: 'absolute',
          color: 'red',
          left: 10,
          bottom: 60,
          cursor: 'pointer',
        }}
      />

      <Title level={2}>T1</Title>
      <Text type="secondary" style={{ fontSize: '12px' }}>
        Treinamento Básico I
      </Text>

      <div style={{
        marginTop: '20px',
        textAlign: 'justify',
        maxWidth: '600px',
        marginLeft: 'auto',
        marginRight: 'auto'
      }}>
        {paragrafoArray.map((texto, index) => (
          <p
            key={index}
            style={{
              marginBottom: '10px',
              padding: '10px',
              backgroundColor: index === currentIndex
                ? '#d9d9d9a3'
                : texto.includes('(Balão Verde)')
                  ? '#d4edda'
                  : 'transparent',
              borderRadius: '4px'
            }}
          >
            {texto}
          </p>
        ))}
      </div>

      <div style={{
        position: 'fixed',
        bottom: 20,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '20px'
      }}>
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={handlePrevious}
        >
          Anterior
        </Button>
        <Button
          icon={<ArrowRightOutlined />}
          onClick={handleNext}
        >
          Próximo
        </Button>
        <button ref={copyButtonRef} style={{ display: 'none' }}></button>
      </div>
    </Card>
  );
};

export default TreinoBasicoI;
