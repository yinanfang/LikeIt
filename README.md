# LikeIt

[![license:mit](https://img.shields.io/badge/license-mit-green.svg)](#license)<br>
[![Build Status](https://travis-ci.org/yinanfang/LikeIt.png?branch=master)](https://travis-ci.org/yinanfang/LikeIt)
[![Code Climate](https://codeclimate.com/github/yinanfang/LikeIt/badges/gpa.svg)](https://codeclimate.com/github/yinanfang/LikeIt)
[![Test Coverage](https://codeclimate.com/github/yinanfang/LikeIt/badges/coverage.svg)](https://codeclimate.com/github/yinanfang/LikeIt/coverage)<br>
[![Dependency Status](https://david-dm.org/yinanfang/LikeIt.svg)](https://david-dm.org/yinanfang/LikeIt)
[![Join the chat at https://gitter.im/yinanfang/LikeIt](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/yinanfang/LikeIt?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)


## Features

  - Version controled with Git
  - Continuous Integration Testing with Travis CI
    - Modules and front-end testing with Karma and Jasmine
    - Server API testing with jasmine-node and Frisby
  - Automatic deployment with git hooks
    - post-receive script deploy app on push and restart server
  - Monitor app status with PM2
  - Logging with winston console logger and file logger (in JSON)
    - Ease for reading on console and extraction on files
  - Authentication with JWT because
    - [Cookies are bad for you](http://sitr.us/2011/08/26/cookies-are-bad-for-you.html)
    - [Difference between JWT and Cookie](https://stormpath.com/blog/where-to-store-your-jwts-cookies-vs-html5-web-storage/)
  - Test
    - Cover Coverage with Istanbul: [Tutorial](http://ariya.ofilabs.com/2013/10/code-coverage-of-jasmine-tests-using-istanbul-and-karma.html)

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




To-do

exstract server start delay to config

pm2 start with json add log files for output and errors.
Add comment to start, stop

Borrow login script form GC but with Sequalize
setup express, login.js with jsonwebtoken, simple webpage with handlebar. and database

Use pmx
  - monitor trafic: https://app.keymetrics.io/#/bucket/5644e8cdc0d152ac7f59a3aa/transactions
  - add custom actions: http://docs.keymetrics.io/docs/pages/custom-actions/
  - logs for
    - post-receive
    - npm install
    - update server
    - connect to loggly?

Add gulp-eslint

Exact token and credentials in config.js to a env file. Start node with env file. Don't commit env file

Badge to use

  - Sauce Labs
    - https://github.com/wycats/handlebars.js/
    - https://github.com/chaijs/chai
  - node-inspector
    - https://github.com/node-inspector/node-inspector
  - plato
    - Add it to gulp: https://github.com/sindresorhus/gulp-plato
    - Tutorial: http://ariya.ofilabs.com/2013/01/javascript-code-complexity-visualization.html

Find useful tools
  - https://www.airpair.com/node.js/posts/top-10-mistakes-node-developers-make

How to store JWT token in the browser
  - https://stormpath.com/blog/where-to-store-your-jwts-cookies-vs-html5-web-storage/
  - http://security.stackexchange.com/questions/87130/json-web-tokens-how-to-securely-store-the-key
  - https://stormpath.com/blog/build-secure-user-interfaces-using-jwts/
  - https://blog.prevoty.com/does-jwt-put-your-web-app-at-risk
  - http://www.sitepoint.com/php-authorization-jwt-json-web-tokens/
  - https://github.com/dwyl/learn-json-web-tokens
  - http://stackoverflow.com/questions/27067251/where-to-store-jwt-in-browser-how-to-protect-against-csrf
  - https://auth0.com/blog/2014/01/27/ten-things-you-should-know-about-tokens-and-cookies/
Secure & HttpOnly Coockie
  - http://www.troyhunt.com/2013/03/c-is-for-cookie-h-is-for-hacker.html
  - https://www.learnallthenodes.com/episodes/35-protecting-against-csrf-attacks-in-node

  - use express-session & csurf for CSRF prevention
    - http://scottksmith.com/blog/2014/09/04/simple-steps-to-secure-your-express-node-application/
    - https://www.learnallthenodes.com/episodes/35-protecting-against-csrf-attacks-in-node

HTTPS server
  - webfation special: https://community.webfaction.com/questions/4915/https-site
    - guide: https://docs.webfaction.com/user-guide/websites.html#secure-sites-https
    - not match problem: https://community.webfaction.com/questions/17306/using-https-and-http-on-a-nodejs-server
  - node, both http & https: http://stackoverflow.com/questions/11744975/enabling-https-on-express-js
  - force https
    - http://stackoverflow.com/questions/7450940/automatic-https-connection-redirect-with-node-js-express
  － Javascript inline function: http://stackoverflow.com/questions/10238849/how-to-get-a-variable-out-of-an-inline-function

Instagram API
  - https://lob.com/blog/building-an-instagram-postcard-app-in-express-js/
  - http://www.9lessons.info/2012/05/login-with-instagram-php.html
  - https://instagram.com/developer/authentication/
  - https://github.com/totemstech/instagram-node
  - https://github.com/jaredhanson/passport-instagram

Large scale express app folder structure
  - https://gist.github.com/lancejpollard/1398757
  - http://stackoverflow.com/questions/5778245/expressjs-how-to-structure-an-application
  - https://www.terlici.com/2014/08/25/best-practices-express-structure.html

winston
  - no such file error.
    - doesn't check log but need to create a empty file?
    - in utils/logger.js check if a empty file exist and create one?

GC api structure
  - http://www.scriptscoop.net/t/4040f7d2bb7f/node.js-correct-modular-structure-of-nodejs-express-app-for-api.html
  - http://www.codekitchen.ca/guide-to-structuring-and-building-a-restful-api-using-express-4/
  - api/v1.0
    - gc
    - dbd
      - db.js
      - auth.js
      - list.js
  - utils
  - app
    - index.js
  - views
    - html

Express static files
  - http://expressjs.com/starter/static-files.html
    - server some static files behind auth?

post-receive problem
  - Can't do npm install on post-receive?
  - pm2 will be execute from git/LikeIt.git so express's views path will be wrong. How to pretend it's started from likeit/app?

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
