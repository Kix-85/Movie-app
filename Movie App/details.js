const apiKey = '9813ce01a72ca1bd2ae25f091898b1c7';

const title=document.getElementById("title");

const tagLine=document.getElementById("tagline");

const overview=document.getElementById("overview");

const poster=document.getElementById("poster")

const main=document.getElementById("main");

const genre=document.getElementById("genre")

const params=new URLSearchParams(window.location.search);

const api_url=`https://api.themoviedb.org/3/movie/${params.get("id")}?language=en-US&api_key=${apiKey}`
const color= new ColorThief()

async function fetchContent() {
    const rawContent= await fetch(api_url);
    const content=await rawContent.json();
    console.log(content);
    return content;
}
fetchContent().then(contents=>{
    poster.setAttribute("src","https://image.tmdb.org/t/p/w500"+contents.poster_path)
    main.style.backgroundImage=`url(https://image.tmdb.org/t/p/w500${contents.backdrop_path})`
    title.innerText=contents.title;
    tagLine.innerText=contents.tagline;
    overview.innerText=contents.overview;
    var x="Genre:"
    console.log(contents.genres );
    
    contents.genres.forEach(genre => {
        x+=" "+genre.name
    });
    genre.innerHTML=`
        <p>${x}</p>
    `
})