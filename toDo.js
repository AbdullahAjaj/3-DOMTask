
// delegateEvent("click",".save",saveBtn);
let itemsData = [
    {
        id: 1676368472841,
        done: true,
        color: "#ff0000",
        title: "To do research",
        image: "images/image.jpg"
    },
    {
        id: 1676368486003,
        done: false,
        color: "#ffa500",
        title: "Create Prototypes",
        image: "images/image.jpg"
    },
    {
        id: 1676368496905,
        done: true,
        color: "#ffa500",
        title: "Create design consept",
        image: "images/image.jpg"
    },
    {
        id: 1676368505544,
        done: true,
        color: "#008000",
        title: "Discuss consept with team",
        image: "images/image.jpg"
    },
]


let setDataInLocalStorage = (itemsData) => {
    localStorage.setItem("myList", JSON.stringify(itemsData))
}

// setDataInLocalStorage(itemsData)
let myData = JSON.parse(localStorage.myList)

function createTemplate(item, parentElement){
    let rootEle = document.getElementsByTagName("section")[0]

    if(parentElement){ // edit
        let temp = document.getElementById("editOrNew")
        let clone = temp.content.cloneNode(true)

        clone.querySelector(".color").value = item.color
        clone.querySelector(".title").value = item.title
        clone.querySelector(".checkbox").checked = item.done ? "checked" : ""
        clone.querySelector(".image").src = item.image

        rootEle.replaceChild(clone, parentElement)
        myData = myData.filter(ele => ele !== item)
        
    }else{ // render items
        let temp = document.getElementById("render")
        let clone = temp.content.cloneNode(true)

        clone.querySelector(".color").style.backgroundColor = item.color
        clone.querySelector(".hidden").value = item.id
        clone.querySelector(".title").innerHTML = item.title
        clone.querySelector(".checkbox").checked = item.done ? "checked" : ""
        clone.querySelector(".image").src = item.image

        rootEle.appendChild(clone)
    }
}


function createStoredElementsUsingLocalStorage(myData){
    let rootEle = document.getElementsByTagName("section")[0]
    rootEle.innerHTML = ""
    myData.forEach(item =>createTemplate(item))
}
createStoredElementsUsingLocalStorage(myData)




document.querySelector(".add").addEventListener("click", e => {

    let rootEle = document.getElementsByTagName("section")[0]
    let temp = document.getElementById("editOrNew")
    let clone = temp.content.cloneNode(true)
    rootEle.appendChild(clone)
    // document.addEventListener("click",{target:".save"},()=>{})
})

// function delegateEvent(eventName, elementSelector,handler){
//     document.addEventListener(eventName, (event) => {
//         if (event.target.closest(elementSelector)) {
//         handler.call(event.target, event);
//         }
//     });
// }

function saveBtn(e){
    let parentElement = e.target.parentElement.parentElement
    
    let newObj = {}
    newObj.id = Date.now()
    
    newObj.color =  document.forms[0].children.color.value
    newObj.title = document.forms[0].children.title.value
    newObj.done = document.forms[0].children.checkbox.checked
    newObj.image = document.forms[0].children[5].src

    myData.push(newObj)

    localStorage.setItem("myList", JSON.stringify(myData))
    location.reload()
}

function deleteBtn(e){
    let delPopup = document.querySelector(".popup-overlay")
    delPopup.style.visibility = "visible"
    let itemID = e.target.nextElementSibling.value
    let hiddenField = document.querySelector(".popup-box [type='hidden']")
    hiddenField.value = +itemID
    let parentElement = e.target.parentElement.parentElement
    parentElement.classList.add("deletedCard")
}
function confirmDeletion(e){
    let itemID = document.getElementsByName("hiddenField")[0].value
    myData = myData.filter(item=> item.id !== +itemID)
    localStorage.setItem("myList", JSON.stringify(myData))
    let deletedCard = document.querySelector(".deletedCard")
    deletedCard.remove()
    closeBtn()

}
        
function closeBtn(){
    let delPopup = document.querySelector(".popup-overlay")
    delPopup.style.visibility = "hidden"
}

function filterLists(e, flag){
    let liList = [...e.target.parentElement.children]
    liList.forEach(item => item.classList.remove("styled"))
    e.target.classList.add("styled")
    let filteredData = myData.filter(item =>item.done === flag)
    createStoredElementsUsingLocalStorage(filteredData)
}

function editBtn(e){
    let parentElement = e.target.parentElement.parentElement
    let myID = parentElement.children[1].children[2].value
    let myItem = myData.filter(ele=>ele.id === +myID)
    createTemplate(myItem[0], parentElement)
  
}