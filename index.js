let mode = 'light'
const apiKey = ''

const getData = async () => {
    let response = await fetch(`https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}`)
    return await response.json()
}

const getCategory = async (category) => {
    let response = await fetch(`https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=${apiKey}`)
    return await response.json()
}

const getSearch = async (search)=>{
    let response = await fetch(`https://newsapi.org/v2/everything?q=${search}&apiKey=${apiKey}`)
    return await response.json()
}

let input
document.getElementById('input').addEventListener('input',(e)=>{
    input = e.target.value;
})

document.getElementById('submit').addEventListener('click',async (e)=>{
    e.preventDefault()
    let res = await getSearch(input)
    document.getElementById('input').value = ''
    setVal(res)
})

const setVal = (data) => {
    document.getElementById('container').innerHTML = ''
    data.articles.forEach(element => {
        document.getElementById('container').innerHTML +=
            `<div class="col rounded-4">
                    <div class="card h-100">
                            <img src=${element.urlToImage} class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${element.title}</h5>
                            <p class="card-text" style="font-size: 14px;">${element.description}</p>
                            <button type="button" class="btn btn-primary position-relative my-1">${element.source.name}</button>
                            <a type="button" class="btn btn-primary position-relative my-1" href=${element.url}>visit</a>
                        </div>
                    </div>
                </div>`
    });
}



window.addEventListener('load', async () => {
    let data = await getData()
    setVal(data)
    Array.from(document.getElementsByClassName('cat')).forEach((element) => {
        element.addEventListener('click', async () => {
            let val = element.innerText
            if (val === 'Home') {
                let data = await getData()
                setVal(data)
            }
            else {
                let data = await getCategory(val)
                setVal(data)
            }
        })
    })
    document.getElementById('mode').addEventListener('click', () => {
        if (mode == 'light') {
            mode = 'dark'
            document.getElementById('nav').classList.add('bg-dark')
            document.getElementById('nav').classList.add('navbar-dark')
            document.getElementsByTagName('body')[0].style.backgroundColor = '#343a40'
            document.getElementById('label').style.color = 'white'
            document.getElementById('label').innerText = `${mode} mode `
        }else{
            mode = 'light'
            document.getElementById('nav').classList.remove('bg-dark')
            document.getElementById('nav').classList.remove('navbar-dark')
            document.getElementsByTagName('body')[0].style.backgroundColor = 'white'
            document.getElementById('label').style.color = 'black'  
            document.getElementById('label').innerText = `${mode} mode `
        }

    })
    
})