import React from 'react';
import { Spin, Skeleton } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

interface LoadingProps {
  size?: 'small' | 'default' | 'large';
  tip?: string;
  spinning?: boolean;
  children?: React.ReactNode;
  type?: 'spin' | 'skeleton';
  skeletonProps?: {
    rows?: number;
    avatar?: boolean;
    title?: boolean;
    active?: boolean;
  };
}

const Loading: React.FC<LoadingProps> = ({
  size = 'default',
  tip,
  spinning = true,
  children,
  type = 'spin',
  skeletonProps = {},
}) => {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  if (type === 'skeleton') {
    return (
      <Skeleton
        loading={spinning}
        avatar={skeletonProps.avatar}
        title={skeletonProps.title}
        paragraph={{ rows: skeletonProps.rows || 4 }}
        active={skeletonProps.active}
      >
        {children}
      </Skeleton>
    );
  }

  if (children) {
    return (
      <Spin 
        spinning={spinning} 
        size={size} 
        tip={tip}
        indicator={antIcon}
      >
        {children}
      </Spin>
    );
  }

  return (
    <div className="loading-container">
      <Spin 
        size={size} 
        tip={tip}
        indicator={antIcon}
      />
    </div>
  );
};

// Specialized loading components
export const PageLoading: React.FC<{ tip?: string }> = ({ tip = 'Loading...' }) => (
  <div style={{ 
    height: '100vh', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center' 
  }}>
    <Loading size="large" tip={tip} />
  </div>
);

export const ContentLoading: React.FC<{ tip?: string }> = ({ tip = 'Loading...' }) => (
  <div style={{ 
    minHeight: '200px', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center' 
  }}>
    <Loading tip={tip} />
  </div>
);

export const InlineLoading: React.FC<{ tip?: string }> = ({ tip }) => (
  <Loading size="small" tip={tip} />
);

export const SkeletonLoading: React.FC<{
  rows?: number;
  avatar?: boolean;
  title?: boolean;
  active?: boolean;
}> = ({ rows = 4, avatar = false, title = true, active = true }) => (
  <Loading 
    type="skeleton" 
    skeletonProps={{ rows, avatar, title, active }} 
  />
);

export default Loading;
