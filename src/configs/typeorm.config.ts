import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'postgrss',
  host: 'localhost',
  port: 5432,
  username: '',
  password: '',
  database: '',
  entities: [__dirname + '/..**/*.entitiy.{js,ts}'],
  sycchronize: true.valueOf,
};
