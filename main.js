// Grab a reference to form element and store it
const form = document.querySelector(".search-form");
// Add an event listener to form submit event
form.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
    e.preventDefault();
    let query = document.querySelector(".search-input").value;
    query = query.trim();
    console.log(query);
    getResults(query);
  }

  function getResults(query) {
    const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&origin=*&srlimit=25&utf8=&format=json&srsearch=${query}`;
  
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        putResults(data.query.search);
      })
      .catch((e) => console.log(`ERROR : ${e}`));
  }

  function putResults(sResults) {
    // Refer to `.results` section
    const searchResults = document.querySelector(".results");
    searchResults.innerHTML = "";
    // Loop over each result
    sResults.forEach((result) => {
      //Generate a wikipedia page url for each result
      const url = encodeURI(`https://en.wikipedia.org/wiki/${result.title}`);
  
      //Insert a result item as a child one by one into the parent conainter
      searchResults.insertAdjacentHTML(
        "beforeend",
        `<div class="result">
        <h3 class="result-title">
          <a href="${url}" target="_blank" rel="noopener">${result.title}</a>
        </h3>
        <span class="result-snippet">${result.snippet}</span><br>
        <a href="${url}" class="result-link" target="_blank" rel="noopener">${url}</a>
      </div>`
      );
    });
  }