import React from "react";
import { Card, Typography, Space, Button, Switch, Row, Col } from "antd";
import {
  SettingOutlined,
  BellOutlined,
  SecurityScanOutlined,
} from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

const SettingsPage: React.FC = () => {
  return (
    <div>
      <Title level={2} style={{ marginBottom: 24 }}>
        Settings
      </Title>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <Card title="Notifications" extra={<BellOutlined />}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text>Email Notifications</Text>
                <Switch defaultChecked />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text>Push Notifications</Text>
                <Switch />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text>SMS Notifications</Text>
                <Switch />
              </div>
            </Space>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title="Security" extra={<SecurityScanOutlined />}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text>Two-Factor Authentication</Text>
                <Switch />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text>Login Alerts</Text>
                <Switch defaultChecked />
              </div>
              <Button type="primary" style={{ marginTop: 16 }}>
                Change Password
              </Button>
            </Space>
          </Card>
        </Col>

        <Col xs={24}>
          <Card title="Application Settings" extra={<SettingOutlined />}>
            <div style={{ textAlign: "center", padding: "40px 20px" }}>
              <Title level={4}>Settings Management</Title>
              <Paragraph>
                This section is ready for you to implement application settings.
                Add preferences, themes, language settings, and other
                configuration options.
              </Paragraph>
              <Space>
                <Button type="primary">Theme Settings</Button>
                <Button>Language</Button>
                <Button>Preferences</Button>
              </Space>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SettingsPage;
