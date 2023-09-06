import { getFakeDb } from "./db";
import { createServer } from "./server";
const port = process.env.PORT ?? 3001;


async function main() {
    const fakeDb = await getFakeDb();
    const server = createServer(fakeDb);

    server.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}


main();