import {
    CheckCircleFilled,
    FrownOutlined,
    LockOutlined,
    MailOutlined,
    PhoneOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Typography } from "antd";
import { Link } from "react-router-dom";
import {
    maxLengthInputValues,
    minLengthInputValues,
} from "../../utils/constants";
import { UserRegistration } from "../../types/users";
import { register } from "../../api/todos";
import { useInitNotification } from "../../hooks/useNotification";
import axios from "axios";
import { useState } from "react";

interface InputValues {
    username: string;
    login: string;
    password: string;
    repeatPassword: string;
    email: string;
    phoneNumber?: string;
}

export const RegisterPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { contextHolder, openNotification } = useInitNotification();

    const onFinish = async (values: InputValues): Promise<void> => {
        const { username, login, password, email, phoneNumber } = values;
        const userData: UserRegistration = {
            username,
            login,
            password,
            email,
            phoneNumber,
        };
        setIsLoading(true);
        try {
            await register(userData);
            openNotification({
                message: "Успешная регистрация",
                component: <CheckCircleFilled style={{ color: "green" }} />,
                description: (
                    <>
                        Для входа перейдите на страницу{" "}
                        <Link to={"/auth/login"}>авторизации</Link>
                    </>
                ),
                placement: "topRight",
                showProgress: true,
                pauseOnHover: true,
            });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                let errorDescription;
                if (error.status === 409) {
                    errorDescription =
                        "Пользователь с таким логином или почтой уже существует";
                } else {
                    errorDescription = error.message;
                }
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
                Создайте аккаунт
            </Typography.Title>
            <Form
                layout="vertical"
                style={{ width: "100%" }}
                onFinish={onFinish}
            >
                <Form.Item
                    label="Имя пользователя"
                    name="username"
                    layout="vertical"
                    rules={[
                        {
                            required: true,
                            message: "Поле обязательно для заполнения",
                        },
                        {
                            pattern: /^[A-Za-zА-Яа-яЁё]+$/,
                            message:
                                "Поле можно ввести либо на русском или на латинском алфавите",
                        },
                        {
                            min: minLengthInputValues.one,
                            message: `Минимальная длина ${minLengthInputValues.one} символ`,
                        },
                        {
                            max: maxLengthInputValues.sixty,
                            message: `Максимальная длина ${maxLengthInputValues.sixty} символов`,
                        },
                    ]}
                    hasFeedback
                >
                    <Input
                        prefix={<UserOutlined />}
                        placeholder="Введите имя пользователя"
                    />
                </Form.Item>
                <Form.Item
                    label="Логин"
                    name="login"
                    layout="vertical"
                    rules={[
                        {
                            required: true,
                            message: "Поле обязательно для заполнения",
                        },
                        {
                            pattern: /^[A-Za-z][A-Za-z0-9]*$/,
                            message:
                                "Поле можно ввести только на латинском алфавите",
                        },
                        {
                            min: minLengthInputValues.two,
                            message: `Минимальная длина ${minLengthInputValues.two} символа`,
                        },
                        {
                            max: maxLengthInputValues.sixty,
                            message: `Максимальная длина ${maxLengthInputValues.sixty} символов`,
                        },
                    ]}
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
                    rules={[
                        {
                            required: true,
                            message: "Поле обязательно для заполнения",
                        },
                        {
                            min: minLengthInputValues.six,
                            message: `Минимальная длина ${minLengthInputValues.six} символов`,
                        },
                        {
                            max: maxLengthInputValues.sixty,
                            message: `Максимальная длина ${maxLengthInputValues.sixty} символов`,
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password
                        prefix={<LockOutlined />}
                        placeholder="Введите пароль"
                    />
                </Form.Item>
                <Form.Item
                    label="Повторите пароль"
                    name="repeatPassword"
                    layout="vertical"
                    dependencies={["password"]}
                    rules={[
                        {
                            required: true,
                            message: "Поле обязательно для заполнения",
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (
                                    !value ||
                                    getFieldValue("password") === value
                                ) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    new Error("Пароли не совпадают")
                                );
                            },
                        }),
                    ]}
                    hasFeedback
                >
                    <Input.Password
                        prefix={<LockOutlined />}
                        placeholder="Повторите пароль"
                    />
                </Form.Item>
                <Form.Item
                    label="Почтовый адрес"
                    name="email"
                    layout="vertical"
                    rules={[
                        {
                            required: true,
                            message: "Поле обязательно для заполнения",
                        },
                        {
                            pattern:
                                /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                            message: "Некорректно введена почта",
                        },
                    ]}
                    hasFeedback
                >
                    <Input
                        prefix={<MailOutlined />}
                        placeholder="Введите почту"
                    />
                </Form.Item>
                <Form.Item
                    label="Телефон"
                    name="phoneNumber"
                    layout="vertical"
                    rules={[
                        {
                            pattern:
                                /^(\+7|8)?[\s-]?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/,
                            message: "Некорректно введен номер телефона",
                        },
                    ]}
                    hasFeedback
                >
                    <Input prefix={<PhoneOutlined />} placeholder="+7 XXX XXX XX XX" />
                </Form.Item>
                <Form.Item style={{ marginTop: "10px" }}>
                    <Button
                        color="primary"
                        variant="solid"
                        htmlType="submit"
                        style={{ width: "100%" }}
                        loading={isLoading}
                    >
                        Зарегистрироваться
                    </Button>
                </Form.Item>
            </Form>
            <Typography.Text style={{ textAlign: "right" }}>
                Уже зарегистрированы?{" "}
                <Link to={"/auth/login"}>Войдите в аккаунт</Link>
            </Typography.Text>
        </>
    );
};
