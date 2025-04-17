import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../domain/user/entities/user.entity';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_DATABASE || 'kungfu_db',
  entities: [User],
  synchronize: process.env.NODE_ENV !== 'production', // Ne pas utiliser en production
  migrations: ['dist/migrations/*.js'],
}; 