const faker = require('faker')

module.exports = {
  path: '/data/v1/event/dealership_created',
  method: 'POST',
  contentType: 'application/x-ndjson',
  data: () => {
    let users = ''

    for(let i =  1; i <= 10; i++) {
      users += JSON.stringify({
        dealership_id: i.toString().padStart(5, '0'),
        dealer: {
          dealer_id: i.toString().padStart(5, '0'),
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
          company_name: faker.company.companyName(),
          home_phone: `123-123-${i.toString().padStart(4, '0')}`,
          fax_phone: '',
          mobile_phone: `321-321-${i.toString().padStart(4, '0')}`,
          email: `donotmail+${i.toString().padStart(5, '0')}@test.com`,
          address: faker.address.streetAddress(),
          address2: "",
          city: faker.address.city(),
          state: faker.address.stateAbbr(),
          postal_code: faker.address.zipCode(),
          county: '',
          country: 'USA',
          signup_date: '10/30/2018 11:58:00 PM',
          customer_type: 2,
          birth_date: '12/31/1997'
        },
        rank: {
          id: '60',
          description: 'Nevetica Pet Consultant'
        },
        sponsor: {
          dealership_id: i > 1 ? (i-1).toString().padStart(5, '0') : null,
          dealer_id: i > 1 ? (i-1).toString().padStart(5, '0') : null,
          position: 1,
          level: i
        },
        enroller: {
          dealership_id: i > 1 ? (i-1).toString().padStart(5, '0') : null,
          dealer_id: i > 1 ? (i-1).toString().padStart(5, '0') : null,
          position: 1,
          level: i
        }        
      })
      users += '\n'
    }

    return users
  }  
}
