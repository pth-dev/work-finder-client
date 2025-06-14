import React from 'react';
import { Row, Col, Card, Statistic, Typography, Table, Tag, Progress } from 'antd';
import {
  UserOutlined,
  BankOutlined,
  FileTextOutlined,
  TrophyOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from '@ant-design/icons';
import { useJobs } from '../hooks/use-api';
import { ContentLoading } from '../components/ui/loading';

const { Title } = Typography;

const Dashboard: React.FC = () => {
  const { data: jobs, isLoading } = useJobs({ limit: 5 });

  // Mock data for demonstration
  const stats = [
    {
      title: 'Total Jobs',
      value: 1234,
      prefix: <BankOutlined />,
      suffix: '',
      precision: 0,
      valueStyle: { color: '#3f8600' },
      trend: { value: 11.28, isPositive: true },
    },
    {
      title: 'Active Applications',
      value: 567,
      prefix: <FileTextOutlined />,
      suffix: '',
      precision: 0,
      valueStyle: { color: '#1890ff' },
      trend: { value: 5.67, isPositive: true },
    },
    {
      title: 'Total Users',
      value: 8901,
      prefix: <UserOutlined />,
      suffix: '',
      precision: 0,
      valueStyle: { color: '#722ed1' },
      trend: { value: 2.34, isPositive: false },
    },
    {
      title: 'Success Rate',
      value: 78.5,
      prefix: <TrophyOutlined />,
      suffix: '%',
      precision: 1,
      valueStyle: { color: '#cf1322' },
      trend: { value: 3.21, isPositive: true },
    },
  ];

  const recentJobsColumns = [
    {
      title: 'Job Title',
      dataIndex: 'title',
      key: 'title',
      render: (text: string) => <strong>{text}</strong>,
    },
    {
      title: 'Company',
      dataIndex: 'company',
      key: 'company',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => {
        const colors = {
          'full-time': 'blue',
          'part-time': 'green',
          'contract': 'orange',
          'remote': 'purple',
        };
        return <Tag color={colors[type as keyof typeof colors]}>{type}</Tag>;
      },
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Posted',
      dataIndex: 'postedAt',
      key: 'postedAt',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
  ];

  // Mock recent jobs data
  const recentJobs = [
    {
      key: '1',
      title: 'Senior React Developer',
      company: 'Tech Corp',
      type: 'full-time',
      location: 'San Francisco, CA',
      postedAt: '2024-01-15',
    },
    {
      key: '2',
      title: 'UX Designer',
      company: 'Design Studio',
      type: 'contract',
      location: 'New York, NY',
      postedAt: '2024-01-14',
    },
    {
      key: '3',
      title: 'Backend Engineer',
      company: 'StartupXYZ',
      type: 'remote',
      location: 'Remote',
      postedAt: '2024-01-13',
    },
  ];

  if (isLoading) {
    return <ContentLoading tip="Loading dashboard..." />;
  }

  return (
    <div>
      <Title level={2} style={{ marginBottom: 24 }}>
        Dashboard
      </Title>

      {/* Statistics Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {stats.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card>
              <Statistic
                title={stat.title}
                value={stat.value}
                precision={stat.precision}
                valueStyle={stat.valueStyle}
                prefix={stat.prefix}
                suffix={
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    {stat.suffix}
                    <span style={{ fontSize: 12, marginLeft: 8 }}>
                      {stat.trend.isPositive ? (
                        <ArrowUpOutlined style={{ color: '#3f8600' }} />
                      ) : (
                        <ArrowDownOutlined style={{ color: '#cf1322' }} />
                      )}
                      <span
                        style={{
                          color: stat.trend.isPositive ? '#3f8600' : '#cf1322',
                          marginLeft: 4,
                        }}
                      >
                        {stat.trend.value}%
                      </span>
                    </span>
                  </div>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]}>
        {/* Recent Jobs */}
        <Col xs={24} lg={16}>
          <Card title="Recent Jobs" extra={<a href="/jobs">View All</a>}>
            <Table
              columns={recentJobsColumns}
              dataSource={recentJobs}
              pagination={false}
              size="small"
            />
          </Card>
        </Col>

        {/* Quick Stats */}
        <Col xs={24} lg={8}>
          <Card title="Quick Stats" style={{ marginBottom: 16 }}>
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span>Job Completion Rate</span>
                <span>85%</span>
              </div>
              <Progress percent={85} strokeColor="#52c41a" />
            </div>
            
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span>User Satisfaction</span>
                <span>92%</span>
              </div>
              <Progress percent={92} strokeColor="#1890ff" />
            </div>
            
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span>System Performance</span>
                <span>78%</span>
              </div>
              <Progress percent={78} strokeColor="#faad14" />
            </div>
          </Card>

          <Card title="Activity Summary">
            <div style={{ textAlign: 'center' }}>
              <Statistic
                title="This Month"
                value={156}
                suffix="/ 200"
                valueStyle={{ color: '#3f8600' }}
              />
              <Progress
                type="circle"
                percent={78}
                width={80}
                strokeColor="#52c41a"
                style={{ marginTop: 16 }}
              />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
