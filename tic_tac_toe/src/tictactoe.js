//
// Main Container for TicTacToe Classic
// Implements a fully interactive 3x3 board, two-player logic, win/draw detection, status display, and reset feature
// Uses the colors: primary "#ffffff", secondary "#222222", accent "#4caf50" in a light theme
// Integration point: import and use in main.js to render inside #app
//

/**
 * PUBLIC_INTERFACE
 * Initializes the TicTacToe UI inside a container element.
 * @param {HTMLElement} container 
 */
export function setupTicTacToe(container) {
  // --- State ---
  let board = Array(9).fill(null); // 'X', 'O', or null
  let currentPlayer = 'X'; // Alternates between X and O
  let status = 'ongoing'; // 'ongoing' | 'win' | 'draw'
  let winner = null; // null | 'X' | 'O'

  // --- DOM creation ---
  container.innerHTML = `
    <div class="ttt-main">
      <h2 class="ttt-turn"></h2>
      <div class="ttt-board"></div>
      <div class="ttt-status"></div>
      <button class="ttt-reset">Reset Game</button>
    </div>
  `;

  // Attach elements
  const turnEl = container.querySelector('.ttt-turn');
  const boardEl = container.querySelector('.ttt-board');
  const statusEl = container.querySelector('.ttt-status');
  const resetBtn = container.querySelector('.ttt-reset');

  // --- UI Update Helpers ---
  function renderBoard() {
    boardEl.innerHTML = '';
    for (let i = 0; i < 9; ++i) {
      const cell = document.createElement('button');
      cell.className = 'ttt-cell';
      // Improved: Use a span for better centering/scalability
      cell.innerHTML = board[i] ? `<span>${board[i]}</span>` : '';
      cell.disabled = board[i] || status !== 'ongoing';
      cell.setAttribute('data-idx', i);
      boardEl.appendChild(cell);
    }
  }

  function renderTurn() {
    if (status === 'win') {
      turnEl.textContent = `🎉 Player ${winner} wins!`;
      turnEl.style.color = 'var(--ttt-accent)';
    } else if (status === 'draw') {
      turnEl.textContent = "It's a draw!";
      turnEl.style.color = 'var(--ttt-secondary)';
    } else {
      turnEl.textContent = `Current turn: Player ${currentPlayer}`;
      turnEl.style.color = 'var(--ttt-secondary)';
    }
  }

  function renderStatus() {
    if (status === 'ongoing') {
      statusEl.textContent = 'Game in progress...';
      statusEl.style.color = 'var(--ttt-secondary)';
    } else if (status === 'draw') {
      statusEl.textContent = "Nobody wins this time.";
      statusEl.style.color = 'var(--ttt-secondary)';
    } else if (status === 'win') {
      statusEl.textContent = `Congratulations Player ${winner}!`;
      statusEl.style.color = 'var(--ttt-accent)';
    }
  }

  function updateUI() {
    renderBoard();
    renderTurn();
    renderStatus();
  }

  // --- Game Logic ---
  function checkWinner(bd) {
    // All possible winning combinations
    const wins = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
      [0, 4, 8], [2, 4, 6], // diagonals
    ];
    for (let arr of wins) {
      const [a, b, c] = arr;
      if (bd[a] && bd[a] === bd[b] && bd[a] === bd[c]) {
        return bd[a];
      }
    }
    return null;
  }

  function handleCellClick(e) {
    const idx = parseInt(e.target.getAttribute('data-idx'), 10);
    if (board[idx] || status !== 'ongoing') return;
    board[idx] = currentPlayer;
    winner = checkWinner(board);
    if (winner) {
      status = 'win';
    } else if (board.every(cell => cell)) {
      status = 'draw';
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
    updateUI();
  }

  function handleBoardClick(e) {
    if (e.target.classList.contains('ttt-cell')) {
      handleCellClick(e);
    }
  }

  function handleReset() {
    board = Array(9).fill(null);
    currentPlayer = 'X';
    status = 'ongoing';
    winner = null;
    updateUI();
  }

  // --- Event Listeners ---
  boardEl.addEventListener('click', handleBoardClick);
  resetBtn.addEventListener('click', handleReset);

  // --- Initial UI Render ---
  updateUI();
}

// End of tictactoe.js
