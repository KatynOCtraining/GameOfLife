const rows = 60;
const cols = 100;
const gridContainer = document.getElementById("grid-container");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const clearBtn = document.getElementById("clearBtn");
const generationCounter = document.getElementById("generationCounter");
let grid = createGrid();
let generation = 0;
let running = false; // Ajout d'une variable pour contrôler l'état du jeu

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

function updateGenerationCounter() {
  generationCounter.textContent = "Generation: " + generation;
}

function startGame() {
  // Si le jeu est déjà en cours, ne rien faire
  if (running) return;

  // Démarre le jeu en lançant une boucle d'animation
  running = true;
  const speed = 200; // Vitesse de mise à jour en millisecondes

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

    // Planifie la prochaine mise à jour de la grille
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

startBtn.addEventListener("click", startGame);
stopBtn.addEventListener("click", stopGame);
clearBtn.addEventListener("click", clearGrid);
