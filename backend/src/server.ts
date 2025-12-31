import app from "./app";
import { connectDB } from "./infrastructure/config/db";

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening http://localhost:${PORT}`);
  });
});
