module.exports = {
  path: '/data/v1/object/user',
  method: 'POST',
  contentType: 'application/json',
  data: () => {
    return JSON.stringify({
      icentris_client: 'should-cause-error',
      client_user_id: "ashleyball",
      first_name: "Janice",
      last_name: "TEST Wright",
      email: "vineela.kalluru+ashleyballicentris.com",
      home_phone: "(162)858-7499x97542",
      mobile_phone: "(334)008-0122x4991",
      address: "9041 Brenda Court",
      address2: "",
      city: "Christophermouth",
      state: "TX",
      postal_code: "52147",
      country: "US",
      signup_date: "2018-10-13 00:00:00",
      birth_date: "1988-11-28",
      company_name: "Ross-Harper",
      rank: {
        "id": "8",
        "description": "White Thus"
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
        "client_parent_id": "0",
        "client_sponsor_id": "0"
      }
    })
  }
}
