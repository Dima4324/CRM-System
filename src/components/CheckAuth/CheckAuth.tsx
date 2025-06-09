import { Navigate, useLocation } from "react-router-dom";
import { MainAppLayout } from "../Layouts/MainAppLayout";
import { refreshTokenRequest, tokensStorage } from "../../api/user";
import { useEffect, useState } from "react";
import { Flex, Spin } from "antd";
import { Loading3QuartersOutlined } from "@ant-design/icons";

export const CheckAuth = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuth, setIsAuth] = useState(false);

    const location = useLocation();

    useEffect(() => {
        const checkToken = async () => {
            const refreshToken = tokensStorage.refreshToken;
            const accessToken = tokensStorage.accessToken;
            if (refreshToken) {
                if (!accessToken) {
                    try {
                        const tokens = await refreshTokenRequest({
                            refreshToken,
                        });
                        tokensStorage.accessToken = tokens.accessToken;
                        tokensStorage.refreshToken = tokens.refreshToken;

                        setIsAuth(true);
                    } catch {
                        setIsAuth(false);
                    }
                } else {
                    setIsAuth(true);
                }
            } else {
                setIsAuth(false);
            }
            setIsLoading(false);
        };

        checkToken();
    }, [location.pathname]);

    if (isLoading) {
        return (
            <Flex align="center" justify="center" style={{ height: "100vh" }}>
                <Spin
                    indicator={<Loading3QuartersOutlined spin />}
                    size="large"
                />
            </Flex>
        );
    }

    if (!isAuth) {
        return <Navigate to="/auth" replace />;
    }

    return <MainAppLayout />;
};
