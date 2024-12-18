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
  "I — INTRODUÇÃO (Balão Verde)",
  "Programa de Instrução ao Soldado - PIS",
  "Eu faço parte do Grupo de Supervisores e serei o responsável em lhe aplicar essa Palestra hoje.",
  "Nessa palestra entraremos em alguns pontos superficiais a fim de instruir os novos membros, sanando todas as dúvidas possíveis sobre nossa instituição.",

  "II — EXÉRCITO BRASILEIRO (Balão Verde)",
  "O Exército Brasileiro do Marechal Cm-Anonimo criado em 2021 tem o intuito de trazer ao jogador sensação de estar realmente participando de um Exército na vida real.",
  "Ou seja, trazemos treinamentos, grupos externos e muitas outras coisas que irá encontrar em sua caminhada aqui conosco.",

  "III — LOCAIS DO QUARTEL GENERAL (Balão Verde)",

  "1. Guarda-Portão (GP).",
  "São as “Cadeiras Majestosas” que ficam localizadas na parte de frente do Quartel General.",
  "Sua principal função no QG como Soldado em GP é realizar o alistamento dos civis que irão comparecer no GP.",
  "Assim que o civil sentar, deverá perguntar se o mesmo deseja se alistar.",
  "Exemplo: Fulano, deseja se alistar?",
  'Caso ele diga sim, utilize o comando ":liberar". Caso ele não queira ou esteja atrapalhando, sussurre com um Oficial.',
  "Dúvidas?",

  "2. Centro de Instrução (CI).",
  "O Centro de Instrução (CI) é o local utilizado para a realização de promoções, auxílios e treinamentos quando não enviados nas devidas salas.",
  "O CI são os tapetes brancos e pretos localizados na parte esquerda do Quartel General.",
  "Tapetinho branco para quem está instruindo/promovendo;",
  "Tapetinho preto para quem está recebendo a instrução/promoção.",
  "Você em seu atual posto de Soldado, só poderá ir até o CI quando solicitado por algum Praça/Oficial capacitado para lhe instruir no mesmo.",
  ". As instruções do CI são aplicadas individualmente, portanto, será passada para você via sussurro.",
  "Dúvidas?",

  "IV — ATIVAÇÃO DAS TROCAS (Balão Verde)",
  "Você como Soldado do Exército possui direito ao pagamento que é realizado 4 vezes por dia.",
  "Caso suas trocas ainda não estejam ativadas, você precisa ativá-las para poder negociar e assim receber seus pagamentos.",
  "Como saber o que preciso fazer para ativar as minhas trocas?",
  "Simples: você precisa procurar pelas Conquistas do seu usuário no jogo e realizar todas as ações das abas de “Tutorial” e “Trocas Ativadas”.",
  "Algumas levam alguns dias e tempo no hotel, mas várias podem ser concluídas rapidamente.",
  'Há vários vídeos de como liberar as trocas, basta procurar no Youtube por: "COMO LIBERAR AS TROCAS NO HABBO"',
  "para ter mais detalhes e informações sobre o assunto. Lembre-se que somente com elas ativadas poderá receber seu pagamento diário.",
  "Dúvidas?",
];

const ProgramacaoInstrucaoSoldado = () => {
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

      <Title level={2}>PIS</Title>
      <Text type="secondary" style={{ fontSize: "12px" }}>
        Programa de Instrução ao Soldado
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

export default ProgramacaoInstrucaoSoldado;
