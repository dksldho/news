const API_KEY=`2da4e0160291488f92e4017b959de77c`;
let news=[]
const getLatesNews = async ()=>  {
    const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);

    const response = await fetch(url)
    const data = response.json();
    news = data.articles;
    console.log("ddddd", news);
};

getLatesNews(); 