import { Elysia } from "elysia";
import db from "../providers/db";
import setup from "../setup";
import auth from "./auth";

export default new Elysia({ prefix: "/api" }).use(auth);
