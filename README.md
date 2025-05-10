# portfolio-server

A Node.js API to retrieve data from a MongoDB database and provide it to my Front-End React application.

## Environment Variables

`ACCESS_TOKEN_SECRET` - Used for JWT Auth

`REFRESH_TOKEN_SECRET` - Used for JWT Auth

`NODE_ENV` - Used to indicate environment the application is running in. (Ex. `production`, `staging`, `development`)

`CONNECTION_STRING` - Used to store the connection string for the MongoDB database. Make sure the connection string contains the db name as a path after the domain. (Ex: mongo-db-host.com/portfolio) Otherwise it will use the test DB by default and you may not be able to retrieve projects.

`PORT` - Used to indicate the port the server should listen on.

`API_KEY` - The secret key used to allow access to the server.

`CLIENT_URL` - The URL to the portfolio client / front-end. This will be used to configure CORS.
