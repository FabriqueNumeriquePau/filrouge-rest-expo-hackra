import dotenv from 'dotenv';

const dotenvConf = dotenv.config({
    path: '.env'
});

console.log(dotenvConf);

if (dotenvConf.error) {
    throw new Error(dotenvConf?.error.message);
}

export const environment = {
    HOST_DB: process.env.HOST_DB,
    PORT_DB: process.env.PORT_DB,
    USER_DB: process.env.USER_DB,
    USER_PASSWORD: process.env.USER_PASSWORD,
    DB_NAME: process.env.DB_NAME
};