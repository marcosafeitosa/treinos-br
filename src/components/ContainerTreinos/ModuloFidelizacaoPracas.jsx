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

  "Módulo de Fidelização dos Praças:",
  "O Módulo de Fidelização dos Praças (MFP) foi criado visando orientar vocês Praças sobre a importância de um bom tratamento",
  "para com os novos integrantes do Exército Brasileiro, afinal, o tratamento com os novatos é essencial para a fidelização do mesmo.",
  "Para explorar a fundo este conceito, iremos abordar alguns assuntos pertinentes a esta temática.",

  "II - TRATAMENTO E COMPORTAMENTO ADEQUADOS (Balão Verde)",

  "É possível afirmar que, a cada patente que alcançamos, nosso poder de influência e nosso impacto nas ações do Exército aumentam.",
  "Com isso, torna-se necessário aprimorar os nossos próprios métodos para atender bem às demandas diárias do Quartel General.",
  "Da mesma forma que a boa recepção causa bons julgamentos, se nosso tratamento for ruim, a impressão daquele visitante",
  "ou do novo Praça certamente será mais negativa do que positiva, e isso interfere diretamente nos nossos objetivos coletivos.",
  "Vamos pensar que o nosso Exército pode ser tratado como uma empresa, onde temos os funcionários e os clientes.",
  "De forma resumida, podemos dizer que nossos Oficiais e Praças são os funcionários e os civis/visitantes são os clientes.",
  "Já que o Quartel General é o nosso local de trabalho e queremos atrair o interesse deles, devemos ser receptivos, educados",
  "respeitosos, gentis e falar sobre os pontos positivos de fazer parte da nossa equipe.",
  "Além dos pagamentos 4x ao dia, podemos falar do nosso ambiente amigável e familiar, de ser um dos melhores passatempos no jogo,",
  "sobre ir aprendendo mais sobre o game enquanto recebe novas funções dentro do Exército, entre outras formas.",
  "Abordagens originais e criativas podem chamar ainda mais a atenção deles.",
  "Dúvidas?",

  "III - ALTRUÍSMO (Balão Verde)",

  "O altruísmo é a tendência natural do ser humano de se preocupar com o outro e buscar ajudá-lo com suas eventuais dificuldades,",
  "que podem ser momentâneas ou não. Essa é uma característica presente nos melhores Praças do Exército",
  "e que molda os futuros melhores Oficiais, pois reflete muito sobre a humildade e a empatia que aquela pessoa consegue",
  "demonstrar enquanto militar. Ser este indivíduo para alguém pode ser o diferencial para que ele encontre suporte,",
  "conforto e confiança para se manter no Exército.",
  "Muitas vezes, militares com essa característica saem da própria zona de conforto para ajudar algum companheiro - em alguns casos,",
  "até se arriscam para salvá-los. Pessoas altruístas são sempre bem vistas e, normalmente, são mais requisitadas do que as demais.",
  "Isso significa que essas pessoas demonstram aos superiores que realizam um trabalho mais completo e produtivo.",
  "Da mesma forma, aos seus subordinados, apresentam as características de serem confiáveis e auxiliares,",
  "o que é muito importante no dia a dia em qualquer lugar ou atividade que envolva diversas pessoas.",
  "Afinal, quem não gosta de ter aquele amigo que pode te salvar quando você estiver precisando de uma ajudinha, né?!",
  "Dúvidas?",

  "IV - RETENÇÃO DE NOVOS INTEGRANTES (Balão Verde)",

  "Todos os conceitos trabalhados até aqui, quando aplicados corretamente no dia a dia de trabalho, ajudam o Exército",
  "a alcançar uma de suas finalidades: a retenção dos novos integrantes.",
  "O que isso significa? Quer dizer que estamos ajudando o Exército a manter aquelas pessoas que chegaram há pouco tempo,",
  "seja a curto ou a longo prazo. Considerando que o Quartel General abre todos os dias e não pretende diminuir isso,",
  "devemos priorizar aquilo que é bom a longo prazo, ou seja, aquilo que pode trazer retorno por mais tempo,",
  "ainda que demore um pouco para que isso comece a acontecer.",
  "Por exemplo: aplicar treinos, palestras e fidelizar um novo Praça pode fazer com que ele, em alguns dias, se torne um Sargento,",
  "podendo instruir e formar novos Soldados que poderão repetir este mesmo ciclo posteriormente, fazendo a válvula girar e",
  "o Exército funcionar de forma autossustentável. Sabe-se que nem sempre isso é possível, porém ainda assim a ajuda daquele Praça",
  "pode ser útil caso ele não permaneça na instituição até que se torne Sargento.",
  "Para isso, alguns exemplos de retorno a curto prazo são: o alistamento de visitantes no QG por parte de um Soldado bem instruído;",
  "um bom recrutamento externo realizado por um Cabo; e um auxílio de treinamento por parte de um Aluno da EsSA.",
  "Todos esses exemplos configuram algum tipo de contribuição para o Exército e envolvem ações básicas que todas",
  "as patentes podem exercer. Como superiores hierarquicamente, independente de sermos Oficiais,",
  "podemos ajudar os mais novos com dicas, orientações e retirando dúvidas para aperfeiçoar as habilidades daquela pessoa.",
  "Quando isso é feito com altruísmo, respeito, paciência, empatia e seriedade, as chances de bons frutos individuais e",
  "coletivos serem gerados são bem maiores, pois colaboramos para a integração daqueles novos membros e despertamos",
  "neles a vontade de alcançar novos patamares.",
  "Dúvidas?",
];

const ModuloFidelizacaoPracas = () => {
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

      <Title level={2}>MFP</Title>
      <Text type="secondary" style={{ fontSize: "12px" }}>
        Módulo de Fidelização dos Praças
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

export default ModuloFidelizacaoPracas;
