### Application Setup 

# Localhost : in config_development.json
"API_URL" : "http://localhost:5000"

# development ( On Server ) : in config_development.json
"API_URL" : "http://www.her-healing-initiative-api.org"

# Steps used to Create Project 
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

## RunTime Commands
npm start
npm test
npm run build //Build React Applicaition
npm run eject

# primereact setup
npm install primereact primeicons --force
npm install primeflex --force
npm install primeicons  --force
npm install react-bootstrap bootstrap --force

# Setup React Routers
npm install -S react-router-dom --force
npm install react-hook-form --force

# Setup API Framework 
npm install axios --force

### Layouts
https://www.eventbrite.com/manage/events/create

# React Programming References 
https://react-bootstrap-v4.netlify.app/getting-started/introduction/
https://facebook.github.io/create-react-app/docs/getting-started
https://www.typescriptlang.org/tsconfig/#noImplicitAny
https://medium.com/swlh/demystifying-the-folder-structure-of-a-react-app-c60b29d90836
https://medium.com/@sadafamininia/react-ts-folder-structure-b2378387065e

# Using React Bootstrp 
https://react-bootstrap.netlify.app/docs/layout/grid

# Prime react Programming References 
https://www.primefaces.org/primereact-v8/dropdown/
https://primereact.org/dropdown/
https://primeflex.org/gridsystem


# Dynamic loading of images 
npm install -D webpack webpack-cli ts-loader webpack-dev-server -force
npm install --save-dev file-loader --force
npm install --save-dev babel-loader --force
https://stackoverflow.com/questions/52759220/importing-images-in-typescript-react-cannot-find-module

<img src={require(getImagePath(data.eventImage)).default}/>

### Parent - Child Components Integration

https://codesandbox.io/p/sandbox/ecstatic-shamir-1ffso?file=%2Fsrc%2FApp.js


### Events MetaData
Registered 
Interested / Queries
Liked

Ability to Create Group
    Group Type - Event Group, Donation Group 
Ability to Tag to Friends, Groups   
Event View 
Edit / Delete Event 
Share Event 
Like Event 

View Event => 
    Edit Event
    Delete Event
    Review Event Comments   

### How to Run the Project
# Run the API Project - Launch Terminial from Visual Code
npm run dev 
# Run the UI Project - Launch Terminial from Visual Code
np

# API End point : http://localhost:5000/api/blogs

#### react quill setup 
### npm install react-quill --save --force
### https://codesandbox.io/p/sandbox/react-quill-full-toolbar-j569z?file=%2Fsrc%2FEditorToolbar.js%3A7%2C1-26%2C3