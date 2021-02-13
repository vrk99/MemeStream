This is a simple Web Application that allows users to submit Memes and browse the submissions made so far.

Tech Stack used:

Backend
* NodeJS
* ExpressJS
* MongoDB

Frontend
* HTML
* CSS
* Bootstrap
* Javascript

To use this application:

1. `install prerequisites: mongodb, nodejs, npm and then start the mongodb service; you can find online guides for the same based on the platform you are using`
2. `download/clone this repository`
3. `cd` into the repository
4. `cd backend`
5. `npm install`
6. `npm start`

Alternatively if you are using Ubuntu:

1. `download/clone this repository`
2. `cd` into the repository
3. `chmod +x install.sh`
4. `./install.sh`
5. `chmod +x server_run.sh`
6. `./server_run.sh`

The server is now listening for requests on **localhost:8081/memes** while the Swagger UI is accessible on **localhost:8080/swagger-ui**

You can access the webpage by opening **frontend/index.html**
