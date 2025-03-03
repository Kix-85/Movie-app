const apiKey = '9813ce01a72ca1bd2ae25f091898b1c7';

const contentList = document.getElementById("content-list");

const nextBtn=document.getElementById("next");

const previousBtn=document.getElementById("previous");

var pageNumber=1;

var api_url = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${pageNumber}&api_key=${apiKey}`;

async function fetchContent() {
    const rawContent= await fetch(api_url);
    const content=await rawContent.json();
    console.log(content.results);
    return content.results;
}

function makeCards(){
    fetchContent().then(contents=>{ 
        contentList.innerHTML=``;
        contents.forEach(content => {
            console.log(content.id);
            contentList.innerHTML+=`
                <div class="col-lg-3 col-md-4 col-sm-6" style="box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px; border-radius:10px;">
                    <div class="card h-100">
                        <a href="details.html?id=${content.id}"><img src="https://image.tmdb.org/t/p/w500${content.poster_path}" class="card-img-top" alt="${content.title}"></a>
                        <div class="card-body">
                        <a><h5 class="card-title">${content.title}</h5></a>
                        <p class="card-text">${shortenOverView(content.overview)}</p>
                        </div>
                    </div>
                </div>
            `;
        });
    });
}

function shortenOverView(overview) {
    x=overview.substr(0,120);
    x+="..."
    return x 
}

makeCards()

nextBtn.onclick=function(){
    pageNumber++;
    api_url = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${pageNumber}&api_key=${apiKey}`;
    document.documentElement.scrollTop=0;
    makeCards();
    console.log(pageNumber);
}

previousBtn.onclick=function() {
    if(pageNumber>1){
        pageNumber--;
        api_url = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${pageNumber}&api_key=${apiKey}`;
        document.documentElement.scrollTop=0;
        makeCards()
    }
    console.log(pageNumber);
    console.log(api_url);
}