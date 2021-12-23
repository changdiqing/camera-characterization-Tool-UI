import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Layout } from "antd";
import SideBar from "./components/SideBar/SideBar";
import NavBar from "./components/NavBar/NavBar";
import Menu from "./components/Menu/Menu";
import MeasDetailPage from "./components/MeasDetailPage/MeasDetailPage";
import "./App.css";
import { fetchDevice } from "./services/DeviceService";

function App() {
    fetchDevice();

    const menu: JSX.Element = <Menu />;
    return (
        <div className="App">
            <Router>
                <NavBar menu={menu} />
                <Layout>
                    <SideBar menu={menu} />
                    <Layout.Content className="content">
                        <MeasDetailPage />
                    </Layout.Content>
                </Layout>
            </Router>
        </div>
    );
}

export default App;
