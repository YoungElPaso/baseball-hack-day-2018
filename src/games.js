const _ = require('lodash')
const moment = require('moment')

const games = require('./data/games')
const distances = require('./data/distances')

export default class Games {
  gamesBetweenDates = (start, end) => {
    return _(games).filter(game => {
      const gameTime = moment.utc(game.scheduled)
      const startDate = moment.utc(start)
      const endDate = moment.utc(end)

      return gameTime.isSameOrAfter(startDate, 'day') && gameTime.isSameOrBefore(endDate, 'day')
    }).map(game => {
      const dd = _(distances[game.home_team])
        .sortBy(k => k[1])
        .map(k => _.set({}, k[0], k[1]))
        .reduce((result, value, key) => _.assignIn(result, key, value))

      return _.assignIn(game, {distances: dd})
    })
  }

  firstGameAtBetween (teamId, start, end) {
    return _(this.gamesBetweenDates(start, end)).find(game => game.home_team === teamId)
  }

  buildRoute (teamId, start, end) {
    const results = []

    const endOn = moment.utc(end)
    let current = moment.utc(start)
    let currentGame = this.firstGameAtBetween(teamId, start, end)
    let maxTravel = 500
    results.push(currentGame)

    const route = {destination: currentGame.venue, origin: currentGame.venue, waypoints: []}

    console.log(currentGame)
    console.log(`${currentGame.scheduled} @ ${currentGame.home}`)

    while (current.isBefore(endOn, 'day')) {
      current.add(1, 'day')
      let nextDaysGames = this.gamesBetweenDates(current, current)

      let nextDestination = _(nextDaysGames)
        .sortBy([game => game.distances[currentGame.home_team]])
        .filter(game => {
          return _.filter(results, g => g.home_team === game.home_team).length < 3
            && game.distances[currentGame.home_team] <= maxTravel
        })
        .first()

      if (_(nextDestination).isEmpty()) {
        console.log(`${current} @ Traveling`)
        maxTravel += 300
      } else {
        console.log(`${nextDestination.scheduled} @ ${nextDestination.home}`)
        results.push(nextDestination)
      }
    }

    route.waypoints = _(results).map(result => {
      return {location: result.venue}
    }).value();

    return route
  }
};
