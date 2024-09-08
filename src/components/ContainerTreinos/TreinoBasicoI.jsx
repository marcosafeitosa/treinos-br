import React, { useState, useEffect, useRef } from "react";
import { Card, Typography, Button, notification } from "antd";
import {
  LeftOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Clipboard from "clipboard";

const { Title, Text } = Typography;

const paragrafoArray = [
  "I - Introdução. (Balão Verde)",
  "Seja bem-vindo(a) ao Treinamento Básico I do Exército Brasileiro.",
  "Eu sou o Segundo Tenente Therus e irei treiná-lo(a) para sua aprovação.",
  "Não durma durante o treinamento para não ser auto-kickado(a).",
  'Responda às perguntas usando "Sim, Senhor", e "Não, Senhor".',
  "O Exército Brasileiro possui dois corpos docentes, são os Praças e os Oficiais.",
  "Praças utilizam a camisa VERDE.",
  "Para Praças, use o nick ou patente como tratamento.",
  "Exemplo: Sim, Sargento/Não, Sargento.",
  "Oficiais utilizam a camisa BRANCA.",
  'Você deve se dirigir a um Oficial usando "Senhor(a)".',
  "Exemplo: Sim, senhor(a)/Não, senhor(a).",
  "Dúvidas?",
];

const patenteMap = {
  "Terceiro Sargento": "Sargento",
  "Segundo Sargento": "Sargento",
  "Primeiro Sargento": "Sargento",
  "Subtenente": "Subtenente",
  "Aluno da EsPCEx": "Aluno",
  "Cadete da AMAN": "Cadete",
  "aspirante": "Aspirante",
  "segundo-tenente": "Segundo Tenente",
  "primeiro-tenente": "Primeiro Tenente",
  "capitao": "Capitão",
  "major": "Major",
  "tenente-coronel": "Tenente Coronel",
  "coronel": "Coronel",
  "gdb": "General de Brigada",
  "gdd": "General de Divisão",
  "gde": "General de Exército",
  "demitido": "Demitido",
};

const TreinoBasicoI = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loginData, setLoginData] = useState(null);
  const navigate = useNavigate();
  const copyButtonRef = useRef(null);

  // Função para lidar com a navegação ao clicar no ícone
  const handleBack = () => {
    navigate("/pagina-treinos");
  };

  useEffect(() => {
    // Pegar dados do localStorage e definir estado
    const storedData = JSON.parse(localStorage.getItem("loginData"));
    setLoginData(storedData);
  }, []);

  // Função para remover "(Balão Verde)" do texto
  const removeBalãoVerde = (text) => {
    return text.replace(/\(Balão Verde\)$/, "").trim();
  };

  // Função para obter o texto do parágrafo atualizado
  const getParagraphText = (index) => {
    if (loginData) {
      if (index === 2) { // Atualiza o parágrafo específico
        return `Eu sou o ${loginData.patente} ${loginData.nick} e irei treiná-lo(a) para a sua aprovação.`;
      }
      if (index === 4) { // Atualiza o parágrafo com "Sim, Senhor"
        if (loginData.corpoDeOficiais === "sim") {
          return 'Responda às perguntas usando "Sim, Senhor", e "Não, Senhor".';
        }
        if (loginData.corpoDePracas === "sim") {
          const patente = loginData.patente;
          const tratamento = patenteMap[patente] || "Senhor";
          return `Responda às perguntas usando "Sim, ${tratamento}", e "Não, ${tratamento}".`;
        }
      }
    }
    return paragrafoArray[index];
  };

  // Função para copiar o texto para a área de transferência
  const copyToClipboard = (index) => {
    const text = getParagraphText(index);
    const processedText = removeBalãoVerde(text);

    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(processedText)
        .then(() => {
          notification.success({
            message: "Texto copiado para a área de transferência!",
            duration: 1.5,
          });
        })
        .catch((err) => {
          notification.error({
            message: "Falha ao copiar o texto.",
            description: err.toString(),
            duration: 1.5,
          });
        });
    } else if (copyButtonRef.current) {
      const clipboard = new Clipboard(copyButtonRef.current, {
        text: () => processedText,
      });
      clipboard.on("success", () => {
        notification.success({
          message: "Texto copiado para a área de transferência!",
          duration: 1.5,
        });
        clipboard.destroy();
      });
      clipboard.on("error", (err) => {
        notification.error({
          message: "Falha ao copiar o texto.",
          description: err.toString(),
          duration: 1.5,
        });
        clipboard.destroy();
      });
      copyButtonRef.current.click();
    }
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
        onClick={handleBack}
        style={{
          fontSize: "20px",
          position: "absolute",
          color: "red",
          left: 10,
          bottom: 60,
          cursor: "pointer",
        }}
      />

      <Title level={2}>T1</Title>
      <Text type="secondary" style={{ fontSize: "12px" }}>
        Treinamento Básico I
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
            {getParagraphText(index)}
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
        <button ref={copyButtonRef} style={{ display: "none" }}></button>
      </div>
    </Card>
  );
};

export default TreinoBasicoI;
