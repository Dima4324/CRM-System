import { Roles } from "../types/admin";

export const checkFields = <T extends object>(currFieldsData: T, newFieldsData: T): Partial<T> => {
    const result: Partial<T> = {};

    (Object.keys(currFieldsData) as (keyof T)[]).forEach(field => {
        if (currFieldsData[field] !== newFieldsData[field] || !Object.prototype.hasOwnProperty.call(newFieldsData, field)) {
            result[field] = newFieldsData[field];
        }
    })

    return result;
}

export const colorRoleTagMap = {
    [Roles.ADMIN]: "blue",
    [Roles.MODERATOR]: "orange",
    [Roles.USER]: "purple",
}
