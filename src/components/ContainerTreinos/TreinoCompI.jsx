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
  "Seja bem-vindo(a) ao Treinamento Complementar I do Exército Brasileiro.",
  "Eu sou o Segundo Tenente Therus e irei treiná-lo(a).",
  'Responda às perguntas com "Sim, Senhor", e "Não, Senhor".',
  "Se aprovado(a), ao final do treinamento receberá a sigla Tc1.",
  "Se reprovado(a), terá a chance de refazer o treinamento em outro momento.",
  "O treinamento está dividido em quatro partes: Site, Posto de Verificação (PDV), Team Speak³ (TS) e Recrutamento Externo (RE).",
  "Evite ficar inativo durante o treino.",
  "Dúvidas?",

  "II - Site. (Balão Verde)",
  "O nosso site contém diversas informações sobre a instituição.",
  "Nele é possível conhecer mais sobre o Exército e o seu funcionamento.",
  "Por exemplo, lá é possível consultar a apostila de cabelos, peles e acessórios permitidos no Quartel.",
  "Mas a sua principal função é a Pesquisa Militar: onde podemos verificar o registro de todos os nossos membros, alistados ou ex-alistados e o seu status.",
  "Os status existentes são:",
  "A pesquisa militar é uma caixa de pesquisa presente ao lado esquerdo da página inicial.",
  "Lá podemos inserir o nickname de qualquer avatar do Habbo e o sistema irá passar o status dele relacionado ao nosso Exército.",
  "Os status são:",
  "Ativo: devidamente alistado no Exército.",
  "Sem registro: nunca se alistou conosco.",
  "Já as demissões constam como:",
  "Auto-Demissão, Mau Comportamento, Traição ou Sem Volta.",
  'Nos casos de Traição ou Mau Comportamento, somente os Oficiais podem autorizar que a pessoa se realiste.',
  'Nos casos de Sem Volta, o realistamento não é permitido.',
  "Dúvidas?",

  "Agora, realizaremos um teste.",
  "Acesse: exbrhabbo,com (troque a vírgula por um ponto) e me informe quando estiver com o site aberto.",
  "Agora pesquise pelo seu nick e informe alguma das informações: data de promoção, status ou quem realizou a sua última promoção.",

  "III. Posto de Verificação (PDV). (Balão Verde)",
  "O PDV é responsável por conferir missões, grupos, registros, fardamentos dos Praças e corrigir possíveis irregularidades.",
  "O PDV está localizado ao lado do GP, em frente aos rollers.",
  "Caso todos os GPs estejam preenchidos e você for a menor patente presente, deverá assumir o PDV.",
  'Se já houver um superior em PDV, você deve assumi-lo dizendo "Assumo, [patente]".',
  "Para sair ou se ausentar da função, avise ao Oficial em MQG.",
  "Os comandos do PDV são:",
  ":abrir - se o Praça estiver correto.",
  ":pular - que transfere o Praça para o último lugar da fila.",
  ":ausente - envia o Praça de volta ao hall.",
  ":vestir - coloca o fardamento no Praça.",
  "Antes de liberar alguém, você precisa se certificar de que a missão, status, grupo favoritado e fardamento estão corretos,",
  "de acordo com o site, e o perfil habilitado.",
  "Enquanto estiver no PDV, você deverá usar o balão com a cor VERDE.",
  "Dúvidas?",

  "IV - Team Speak 3 (TS³). (Balão Verde)",

  "O Team Speak é a nossa principal ferramenta de comunicação.",
  "Ela permite que se tenha uma maior eficiência e precisão na comunicação com os demais.",
  "É fundamental possuir o Team Speak, ele te auxiliará a ter um bom desenvolvimento nas funções que receberá.",
  "O Team Speak é um aplicativo leve, que possibilita o download em qualquer aparelho. Possui versão para computador e celular.",
  "Caso tenha interesse em instalar, procure por um Ajudante ou um Oficial.",
  "Os Ajudantes utilizam uma medalha azul no fardamento.",
  "Dúvidas?",

  "V - Recrutamento Externo (RE). (Balão Verde)",

  "O RE consiste em sair com a sua conta pelo hotel e trazer uma pessoa por vez para que se aliste no Exército Brasileiro.",
  "É uma atividade diária e realizada em todos os turnos.",
  "Você deve se passar por um civil comum, conversar com outras pessoas em quartos públicos e convencê-los a efetuar o alistamento.",
  "Não é permitido passar informações enganosas ou prometer recompensas falsas durante o processo.",
  "Para a ronda se dar por completa, é necessário conseguir no mínimo 1 alistado.",
  "Ele é realizado pelo Team Speak, por onde os Oficiais monitoram essa função.",
  "Realizá-lo é uma ótima contribuição ao Exército.",
  "O quanto antes, se voluntarie para o seu primeiro RE.",
  "Dúvidas?",

  "VI - Finalização. (Balão Verde)",
  "Parabéns, está aprovado(a) no Treinamento Complementar I.",
  "Agora está apto a assumir o PDV e realizar Recrutamentos Externos.",
  "Altere sua sua missão para: [Ex.BR] Cabo <Tc1",
  ">.",
];

const patenteMap = {
  "Terceiro Sargento": "Sargento",
  "Segundo Sargento": "Sargento",
  "Primeiro Sargento": "Sargento",
  Subtenente: "Subtenente",
  "Aluno da EsPCEx": "Aluno",
  "Cadete da AMAN": "Cadete",
};

const TreinoCompI = () => {
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

      <Title level={2}>T3</Title>
      <Text type="secondary" style={{ fontSize: "12px" }}>
        Treinamento Complementar I
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

export default TreinoCompI;
