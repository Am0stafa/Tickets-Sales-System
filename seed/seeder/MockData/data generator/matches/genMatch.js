const fs = require('fs')
const data = require('./world_cup_matches.json') 
const whichCon = require('./whichCon')
let matchNum = 0

newData = data.map( (match) => {
    const homeTeamContinents =  whichCon(match.HomeTeam)
    const awayTeamContinents =  whichCon(match.AwayTeam)

    matchNum += 1
    return   {
        "roundNumber": match.RoundNumber,
        "Date": match.DateUtc,
        "location": match.Location,
        "homeTeam": match.HomeTeam,
        "homeTeamContinents": homeTeamContinents,
        "awayTeam": match.AwayTeam,
        "awayTeamContinents": awayTeamContinents,
        "group": match.Group,
        "rank": matchNum
    }
    
    
})

fs.writeFileSync('./matches.json', JSON.stringify(newData, null, 2) , 'utf-8');

