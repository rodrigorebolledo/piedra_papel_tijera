let rounds;
let playedRounds = 0;
let userPoints = 0;
let machinePoints = 0;

const roundsInput = document.getElementById("rounds");
const initButton = document.getElementById("initButton");
const gameContainer = document.getElementById("gameContainer");
const playRoundButton = createButton({
  buttonText: "Que empiece el juego",
  buttonId: "playRoundButton",
  buttonHandler: playRoundButtonHandler,
});

function initButtonHandler() {
  rounds = parseInt(roundsInput.value);
  if (rounds > 0) {
    initButton.disabled = true;
    initGame();
    return;
  }

  alert("Debes especificar un número mayor a 0");
}

function playRoundButtonHandler() {
  const userSelection = document.getElementById("gameSelector").value;
  const machineSelection = chooseRandomOption();
  getRoundResult(userSelection, machineSelection);

  if (playedRounds >= rounds) {
    alert(`Resultado final: ganó... ${getWinner()}`);
    location.reload();
  }
}

function initGame() {
  gameContainer.appendChild(
    createTitle(`Empecemos, la cantidad de rondas es ${rounds}`)
  );
  gameContainer.appendChild(createGameSelector());
  gameContainer.appendChild(playRoundButton);
}

function getRoundResult(selectedValue, machineSelection) {
  playedRounds++;

  alert(`La maquina eligió: ${machineSelection}`);

  if (selectedValue === machineSelection) {
    alert("Empate");
    return;
  }

  if (
    (selectedValue === "piedra" && machineSelection === "papel") ||
    (selectedValue === "papel" && machineSelection === "tijera") ||
    (selectedValue === "tijera" && machineSelection === "piedra")
  ) {
    alert("Gana la maquina");
    machinePoints++;
    return;
  }

  alert("Ganaste");
  userPoints++;
}

function getWinner() {
  if (userPoints > machinePoints) {
    return "El usuario, osea tú!!!";
  }

  if (machinePoints > userPoints) {
    return "La máquina :(";
  }

  return "Nadie... fue un empate";
}

function chooseRandomOption() {
  const options = ["piedra", "papel", "tijera"];
  const randomValue = Math.floor(Math.random() * 3);
  return options[randomValue];
}

//DOM METHODS
function createButton({ buttonText, buttonId, buttonHandler }) {
  const buttonElement = document.createElement("button");
  const buttonElementText = document.createTextNode(buttonText);
  buttonElement.appendChild(buttonElementText);
  buttonElement.setAttribute("id", buttonId);
  buttonElement.addEventListener("click", buttonHandler);

  return buttonElement;
}

function createTitle(text) {
  const newTitle = document.createElement("h2");
  const textContent = document.createTextNode(text);
  newTitle.appendChild(textContent);

  return newTitle;
}

function createGameSelector() {
  const selectEl = document.createElement("select");
  selectEl.setAttribute("id", "gameSelector");

  const piedraOption = document.createElement("option");
  piedraOption.setAttribute("value", "piedra");

  const piedraText = document.createTextNode("Piedra");
  piedraOption.appendChild(piedraText);

  const papelOption = document.createElement("option");
  papelOption.setAttribute("value", "papel");

  const papelText = document.createTextNode("Papel");
  papelOption.appendChild(papelText);

  const tijeraOption = document.createElement("option");
  tijeraOption.setAttribute("value", "tijera");

  const tijeraText = document.createTextNode("Tijera");
  tijeraOption.appendChild(tijeraText);

  selectEl.appendChild(piedraOption);
  selectEl.appendChild(papelOption);
  selectEl.appendChild(tijeraOption);

  return selectEl;
}
