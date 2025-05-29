import { useEffect } from "react";
import { AddTodo, TodosList, TodosFilters } from "../../components";
import { Typography } from "antd";
import { FrownOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getTodosAction } from "../../store/actions/todoActions";
import { useInitNotification } from "../../hooks/useNotification";

export const TodosPage = () => {
    const todos = useAppSelector(({ todo }) => todo.todos);
    const error = useAppSelector(({todo}) => todo.error);
    const isLoading = useAppSelector(({todo}) => todo.isLoading);
    const filter = useAppSelector(({todosPageSettings}) => todosPageSettings.filter);
    const editingTodosId = useAppSelector(({todosPageSettings}) => todosPageSettings.editingTodosId);

    const dispatch = useAppDispatch();

    const { openNotification, contextHolder } = useInitNotification();

    useEffect(() => {
        dispatch(getTodosAction(filter));
    }, [filter, dispatch]);

    useEffect(() => {
        if (error) {
            openNotification({
                message: "Ошибка",
                component: <FrownOutlined style={{ color: "#ff0e0e" }} />,
                description: error,
            });
        }
    }, [error, openNotification]);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (!editingTodosId.length && !isLoading) {
            interval = setInterval(() => {
                dispatch(getTodosAction(filter));
            }, 5000);
        }
        return () => {
            clearInterval(interval);
        };
    }, [dispatch, filter, editingTodosId, isLoading]);

    return (
        <>
            {contextHolder}
            <main>
                <Typography.Title level={2} style={{ textAlign: "center" }}>
                    Список задач
                </Typography.Title>
                <AddTodo />
                <TodosFilters />
                <TodosList todos={todos} />
            </main>
        </>
    );
};
