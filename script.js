const  area = document.querySelector('.map')
let keyCodes = [81,87,69,82,84,89,85,73,79,80,65,83,68,70,71,72,74,75,76,90,88,67,86,66,78,77,13,8]

//13 is Enter
//Back space is 8

const NUMBER_OF_TRIES = 6
const words = ['dog','animal','happy','french','nipple','dumb','work','logo','lion','race','wealth','content','creat','tesla','twitter','follow','come','like','sad','girl','money','code','draw','glass','faith','older','young','cute','good','evil','lost','city']


let letters = words[Math.floor(Math.random()* words.length)].split('')
let curRow = 0
let curCol = 0

let rows = new Array(NUMBER_OF_TRIES).fill(new Array(letters.length).fill('⭐️'))



const generateArea = (array) => {
    keyCodes=[81,87,69,82,84,89,85,73,79,80,65,83,68,70,71,72,74,75,76,90,88,67,86,66,78,77,13,8]
    area.innerHTML= ''
    for (let i = 0; i < rows.length; i++) {
        const arr = array[i]
        area.innerHTML +=`<div class='row' key=${arr + i}>${makeCells(arr,i)}</div>`
    }
}

const makeCells = (array,j) =>{
    let cells = ''
    for (let i = 0; i < array.length; i++) {
        const cell = array[i]
        cells+=`<div class ="cell ${isCellActive(j,i) && ' active'} ${getCellBgColor(cell,j,i)}">${cell}</div>`
    }
    return cells
}

generateArea(rows)


    window.addEventListener('keydown',(e)=>{
        const arrUpdate = [...rows].map(rows=>[...rows])

        if(e.keyCode === 13){
            if(curCol === rows[0].length){
                curCol =  0
                curRow += 1
            }
            generateArea(arrUpdate)
            rows = [...arrUpdate]
            checkGameState()
            return
        }

        if(e.keyCode === 8){
            let prevCol = curCol - 1 
            if(prevCol >= 0){
            arrUpdate[curRow][prevCol] = "⭐️"
            curCol = prevCol
            generateArea(arrUpdate)
            rows = [...arrUpdate]
            }
            return
        }

        if(curCol < rows[0].length){
        
        if(keyCodes.includes(e.keyCode)){
            arrUpdate[curRow][curCol] = e.key
            curCol+=1
            generateArea(arrUpdate)
        }else{
            return
        }
    }
        console.log(arrUpdate[curRow][curCol])
          
          rows = [...arrUpdate] 
        })



function isCellActive (row,col) {
return row === curRow && col === curCol
}

function isCellIncluded (row,col) {
    return row === curRow && col === curCol
}

function getCellBgColor(cell,row,col) {

    if(row >= curRow){
        return ''
    }
    if(cell === letters[col]){
        return 'correct'
    }
    if(letters.includes(cell)){
        return 'maybe'
    }
    return "wrong"

}

function checkGameState(){
    if(checkIfWon()){
        keyCodes = []
   area.innerHTML += `<dialog open>YOU WON 🏆 <button onclick="nextWord()">NEXT WORD</button></dialog>`
    
    }else if(checkIfLost()){
       keyCodes = []
        area.innerHTML += `<dialog open>MEH! YOU LOST 😆 <button onclick="tryAgain()">TRY AGAIN</button></dialog>`
    }
}

function checkIfWon(){
const row = rows[curRow-1]
console.log(row)
return row.every((letter,i) =>letter === letters[i])
}

function checkIfLost(){
return curRow ===  rows.length
}


function nextWord(){
    letters = words[Math.floor(Math.random()* words.length)].split('')
    rows = new Array(NUMBER_OF_TRIES).fill(new Array(letters.length).fill('⭐️'))
    curCol = 0
    curRow = 0
    generateArea(rows)
}

function tryAgain(){
    rows = new Array(NUMBER_OF_TRIES).fill(new Array(letters.length).fill('⭐️'))
    curCol = 0
    curRow = 0
    generateArea(rows)
}