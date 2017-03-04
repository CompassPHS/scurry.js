# shuttle.js

## Deploying Jobs ##
Put new shuttle.js job into the _jobs_ directory.

## Docker Setup ##

### ENV Definitions ###

- `SHUTTLE_JOBS_DIR` is the local directory holding your shuttle jobs

### Docker Compose ###

#### Commandline Example ###

`docker-compose run -e SHUTTLE_JOBS_DIR="./jobs" shuttle`