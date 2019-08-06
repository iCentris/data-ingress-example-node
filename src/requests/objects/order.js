const faker = require('faker')

module.exports = {
  path: '/data/v1/object/order',
  method: 'POST',
  contentType: 'application/json',
  data: () => {
    return JSON.stringify({
      order_id: '456',
      client_user_id: '00001',
      order_date: '2018-01-01 04:50:02',
      total: 20.00,
      status: {
        id: '1',
        description: 'In Progress'
      },
      tracking_numbers: [
        'z12345',
        'ups6700ke'
      ],
      personal_volume: 20,
      commission_volume: 14,
      autoship_template: {
        id: '1',
        next_run_date: '2018-02-01 08:00:00',
        status: {
          id: '1',
          description: 'Active'
        }
      },
      items: [{
        sku: `sku-${faker.random.alphaNumeric(8)}`,
        name: faker.commerce.productName(),
        description: faker.commerce.productAdjective(),
        quantity: 2,
        unit_price: 10.00,
        total_price: 20.00,
        unit_volume: 10.00,
        unit_commission_volume: 7.00,
        total_volume: 20.00,
        total_commission_volume: 14.00
      }]
    })
  }
}