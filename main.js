const API_KEY=`2da4e0160291488f92e4017b959de77c`;
let newsList=[]
const menus = document.querySelectorAll(".menus button")
menus.forEach(menu=>menu.addEventListener("click",(event)=>getNewsByCategory(event)))

let url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`)

let totalResult = 0
let page = 1
const pageSize = 10
const GroupSize = 5

const getNews = async() =>{
    try{
        url.searchParams.set("page",page) // &page=page
        url.searchParams.set("pageSize",pageSize)
        const response = await fetch(url)
    const data = await response.json()
    if(response.status === 200){
        if(data.articles.length===0){
            throw new Error("NO RESULT FOR THIS RESEARCH")
        }
    newsList=data.articles
    totalResult = data.totalResults
    render()
    paginationRender()
    }else{
        throw new Error(data.message)
    }

    }catch(error){
        errorRender(error.message)
    }
}


const getLatesNews = async ()=>  {
     url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);

    getNews()
};

const getNewsByCategory = async (event) => {
    const category = event.target.textContent.toLowerCase();
    
    url = new URL(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`)
    
    getNews()
}

const getNewsBykeyword = async() => {
    const keyword = document.getElementById("search-input").value
    
    url = new URL(`https://newsapi.org/v2/top-headlines?country=us&q=${keyword}&apiKey=${API_KEY}`)
    
    getNews()
}





const render = () => {
    const newsHTML = newsList.map(
        (news) => ` <div class="row news">
    <div class="col-lg-4">
        <img class="news-img-size" 
        src=${news.urlToImage} />
    </div>
    <div class="col-lg-8">
        <h2>${news.title}</h2>
        <p>
            ${news.description}
        </p>
    <div>
        ${news.source.name} * ${news.publishedAt}
    </div>
    </div>
</div>`
).join(" ");


    document.getElementById("news-board").innerHTML=newsHTML
};

const errorRender = (errorMessage) =>{
    const errorHTML = `<div class="alert alert-danger" role="alert">
    ${errorMessage}
  </div>`

  document.getElementById("news-board").innerHTML=errorHTML
}


const paginationRender=()=>{

const pageGroup = Math.ceil(page / GroupSize)
const totalPages = Math.ceil(totalResult/pageSize)
const lastPage = pageGroup * GroupSize
if(lastPage>totalPages){
    lastPage=totalPages
}
const firstPage = 
lastPage - (GroupSize - 1) <= 0 ? 1: lastPage - (GroupSize - 1)

let paginationHTML =`<li class="page-item"onclick="moveToPage(${page-1})"><a class="page-link" href="#">Previous</a></li>`

for(let i=firstPage;i<=lastPage;i++){
    paginationHTML+=`<li class="page-item ${i===page?"active":""}" onclick=moveToPage(${i}) ><a class="page-link">${i}</a></li>`
}

paginationHTML += `<li class="page-item" onclick="moveToPage(${page+1})"><a class="page-link" href="#">Next</a></li>`
document.querySelector(".pagination").innerHTML=paginationHTML
}

const moveToPage = (pageNum) => {
    page = pageNum
    getNews()
}



getLatesNews(); 

//1. 버튼에 클릭이벤트
//2.카테고리별 뉴스 가져오기
//3. 뉴스 보여주