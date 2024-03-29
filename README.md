
<h1 align="center">
    UFit
</h1>

<p align="center">
  <strong>A Weight Tracking Web App</strong>
</p>

<p align="center">
  <a href="https://github.com/facebook/react-native/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="React Native is released under the MIT license." />
  </a>
  </a>
  <a href="https://ci.appveyor.com/project/facebook/react-native/branch/master">
    <img src="https://ci.appveyor.com/api/projects/status/g8d58ipi3auqdtrk/branch/master?svg=true" alt="Current Appveyor build status." />
  </a>
  <a href="https://www.npmjs.org/package/react-native">
    <img src="https://badge.fury.io/js/react-native.svg" alt="Current npm package version." />
  </a>
  <a href="https://www.npmjs.org/package/react-native">
    <img src="https://badge.fury.io/js/react-native.svg" alt="Current node version." />
  </a>

</p>



The project **Ufit** is a weight tracking web app which helps users setting their goals for weight gain, lose and maintain. It provides the following features:
- **Goals.** Users can set their goals for weight gain, lose and maintain weight.
- **Daily Weight Logging.** User can log his daily weight.
- **Daily Food Logging.** User can log his daily intake.
- **Daily Exercise Logging.** User can log his daily exercise.
- **Weight Progress Visualization.** See his yearly weight progress.
-  **User Authentication.** The app provides basic authentication.

## Contents

- [dependencies](#-dependencies)
- [run the app](#-run-the-app)
- [project structure](#-project-structure)
- [License](#-license)


## 📋 Dependencies
- express:  "^4.17.1"
- multer: "^1.4.1"
- nodemon:  "^1.19.1"
- nunjucks:  "^3.2.0"
- sqlite3:  "^4.0.9"
- validator:  "^11.1.0"

All the dependencies are mentioned in [package.json]() file. You just have to run the following command.
```
$ npm i
```

## 🎉 Run the app 
1. Change the current working directory to the location where you want the cloned directory to be made.
	```
	$ git clone git@github.com:Tamnac/Folio3-Internship.git
	```
2. Change the directory to **backend**.
3. Install dependencies.
	```
	$ npm i
	```
4. run the server.
	```
	$ node app.js
	```
5. you can access the web app on **localhost:8000**

## 📖 Project Structure
- **Backend**
	- **middlewares**: Contains all middlewares 
	- **routes**: Contains all API routes (endpoints)
	- **static**: Contains all static files js, css and images in their respective folders.
		- **JS**: all fronted java script is separated out in this folder. 
			- **-Loggers**: files with this suffix contains Js of respective logger which is shown on the App's dashboard   
			- **Utils**: Contains API calls. 
	- **views**: contains all html pages and components in their respective folders.
	- **app**: app.js is the main node-express app
	- **utils** Contains common functions used in on server side (this file is different from the one in **static/js**)
- **Design**: Contains html pages which are designed in the design phase. 
- **Project Management**: Contains WBS
- **QA**: Contains QA related artifacts  



## 📄 License

Open source.

## Extra Links 
- github repo:  [https://github.com/Tamnac/Folio3-Internship](https://github.com/Tamnac/Folio3-Internship)
