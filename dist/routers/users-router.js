"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = require("express");
const schemas_1 = require("../schemas");
const middlewares_1 = require("../middlewares");
const controllers_1 = require("../controllers");
const usersRouter = (0, express_1.Router)();
exports.usersRouter = usersRouter;
usersRouter.post("/signup", (0, middlewares_1.validateBody)(schemas_1.createUserSchema), controllers_1.usersPost);
usersRouter.post("/signin", (0, middlewares_1.validateBody)(schemas_1.signInSchema), controllers_1.signInPost);
