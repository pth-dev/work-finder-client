import React, { useState } from 'react';
import {
  Card,
  Form,
  Input,
  Button,
  Avatar,
  Upload,
  Typography,
  Row,
  Col,
  Divider,
  Space,
  Tag,
  message,
} from 'antd';
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  CameraOutlined,
  EditOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { useProfile, useUpdateProfile } from '../hooks/use-api';
import { ContentLoading } from '../components/ui/loading';
import { useAuthStore } from '../stores/auth-store';

const { Title, Text } = Typography;
const { TextArea } = Input;

const ProfilePage: React.FC = () => {
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useAuthStore();
  const { data: profile, isLoading } = useProfile();
  const updateProfileMutation = useUpdateProfile();

  // Mock profile data for demonstration
  const mockProfile = {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    bio: 'Experienced React developer with 5+ years of experience building modern web applications. Passionate about clean code, user experience, and continuous learning.',
    avatar: '',
    skills: ['React', 'TypeScript', 'Node.js', 'Python', 'AWS'],
    experience: '5+ years',
    education: 'Bachelor of Computer Science',
    website: 'https://johndoe.dev',
    linkedin: 'https://linkedin.com/in/johndoe',
    github: 'https://github.com/johndoe',
  };

  const displayProfile = profile || user || mockProfile;

  const handleSave = async (values: any) => {
    try {
      await updateProfileMutation.mutateAsync(values);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setIsEditing(false);
  };

  const uploadProps: UploadProps = {
    name: 'avatar',
    listType: 'picture-card',
    className: 'avatar-uploader',
    showUploadList: false,
    beforeUpload: (file) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
      }
      return isJpgOrPng && isLt2M;
    },
    onChange: (info) => {
      if (info.file.status === 'done') {
        message.success('Avatar uploaded successfully');
      }
    },
  };

  if (isLoading) {
    return <ContentLoading tip="Loading profile..." />;
  }

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto' }}>
      <Row gutter={[24, 24]}>
        {/* Profile Header */}
        <Col span={24}>
          <Card>
            <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
              <div style={{ position: 'relative' }}>
                <Avatar
                  size={120}
                  src={displayProfile.avatar}
                  icon={<UserOutlined />}
                  style={{ backgroundColor: '#1890ff' }}
                />
                {isEditing && (
                  <Upload {...uploadProps}>
                    <Button
                      type="primary"
                      shape="circle"
                      icon={<CameraOutlined />}
                      size="small"
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                      }}
                    />
                  </Upload>
                )}
              </div>
              
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <Title level={2} style={{ marginBottom: 8 }}>
                      {displayProfile.name}
                    </Title>
                    <Text type="secondary" style={{ fontSize: 16 }}>
                      {displayProfile.email}
                    </Text>
                    <br />
                    <Space style={{ marginTop: 8 }}>
                      <EnvironmentOutlined />
                      <Text>{displayProfile.location}</Text>
                    </Space>
                  </div>
                  
                  <Button
                    type={isEditing ? 'default' : 'primary'}
                    icon={isEditing ? <SaveOutlined /> : <EditOutlined />}
                    onClick={() => {
                      if (isEditing) {
                        form.submit();
                      } else {
                        setIsEditing(true);
                        form.setFieldsValue(displayProfile);
                      }
                    }}
                    loading={updateProfileMutation.isPending}
                  >
                    {isEditing ? 'Save Changes' : 'Edit Profile'}
                  </Button>
                </div>
                
                {displayProfile.bio && (
                  <div style={{ marginTop: 16 }}>
                    <Text>{displayProfile.bio}</Text>
                  </div>
                )}
                
                {displayProfile.skills && (
                  <div style={{ marginTop: 16 }}>
                    <Space wrap>
                      {displayProfile.skills.map((skill: string) => (
                        <Tag key={skill} color="blue">
                          {skill}
                        </Tag>
                      ))}
                    </Space>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </Col>

        {/* Profile Form */}
        <Col span={24}>
          <Card title="Personal Information">
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSave}
              initialValues={displayProfile}
            >
              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="name"
                    label="Full Name"
                    rules={[{ required: true, message: 'Please input your name!' }]}
                  >
                    <Input
                      prefix={<UserOutlined />}
                      disabled={!isEditing}
                    />
                  </Form.Item>
                </Col>
                
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      { required: true, message: 'Please input your email!' },
                      { type: 'email', message: 'Please enter a valid email!' },
                    ]}
                  >
                    <Input
                      prefix={<MailOutlined />}
                      disabled={!isEditing}
                    />
                  </Form.Item>
                </Col>
                
                <Col xs={24} sm={12}>
                  <Form.Item name="phone" label="Phone">
                    <Input
                      prefix={<PhoneOutlined />}
                      disabled={!isEditing}
                    />
                  </Form.Item>
                </Col>
                
                <Col xs={24} sm={12}>
                  <Form.Item name="location" label="Location">
                    <Input
                      prefix={<EnvironmentOutlined />}
                      disabled={!isEditing}
                    />
                  </Form.Item>
                </Col>
                
                <Col span={24}>
                  <Form.Item name="bio" label="Bio">
                    <TextArea
                      rows={4}
                      disabled={!isEditing}
                      placeholder="Tell us about yourself..."
                    />
                  </Form.Item>
                </Col>
              </Row>

              {isEditing && (
                <>
                  <Divider />
                  <div style={{ textAlign: 'right' }}>
                    <Space>
                      <Button onClick={handleCancel}>
                        Cancel
                      </Button>
                      <Button
                        type="primary"
                        htmlType="submit"
                        loading={updateProfileMutation.isPending}
                      >
                        Save Changes
                      </Button>
                    </Space>
                  </div>
                </>
              )}
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProfilePage;
