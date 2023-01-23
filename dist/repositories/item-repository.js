"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postItem = exports.findItemsByServerIdAndItemType = void 0;
const config_1 = require("../config");
async function findItemsByServerIdAndItemType(serverId, itemType) {
    return config_1.prisma.item.findMany({
        where: {
            serverId,
            itemType
        }
    });
}
exports.findItemsByServerIdAndItemType = findItemsByServerIdAndItemType;
async function postItem(newItem) {
    return config_1.prisma.item.create({
        data: newItem
    });
}
exports.postItem = postItem;
const itemRepository = {
    findItemsByServerIdAndItemType,
    postItem
};
exports.default = itemRepository;
