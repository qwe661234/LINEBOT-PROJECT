import React from 'react';
import { Layout, Menu } from 'antd';
import FoodTable from '../components/Table';
import InsertButton from '../components/InsertButton';

const { Sider, Content } = Layout;

export default class Container extends React.Component {
    state = {
        collapsed: false,
    };

    render() {
        return (
            <Layout style={{ width: '100vw', height: '100vh' }}>
                <Sider>
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={['1']}
                    >
                        <Menu.Item key="1" style={{ fontSize: 20 }}>
                            Food List
                        </Menu.Item>
                        <InsertButton></InsertButton>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                        }}
                    >
                        <FoodTable></FoodTable>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}
