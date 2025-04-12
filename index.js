let sec1=document.getElementById("sec1")
let sec2=document.getElementById("sec2")
let sec3=document.getElementById("sec3")

let data = JSON.parse(localStorage.getItem("data")) || []
afficher(data)
let switchh = false
let newData

function goToSec1(){
    sec1.style.display="block"
    sec2.style.display="none"
    sec3.style.display="none"
}
function goToSec2(){
    sec1.style.display="none"
    sec2.style.display="block"
    sec3.style.display="none"
}
function goToSec3(){
    sec1.style.display="none"
    sec2.style.display="none"
    sec3.style.display="block"
}

function addContact(){
    let nom=document.getElementById("nom")
    let tel=document.getElementById("tel")

    if(tel.value.startsWith("06") || tel.value.startsWith("07") || tel.value.startsWith("08")){
        let date1=new Date()
        let d=date1.getDate()
        let m=date1.getMonth()+1
        let y=date1.getFullYear()

        let contact ={
            name:nom.value,
            phone:tel.value,
            date:`${d}/${m}/${y}`
        }
        data.push(contact)
        localStorage.setItem("data",JSON.stringify(data))

        nom.value=''
        tel.value=''
        afficher(data)
        goToSec1()
    }     
}

function afficher(list){
    let text = ''
    list.forEach(function(contact,i){
        text +=`<div class="info">
              <i class="fa-solid fa-user"></i>
              <h4 onclick="showContact(${i})">${contact.name}</h4>
              <button onclick="remove(${i})">X</button>
            </div>`
    })
    document.getElementById("cardItem").innerHTML= text
}

function remove(i){
    data.splice(i,1)
    localStorage.setItem("data",JSON.stringify(data))
    afficher(data)
}

function showContact(i){
    sec1.style.display = "none"
    sec2.style.display = "block"

    document.getElementById("contactNom").innerHTML =switchh?newData[i].name : data[i].name
    document.getElementById("contactNum").innerHTML =switchh?newData[i].phone : data[i].phone
    document.getElementById("date").innerHTML =switchh?newData[i].date : data[i].date
}

function searchContact(){
    switchh = true
    let searchContact =(document.getElementById("searchBar").value).toLowerCase()
    let data = JSON.parse(localStorage.getItem("data")) 

    newData = data.filter(
        (contact)=>{
            return  (contact.name.toLowerCase()).includes(searchContact)
        }
    )
    afficher(newData)
}