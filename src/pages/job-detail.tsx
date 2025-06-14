import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Card,
  Typography,
  Tag,
  Button,
  Space,
  Divider,
  Row,
  Col,
  List,
  Avatar,
  Descriptions,
} from 'antd';
import {
  EnvironmentOutlined,
  CalendarOutlined,
  DollarOutlined,
  TeamOutlined,
  HeartOutlined,
  ShareAltOutlined,
} from '@ant-design/icons';
import { useJob, useApplyToJob } from '../hooks/use-api';
import { ContentLoading } from '../components/ui/loading';
import { formatCurrency, formatRelativeTime } from '../utils';

const { Title, Paragraph, Text } = Typography;

const JobDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: job, isLoading, error } = useJob(id!);
  const applyMutation = useApplyToJob();

  const handleApply = () => {
    if (!job) return;
    
    applyMutation.mutate({
      id: job.id,
      data: {
        coverLetter: 'I am interested in this position...',
        resume: 'resume.pdf',
      },
    });
  };

  if (isLoading) {
    return <ContentLoading tip="Loading job details..." />;
  }

  if (error || !job) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Title level={3}>Job not found</Title>
        <Text type="secondary">The job you're looking for doesn't exist or has been removed.</Text>
      </div>
    );
  }

  // Mock job data for demonstration
  const mockJob = {
    id: '1',
    title: 'Senior React Developer',
    company: 'Tech Corp',
    location: 'San Francisco, CA',
    type: 'full-time' as const,
    salary: { min: 120000, max: 180000, currency: 'USD' },
    description: `We are looking for a Senior React Developer to join our dynamic team. You will be responsible for developing and maintaining web applications using React, TypeScript, and modern frontend technologies.

Key Responsibilities:
• Develop high-quality, reusable React components
• Collaborate with designers and backend developers
• Optimize applications for maximum speed and scalability
• Participate in code reviews and technical discussions
• Mentor junior developers

What We Offer:
• Competitive salary and equity package
• Comprehensive health, dental, and vision insurance
• Flexible work arrangements and remote work options
• Professional development opportunities
• Modern office with state-of-the-art equipment`,
    requirements: [
      '5+ years of experience with React and JavaScript',
      'Strong knowledge of TypeScript',
      'Experience with state management (Redux, Zustand)',
      'Familiarity with modern build tools (Webpack, Vite)',
      'Understanding of RESTful APIs and GraphQL',
      'Experience with testing frameworks (Jest, React Testing Library)',
      'Knowledge of CSS-in-JS libraries',
      'Bachelor\'s degree in Computer Science or related field',
    ],
    benefits: [
      'Health, dental, and vision insurance',
      'Remote work flexibility',
      '401(k) with company matching',
      'Unlimited PTO',
      'Learning and development budget',
      'Stock options',
      'Free meals and snacks',
      'Gym membership reimbursement',
    ],
    postedAt: '2024-01-15T00:00:00Z',
    expiresAt: '2024-02-15T00:00:00Z',
    isActive: true,
  };

  const displayJob = job || mockJob;

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      <Row gutter={[24, 24]}>
        {/* Main Content */}
        <Col xs={24} lg={16}>
          <Card>
            {/* Header */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <div style={{ flex: 1 }}>
                  <Title level={2} style={{ marginBottom: 8 }}>
                    {displayJob.title}
                  </Title>
                  <Title level={4} style={{ color: '#1890ff', marginBottom: 16 }}>
                    {displayJob.company}
                  </Title>
                </div>
                <Avatar size={64} style={{ backgroundColor: '#1890ff' }}>
                  {displayJob.company.charAt(0)}
                </Avatar>
              </div>

              <Space size="large" wrap>
                <Space>
                  <EnvironmentOutlined />
                  <Text>{displayJob.location}</Text>
                </Space>
                <Space>
                  <CalendarOutlined />
                  <Text>{formatRelativeTime(displayJob.postedAt)}</Text>
                </Space>
                <Space>
                  <DollarOutlined />
                  <Text>
                    {displayJob.salary ? 
                      `${formatCurrency(displayJob.salary.min)} - ${formatCurrency(displayJob.salary.max)}` 
                      : 'Salary not specified'
                    }
                  </Text>
                </Space>
              </Space>

              <div style={{ marginTop: 16 }}>
                <Tag color="blue" style={{ textTransform: 'capitalize' }}>
                  {displayJob.type.replace('-', ' ')}
                </Tag>
                <Tag color="green">Active</Tag>
              </div>
            </div>

            <Divider />

            {/* Job Description */}
            <div style={{ marginBottom: 32 }}>
              <Title level={4}>Job Description</Title>
              <Paragraph style={{ whiteSpace: 'pre-line', fontSize: 16, lineHeight: 1.6 }}>
                {displayJob.description}
              </Paragraph>
            </div>

            {/* Requirements */}
            <div style={{ marginBottom: 32 }}>
              <Title level={4}>Requirements</Title>
              <List
                dataSource={displayJob.requirements}
                renderItem={(item) => (
                  <List.Item>
                    <Text>• {item}</Text>
                  </List.Item>
                )}
              />
            </div>

            {/* Benefits */}
            <div>
              <Title level={4}>Benefits & Perks</Title>
              <List
                grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 2 }}
                dataSource={displayJob.benefits}
                renderItem={(item) => (
                  <List.Item>
                    <Card size="small" style={{ height: '100%' }}>
                      <Text>✓ {item}</Text>
                    </Card>
                  </List.Item>
                )}
              />
            </div>
          </Card>
        </Col>

        {/* Sidebar */}
        <Col xs={24} lg={8}>
          <Card style={{ marginBottom: 24 }}>
            <Title level={4} style={{ textAlign: 'center', marginBottom: 24 }}>
              Apply for this position
            </Title>
            
            <Space direction="vertical" style={{ width: '100%' }} size="large">
              <Button 
                type="primary" 
                size="large" 
                block
                loading={applyMutation.isPending}
                onClick={handleApply}
              >
                Apply Now
              </Button>
              
              <div style={{ display: 'flex', gap: 8 }}>
                <Button icon={<HeartOutlined />} style={{ flex: 1 }}>
                  Save Job
                </Button>
                <Button icon={<ShareAltOutlined />} style={{ flex: 1 }}>
                  Share
                </Button>
              </div>
            </Space>
          </Card>

          <Card>
            <Title level={5}>Job Information</Title>
            <Descriptions column={1} size="small">
              <Descriptions.Item label="Job Type">
                <Tag color="blue">{displayJob.type.replace('-', ' ')}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Experience Level">
                Senior Level
              </Descriptions.Item>
              <Descriptions.Item label="Industry">
                Technology
              </Descriptions.Item>
              <Descriptions.Item label="Company Size">
                <Space>
                  <TeamOutlined />
                  <Text>100-500 employees</Text>
                </Space>
              </Descriptions.Item>
              <Descriptions.Item label="Posted">
                {formatRelativeTime(displayJob.postedAt)}
              </Descriptions.Item>
              <Descriptions.Item label="Expires">
                {new Date(displayJob.expiresAt).toLocaleDateString()}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default JobDetailPage;
