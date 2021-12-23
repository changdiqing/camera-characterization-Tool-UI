import React, { useState } from "react";
import { Drawer, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import "./NavBar.css";
const NavBar = ({ menu }: { menu: JSX.Element }) => {
    const [visible, setVisible] = useState(false);

    return (
        <nav className="navbar">
            <Button className="menu" type="primary" icon={<MenuOutlined />} onClick={() => setVisible(true)} />
            <Drawer title="Devices" placement="left" onClose={() => setVisible(false)} visible={visible}>
                {menu}
            </Drawer>
            Camera Characterization Tool
        </nav>
    );
};
export default NavBar;
