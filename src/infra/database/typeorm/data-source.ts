import { DataSource, DataSourceOptions } from "typeorm";
import { testConnection, mysqlConnection } from "../connections";

const defineDataSourceOptions = (): DataSourceOptions => {
    const isTest = process.env.NODE_ENV === "test";
    return (isTest ? testConnection : mysqlConnection) as DataSourceOptions;
};
export const dateBaseSource = new DataSource(defineDataSourceOptions());