// Define teams and their initial records
const teams = {
    east: [
        { name: 'Boston Celtics', wins: 0, losses: 0, strength: 100, playoffWins: 0 },
        { name: 'Brooklyn Nets', wins: 0, losses: 0, strength: 42, playoffWins: 0 },
        { name: 'Milwaukee Bucks', wins: 0, losses: 0, strength: 64, playoffWins: 0 },
        { name: 'Philadelphia 76ers', wins: 0, losses: 0, strength: 17, playoffWins: 0 },
        { name: 'Cleveland Cavaliers', wins: 0, losses: 0, strength: 46, playoffWins: 0 },
        { name: 'Toronto Raptors', wins: 0, losses: 0, strength: 73, playoffWins: 0 },
        { name: 'Chicago Bulls', wins: 0, losses: 0, strength: 76, playoffWins: 0 },
        { name: 'Miami Heat', wins: 0, losses: 0, strength: 34, playoffWins: 0 },
        { name: 'Atlanta Hawks', wins: 0, losses: 0, strength: 97, playoffWins: 0 },
        { name: 'New York Knicks', wins: 0, losses: 0, strength: 36, playoffWins: 0 },
        { name: 'Washington Wizards', wins: 0, losses: 0, strength: 57, playoffWins: 0 },
        { name: 'Charlotte Hornets', wins: 0, losses: 0, strength: 72, playoffWins: 0 },
        { name: 'Indiana Pacers', wins: 0, losses: 0, strength: 44, playoffWins: 0 },
        { name: 'Detroit Pistons', wins: 0, losses: 0, strength: 26, playoffWins: 0 },
        { name: 'Orlando Magic', wins: 0, losses: 0, strength: 62, playoffWins: 0 }
    ],
    west: [
        { name: 'Los Angeles Lakers', wins: 0, losses: 0, strength: 21, playoffWins: 0 },
        { name: 'Golden State Warriors', wins: 0, losses: 0, strength: 68, playoffWins: 0},
        { name: 'Phoenix Suns', wins: 0, losses: 0, strength: 62, playoffWins: 0 },
        { name: 'LA Clippers', wins: 0, losses: 0, strength: 41, playoffWins: 0 },
        { name: 'Denver Nuggets', wins: 0, losses: 0, strength: 72, playoffWins: 0 },
        { name: 'Dallas Mavericks', wins: 0, losses: 0, strength: 87, playoffWins: 0 },
        { name: 'Memphis Grizzlies', wins: 0, losses: 0, strength: 31, playoffWins: 0 },
        { name: 'Minnesota Timberwolves', wins: 0, losses: 0, strength: 66, playoffWins: 0 },
        { name: 'New Orleans Pelicans', wins: 0, losses: 0, strength: 86, playoffWins: 0 },
        { name: 'Portland Trail Blazers', wins: 0, losses: 0, strength: 32, playoffWins: 0 },
        { name: 'Sacramento Kings', wins: 0, losses: 0, strength: 27, playoffWins: 0 },
        { name: 'San Antonio Spurs', wins: 0, losses: 0, strength: 19, playoffWins: 0 },
        { name: 'Utah Jazz', wins: 0, losses: 0, strength: 42, playoffWins: 0 },
        { name: 'Oklahoma City Thunder', wins: 0, losses: 0, strength: 56, playoffWins: 0 },
        { name: 'Houston Rockets', wins: 0, losses: 0, strength: 67, playoffWins: 0 }
    ]
};
function resetTeamRecords() {
    teams.east.forEach(team => {
        team.wins = 0;
        team.losses = 0;
    });

    teams.west.forEach(team => {
        team.wins = 0;
        team.losses = 0;
    });
}

// Function to simulate a game
function simulateGame(team1, team2) {
    // Calculate the probability of team1 winning based on their strengths
    const totalStrength = team1.strength + team2.strength;
    const team1Probability = team1.strength / totalStrength;

    // Generate a random number between 0 and 1
    const randomResult = Math.random();

    // Determine the game outcome based on probabilities and randomness
    if (randomResult <= team1Probability) {
        team1.wins++;
        team2.losses++;
    } else {
        team1.losses++;
        team2.wins++;
    }
}

// Function to simulate the entire NBA season
function simulateNBASeason() {
    resetTeamRecords();

    // Simulate games within each conference
    for (let t = 0; t < 4; t++) {
        for (let i = 0; i < teams.east.length; i++) {
            for (let j = i + 1; j < teams.east.length; j++) {
                simulateGame(teams.east[i], teams.east[j]);
            }
        }
    }
    for (let t = 0; t < 4; t++) {
        for (let i = 0; i < teams.west.length; i++) {
            for (let j = i + 1; j < teams.west.length; j++) {
                simulateGame(teams.west[i], teams.west[j]);

            }
        }
    }

    //simulate between conference

    for(let j = 0; j<16; j++) {
        for (let i = 0; i < teams.west.length; i++) {

            simulateGame(teams.west[i], teams.east[i]);


        }
    }
    //each teams plays 10 more intraconference games
    for(let j = 0; j<10; j++) {
        for (let i = 0; i < teams.west.length; i++) {
            simulateGame(teams.west[i], teams.east[i]);
        }
    }
    displayResults();


}

