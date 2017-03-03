# shuttle.js

## Deploying Jobs ##
Put new shuttle.js job into the _jobs_ directory.

## Docker Setup ##

The `.env` configutation file will hold all the environmental variables used by docker compose.

### ENV Definitions ###

- `SHUTTLE_JOBS_DIR` is the local directory holding your shuttle jobs
- `RABBITMQ_DEFAULT_USER` is the default [RabbitMQ](https://hub.docker.com/_/rabbitmq/) username to use 
- `RABBITMQ_DEFAULT_PASS` is the default [Rabbit MQ](https://hub.docker.com/_/rabbitmq/) password to use