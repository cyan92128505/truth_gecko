import main from "./main";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 5000;

main.listen(PORT, (): void => console.log(`running on port ${PORT}`));
