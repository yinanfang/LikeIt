# LikeIt

[![Build Status](https://travis-ci.org/yinanfang/LikeIt.png?branch=master)](https://travis-ci.org/yinanfang/LikeIt)

## Features

  - Version controled with Git
  - Continuous Integration Testing with Travis CI
    - Modules and front-end testing with Karma and Jasmine
    - Server API testing with jasmine-node and Frisby
  - Automatic deployment with git hooks
    - post-receive script deploy app on push and restart server
  - Monitor app status with PM2

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




To-do

Write up shining technologies

relative path problem

pm2 start with json add log files for output and errors.
Add comment to start, stop

Borrow login script form GC but with Sequalize
setup express, login.js with jsonwebtoken, simple webpage with handlebar. and database

Use pmx
  - monitor trafic: https://app.keymetrics.io/#/bucket/5644e8cdc0d152ac7f59a3aa/transactions
  - add custom actions: http://docs.keymetrics.io/docs/pages/custom-actions/

Note:
Update npm package.json with
  ncu -u


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

### Node search path
  - Relative Path Problem: Obtain file from topmost directory with "require.main.require". [Solution and Comparison](https://gist.github.com/branneman/8048520)
  - [How does node search for modules](http://www.bennadel.com/blog/2169-where-does-node-js-and-require-look-for-modules.htm)
