# LikeIt

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



possible problem:
1
node got started in the background and app just keeps running
Find out node running in background
/sbin/pidof /home/yinanfang/webapps/likeit/bin/node
Let's say the process id is 16489
ps -p 16489
kill 16489
2
pm2 starts 2 likeit process and post-receive won't work
ssh in and do "pm2 delete likeit"
