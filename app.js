const btn=document.getElementById("btn")
const input=document.querySelector("input")
const list=document.querySelector("ul")
const left=document.querySelector("#left")
const active=document.querySelector("#active")
const activeAll=document.querySelector("#activeAll")
const completed=document.querySelector("#completed")
const clearList=document.querySelector("#clearList")
const allButtons=document.querySelector("#all-buttons")



let group=[]
let count

left.innerHTML= `0 Items left`
allButtons.style.display='none'


input.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        add();
        allButtons.style.display = 'flex';
    }
});

function add(){
    if(input.value!=''){
        group.push({
            checked:false,
            value:input.value
        })
        show()
    }
}

function del(i){
    group.splice(i,1)
    show()
}

let kod=''
function chng(i){
    group[i].checked=!group[i].checked
    show()
}

function show(){
    let kod=''
    input.value=''
    for(let i=0;i<group.length;i++){
        kod += `<li style="display: flex; justify-content: space-between; align-items: center;">
            <div style="display: flex; align-items: center;">
                <input type="checkbox" ${group[i].checked ? 'checked' : ''} onchange="chng(${i})" />
                <span style="text-decoration:${group[i].checked ? "line-through" : "none"}">${group[i].value}</span>
            </div>
            <button onclick="del(${i})">X</button>
        </li>`;
    }   

     
    list.innerHTML=kod
    const uncompleted = group.filter((item) => item.checked == false)
    const completedlist = group.filter((item) => item.checked == true)
    const leftCount = uncompleted.length
    left.innerHTML= ` ${leftCount} items left`
    

    active.onclick=activeShow
    function activeShow(){
        let kod1=''
        for(let i=0;i<uncompleted.length;i++){
            kod1 += `<li style="display: flex; justify-content: space-between; align-items: center;">
            <div style="display: flex; align-items: center;">
                <input type="checkbox" onchange="chng(${i})" />
                <span style="text-decoration:none;">${uncompleted[i].value}</span>
            </div>
            <button onclick="del(${i})">X</button>
        </li>`;

        }
        list.innerHTML=kod1
    }

    activeAll.onclick=show
    completed.onclick=completedShow
    function completedShow(){
        let kod2=''
        for(let i=0;i<completedlist.length;i++){
            kod2 += `<li style="display: flex; justify-content: space-between; align-items: center;">
            <div style="display: flex; align-items: center;">
                <input type="checkbox" checked onchange="chng(${i})" />
                <span style="text-decoration:line-through;">${completedlist[i].value}</span>
            </div>
            <button onclick="del(${i})">X</button>
        </li>`;

        }
        list.innerHTML=kod2
    }

    clearList.onclick=clearShow
    function clearShow() {
        group = group.filter(item => !item.checked);
        show();
        if(leftCount==0){
            allButtons.style.display='none'
        }
    }

    
}
        