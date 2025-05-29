import illustration from "../../assets/illustration.png";
import logo from "../../assets/Group_1686550876.svg";
import { Flex } from "antd";
import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
    return (
        <main>
            <Flex
                style={{
                    backgroundColor: "#fff",
                    width: "100%",
                    boxSizing: "border-box",
                    height: "100vh",
                }}
            >
                <div>
                    <img
                        src={illustration}
                        alt="картинка"
                        style={{ height: "100vh" }}
                    />
                </div>
                <div
                    style={{
                        width: "25%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        margin: "0 auto",
                    }}
                >
                    <div style={{ width: "100%" }}>
                        <img
                            src={logo}
                            alt="картинка"
                            style={{ width: "3vw", textAlign: "left" }}
                        />
                    </div>
                    <Outlet />
                </div>
            </Flex>
        </main>
    );
};
