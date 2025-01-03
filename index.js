const form = document.querySelector("form");
const searchValue = document.querySelector("#search-value");
const img = document.querySelector("img");
const spanerror = document.getElementById("error-span");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkInputValidity();

  if (!searchValue.checkValidity()) {
    return;
  }

  fetch(
    `https://api.giphy.com/v1/gifs/translate?api_key=YphoJo3ndyPiIjXnu0Hbb0Ua0DxzXHgM&s=${searchValue.value}`,
    {
      mode: "cors",
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Unexpected error");
      }
      return response.json();
    })
    .then((response) => {
      console.log(response);
      
      if (!response.data || response.data.length == 0) {
        throw new Error("Couldn t find results");
      }
      img.src = response.data.images.original.url;
    })
    .catch((error) => {
      img.src = "";
      spanerror.textContent = error;
    });
});

searchValue.addEventListener("input", checkInputValidity);

function checkInputValidity() {
  searchValue.setCustomValidity("");
  spanerror.textContent = "";
  if (searchValue.validity.valueMissing) {
    searchValue.setCustomValidity(
      "you should type something into the search input"
    );
  }
  searchValue.reportValidity();
}
