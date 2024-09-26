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
  "Seja bem-vindo(a) ao Treinamento Básico I do Exército Brasileiro.",
  "Eu sou o Segundo Tenente Therus e irei treiná-lo(a) para sua aprovação.",
  "Não durma durante o treinamento para não ser auto-kickado(a).",
  'Responda às perguntas usando "Sim, Senhor", e "Não, Senhor".',
  "O Exército Brasileiro possui dois corpos docentes, são os Praças e os Oficiais.",
  "Praças utilizam a camisa VERDE.",
  "Para Praças, use o nick ou patente como tratamento.",
  "Exemplo: Sim, Sargento/Não, Sargento.",
  "Oficiais utilizam a camisa BRANCA.",
  'Você deve se dirigir a um Oficial usando "Senhor(a)".',
  "Exemplo: Sim, senhor(a)/Não, senhor(a).",
  "Dúvidas?",
  
  
  "II - Pagamentos. (Balão Verde)",
  "Após aprovado(a) neste treinamento, você será um Soldado do Exército Brasileiro",
  "sendo assim, possuirá direito a pagamentos.",
  "Estes ocorrem 4x ao dia, horários: 12h, 15h, 18h e 21h.",
  "Soldados ganham 4 mobis, Soldado Estrela 5 mobis e Cabos 6 mobis.",
  "Dúvidas?",
  

  "III - Negrito. (Balão Verde)",
  "O negrito é obrigatório nas dependências do Exército Brasileiro.",
  "Para utilizar o negrito pelo computador,",
  "basta segurar a tecla SHIFT e teclar ENTER após digitar a frase.",
  'Caso o negrito falhe, corrija-o com um "*" em negrito.',
  "Para utilizar o negrito na versão mobile, basta escrever :shout no início da frase.",
  "Exemplo: ;shout Olá. (Altere ; por : )",
  "Dúvidas?",

  "IV - Comandos. (Balão Verde)",
  "1. Sentido/Atenção.",
  "Você ficará de pé diante do seu assento.",
  "Este movimento se chama Sentido/Atenção, deve ser feito quando ouvir um apito.",
  "Ou quando um Oficial for à portinha e solicitar o comando.",
  "Em Sentido é proibido falar/sussurrar e ficar com drinks na mão.",
  "Caso fique torto(a), sente-se e refaça o movimento até ficar reto(a).",
  "Sabe soltar itens da mão?",
  'Clique em você, aperte na seta em cima do seu boneco e em "Soltar Item".',
  'Em caso de bug, você pode usar o comando ":drop" também.',
  "Dúvidas?",

  "2. Descansar/À vontade.",
  "Você irá se sentar novamente no seu assento.",
  "Este movimento se chama Descansar/À vontade.",
  "Quando for dado esse comando, deve se sentar e retornar para suas atividades.",
  "Ambos os comandos devem ser executados em 5 segundos.",
  "Caso contrário, poderá ir para fora do QG. Mas poderá retornar normalmente.",
  "Dúvidas?",

  "V - Quartel-General (QG). (Balão Verde)",
  "1. Guarda-Portão (GP).",
  'São as "Cadeiras Majestosas" que ficam localizadas na parte da frente do QG.',
  "Para assumir o GP, fique a um quadrado de distância atrás do posto e digite:",
  '"Assumo, [Patente]."',
  "Em GP é proibido se ausentar e deve sempre assumir seus superiores.",
  "A função do GP é o alistamento.",
  "Exemplo: Fulano, deseja se alistar?",
  'Caso ele diga sim, utilize o comando ":liberar".',
  "Caso ele não queira ou esteja atrapalhando, sussurre com um Oficial.",
  "Dúvidas?",
  "2. Preencha a Retaguarda (PAR).",
  "O PAR são os sofás-tronos ao fundo dos GP's.",
  "Lugar onde você irá esperar por alguma função, caso todas estejam ocupadas.",
  "Se tiver lugar no GP ou um superior sentado, busque assumir o posto.",
  "Dúvidas?",
  "3. Posto de Ausência (PDA).",
  "É o local onde você irá se ausentar, ele fica ao lado do CI.",
  "Basta clicar em usar a “Máquina de Ticket” que você será movido(a) para ele.",
  "Para retornar às atividades, basta clicar normalmente num piso próximo.",
  "Vale destacar que é proibido entrar no Quartel e ir direto para o PDA.",
  "Dúvidas?",

  "4. Funcionamento do Quartel General.",
  "O Quartel General funciona das 10h às 23h em dias da semana e",
  "das 11h às 23h em finais de semana/feriado.",

  "VI - Regras do Exército Brasileiro. (Balão Verde)",
  "1. Nunca pedir pagamentos, promoções ou direitos.",
  "2. Proibido participar de outro Exército/Polícia enquanto alistado do Ex.BR.",
  "3. Não faltar com respeito com ninguém.",
  "4. Proibido dançar, sentar no chão e apresentar placas nas dependências internas do Ex.BR.",
  "5. Proibido manter a visibilidade do perfil e o status online desabilitados enquanto estiver nas salas pertencentes ao Ex.BR.",
  "Dúvidas?",

  "VII - Finalização. (Balão Verde)",
  "Parabéns, você foi aprovado(a) no Treinamento Básico I.",
  "Para encontrar o Exército Brasileiro novamente, basta procurar por Cm-Anonimo",
  "no navegador e ir até o quarto do Exército Brasileiro com a tag FMB.",
  "A entrada no QG deve ser feita através do “Monolito Negro” do lado de fora.",
  "Você deve estar devidamente fardado(a), com a missão correta e,",
  "quando estiver tudo correto, será liberado(a) por um Oficial.",
  
  "Adicionar missão - Não copie. (Balão Verde)",
  "Por favor, preste atenção que irei lhe ajudar nas alterações.",
  "Pressione o dedo em seu avatar, clique no seu nome/nick na lista que apareceu.",
  "Você viu que apareceu a imagem de seu avatar no canto direito da tela e acima da imagem seu nome também.",
  "Entre o nome e a imagem tem um espaço vazio na cor azul, clique nesse espaço e abrirá um campo de texto.",
  "Abrindo o campo de texto digite na sua missão o seguinte:",
  "[Ex.BR] Soldado",
  
];

const patenteMap = {
  "Terceiro Sargento": "Sargento",
  "Segundo Sargento": "Sargento",
  "Primeiro Sargento": "Sargento",
  "Subtenente": "Subtenente",
  "Aluno da EsPCEx": "Aluno",
  "Cadete da AMAN": "Cadete",
};

const TreinoBasicoI = () => {
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

      <Title level={2}>T1</Title>
      <Text type="secondary" style={{ fontSize: "12px" }}>
        Treinamento Básico I
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
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "20px",
        }}
      >
        <Button icon={<ArrowLeftOutlined />} onClick={handlePrevious}>
          Anterior
        </Button>
        <Button icon={<ArrowRightOutlined />} onClick={handleNext}>
          Próximo
        </Button>
        <button ref={copyButtonRef} style={{ display: "none" }}></button>
      </div>
    </Card>
  );
};

export default TreinoBasicoI;
