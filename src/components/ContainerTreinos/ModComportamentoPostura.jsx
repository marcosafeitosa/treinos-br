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

  "Módulo de Comportamento e Postura:",
  "A palestra de Módulo de Comportamento e Postura tem como objetivo instruir os militares sobre a importância da conduta exemplar",
  ",e da postura profissional nas diversas situações do âmbito militar.",
  "Para que você como praça caminhe de forma correta, é necessário obedecer algumas normas, com o fim de obter um melhor",
  "relacionamento entre todos, e isso ocorre principalmente a partir do entendimento sobre os três tópicos que veremos nesta palestra:",
  "valores, deveres e ética.",
  "Dúvidas?",

  "II - VALORES (Balão Verde)",

  "Dentro de uma instituição militar, a ênfase nos valores é crucial para o desenvolvimento tanto do militar quanto da instituição.",
  "Os valores, como integridade, disciplina, lealdade e respeito, não apenas orientam o comportamento individual,",
  "mas também fortalecem o espírito de equipe.",
  "Ao promover uma cultura baseada em princípios éticos, os militares desenvolvem a confiança mútua e a resiliência necessária",
  "para enfrentar os desafios nas diversas funções durante o dia a dia.",
  "Essa fundação de valores não apenas molda a conduta do militar, mas também contribui para a imagem e reputação dentro da instituição.",

  "III - DEVERES (Balão Verde)",

  "Conforme o Exército Brasileiro real, aqui existem deveres morais e deveres jurídicos. O dever moral é algo voluntário,",
  "ou seja, sem imposição legal para seu cumprimento, por exemplo: honestidade, sinceridade, honradez, lealdade, justiça,",
  "não pensar em enganar e agir sempre de consciência limpa. Já o dever jurídico é imposto por nossas leis, normas, diretrizes",
  "ordens, entre outros, algo que deve ser seguido à risca, com possível penalidade, por exemplo: respeito à hierarquia,",
  "cumprimento de ordens, fidelidade à sua instituição, respeito com o próximo, etc.",
  "Dúvidas?",

  "IV - ÉTICA (Balão Verde)",

  "A ética militar é algo muito importante para que a instituição flua de forma limpa e agradável.",
  "Agora, passarei uma lista com importantes exemplos de ética que devem ser seguidos aqui:",

  "I - Cultuar a verdade, a lealdade e a responsabilidade;",
  "II - Respeitar o próximo, independentemente do grau hierárquico;",
  "III - Observar as normas da boa educação;",
  "IV - Cumprir e fazer cumprir as leis, os regulamentos, as instruções e as ordens das autoridades às quais estiver subordinado;",
  "V - Ser justo e imparcial;",
  "VI - Zelar sempre pelos preceitos da ética militar.",

  "OBS: A violação dos deveres, valores e ética militares constitui, normalmente, transgressão disciplinar e pode gerar punições.",
  "É necessário sempre sermos justos, íntegros e fiéis ao nosso trabalho, mantendo, da mesma maneira, a devida postura.",
  "Dúvidas?",
];

const ModComportamentoPostura = () => {
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

      <Title level={2}>MCP</Title>
      <Text type="secondary" style={{ fontSize: "12px" }}>
        Módulo de Comportamento e Postura
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

export default ModComportamentoPostura;
