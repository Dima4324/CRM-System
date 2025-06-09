import { TodoItem } from "../TodoItem/TodoItem";
import { Flex, List, Spin, Typography } from "antd";
import { Todo } from "../../types/todos";
import { Loading3QuartersOutlined } from "@ant-design/icons";

interface TodosListProps {
    updateTodos: () => Promise<void>;
    isLoading: boolean;
    todos: Todo[];
    editingTodoId: number | null; // обязательно!
    selectEditingTodo: (id: number | null) => void;
}

const flexConfig = {
    vertical: true,
    align: "center",
    justify: "center",
    gap: "20px",
};

export const TodosList: React.FC<TodosListProps> = ({
    updateTodos,
    isLoading,
    todos,
    selectEditingTodo,
    editingTodoId,
}) => {

    const handleSelectEditingId = (todoId: number): void => {
      selectEditingTodo(editingTodoId === todoId ? null : todoId);
    }

    return (
        <Flex {...flexConfig}>
            {isLoading ? (
                <Flex align="center" justify="center">
                    <Spin
                        indicator={<Loading3QuartersOutlined spin />}
                        size="large"
                    />
                </Flex>
            ) : todos && todos.length === 0 ? (
                <Typography.Title level={2}>Список задач пуст</Typography.Title>
            ) : (
                <List
                    dataSource={todos}
                    style={{ width: "57%", height: "100%" }}
                    renderItem={(todo) => (
                        <List.Item key={todo.id}>
                            <TodoItem
                                updateTodos={updateTodos}
                                todo={todo}
                                isEditing={editingTodoId === todo.id}
                                handleSelectEditingId={() => handleSelectEditingId(todo.id)}
                            />
                        </List.Item>
                    )}
                />
            )}
        </Flex>
    );
};
