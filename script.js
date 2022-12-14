const input = document.querySelector('.warning--link #input');
const shortenBtn = document.querySelector('.warning--link #submit');
const linkFull = document.querySelector('.link--full');
const linkShorten = document.querySelector('.link--shorten');
const model = document.querySelector('.historic--model');
const warning = document.querySelector('.warning--addlink em');
const historicArea = document.querySelector('.historic--area');
const bg = document.querySelector('.firstPage .bg');
const menuToogle = document.querySelector('.firstPage .menu--toogle');
const menuToogleBtn = document.querySelector('#menu--toogle--btn');

let link = '';
let modelHistoric = '';
let menuToogleOpen = false;

shortenBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    
    link = input.value;

    if(checkStatus()){
        input.value = '';
        modelHistoric = model.cloneNode(true);
        
        let results = await fetch(`https://api.shrtco.de/v2/shorten?url=${link}`);
        let json = await results.json();

        modelHistoric.querySelector('.link--full').innerHTML = `https://${link}`;
        modelHistoric.querySelector('.link--shorten').innerHTML = json.result.short_link;
  
        modelHistoric.querySelectorAll('.copy').forEach((btn) => {
            let key = modelHistoric.querySelector('.link--shorten').innerHTML;
        
            btn.addEventListener('click', (e) => {
                navigator.clipboard.writeText(key).then(() => {
                    e.target.style.backgroundColor = 'hsl(257, 27%, 26%)';
                    e.target.innerHTML = 'Copied!'; 
                }) 
            })
        }) 
        historicArea.prepend(modelHistoric);
    };
});

menuToogleBtn.addEventListener('click', (e) => {
    
    if(menuToogleOpen === false){
        menuToogle.style.display = 'flex'
        bg.style.display = 'none';
        menuToogleOpen = true;
    } else{
        menuToogle.style.display = 'none'
        bg.style.display = 'flex';
        menuToogleOpen = false;
    }
})

function checkStatus() {
    if(link != ''){
        warning.style.color = 'transparent';
        input.classList.remove('warning--border');
        input.classList.remove('warning--placeholder');;
          return true
    } else {
        warning.style.color = '#f85e66';
        input.classList.add('warning--border');
        input.classList.add('warning--placeholder');
          return false
    }; 
};

