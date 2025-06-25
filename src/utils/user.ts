import { Roles } from "../types/admin";
import { Role } from "../types/users";

export const isAdmin = (roles: Role[]): boolean => {
    return roles.includes(Roles.ADMIN);
};

export const isModeretor = (roles: Role[]): boolean => {
    return roles.includes(Roles.MODERATOR);
};

export const returnRoleColor = (role: string) => {
    let color;
    switch (role) {
        case Roles.ADMIN:
            color = "blue";
            break;
        case Roles.MODERATOR:
            color = "orange";
            break;
        case Roles.USER:
            color = "purple";
            break;
        default:
            color = "magenta";
            break;
    }
    return color;
};
