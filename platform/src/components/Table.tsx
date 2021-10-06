import { Table, Space, Button, Input } from 'antd';
import React from 'react';
import { food } from '../type';
import Axios from 'axios';
const { Search } = Input;

const handleClick = (address: string) => {
    Axios.delete(`http://localhost:8080/food/${address}`);
};

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Link',
        dataIndex: 'link',
        key: 'link',
        render: (link: string) => {
            return (
                <a href={link} target="_blank" rel="noreferrer">
                    {' '}
                    {link}{' '}
                </a>
            );
        },
    },
    {
        title: 'Action',
        key: 'action',
        render: (text: string, record: food) => (
            <Space size="middle">
                <Button onClick={handleClick.bind(this, record.address)}>
                    Delete
                </Button>
            </Space>
        ),
    },
];
export default class FoodTable extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
        this.state = {
            dataSource: [],
        };
    }

    handleSearch = (value: string) => {
        const newData: food[] = [];
        Axios.get(`http://localhost:8080/food/${value}`).then((res: any) => {
            res.data.map((item: food) => {
                newData.push({
                    key: item.name,
                    name: item.name,
                    address: item.address,
                    link: item.link,
                    category: item.category,
                });
            });
            this.setState(() => {
                return {
                    dataSource: newData,
                };
            });
        });
    };

    async componentDidMount() {
        const newData: food[] = [];
        Axios.get('http://localhost:8080/food').then((res: any) => {
            res.data.map((item: food) => {
                newData.push({
                    key: item.name,
                    name: item.name,
                    address: item.address,
                    link: item.link,
                    category: item.category,
                });
            });
            this.setState(() => {
                return {
                    dataSource: newData,
                };
            });
        });
    }

    render() {
        return (
            <>
                <Search
                    placeholder="input category"
                    allowClear
                    enterButton="Search"
                    size="large"
                    style={{ marginBottom: 10, width: 1000 }}
                    onSearch={this.handleSearch}
                />
                <Table dataSource={this.state.dataSource} columns={columns} />
            </>
        );
    }
}
