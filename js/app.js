  
// Select the Elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");
//const add_folder = document.getElementById("input");

// Classes names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// Variables
let LIST, id, folder;

// get item from localstorage
let data = localStorage.getItem("TODO");


// check if data is not empty
if(data){
    LIST = JSON.parse(data);
    id = LIST.length; // set the id to the last one in the list
    loadList(LIST); // load the list to the user interface
}else{
    // if data is empty
    LIST = [];
    id = 0;
}

// load items to the user's interface
function loadList(array){
    array.forEach(function(item){
        if (item.folder == false){
        addToDo(item.name, item.id, item.done, item.trash);
    }else{
        addToDo_tab(item.name, item.id, item.done, item.trash);
    }
    });
    /*
    array.forEach(function(item_tab){
        addToDo_tab(item_tab.name, item_tab.id, item_tab.done, item_tab.trash);
    });
    */
}

// clear the local storage
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});

// Show todays date
const options = {weekday : "long", month:"short", day:"numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

// add to do function

function addToDo(toDo, id, done, trash, folder){
    
    if(trash){ return; }
    
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";
    
    const item = `<li class="item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p contenteditable="true" class="text ${LINE}">${toDo}</p>
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                  </li>
                `;
    
    const position = "beforeend"; //sets de position of the new task
    
    list.insertAdjacentHTML(position, item);
}


// add an item to the list user the enter key
document.addEventListener("keyup",function(event){
    if(event.keyCode == 13 ){
        const toDo = input.value;
        
        // if the input isn't empty
        if(toDo){
            addToDo(toDo, id, false, false, false);
            
            LIST.push({
                name : toDo,
                id : id,
                done : false,
                trash : false,
                folder : false
            });
            
            // add item to localstorage ( this code must be added where the LIST array is updated)
            localStorage.setItem("TODO", JSON.stringify(LIST));
            
            id++;
        }
        input.value = "";
    }

    //TEST FOLDERS
    if(event.keyCode == 9){ //9: codigo ascii del tabulador
        const toDo_tab = input.value;
        
        // if the input isn't empty
        if(toDo_tab){
            addToDo_tab(toDo_tab, id, false, false, true);
            
            LIST.push({
                name : toDo_tab,
                id : id,
                done : false,
                trash : false,
                folder : true
            });
            
            // add item to localstorage ( this code must be added where the LIST array is updated)
            localStorage.setItem("TODO", JSON.stringify(LIST));
            
            id++;
        }
        input.value = "";
    }

});


//TEST FOLDERS
function addToDo_tab(toDo_tab, id, done, trash, folder){
    
    if(trash){ return; }
    
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";
    
    const item_tab = `<li class="item_tab">
                    <i class="fa ${DONE} co" job="complete_tab" id="${id}"></i>
                    <p contenteditable="true" class="text ${LINE}">${toDo_tab}</p>
                    <i class="fa fa-trash-o de" job="delete_tab" id="${id}"></i>
                  </li>
                `;
    
    const position = "beforeend"; //sets de position of the new task
    
    list.insertAdjacentHTML(position, item_tab);
}

/*
// TEST FOLDERS
function addFolder(folder){
    
    const item= `<li class="item">
                    <p class="text ${LINE}">${folder}</p>
                  </li>
                `;
    
    const position = "afterbegin"; //sets de position of the new task
    
    list.insertAdjacentHTML(position, item);
}
*/


// complete to do
function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    
    LIST[element.id].done = LIST[element.id].done ? false : true;
}

// remove to do
function removeToDo(element){
// remueve los sub elementos
    if (LIST[element.id].folder){
        trashElement(element);

//remueve los elementos de carpeta
    }else{
        nextElement = getNextElement(element)
        trashElement(element);
/*
        while (LIST[i].folder){   
            nextElement = getNextElement(nextElement)
           trashElement(nextElement);
         }
*/
    }
}

function getNextElement(element){
    return LIST[(element.id)+1];
}

function trashElement(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
}

/*else if(LIST[element.id].folder == false && LIST[element.id+1].folder == true){

    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id+1].trash = true;

}*/





 /*   i = element.id;

    while (LIST[i].folder == false){

    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[i].trash = true;

    i++;


}*/

// target the items created dynamically

list.addEventListener("click", function(event){
    const element = event.target; // return the clicked element inside list
    const elementJob = element.attributes.job.value; // complete or delete
    
    if(elementJob == "complete" || elementJob == "complete_tab"){
        completeToDo(element);
    }else if(elementJob == "delete" || elementJob == "delete_tab"){
        removeToDo(element);
    }else if(elementJob == "addition"){
        //todavia no logre resolver esta parte
    }

    // add item to localstorage ( this code must be added where the LIST array is updated)
    localStorage.setItem("TODO", JSON.stringify(LIST));
});




















