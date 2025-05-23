import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { changeFilter } from "../../store/reducers/todos/todosPageSettingsSlice";
import { TodosFilter } from "../../types/todos";
import { Tabs, TabsProps } from "antd";

export const TodosFilters: React.FC = () => {
    const info = useAppSelector(state => state.todo.info)
    
    const dispatch = useAppDispatch();
    
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
        dispatch(changeFilter(activeKey as TodosFilter));
    };

    return (
          <Tabs defaultActiveKey="all" size="large" items={items} onChange={handleTabChange} style={{ display: "flex", alignItems: "center" }}/>
    );
};