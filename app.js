import "dotenv/config";
import session from "express-session";
import express from 'express';
import mongoose from "mongoose";
import Lab5 from './Lab5.js';
import cors from "cors";
import UserRoutes from "./Users/routes.js";
import CourseRoutes from "./Kanbas/courses/routes.js";
import ModuleRoutes from "./Kanbas/modules/routes.js";
import QuizRoutes from "./Kanbas/quizzes/routes.js";

// mongoose.connect("mongodb://127.0.0.1:27017/kanbas");
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/kanbas'
mongoose.connect(CONNECTION_STRING);
const app = express();
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL
  })
 ); 
const sessionOptions = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.HTTP_SERVER_DOMAIN,
  };
}
app.use(session(sessionOptions));

app.use(express.json());

CourseRoutes(app);
ModuleRoutes(app);
CourseRoutes(app);
UserRoutes(app);
Lab5(app);

app.listen(process.env.PORT || 4000); // listen to http://localhost:4000
// console.log(process.env.FRONTEND_URL);






