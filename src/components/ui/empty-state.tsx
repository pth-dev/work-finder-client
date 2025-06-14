import React from 'react';
import { Empty, Button, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

interface EmptyStateProps {
  title?: string;
  description?: string;
  image?: React.ReactNode;
  action?: {
    text: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
  extra?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No data',
  description = 'There is no data to display',
  image,
  action,
  extra,
}) => {
  return (
    <div style={{ 
      padding: '40px 20px', 
      textAlign: 'center',
      minHeight: 200,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Empty
        image={image || Empty.PRESENTED_IMAGE_SIMPLE}
        description={
          <div>
            <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 8 }}>
              {title}
            </div>
            <div style={{ color: 'rgba(0, 0, 0, 0.45)' }}>
              {description}
            </div>
          </div>
        }
      >
        {(action || extra) && (
          <Space direction="vertical" size="middle">
            {action && (
              <Button
                type="primary"
                icon={action.icon || <PlusOutlined />}
                onClick={action.onClick}
              >
                {action.text}
              </Button>
            )}
            {extra}
          </Space>
        )}
      </Empty>
    </div>
  );
};

export default EmptyState;
