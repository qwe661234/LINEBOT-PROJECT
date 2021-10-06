import { Button, Modal, Input } from 'antd';
import React, { useState } from 'react';
import Axios from 'axios';

const InsertButton: React.FC = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [foodData, setFoodFata] = useState({
        name: '',
        category: '',
        address: '',
        link: '',
    });

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleNameInput = (e: any) => {
        setFoodFata({ ...foodData, name: e.target.value });
    };
    const handleCategoryInput = (e: any) => {
        setFoodFata({ ...foodData, category: e.target.value });
    };
    const handleAddressInput = (e: any) => {
        setFoodFata({ ...foodData, address: e.target.value });
    };
    const handleLinkInput = (e: any) => {
        setFoodFata({ ...foodData, link: e.target.value });
    };
    const handleClick = () => {
        Axios.post('http://localhost:8080/food', foodData).then((res) => {
            console.log(res);
            setFoodFata({ name: '', category: '', address: '', link: '' });
            setIsModalVisible(false);
        });
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    return (
        <>
            <Button
                type="primary"
                size="large"
                onClick={showModal}
                style={{ marginLeft: 30 }}
            >
                Insert food
            </Button>
            <Modal
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <span>Name: </span>
                <Input onChange={handleNameInput}></Input>
                <span>Category: </span>
                <Input onChange={handleCategoryInput}></Input>
                <span>Address: </span>
                <Input onChange={handleAddressInput}></Input>
                <span>Link: </span>
                <Input onChange={handleLinkInput}></Input>

                <Button onClick={handleClick}>insert</Button>
            </Modal>
        </>
    );
};

export default InsertButton;
