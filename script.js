let submitButton = document.getElementById("button");
let orderedList = document.getElementById("orderedList");
const baseUrl = `https://exercisehighscores-default-rtdb.europe-west1.firebasedatabase.app/`;

//Hämtar highscres från firebase.
async function getHighscores() {
  const url = baseUrl + "scores.json";
  const response = await fetch(url);
  const highscores = await response.json();
  return highscores;
}

//Sorterar scoren - högst score först.
async function sortingHighscores() {
  const highscores = await getHighscores();
  const highscoreEntries = Object.entries(highscores);
  const sortedHighscores = highscoreEntries.sort(
    (a, b) => b[1].score - a[1].score
  );

  const final = sortedHighscores.map((sortedHighscore) => sortedHighscore[1]);
  return final;
}

//Renderar highscoren till DOM.
async function renderHighscores() {
  const highscores = await sortingHighscores();

  let highscoreOne = document.createElement("li");
  let highscoreTwo = document.createElement("li");
  let highscoreThree = document.createElement("li");
  highscoreOne.innerText = `${highscores[0].name} : ${highscores[0].score}`;
  highscoreTwo.innerText = `${highscores[1].name} : ${highscores[1].score}`;
  highscoreThree.innerText = `${highscores[2].name} : ${highscores[2].score}`;

  orderedList.innerHTML = "";

  orderedList.appendChild(highscoreOne);
  orderedList.appendChild(highscoreTwo);
  orderedList.appendChild(highscoreThree);
}

//Eventlistener som exekverar funktionen updateHighScores() som uppdaterar highscorsen med nya värden.
submitButton.addEventListener("click", async (event) => {
  event.preventDefault();

  let userName = document.getElementById("inputText").value;
  let userScore = document.getElementById("inputNumber").value;

  //Updatehighscores funktionen.
  async function updateHighScores() {
    const highscores = await getHighscores();
    console.log(highscores[userName]);
    highscores[userName] = {
      name: userName,
      score: Number(userScore),
    };

    console.log(highscores);

    const baseUrl = `https://exercisehighscores-default-rtdb.europe-west1.firebasedatabase.app/`;
    const url = baseUrl + "scores.json";

    const init = {
      method: "PUT",
      body: JSON.stringify(highscores),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    };

    const response = await fetch(url, init);
    const data = await response.json();
  }
  await updateHighScores();
  await renderHighscores();
});

renderHighscores();
