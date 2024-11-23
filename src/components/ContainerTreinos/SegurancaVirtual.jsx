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

  "Segurança Virtual",
  "Bem-vindo ao curso de Segurança Virtual. Aqui traremos algumas noções de segurança e privacidade,",
  "nos principais meios de comunicação digitais do mundo contemporâneo.",
  "Permaneça em silêncio e preste atenção em todas as informações passadas nesta palestra.",

  "II - CONSCIENTIZAÇÃO VIRTUAL (Balão Verde)",

  "Ao navegar online, mantenha-se atento aos links suspeitos em e-mails, mensagens e sites. Evite clicar em URLs desconhecidos,",
  "especialmente aqueles que solicitam informações pessoais. Verifique a legitimidade examinando o endereço e procurando erros ortográficos.",
  "Conscientização digital é a chave para prevenir ataques cibernéticos, portanto, pense antes de clicar e proteja-se contra ameaças virtuais.",

  "III - SENHAS (Balão Verde)",

  "Manter suas senhas confidenciais é crucial para preservar sua privacidade online. Ao compartilhar senhas, você expõe",
  "informações sensíveis a riscos de segurança.",
  "Essas chaves digitais são a primeira linha de defesa contra invasões e protegem dados pessoais, financeiros e profissionais.",
  "Mantenha suas senhas seguras, evite reutilização e atualize-as regularmente para fortalecer sua defesa cibernética.",
  "Nada adianta ter uma senha sem saber usá-la, confira nossas dicas:",

  "Nunca utilize a mesma senha em mais de três lugares.",
  "Nunca passe seu acesso para ninguém, e também não anote, memorize ela.",
  "Caso não consiga memorizar suas senhas ou tenha dificuldades para lembrar delas, evite anotar em celulares ou computadores,",
  "que podem ser hackeados. Faça isso em algum caderno ou bloco de notas que tenha fisicamente em sua casa,",
  "pois assim você se mantém mais seguro e as chances de ter seus dados roubados são bem menores.",
  "Dúvidas?",
];

const SegurancaVirtual = () => {
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

      <Title level={2}>SV</Title>
      <Text type="secondary" style={{ fontSize: "12px" }}>
        Segurança Virtual
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

export default SegurancaVirtual;
