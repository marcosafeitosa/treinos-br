import React, { useState } from "react";
import { Button, Typography, Layout, Row, Col, Card, Avatar } from "antd";
import { useNavigate } from "react-router-dom";
import { LogoutOutlined, UserOutlined, EditOutlined } from "@ant-design/icons";
import EditModal from "../EditModal/EditModal";

const { Content } = Layout;
const { Title, Text } = Typography;

const PaginaTreinos = () => {
  const navigate = useNavigate();
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentField, setCurrentField] = useState("");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleEditClick = (field) => {
    setCurrentField(field);
    setEditModalVisible(true);
  };

  const handleSave = (values) => {
    const loginData = JSON.parse(localStorage.getItem("loginData")) || {};
    Object.assign(loginData, values);
    localStorage.setItem("loginData", JSON.stringify(loginData));
    // window.location.reload(); // Recarrega a página para exibir as informações atualizadas
  };

  const loginData = JSON.parse(localStorage.getItem("loginData")) || {};

  const formatSecondCompany = (value) => {
    if (value === "sim") return "Sim";
    if (value === "nao") return "Não";
    return "Não definido";
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={{ padding: "0px", display: "flex", justifyContent: "center" }}>
        <Card style={{ width: "100%", maxWidth: "600px", height: "max-content", padding: "1px" }}>
          <Row align="middle" gutter={16}>
            <Col>
              <Avatar size={54} icon={<UserOutlined />} />
            </Col>
            <Col flex="auto">
              <Typography>
                <Row style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                  <Title level={4} style={{ marginBottom: 0 }}>
                    {loginData.nick || "Usuário"}
                  </Title>
                  <Button type="primary" icon={<LogoutOutlined />} onClick={handleLogout}>
                    Sair
                  </Button>
                </Row>
                <div style={{ marginTop: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <Text strong style={{ marginRight: "5px" }}>Patente:</Text>
                    {loginData.patente || "Não definido"}
                  </div>
                  <Button type="link" icon={<EditOutlined />} onClick={() => handleEditClick("patente")} style={{ marginLeft: "8px" }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <Text strong>Supervisor:</Text> {loginData.supervisor ? "Sim" : "Não"}
                  </div>
                  <Button type="link" icon={<EditOutlined />} onClick={() => handleEditClick("supervisor")} style={{ marginLeft: "8px" }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <Text strong>Segunda Companhia:</Text> {formatSecondCompany(loginData.segundaCompanhia)}
                  </div>
                  <Button type="link" icon={<EditOutlined />} onClick={() => handleEditClick("segundaCompanhia")} style={{ marginLeft: "8px" }} />
                </div>
              </Typography>
            </Col>
          </Row>
        </Card>
      </Content>

      {/* Modal para editar informações */}
      <EditModal
        open={editModalVisible}
        onCancel={() => setEditModalVisible(false)} // Corrigido de onClose para onCancel
        onSave={handleSave}
      />
    </Layout>
  );
};

export default PaginaTreinos;
