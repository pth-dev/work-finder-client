import React from "react";
import { Card, Typography, Space, Button } from "antd";
import {
  PlusOutlined,
  BarChartOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const Dashboard: React.FC = () => {
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Title level={2}>Dashboard</Title>
        <Paragraph>
          Welcome to your Work Finder dashboard. This is your main control
          center.
        </Paragraph>
      </div>

      {/* Quick Actions */}
      <Card title="Quick Actions" style={{ marginBottom: 24 }}>
        <Space wrap>
          <Button type="primary" icon={<PlusOutlined />}>
            Create New Item
          </Button>
          <Button icon={<BarChartOutlined />}>View Analytics</Button>
          <Button icon={<UserOutlined />}>Manage Users</Button>
        </Space>
      </Card>

      {/* Placeholder Content */}
      <Card title="Overview">
        <div style={{ textAlign: "center", padding: "40px 20px" }}>
          <Title level={4}>Ready for Development</Title>
          <Paragraph>
            This dashboard is ready for you to implement your specific features.
            Add statistics, charts, recent activities, and other relevant
            content here.
          </Paragraph>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
