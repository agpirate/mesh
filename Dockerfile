#sudo apt  install docker.io
#create ProjectFolder....$touch Gplant2 & 
#cd Gplant2
#copy all ssr and src-ssr file into Gplant2
#create makefile,ignorefile....and build_docker...
#--------------------

#ignorefile (setup IgnoreFile) creating the .dockerignore in the root directory of our project. (similar to gitignore file..used by git tool)
# touch .dockerignore    (and include inside)

#node_modules
#npm-debug.log
#.dockerignore
#.gitignore

#Dockerfile (setup DockerFile)
#--------------------

# we will use the latest version of node available from the Docker Hub.
FROM node:lts-buster-slim

#RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

# Create app directory, where your app will live its lifetime. 
#NNNNNNBBBBBBB::::---- ( this is not, same folder as the original_project to be imaged_)
WORKDIR /home/maqadev/itServices

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Installing the packages_libraries(inside package.json) while the image is building
# update dependencies and install curl
RUN apt-get update && apt-get install -y 

#RUN npm set progress=false \
#    && npm config set depth 0 \
#    && npm i install
RUN npm ci

# Bundle app source, i.e. copying all your required files for the app
# Note: files & folders inside .dockerignore will not be copied.
COPY . .

# update each dependency in package.json to the latest version
RUN npm install -g npm-check-updates \
    ncu -u \
    npm install \
    npm install express \
    npm install babel-cli \
    npm install babel-preset \
    npm install babel-preset-env


HEALTHCHECK CMD curl --fail http://localhost:3000 || exit 1  

# If you are building your code for production
#RUN npm ci --only=production

# The app binds to port 3000, so exposing port 3000 to be used by the docker network
EXPOSE 3000 
#Expose 9100 

# Runtime command to be executed when the container is launched
#CMD ["node", "app.js"]
#here since we using quasar_build(run env) 
CMD ["quasar","dev"] 
#,"-m","ssr"]  if quasar has build image (build/dist folder start..)

#run the docker first to build an image
#docker build  -t imageNameYGPPro .
#docker images //list the images we created 
#docker run -d -p 3000:9100 imageNameYGPPro //docker_Port ( 3000(browser) :-bindTo-: SSR_port ( 9100))
#docker ps //listing the process

#use git commands to fetch and commit of project activities into github
#--------------pm2 ls ; pm2 start "quasar dev -m ssr" ; pm2 stop/start "quasar    ...." ; or add pm2 to boot start....