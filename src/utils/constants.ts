export const minLengthInputValues = {
    one: 1,
    two: 2,
    six: 6,
};
export const maxLengthInputValues = {
    sixty: 60,
    sixtyFour: 64,
};

export const usernameRules = [
    {
        required: true,
        message: "Поле обязательно для заполнения",
    },
    {
        pattern: /^[A-Za-zА-Яа-яЁё]+$/,
        message: "Поле можно ввести либо на русском или на латинском алфавите",
    },
    {
        min: minLengthInputValues.one,
        message: `Минимальная длина ${minLengthInputValues.one} символ`,
    },
    {
        max: maxLengthInputValues.sixty,
        message: `Максимальная длина ${maxLengthInputValues.sixty} символов`,
    },
];

export const emailRules = [
    {
        required: true,
        message: "Поле обязательно для заполнения",
    },
    {
        pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
        message: "Некорректно введена почта",
    },
];

export const phoneNumberRules = [
    {
        pattern: /^(\+7|8)?[\s-]?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/,
        message: "Некорректно введен номер телефона",
    },
];
