module.exports = {
  path: '/data/v1/event/summary_data',
  method: 'POST',
  contentType: 'application/x-ndjson',
  data: () => {
    return JSON.stringify({
      dealership_id: '2',
      personal_volume: '10',
      team_commissionable_volume: '20',
      personal_active_enrollees: '30',
      team_commissionable_volume_in_pay_leg: '40',
      team_volume_commission: '50',
      check_match: '60',
      diamond_pool_shares: '70',
      rank: {
        id: 60,
        description: 'Learner'
      },
      personally_sponsored_rankholders: {
        bronze: 1,
        silver: 2,
        gold: 3,
        platinum: 4,
        sapphire: 5,
        ruby: 6,
        emerald: 7,
        blue_diamond: 8,
        red_diamond: 9
    }
    })
  }
}

