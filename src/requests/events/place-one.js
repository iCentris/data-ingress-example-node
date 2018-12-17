module.exports =  {
  path: '/data/v1/event/dealership_sponsorshipchanged',
  method: 'POST',
  contentType: 'application/json',
  data: () => {
    return JSON.stringify({
      dealership_id: 31,
      sponsor: {
        dealer_id: 30,
        dealership_id: 30,
        position: 1,
        level: 1
      }
    })
  }
}