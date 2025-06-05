import { useCallback, useEffect, useState } from "react";
import { AddTodo, TodosList, TodosFilters } from "../../components";
import { getTodos } from "../../api/todos";
import { Todo, TodoInfo, TodosFilter } from "../../types/todos";
import { Typography, notification } from "antd";
import { FrownOutlined } from "@ant-design/icons";
import axios from "axios";

export const TodosPage = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [info, setInfo] = useState<TodoInfo>({
        all: 0,
        completed: 0,
        inWork: 0,
    });
    const [filter, setFilter] = useState<TodosFilter>(TodosFilter.ALL);
    const [isLoading, setIsloading] = useState(false);
    const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    const [api, contextHolder] = notification.useNotification();

    const openNotification = useCallback(
        (errorType: string, errorMessage: string) => {
            api.error({
                message: errorType,
                description: errorMessage,
                icon: <FrownOutlined style={{ color: "#ff0e0e" }} />,
            });
        },
        [api]
    );

    const handleFilterTodo = (filter: TodosFilter): void => {
        setFilter(filter);
    };

    const toggleEditingId = (id: number | null) => {
        setEditingTodoId((prev) => {
            const nextId = prev === id ? null : id;
            setIsEditing(nextId !== null);
            return nextId;
        });
    };

    const updateTodos = useCallback(async (): Promise<void> => {
        try {
            setIsloading(true);

            const todos = await getTodos(filter);

            setTodos(todos.data);

            if (todos.info) {
                setInfo(todos.info);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                openNotification("Ошибка", error.message);
            }
        } finally {
            setIsloading(false);
        }
    }, [filter, openNotification]);

    useEffect(() => {
        updateTodos();
    }, [filter, updateTodos]);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (!isEditing) {
            interval = setInterval(() => {
                updateTodos();
            }, 5000);
        }

        return () => {
            clearInterval(interval);
        };
    }, [updateTodos, isEditing]);

    return (
        <>
            {contextHolder}
            <main>
                <Typography.Title level={2} style={{ textAlign: "center" }}>
                    Список задач
                </Typography.Title>
                <AddTodo updateTodos={updateTodos} />
                <TodosFilters
                    info={info}
                    filter={filter}
                    handleFilterTodo={handleFilterTodo}
                />
                <TodosList
                    updateTodos={updateTodos}
                    isLoading={isLoading}
                    todos={todos}
                    editingTodoId={editingTodoId}
                    toggleEditingId={toggleEditingId}
                />
            </main>
        </>
    );
};
