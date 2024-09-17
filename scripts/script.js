const matchesDiv = document.getElementById('matches');
const roundTitle = document.getElementById('roundTitle');
let currentRound = 1;

// Função para buscar os jogos da rodada atual
function fetchGames(round) {
    fetch('https://sevn-pleno-esportes.deno.dev/')
        .then(response => response.json())
        .then(data => {
            // Limpa os jogos anteriores
            matchesDiv.innerHTML = '';

            // Encontra a rodada correspondente
            const roundData = data.find(r => r.round === round);

            // Se existir a rodada, exibe os jogos
            if (roundData && roundData.games && roundData.games.length > 0) {
                roundTitle.textContent = `RODADA ${round}`; // Atualiza o título da rodada

                // Itera sobre os jogos e cria o HTML para cada um
                roundData.games.forEach(game => {
                    const gameDiv = document.createElement('div');
                    gameDiv.className = 'game';

                    gameDiv.innerHTML = `
                        <div class="gameLine">
                            <div class='teamInfos'>
                                <img src='./assets/team_shield.svg' class='svg-icon'/>
                                <p>${game.team_home_name}</p>
                            </div>

                            <div class="score">
                                <p>${game.team_home_score}</p>
                                <span>X</span>
                                <p>${game.team_away_score}</p>
                            </div>

                            <div class='teamInfos'>
                                <p>${game.team_away_name}</p>
                                <img src='./assets/team_shield.svg' />
                            </div>
                        </div>
                    `;
                    matchesDiv.appendChild(gameDiv);
                });
            } else {
                // Caso não tenha jogos, exibe uma mensagem
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
    currentRound++;
    fetchGames(currentRound);
});

// Carregar a primeira rodada ao carregar a página
fetchGames(currentRound);