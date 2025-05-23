import { useEffect } from "react";
import { AddTodo, TodosList, TodosFilters } from "../../components";
import { Typography } from "antd";
import { FrownOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getTodosAction } from "../../store/actions/todoActions";
import { useInitNotification } from "../../hooks/useNotification";

export const TodosPage = () => {
    const todos = useAppSelector(({ todo }) => todo.todos);
    const error = useAppSelector((state) => state.todo.error);
    const filter = useAppSelector((state) => state.todosPageSettings.filter);
    const editingTodosId = useAppSelector(
        (state) => state.todosPageSettings.editingTodosId
    );

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
        if (!editingTodosId.length) {
            interval = setInterval(() => {
                dispatch(getTodosAction(filter));
            }, 5000);
        }
        return () => {
            clearInterval(interval);
        };
    }, [dispatch, filter, editingTodosId]);

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
