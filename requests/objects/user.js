module.exports = {
  path: '/data/v1/object/user',
  method: 'POST',
  contentType: 'application/json',
  data: () => {
    return JSON.stringify(
      {
        client_user_id: '1',
        first_name: 'John',
        last_name: 'Doe',
        rank: {
          id: '1'
        }
      }
    )
  }
}