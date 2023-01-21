import { defaultError } from "@/errors";
import { ItemWithNoId } from "@/protocols";
import enrollmentRepository from "@/repositories/enrollment-repository";
import itemRepository from "@/repositories/item-repository";
import { Item, ITEMTYPE } from "@prisma/client";

export async function getItems(serverId: number, itemType: string): Promise<Item[]> {
  if (!serverId || isNaN(serverId)) throw defaultError("ServerNotFound");
  const itemCategories = ["Dinheiro", "Equipamento", "Recurso", "Utilizáveis", "Outros", "Todas"];
  let itemTypeExist: ITEMTYPE;
  for (const itemCategory of itemCategories) {
    if (itemType === itemCategory) itemTypeExist = itemType as ITEMTYPE;
  }
  if (!itemTypeExist) throw defaultError("ItemTypeNotFound");

  const items = await itemRepository.findItemsByServerIdAndItemType(serverId, itemTypeExist);
  return items;
}

export async function postItem(newItem: ItemWithNoId, userId: number): Promise<Item> {
  const enrollment = await enrollmentRepository.findEnrollmentByUserId(userId);
  if (!enrollment) throw defaultError("UserWithoutEnrollment");
  const createdItem = await itemRepository.postItem(newItem);
  return createdItem;
}

const itemsService = {
  getItems,
  postItem,
};

export default itemsService;
