export default {
  name: 'company',
  title: 'Company',
  type: 'document',
  fields: [
    {
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Used to sort items (1 comes first, 2 second, etc.)'
    },
    {
      name: 'name',
      title: 'Company Name',
      type: 'string',
    },
    {
      name: 'iconName',
      title: 'Icon Name (e.g., SiAirbnb)',
      type: 'string',
    },
    {
      name: 'color',
      title: 'Tailwind Color Class (e.g., hover:text-[#FF5A5F])',
      type: 'string',
    }
  ]
}
