import { useState } from "react";
import { Menu, Button, Modal, Form, Input, Row, Spin } from "antd";
import { FileAddOutlined, DeleteOutlined, SettingOutlined } from "@ant-design/icons";
import { useAppSelector } from "../../hooks";
import Device from "../../models/Device";
import SpinningCover from "../SpinningCover/SpinningCover";
import { fetchDistMeasure } from "../../services/DistMeasureService";
import { fetchColorMeasure } from "../../services/ColorMeasureService";
import { fetchResoMeasure } from "../../services/ResoMeasureService";
import { addDevice, removeDevice } from "../../services/DeviceService";
import "./Menu.css";

const ToolBar = () => {
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [isRemoveModalVisible, setIsRemoveModalVisible] = useState(false);
    const [selectedDeviceId, setSelectedDeviceId] = useState<string | undefined>(undefined);
    const [form] = Form.useForm();
    const deviceList = useAppSelector((state) => state.deviceList);
    const styledTopics: JSX.Element[] = [];

    const handleClick = (dut_id: string) => {
        fetchDistMeasure(dut_id);
        fetchColorMeasure(dut_id);
        fetchResoMeasure(dut_id);
    };

    const handleAddDevice = () => {
        setIsAddModalVisible(true);
    };

    const handleUpdateDevice = (dut: Device) => {
        setSelectedDeviceId(dut._id);
        setIsAddModalVisible(true);
        form.setFieldsValue({ name: dut.name, description: dut.description });
    };

    const handleAddCancel = () => {
        setIsAddModalVisible(false);
        setSelectedDeviceId(undefined);
    };

    const handleAddFinish = (values: { name: string; description: string }) => {
        let deviceName = values.name;
        let deviceDescription = values.description;
        console.log(` ${deviceName}  ${deviceDescription}`);
        let device = new Device(deviceName, deviceDescription);
        addDevice(device);
        setIsAddModalVisible(false);
        setSelectedDeviceId(undefined);
    };

    const handleRemoveDevice = (dut_id: string) => {
        setSelectedDeviceId(dut_id);
        setIsRemoveModalVisible(true);
    };
    const handleRemoveCancel = () => {
        setIsRemoveModalVisible(false);
        setSelectedDeviceId(undefined);
    };

    const handleRemoveOk = () => {
        if (selectedDeviceId != undefined) {
            removeDevice(selectedDeviceId);
        }
        setIsRemoveModalVisible(false);
        setSelectedDeviceId(undefined);
    };
    deviceList.value.forEach((item, index) =>
        styledTopics.push(
            <Menu.Item className="menu-item" key={index} onClick={() => handleClick(item._id!)}>
                {item.name}
                <div className="hover-button">
                    <Button icon={<SettingOutlined />} onClick={() => handleUpdateDevice(item)} />
                    <Button icon={<DeleteOutlined />} onClick={() => handleRemoveDevice(item._id!)} />
                </div>
            </Menu.Item>
        )
    );

    return (
        <div>
            <Row justify="end">
                <Button icon={<FileAddOutlined />} onClick={handleAddDevice} />
            </Row>
            <Menu mode="inline">{styledTopics}</Menu>
            <Modal
                title={selectedDeviceId ? "Device Information" : "Add New Device"}
                visible={isAddModalVisible}
                footer={null}
                onCancel={handleAddCancel}
            >
                <Form name="normal_login" id="Form" form={form} onFinish={handleAddFinish}>
                    <Form.Item name="name">
                        <Input
                            id="name"
                            placeholder="Device Name"
                            //value={selectedDeviceName ? selectedDeviceName : "bla"}
                            //onChange={handleDeviceNameChange}
                        />
                    </Form.Item>
                    <Form.Item name="description">
                        <Input id="description" placeholder="Device Desciption" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            {selectedDeviceId ? "Update" : "Create"}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <Modal
                title="Remove Device"
                visible={isRemoveModalVisible}
                onOk={handleRemoveOk}
                onCancel={handleRemoveCancel}
            >
                Please press "OK" ro confirm removing the Device.
            </Modal>
            <SpinningCover shouldDisplay={deviceList.loading} />
        </div>
    );
};
export default ToolBar;
