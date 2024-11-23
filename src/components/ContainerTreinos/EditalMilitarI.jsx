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

  "Edital Militar I:",
  "Seja bem-vindo à palestra de Edital Militar I.",
  "Aqui falaremos sobre os grupos externos e algumas graduações de que vocês podem participar durante sua estadia na Instituição.",
  "Todos demandam um comprometimento ainda maior com nossas atividades diárias, mas agregam bastante na carreira dos senhores.",
  "Falaremos sobre cada um deles nesta palestra. Participar de um Grupo Externo lhe confere maiores possibilidades de promoção e",
  "de convocação para uma academia qualificadora de Oficiais.",
  "Atualmente, o Exército Brasileiro conta com 7 grupos externos, sendo eles: Ajudantes, Monitores, Supervisores, Cavalaria,",
  "Comandos, Infantaria e Paraquedistas.",
  "Dúvidas?",

  "II - AJUDANTES (Balão Verde)",

  "Os Ajudantes são os guardiões dos meios de comunicação do exército.",
  "Eles são os responsáveis por zelar pelo Team Speak, ao ajudar os Praças a instalar e configurar o programa e",
  "fazer a manutenção do mesmo, atualizando as patentes e supervisionando a conduta dos membros nos bate-papos.",
  "Além disso, eles também introduzem os demais ao Dyscord e ao grupo do Uatizap.",
  "Para fazer parte do grupo Ajudantes, precisa ter patente mínima de Aluno da EsSA e procurar um dos Oficiais responsáveis.",
  "Dúvidas?",

  "III - MONITORES (Balão Verde)",

  "Os Monitores são aqueles que detêm poder para enviar e retornar com o seu próprio treinamento, ou seja,",
  "sem a presença de um Oficial, somente com a sua autorização.",
  "Para fazer parte do grupo Monitores, precisa ter patente mínima de Terceiro Sargento com a sigla T1",
  "e procurar um dos Oficiais responsáveis.",
  "Dúvidas?",

  "IV - SUPERVISORES (Balão Verde)",

  "Os Supervisores são parte essencial da fidelização de Praças.",
  "Suas funções são aplicar palestras de conteúdo complementar que guiem os membros do Exército Brasileiro na construção",
  "de suas carreiras militares, englobando orientações, conselhos e até correções.",
  "Pelo mesmo caminho, buscam ajudá-los com eventuais dúvidas e demais questões que ainda não estejam tão esclarecidas em suas mentes.",
  "Para ser um Supervisor, precisa ter patente mínima de Terceiro Sargento e procurar um dos Oficiais responsáveis.",
  "Dúvidas?",

  "V - CAVALARIA (Balão Verde)",

  "Este é o grupo destinado à graduação dos cavaleiros de nossa instituição, por meio de atividades variadas de interação",
  "com cavalos e diversão entre seus aprendizes.",
  "Em seu período de abertura serão iniciadas as inscrições, e para ser um convocado para a Cavalaria,",
  "deve-se cumprir com os seguintes pré-requisitos:",
  "ter patente mínima de Aluno da EsSA, possuir um cavalo e fazer parte dos três meios de comunicação do exército",
  "(Team Speak, Dyscord e Uatizap).",
  "Dúvidas?",

  "VI - COMANDOS (Balão Verde)",

  "O Comandos é um grupo extremamente sigiloso, portanto, tudo que é passado entre seus membros é mantido em total confidencialidade.",
  "Este é o grupo da mais alta elite do Exército Brasileiro, então um pré-requisito para ser um aprendiz",
  "é se destacar dentre os demais Praças.",
  "Além disso, o grupo não possui períodos determinados para abertura e suas convocações são efetuadas por meio de inscrições.",
  "Dúvidas?",

  "VII - INFANTARIA (Balão Verde)",

  "A Infantaria é um grupo de treinamentos físico, tático e médico com foco na prática do que realmente é o Exército Brasileiro.",
  "Com foco, principalmente, na descontração dos aprendizes, é o único grupo externo em que um Praça formado pode se tornar um Instrutor.",
  "A Infantaria não conta com períodos fixos para sua abertura, todavia, para participar dos treinamentos, basta comparecer nos horários",
  "disponibilizados pelos Instrutores, desde que possua patente mínima de Aluno da EsSA.",
  "Dúvidas?",

  "VIII - PARAQUEDISTAS (Balão Verde)",

  "Os Paraquedistas são os membros da elite da FMB (Forças Militares Brasileiras), sendo o único grupo o qual trabalha em conjunto",
  "com as duas outras instituições: Marinha do Brasil e Força Aérea Brasileira.",
  "As convocações são feitas mediante inscrição, seu funcionamento é altamente sigiloso, não possui datas fixas de abertura,",
  "além de contar com pouquíssimos aprendizes de cada uma das organizações militares.",
  "Dúvidas?",
];

const EditalMilitarI = () => {
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

      <Title level={2}>EMI</Title>
      <Text type="secondary" style={{ fontSize: "12px" }}>
        Edital Militar I
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

export default EditalMilitarI;
