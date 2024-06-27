const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const imageResults = document.getElementById("imageResults");
const showmore_btn = document.querySelector(".showmore");
const showless_btn = document.querySelector(".showless");
const shows = document.getElementById("show");
const btn = document.getElementById("btn");
const parant = document.getElementById("parant");
const btns = document.getElementById("btns");
const apiKey = "Ar7AVJEYPlyG8jHbvUlZA9550ksTFb3xGWXTUpOBP5OEU0eEuw2sS9cG";
page_num = 1;
searchButton.addEventListener("click", searchImages);
// showmore.addEventListener('click',show);
// function show(){
//   searchImages();
// }
async function searchImages(page_num) {
  const query = searchInput.value.trim();
  if (query === "") {
    alert("Enter something");
    return;
  }
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(
    query
  )}&locale=en-US&per_page=15&page=${page_num}`;

  const options = {
    method: "GET",
    headers: {
      Authorization: apiKey,
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
    displayImages(data);
    btn.style.display = "block";
    imageResults.style.display = "flex";
    parant.style.display = "flex";
  } catch (error) {
    console.error(error);
  }
}

function displayImages(data) {
  imageResults.innerHTML = "";
  const phot = [data.photos];
  let len = phot.length;
  const err = document.createElement("p");
  err.innerHTML = "No more photos";

  data.photos.forEach((photo) => {
    const imageCard = document.createElement("div");
    imageCard.className = "imageCard";

    const image = document.createElement("img");
    image.src = photo.src.large2x;
    image.alt = photo.photographer;
    imageCard.appendChild(image);
    if (len === 0) {
      imageCard.appendChild(err);
    }
    image.addEventListener("click", function () {
      shows.style.display = "flex";
      shows.innerHTML = "";
      let igbig = document.createElement("img");
      igbig.src = photo.src.large2x;
      shows.appendChild(igbig);
      const btn = document.createElement("div");
      btn.className = "btns";
      let lin = document.createElement("a");
      lin.href = photo.src.large2x;
      lin.className = "ank";
      lin.innerHTML = "download";
      lin.setAttribute("download", "");
      btn.appendChild(lin);
      let cls = document.createElement("i");
      cls.innerHTML = "Close";
      btn.appendChild(cls);
      shows.appendChild(btn);
      cls.addEventListener("click", function () {
        shows.style.display = "none";
      });
    });

    const photographer = document.createElement("p");
    photographer.textContent = `Photographer: ${photo.photographer}`;
    imageCard.appendChild(photographer);

    imageResults.appendChild(imageCard);
  });
}

showmore_btn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query === "") return;
  page_num++;
  searchImages(page_num);
  console.log(page_num);
});
showless_btn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (page_num === 1) return;
  else if (query === "") return;
  page_num--;
  searchImages(page_num);
  console.log(page_num);
});
