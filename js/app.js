  
// Select the Elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");
//const add_folder = document.getElementById("input");

// Classes names for checked and unchecked options
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// Variables
let LIST, id, folder;

// get item from localstorage when explorer is opened
let data = localStorage.getItem("TODO");


// check if data is not empty
if(data){
    LIST = JSON.parse(data);
    id = LIST.length; // set the id to the last one in the list
    loadList(LIST); // load the list to the user interface
}else{
    // if data is empty it sets the id to 0 and inicialices an empty list
    LIST = [];
    id = 0;
}

// load items to the user's interface
function loadList(array){
    array.forEach(function(item){
        if (!item.folder){
        addToDo(item.name, item.id, item.done, item.trash); //if there's NO sub-task condition, then the program sets a regular task
    }else{
        addToDo_tab(item.name, item.id, item.done, item.trash); //if there is sub-task condition, then the program sets a sub-task (indented)
    }
    });

    
    /*--------------This are code's tests that helped me develop the final version--------
    array.forEach(function(item_tab){
        addToDo_tab(item_tab.name, item_tab.id, item_tab.done, item_tab.trash);
    });
    ----------------end of test--------------------------*/
}

// clear the local storage
clear.addEventListener("click", function(){ //event listener to check if the clear button is being pressed
    localStorage.clear();
    location.reload();
});

// Show todays date
const options = {weekday : "long", month:"short", day:"numeric"};
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US", options);

// add to do function
// function to set through the console, the item that has been submited
function addToDo(toDo, id, done, trash, folder){
    
    if(trash){ return; }//if the attribute trash is true, then nothing happens
    
    //this part checks if the task is marked as done or not and decides what tipe of letter is being used
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    // this is what it is sent to HTML every time a new task is submited
    const item = `<li class="item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p contenteditable="true" class="text ${LINE}">${toDo}</p>
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                  </li>
                `;
    
    const position = "beforeend"; //sets de position of the new task
    
    //this command inserts what it has been prepared before
    list.insertAdjacentHTML(position, item);
}


// add an item to the list user the enter key
// it checks if "enter key" is pressed. If it is, it ejecutes the function to submit the task
document.addEventListener("keyup",function(event){
    if(event.keyCode == 13 ){
        const toDo = input.value;
        
        // if the input isn't empty
        if(toDo){
            addToDo(toDo, id, false, false, false);
            // it sets the different attributes for the new task
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

    //same as previous one but for "shift+tab" command. To be able to submit sub-tasks
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


//same as function addToDO but for sub-tasks
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

/*--------This was also part of the development, it is still there because it could help for future work---------
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
// function to set attributes and type of letter according to the checked or uncheck condition of the task
function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    
    LIST[element.id].done = LIST[element.id].done ? false : true;
}

// remove to do
// removes elements when the trash element is pressed
function removeToDo(element){
// for sub-tasks
    if (LIST[element.id].folder){
        trashElement(element);

//for regular tasks
    }else{
        nextElement = getNextElement(element)
        trashElement(element);

/*-----another try to do specific things--------

        while (LIST[i].folder){   
            nextElement = getNextElement(nextElement)
           trashElement(nextElement);
         }
*/
    }
}
// this function was planned to be able to delete every sub-task inside a task but the final objective was not accomplished
function getNextElement(element){
    return LIST[(element.id)+1];
}

// function to delete elements from the LIST
function trashElement(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
}

//-------------another try of specific development characteristics-----------

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
// it checks which element is clicked to be able to know if it is a regular or sub task. Then with future work this would be the starting point to delete every sub-task inside a regular one
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




















