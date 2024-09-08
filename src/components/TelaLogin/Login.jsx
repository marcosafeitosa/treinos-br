import React, { useState, useEffect } from "react";
// prettier-ignore
import { Card, Form, Input, Button, Radio, Typography, Select, Space, Divider } from 'antd';
// prettier-ignore
import { UserOutlined, LockOutlined, InfoCircleOutlined, CheckCircleOutlined, EditOutlined, SettingOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

const { Title } = Typography;
const { Option } = Select;

const Login = () => {
  const [isSecondCompany, setIsSecondCompany] = useState(false);
  const navigate = useNavigate();
  const COMPANHIA_SENHA_CORRETA = "cpSegunda";

  useEffect(() => {
    const loginData = localStorage.getItem("loginData");
    if (loginData) {
      navigate("/pagina-treinos");
    }
  }, [navigate]);

  const handleFinish = (values) => {
    const formData = { ...values };

    // Verifica e adiciona propriedades ao localStorage com base na patente selecionada
    const patente = formData.patente;
    if (patente) {
      if ([
        "terceiro-sargento",
        "segundo-sargento",
        "primeiro-sargento",
        "subtenente",
        "aluno-espcex",
        "cadete"
      ].includes(patente)) {
        formData.corpoDePracas = "sim";
      } else if ([
        "aspirante",
        "segundo-tenente",
        "primeiro-tenente",
        "capitao",
        "major",
        "tenente-coronel",
        "coronel",
        "gdb",
        "gdd",
        "gde"
      ].includes(patente)) {
        formData.corpoDeOficiais = "sim";
      }
    }

    // Verifica senha da 2ª Companhia, se necessário
    if (isSecondCompany && formData.senhaCompanhia !== COMPANHIA_SENHA_CORRETA) {
      console.log("Senha da 2ª Companhia:", formData.senhaCompanhia);
      return;
    }

    const patenteSelect = document.querySelector(".ant-select-selection-item");
    const patenteText = patenteSelect ? patenteSelect.textContent : "";
    formData.patente = patenteText;

    localStorage.setItem("loginData", JSON.stringify(formData));
    navigate("/pagina-treinos");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f0f2f5",
        padding: "0 16px",
      }}
    >
      <Card
        style={{ maxWidth: 500, width: "100%", margin: "0 auto" }}
        bordered={false}
      >
        <Title level={3} style={{ textAlign: "center", marginBottom: "24px" }}>
          <UserOutlined /> Login
        </Title>
        <Form
          name="loginForm"
          initialValues={{ remember: true }}
          layout="vertical"
          onFinish={handleFinish}
          style={{ maxWidth: 400, margin: "0 auto" }}
        >
          <Form.Item
            name="nick"
            label="Nick"
            rules={[{ required: true, message: "Por favor, insira seu nick!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Digite seu nick" />
          </Form.Item>

          <Form.Item
            name="patente"
            label="Patente"
            rules={[
              { required: true, message: "Por favor, selecione sua patente!" },
            ]}
          >
            <Select placeholder="Selecione sua patente" id="patente">
              <Option value="terceiro-sargento">Terceiro Sargento</Option>
              <Option value="segundo-sargento">Segundo Sargento</Option>
              <Option value="primeiro-sargento">Primeiro Sargento</Option>
              <Option value="subtenente">Subtenente</Option>
              <Option value="aluno-espcex">Aluno da EsPCEx</Option>
              <Option value="cadete">Cadete da AMAN</Option>
              <Option value="aspirante">Aspirante a Oficial</Option>
              <Option value="segundo-tenente">Segundo Tenente</Option>
              <Option value="primeiro-tenente">Primeiro Tenente</Option>
              <Option value="capitao">Capitão</Option>
              <Option value="major">Major</Option>
              <Option value="tenente-coronel">Tenente Coronel</Option>
              <Option value="coronel">Coronel</Option>
              <Option value="gdb">General de Brigada</Option>
              <Option value="gdd">General de Divisão</Option>
              <Option value="gde">General de Exército</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="supervisor"
            label="Supervisor"
            rules={[
              {
                required: true,
                message: "Por favor, selecione se é supervisor!",
              },
            ]}
          >
            <Radio.Group>
              <Space direction="horizontal">
                <Radio value="sim">Sim</Radio>
                <Radio value="nao">Não</Radio>
              </Space>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name="segundaCompanhia"
            label="Você é Oficial da 2ª Companhia?"
            rules={[
              {
                required: true,
                message: "Por favor, selecione se é da 2ª Companhia!",
              },
            ]}
          >
            <Radio.Group
              onChange={(e) => setIsSecondCompany(e.target.value === "sim")}
            >
              <Space direction="horizontal">
                <Radio value="sim">Sim</Radio>
                <Radio value="nao">Não</Radio>
              </Space>
            </Radio.Group>
          </Form.Item>

          {isSecondCompany && (
            <Form.Item
              name="senhaCompanhia"
              label="Senha da 2ª Companhia"
              rules={[
                { required: true, message: "Por favor, insira a senha!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Digite a senha"
              />
            </Form.Item>
          )}

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              <SettingOutlined /> Entrar
            </Button>
          </Form.Item>
        </Form>

        <Divider />

        <Title level={5} style={{ textAlign: "center" }}>
          <InfoCircleOutlined /> Benefícios
        </Title>
        <ul style={{ paddingLeft: 0, listStyleType: "none" }}>
          <li>
            <CheckCircleOutlined style={{ marginRight: 8 }} /> Salve suas
            informações de forma segura e personalizada.
          </li>
          <li>
            <EditOutlined style={{ marginRight: 8 }} /> Edite facilmente seus
            dados conforme necessário.
          </li>
          <li>
            <SettingOutlined style={{ marginRight: 8 }} /> Acesso rápido a
            ferramentas e recursos personalizados.
          </li>
        </ul>
      </Card>
    </div>
  );
};

export default Login;
