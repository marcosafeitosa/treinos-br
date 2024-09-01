import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, Radio, Typography, Select, Space, Card } from 'antd';
import { UserOutlined, LockOutlined, EditOutlined, SettingOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;
const { Option } = Select;

const EditModal = ({ open, onCancel, onSave }) => {
  const [isSecondCompany, setIsSecondCompany] = useState(false);
  const [form] = Form.useForm(); // Instância de formulário do Ant Design
  const navigate = useNavigate(); // Hook de navegação para redirecionamento

  // Desabilitar o scroll de fundo quando o modal estiver aberto
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [open]);

  useEffect(() => {
    // Pegar dados salvos e inicializar o formulário
    const savedData = JSON.parse(localStorage.getItem('loginData'));
    if (savedData) {
      form.setFieldsValue(savedData);
      setIsSecondCompany(savedData.segundaCompanhia === 'sim');
    }
  }, [form, open]);

  // Função para verificar se o formulário foi editado
  const isFormEdited = (currentValues) => {
    const savedData = JSON.parse(localStorage.getItem('loginData'));
    return JSON.stringify(currentValues) !== JSON.stringify(savedData);
  };

  const handleFinish = (values) => {
    const formData = { ...values };

    // Capturar o texto do conteúdo do option selecionado no Select
    const patenteSelect = document.querySelector('.ant-select-selection-item');
    const patenteText = patenteSelect ? patenteSelect.textContent : '';
    formData.patente = patenteText;

    // Verificar se o usuário escolheu "Demitido"
    if (formData.patente === 'Demitido') {
      localStorage.removeItem('loginData'); // Limpar o local storage
      navigate('/'); // Redirecionar para a tela de login
      if (typeof onCancel === 'function') {
        onCancel(); // Fechar o modal
      }
      return;
    }

    // Atualizar dados no local storage
    localStorage.setItem('loginData', JSON.stringify(formData));

    // Chamar a função de callback para salvar as informações editadas
    if (typeof onSave === 'function') {
      onSave(formData);
    }
    if (typeof onCancel === 'function') {
      onCancel(); // Fechar o modal após salvar
    }
  };

  const handleCancel = () => {
    const currentValues = form.getFieldsValue();
    if (!isFormEdited(currentValues)) {
      if (typeof onCancel === 'function') {
        onCancel(); // Fechar o modal se o formulário não foi editado
      }
    }
  };

  // Definir as patentes disponíveis com base na patente atual
  const getAvailablePatentes = () => {
    const savedData = JSON.parse(localStorage.getItem('loginData'));
    if (!savedData) return []; // Retorna um array vazio se não houver dados salvos

    const patenteAtual = savedData.patente; // Pega a patente atual do local storage
    const patentes = [
      { value: 'terceiro-sargento', label: 'Terceiro Sargento' },
      { value: 'segundo-sargento', label: 'Segundo Sargento' },
      { value: 'primeiro-sargento', label: 'Primeiro Sargento' },
      { value: 'subtenente', label: 'Subtenente' },
      { value: 'aluno-espcex', label: 'Aluno da EsPCEx' },
      { value: 'cadete', label: 'Cadete da AMAN' },
      { value: 'aspirante', label: 'Aspirante a Oficial' },
      { value: 'segundo-tenente', label: 'Segundo Tenente' },
      { value: 'primeiro-tenente', label: 'Primeiro Tenente' },
      { value: 'capitao', label: 'Capitão' },
      { value: 'major', label: 'Major' },
      { value: 'tenente-coronel', label: 'Tenente Coronel' },
      { value: 'coronel', label: 'Coronel' },
      { value: 'gdb', label: 'General de Brigada' },
      { value: 'gdd', label: 'General de Divisão' },
      { value: 'gde', label: 'General de Exército' },
      { value: 'demitido', label: 'Demitido' },
    ];

    // Encontrar o índice da patente atual e retornar apenas as patentes acima dela
    const indexAtual = patentes.findIndex(p => p.label === patenteAtual);
    if (indexAtual !== -1) {
      return patentes.slice(indexAtual); // Retorna apenas as patentes iguais ou superiores
    }

    return patentes; // Retorna todas as patentes se não houver correspondência (fallback)
  };

  return (
    <Modal
      title={<Title level={3}><EditOutlined /> Editar Informações</Title>}
      open={open} // Alterar para open
      onCancel={handleCancel}
      footer={null}
      destroyOnClose={true}  // Destruir o modal ao fechar para evitar bugs de formulário
      width={600}  // Ajuste o tamanho do modal para ser mais largo
    >
      <Card bordered={false} style={{ margin: '0 auto' }}>
        <Form
          form={form} // Associar o formulário com a instância de formulário Ant Design
          name="editForm"
          initialValues={{ remember: true }}
          layout="vertical"
          onFinish={handleFinish}
        >
          <Form.Item
            name="nick"
            label="Nick"
            rules={[{ required: true, message: 'Por favor, insira seu nick!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Digite seu nick" />
          </Form.Item>

          <Form.Item
            name="patente"
            label="Patente"
            rules={[{ required: true, message: 'Por favor, selecione sua patente!' }]}
          >
            <Select placeholder="Selecione sua patente" id="patente" allowClear>
              {getAvailablePatentes().map((patente) => (
                <Option key={patente.value} value={patente.value}>
                  {patente.label}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="supervisor"
            label="Supervisor"
            rules={[{ required: true, message: 'Por favor, selecione se é supervisor!' }]}
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
            rules={[{ required: true, message: 'Por favor, selecione se é da 2ª Companhia!' }]}
          >
            <Radio.Group onChange={(e) => setIsSecondCompany(e.target.value === 'sim')}>
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
              rules={[{ required: true, message: 'Por favor, insira a senha!' }]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Digite a senha" />
            </Form.Item>
          )}

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              <SettingOutlined /> Salvar
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Modal>
  );
};

export default EditModal;
