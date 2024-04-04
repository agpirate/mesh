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


#create github_folder(workspace)_repository
#install git_tools on localsystem (intialized)
#git init (git status)

#1] tell what to push(into repo)..which is all the folder_in here
#git add .  (push all this_folder_file).. if ignoregit(add blacklist)
#2] and commit the push_changing..apply the push
#git commit 

#3]...here is the github_repository(store).. i need to push(the commite_changes(folders))
#git remote add origin https://github..../agpirate/itserive.git
#4] finally change the commit into the destination git_url of given branch(master default)
#git push origin master  

#git checkout -b itservice(create new_branck other than_main/master)


#ctl+shift+p ( create (nodejs+mongodb dev container on workspace/project_directory))
#rebuild the container(the node++ are to be installed_over_the workspace>>)
#&install the quasar and create new_project(with it's own directory)

#then you can ( clone it into git_connected_vs_code....as workspace/project_dire/quasar_dir)
#or from github page..goes to code and open on installed vscode ( then save it.......into local system & commit(push...next))
