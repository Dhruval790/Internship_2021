const defaultInput = 'text';
const add_inventory_fields = [{ field: 'Product', space: 12, type: defaultInput },
  { field: 'Current Inventory', space: 6, type: defaultInput },
  { field: 'Incoming Inventory', space: 6, type: defaultInput },
  { field: 'Purchase Price', space: 6, type: 'number' },
  { field: 'Minimum Support Price', space: 6, type: 'number' },
  { field: 'supplier', space: 12, type: defaultInput },
];
const add_supplier_fields = [{ field: 'Supplier', space: 12, type: defaultInput }];
const add_product_fields = [{ field: 'Product', space: 12, type: defaultInput },
  { field: 'Manufracture', space: 12, type: defaultInput },
  { field: 'Supplier', space: 12, type: defaultInput },
];
export { add_inventory_fields, add_supplier_fields, add_product_fields };
