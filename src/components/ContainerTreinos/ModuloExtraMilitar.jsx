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

  "Módulo Extra Militar",
  "O Plano de Carreira do Exército Brasileiro foi criado com o intuito de ajudar o Praça abordando assuntos que não são mencionados nos",
  "treinamentos, como: hierarquia militar, patentes, patrocinadores, privilégios e packs.",
  "Dúvidas?",

  "II - HIERARQUIA MILITAR (Balão Verde)",

  "A Hierarquia Militar é uma pirâmide de poder, com o topo sendo constituído pelo Sr. Cm-Anonimo e, a partir dele,",
  "seus subordinados. Isso significa que, abaixo dele, você, como militar, pode exercer todas as patentes e funções.",
  "Ela divide os militares em patentes, funções típicas e atípicas, fazendo assim com que responsabilidades sejam distribuídas",
  "entre Oficiais e Praças, prezando sempre a melhor administração e organização possível para o Exército.",
  "Vale reforçar a importância do uso correto dos tratamentos dentro do QG: Senhor/Senhora para Oficiais e patente para os Praças,",
  "pois isso demonstra muito do seu respeito aos seus companheiros e à Hierarquia Militar à qual todos estão submetidos.",
  "Dúvidas?",

  "III - PATENTES (Balão Verde)",

  "Estarei explicando sobre as patentes e funções do Exército Brasileiro, seguindo a Hierarquia Militar.",
  "Patentes de Praças: Recruta, Soldado, Soldado Estrela, Cabo, Aluno da EsSA, Terceiro Sargento, Segundo Sargento,",
  "Primeiro Sargento, Subtenente, Aluno da EsPCEx e Cadete da AMAN.",
  "Patentes de Oficiais: Aspirante-a-Oficial, Segundo Tenente, Primeiro Tenente, Capitão, Major, Tenente-Coronel,",
  "Coronel, General-de-Brigada, General-de-Divisão, General-de-Exército e Marechal.",
  "Conforme você suba na hierarquia da instituição e alcance novas patentes, vai receber a oportunidade de ganhar novas funções",
  "como a participação nos grupos externos. Caso venha a se tornar um Oficial futuramente, além dos grupos externos,",
  "terá a oportunidade de fazer parte de uma das Companhias do Exército.",
  "Dúvidas?",

  "IV - PATROCINADORES, PRIVILÉGIOS E PACKS (Balão Verde)",

  "Esses 3 grupos têm o intuito de dar exclusividade a quem comprar, cada um com uma finalidade específica.",
  "Patrocinadores - Pode ficar sem boina no Quartel General, usar cores de peles diferentes e ainda pode usar",
  "sua medalha de patrocinador (Hierarquia Militar 4). O valor dele é de 20 câmbios.",
  "Privilégios - Concede benefícios, principalmente, aos participantes de eventos externos do Exército.",
  "Dependendo do evento, é possível furar filas, ter acesso garantido aos eventos",
  "(ainda que os quartos estejam lotados) e ser o host de rodadas.",
  'Em eventos internos, é possível desbloquear uma "segunda vida" em eventos de kicke, o que também é bastante interessante.',
  "O valor dele é de 10 câmbios.",

  "Pack I - Pode usar óculos de tipos variados e cores variadas. O valor dele é de 7 câmbios.",
  "Pack 2 - Pode usar bigodes e barbas de cores variadas. O valor dele é de 15 câmbios.",
  "Pack 3 - Pode usar acessórios diferenciados como o coldre, fones de ouvido etc. O valor dele é de 30 câmbios.",
  "Dúvidas?",
];

const ModuloExtraMilitar = () => {
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

      <Title level={2}>MEM</Title>
      <Text type="secondary" style={{ fontSize: "12px" }}>
        Módulo Extra Militar
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

export default ModuloExtraMilitar;
