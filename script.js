const maincontainer = document.getElementById('maincontainer')
const rightalphabets = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
const alphabets = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
const checkbtn = document.getElementById('check')

const backdrop = document.querySelector('.backdrop')
const modal = document.querySelector('.modal')
const btn_cancel= document.querySelector('.btn-cancel')

let score = 0

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

shuffle(alphabets)

for(let i=0; i<26; i++){
    
    const alphaimage = document.createElement('img')        
     
    let srcstr = "images/" + alphabets[i] + ".jpg"
    alphaimage.src=srcstr
    alphaimage.height="150"
    alphaimage.width="150"
    alphaimage.draggable = true
    alphaimage.setAttribute('id',alphabets[i])
    alphaimage.classList.add('draggable')
    alphaimage.alt=alphabets[i]
        
    maincontainer.appendChild(alphaimage)

}

const alphabet_images = document.querySelectorAll('.draggable')

for (const alphabet_image of alphabet_images){
    alphabet_image.addEventListener('dragstart', dragStart)
    alphabet_image.addEventListener('dragover',dragOver)
    alphabet_image.addEventListener('dragleave',dragLeave)
    alphabet_image.addEventListener('drop',dragDrop)
    alphabet_image.addEventListener('dragenter',dragEnter)
    alphabet_image.addEventListener('dragend',dragEnd)
}

function dragStart(e){
    e.dataTransfer.setData("data",e.target.id)
    this.className += ' hold'
    /*setTimeout(() => this.className='invisible',0)
    setTimeout(() => {
        e.target.classList.add('hide');
    }, 0);*/
}

function dragEnd(e){
    e.preventDefault()
    this.classList.remove("hold")
    this.classList.add("draggable")
}

function dragOver(e){
    e.preventDefault()
}
function dragLeave(e){
    e.preventDefault()
}

let clone =''
let dragindex = 0

function dragDrop(e){
    e.preventDefault()
    
    clone = e.target.cloneNode(true)
    
    const data = e.dataTransfer.getData("data")
    
    if (clone.id !== data){
        let nodelist = document.getElementById("maincontainer").childNodes
        for (let i =0; i < nodelist.length; i++){
            if (nodelist[i].id === data){
                dragindex = i
            }
        }
        
        clone.addEventListener('dragstart', dragStart)
        clone.addEventListener('dragover',dragOver)
        clone.addEventListener('dragleave',dragLeave)
        clone.addEventListener('drop',dragDrop)
        clone.addEventListener('dragenter',dragEnter)
        clone.addEventListener('dragend',dragEnd)
        
        document.getElementById("maincontainer").replaceChild(document.getElementById(data),e.target)
        document.getElementById("maincontainer").insertBefore(clone,document.getElementById("maincontainer").childNodes[dragindex])
    }
    checkanswer()
}
function dragEnter(e){
    e.preventDefault()
}


checkbtn.addEventListener('click', calculatescore)

function checkanswer(){
    score = 0
    let nodelist = document.getElementById('maincontainer').childNodes
    for (let i = 0; i < nodelist.length-1; i++){

        if (nodelist[i+1].id == rightalphabets[i]) {
            score += 1
            nodelist[i+1].classList.add('right')
        }
        else if (nodelist[i+1].id != rightalphabets[i]) {
            nodelist[i+1].classList.remove('right')
        }
    }
}

btn_cancel.addEventListener('click', canceleverything)

function calculatescore(){
    if (score == 26) {
        document.body.style.backgroundImage="url('https://media.giphy.com/media/fYxHYBB1k7aQwjGhSc/giphy.gif')";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundSize = "cover";
    }
    else if (score != 26) {
        //alert("Try a little harder!")
        modal.style.display='block';
        backdrop.style.display='block';
    }
}

function canceleverything(){
    modal.style.display='none';
    backdrop.style.display='none';
}

