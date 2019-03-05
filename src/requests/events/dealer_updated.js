module.exports = {
  path: '/data/v1/event/dealer_updated',
  method: 'POST',
  contentType: 'application/json',
  data: () => {
    return JSON.stringify({
      dealership_ids: ['00005', '00006'],
      dealer_id: '00005',
      first_name: 'Five',
      last_name: 'Doe',
      company_name: 'Five Co.',
      home_phone: '1111111111',
      fax_phone: '',
      mobile_phone: '2222222222',
      email: 'five.doe@test.com',
      address1: '5 Main St',
      address2: 'Ste. 5',
      city: 'Schenectady',
      state: 'NY',
      postal_code: '12345',
      county: '',
      country: 'USA',
      signup_date: '10/30/2018 11:58:00 PM',
      birth_date: '12/31/1997',
      customer_type: {
        id: '1',
        description: 'Retail Customer'
      },      
      sponsor: {
        dealership_id: '00001',
        dealer_id: '00001',
        position: 1,
        level: 2
      }
    })
  }
}
