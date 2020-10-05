# COE_Project 
An educational cross platform application developed using react-native.
## Our App Execution stack (For Now)
### app.js -> stackNavigatior.js -> LoginScreen.js -> DepartmentScreen.js
## General Instructions
1. If you are adding a new screen , put your screen.js file in /screen directory and update the stackNavigatior.js file.
2. If you are adding a component or supporting function file ,place it in the /component directory.
3. For adding multimedia resources like images ,icons,fonts ,place it in the asset diretory.
4. Try not make any changes to app.js.(For Now)
5. Always make a pull request ,even if it's a small feature, to avoid merger conflict
6. **Always Update your local repository before adding any new code by following step 3**
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
2. Clone your fork:
    `git clone https://github.com/YOUR-USERNAME/COE_Project.git`
3. **Add remote from original repository in your forked repository :** 
    * `cd into project root folder`
    * `git remote add upstream https://github.com/DCSA-Devs/COE_Project.git`
4. Run `npm install` to install all dependency.
5. Do the neccessary changes
6. **DO `npm start` Check the applicatin has no errors and is running fine.**
7. If app running fine then , Add the changes using `git add .` command
8. commit the changes using  `git commit -m 'Your message'`
9. Push the changes to your forked repo using `git push` commmand
10. Now compare and create a pull request using **github.com ,Ensure ther is no merge conflict**
### Step 3 Upating the your local repository with the main repository
1. `git fetch`
2. `git fetch upstream` :It will show changes others team member has done
3. `git merge upstream/master` :It will merge changes,your work will not be deleted but merge conflict may arise
4. Optional : `git pull upstream master` :Do this if you not able to solve merge-conflict **It will delete the changes you previously made,therefore it is recomended to follow step 3 before adding any new feature**
5. **Now you can repeat the step 2,  point 4 to point 8 to contribute further**
## Running the program
1. After cloning the repository goto project root & run command `npm install` 
2. This will download all the required npm modules (make sure you are connected to internet)
3. Finally run `node app.js` or `npm start` to run the application

During the development period the website will be deployed/updated at **https://coeproject.herokuapp.com/**

## Still Confused 😕?
This article will help you understand git concepts. Click [here](https://dev.to/unseenwizzard/learn-git-concepts-not-commands-4gjc)
