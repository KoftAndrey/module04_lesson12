'use strict';
(() => {
  const FIGURES_ENG = ['rock', 'scissors', 'paper'];
  const FIGURES_RUS = ['камень', 'ножницы', 'бумага'];

  const MESSAGES_ENG = {
    figures: 'Rock? Scissors? Paper?',
    draw: 'Draw',
    victory: 'Victory',
    defeat: 'Defeat',
    player: 'Player: ',
    computer: 'Computer: ',
    continue: 'Continue?',
    total: 'Total: ',
    quit: 'Quit game?',
  };

  const MESSAGES_RUS = {
    figures: 'Камень? Ножницы? Бумага?',
    draw: 'Ничья',
    victory: 'Победа',
    defeat: 'Проигрыш',
    player: 'Игрок: ',
    computer: 'Компьютер: ',
    continue: 'Продолжить?',
    total: 'Итог: ',
    quit: 'Закончить игру?',
  };

  const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const game = (language) => {
    const result = {
      player: 0,
      computer: 0,
    };

    const figs = language === 'EN' || language === 'ENG' ?
    FIGURES_ENG : FIGURES_RUS;

    const msg = language === 'EN' || language === 'ENG' ?
    MESSAGES_ENG : MESSAGES_RUS;

    return function start() {
      const userChoice = prompt(msg.figures);
      const userFig = userChoice === null ? figs[0] : userChoice.toLowerCase();

      const userIndex = figs.findIndex(value => userFig === value ||
        userFig.length === 3 && userFig === value.slice(0, 3) ||
        userFig.length === 2 && userFig === value.slice(0, 2) ||
        userFig.length === 1 && userFig === value[0]);

      if (userIndex !== -1) {
        if (userChoice !== null) {
          const compFig = figs[getRandomIntInclusive(0, 2)];

          const roundMsg = '\n' + msg.player +
                figs[userIndex] + '\n' + msg.computer + compFig;

          const mod = (a, b) => {
            const c = a % b;
            return c < 0 ? c + b : c;
          };

          if (userIndex === figs.indexOf(compFig)) {
            alert(msg.draw + roundMsg);
          } else {
            if (mod(userIndex - figs.indexOf(compFig), 3) < 1.5) {
              alert(msg.defeat + roundMsg);
              result.computer += 1;
            }

            if (mod(userIndex - figs.indexOf(compFig), 3) > 1.5) {
              alert(msg.victory + roundMsg);
              result.player += 1;
            }
          }
        }
        if (userChoice === null || !confirm(msg.continue)) {
          if (confirm(msg.quit)) {
            alert(msg.total + '\n' + msg.player + result.player +
                '\n' + msg.computer + result.computer);
            return;
          }
        }
      }
      start();
    };
  };

  window.rps = game;
})();
