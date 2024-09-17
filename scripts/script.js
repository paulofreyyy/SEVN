const matchesDiv = document.getElementById('matches');
const roundTitle = document.getElementById('roundTitle');
let currentRound = 1;
let maxRounds = 0;

function fetchGames(round) {
    fetch('https://sevn-pleno-esportes.deno.dev/')
        .then(response => response.json())
        .then(data => {
            // Limpa os jogos anteriores
            matchesDiv.innerHTML = '';

            // Encontra a rodada correspondente
            const roundData = data.find(r => r.round === round);

            // Encontra o número máximo de rodadas
            maxRounds = data.length;

            if (roundData && roundData.games && roundData.games.length > 0) {
                roundTitle.textContent = `RODADA ${round}`;

                // Se rodada = 1 então botão esquerdo não exibe
                const prevRound = document.getElementById("prevRound");
                round <= 1 ? prevRound.classList.add('hidden') : prevRound.classList.remove('hidden')

                // Se rodada = maxRounds então botão direito não exibe
                const nextRound = document.getElementById("nextRound");
                round >= maxRounds ? nextRound.classList.add('hidden') : nextRound.classList.remove('hidden') 

                // Itera sobre os jogos e cria o HTML para cada um
                roundData.games.forEach(game => {
                    const gameDiv = document.createElement('div');
                    gameDiv.className = 'game';

                    gameDiv.innerHTML = `
                        <div class="gameLine">
                            <div class='teamInfos'>
                                <svg width="32" height="40" viewBox="0 0 32 40" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="url(#${game.team_home_id})" d="M16 0C14.8835 1.49628 14.1602 4.31649 9.54496 5.01371C9.11253 5.07638 8.70368 5.10772 8.31056 5.10772C5.38575 5.10772 3.61671 3.51743 3.61671 3.51743L0 7.31688C0 7.31688 5.59803 9.10302 1.11646 25.1156C-1.91843 35.9577 14.5926 37.6028 16 40C17.3995 37.6028 33.9106 35.9577 30.8835 25.1156C26.4098 9.10302 32 7.31688 32 7.31688L28.3754 3.51743C28.3754 3.51743 26.6064 5.10772 23.6816 5.10772C23.2885 5.10772 22.8796 5.07638 22.4472 5.01371C17.8398 4.32432 17.1165 1.49628 15.9921 0L16 0Z"/>
                                    <defs>
                                    <linearGradient id="${game.team_home_id}" x1="16" y1="0" x2="16" y2="40" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="var(--color-stop)"/>
                                        <stop offset="1" stop-color="var(--color-stop)" stop-opacity="0.3"/>
                                    </linearGradient>
                                </svg>
                                <p>${game.team_home_name}</p>
                            </div>

                            <div class="score">
                                <p>${game.team_home_score}</p>
                                <span>X</span>
                                <p>${game.team_away_score}</p>
                            </div>

                            <div class='teamInfos'>
                                <p>${game.team_away_name}</p>
                                <svg width="32" height="40" viewBox="0 0 32 40" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="url(#${game.team_away_id})" d="M16 0C14.8835 1.49628 14.1602 4.31649 9.54496 5.01371C9.11253 5.07638 8.70368 5.10772 8.31056 5.10772C5.38575 5.10772 3.61671 3.51743 3.61671 3.51743L0 7.31688C0 7.31688 5.59803 9.10302 1.11646 25.1156C-1.91843 35.9577 14.5926 37.6028 16 40C17.3995 37.6028 33.9106 35.9577 30.8835 25.1156C26.4098 9.10302 32 7.31688 32 7.31688L28.3754 3.51743C28.3754 3.51743 26.6064 5.10772 23.6816 5.10772C23.2885 5.10772 22.8796 5.07638 22.4472 5.01371C17.8398 4.32432 17.1165 1.49628 15.9921 0L16 0Z"/>
                                    <defs>
                                    <linearGradient id="${game.team_away_id}" x1="16" y1="0" x2="16" y2="40" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="var(--color-stop)"/>
                                        <stop offset="1" stop-color="var(--color-stop)" stop-opacity="0.3"/>
                                    </linearGradient>
                                </svg>
                            </div>
                        </div>
                    `;
                    matchesDiv.appendChild(gameDiv);
                });
            } else {
                matchesDiv.innerHTML = '<p>Nenhum jogo encontrado para essa rodada.</p>';
            }
        })
        .catch(error => {
            console.error('Erro ao carregar dados:', error);
            matchesDiv.innerHTML = '<p>Erro ao carregar jogos. Tente novamente mais tarde.</p>';
        });
}

document.getElementById('prevRound').addEventListener('click', () => {
    if (currentRound > 1) {
        currentRound--;
        fetchGames(currentRound);
    }
});

document.getElementById('nextRound').addEventListener('click', () => {
    if (currentRound < maxRounds) {
        currentRound++;
        fetchGames(currentRound);
    }
});

// Carregar a primeira rodada ao carregar a página
fetchGames(currentRound);
