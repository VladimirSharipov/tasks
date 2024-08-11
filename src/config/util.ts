import { HttpStatus, ValidationPipe } from '@nestjs/common';

const PASSWORD_RULE = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

const PASSWORD_RULE_MESSAGE =
    'Пароль должен состоять минимум из 8 символов, 1 прописной и строчной буквы, цифры и специального символа.';

const EMAIL_RULE_MESSAGE = `Электронная почта должна быть длиной не менее 5 символов.`
const EMAIL_RULE_MESSAGE_LENGTH = `5`


const VALIDATION_PIPE = new ValidationPipe({
    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
});

export const REGEX = {
    PASSWORD_RULE,
};

export const MESSAGES = {
    PASSWORD_RULE_MESSAGE,
    EMAIL_RULE_MESSAGE,
    EMAIL_RULE_MESSAGE_LENGTH,
};

export const SETTINGS = {
    VALIDATION_PIPE,
};

export const PROJECT_RULE_LENGTH = `Длина названия проекта должна быть не менее 4 и не более 150 символов`;
export const STATUS_RULE_LENGTH = `Длина названия статуса задачи должна быть не менее 4 и не более 150 символов`;
export const TASK_RULE_LENGTH = `Длина названия задачи должна быть не менее 5 и не более 150 символов`;
export const REFRESH_TOKEN_NAME = process.env.REFRESH_TOKEN_NAME;
export const ACCESS_JWT_EXPIRATION_TIME = process.env.ACCESS_JWT_EXPIRATION_TIME
export const REFRESH_JWT_EXPIRATION_TIME = process.env.REFRESH_JWT_EXPIRATION_TIME
export const RULE_MESSAGE = process.env.RULE_MESSAGE
export const RULE_MESSAGE_LENGTH = process.env.RULE_MESSAGE_LENGTH