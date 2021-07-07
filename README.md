# Basic Transaction Parser

## Goal

Process transactions and filter them for valid deposits.

Transaction records credited to users should be read from the database, and the following 10 lines should be printed on stdout:

    Deposited for Isabell Nielsen: count=n sum=x.xx USD
    Deposited for Shanelle Atkinson: count=n sum=x.xx USD
    Deposited for Akshay Zamora: count=n sum=x.xx USD
    Deposited for Haaris Roy: count=n sum=x.xx USD
    Deposited for Floyd Weir: count=n sum=x.xx USD
    Deposited for Lemar Edge: count=n sum=x.xx USD
    Deposited for June Mellor: count=n sum=x.xx USD
    Deposited for Velma Tierney: count=n sum=x.xx USD
    Deposited without known user: count=n sum=x.xx USD
    Smallest valid deposit: x.xx USD
    Largest valid deposit: x.xx USD

## Solution Details

The application can be executed using the `docker-compose up -d` command from the root directory, which will set up a MongoDB instance as well in the background. The database gets initiated on the first start of the container using the `mongo-init.js` file. Database initalization adds the users with their depository account details and also creates an empty collection for the valid transactions that are to be processed.

The data files should be copied into the `/data` folder in the project root, which is mounted into the container. This also means that adding new files or updating existing ones in that directory will automatically restart the application, if the container is already running.

The `/src` folder contains the actual codebase, which is a Node.js application. `/src/server/index.js` is the main file.

The application will write final results to the console. Any other log event such as errors or information about decisions are logged into the `/src/app.log` file, which can be accessed on the same path in the container.
