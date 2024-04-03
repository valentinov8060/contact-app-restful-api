### Installation

Before running this application, make sure you have installed several required modules. Since the `node_modules` directory has been included in the `.gitignore`, you need to manually install these modules.

To install the required modules, run the following command:

```bash
npm install @prisma/client bcrypt express joi uuid winston
```

These modules are part of the `dependencies`.

Additionally, you also need to install some modules as `devDependencies`:

```bash
npm install --save-dev @babel/preset-env @types/bcrypt @types/express @types/jest @types/uuid babel-jest jest nodemon prisma
```

### Usage

To run this application, you can use the following command:

```bash
npm start
```

This will start the server on the specified port (usually port 3000). You can access the API using the address `http://localhost:3000`.

### YouTube Channel

This project follows the tutorial series available on our YouTube channel. You can find more tutorials and guides related to this project on our YouTube channel [here](https://www.youtube.com/watch?v=6v8JXecArqE).