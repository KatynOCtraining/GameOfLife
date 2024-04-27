const rows = 70;
const cols = 100;
const gridContainer = document.getElementById("grid-container");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const clearBtn = document.getElementById("clearBtn");
const gliderBtn = document.getElementById("gliderBtn");
const speedUpBtn = document.getElementById("speedUpBtn");
const speedDownBtn = document.getElementById("speedDownBtn");
const generationCounter = document.getElementById("generationCounter");
let grid = createGrid();
let generation = 0;
let running = false; // Ajout d'une variable pour contrôler l'état du jeu
let speed = 400; // Vitesse de mise à jour initiale en millisecondes

function createGrid() {
  let grid = new Array(rows);
  for (let i = 0; i < rows; i++) {
    grid[i] = new Array(cols);
    for (let j = 0; j < cols; j++) {
      let cell = document.createElement("div");
      cell.classList.add("cell");
      cell.addEventListener("click", () => toggleCell(i, j));
      gridContainer.appendChild(cell);
      grid[i][j] = 0;
    }
  }
  return grid;
}

function toggleCell(row, col) {
  if (grid[row][col] === 0) {
    grid[row][col] = 1;
    gridContainer.children[row * cols + col].style.backgroundColor = "black";
  } else {
    grid[row][col] = 0;
    gridContainer.children[row * cols + col].style.backgroundColor = "";
  }
}

function clearGrid() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      grid[i][j] = 0;
      gridContainer.children[i * cols + j].style.backgroundColor = "";
    }
  }
  generation = 0;
  updateGenerationCounter();
}

function addGlider() {
  // Coordonnées du glider
  const gliderCells = [
    [1, 0],
    [2, 1],
    [0, 2],
    [1, 2],
    [2, 2],
  ];

  // Place le glider sur la grille
  gliderCells.forEach(([row, col]) => {
    grid[row][col] = 1;
    gridContainer.children[row * cols + col].style.backgroundColor = "black";
  });
}

function updateGenerationCounter() {
  generationCounter.textContent = "Generation: " + generation;
}

function startGame() {
  // Si le jeu est déjà en cours, ne rien faire
  if (running) return;

  // Démarre le jeu en lançant une boucle d'animation
  running = true;

  function updateGrid() {
    if (!running) return;

    // Copie de la grille actuelle pour stocker les prochaines valeurs
    let nextGrid = new Array(rows).fill(0).map(() => new Array(cols).fill(0));

    // Parcours de chaque cellule pour appliquer les règles du jeu
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        let neighbors = countNeighbors(i, j);
        if (grid[i][j] === 1) {
          // Cellule vivante
          if (neighbors < 2 || neighbors > 3) {
            // Sous-population ou surpopulation, la cellule meurt
            nextGrid[i][j] = 0;
          } else {
            // La cellule reste vivante
            nextGrid[i][j] = 1;
          }
        } else {
          // Cellule morte
          if (neighbors === 3) {
            // Une cellule morte avec exactement 3 voisins vivants devient vivante
            nextGrid[i][j] = 1;
          }
        }
      }
    }

    // Met à jour l'affichage de la grille avec les nouvelles valeurs
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (grid[i][j] !== nextGrid[i][j]) {
          if (nextGrid[i][j] === 1) {
            gridContainer.children[i * cols + j].style.backgroundColor =
              "black";
          } else {
            gridContainer.children[i * cols + j].style.backgroundColor = "";
          }
        }
        grid[i][j] = nextGrid[i][j];
      }
    }

    // Incrémente le compteur de génération et met à jour son affichage
    generation++;
    updateGenerationCounter();

    // Planifie la prochaine mise à jour de la grille avec la vitesse actuelle
    setTimeout(updateGrid, speed);
  }

  // Lance la boucle d'animation
  updateGrid();
}

function stopGame() {
  // Arrête le jeu en changeant la valeur de la variable running
  running = false;
}

