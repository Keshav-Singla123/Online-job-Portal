import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

dotenv.config({});

const app = express();

const normalizeOrigin = (value) => {
  if (!value) {
    return null;
  }

  return value.replace(/\/+$/, "");
};

const getAllowedOrigins = () => {
  const configured = process.env.FRONTEND_URL || "http://localhost:5173";
  return configured
    .split(",")
    .map((origin) => normalizeOrigin(origin.trim()))
    .filter(Boolean);
};

const buildPreviewMatcher = (origin) => {
  try {
    const { hostname } = new URL(origin);
    if (!hostname.endsWith(".vercel.app")) {
      return null;
    }

    const projectPrefix = hostname.replace(".vercel.app", "");
    return (candidateOrigin) => {
      try {
        const { hostname: candidateHost } = new URL(candidateOrigin);
        return (
          candidateHost === `${projectPrefix}.vercel.app` ||
          (candidateHost.startsWith(`${projectPrefix}-`) &&
            candidateHost.endsWith(".vercel.app"))
        );
      } catch {
        return false;
      }
    };
  } catch {
    return null;
  }
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const allowedOrigins = getAllowedOrigins();
const previewMatchers = allowedOrigins
  .map((origin) => buildPreviewMatcher(origin))
  .filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) {
      return callback(null, true);
    }

    const normalized = normalizeOrigin(origin);
    const isExplicitAllowed = allowedOrigins.includes(normalized);
    const isPreviewAllowed = previewMatchers.some((match) => match(normalized));

    if (isExplicitAllowed || isPreviewAllowed) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
};

app.use(cors(corsOptions));

app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

export default app;