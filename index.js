const form = document.querySelector("form");
const searchValue = document.querySelector("#search-value");
const img = document.querySelector("img");
const spanerror = document.getElementById("error-span");

form.addEventListener("submit", getImages);

async function getImages(e) {
  e.preventDefault();
  checkInputValidity();

  if (!searchValue.checkValidity()) {
    return;
  }

  const response = await fetch(
    `https://api.giphy.com/v1/gifs/translate?api_key=YphoJo3ndyPiIjXnu0Hbb0Ua0DxzXHgM&s=${searchValue.value}`,
    {
      mode: "cors",
    }
  )

  try {
    if (!response.ok){
      throw new Error("Unexpected error");
    }
    
    const responseJson = await response.json();

    if (!responseJson.data || responseJson.data.length === 0) {
      throw new Error("Couldn t find results");
    }

    img.src = responseJson.data.images.original.url;

  } catch (error) {
    img.src = "";
    spanerror.textContent = error;
  }
}

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
