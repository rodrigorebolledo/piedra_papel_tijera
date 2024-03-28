let rounds;
let playedRounds = 0;
let userPoints = 0;
let machinePoints = 0;

const input = document.getElementById("rounds");
const startButton = document.getElementById("startButton");
const gameContainer = document.getElementById("gameContainer");

const playButton = document.createElement("button");
const playButtonText = document.createTextNode("Que empiece el juego");
playButton.appendChild(playButtonText);
playButton.setAttribute("id", "playButton");

startButton.addEventListener("click", () => {
  startButton.disabled = true;
  rounds = input.value;
  if (rounds > 0) {
    gameContainer.appendChild(
      createTitle(`Empecemos, la cantidad de rondas es ${rounds}`)
    );
    gameContainer.appendChild(createGameSelector());
    gameContainer.appendChild(playButton);
  } else {
    alert("Debes especificar un número");
  }
});

playButton.addEventListener("click", () => {
  if (playedRounds >= parseInt(rounds)) {
    alert("Ya acabo...");
    return;
  }

  const gameSelector = document.getElementById("gameSelector");
  const selectedValue = gameSelector.value;
  const machineSelection = chooseRandomOption();

  play(selectedValue, machineSelection);
  if (playedRounds >= parseInt(rounds)) {
    const winner = getWinner();
    alert("Fin del juego");
    alert(`Ganó... ${winner}`);
    location.reload();
  }
});

function getWinner() {
  if (userPoints > machinePoints) {
    return "El usuario, osea tú!!!";
  }

  if (machinePoints > userPoints) {
    return "La máquina :(";
  }

  return "Nadie... fue un empate";
}

function play(selectedValue, machineSelection) {
  playedRounds++;

  alert(`La maquina eligió: ${machineSelection}`);

  if (selectedValue === machineSelection) {
    alert("Empate");
    return;
  }

  if (selectedValue === "piedra" && machineSelection === "papel") {
    alert("Gana la maquina");
    machinePoints++;
    return;
  }

  if (selectedValue === "piedra" && machineSelection === "tijera") {
    alert("Ganaste");
    userPoints++;
    return;
  }

  if (selectedValue === "papel" && machineSelection === "tijera") {
    alert("Gana la maquina");
    machinePoints++;
    return;
  }

  if (selectedValue === "papel" && machineSelection === "piedra") {
    alert("Ganaste");
    userPoints++;
    return;
  }

  if (selectedValue === "tijera" && machineSelection === "piedra") {
    alert("Gana la maquina");
    machinePoints++;
    return;
  }

  if (selectedValue === "tijera" && machineSelection === "papel") {
    alert("Ganaste");
    userPoints++;
    return;
  }

  alert(
    `Quedó mal programado, hay un caso que no se cumple seleccionaste: ${selectedValue}, la maquina eligió ${machineSelection}`
  );
}

function createTitle(text) {
  const newTitle = document.createElement("h2");
  const textContent = document.createTextNode(text);
  newTitle.appendChild(textContent);

  return newTitle;
}

function chooseRandomOption() {
  const options = ["piedra", "papel", "tijera"];
  const randomValue = Math.floor(Math.random() * 3);
  return options[randomValue];
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