// Function to display the results in the tables
function displayResults() {
    const eastTable = document.getElementById('eastTable');
    const westTable = document.getElementById('westTable');

    // Clear existing table rows
    eastTable.innerHTML = '<tr><th>Rank</th><th>Team</th><th>Wins</th><th>Losses</th><th>Win Percent</th></tr>';
    westTable.innerHTML = '<tr><th>Rank</th><th>Team</th><th>Wins</th><th>Losses</th><th>Win Percent</th></tr>';


    // Sort teams by wins (most wins at the top)
    const sortedEastTeams = teams.east.slice().sort((a, b) => b.wins - a.wins);
    const sortedWestTeams = teams.west.slice().sort((a, b) => b.wins - a.wins);

    // Add new rows for Eastern Conference teams
    sortedEastTeams.forEach((team, index) => {
        const row = eastTable.insertRow(-1);
        const winPercentage = (team.wins / (team.wins + team.losses) * 100).toFixed(2);
        row.insertCell(0).textContent = index + 1;
        row.insertCell(1).textContent = team.name;
        row.insertCell(2).textContent = team.wins;
        row.insertCell(3).textContent = team.losses;
        row.insertCell(4).textContent = winPercentage + "%";
    });

    // Add new rows for Western Conference teams
    sortedWestTeams.forEach((team, index) => {
        const row = westTable.insertRow(-1);
        const winPercentage = (team.wins / (team.wins + team.losses) * 100).toFixed(2);
        row.insertCell(0).textContent = index + 1;
        row.insertCell(1).textContent = team.name;
        row.insertCell(2).textContent = team.wins;
        row.insertCell(3).textContent = team.losses;
        row.insertCell(4).textContent = winPercentage + "%";
    });
}




function simulatePlayoffs() {
    teams.east.forEach(team => team.playoffWins = 0);
    teams.west.forEach(team => team.playoffWins = 0);
    // Get the top 8 teams from each conference
    const eastPlayoffTeams = teams.east.slice().sort((a, b) => b.wins - a.wins).slice(0, 8);
    const westPlayoffTeams = teams.west.slice().sort((a, b) => b.wins - a.wins).slice(0, 8);


    // Generate playoff matchups for each conference
    const westPlayoffBracket = generatePlayoffBracket(westPlayoffTeams); //full of matchups
    const eastPlayoffBracket = generatePlayoffBracket(eastPlayoffTeams);

    console.log("playoff generated");

    // Display the first round matchups
    displayPlayoffRound(westPlayoffBracket, 'westFirstRoundMatchup');
    displayPlayoffRound(eastPlayoffBracket, 'eastFirstRoundMatchup');
    console.log("First round displayed");

    // Simulate the first round
    const westFirstRoundWinners = simulatePlayoffRound(westPlayoffBracket);
    const eastFirstRoundWinners = simulatePlayoffRound(eastPlayoffBracket);
    console.log("First round simulated");

    displayWinner(westFirstRoundWinners[0].highSeed.team, 'westFirstRoundWinner');
    displayWinner(westFirstRoundWinners[0].lowSeed.team, 'westFirstRoundWinner');
    displayWinner(westFirstRoundWinners[1].highSeed.team, 'westFirstRoundWinner');
    displayWinner(westFirstRoundWinners[1].lowSeed.team, 'westFirstRoundWinner');
    displayWinner(eastFirstRoundWinners[0].highSeed.team, 'eastFirstRoundWinner');
    displayWinner(eastFirstRoundWinners[0].lowSeed.team, 'eastFirstRoundWinner');
    displayWinner(eastFirstRoundWinners[1].highSeed.team, 'eastFirstRoundWinner');
    displayWinner(eastFirstRoundWinners[1].lowSeed.team, 'eastFirstRoundWinner');

    displayPlayoffRound(westPlayoffBracket, 'westFirstRoundMatchup');
    displayPlayoffRound(eastPlayoffBracket, 'eastFirstRoundMatchup');

    teams.east.forEach(team => team.playoffWins = 0);
    teams.west.forEach(team => team.playoffWins = 0);

    // Display the second round matchups
    displayPlayoffRound(westFirstRoundWinners, 'westSemiFinalsMatchup');
    displayPlayoffRound(eastFirstRoundWinners, 'eastSemiFinalsMatchup');
    console.log("semi display");

    // Simulate the second round
    const westSemiFinalsWinners = simulatePlayoffRound(westFirstRoundWinners);
    const eastSemiFinalsWinners = simulatePlayoffRound(eastFirstRoundWinners);
    console.log("semi winner");

    displayWinner(westSemiFinalsWinners[0].highSeed.team, 'westSemiFinalsWinner');
    displayWinner(eastSemiFinalsWinners[0].highSeed.team, 'eastSemiFinalsWinner');

    displayPlayoffRound(westFirstRoundWinners, 'westSemiFinalsMatchup');
    displayPlayoffRound(eastFirstRoundWinners, 'eastSemiFinalsMatchup');

    teams.east.forEach(team => team.playoffWins = 0);
    teams.west.forEach(team => team.playoffWins = 0);

    // Display the conference finals matchups

    displayPlayoffRound(westSemiFinalsWinners, 'westConferenceFinalsMatchup');
    displayPlayoffRound(eastSemiFinalsWinners, 'eastConferenceFinalsMatchup');

    // Simulate the conference finals
    const westConferenceWinner = simulatePlayoffSeries(westSemiFinalsWinners[0]);
    const eastConferenceWinner = simulatePlayoffSeries(eastSemiFinalsWinners[0]);

    // Display the conference winners
    displayWinner(westConferenceWinner.team, 'westConferenceFinalsWinner');
    displayWinner(eastConferenceWinner.team, 'eastConferenceFinalsWinner');


    displayPlayoffRound(westSemiFinalsWinners, 'westConferenceFinalsMatchup');
    displayPlayoffRound(eastSemiFinalsWinners, 'eastConferenceFinalsMatchup');

    teams.east.forEach(team => team.playoffWins = 0);
    teams.west.forEach(team => team.playoffWins = 0);

    // Display the NBA finals matchup
    const nbaFinalsMatchup = [
        { highSeed: westConferenceWinner, lowSeed: eastConferenceWinner },
    ];
    displayPlayoffRound(nbaFinalsMatchup, 'nbaFinalsMatchup');

    // Simulate the NBA finals
    const nbaChampion = simulatePlayoffSeries(nbaFinalsMatchup[0]);

    displayPlayoffRound(nbaFinalsMatchup, 'nbaFinalsMatchup');

    // Display the NBA champion
    displayWinner(nbaChampion.team, 'nbaFinalsWinner');

}

