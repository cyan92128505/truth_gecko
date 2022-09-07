import { config } from "dotenv";

import APP from "./app";

async function main() {
    config();
    const app = await APP();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, (): void => console.log(`running on port ${PORT}`));
}

main();

