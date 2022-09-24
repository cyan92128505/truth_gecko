import {DataSource} from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

import dataSourceOptions from './data_source';

export default new DataSource(dataSourceOptions);
