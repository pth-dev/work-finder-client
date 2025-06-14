import React, { useState } from 'react';
import {
  Card,
  Table,
  Button,
  Space,
  Tag,
  Input,
  Select,
  Row,
  Col,
  Typography,
  Tooltip,
  Modal,
} from 'antd';
import {
  PlusOutlined,
  SearchOutlined,
  FilterOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { useJobs, useDeleteJob } from '../hooks/use-api';
import { useDebounce } from '../hooks';
import { ContentLoading } from '../components/ui/loading';
import type { Job } from '../types';

const { Title } = Typography;
const { Search } = Input;
const { Option } = Select;

const JobsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string | undefined>();
  const [locationFilter, setLocationFilter] = useState<string | undefined>();
  
  const debouncedSearch = useDebounce(searchTerm, 300);
  
  const { data: jobs, isLoading, error } = useJobs({
    search: debouncedSearch,
    filters: {
      type: typeFilter,
      location: locationFilter,
    },
  });

  const deleteJobMutation = useDeleteJob();

  const handleDelete = (id: string, title: string) => {
    Modal.confirm({
      title: 'Delete Job',
      content: `Are you sure you want to delete "${title}"?`,
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: () => {
        deleteJobMutation.mutate(id);
      },
    });
  };

  const columns: ColumnsType<Job> = [
    {
      title: 'Job Title',
      dataIndex: 'title',
      key: 'title',
      render: (text: string, record: Job) => (
        <div>
          <strong>{text}</strong>
          <br />
          <small style={{ color: '#666' }}>{record.company}</small>
        </div>
      ),
      sorter: true,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type: Job['type']) => {
        const colors = {
          'full-time': 'blue',
          'part-time': 'green',
          'contract': 'orange',
          'remote': 'purple',
        };
        return <Tag color={colors[type]}>{type.replace('-', ' ')}</Tag>;
      },
      filters: [
        { text: 'Full Time', value: 'full-time' },
        { text: 'Part Time', value: 'part-time' },
        { text: 'Contract', value: 'contract' },
        { text: 'Remote', value: 'remote' },
      ],
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      ellipsis: true,
    },
    {
      title: 'Salary',
      key: 'salary',
      render: (_, record: Job) => {
        if (!record.salary) return '-';
        return `${record.salary.currency} ${record.salary.min.toLocaleString()} - ${record.salary.max.toLocaleString()}`;
      },
      sorter: true,
    },
    {
      title: 'Posted',
      dataIndex: 'postedAt',
      key: 'postedAt',
      render: (date: string) => new Date(date).toLocaleDateString(),
      sorter: true,
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive: boolean) => (
        <Tag color={isActive ? 'green' : 'red'}>
          {isActive ? 'Active' : 'Inactive'}
        </Tag>
      ),
      filters: [
        { text: 'Active', value: true },
        { text: 'Inactive', value: false },
      ],
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record: Job) => (
        <Space size="small">
          <Tooltip title="View Details">
            <Button
              type="text"
              icon={<EyeOutlined />}
              onClick={() => {
                // Navigate to job details
                window.location.href = `/jobs/${record.id}`;
              }}
            />
          </Tooltip>
          <Tooltip title="Edit">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => {
                // Navigate to edit job
                window.location.href = `/jobs/${record.id}/edit`;
              }}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record.id, record.title)}
              loading={deleteJobMutation.isPending}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  // Mock data for demonstration since API might not be available
  const mockJobs: Job[] = [
    {
      id: '1',
      title: 'Senior React Developer',
      company: 'Tech Corp',
      location: 'San Francisco, CA',
      type: 'full-time',
      salary: { min: 120000, max: 180000, currency: 'USD' },
      description: 'We are looking for a senior React developer...',
      requirements: ['React', 'TypeScript', 'Node.js'],
      benefits: ['Health insurance', 'Remote work', '401k'],
      postedAt: '2024-01-15T00:00:00Z',
      expiresAt: '2024-02-15T00:00:00Z',
      isActive: true,
    },
    {
      id: '2',
      title: 'UX Designer',
      company: 'Design Studio',
      location: 'New York, NY',
      type: 'contract',
      salary: { min: 80000, max: 120000, currency: 'USD' },
      description: 'Join our creative team as a UX designer...',
      requirements: ['Figma', 'Adobe Creative Suite', 'User Research'],
      benefits: ['Flexible hours', 'Creative environment'],
      postedAt: '2024-01-14T00:00:00Z',
      expiresAt: '2024-02-14T00:00:00Z',
      isActive: true,
    },
    {
      id: '3',
      title: 'Backend Engineer',
      company: 'StartupXYZ',
      location: 'Remote',
      type: 'remote',
      salary: { min: 100000, max: 150000, currency: 'USD' },
      description: 'Build scalable backend systems...',
      requirements: ['Python', 'Django', 'PostgreSQL'],
      benefits: ['Remote work', 'Equity', 'Learning budget'],
      postedAt: '2024-01-13T00:00:00Z',
      expiresAt: '2024-02-13T00:00:00Z',
      isActive: false,
    },
  ];

  const displayJobs = jobs || mockJobs;

  if (isLoading) {
    return <ContentLoading tip="Loading jobs..." />;
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <Title level={2} style={{ margin: 0 }}>
          Jobs Management
        </Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            window.location.href = '/jobs/create';
          }}
        >
          Create Job
        </Button>
      </div>

      <Card>
        {/* Filters */}
        <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
          <Col xs={24} sm={12} md={8}>
            <Search
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              prefix={<SearchOutlined />}
            />
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Select
              placeholder="Job Type"
              value={typeFilter}
              onChange={setTypeFilter}
              allowClear
              style={{ width: '100%' }}
            >
              <Option value="full-time">Full Time</Option>
              <Option value="part-time">Part Time</Option>
              <Option value="contract">Contract</Option>
              <Option value="remote">Remote</Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Select
              placeholder="Location"
              value={locationFilter}
              onChange={setLocationFilter}
              allowClear
              style={{ width: '100%' }}
            >
              <Option value="San Francisco, CA">San Francisco, CA</Option>
              <Option value="New York, NY">New York, NY</Option>
              <Option value="Remote">Remote</Option>
              <Option value="Los Angeles, CA">Los Angeles, CA</Option>
            </Select>
          </Col>
        </Row>

        {/* Table */}
        <Table
          columns={columns}
          dataSource={displayJobs}
          rowKey="id"
          pagination={{
            total: displayJobs.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} jobs`,
          }}
          scroll={{ x: 800 }}
        />
      </Card>
    </div>
  );
};

export default JobsPage;
