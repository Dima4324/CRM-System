import { Form, Button, Input, Space } from "antd";
import { FC, memo, useState } from "react";
import {
    maxLengthInputValues,
    minLengthInputValues,
} from "../../utils/constants";
import { TodoRequest, valuesInputForm } from "../../types/todos";

import { useAppDispatch } from "../../hooks/redux";
import { createTodoAction } from "../../store/actions/todoActions";
import { useInitNotification } from "../../hooks/useNotification";
import { CheckCircleFilled } from "@ant-design/icons";

const formConfig = {
    style: { width: "100%", margin: "20px 0" },
};

const formItemConfig = {
    validateTrigger: "onSubmit",
    style: { width: "50%", margin: "0" },
    rules: [
        { required: true, message: "Поле не должно быть пустым" },
        {
            min: minLengthInputValues.two,
            message: `Минимальная длина ${minLengthInputValues.two} символа`,
        },
        {
            max: maxLengthInputValues.sixtyFour,
            message: `Максимальная длина ${maxLengthInputValues.sixtyFour} символа`,
        },
    ],
};

export const AddTodo: FC = memo(() => {
    const [isLoading, setIsLoading] = useState(false);
    const [form] = Form.useForm();

    const dispatch = useAppDispatch();

    const { openNotification, contextHolder } = useInitNotification();

    const handleAddTodo = async (values: valuesInputForm) => {
        try {
            setIsLoading(true);
            const bodyRequest: TodoRequest = {
                title: values.title,
                isDone: false,
            };
            await dispatch(createTodoAction(bodyRequest)).unwrap();
            openNotification(
               { message: "Задача успешно добавлена",
                component: <CheckCircleFilled style={{ color: "green" }} />}
            );
            form.resetFields();
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
            //
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {contextHolder}
            <Form
                form={form}
                layout="inline"
                onFinish={handleAddTodo}
                {...formConfig}
            >
                    <Space.Compact style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                        <Form.Item name="title" {...formItemConfig}>
                            <Input
                                placeholder="Введите задачу..."
                                variant="underlined"
                                style={{ backgroundColor: "inherit", width: "100%" }}
                                showCount
                            />
                        </Form.Item>
                        <Form.Item style={{ margin: "0" }}>
                            <Button
                                color="primary"
                                variant="solid"
                                htmlType="submit"
                                disabled={isLoading}
                            >
                                Добавить
                            </Button>
                        </Form.Item>
                    </Space.Compact>
            </Form>
        </>
    );
});
