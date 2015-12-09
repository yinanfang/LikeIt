# LikeIt

[![license:mit](https://img.shields.io/badge/license-mit-green.svg)](#license)<br>
[![Build Status](https://travis-ci.org/yinanfang/LikeIt.png?branch=master)](https://travis-ci.org/yinanfang/LikeIt)
[![Code Climate](https://codeclimate.com/github/yinanfang/LikeIt/badges/gpa.svg)](https://codeclimate.com/github/yinanfang/LikeIt)
[![Test Coverage](https://codeclimate.com/github/yinanfang/LikeIt/badges/coverage.svg)](https://codeclimate.com/github/yinanfang/LikeIt/coverage)<br>
[![Dependency Status](https://david-dm.org/yinanfang/LikeIt.svg)](https://david-dm.org/yinanfang/LikeIt)
[![Join the chat at https://gitter.im/yinanfang/LikeIt](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/yinanfang/LikeIt?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## About

LikeIt gives user easy access to purchase items appear in the photos under our account. A user simply need to like a photo on Instagram under our account and then he can browse through related items after loggin into our website. No registration needed!

## Architecture & Features

  - Node.js app with [express](https://github.com/strongloop/express) framework
    - Template engine with Handlebars.js
    - ORM Library with Sequalize
    - RESTful server-side API with express router
  - Build System
    - gulp with auto-watch and auto-restart function for dev
  - Test
    - Test with jasmine and Karma Runner
    - Cover Coverage with Istanbul: [Tutorial](http://ariya.ofilabs.com/2013/10/code-coverage-of-jasmine-tests-using-istanbul-and-karma.html)
  - Continuous Integration Testing with Travis CI
    - Modules and front-end testing with Karma and Jasmine
    - Server API testing with jasmine-node and Frisby  
  - Deployment
    - Auto-deployment with git hooks on git push
    - Auto-restart with post-receive script deploy app on receive
  - Version control
    - Git
  - Production
    - Live monitor for app status with PM2 and [Keymetrics](https://app.keymetrics.io/#/bucket/5644e8cdc0d152ac7f59a3aa/dashboard)
    - Logging with winston console logger and file logger (in JSON)
      - Ease for reading on console and extraction on files
      - Integration with [Loggly](https://yinanfang.loggly.com/search#terms=&from=2015-12-08T20%3A30%3A31.574Z&until=2015-12-09T20%3A30%3A31.574Z&source_group=) remote log service


## Database schema

Use of MySQL relational database on Webfaction

Table "User"

| Column Name     | Type      | Extra           |
| -------------   |:---------:| ---------------:|
| id              | int       | AUTO_INCREMENT  |
| username        | varchar   |                 |
| profilePicture  | varchar   |                 |
| token           | varchar   |                 |


## Best Practices

  - [Git commit message](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html)

## Wefaction & Github & Local setup guide. [Reference](https://www.jamestease.co.uk/blether/deploying-express-nodejs-app-to-webfaction-using-git-hooks) (Partially outdated)

Install Node.js 4.0.0 or the latest version using Control Panel
SSH into the server

    export PATH=$PATH:/home/yinanfang/webapps/likeit/bin
    npm install -g pm2

Notes:

  - echo $PATH should be: /usr/local/bin:/bin:/usr/bin:/usr/local/sbin:/usr/sbin:/sbin:/home/yinanfang/bin:/home/yinanfang/webapps/likeit/bin
  - Install modules globally so that there're symbolic links in /home/yinanfang/webapps/likeit/bin pointing to /home/yinanfang/webapps/likeit/lib/node_modules/

If Git Application doesn't exist, create it with [instruction](https://docs.webfaction.com/software/git.html) up to and including the "Creating a New Repository" section.

    cd /home/yinanfang/webapps/git/repos
    git init --bare LikeIt.git
    cd LikeIt.git/hooks
    cp /home/yinanfang/webapps/likeit/app/scripts/post-receive ./post-receive
    chmod +x ./post-receive

Copy start and stop script
    cd /home/yinanfang/webapps/likeit/app
    cp ./scripts/stop ../bin/stop
    cp ./scripts/start ../bin/start

Open anonymous read


Local setup with basic init or Github clone

    git init
    git add -A
    git commit -m "Basic barebones Express app"
    git remote add web yinanfang@yinanfang.webfactional.com:/home/yinanfang/webapps/git/repos/LikeIt.git
    git push web master

Link pm2 to Keymetrics

    pm2 link [public_key] [private_key] [machine_name]


## Notes / possible problems

### node got started in the background and app just keeps running
Find out node running in background
/sbin/pidof /home/yinanfang/webapps/likeit/bin/node
Let's say the process id is 16489
ps -p 16489
kill 16489

### Duplicate app record in pm2
pm2 starts 2 likeit process and post-receive won't work
ssh in and do "pm2 delete likeit"

### Dependency check
Update npm package.json with
  ncu -u

### Node search path
  - Relative Path Problem: Obtain file from topmost directory with "require.main.require". [Solution and Comparison](https://gist.github.com/branneman/8048520)
  - [How does node search for modules](http://www.bennadel.com/blog/2169-where-does-node-js-and-require-look-for-modules.htm)

### CodeClimate Pull Request Integration
  - http://docs.codeclimate.com/article/213-github-pull-request-integration

### jasmine-node simple GET request fails but works on browser
  - Adjust config.js restart delay
