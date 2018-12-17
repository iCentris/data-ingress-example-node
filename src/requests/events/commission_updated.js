module.exports = {
  path: '/data/v1/event/commission_updated',
  method: 'POST',
  contentType: 'application/json',
  data: () => {
    return JSON.stringify({
      _event: 'COMMISSION_UPDATED',
      commission_run: {
        description: 'March 2018',
        run_date: '2018-03-01 09:00:00',
        accepted_date: '2018-03-01 09:00:00',
        status: {
          id: '1',
          description: 'Started'
        },
        period: {
          period_id: '1234',
          description: 'March 2018'
        }
      },
      dealerships: [
        {
          dealership_id: '1234',
          dealer_id: '2345',
          earnings: '245.00',
          payable_volume: '6500',
          previous_balance: '0.00',
          balance_forward: '50.00',
          fee: '0.00',
          total: '295.00',
          bonuses: [
            {
              bonus_type: {
                id: '1',
                description: 'Retail Bonus'
              },
              amount: '130.00'
            }, {
              bonus_type: {
                id: '2',
                description: 'For being cool'
              },
              amount: '115.00'
            }]
        },
        {
          dealership_id: '2345',
          dealer_id: '9877',
          earnings: '365.00',
          payable_volume: '10500',
          previous_balance: '0.00',
          balance_forward: '0.00',
          fee: '0.00',
          total: '365.00',
          bonuses: [
            {
              bonus_type: {
                id: '1',
                description: 'Retail Bonus'
              },
              amount: '230.00'
            }, {
              bonus_type: {
                id: '2',
                description: 'For being cool'
              },
              amount: '135.00'
            }]
        }]
    })
  }
}

