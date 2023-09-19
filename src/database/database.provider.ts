import { User } from 'src/user/user.entity';
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'myntra',
        // entities: ['dist/**/*.entity{.ts,.js}'],
        entities: [User],
        synchronize: true,
        logging: true,
      });
      return dataSource.initialize();
    },
  },
];
