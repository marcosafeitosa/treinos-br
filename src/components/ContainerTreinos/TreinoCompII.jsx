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
  "Seja bem-vindo ao Treinamento Complementar II.",
  "Eu sou o [patente] [nick] e irei treiná-lo.",
  'Responda às perguntas com "Sim, Senhor", e "Não, Senhor".',
  "Se aprovado no treino, receberá a sigla Tc2 e poderá auxiliar treinamentos.",
  "Caso seja reprovado, terá a oportunidade de refazer o treino em outro momento.",
  "O treinamento está dividido em três partes:",
  "Login, relatório e Área de Recrutas (ADR).",
  "Evite ficar inativo durante o treino.",
  "Dúvidas?",

  "II - Login. (Balão Verde)",
  "Você utilizará a sua conta no painel de Praças para postar relatórios de agora em diante.",
  "Primeiro iremos criar o seu acesso: para isso, você precisará acessar o nosso site.",
  "Entre em: exbrhabbo,com (troque a vírgula por um ponto) e me avise quando estiver com o site aberto.",

  'No canto superior direito, clique em "login".',
  'Te passarei as informações que o Oficial me passou, coloque-as na opção de "Login", e não deixe espaços antes ou depois do nick.',
  "Ao logar, você precisará criar uma nova senha.",
  "Escolha uma da qual você consiga se lembrar, porque caso se esqueça, um Oficial precisará resetá-la.",
  "Se não realizar a alteração da senha, ficará impossibilitado de realizar ações no painel.",
  "Alguma dúvida sobre como realizar o login?",

  "III - Relatório. (Balão Verde)",

  "Como dito anteriormente, sempre que realizar um auxílio, deverá preencher o relatório de treinamento.",
  "Esse relatório serve para que os Oficiais possam ter controle dos treinados, aprovados, reprovados, horários e saber como ocorreu a instrução.",
  "Você irá assistir a uma explicação em vídeo sobre como preencher corretamente os relatórios.",
  'Procure por "Exército Brasileiro - Treinamento Complementar II - Cm Anonimo" no YouThubee me avise quando encontrar o vídeo.',
  "Você terá 10 minutos para assistir ao vídeo. Caso caia do treinamento, basta retornar ao Quartel.",
  "Quando terminar de assistir o vídeo me avise para fazermos o teste prático.",

  "Iremos preencher um relatório de teste agora.",
  'No canto superior direito do painel, clique na primeira letra ou caractere do seu nick e selecione a opção "criar relatório".',
  "Podemos começar a preenchê-lo?",

  "No horário de início, coloque o horário atual.",
  "No Tipo de Treinamento escolha o Treinamento Básico I, na Sala, selecione a Sala que estamos.",
  "O oficial responsável por esse relatório em questão será o General-de-Exército pituxa214.",
  "Em Instrutor, pesquise meu nick e selecione-o.",
  "Em auxiliar, caso seu nick não está selecionado, pesquise e selecione-o.",
  'Em Treinados, será o nick do recruta que foi treinado, porém, para exemplos, escreva "fulano2024".',
  "O Horário de Fim é quando o treinamento acaba, ou seja, pode colocar o horário atual como exemplo.",
  "Em aprovados, clique e selecione o nick que aparece como sugestão, caso tenha sido aprovado.",
  "No campo de observações sempre coloque as seguintes perguntas e as responda após a interrogação quando for enviar um relatório:",
  '1. Como é a ortografia do treinador? (Ex.: "Boa.") 2. Como foi a atitude do treinador? (Ex.: "Excelente.")',
  '3. Houve algo de anormal no treinamento? (Ex.: "Não houve nada de anormal.") 4. O treinador é paciente? (Ex.: "Sim.")',
  "Após preencher as informações, clique em no botão 'ENVIAR - FUNDO VERDE', e me avise para eu pedir os dados do relatório ao Oficial.",
  
  "IV - Área de Recrutas (ADR). (Balão Verde)",

  "A ADR é o local onde os recrutas aguardam o treinamento, localizada ao lado do PDV.",
  "Um Oficial abrirá a porta para que você e o treinador possam adentrá-la.",
  "Enquanto você e o recruta aguardam um treinador, você pode conversar com o recruta para evitar que ele desista do treinamento",
  "e deixe o Quartel (perguntas como por qual dispositivo eles jogam ou se é a primeira vez deles em um Exército, por exemplo).",
  "Dúvidas?",

  "V - Finalização. (Balão Verde)",
  "Parabéns, está aprovado(a) no Treinamento Complementar II.",
  "Agora está apto a realizar auxílios. Verá sobre como auxiliar treinamentos com mais detalhes no seu Treinamento de Finalização (TF).",
  "Altere a sigla na sua missão para <Tc2",
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

      <Title level={2}>T4</Title>
      <Text type="secondary" style={{ fontSize: "12px" }}>
        Treinamento Complementar II
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
