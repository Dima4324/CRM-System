import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { MainAppLayout } from "../Layouts/MainAppLayout";
import { refreshTokenRequest, RefreshTokenStorage } from "../../api/todos";
import { useEffect, useState } from "react";
import { setToken } from "../../store/reducers/user/accessTokenSlice";
import { Flex, Spin } from "antd";
import { Loading3QuartersOutlined } from "@ant-design/icons";
import { getProfileInfoAction } from "../../store/actions/profileActions";

export const CheckAuth = () => {
    const accessToken = useAppSelector((state) => state.accessToken);
    const [isLoading, setIsLoading] = useState(true);
    const [isAuth, setIsAuth] = useState(false);

    const dispatch = useAppDispatch();

    useEffect(() => {
        const checkToken = async () => {
            if (!accessToken) {
                const refreshTokenStorage = new RefreshTokenStorage();
                const refreshToken = refreshTokenStorage.getToken();
                if (refreshToken) {
                    try {
                        const tokens = await refreshTokenRequest({
                            refreshToken: refreshToken,
                        });

                        refreshTokenStorage.setToken(tokens.refreshToken);

                        dispatch(setToken(tokens.accessToken));

                        await dispatch(
                            getProfileInfoAction(tokens.accessToken)
                        );

                        setIsAuth(true);
                    } catch {
                        setIsAuth(false);
                    }
                } else {
                    setIsAuth(false);
                }
            } else {
                await dispatch(getProfileInfoAction(accessToken));
                
                setIsAuth(true);
            }

            setIsLoading(false);
        };

        checkToken();
    }, [accessToken, dispatch]);

    return isLoading ? (
        <Flex align="center" justify="center" style={{ height: "100vh" }}>
            <Spin indicator={<Loading3QuartersOutlined spin />} size="large" />
        </Flex>
    ) : isAuth ? (
        <MainAppLayout />
    ) : (
        <Navigate to="/auth" replace />
    );
};
