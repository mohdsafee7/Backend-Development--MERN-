require('dotenv/config');
const { defineConfig } = require('drizzle-kit');

const config = defineConfig({
  out: './drizzle',
  schema: './models/index.js',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});

module.exports = config;


/*
The `drizzle.config.js` file is used to configure the Drizzle ORM for your application. Here's an explanation of each word in the configuration:

- `defineConfig`: This is a function provided by the `drizzle-kit` package that allows you to define the configuration for your Drizzle ORM.

- `out`: This option specifies the output directory where the generated SQL files will be saved. In this case, it's set to `'./drizzle'`, which means the SQL files will be saved in the `drizzle` directory relative to the location of the `drizzle.config.js` file.

- `schema`: This option specifies the path to the schema file that defines the database schema for your application. In this case, it's set to `'./models/index.js'`, which means the schema file is located in the `models` directory and is named `index.js`.

- `dialect`: This option specifies the database dialect that Drizzle should use. In this case, it's set to `'postgresql'`, which means Drizzle will use the PostgreSQL dialect.

- `dbCredentials`: This option specifies the credentials for connecting to the database. In this case, it's using the `DATABASE_URL` environment variable to get the database URL. The `DATABASE_URL` should be set to a valid PostgreSQL connection URL, which typically includes the username, password, host, port, and database name.

So, in summary, the `drizzle.config.js` file is used to configure the Drizzle ORM with the desired output directory, schema file, database dialect, and database connection credentials.

*/
