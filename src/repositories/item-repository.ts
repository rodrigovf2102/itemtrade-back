import { prisma } from "@/config";
import { ItemWithNoId } from "@/protocols";
import { Item, ITEMTYPE } from "@prisma/client";

export async function findItemsByServerIdAndItemType(serverId:number, itemType:ITEMTYPE): Promise<Item[]> {
  return prisma.item.findMany({
    where: {
      serverId,
      itemType
    }
  });
}

export async function postItem(newItem: ItemWithNoId): Promise<Item> {
  return prisma.item.create({
    data: newItem
  });
}

const itemRepository = {
  findItemsByServerIdAndItemType,
  postItem
};

export default itemRepository;