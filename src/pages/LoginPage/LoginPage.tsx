import { FrownOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { login, RefreshTokenStorage } from "../../api/todos";
import { useAppDispatch } from "../../hooks/redux";
import { setToken } from "../../store/reducers/user/accessTokenSlice";
import { useInitNotification } from "../../hooks/useNotification";
import axios from "axios";
import { useState } from "react";

interface InputValues {
    login: string;
    password: string;
}

export const LoginPage = () => {
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { contextHolder, openNotification } = useInitNotification();

    const onFinish = async (values: InputValues) => {
        setIsLoading(true);
        try {
            const tokens = await login(values);
            dispatch(setToken(tokens.accessToken));
            const refreshTokenStorage = new RefreshTokenStorage(
                tokens.refreshToken
            );
            refreshTokenStorage.setToken();
            navigate("/");
        } catch (error) {
            console.error("Ошибка входа:", error);
            if (axios.isAxiosError(error)) {
                const errorDescription =
                    error.status === 401
                        ? "Неверный логин или пароль"
                        : "Произошла ошибка при входе. Пожалуйста, попробуйте позже.";
                openNotification({
                    message: "Ошибка",
                    component: <FrownOutlined style={{ color: "#ff0e0e" }} />,
                    description: errorDescription,
                    placement: "topRight",
                });
            }
        }
        setIsLoading(false);
    };

    return (
        <>
            {contextHolder}
            <Typography.Title
                level={2}
                style={{ margin: "15px 0", textAlign: "center" }}
            >
                Войдите в свой аккаунт
            </Typography.Title>
            <Form
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                    width: "100%",
                }}
                onFinish={onFinish}
            >
                <Form.Item
                    label="Логин"
                    name="login"
                    layout="vertical"
                    hasFeedback
                >
                    <Input
                        prefix={<UserOutlined />}
                        placeholder="Введите логин"
                    />
                </Form.Item>
                <Form.Item
                    label="Пароль"
                    name="password"
                    layout="vertical"
                    hasFeedback
                >
                    <Input.Password
                        prefix={<LockOutlined />}
                        placeholder="Введите пароль"
                    />
                </Form.Item>
                <Typography.Text style={{ textAlign: "right" }}>
                    Забыли пароль? <Link to={"/"}>Восстановите</Link>
                </Typography.Text>
                <Form.Item>
                    <Button
                        color="primary"
                        variant="solid"
                        htmlType="submit"
                        style={{ width: "100%" }}
                        loading={isLoading}
                    >
                        Войти
                    </Button>
                </Form.Item>
            </Form>
            <Typography.Text style={{ textAlign: "right" }}>
                Еще не зарегистрированы?{" "}
                <Link to={"/auth/registration"}>Создайте аккаунт</Link>
            </Typography.Text>
        </>
    );
};
