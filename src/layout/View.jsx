import React, { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { Link } from "react-router-dom";
import Router from "../routes/Router";
import { protectedRoutes, publicRoutes } from "../routes/Routes";
import WalletButton from "../provider/WalletButton";

const { Header, Sider, Content } = Layout;

const View = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout style={{ height: '100vh' }}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                >
                    {publicRoutes.map((route, idx) => (
                        <Menu.Item key={idx} icon={<route.icon />}>
                            <Link to={route.path}>{route.label}</Link>
                        </Menu.Item>
                    ))}
                    {protectedRoutes.map((route, idx) => (
                        <Menu.Item key={idx + 1} icon={<route.icon />}>
                            <Link to={route.path}>{route.label}</Link>
                        </Menu.Item>
                    ))}
                </Menu>
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: '0 16px',
                        background: colorBgContainer,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                    <WalletButton />
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Router />
                </Content>
            </Layout>
        </Layout>
    );
};

export default View;
