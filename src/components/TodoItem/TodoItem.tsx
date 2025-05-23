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
} from "antd";
import {
    EditOutlined,
    DeleteOutlined,
    CheckOutlined,
    CloseOutlined,
    CheckCircleFilled,
} from "@ant-design/icons";
import {
    maxLengthInputValues,
    minLengthInputValues,
} from "../../utils/constants";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
    deleteTodoAction,
    updateTodoAction,
} from "../../store/actions/todoActions";
import {
    addEditingId,
    removeEditingId,
} from "../../store/reducers/todos/todosPageSettingsSlice";
import { useInitNotification } from "../../hooks/useNotification";

interface TodoItemProps {
    todo: Todo;
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

export const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
    const isLoading = useAppSelector(({ todo }) => todo.isLoading);
    const editingTodosId = useAppSelector(
        ({ todosPageSettings }) => todosPageSettings.editingTodosId
    );
    const [isChecked, setIsChecked] = useState(todo.isDone);
    const inputRef = useRef<InputRef>(null);

    const { openNotification, contextHolder } = useInitNotification();

    const dispatch = useAppDispatch();

    const isEditing = editingTodosId.includes(todo.id);

    const handleToggleIsEditing = (): void => {
        if (isEditing) {
            dispatch(removeEditingId(todo.id));
        } else {
            dispatch(addEditingId(todo.id));
        }
    };

    const handleDeleteTodo = async (): Promise<void> => {
        try {
            await dispatch(deleteTodoAction(todo.id)).unwrap();
            openNotification({
                message: "Задача успешно изменена",
                component: <CheckCircleFilled style={{ color: "green" }} />,
            });
        } catch {
            //
        }
    };

    const handleCheckbox = async (): Promise<void> => {
        const bodyRequest: TodoRequest = {
            isDone: !isChecked,
        };
        try {
            await dispatch(
                updateTodoAction({ id: todo.id, bodyRequest })
            ).unwrap();
            openNotification({
                message: "Задача успешно изменена",
                component: <CheckCircleFilled style={{ color: "green" }} />,
            });
            setIsChecked(!isChecked);
        } catch {
            //
        }
    };

    const handleConfirmEditTodo = async (
        values: valuesInputForm
    ): Promise<void> => {
        const bodyRequest: TodoRequest = {
            title: values.title,
        };

        try {
            await dispatch(
                updateTodoAction({ id: todo.id, bodyRequest })
            ).unwrap();
            openNotification(
              {  message: "Задача успешно добавлена",
                component: <CheckCircleFilled style={{ color: "green" }} />}
            );
        } catch {
            //
        }

        handleToggleIsEditing();
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
                    <Checkbox
                        onChange={handleCheckbox}
                        checked={isChecked}
                        disabled={isLoading}
                    />
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
                                        onClick={handleToggleIsEditing}
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
                                    onClick={handleToggleIsEditing}
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
