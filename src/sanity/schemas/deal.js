export default {
  name: 'deal',
  title: 'Deal',
  type: 'document',
  fields: [
    {
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Used to sort items (1 comes first, 2 second, etc.)'
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'iconName',
      title: 'Icon Name (e.g., FaMoneyBillWave)',
      type: 'string',
    }
  ]
}
