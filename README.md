# Digital Architecture Festival Game

## Introduction

Simple game to play with architecture's stack

## Dependencies

* nvm  with nodeJs & npm / yarn
* Firebase account
* Heroku Account

## Deploy to heroku

* Create account in heroku.com
* Insall heroku: npm i -g heroku
* Enter command: heroku login
* Run command: heroku git:remote -a NAME_APP
* Configure react buildpack in heroku site / app settings:
https://buildpack-registry.s3.amazonaws.com/buildpacks/mars/create-react-app.tgz
* Define environment variables in heroku site, app settings
* push: git push heroku BRANCH_ORIGEN:master
* Open app: https://arqme.herokuapp.com/


---

## References

* Environment: https://trekinbami.medium.com/using-environment-variables-in-react-6b0a99d83cf5
