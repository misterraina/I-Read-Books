import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import pg from 'pg'

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_LINK, {
      dialect: 'postgres', 
      logging:false, // Logs queries in non-production environments
      dialectModule: pg
    } ) 

export default sequelize;


