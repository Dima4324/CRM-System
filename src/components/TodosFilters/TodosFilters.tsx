import { TodoInfo, TodosFilter } from "../../types/todos";
import { Tabs, TabsProps } from "antd";

interface TodosTypesProps {
    info: TodoInfo;
    filter: TodosFilter;
    handleFilterTodo: (filter: TodosFilter) => void;
}

export const TodosFilters: React.FC<TodosTypesProps> = ({
    info,
    handleFilterTodo,
}) => {
    const items: TabsProps["items"] = [
        {
            key: TodosFilter.ALL,
            label: `Все (${info.all})`,
        },
        {
            key: TodosFilter.IN_WORK,
            label: `В работе (${info.inWork})`,
        },
        {
            key: TodosFilter.COMPLETED,
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