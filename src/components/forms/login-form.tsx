import React from 'react';
import { Form, Input, Button, Checkbox, Card, Typography, Divider } from 'antd';
import { UserOutlined, LockOutlined, GoogleOutlined, GithubOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../stores/auth-store';
import { useAppStore } from '../../stores/app-store';
import type { LoginForm as LoginFormType } from '../../types';

const { Title, Text } = Typography;

const LoginForm: React.FC = () => {
  const [form] = Form.useForm();
  const { login } = useAuthStore();
  const { addNotification } = useAppStore();

  const onFinish = async (values: LoginFormType) => {
    try {
      await login(values);
      addNotification({
        type: 'success',
        title: 'Welcome back!',
        message: 'You have successfully logged in.',
      });
    } catch (error: any) {
      addNotification({
        type: 'error',
        title: 'Login Failed',
        message: error.message || 'Invalid credentials. Please try again.',
      });
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px'
    }}>
      <Card
        style={{
          width: '100%',
          maxWidth: 400,
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <Title level={2} style={{ marginBottom: 8 }}>
            Welcome Back
          </Title>
          <Text type="secondary">
            Sign in to your account to continue
          </Text>
        </div>

        <Form
          form={form}
          name="login"
          onFinish={onFinish}
          layout="vertical"
          size="large"
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Enter your email"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: 'Please input your password!' },
              { min: 6, message: 'Password must be at least 6 characters!' },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter your password"
            />
          </Form.Item>

          <Form.Item>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <Link to="/forgot-password">
                <Text type="secondary">Forgot password?</Text>
              </Link>
            </div>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Sign In
            </Button>
          </Form.Item>
        </Form>

        <Divider>Or continue with</Divider>

        <div style={{ display: 'flex', gap: 8 }}>
          <Button
            icon={<GoogleOutlined />}
            block
            onClick={() => {
              addNotification({
                type: 'info',
                title: 'Coming Soon',
                message: 'Google authentication will be available soon.',
              });
            }}
          >
            Google
          </Button>
          <Button
            icon={<GithubOutlined />}
            block
            onClick={() => {
              addNotification({
                type: 'info',
                title: 'Coming Soon',
                message: 'GitHub authentication will be available soon.',
              });
            }}
          >
            GitHub
          </Button>
        </div>

        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <Text type="secondary">
            Don't have an account?{' '}
            <Link to="/register">
              Sign up now
            </Link>
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default LoginForm;
