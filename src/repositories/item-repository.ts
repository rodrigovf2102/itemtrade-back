import { prisma } from "@/config";
import { ItemWithNoId } from "@/protocols";
import { Item, ITEMTYPE } from "@prisma/client";

export async function findItemsByServerIdAndItemType(serverId:number, itemType:ITEMTYPE, filter:string): Promise<Item[]> {
    return prisma.item.findMany({
      where: {
        serverId,
        itemType,
        name: {contains:filter}
      },
      include:{Game:true, Server: true, Enrollment: true}
    });
}

export async function findItemsByServerId(serverId:number, filter:string): Promise<Item[]> {
  return prisma.item.findMany({
    where: {
      serverId,
      name: {contains:filter}
    },
    include:{Game:true, Server: true, Enrollment: true}
  });
}

export async function findItems(filter:string): Promise<Item[]> {
  return prisma.item.findMany({
    where: {
      name: {contains:filter}
    },
    include:{Game:true, Server: true, Enrollment: true}
  });
}


export async function postItem(newItem: ItemWithNoId): Promise<Item> {
  return prisma.item.create({
    data: newItem
  });
}

const itemRepository = {
  findItemsByServerIdAndItemType,
  postItem,
  findItems,
  findItemsByServerId
};

export default itemRepository;