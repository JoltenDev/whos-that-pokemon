const pokemonDisplay = document.getElementById("pokemon-display");
const successIndicator = document.getElementById("success-indicator");
const guessField = document.getElementById("guess-field");
const enterButton = document.getElementById("enter-button");
const nextButton = document.getElementById("next-button");

let pokemonName = "";
let guessed = false;

async function displayRandomPokemon() {
  const pokeData = await fetchPokemonData();

  if (pokeData && pokeData.sprites) {
    pokemonDisplay.src = pokeData.sprites.front_default;
    pokemonDisplay.alt = "Hidden Pokemon";
    pokemonDisplay.style.filter = "brightness(0%)"
    pokemonName = pokeData.name.toLowerCase();
  }
}

async function displayRobertPattinson() {
  const pattinsonImg = await fetchRobertPattinson();

  if (pattinsonImg) {
    pokemonDisplay.src = pattinsonImg;
    pokemonDisplay.alt = "Robert Pattinson";
  }
}

async function fetchPokemonData() {
  try {
    const randomID = Math.floor(Math.random() * 151) + 1;
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomID}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } 
  catch (error) {
    console.error('Fetch operation failed:', error);
  }
}

async function fetchRobertPattinson() {
  try {
    const response = await fetch("https://en.wikipedia.org/api/rest_v1/page/summary/Robert_Pattinson");
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.thumbnail.source;
  } catch (error) {
    console.error('Failed to fetch Robert Pattinson:', error);
  }
}

enterButton.addEventListener("click", () => {
  const guess = guessField.value.trim().toLowerCase();

  successIndicator.style.display = "block";

  if (guessed) return;

  if (guess === pokemonName) {
    guessed = true;

    guessField.value = "";
    pokemonDisplay.alt = pokemonName;

    pokemonDisplay.style.filter = "brightness(100%)"

    const randomEvent = Math.floor(Math.random() * 50) + 1;
    if (randomEvent === 1) {
      displayRobertPattinson();
      successIndicator.textContent = `Incorrect! The Pokémon is actually Robert Pattinson!`;
      return;
    }

    const formattedName = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
    successIndicator.textContent = `Correct! The Pokémon is ${formattedName}!`;
  }
  else {
    successIndicator.textContent = `Incorrect!`;
  }
});

nextButton.addEventListener("click", () => {
  successIndicator.style.display = "none";
  guessed = false;

  displayRandomPokemon();
});

displayRandomPokemon();