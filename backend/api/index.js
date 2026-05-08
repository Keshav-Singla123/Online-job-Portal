import app from "../app.js";
import connectDB from "../utils/db.js";

let dbReady;

const ensureDb = async () => {
  if (!dbReady) {
    dbReady = connectDB();
  }
  await dbReady;
};

export default async function handler(req, res) {
  await ensureDb();
  return app(req, res);
}