const main = document.getElementById("main");
const select = document.querySelector('.genre-menu')

fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=62de0e1df47bdc3c96ee92b21f722e7b')
    .then(response => response.json())
    .then(data => {
        data.genres.forEach(genre => render(genre))
    });

function render(genre) {
    const opt = document.createElement('option');
    opt.value = genre.id;
    const content = document.createTextNode(`${genre.name}`)
    opt.appendChild(content)
    select.appendChild(opt)
}


async function loadPage(url) {
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            showMovies(data.results);
        });


}

function showMovies(data) {
    main.innerHTML = " ";
    data.forEach((movie) => {
        const { title, poster_path, overview } = movie;
        const article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = `
      <div class="article row card col-12">
          <img src="${"https://image.tmdb.org/t/p/w500" + poster_path
            }" class="card-img-top" alt="${title}" />
          <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">
              "${overview}"
            </p>
          </div> 
          </div>
          `;

        main.appendChild(article);
    });
}


loadPage("https://api.themoviedb.org/3/search/movie?api_key=62de0e1df47bdc3c96ee92b21f722e7b&query=m&year=2022");
