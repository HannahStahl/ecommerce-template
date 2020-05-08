export const getItemDetails = (items, item) => (
  items.find((itemInList) => itemInList.itemId === item.itemId)
);

export const getItemPrice = (itemDetails) => (
  itemDetails.itemOnSale ? itemDetails.itemSalePrice : itemDetails.itemPrice
);
