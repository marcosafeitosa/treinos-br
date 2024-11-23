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
  "O Programa de Informação aos Praças (PIP) foi criado com a função de ajudar os Praças informando algumas dicas",
  "de como se portar dentro do Quartel General, como realizar um RE e te alertar sobre suas responsabilidades.",
  "Afinal, queremos que você usufrua da sua estadia no Exército da melhor forma possível,",
  "conseguindo realizar suas funções e tendo mais chances de êxito em suas metas e consequentemente se desenvolver aqui conosco.",

  "II - COMPORTAMENTO NO QUARTEL GENERAL (Balão Verde)",
  "No Exército Brasileiro prezamos a empatia e o respeito mútuo. Você, como Praça, deve sempre ser respeitoso, receptivo e paciente com todos.",
  "Sabe-se que muitos dos novos integrantes do Exército conhecem pouco sobre o jogo e, por isso, podem ter mais",
  "dificuldades na adaptação do que os mais experientes.",
  "Tendo isso em mente, todos devemos nos esforçar para termos o máximo de tolerância, de paciência e de altruísmo",
  "para com aqueles que estiverem precisando de alguma ajuda.",
  "Entendemos que um bom tratamento é crucial para o bem-estar de todos no dia a dia da Instituição e que,",
  "quanto mais pudermos propagar isso, maiores são as chances de sucesso nas atividades diárias.",
  "Da mesma forma, quando você estiver realizando alguma função, tente se concentrar ao máximo para realizá-la da melhor maneira possível,",
  "pois isso demonstra muito sobre a sua postura perante as responsabilidades do Exército Brasileiro.",
  "Dúvidas?",

  "III - RECRUTAMENTO EXTERNO (Balão Verde)",

  "Recrutamento é uma função que você em sua atual patente já pode exercer.",
  "O RE é uma das várias maneiras da instituição conseguir novos membros.",
  "Daremos algumas instruções de como realizar um Recrutamento Externo efetivo:",

  "Coloque um visual diferenciado, que vá chamar atenção do abordado.",
  "Utilize balões de fala coloridos e chamativos.",

  "Use a criatividade para convencer o civil a te seguir e se alistar no Exército Brasileiro. Aqui vão algumas dicas de abordagem:",

  "“Olá, tudo bem?”",
  "“Você poderia me ajudar com uma missão aqui no jogo?”",
  "“Preciso levar pessoas ao local onde trabalho aqui no jogo. Você poderia ir lá comigo para conhecer, por favor?",
  "Seria muito importante pra mim e me ajudaria bastante! Lá eles pagam os iniciantes 4 vezes por dia e é um ótimo local para fazer bons amigos!”",
  "Dúvidas?",

  "IV - RESPONSABILIDADES (Balão Verde)",

  "Quando você se alista e é aprovado no treinamento, já recebe novas responsabilidades.",
  "É muito importante que você retire todas as dúvidas para que possa realizar suas funções da melhor maneira possível.",
  "Então, quando tiver alguma dúvida, não fique com receio de perguntar.",
  "Não é necessário ficar da abertura até o fechamento do Quartel General, porém, quanto mais agregar à instituição,",
  "mais terá chances de crescer aqui dentro.",
  "Para que nosso trabalho fique mais empolgante e dinâmico, prezamos a comunicação.",

  "Por isso possuímos os seguintes meios:",
  "1 - Servidor no Dyscord",
  "2 - Grupo no @whatsahpp",
  "3 - E o que mais utilizamos, o Team Speak.",

  "Incentivamos, desde cedo, que busquem fazer parte desses meios. Caso queira, procure um ajudante ou um Oficial.",
  "Ajudantes usam medalha azul na farda e os Oficiais são de camisa branca!",
  "Dúvidas?",
];

const ProgramacaoInstrucaoPracas = () => {
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

      <Title level={2}>PIP</Title>
      <Text type="secondary" style={{ fontSize: "12px" }}>
        Programa de Instrução aos Praças
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

export default ProgramacaoInstrucaoPracas;