function generatePlayoffBracket(playoffTeams) {
    const playoffBracket = [];

    for (let i = 0; i < playoffTeams.length/2; i++) {
        const highSeed = {
            team: playoffTeams[i],
            //highSeed:
            seed: i + 1,
        };

        const lowSeed = {
            team: playoffTeams[playoffTeams.length-i-1],
            seed: playoffTeams.length,
        };

        const matchup = {
            highSeed: highSeed,
            lowSeed: lowSeed
        };

        playoffBracket.push(matchup);
    }

    return playoffBracket;
}

function simulatePlayoffRound(playoffBracket) {
    const winners = [];

    for (const matchup of playoffBracket) {
        const winner = simulatePlayoffSeries(matchup);
        winners.push(winner);
    }

    const nextRoundBracket = [];

    for (let i = 0; i < winners.length; i += 2) {
        const matchup = {
            highSeed: winners[i],
            lowSeed: winners[i + 1],
        };
        nextRoundBracket.push(matchup);
    }

    return nextRoundBracket;
}

function simulatePlayoffSeries(matchup) {

    const highSeed = matchup.highSeed.team;
    const lowSeed = matchup.lowSeed.team;
    //const { highSeed, lowSeed } = matchup;
    let highSeedWins = 0;
    let lowSeedWins = 0;



    while (true) {
        const winner = simulatePlayoffGame(highSeed, lowSeed);
        if (winner === highSeed) {
            highSeedWins++;
            highSeed.playoffWins++;
        } else {
            lowSeedWins++;
            lowSeed.playoffWins++;
        }

        if (highSeedWins === 4 || lowSeedWins === 4) {
            break;
        }
    }

    console.log("high",highSeedWins);
    console.log("low", lowSeedWins);



    return highSeedWins > lowSeedWins ? matchup.highSeed : matchup.lowSeed;
}


function simulatePlayoffGame(team1, team2) {
    const totalStrength = team1.strength + team2.strength;
    const team1Probability = team1.strength / totalStrength;
    const random = Math.random();

    return random < team1Probability ? team1 : team2;
}





function displayPlayoffRound(bracket, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    bracket.forEach((matchup) => {
        const matchupElement = document.createElement('div');
        matchupElement.classList.add('matchup');

        const team1Element = document.createElement('span');
        team1Element.classList.add('team');
        team1Element.textContent = `${matchup.highSeed.team.name} ${matchup.highSeed.team.playoffWins}`;

        const vsElement = document.createElement('span');
        vsElement.textContent = ' vs ';

        const team2Element = document.createElement('span');
        team2Element.classList.add('team');
        team2Element.textContent = `${matchup.lowSeed.team.name} ${matchup.lowSeed.team.playoffWins}`;


        matchupElement.appendChild(team1Element);
        matchupElement.appendChild(vsElement);
        matchupElement.appendChild(team2Element);

        container.appendChild(matchupElement);
    });
}
function displayWinner(winner, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    const winnerElement = document.createElement('div');
    winnerElement.classList.add('matchup', 'winner');
    winnerElement.textContent = `${winner.name} ${winner.playoffWins}`;

    container.appendChild(winnerElement);
}


// Add event listener to the button
const simulateButton = document.getElementById('simulateButton');
simulateButton.addEventListener('click', simulateNBASeason);
const simulatePlayoffsButton = document.getElementById('simulatePlayoffButton');
simulatePlayoffsButton.addEventListener('click', simulatePlayoffs);


