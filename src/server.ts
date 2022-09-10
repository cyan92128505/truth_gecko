require('dotenv').config();

import APP from './app';

async function main() {
  const app = await APP();
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, (): void => console.log(`Server started at port ${PORT}`));
}

main();
