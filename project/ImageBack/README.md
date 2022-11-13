# ImageBack

This repo contains the source code and documentation of backend of portal for  managing the database using REST API's

[IWIZDOMBackend](https://github.com/ghagargunde/-RSquare-web-studio/tree/main/project/ImageBack)


## Getting started

### Prerequisites

1. Git
1. Node: any 12.x version starting with v12.0.0 or greater


### Installation

1. `cd Project` to go into the project root
1. `cd ImageBack to go into ImageBack folder`
1. `npm i` to install the  npm dependencies


### MongoDB Connection
- MongoDb is connected at port 27017 with collection image_store
-  MongoDb [installation](https://www.cloudbooklet.com/how-to-install-mongodb-on-ubuntu-22-04/) in ubantu

### Running locally alone

1. `npm run dev` to start the hot-reloading development server (powered by [nodemon](https://www.npmjs.com/package/nodemon))
1. `open` ([http://localhost:5000](http://localhost:5000)) to start ImageBack server at 5000 port

### To start complete project 
1. `cd Project` to go into the project root
1. `npm i` to install the  npm dependencies
1. `npm start` to run three scripts for starting in backend ,ImageBack and frontend using [concurrently](https://www.npmjs.com/package/concurrently)

### Uploads folder
#### contains the uploaded images 

