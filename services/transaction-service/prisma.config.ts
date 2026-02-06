import { defineConfig } from 'prisma/config';
import {config} from  'dotenv'
config()
export default defineConfig({
  schema: 'src/infra/prisma/schema.prisma',

  datasource: {
    url: process.env.DATABASE_URL!,
  },
});
