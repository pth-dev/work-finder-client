import React from "react";
import { Card, Typography, Space, Button, Avatar, Row, Col } from "antd";
import { UserOutlined, EditOutlined } from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

const ProfilePage: React.FC = () => {
  return (
    <div>
      <Title level={2} style={{ marginBottom: 24 }}>
        Profile
      </Title>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={8}>
          <Card>
            <div style={{ textAlign: "center" }}>
              <Avatar
                size={120}
                icon={<UserOutlined />}
                style={{ marginBottom: 16 }}
              />
              <Title level={4}>John Doe</Title>
              <Text type="secondary">john.doe@example.com</Text>
              <div style={{ marginTop: 16 }}>
                <Button type="primary" icon={<EditOutlined />}>
                  Edit Profile
                </Button>
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={16}>
          <Card title="Profile Information">
            <div style={{ textAlign: "center", padding: "40px 20px" }}>
              <Title level={4}>Profile Management</Title>
              <Paragraph>
                This section is ready for you to implement profile management
                features. Add forms for editing user information, uploading
                avatars, and managing account settings.
              </Paragraph>
              <Space>
                <Button type="primary">Edit Information</Button>
                <Button>Change Password</Button>
                <Button>Upload Avatar</Button>
              </Space>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProfilePage;
