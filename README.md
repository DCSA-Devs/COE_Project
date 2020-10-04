# COE_Project
An educational cross platform application developed using react-native.
## Our App Execution stack (For Now)
### app.js -> stackNavigatior.js -> LoginScreen.js -> DepartmentScreen.js
## Note:Follow the project structure
1. If you are adding a new screen , put your screen.js file in /screen directory and update the stackNavigatior.js file.
2. If you are adding a component or supporting function file ,place it in the /component directory.
3. For adding multimedia resources like images ,icons,fonts ,place it in the asset diretory.
4. Try not make any changes to app.js.(For Now)
## Required Software :
1. [Git](https://git-scm.com/)
2. [NodeJs](https://nodejs.org/en/)
3. A Code Editor e.g [VS Code](https://code.visualstudio.com/)

## Steps to contribute in this Project:
### Step 1 - Configure your git-scm
1. Open CMD/Terminal 
2. Windows user set :`git config --global core.autocrlf true`
3. Linux user set :`git config --global core.autocrlf input`
### Step 2 
1. Fork this repository as your own repo.
2. Clone the forked repo to your computer using `git clone 'url of your repo'`
3. Do the neccessary changes
4. Add the changes using `git add .` command
5. commit the changes using  `git commit -m 'Your message'`
6. Push the changes to your forked repo using `git push` commmand
7. Now compare and create a pull request using **github.com**

## Running the program
1. After cloning the repository run command `npm install`
2. This will download all the required npm modules (make sure you are connected to internet)
3. Finally run `node app.js` or `npm run start` to run the application
4. Your application will run at **http://localhost:3000/**

During the development period the website will be deployed/updated at **https://coeproject.herokuapp.com/**

## Still Confused 😕?
This article will help you understand git concepts. Click [here](https://dev.to/unseenwizzard/learn-git-concepts-not-commands-4gjc)
