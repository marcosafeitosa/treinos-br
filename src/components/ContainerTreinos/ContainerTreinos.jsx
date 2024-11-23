import React from "react";
import { Row, Col, Typography, Card } from "antd";
import { useNavigate } from "react-router-dom"; // Importa o hook useNavigate para navegação

const { Title, Text } = Typography;

const ContainerTreinos = () => {
  const navigate = useNavigate(); // Hook para navegação

  // Recupera e converte os dados do localStorage
  const loginDataString = localStorage.getItem("loginData");
  let isSegundaCompanhia = false;

  if (loginDataString) {
    const convertObject = JSON.parse(loginDataString);
    isSegundaCompanhia = convertObject.supervisor === "sim";
  }

  // Função para lidar com a navegação ao clicar no card
  const handleNavigate = (path) => {
    navigate(path); // Navega para o componente especificado
  };

  return (
    <div style={{ padding: "20px" }}>
      <Row gutter={[16, 16]}>
        {/* Bloco Treino Básico I */}
        <Col xs={24} sm={12} md={12} lg={6}>
          <Card
            bordered={false}
            style={{
              width: "100%",
              height: "100%",
              textAlign: "center",
              cursor: "pointer",
            }}
            onClick={() => handleNavigate("/treino-basico-i")}
          >
            <Title level={1}>T1</Title>
            <Text type="secondary" style={{ fontSize: "12px" }}>
              Treinamento Básico I
            </Text>
          </Card>
        </Col>

        {/* Bloco Treino Básico II */}
        <Col xs={24} sm={12} md={12} lg={6}>
          <Card
            bordered={false}
            style={{
              width: "100%",
              height: "100%",
              textAlign: "center",
              cursor: "pointer",
            }}
            onClick={() => handleNavigate("/treino-basico-ii")}
          >
            <Title level={1}>T2</Title>
            <Text type="secondary" style={{ fontSize: "12px" }}>
              Treinamento Básico II
            </Text>
          </Card>
        </Col>

        {/* Bloco Treino Complementar I */}
        <Col xs={24} sm={12} md={12} lg={6}>
          <Card
            bordered={false}
            style={{
              width: "100%",
              height: "100%",
              textAlign: "center",
              cursor: "pointer",
            }}
            onClick={() => handleNavigate("/treino-comp-i")}
          >
            <Title level={1}>T3</Title>
            <Text type="secondary" style={{ fontSize: "12px" }}>
              Treinamento Complementar I
            </Text>
          </Card>
        </Col>

        {/* Bloco Treino Complementar II */}
        <Col xs={24} sm={12} md={12} lg={6}>
          <Card
            bordered={false}
            style={{
              width: "100%",
              height: "100%",
              textAlign: "center",
              cursor: "pointer",
            }}
            onClick={() => handleNavigate("/treino-comp-ii")}
          >
            <Title level={1}>T4</Title>
            <Text type="secondary" style={{ fontSize: "12px" }}>
              Treinamento Complementar II
            </Text>
          </Card>
        </Col>

        {/* Bloco Módulo Ortográfico (MO) condicional */}
        {isSegundaCompanhia && (
          <>
            <Col xs={24} sm={12} md={12} lg={6}>
              <Card
                bordered={false}
                style={{
                  width: "100%",
                  height: "100%",
                  textAlign: "center",
                  cursor: "pointer",
                }}
                onClick={() => handleNavigate("/programa-instrucao-soldado")}
              >
                <Title level={1}>PIS</Title>
                <Text type="secondary" style={{ fontSize: "12px" }}>
                  Programa de Instrução ao Soldado
                </Text>
              </Card>
            </Col>

            <Col xs={24} sm={12} md={12} lg={6}>
              <Card
                bordered={false}
                style={{
                  width: "100%",
                  height: "100%",
                  textAlign: "center",
                  cursor: "pointer",
                }}
                onClick={() => handleNavigate("/modulo-ortografico")}
              >
                <Title level={1}>MO</Title>
                <Text type="secondary" style={{ fontSize: "12px" }}>
                  Módulo Ortográfico
                </Text>
              </Card>
            </Col>

            <Col xs={24} sm={12} md={12} lg={6}>
              <Card
                bordered={false}
                style={{
                  width: "100%",
                  height: "100%",
                  textAlign: "center",
                  cursor: "pointer",
                }}
                onClick={() => handleNavigate("/programa-instrucao-pracas")}
              >
                <Title level={1}>PIP</Title>
                <Text type="secondary" style={{ fontSize: "12px" }}>
                  Programa de Instrução aos Praças
                </Text>
              </Card>
            </Col>

            <Col xs={24} sm={12} md={12} lg={6}>
              <Card
                bordered={false}
                style={{
                  width: "100%",
                  height: "100%",
                  textAlign: "center",
                  cursor: "pointer",
                }}
                onClick={() => handleNavigate("/modulo-extra-militar")}
              >
                <Title level={1}>MEM</Title>
                <Text type="secondary" style={{ fontSize: "12px" }}>
                  Módulo Extra Militar
                </Text>
              </Card>
            </Col>

            <Col xs={24} sm={12} md={12} lg={6}>
              <Card
                bordered={false}
                style={{
                  width: "100%",
                  height: "100%",
                  textAlign: "center",
                  cursor: "pointer",
                }}
                onClick={() => handleNavigate("/seguranca-virtual")}
              >
                <Title level={1}>SV</Title>
                <Text type="secondary" style={{ fontSize: "12px" }}>
                  Segurança Virtual
                </Text>
              </Card>
            </Col>

            <Col xs={24} sm={12} md={12} lg={6}>
              <Card
                bordered={false}
                style={{
                  width: "100%",
                  height: "100%",
                  textAlign: "center",
                  cursor: "pointer",
                }}
                onClick={() => handleNavigate("/modulo-comportamento-postura")}
              >
                <Title level={1}>MCP</Title>
                <Text type="secondary" style={{ fontSize: "12px" }}>
                  Módulo de Comportamento e Postura
                </Text>
              </Card>
            </Col>

            <Col xs={24} sm={12} md={12} lg={6}>
              <Card
                bordered={false}
                style={{
                  width: "100%",
                  height: "100%",
                  textAlign: "center",
                  cursor: "pointer",
                }}
                onClick={() => handleNavigate("/edital-militar-i")}
              >
                <Title level={1}>EMI</Title>
                <Text type="secondary" style={{ fontSize: "12px" }}>
                  Edital Militar I
                </Text>
              </Card>
            </Col>

            <Col xs={24} sm={12} md={12} lg={6}>
              <Card
                bordered={false}
                style={{
                  width: "100%",
                  height: "100%",
                  textAlign: "center",
                  cursor: "pointer",
                }}
                onClick={() => handleNavigate("/edital-militar-ii")}
              >
                <Title level={1}>EMII</Title>
                <Text type="secondary" style={{ fontSize: "12px" }}>
                  Edital Militar II
                </Text>
              </Card>
            </Col>

            <Col xs={24} sm={12} md={12} lg={6}>
              <Card
                bordered={false}
                style={{
                  width: "100%",
                  height: "100%",
                  textAlign: "center",
                  cursor: "pointer",
                }}
                onClick={() => handleNavigate("/modulo-fidelizacao-pracas")}
              >
                <Title level={1}>MFP</Title>
                <Text type="secondary" style={{ fontSize: "12px" }}>
                  Módulo de Fidelização dos Praças
                </Text>
              </Card>
            </Col>
          </>
        )}
      </Row>
    </div>
  );
};

export default ContainerTreinos;
