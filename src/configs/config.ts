import dotenv from 'dotenv';


const dotenvConf = dotenv.config({
    path: process.env.NODE_ENV === 'production'
        ? '.env'
        : `.env.${process.env.NODE_ENV}`
});

if (dotenvConf.error) {
    throw new Error(dotenvConf.error.message);
}
export const environment = {
    HOST_DB: process.env.HOST_DB as string,
    PORT_DB: process.env.PORT_DB as string,
    USER_DB: process.env.USER_DB as string,
    PASSWORD_DB: process.env.PASSWORD_DB as string,
    DB_NAME: process.env.DB_NAME as string,
    JWT_SECRET: process.env.JWT_SECRET as string,
    JWT_EXPIRE: process.env.JWT_EXPIRE as string,
    API_HOST: process.env.API_HOST as string,
    API_PORT: parseInt(process.env.API_PORT as string, 10)
};