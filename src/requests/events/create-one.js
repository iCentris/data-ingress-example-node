module.exports = {
  path: '/data/v1/event/dealership_created',
  method: 'POST',
  contentType: 'application/json',
  data: () => {
    return JSON.stringify({
      dealership_id: '53',
      dealer: {
        dealer_id: '53',
        first_name: 'One',
        last_name: 'Doe',
        company_name: 'Acme Co.',
        home_phone: '1111111111',
        fax_phone: '',
        mobile_phone: '2222222222',
        email: 'test@icentris.com',
        address1: '12345 Main St',
        address2: 'Ste. 101',
        city: 'Schenectady',
        state: 'NY',
        postal_code: '12345',
        county: '',
        country: 'USA',
        signup_date: '10/30/2018 11:58:00 PM',
        birth_date: '12/31/1997'
      },
      rank: {
        id: '60',
        description: null
      },
      sponsor: {
        dealership_id: 52,
        dealer_id: 52,
        position: 1,
        level: 1
      },
      enroller: {
        dealership_id: 52,
        dealer_id: 52,
        position: 1,
        level: 1
      }
    })
  }
}
