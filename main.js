import "./style.css";

// Selecting the input form and the main content div
const inputForm = document.querySelector("form");
const mainContent = document.querySelector(".main-content");

// Function to fetch associated words from thesaurus API
function fetchAssociatedWords(word) {
  fetch(`https://api.api-ninjas.com/v1/thesaurus?word=${word}`)
    .then((response) => response.json())
    .then((response) => printFiveAssociatedWords(response.synonyms)); //synonyms is array inside which are all the words
}
// Function to handle form submission
function submitForm(event) {
  event.preventDefault();
  const wordInput = document.querySelector("form input").value;
  fetchAssociatedWords(wordInput);
}
// Adding a submit event listener to the form
inputForm.addEventListener("submit", (event) => submitForm(event));

// Function to create and append a word as a list item
function createAndAppendWord(word) {
  const elem = document.createElement("li");
  elem.innerHTML = word;
  // Adding a click event listener to populate the input field with the clicked word
  elem.addEventListener("click", () => {
    const wordInput = document.querySelector("form input");
    wordInput.value = word;
  });
  // https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_copy_clipboard
  // Adding a double click event listener to copy the word to clipboard
  elem.addEventListener("dblclick", () => {
    navigator.clipboard.writeText(word);
  });
  // Appending the list item to the main content div
  mainContent.appendChild(elem);
}
// Function to print the first five associated words on the page
function printFiveAssociatedWords(wordList) {
  const sortedWordList = wordList.slice(0, 5);
  // Clearing the main content before adding new words
  while (mainContent.firstChild) {
    mainContent.removeChild(mainContent.firstChild);
  }
  // Adding each word to the main content
  if (sortedWordList.length > 1) {
    sortedWordList.forEach((word) => {
      createAndAppendWord(word);
    });
  } else {
    createAndAppendWord("No associated words found!");
  }
}

// API used https://api.api-ninjas.com/v1/thesaurus?word=super
