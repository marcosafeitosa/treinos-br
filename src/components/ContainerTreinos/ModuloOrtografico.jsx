import React, { useState, useEffect, useRef } from "react";
import { Card, Typography, Button, notification } from "antd";
import {
  LeftOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const paragrafoArray = [
  "I - Introdução. (Balão Verde)",
  "Seja bem-vindo à palestra de Módulo Ortográfico. Veremos, a seguir, algumas regras para o aprimoramento da sua ortografia.",
  "Ter uma boa escrita é essencial para TODOS os membros do Exército Brasileiro.",
  "A digitação correta está relacionada diretamente à comunicação entre os membros de nossa instituição.",
  "Quanto melhor a nossa escrita, melhor será o entendimento daquilo que está sendo passado, assim, evitando qualquer equívoco.",
  "Ter uma boa escrita também é um fator muito observado pelos Oficiais. Sendo boa, causa uma impressão positiva; sendo ruim, causa uma impressão negativa.",
  "Por esses e outros motivos é muito importante sempre buscarmos a melhor ortografia possível.",
  "Dúvidas?",
  
  "II - Uso da Vírgula (Balão Verde)",
  "A vírgula é um sinal de pontuação que marca uma pequena pausa no texto e separa elementos de uma oração ou orações entre si dentro da mesma frase.",
  "Devido a importância de seu uso no dia a dia, serão explicadas as principais regras:",
  "Na separação de elementos, isto é, termos coordenados (enumeração, lista, etc).",
  "Por exemplo: Comprei ovos, legumes e verduras.",
  "Para isolar o vocativo/pronomes, ou seja, ao chamar alguém na frase.",
  'Exemplos: "Ana, não faça isso, por favor."; "Sim, senhora.".',
  "Dúvidas?",

  "III - Mas e mais (Balão Verde)",
  '"Mas" é uma conjunção adversativa, sendo assim, apresenta uma relação de oposição entre duas ideias.',
  'Equivale a "porém", "contudo", "entretanto", "no entanto".',
  "Por exemplo: Ela sempre se dedicou ao trabalho, mas estava exausta naquele dia.",
  '"Mais" é um pronome ou advérbio de intensidade.',
  'Possui como antônimo a palavra "menos".",
  "Relacionado à quantidade, ao aumento, à grandeza e à comparação ou superioridade.",
  'Exemplos: "Esse sofá é mais caro que aquele."',
  "Dúvidas?",


];

const ModuloOrtografico = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loginData, setLoginData] = useState(null);
  const navigate = useNavigate();
  const paragraphRefs = useRef([]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("loginData"));
    setLoginData(storedData);
  }, []);

  const removeBalãoVerde = (text) => {
    return text.replace(/\(Balão Verde\)$/, "").trim();
  };

  const copyToClipboard = (index) => {
    const text = removeBalãoVerde(paragrafoArray[index]);

    navigator.clipboard
      .writeText(text)
      .then(() => {
        notification.success({
          message: "Texto copiado para a área de transferência!",
          duration: 0.5,
        });
      })
      .catch((err) => {
        notification.error({
          message: "Falha ao copiar o texto.",
          description: err.toString(),
          duration: 0.5,
        });
      });
  };

  const handlePrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : 0;
    setCurrentIndex(newIndex);
    copyToClipboard(newIndex);
  };

  const handleNext = () => {
    const newIndex =
      currentIndex < paragrafoArray.length - 1
        ? currentIndex + 1
        : paragrafoArray.length - 1;
    setCurrentIndex(newIndex);
    copyToClipboard(newIndex);
  };

  useEffect(() => {
    if (paragraphRefs.current[currentIndex]) {
      paragraphRefs.current[currentIndex].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [currentIndex]);

  return (
    <Card
      bordered={false}
      style={{
        width: "100%",
        height: "100%",
        textAlign: "center",
        position: "relative",
      }}
    >
      <LeftOutlined
        onClick={() => navigate("/pagina-treinos")}
        style={{
          fontSize: "20px",
          position: "absolute",
          color: "red",
          left: 10,
          bottom: 60,
          cursor: "pointer",
        }}
      />

      <Title level={2}>MO</Title>
      <Text type="secondary" style={{ fontSize: "12px" }}>
        Módulo Ortográfico
      </Text>

      <div
        style={{
          marginTop: "20px",
          textAlign: "justify",
          maxWidth: "600px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {paragrafoArray.map((texto, index) => (
          <p
            key={index}
            ref={(el) => (paragraphRefs.current[index] = el)}
            style={{
              marginBottom: "10px",
              padding: "10px",
              backgroundColor:
                index === currentIndex
                  ? "#d9d9d9a3"
                  : texto.includes("(Balão Verde)")
                  ? "#d4edda"
                  : "transparent",
              borderRadius: "4px",
            }}
          >
            {texto}
          </p>
        ))}
      </div>

      <div
        style={{
          position: "fixed",
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "20px",
        }}
      >
        <Button icon={<ArrowLeftOutlined />} onClick={handlePrevious}>
          Anterior
        </Button>
        <Button icon={<ArrowRightOutlined />} onClick={handleNext}>
          Próximo
        </Button>
      </div>
    </Card>
  );
};

export default ModuloOrtografico;
