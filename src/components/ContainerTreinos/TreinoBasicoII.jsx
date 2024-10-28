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
  "Seja bem-vindo(a) ao Treinamento Básico II do Exército Brasileiro.",
  "Eu sou o Segundo Tenente Therus e irei treiná-lo(a).",
  "Não durma durante o treinamento para não ser auto-kickado(a).",
  'Responda às perguntas usando "Sim, Senhor", e "Não, Senhor".',
  "Se aprovado(a), ao final do treinamento será promovido(a) à patente de Soldado Estrela.",
  "Se reprovado(a), terá a chance de refazer o treinamento em outro momento.",
  "O treinamento está dividido em três partes: MQG/ADO, Centro de Instrução e Apresente-se.",
  "Dúvidas?",
  "II - MQG (Monitoramento do Quartel General) e ADO (Área de Oficiais). (Balão Verde)",
  "O MQG é o palanque no centro do batalhão. Ali, os Oficiais monitoram, supervisionam o Quartel e garantem a sua organização.",
  "Subir no MQG ocasiona em rebaixamento/demissão.",
  "Dúvidas?",
  
  "ADO (Área de Oficiais):",
  "A ADO é o local reservado aos Oficiais, ou seja, os sofás brancos para quando não houver espaço em GP ou PAR..",
  "Nunca entre na Área de Oficiais - ADO, ou estará sujeito a banimento do Exército Brasileiro.",
  "Dúvidas?",
  
  "III - Centro de Instrução (CI). (Balão Verde)",
  "O CI são os tapetes brancos e pretos no andar de baixo do Quartel-General.",
  "Os treinadores utilizam os tapetes pretos e os treinados utilizam os tapetes brancos.",
  "A sua presença no Centro de Instruções pode ser solicitada por um Oficial também,",
  "seja para promovê-lo, avaliá-lo em um treino ou convocá-lo para algum Grupo Externo.",
  "Dúvidas?",
  
  "IV - Apresente-se. (Balão Verde)",
  'O "apresente-se" é utilizado em promoções e rebaixamentos de Praças e Oficiais.',
  'Após o Sentido/Atenção, o Oficial dirá: "fulano, apresente-se".',
  "Em seguida, seguem-se as etapas:",
  "1. Ir à frente do oficial e acenar.",
  "2. Esperar que o Oficial acene de volta.",
  "3. Falar: Senhor(a), [Sua Patente] [Seu Nick] apresentando-se, à espera de suas ordens.",
  "Atenção ao próximo exemplo para você pegar como referência quando chegar sua vez no teste prático.",
  "Senhor, Soldado Estrela Therus apresentando-se, à espera de suas ordens.",
  "4. Escutar as ordens dele em silêncio.",
  "5. Aguardar que o Oficial acene.",
  "6. Acenar logo após o Oficial.",
  "7. Dizer: Senhor(a), permissão para dispensa.",
  "8. Aguardar a dispensa e fazer as alterações em PAR - Sofás-vermelhos.",
  "Dúvidas até o momento?",
  
  "Regras a serem seguidas ao se apresentar:",
  "1.  Estar sempre em frente ao Oficial, caso esteja torto, dê um passo para trás e fique reto para o Oficial.",
  "2. Realizar as alterações somente após a dispensa e em PAR.",
  '3. Nunca acenar utilizando o comando "o/".',
  'Dúvidas sobre o "Apresente-se"?',
  
  "V - Finalização. (Balão Verde)",
  "Parabéns, você está aprovado no Treinamento Básico II. Agora está apto a ser promovido(a) no Quartel.",
  "Agora, altere sua missão para [Ex.BR] Soldado Estrela."
];

const patenteMap = {
  "Terceiro Sargento": "Sargento",
  "Segundo Sargento": "Sargento",
  "Primeiro Sargento": "Sargento",
  "Subtenente": "Subtenente",
  "Aluno da EsPCEx": "Aluno",
  "Cadete da AMAN": "Cadete",
};

const TreinoBasicoII = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loginData, setLoginData] = useState(null);
  const navigate = useNavigate();
  const copyButtonRef = useRef(null);
  const paragraphRefs = useRef([]); // Adiciona um array de referências para os parágrafos

  const handleBack = () => {
    navigate("/pagina-treinos");
  };

  useEffect(() => {
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
      if (index === 2) {
        return `Eu sou o ${loginData.patente} ${loginData.nick} e irei treiná-lo(a) para a sua aprovação.`;
      }
      if (index === 4) {
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

  const copyToClipboard = (index) => {
    const text = getParagraphText(index);
    const processedText = removeBalãoVerde(text);

    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(processedText)
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
    } else if (copyButtonRef.current) {
      const clipboard = new Clipboard(copyButtonRef.current, {
        text: () => processedText,
      });
      clipboard.on("success", () => {
        notification.success({
          message: "Texto copiado para a área de transferência!",
          duration: 0.5,
        });
        clipboard.destroy();
      });
      clipboard.on("error", (err) => {
        notification.error({
          message: "Falha ao copiar o texto.",
          description: err.toString(),
          duration: 0.5,
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

  // Efeito para centralizar o parágrafo atual na tela
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

      <Title level={2}>T2</Title>
      <Text type="secondary" style={{ fontSize: "12px" }}>
        Treinamento Básico II
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
            ref={(el) => (paragraphRefs.current[index] = el)} // Adiciona a referência ao parágrafo
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

export default TreinoBasicoII;
