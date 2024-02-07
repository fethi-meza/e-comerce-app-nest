import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

config();
//connction of dataBased
export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [],
  migrations: [],
  logging: false,
  synchronize: true,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
