import { initProduct } from '@/models/Product.model';
import { initUser } from '@/models/User.model';
import { Sequelize } from 'sequelize';
import pg from 'pg';

const { 
  NEXT_PUBLIC_END_ENV,
  NEXT_PUBLIC_DB_PASS, 
  NEXT_PUBLIC_DB_USER, 
  NEXT_PUBLIC_DB_HOST,
  NEXT_PUBLIC_DB_PORT,
} = process.env;

let sequelize: Sequelize | null = null;
const isProduction = NEXT_PUBLIC_END_ENV === 'production';

async function initializeDatabase() {
  if (sequelize) return sequelize; 

  sequelize = new Sequelize(`postgresql://${NEXT_PUBLIC_DB_USER}:${NEXT_PUBLIC_DB_PASS}@${NEXT_PUBLIC_DB_HOST}:${NEXT_PUBLIC_DB_PORT}/postgres`, 
    {
      dialect: 'postgres',
      logging: false, 
      dialectModule: pg, 
    });

  try {
    await sequelize.authenticate();
    console.log('Connected to PostgreSQL ✅');

    initUser(sequelize);
    initProduct(sequelize);

    if (!isProduction) await sequelize.sync({ alter: true });
    console.log('Database & tables Sync ✅');
  } catch (error) {
    console.error('Database initialization failed ❌:', error); throw error;
  }
  return sequelize;
}

export default async function getPool() {
  return await initializeDatabase();
}