function countNeighbors(x, y) {
  let count = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      let row = (x + i + rows) % rows;
      let col = (y + j + cols) % cols;
      count += grid[row][col];
    }
  }
  count -= grid[x][y]; // Exclut la cellule elle-même
  return count;
}

const gliderGunBtn = document.getElementById("gliderGunBtn");
const spaceshipBtn = document.getElementById("spaceshipBtn");

gliderGunBtn.addEventListener("click", addGliderGun);
spaceshipBtn.addEventListener("click", addSpaceship);

function addGliderGun() {
  // Coordonnées du glider gun
  const gliderGunCells = [
    [5, 1],
    [5, 2],
    [6, 1],
    [6, 2],
    [5, 11],
    [6, 11],
    [7, 11],
    [4, 12],
    [8, 12],
    [3, 13],
    [9, 13],
    [3, 14],
    [9, 14],
    [6, 15],
    [4, 16],
    [8, 16],
    [5, 17],
    [6, 17],
    [7, 17],
    [6, 18],
    [3, 21],
    [4, 21],
    [5, 21],
    [3, 22],
    [4, 22],
    [5, 22],
    [2, 23],
    [6, 23],
    [1, 25],
    [2, 25],
    [6, 25],
    [7, 25],
    [3, 35],
    [4, 35],
    [3, 36],
    [4, 36],
  ];

  // Place le glider gun sur la grille
  gliderGunCells.forEach(([row, col]) => {
    grid[row][col] = 1;
    gridContainer.children[row * cols + col].style.backgroundColor = "black";
  });
}

function addSpaceship() {
  // Coordonnées du spaceship
  const spaceshipCells = [
    [1, 0],
    [1, 3],
    [2, 4],
    [3, 0],
    [3, 4],
    [4, 1],
    [4, 2],
    [4, 3],
    [4, 4],
  ];

  // Place le spaceship sur la grille
  spaceshipCells.forEach(([row, col]) => {
    grid[row][col] = 1;
    gridContainer.children[row * cols + col].style.backgroundColor = "black";
  });
}
const copperheadBtn = document.getElementById("copperheadBtn");

copperheadBtn.addEventListener("click", addCopperhead);

function addCopperhead() {
  // Coordonnées du Copperhead
  const copperheadCells = [
    [0, cols - 32],
    [0, cols - 33],
    [0, cols - 36],
    [0, cols - 37],
    [1, cols - 34],
    [1, cols - 35],
    [2, cols - 34],
    [2, cols - 35],
    [3, cols - 31],
    [3, cols - 33],
    [3, cols - 36],
    [3, cols - 38],
    [4, cols - 31],
    [4, cols - 38],
    [6, cols - 31],
    [6, cols - 38],
    [7, cols - 32],
    [7, cols - 33],
    [7, cols - 36],
    [7, cols - 37],
    [8, cols - 33],
    [8, cols - 34],
    [8, cols - 35],
    [8, cols - 36],
    [10, cols - 34],
    [10, cols - 35],
    [11, cols - 34],
    [11, cols - 35],
  ];

  // Place le Copperhead sur la grille
  copperheadCells.forEach(([row, col]) => {
    grid[row][col] = 1;
    gridContainer.children[row * cols + col].style.backgroundColor = "black";
  });
}
startBtn.addEventListener("click", startGame);
stopBtn.addEventListener("click", stopGame);
clearBtn.addEventListener("click", clearGrid);
gliderBtn.addEventListener("click", addGlider);
speedUpBtn.addEventListener("click", speedUp);
speedDownBtn.addEventListener("click", speedDown);
function speedUp() {
  speed -= 50; // Diminue la vitesse de 50 millisecondes
  if (speed < 50) speed = 50; // Limite la vitesse minimale à 50 millisecondes
}

function speedDown() {
  speed += 50; // Augmente la vitesse de 50 millisecondes
  if (speed > 2000) speed = 2000; // Limite la vitesse maximale à 2000 millisecondes (2 secondes)
}
