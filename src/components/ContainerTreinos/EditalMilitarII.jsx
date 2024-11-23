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
  "I - INTRODUÇÃO (Balão Verde)",

  "Edital Militar II:",
  "As academias são períodos dedicados à formação de Sargentos e de Oficiais do Exército Brasileiro.",
  "A EsSA (Escola de Sargentos das Armas) é responsável pela inserção de novos Sargentos no Corpo de Praças, os nossos treinadores.",
  "Enquanto que a EsPCEx (Escola Preparatória de Cadetes do Exército) e a AMAN (Academia Militar das Agulhas Negras)",
  "são incumbidas de graduar novos Oficiais, mediante convocação e aprovação.",
  "Dúvidas?",

  "II - EsSA - ESCOLA DE SARGENTOS DAS ARMAS (Balão Verde)",

  "A Escola de Sargentos das Armas é um período dedicado à formação de um 3° Sargento.",
  "Para a obtenção de experiência, o aluno recebe treinamentos preparatórios e auxilia treinamentos antes",
  "de assumir seu posto como treinador.",
  "A academia proporciona, bem como, a realização de uma prova externa a qual possibilita a entrada de pessoas na instituição",
  "a partir de uma patente mais elevada, poupando o seu alistamento.",
  "Dúvidas?",

  "III - EsPCEx - ESCOLA PREPARATÓRIA DE CADETES (Balão Verde)",

  "A Escola Preparatória de Cadetes é um período composto por três etapas, as quais determinam a aprovação ou",
  "a reprovação de um Aluno, sendo elas:",
  "aulas, atividades e prova. Caso aprovado, o Aluno assumirá a patente de Cadete, caso reprovado,",
  "será rebaixado à patente de 3° Sargento.",
  "Dúvidas?",

  "IV - AMAN - ACADEMIA MILITAR DAS AGULHAS NEGRAS (Balão Verde)",

  "A Academia Militar das Agulhas Negras é um período composto pelas mesmas etapas da EsPCEx, as quais determinarão",
  "a aprovação ou a reprovação de um Cadete, sendo elas: aulas, atividades e prova. Caso aprovado,",
  "o Cadete assumirá o posto de Aspirante-a-Oficial, sendo assim, introduzido no Corpo de Oficiais para um período de observação.",
  "Caso reprovado, será rebaixado à patente de 2° Sargento.",
  "Dúvidas?",
];

const EditalMilitarII = () => {
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

      <Title level={2}>EMII</Title>
      <Text type="secondary" style={{ fontSize: "12px" }}>
        Edital Militar II
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
          bottom: 30,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "35px",
        }}
      >
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={handlePrevious}
          style={{
            fontSize: "17px",
            padding: "10px 20px",
            height: "45px",
            width: "150px",
          }}
        >
          Anterior
        </Button>
        <Button
          icon={<ArrowRightOutlined />}
          onClick={handleNext}
          style={{
            fontSize: "17px",
            padding: "10px 20px",
            height: "45px",
            width: "150px",
          }}
        >
          Próximo
        </Button>
      </div>
    </Card>
  );
};

export default EditalMilitarII;
