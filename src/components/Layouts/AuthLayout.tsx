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
                <div
                    style={{
                        width: "60vw", // фиксированная ширина
                        height: "100vh", 
                        // maxWidth: "865px",// фиксированная высота
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <img
                        src={illustration}
                        alt="картинка"
                        style={{ height: "100%", width: "100%" }}
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
                    <div style={{ width: "42px", height: "42px" }}>
                        <img
                            src={logo}
                            alt="картинка"
                            style={{ width: "42px", height: "42px", textAlign: "left" }}
                        />
                    </div>
                    <Outlet />
                </div>
            </Flex>
        </main>
    );
};
