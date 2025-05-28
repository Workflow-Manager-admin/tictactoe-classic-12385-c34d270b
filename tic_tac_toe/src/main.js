import './style.css'
import { setupTicTacToe } from './tictactoe.js'

const appEl = document.querySelector('#app');
if (appEl) {
  setupTicTacToe(appEl);
}
