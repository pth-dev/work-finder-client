import React from 'react';
import { Layout, Button, Dropdown, Avatar, Space, Input, Badge } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BellOutlined,
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { useAuthStore } from '../../stores/auth-store';
import { useAppStore } from '../../stores/app-store';

const { Header } = Layout;
const { Search } = Input;

const AppHeader: React.FC = () => {
  const { user, logout } = useAuthStore();
  const { 
    sidebarCollapsed, 
    toggleSidebar, 
    notifications,
    globalSearch,
    setGlobalSearch 
  } = useAppStore();

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
      onClick: () => {
        // Navigate to profile page
        window.location.href = '/profile';
      },
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
      onClick: () => {
        // Navigate to settings page
        window.location.href = '/settings';
      },
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: logout,
    },
  ];

  const notificationMenuItems: MenuProps['items'] = notifications.length > 0 
    ? notifications.slice(0, 5).map((notification) => ({
        key: notification.id,
        label: (
          <div style={{ maxWidth: 250 }}>
            <div style={{ fontWeight: 500, marginBottom: 4 }}>
              {notification.title}
            </div>
            <div style={{ fontSize: 12, color: '#666' }}>
              {notification.message}
            </div>
          </div>
        ),
      }))
    : [
        {
          key: 'no-notifications',
          label: 'No new notifications',
          disabled: true,
        },
      ];

  return (
    <Header
      style={{
        padding: '0 24px',
        background: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid #f0f0f0',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <Button
          type="text"
          icon={sidebarCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={toggleSidebar}
          style={{
            fontSize: '16px',
            width: 64,
            height: 64,
          }}
        />
        
        <Search
          placeholder="Search..."
          value={globalSearch}
          onChange={(e) => setGlobalSearch(e.target.value)}
          style={{ width: 300 }}
          prefix={<SearchOutlined />}
        />
      </div>

      <Space size="middle">
        <Dropdown
          menu={{ items: notificationMenuItems }}
          placement="bottomRight"
          trigger={['click']}
        >
          <Button
            type="text"
            icon={
              <Badge count={notifications.length} size="small">
                <BellOutlined style={{ fontSize: 16 }} />
              </Badge>
            }
            style={{ border: 'none' }}
          />
        </Dropdown>

        <Dropdown
          menu={{ items: userMenuItems }}
          placement="bottomRight"
          trigger={['click']}
        >
          <Space style={{ cursor: 'pointer' }}>
            <Avatar
              size="small"
              src={user?.avatar}
              icon={<UserOutlined />}
            />
            <span style={{ fontWeight: 500 }}>
              {user?.name || 'User'}
            </span>
          </Space>
        </Dropdown>
      </Space>
    </Header>
  );
};

export default AppHeader;
