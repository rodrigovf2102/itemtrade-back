"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postItem = exports.getItems = void 0;
const errors_1 = require("../errors");
const enrollment_repository_1 = __importDefault(require("../repositories/enrollment-repository"));
const item_repository_1 = __importDefault(require("../repositories/item-repository"));
async function getItems(serverId, itemType) {
    if (!serverId || isNaN(serverId))
        throw (0, errors_1.defaultError)("ServerNotFound");
    const itemCategories = ["Dinheiro", "Equipamento", "Recurso", "Utilizáveis", "Outros", "Todas"];
    let itemTypeExist;
    for (const itemCategory of itemCategories) {
        if (itemType === itemCategory)
            itemTypeExist = itemType;
    }
    if (!itemTypeExist)
        throw (0, errors_1.defaultError)("ItemTypeNotFound");
    const items = await item_repository_1.default.findItemsByServerIdAndItemType(serverId, itemTypeExist);
    return items;
}
exports.getItems = getItems;
async function postItem(newItem, userId) {
    const enrollment = await enrollment_repository_1.default.findEnrollmentByUserId(userId);
    if (!enrollment)
        throw (0, errors_1.defaultError)("UserWithoutEnrollment");
    const createdItem = await item_repository_1.default.postItem(newItem);
    return createdItem;
}
exports.postItem = postItem;
const itemsService = {
    getItems,
    postItem,
};
exports.default = itemsService;
