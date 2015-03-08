This is a sample Angular app that demonstrates ADAL JS & CORS support for select SharePoint Online & Office 365 APIs. The app is 100% client side (there is nothing to deploy) and thus you can run it under `localhost`.

About the Sample
----------------
This app is written in TypeScript. The only JavaScript committed to the repo is that within the two gulp files.

> The only JavaScript committed to the repo is related to gulp so you don't have to compile them from TS => JS just to run the gulp commands.

To run the app, you should have the following installed:
- **[Node.js](http://www.nodejs.org)** with NPM (included in default Node.js installs).
- **[Bower](http://www.bower.io)** which is used to acquire client-side packages. 
  Install using NPM:

  ````
  $ npm -g bower
  ````

- **[superstatic](http://www.npmjs.org/packages/superstatic)** which is used to host a static website locally. You don't need this if you have another way to do this (*like using WebMatrix or Visual Studio on Windows*).
  Install using NPM:

  ````
  $ npm -g superstatic
  ````


Run the Sample
--------------
First, it's assumed you have an Office 365 tenant & Azure subscription with an app created in Azure AD.

### Configure the Azure AD App for OAuth2 Implicit Flow
See this page for instructions on how to do this: [##########](##########)

### Download all External Dependencies
Download all the files needed to run this sample.

````
$ npm install
````

### Update App Settings
Open the **[src/app.constants.ts](src/app.constants.ts)** file & update all the settings & paths required.

### Compile the App
Because the app is written in TypeScript, you must compile it to JavaScript to run it. Do this by running a gulp task defined in the project's [gulpfile.js](gulpfile.js):

````
$ gulp compile-ts
````

### Run the App!
Simplest way to run the app is to use superstatic. Because it's installed globally, you can run from anywhere. However, make sure you run this form the root of this project, **adal-cors-client**.

````
$ ss --port 8000
````

Now you can test the app by navigating to **[http://localhost:8000](http://localhost:8000)**.

[![Analytics](https://ga-beacon.appspot.com/UA-59891462-1/sp-0365-rest/adal-cors-client)](https://github.com/igrigorik/ga-beacon)