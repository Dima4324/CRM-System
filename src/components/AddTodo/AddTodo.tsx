import { Form, Button, Input, notification } from "antd";
import { FC, useState } from "react";
import { addTodo } from "../../api/todos";
import {
    maxLengthInputValue,
    minLengthInputValue,
} from "../../utils/constants";
import { valuesInputForm } from "../../types/todos";
import { FrownOutlined } from "@ant-design/icons";
import axios from "axios";

interface AddTodoProps {
    updateTodos: () => Promise<void>;
}

const formConfig = {
    style: { width: "100%", justifyContent: "center", margin: "20px 0" },
};

const formItemConfig = {
    validateTrigger: "onSubmit",
    style: { width: "50%" },
    rules: [
        { required: true, message: "Поле не должно быть пустым" },
        {
            min: minLengthInputValue,
            message: `Минимальная длина ${minLengthInputValue} символа`,
        },
        {
            max: maxLengthInputValue,
            message: `Максимальная длина ${maxLengthInputValue} символа`,
        },
    ],
};

export const AddTodo: FC<AddTodoProps> = ({ updateTodos }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [form] = Form.useForm();

    const [api, contextHolder] = notification.useNotification();

    const openNotification = (errorType: string, errorMessage: string) => {
        api.error({
            message: errorType,
            description: errorMessage,
            icon: <FrownOutlined style={{ color: "#ff0e0e" }} />,
        });
    };

    const handleAddTodo = async (values: valuesInputForm) => {
        try {
            setIsLoading(true);

            const bodyRequest = {
                title: values.title,
                isDone: false,
            };

            await addTodo(bodyRequest);
            await updateTodos();
            form.resetFields()
        } catch (error) {
            if (axios.isAxiosError(error)) {
                openNotification("Ошибка", error.message);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {contextHolder}
            <Form form={form} layout="inline" onFinish={handleAddTodo} {...formConfig}>
                <Form.Item name="title" {...formItemConfig}>
                    <Input
                        placeholder="Введите задачу..."
                        variant="underlined"
                        style={{ backgroundColor: "inherit" }}
                        showCount
                    />
                </Form.Item>
                <Form.Item>
                    <Button
                        color="primary"
                        variant="solid"
                        htmlType="submit"
                        disabled={isLoading}
                    >
                        Добавить
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};
