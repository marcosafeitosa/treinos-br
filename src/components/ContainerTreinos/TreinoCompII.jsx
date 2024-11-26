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
  'Responda as perguntas com "Sim, [sua patente]" ou "Não, [sua patente]'.,
  "Se aprovado no treino, receberá a sigla Tc2 e poderá auxiliar treinamentos.",
  "Caso seja reprovado, terá a oportunidade de refazer o treino em outro momento.",
  "O treinamento está dividido em três partes:",
  "Login, relatório e Área de Recrutas (ADR).",
  "Evite ficar inativo durante o treino.",
  "Dúvidas?",

  "Seja bem-vindo(a) ao Treinamento Complementar II do Exército Brasileiro.",
  "Eu sou o Segunto Tenente Therus e irei treiná-lo(a).",
  "Não durma durante o treinamento para não ser auto-kickado(a).",
  'Responda às perguntas com "Sim, Senhor", e "Não, Senhor".',
  "Se aprovado(a), ao final do treinamento receberá a sigla Tc2 e poderá auxiliar os Treinamentos Básicos e os Treinamentos Complementares I.",
  "Se reprovado(a), terá a chance de refazer o treinamento em outro momento.",
  "O treinamento está dividido em três partes: Login, Relatório e ADR.",
  "Dúvidas?",

  "II - Login. (Balão Verde)",
  "Acesse o nosso site: exbrhabbo,com (troque a , por .)",
  'Clique em "Login" na parte superior direita.',
  "Me avise quando conseguir, irei passar o seu acesso via sussurro.",
  "Acessou?",
  "Muito bem, agora irei ajudar você a mudar a senha.",
  "No canto superior direito, clique na primeira letra ou caractere do seu nick.",
  'Em seguida, clique em "Editar perfil".',
  "Feito isso, abrirá a página para alteração da senha.",
  "Coloque a senha atual, em seguida a senha nova e por último, confirme-a.",
  "Escolha uma senha da qual possa se lembrar.",
  "Caso se esqueça, teremos que conversar com um Oficial.",
  "É importante que você mude a senha, pois se não alterá-la, não conseguirá realizar nenhuma ação no painel.",
  "Dúvidas?",
  "III - Relatório. (Balão Verde)",
  "Sempre que for auxiliar um treino, deverá preencher o relatório de treinamento, onde terá informações referentes à instrução.",
  "Esse relatório serve para que os Oficiais possam ter controle de treinadores, auxiliares, treinados aprovados e reprovados.",
  "Durante o treinamento, os treinadores poderão necessitar do seu auxílio em algumas explicações de tópicos, portanto, esteja sempre atento ao sussurro.",
  "Agora, pesquise no Youthube por: Exército Brasileiro - Treinamento Complementar II - Cm-Anonimo e assista ao vídeo sobre como preencher o relatório.",
  "Você terá 10 minutos para assistir o vídeo todo. Caso caia do treinamento, pode voltar ao QG e pedir para um Oficial trazê-lo de volta.",
  "Me comunique quando terminar de assistir.",
  "Dúvidas?",
  "Agora, iremos fazer um teste.",
  "No canto superior direito do painel, clique na primeira letra ou caractere do seu nick e em seguida, na opção “Criar relatório”.",
  "Estarei passando algumas informações referente ao preenchimento.",
  "IV - Área de Recrutas (ADR). (Balão Verde)",
  "A Área de Recrutas é o local onde os alistados irão aguardar o treinamento.",
  "Para acessar essa área, peça que o Oficial em MQG abra a “Porta Nave Espacial” que está à esquerda do QG.",
  "Você deve entreter o Recruta enquanto o treinamento não é enviado.",
  "Podendo perguntar se ele joga pelo PC ou Celular, se sabe falar em negrito, se é a primeira vez dele em Exércitos e coisas desse tipo.",
  "Somente um praça pode acompanhar os recrutas por vez, além do treinador, dando preferência à menor patente e a quem ainda não pôde auxiliar.",
  "Dúvidas?",
  "V - Finalização. (Balão Verde)",
  "Parabéns, está aprovado(a) no Treinamento Complementar II.",
  "Agora você poderá auxiliar os Treinamentos Básicos I e II e os Treinamentos Complementares I.",
  "Você também poderá ficar com os novos Recrutas na ADR até que chegue o momento do envio do treinamento.",
  "E, como dito anteriormente, para auxiliar um treinamento você deve pedir para um Oficial e se dirigir até a ADR.",
  "Pode alterar a sua sigla para Tc2, por favor.",
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
