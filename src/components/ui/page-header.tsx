import React from "react";
import { Breadcrumb, Space, Button } from "antd";
import { PageHeader as AntdPageHeader } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  extra?: React.ReactNode;
  showBreadcrumb?: boolean;
  breadcrumbItems?: Array<{
    title: string;
    path?: string;
  }>;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  extra,
  showBreadcrumb = true,
  breadcrumbItems,
}) => {
  const location = useLocation();

  const generateBreadcrumbItems = () => {
    if (breadcrumbItems) {
      return breadcrumbItems.map((item, index) => ({
        title: item.path ? (
          <Link to={item.path}>{item.title}</Link>
        ) : (
          item.title
        ),
      }));
    }

    // Auto-generate breadcrumb from current path
    const pathSegments = location.pathname.split("/").filter(Boolean);
    const items = [
      {
        title: (
          <Link to="/">
            <HomeOutlined /> Home
          </Link>
        ),
      },
    ];

    let currentPath = "";
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === pathSegments.length - 1;

      items.push({
        title: isLast ? (
          segment.charAt(0).toUpperCase() + segment.slice(1)
        ) : (
          <Link to={currentPath}>
            {segment.charAt(0).toUpperCase() + segment.slice(1)}
          </Link>
        ),
      });
    });

    return items;
  };

  return (
    <div style={{ marginBottom: 24 }}>
      {showBreadcrumb && (
        <Breadcrumb
          items={generateBreadcrumbItems()}
          style={{ marginBottom: 16 }}
        />
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 16,
        }}
      >
        <div>
          <h1
            style={{
              fontSize: 24,
              fontWeight: 600,
              margin: 0,
              marginBottom: subtitle ? 8 : 0,
            }}
          >
            {title}
          </h1>
          {subtitle && (
            <p
              style={{
                color: "rgba(0, 0, 0, 0.65)",
                margin: 0,
                fontSize: 14,
              }}
            >
              {subtitle}
            </p>
          )}
        </div>

        {extra && <Space>{extra}</Space>}
      </div>
    </div>
  );
};

export default PageHeader;
