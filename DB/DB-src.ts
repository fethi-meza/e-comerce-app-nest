import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: '123456',
  database: 'App-E-comerce',
  entities: [],
  migrations: [],
  logging: false,
  synchronize: true,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
