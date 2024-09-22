import {heading, handelboulites as handel } from "./sumitFunction.js";
let answers =document.querySelector(".qustion-answers")
let submit = document.querySelector("button")
let counspan = document.querySelector(".count")
let bolutes = document.querySelector(".bolutes")
let bolutescontainer = document.querySelector(".detals")
let result = document.querySelector(".result")
let counter = document.querySelector(".countdown")
let countindex = 0
let RightAnswers = 0
function getQustion(){
    let requst = new XMLHttpRequest()
    requst.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            let qustionobj= JSON.parse(this.responseText)
            let countqustion = qustionobj.length
            writenumber(countqustion)
            adding(qustionobj[countindex],countqustion)
            submit.onclick = _ => {
                let rightanswer = qustionobj[countindex]["right_answer"]
                countindex++
                checkranswer(rightanswer, countqustion)                
                answers.innerHTML = ""
                document.querySelector("h1").innerHTML = ""
                adding(qustionobj[countindex], countqustion)
                handel(countindex)
                showResult(countqustion)
                clearInterval(star)
                Countdown(5,countqustion)
            }
            Countdown(5,countqustion)
        }
    }
    requst.open("GET","qustion.json",true)
    requst.send()
}   
function checkranswer(right, qounter) {
    let ANSWER = document.getElementsByName("qustion")
    let chosen
    for (let i = 0; i <4; i++){   
        if (ANSWER[i].checked) {
            chosen = ANSWER[i].dataset.answer
        }
    }
    if (right === chosen) {
        RightAnswers++
    }
}
function adding(obj, index) {
    if (countindex < index) {
        let h1 = document.createElement("h1")
        let hedingtext = document.createTextNode(`${obj.title}`)
        h1.appendChild(hedingtext)
        heading.prepend(h1)
        for (let i = 1; i <= 4; i++) {
            let Maindiv = document.createElement("div")
            Maindiv.className = "answers"
            let input = document.createElement("input")
            input.type = "radio"
            input.name = "qustion"
            input.id = `answer-${i}`
            input.dataset.answer = obj[`answer_${i}`]
            let lable = document.createElement("label")
            let lableText=document.createTextNode(obj[`answer_${i}`])
            lable.append(lableText)
            lable.htmlFor=`answer-${i}`
            Maindiv.append(input)
            Maindiv.append(lable)
            answers.append(Maindiv)
            if(i === 1){
                input.checked = true
            }
  }
      }
    }


getQustion()

function writenumber(num) {
    counspan.innerHTML = num
    for(let i = 0; i < num; i++){
        let spanbolutes = document.createElement("span")
        if(i === 0){
            spanbolutes.className = "on";
        }
        bolutes.append(spanbolutes)
    }
}


function showResult(one) {
    let theResult;
    if (countindex === one ) {
        heading.remove()
        bolutescontainer.remove()
        if (RightAnswers > countindex / 2 && RightAnswers < countindex) {
            theResult = `<span class="good"> Good </span> ,The RightAnswer is ${RightAnswers}`
        } else if (RightAnswers === countindex) {
            theResult = `<span class="perfect"> Perfect </span> , All RightAnswers Is Good`
        } else {
            theResult = `<span class="bad"> Bad </span> , The RightAnswer is ${RightAnswers}`
        }
        submit.remove()
        result.innerHTML = theResult
    }
}
let star
function Countdown(time,count) {
    if (countindex < count) {
        let minuts, seconds;
        star = setInterval(() => {
            minuts = parseInt(time / 60)
            seconds = parseInt(time % 60)
            minuts = minuts < 10 ? `0${minuts}` :minuts
            seconds = seconds < 10 ? `0${seconds}` : seconds
            counter.innerHTML =`${minuts} : ${seconds}`
            if ( -- time < 0) {
                clearInterval(star)
               submit.click()
            }    
        }, 1000);
    }
}