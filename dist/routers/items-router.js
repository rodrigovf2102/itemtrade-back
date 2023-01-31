"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemsRouter = void 0;
const express_1 = require("express");
const schemas_1 = require("../schemas");
const middlewares_1 = require("../middlewares");
const controllers_1 = require("../controllers");
const authentication_middleware_1 = require("../middlewares/authentication-middleware");
const itemsRouter = (0, express_1.Router)();
exports.itemsRouter = itemsRouter;
itemsRouter.get("/:serverId/:type", controllers_1.getItems);
itemsRouter.post("/", (0, middlewares_1.validateBody)(schemas_1.itemSchema), authentication_middleware_1.authenticateToken, controllers_1.postItem);
