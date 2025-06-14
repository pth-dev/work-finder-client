import React from 'react';
import {
  Card,
  Form,
  Switch,
  Select,
  Button,
  Typography,
  Row,
  Col,
  Divider,
  Space,
  message,
} from 'antd';
import {
  BellOutlined,
  GlobalOutlined,
  EyeOutlined,
  SecurityScanOutlined,
} from '@ant-design/icons';
import { useAppStore } from '../stores/app-store';
import PageHeader from '../components/ui/page-header';

const { Title, Text } = Typography;
const { Option } = Select;

const SettingsPage: React.FC = () => {
  const [form] = Form.useForm();
  const { theme, setTheme, addNotification } = useAppStore();

  const handleSave = (values: any) => {
    console.log('Settings saved:', values);
    
    // Update theme if changed
    if (values.theme !== theme) {
      setTheme(values.theme);
    }
    
    addNotification({
      type: 'success',
      title: 'Settings Saved',
      message: 'Your preferences have been updated successfully.',
    });
  };

  const initialValues = {
    theme: theme,
    language: 'en',
    emailNotifications: true,
    pushNotifications: false,
    marketingEmails: false,
    twoFactorAuth: false,
    autoSave: true,
    compactMode: false,
  };

  return (
    <div>
      <PageHeader
        title="Settings"
        subtitle="Manage your account preferences and application settings"
      />

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSave}
            initialValues={initialValues}
          >
            {/* Appearance Settings */}
            <Card 
              title={
                <Space>
                  <EyeOutlined />
                  <span>Appearance</span>
                </Space>
              }
              style={{ marginBottom: 24 }}
            >
              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="theme"
                    label="Theme"
                    tooltip="Choose your preferred color scheme"
                  >
                    <Select>
                      <Option value="light">Light</Option>
                      <Option value="dark">Dark</Option>
                      <Option value="auto">Auto (System)</Option>
                    </Select>
                  </Form.Item>
                </Col>
                
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="language"
                    label="Language"
                    tooltip="Select your preferred language"
                  >
                    <Select>
                      <Option value="en">English</Option>
                      <Option value="vi">Tiếng Việt</Option>
                      <Option value="es">Español</Option>
                      <Option value="fr">Français</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              
              <Form.Item
                name="compactMode"
                valuePropName="checked"
                tooltip="Enable compact mode for denser information display"
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <Text strong>Compact Mode</Text>
                    <br />
                    <Text type="secondary">Show more content in less space</Text>
                  </div>
                  <Switch />
                </div>
              </Form.Item>
            </Card>

            {/* Notification Settings */}
            <Card 
              title={
                <Space>
                  <BellOutlined />
                  <span>Notifications</span>
                </Space>
              }
              style={{ marginBottom: 24 }}
            >
              <Form.Item
                name="emailNotifications"
                valuePropName="checked"
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <Text strong>Email Notifications</Text>
                    <br />
                    <Text type="secondary">Receive important updates via email</Text>
                  </div>
                  <Switch />
                </div>
              </Form.Item>
              
              <Divider style={{ margin: '16px 0' }} />
              
              <Form.Item
                name="pushNotifications"
                valuePropName="checked"
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <Text strong>Push Notifications</Text>
                    <br />
                    <Text type="secondary">Get instant notifications in your browser</Text>
                  </div>
                  <Switch />
                </div>
              </Form.Item>
              
              <Divider style={{ margin: '16px 0' }} />
              
              <Form.Item
                name="marketingEmails"
                valuePropName="checked"
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <Text strong>Marketing Emails</Text>
                    <br />
                    <Text type="secondary">Receive newsletters and promotional content</Text>
                  </div>
                  <Switch />
                </div>
              </Form.Item>
            </Card>

            {/* Security Settings */}
            <Card 
              title={
                <Space>
                  <SecurityScanOutlined />
                  <span>Security</span>
                </Space>
              }
              style={{ marginBottom: 24 }}
            >
              <Form.Item
                name="twoFactorAuth"
                valuePropName="checked"
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <Text strong>Two-Factor Authentication</Text>
                    <br />
                    <Text type="secondary">Add an extra layer of security to your account</Text>
                  </div>
                  <Switch />
                </div>
              </Form.Item>
              
              <Divider style={{ margin: '16px 0' }} />
              
              <Form.Item
                name="autoSave"
                valuePropName="checked"
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <Text strong>Auto-save</Text>
                    <br />
                    <Text type="secondary">Automatically save your work as you type</Text>
                  </div>
                  <Switch />
                </div>
              </Form.Item>
            </Card>

            {/* Save Button */}
            <Card>
              <div style={{ textAlign: 'right' }}>
                <Space>
                  <Button onClick={() => form.resetFields()}>
                    Reset to Defaults
                  </Button>
                  <Button type="primary" htmlType="submit">
                    Save Settings
                  </Button>
                </Space>
              </div>
            </Card>
          </Form>
        </Col>

        {/* Sidebar with additional info */}
        <Col xs={24} lg={8}>
          <Card title="Need Help?">
            <Space direction="vertical" style={{ width: '100%' }}>
              <div>
                <Text strong>Contact Support</Text>
                <br />
                <Text type="secondary">
                  Have questions about your settings? Our support team is here to help.
                </Text>
              </div>
              
              <Button type="link" style={{ padding: 0 }}>
                Contact Support →
              </Button>
            </Space>
          </Card>

          <Card title="Privacy" style={{ marginTop: 16 }}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <div>
                <Text strong>Data & Privacy</Text>
                <br />
                <Text type="secondary">
                  Learn how we protect your data and manage your privacy settings.
                </Text>
              </div>
              
              <Button type="link" style={{ padding: 0 }}>
                Privacy Policy →
              </Button>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SettingsPage;
