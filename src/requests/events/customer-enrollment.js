const faker = require('faker')

module.exports = {
  path: '/data/v1/event/customer_enrollment',
  method: 'POST',
  contentType: 'application/json',
  data: () => {
    const i = 100
    return JSON.stringify({
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
      customer_type: 1,
      birth_date: '12/31/1997',
      sponsor: {
        dealership_id: '00001',
        dealer_id: '00001',
        position: 1,
        level: 2
      }
    })
  }
}
