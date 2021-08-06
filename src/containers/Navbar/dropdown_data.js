const inventoryMenu = {
  title: {
    text: 'Inventory',
    link: '/inventory',
  },
  menuItems: [
    {
      text: 'Suppliers',
      link: '/inventory/suppliers',
      eventKey: 'ineventory-suppliers',
    },
  ],
  eventKey: 'inventory',
};

const purchaseMenu = {
  title: {
    text: 'Purchase',
    link: '/purchase',
  },
  menuItems: [
    {
      text: 'To be Purchased',
      link: '/purchase/tobepurchased',
    },
  ],
  eventKey: 'purchase',
};

const salesMenu = {
  title: {
    text: 'Sales',
    link: '/sales',
  },
  menuItems: [
    {
      text: 'Channels',
      link: '/sales/channel',
    },
  ],
  eventKey: 'sales',
};

export { salesMenu, inventoryMenu, purchaseMenu };
