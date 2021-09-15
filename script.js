/* --------------------change Theme-------------------------*/
const btn = document.querySelector('.theme-button');
const image = document.querySelector('.background');
const body = document.querySelector('body');
const todo =document.querySelector('.todo-add')
const addBtn = document.querySelector('.addbtn')
const main = document.querySelector('main');
const editList = document.querySelector('.editing');
const todoList = document.querySelector('.todo-list');
const footer = document.querySelector('footer')

function changeTheme(){
    body.classList.toggle('body-light');
    image.classList.toggle('background-light');
    btn.classList.toggle('btn-moon');
    todo.classList.toggle('todo-add-light');
    addBtn.classList.toggle('light-add');
    main.classList.toggle('white');
    footer.classList.toggle('white');
    todoList.classList.toggle('white');
    editList.classList.toggle('white');
};

/* --------------------adding new list-------------------------*/


const text = document.querySelector('#todo-input');

const list = document.querySelector('.todo-list');



addBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    if(text.value){
        const li = document.createElement('li');
        li.classList.add('white')
        const circle = document.createElement('div');
        circle.classList.add('circle');
        const addedTodo = document.createElement('div');
        addedTodo.innerText=text.value;
        addedTodo.classList.add("todo-text")
        const del = document.createElement('button');
        del.innerHTML="<span class=\"delete\">X</span>";
        
        li.appendChild(circle);
        li.appendChild(addedTodo);
        li.appendChild(del);
        list.prepend(li);
        text.value=""
        updateCount(1);
        showAll();
    }

})


list.addEventListener('click',deleteCheck);
list.addEventListener('touch',deleteCheck);

function deleteCheck(e){
    if(e.target.classList[0]==="delete"){
        e.target.parentElement.parentElement.remove();
        updateCount(-1);
    }

    if(e.target.classList[0]==="circle"){
        e.target.parentElement.classList.toggle("completed")
    }

}
/*------------------- counting items---------------*/
const countMob = document.querySelector(".counting-mob span");
const countDesk = document.querySelector(".counting span");



countMob.innerText=list.children.length;
countDesk.innerText=list.children.length;

function updateCount(num){
    countMob.innerText = Number(countMob.innerText) + num;
    countDesk.innerText = Number(countDesk.innerText) + num;

}

/*-------------------- footer menu------------*/

const all = document.querySelector(".show-all");
const showAct = document.querySelector(".show-active");
const showComp = document.querySelector(".show-completed");
const clear = document.querySelector(".clear");
const clearMob = document.querySelector(".clear-mob");
const activeFooter = document.querySelector('footer ul')

all.addEventListener('click',showAll);
showAct.addEventListener('click',showActive);
showComp.addEventListener('click',showComplete);
clear.addEventListener('click',clearAll);
clearMob.addEventListener('click',clearAll);



function showAll(){
    
    Array.from(activeFooter.children).forEach(element =>{
        element.classList.remove('active');
        all.classList.add('active')
    })

    Array.from(list.children).forEach(element=>{
        element.style.display="flex";
    })
}




function showActive(){
    showAll();

    Array.from(activeFooter.children).forEach(element =>{
        element.classList.remove('active');
        showAct.classList.add('active')
    })

    Array.from(list.children).forEach(element=>{
        if(element.classList.contains("completed")){
            element.style.display="none";
        }
    })
}

function showComplete() {
    showAll();
    
    Array.from(activeFooter.children).forEach(element =>{
        element.classList.remove('active');
        showComp.classList.add('active')
    })

    Array.from(list.children).forEach(element => {
        if(!element.classList.contains("completed")){
            element.style.display="none";
        }else{
            
        }
    });
}

function clearAll(){

    Array.from(list.children).forEach(element=>{
        if(element.classList.contains("completed")){
            element.remove();
            updateCount(-1);
        }
    })
}



new Sortable (list, {
    Animation:150
});

