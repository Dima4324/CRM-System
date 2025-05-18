import { TodoInfo, TodosFilter } from "../../types/todos";
import { Tabs, TabsProps } from "antd";

interface TodosTypesProps {
    info: TodoInfo;
    filter: TodosFilter;
    handleFilterTodo: (filter: TodosFilter) => void;
}

export const TodosTypes: React.FC<TodosTypesProps> = ({
    info,
    handleFilterTodo,
}) => {
    const items: TabsProps["items"] = [
        {
            key: "all",
            label: `Все (${info.all})`,
        },
        {
            key: "inWork",
            label: `В работе (${info.inWork})`,
        },
        {
            key: "completed",
            label: `Сделано (${info.completed})`,
        },
    ];

    const handleTabChange = (activeKey: string): void => {
        handleFilterTodo(activeKey as TodosFilter);
    };

    return (
          <Tabs defaultActiveKey="all" size="large" items={items} onChange={handleTabChange} style={{ display: "flex", alignItems: "center" }}/>
    );
};