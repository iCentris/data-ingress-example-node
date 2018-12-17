module.exports = {
  path: '/data/v1/event/test_event_with_payload_validation',
  method: 'POST',
  contentType: 'application/json',
  data: () => {
    return JSON.stringify({ client_user_id: '1', first_name: 'John', last_name: 'Doe', email: 'test@tester.com', rank: { id: '1' } })
  }
}
