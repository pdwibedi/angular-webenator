# angular-webenator

## Angular JS Website Generator
This Webenator project is a seed for AngularJS applications. The project contains a sample AngularJS application and is pre-configured to install the Angular framework and a bunch of development codes for instant web development gratification.

This sample application is intended to be useful as both a learning tool and a skeleton application for a typical AngularJS web app: comprised of a Side navigation area and a content area. You can use it to quickly bootstrap your AngularJS webapp projects and dev environment for these projects. 

## Getting Started
---
### Prerequisites
You will need git to clone the angular-webenator repository. You can get git from http://git-scm.com/.

We also use a number of node.js tools to initialize and test material-start. You must have node.js and its package manager (npm) installed. You can get them from http://nodejs.org/.

### Clone angular-webenator
To get you started you can simply clone master branch from the Angular-webenator repository and install the dependencies:

Clone the material-start repository using git:

    git clone https://github.com/pdwibedi/angular-webenator.git
    cd angular-webenator

## Install Dependencies
---
We have two kinds of dependencies in this project: tools and AngularJS framework code. The tools help us manage and test the application.

We get the tools we depend upon via npm, the node package manager.
We get the AngularJS code via bower, a client-side code package manager.
We have preconfigured npm to automatically run bower so we can simply do:

    npm install

## Run your app
The configurations are already specified as npm dependencies within package.json. Simply run these terminal commands:

    gulp

This will do the following things:

1. Runs JS Lint for all JS.
2. Builds all the JS and CSS and puts them to "build" folder under both dist/ and src/ folder.
3. Copy's all the template files and necessary JS dependencies to the appropriate destinations.
4. Runs server for localhost testing.


> Note: since live-server is working on port 8000, we configure the protractor.conf.js to use baseUrl: 
> 'http://localhost:8080'

## Directory Layout
---

    src/                    --> Source folder
      app/                  --> all app specific modules
         common/            --> Contains API, Models & Services
         directive/         --> All directives for the application
         edit/              --> Edit page template, and associated views
         login/             --> Login page template, and associated views
      assets/
         css/               --> Stylesheets
         fonts/             --> default font for app
         images/            
         json/              --> App & User specific JSON
         script/            --> Scripts
      vendor/               --> Third party JS files
    gulpfile.js             --> Package Manager for app
    package.json            --> Lists all dependencies
    README.md

## RoadMap
---

* Login user authentication to app.
* Addition of a new template for *"Carousel"*.
* Addition of a new template for *"Google Map"* with location edit. 
* Sorting of Menu Items from Left Panel.
* Contact Form Customization.
* File Upload using node.
* App test cases validation using *"karma"*.
* Theme setup.
* Viewport setup.
