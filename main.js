//////////// selecting item /////////////

const searchResult = document.getElementById("searchValue");
const buttonSearched = document.getElementById("searchButton");
const searchURL = "https://api.lyrics.ovh/suggest/";
const resultShow = document.getElementById("showResult");
const lyricsURL = "https://api.lyrics.ovh/v1/";
const LyricsShow = document.getElementById("showLyrics");

//////////// get search result by api /////////////////////
const getSearchResult = () => {
    fetch(`${searchURL}${searchResult.value}`)
        .then(res => res.json())
        .then(data => {
            createSearchResult(data.data);
        });
};

//////////////////// search button event handler///////////////

buttonSearched.addEventListener("click", () => {
    resultShow.innerHTML = "";
    LyricsShow.innerHTML = "";
    getSearchResult();
});

///////////////// result trim up-to 10////////////////
const createSearchResult = songs => {
    for (let i = 0; i < songs.length; i++) {
        if (i > 9) {
            break;
        } else {
            songsShow(songs[i].title, songs[i].album.title, songs[i].artist.name);
        }
    }
};

/////////////////////// song show div /////////////////

const songsShow = (title, album, artist) => {
    resultShow.innerHTML += `<div class="single-result row align-items-center my-3 p-3">
                              <div class="col-md-6">
                              <h3 class="lyrics-name">${title}</h3>
                              <p class="author lead"> Album: <span>${album}</span></p>
                              </div>
                              <div class="col-md-3  text-center artistName">By ${artist}</div>  
                              <div class="col-md-3 text-md-right text-center">
                              <button onclick="getLyric('${artist}', '${title}')" class="btn btn-success">Get Lyrics</button>
                              </div>                         
                              </div>`;
};

/////////////////// get lyrics ////////////////////

const getLyric = (artist, title) => {
    fetch(`${lyricsURL}/${artist}/${title}`)
        .then(res => res.json())
        .then(song => {
            showLyric(title, artist, song.lyrics);
        });
    resultShow.innerHTML = "";
};

///////////////// show lyrics /////////////

const showLyric = (title, artist, lyrics = "Lyric not available!") => {
    LyricsShow.innerHTML = ` <button class="btn go-back">&lsaquo;</button>
                            <h2 class="text-success mb-4">${title} - ${artist}</h2>
                            <pre class="lyric text-white">${lyrics}</pre>
                          `;
};

//////////finished//////////////////