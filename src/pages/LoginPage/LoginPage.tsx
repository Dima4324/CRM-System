import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Typography } from "antd";
import { Link } from "react-router-dom";

export const LoginPage = () => {
    return (
        <>
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
            >
                <Form.Item label="Логин" name="login" layout="vertical" hasFeedback>
                    <Input prefix={<UserOutlined />} placeholder="Введите логин"/>
                </Form.Item>
                <Form.Item label="Пароль" name="password" layout="vertical" hasFeedback>
                    <Input.Password prefix={<LockOutlined />} placeholder="Введите пароль"/>
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
