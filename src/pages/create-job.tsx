import React from 'react';
import {
  Card,
  Form,
  Input,
  Select,
  Button,
  Typography,
  Row,
  Col,
  InputNumber,
  DatePicker,
  Space,
} from 'antd';
import { SaveOutlined, EyeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useCreateJob } from '../hooks/use-api';
import { JOB_TYPES } from '../constants';
import PageHeader from '../components/ui/page-header';
import type { Job } from '../types';

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const CreateJobPage: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const createJobMutation = useCreateJob();

  const handleSubmit = async (values: any) => {
    try {
      const jobData: Partial<Job> = {
        ...values,
        salary: values.salaryMin && values.salaryMax ? {
          min: values.salaryMin,
          max: values.salaryMax,
          currency: values.currency || 'USD',
        } : undefined,
        requirements: values.requirements?.split('\n').filter((req: string) => req.trim()) || [],
        benefits: values.benefits?.split('\n').filter((benefit: string) => benefit.trim()) || [],
        isActive: true,
        postedAt: new Date().toISOString(),
        expiresAt: values.expiresAt?.toISOString(),
      };

      await createJobMutation.mutateAsync(jobData);
      navigate('/jobs');
    } catch (error) {
      console.error('Failed to create job:', error);
    }
  };

  const handlePreview = () => {
    const values = form.getFieldsValue();
    console.log('Job preview:', values);
    // In a real app, this would open a preview modal
  };

  return (
    <div>
      <PageHeader
        title="Create New Job"
        subtitle="Post a new job opportunity for candidates"
        breadcrumbItems={[
          { title: 'Home', path: '/' },
          { title: 'Jobs', path: '/jobs' },
          { title: 'Create Job' },
        ]}
        extra={
          <Space>
            <Button icon={<EyeOutlined />} onClick={handlePreview}>
              Preview
            </Button>
            <Button 
              type="primary" 
              icon={<SaveOutlined />}
              onClick={() => form.submit()}
              loading={createJobMutation.isPending}
            >
              Publish Job
            </Button>
          </Space>
        }
      />

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            requiredMark={false}
          >
            <Card title="Basic Information" style={{ marginBottom: 24 }}>
              <Row gutter={16}>
                <Col xs={24}>
                  <Form.Item
                    name="title"
                    label="Job Title"
                    rules={[{ required: true, message: 'Please enter job title' }]}
                  >
                    <Input 
                      placeholder="e.g. Senior React Developer"
                      size="large"
                    />
                  </Form.Item>
                </Col>
                
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="company"
                    label="Company Name"
                    rules={[{ required: true, message: 'Please enter company name' }]}
                  >
                    <Input placeholder="e.g. Tech Corp" />
                  </Form.Item>
                </Col>
                
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="location"
                    label="Location"
                    rules={[{ required: true, message: 'Please enter location' }]}
                  >
                    <Input placeholder="e.g. San Francisco, CA" />
                  </Form.Item>
                </Col>
                
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="type"
                    label="Job Type"
                    rules={[{ required: true, message: 'Please select job type' }]}
                  >
                    <Select placeholder="Select job type">
                      {JOB_TYPES.map(type => (
                        <Option key={type.value} value={type.value}>
                          {type.label}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="expiresAt"
                    label="Application Deadline"
                  >
                    <DatePicker 
                      style={{ width: '100%' }}
                      placeholder="Select deadline"
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Card>

            <Card title="Salary Information" style={{ marginBottom: 24 }}>
              <Row gutter={16}>
                <Col xs={24} sm={8}>
                  <Form.Item
                    name="salaryMin"
                    label="Minimum Salary"
                  >
                    <InputNumber
                      style={{ width: '100%' }}
                      placeholder="50000"
                      formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      parser={value => value!.replace(/\$\s?|(,*)/g, '')}
                    />
                  </Form.Item>
                </Col>
                
                <Col xs={24} sm={8}>
                  <Form.Item
                    name="salaryMax"
                    label="Maximum Salary"
                  >
                    <InputNumber
                      style={{ width: '100%' }}
                      placeholder="80000"
                      formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      parser={value => value!.replace(/\$\s?|(,*)/g, '')}
                    />
                  </Form.Item>
                </Col>
                
                <Col xs={24} sm={8}>
                  <Form.Item
                    name="currency"
                    label="Currency"
                    initialValue="USD"
                  >
                    <Select>
                      <Option value="USD">USD</Option>
                      <Option value="EUR">EUR</Option>
                      <Option value="GBP">GBP</Option>
                      <Option value="VND">VND</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </Card>

            <Card title="Job Details" style={{ marginBottom: 24 }}>
              <Form.Item
                name="description"
                label="Job Description"
                rules={[{ required: true, message: 'Please enter job description' }]}
              >
                <TextArea
                  rows={8}
                  placeholder="Describe the role, responsibilities, and what you're looking for in a candidate..."
                />
              </Form.Item>
              
              <Form.Item
                name="requirements"
                label="Requirements"
                tooltip="Enter each requirement on a new line"
              >
                <TextArea
                  rows={6}
                  placeholder={`5+ years of React experience
Strong knowledge of TypeScript
Experience with state management
Bachelor's degree in Computer Science`}
                />
              </Form.Item>
              
              <Form.Item
                name="benefits"
                label="Benefits & Perks"
                tooltip="Enter each benefit on a new line"
              >
                <TextArea
                  rows={6}
                  placeholder={`Health insurance
Remote work flexibility
401(k) matching
Unlimited PTO`}
                />
              </Form.Item>
            </Card>
          </Form>
        </Col>

        <Col xs={24} lg={8}>
          <Card title="Publishing Tips">
            <Space direction="vertical" style={{ width: '100%' }}>
              <div>
                <Title level={5}>Write a Clear Title</Title>
                <p style={{ color: 'rgba(0, 0, 0, 0.65)', margin: 0 }}>
                  Use specific job titles that candidates search for. Include seniority level and key technologies.
                </p>
              </div>
              
              <div>
                <Title level={5}>Detailed Description</Title>
                <p style={{ color: 'rgba(0, 0, 0, 0.65)', margin: 0 }}>
                  Provide a comprehensive overview of the role, team, and company culture.
                </p>
              </div>
              
              <div>
                <Title level={5}>Competitive Salary</Title>
                <p style={{ color: 'rgba(0, 0, 0, 0.65)', margin: 0 }}>
                  Include salary ranges to attract qualified candidates and save time.
                </p>
              </div>
            </Space>
          </Card>

          <Card title="Preview" style={{ marginTop: 16 }}>
            <p style={{ color: 'rgba(0, 0, 0, 0.65)' }}>
              Click the Preview button to see how your job posting will appear to candidates.
            </p>
            <Button type="link" onClick={handlePreview} style={{ padding: 0 }}>
              Preview Job Posting →
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CreateJobPage;
