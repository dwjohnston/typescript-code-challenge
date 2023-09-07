import { getFakeDb } from "./db";
import { createServer } from "./server";
import { sortDataIntoCustomersAndOrders } from "./sortInputDataIntoCustomersAndOrders";
const port = process.env.PORT ?? 3001;
const pathToInitialData = process.env.PATH_TO_INITIAL_DATA ?? "data/data.json";


async function main() {

    console.info("Starting server...")

    console.info("Getting database...");
    const fakeDb = await getFakeDb();
    console.info(`Got database. Populating database from "${pathToInitialData}"...`)
    await sortDataIntoCustomersAndOrders(pathToInitialData, fakeDb);
    console.info("Database populated.")

    const server = createServer(fakeDb);
    server.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}


try {
    main();
} catch (err) {
    console.error("Something went wrong starting the server")
    // However you want to handle this. 
    throw err;
}
