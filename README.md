# C44 DIVA API
## Getting started
Please read first the [contribution guide](https://gitea.cstudio.ch/C44/diva-backend/src/branch/master/CONTRIBUTING.md).

## Initialize project
```bash
# install dependencies
yarn install

# create folder for sqlite db file
mkdir data

# create db
yarn db-init

# seed data
yarn db-seed

# start HAPI server
yarn start
```
