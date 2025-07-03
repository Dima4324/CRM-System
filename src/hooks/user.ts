import { Roles } from "../types/admin";
import { useAppSelector } from "./redux";

export const useHasRole = () => {
    const userRole = useAppSelector(
        (state) => state.profile.profileInfo?.roles
    );
    return (role: Roles): boolean => {
        if (userRole) {
            return userRole?.includes(role);
        } else {
            return false;
        }
    };
};
