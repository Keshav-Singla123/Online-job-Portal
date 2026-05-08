import app from "./app.js";
import connectDB from "./utils/db.js";

// Validate required environment variables
const requiredEnvVars = ["MONGO_URI", "SECRET_KEY"];
const missingEnvVars = requiredEnvVars.filter((varName) => !process.env[varName]);
if (missingEnvVars.length > 0) {
    console.error(`Missing environment variables: ${missingEnvVars.join(", ")}`);
    process.exit(1);
}

const PORT = process.env.PORT || 3000;

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running at port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Server startup error:", error.message);
        process.exit(1);
    });