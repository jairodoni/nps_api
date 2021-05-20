import { app } from "./app";
import "dotenv/config";

app.listen(process.env.SERVER_PORT, () => {
  console.log(`[*] Server running on port: ${process.env.SERVER_PORT}`);
});
