import React from 'react';
import { Layout, Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  DashboardOutlined,
  UserOutlined,
  TeamOutlined,
  SettingOutlined,
  FileTextOutlined,
  BankOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { useAppStore } from '../../stores/app-store';

const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const AppSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { sidebarCollapsed } = useAppStore();

  const menuItems: MenuItem[] = [
    {
      key: '/',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key: '/jobs',
      icon: <BankOutlined />,
      label: 'Jobs',
      children: [
        {
          key: '/jobs',
          label: 'All Jobs',
        },
        {
          key: '/jobs/create',
          label: 'Create Job',
        },
        {
          key: '/jobs/applications',
          label: 'Applications',
        },
      ],
    },
    {
      key: '/users',
      icon: <TeamOutlined />,
      label: 'Users',
      children: [
        {
          key: '/users',
          label: 'All Users',
        },
        {
          key: '/users/create',
          label: 'Create User',
        },
      ],
    },
    {
      key: '/profile',
      icon: <UserOutlined />,
      label: 'Profile',
    },
    {
      key: '/reports',
      icon: <FileTextOutlined />,
      label: 'Reports',
    },
    {
      key: '/settings',
      icon: <SettingOutlined />,
      label: 'Settings',
    },
  ];

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    navigate(key);
  };

  // Get the current selected key based on the pathname
  const getSelectedKey = () => {
    const pathname = location.pathname;
    
    // Find exact match first
    const exactMatch = menuItems.find(item => item?.key === pathname);
    if (exactMatch) return [pathname];
    
    // Find parent match for nested routes
    for (const item of menuItems) {
      if (item && 'children' in item && item.children) {
        const childMatch = item.children.find(child => 
          child && typeof child === 'object' && 'key' in child && child.key === pathname
        );
        if (childMatch) return [pathname];
      }
    }
    
    // Default to dashboard if no match
    return ['/'];
  };

  // Get the open keys for expanded menu items
  const getOpenKeys = () => {
    const pathname = location.pathname;
    const openKeys: string[] = [];
    
    for (const item of menuItems) {
      if (item && 'children' in item && item.children) {
        const hasActiveChild = item.children.some(child => 
          child && typeof child === 'object' && 'key' in child && 
          pathname.startsWith(child.key as string)
        );
        if (hasActiveChild && typeof item.key === 'string') {
          openKeys.push(item.key);
        }
      }
    }
    
    return openKeys;
  };

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={sidebarCollapsed}
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 1000,
      }}
      theme="dark"
    >
      <div
        style={{
          height: 64,
          margin: 16,
          background: 'rgba(255, 255, 255, 0.2)',
          borderRadius: 6,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
          fontSize: sidebarCollapsed ? 14 : 16,
        }}
      >
        {sidebarCollapsed ? 'WF' : 'Work Finder'}
      </div>
      
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={getSelectedKey()}
        defaultOpenKeys={getOpenKeys()}
        items={menuItems}
        onClick={handleMenuClick}
        style={{ borderRight: 0 }}
      />
    </Sider>
  );
};

export default AppSidebar;
