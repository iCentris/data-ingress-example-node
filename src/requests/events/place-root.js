module.exports =  {
  path: '/data/v1/event/dealership_sponsorshipchanged',
  method: 'POST',    
  contentType: 'application/json',
  data: () => {
    return JSON.stringify({
      dealership_id: 40,
      sponsor: {
        
      }
    })
  }
}