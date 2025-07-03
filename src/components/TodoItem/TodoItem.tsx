import { deleteTodo, updateTodo } from "../../api/todos";
import { useState, useRef, useEffect } from "react";
import { Todo, TodoRequest, valuesInputForm } from "../../types/todos";
import {
    Checkbox,
    Input,
    Button,
    InputRef,
    Flex,
    Typography,
    Form,
    notification,
} from "antd";
import {
    EditOutlined,
    DeleteOutlined,
    CheckOutlined,
    CloseOutlined,
    FrownOutlined,
} from "@ant-design/icons";
import { maxLengthInputValues, minLengthInputValues } from "../../utils/constants";
import axios from "axios";

interface TodoItemProps {
    updateTodos: () => Promise<void>;
    todo: Todo;
    isEditing: boolean;
    handleSelectEditingId: () => void;
}

const todoItemConfig = {
    style: {
        width: "100%",
        height: "100%",
        backgroundColor: "#fff",
        padding: "20px 10px",
        borderRadius: "12px",
        boxShadow: "0 0.4px 3px 1px rgba(34, 60, 80, 0.2)",
    },
};

const formItemConfig = {
    validateTrigger: "onSubmit",
    style: { width: "90%", margin: "0 16px 0 0" },
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

export const TodoItem: React.FC<TodoItemProps> = ({ updateTodos, todo, handleSelectEditingId, isEditing }) => {
    const [isChecked, setIsChecked] = useState(todo.isDone);
    const [isLoading, setIsLoading] = useState(false);

    const inputRef = useRef<InputRef>(null);

    const [api, contextHolder] = notification.useNotification();

    const openNotification = (errorType: string, errorMessage: string) => {
        api.error({
            message: errorType,
            description: errorMessage,
            icon: <FrownOutlined style={{ color: "#ff0e0e" }} />,
        });
    };

    const handleDeleteTodo = async (): Promise<void> => {
        try {
            setIsLoading(true);

            await deleteTodo(todo.id);
            await updateTodos();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                openNotification("Ошибка", error.message);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleCheckbox = async (): Promise<void> => {
        try {
            setIsLoading(true);

            const bodyRequest: TodoRequest = {
                isDone: !isChecked,
            };

            await updateTodo(todo.id, bodyRequest);
            await updateTodos();

            setIsChecked(!isChecked);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                openNotification("Ошибка", error.message);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleConfirmEditTodo = async (
        values: valuesInputForm
    ): Promise<void> => {
        try {
            setIsLoading(true);

            const bodyRequest: TodoRequest = {
                title: values.title,
            };

            await updateTodo(todo.id, bodyRequest);
            await updateTodos();

            handleSelectEditingId();

            setIsLoading(false);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                openNotification("Ошибка", error.message);
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isEditing) {
            inputRef.current?.focus();
        }
    }, [isEditing]);

    return (
        <>
            {contextHolder}
            <Flex justify="space-between" align="center" {...todoItemConfig}>
                <Flex justify="flex-start" align="center" gap="10px" flex={1}>
                    <Checkbox onChange={handleCheckbox} checked={isChecked} disabled={isLoading}/>
                    {isEditing ? (
                        <>
                            <Form
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    flex: 1,
                                }}
                                onFinish={handleConfirmEditTodo}
                                initialValues={{ title: todo.title }}
                            >
                                <Form.Item name="title" {...formItemConfig}>
                                    <Input
                                        variant="underlined"
                                        ref={inputRef}
                                        placeholder="Редактируйте задачу..."
                                        showCount
                                    />
                                </Form.Item>
                                <Flex justify="flex-end" gap={16}>
                                    <Form.Item style={{ margin: "0" }}>
                                        <Button
                                            htmlType="submit"
                                            size="large"
                                            type="primary"
                                            icon={<CheckOutlined />}
                                            disabled={isLoading}
                                        />
                                    </Form.Item>
                                    <Button
                                        size="large"
                                        color="danger"
                                        variant="solid"
                                        icon={<CloseOutlined />}
                                        onClick={handleSelectEditingId}
                                        disabled={isLoading}
                                    />
                                </Flex>
                            </Form>
                        </>
                    ) : (
                        <>
                            <Typography.Text
                                delete={isChecked}
                                type={isChecked ? "secondary" : undefined}
                                style={{ flex: 1 }}
                            >
                                {todo.title}
                            </Typography.Text>
                            <Flex gap={16}>
                                <Button
                                    size="large"
                                    type="primary"
                                    icon={<EditOutlined />}
                                    onClick={handleSelectEditingId}
                                    disabled={isLoading}
                                />
                                <Button
                                    size="large"
                                    color="danger"
                                    variant="solid"
                                    icon={<DeleteOutlined />}
                                    onClick={handleDeleteTodo}
                                    disabled={isLoading}
                                />
                            </Flex>
                        </>
                    )}
                </Flex>
            </Flex>
        </>
    );
};