### Application Setup 

#### Localhost : in config_development.json
"API_URL" : "http://localhost:5000"

#### development ( On Server ) : in config_development.json
"API_URL" : "http://www.her-healing-initiative-api.org"

### Steps used to Create Project 
//Create react typescript project 
npx create-react-app arch-toolkit --template typescript --force

//
npm install --save-dev @testing-library/react --force

//
npm install --save typescript @types/node @types/react @types/react-dom @types/jest --force

//Testing 
npm i --save-dev @testing-library/jest-dom --force

// Create Typescript Config
Create .tsconfig

//Include bootstrap 
npm install react-bootstrap bootstrap@4.6.0 --force

### RunTime Commands
npm start
npm test
npm run build //Build React Applicaition
npm run eject

### primereact setup
npm install primereact primeicons --force
npm install primeflex --force
npm install primeicons  --force
npm install react-bootstrap bootstrap --force

### Setup React Routers
npm install -S react-router-dom --force
npm install react-hook-form --force

### Setup API Framework 
npm install axios --force

### Layouts
https://www.eventbrite.com/manage/events/create

### React Programming References 
https://react-bootstrap-v4.netlify.app/getting-started/introduction/
https://facebook.github.io/create-react-app/docs/getting-started
https://www.typescriptlang.org/tsconfig/#noImplicitAny
https://medium.com/swlh/demystifying-the-folder-structure-of-a-react-app-c60b29d90836
https://medium.com/@sadafamininia/react-ts-folder-structure-b2378387065e

### Using React Bootstrp 
https://primeflex.org/gridsystem
https://react-bootstrap.netlify.app/docs/layout/grid

### Prime react Programming References 
https://www.primefaces.org/primereact-v8/dropdown/
https://primereact.org/dropdown/
https://primeflex.org/gridsystem

### Dynamic loading of images 
npm install -D webpack webpack-cli ts-loader webpack-dev-server -force
npm install --save-dev file-loader --force
npm install --save-dev babel-loader --force
https://stackoverflow.com/questions/52759220/importing-images-in-typescript-react-cannot-find-module

### Install syncfusion - https://ej2.syncfusion.com/react/documentation/introduction

#### npm install @syncfusion/ej2-react-base --force
#### npm install @syncfusion/ej2-react-richtexteditor --force
#### npm install @syncfusion/ej2-react-schedule --force
#### npm install @syncfusion/ej2-react-buttons --force
#### npm install @syncfusion/ej2-react-calendars --force
#### npm install @syncfusion/ej2-react-dropdowns --force
#### npm install @syncfusion/ej2-react-inputs --force

### React Hook form : https://react-hook-form.com/get-started#Registerfields

<img src={require(getImagePath(data.eventImage)).default}/>

### Parent - Child Components Integration
https://codesandbox.io/p/sandbox/ecstatic-shamir-1ffso?file=%2Fsrc%2FApp.js


### How to Run the Project
1) Run the API Project - Launch Terminial from Visual Code
npm run dev 
2) #### Run the UI Project - Launch Terminial from Visual Code
npm run dev
3) API End point : http://localhost:5000/api/blogs

#### -----------------------DEPLOYMENT------------------------------###

### Prerequisites 
> Read and Execute Permissions for the following account for App Folders : IIS_IUSRS & IUSR 
> setx NODE_ENV "production"

1) copy backup C:\inetpub\her-healing-initiative-web to her-healing-initiative-web_backup_07262025
2) launch IIS Stop Web her-healing-initiative
3) local machine 
    3a : get Latest fromm github 
    3b : build code : npm run build_prod
4) copy all files ( except web.config ) from Apps\her-healing-initiative\build to Web Server Folder C:\inetpub\her-healing-initiative-web
5) copy package.json to Web Server 
6) delete node_modules and run => npm run install -force

#### -----------------------PENDING FEATURES(As of Sep 3, 2025)--------------####
> Event Management
1) Create Event
2) Edit Event
3) Delete Event
4) View Event

> Donations
1) Save Donation

> Social Networking
1) Likes
2) Registered Users
3) Interested Users

> FAQ

> Contact Page
