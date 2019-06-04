module.exports = {
  path: '/data/v1/event/dealership_sponsorshipchanged',
  method: 'POST',
  contentType: 'application/json',
  data: () => {
    return JSON.stringify({
      dealership_id: '787515',
      sponsor: {
        dealership_id: '787653',
        dealer_id: '813820',
        position: 0,
        level: 9
      }
    })
  }
}
