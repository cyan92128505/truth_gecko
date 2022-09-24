import {DataSource} from 'typeorm';
import dataSourceOptions from '../data_source';

export const database = new DataSource(dataSourceOptions);

export default database;
