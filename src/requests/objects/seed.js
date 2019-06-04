const faker = require('faker')

module.exports = {
  path: '/data/v1/object/user',
  method: 'POST',
  contentType: 'application/x-ndjson',
  data: () => {
    let users = ''

    for(let i =  1; i <= 10; i++) {
      users += JSON.stringify({
        client_user_id: i.toString().padStart(5, '0'),
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        email: `donotmail+${i.toString().padStart(5, '0')}@test.com`,
        home_phone: `123-123-${i.toString().padStart(4, '0')}`,
        mobile_phone: "",
        address: faker.address.streetAddress(),
        address2: "",
        city: faker.address.city(),
        state: faker.address.stateAbbr(),
        postal_code: faker.address.zipCode(),
        country: "US",
        signup_date: "2019-04-24 00:00:00",
        birth_date: "1948-05-14",
        company_name: faker.company.companyName(),
        rank: {
          "id": "1",
          "description": ""
        },
        type: {
          "id": "3",
          "description": "Distributor"
        },
        status: {
          "id": "1",
          "description": "Active"
        },
        upline: {
          "client_parent_id": i > 1 ? (i-1).toString().padStart(5, '0') : null,
          "client_sponsor_id": i > 1 ? (i-1).toString().padStart(5, '0') : null
        }
      })
      users += '\n'
    }

    return users
  }
}
