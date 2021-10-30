var boton=document.getElementById("agregar");
var text=document.getElementById("text");
var homeworks=document.getElementById("homeworks");
var trash=document.getElementById("trash");
function callApi(){
    $.get("https://immense-plateau-68535.herokuapp.com/list",function(data){
        homeworks.replaceChildren();
        console.log(data);
        for(let i=0;i<data.data.length;i++){
            var homework = document.createElement("div");
            var texto=document.createElement("h3");
            var image=document.createElement("img");
            texto.innerHTML=data.data[i].value;
            image.src="trash-solid.svg";
            homework.appendChild(texto);
            homework.appendChild(image);
            homework.classList.add("homework");
            homeworks.appendChild(homework);
            image.onclick=()=>{
                borrar(data.data[i].id,data.data[i].value);
            }
        }
    });
    
}
callApi();

function agregar(){
    var texto=text.value;
    $.post("https://immense-plateau-68535.herokuapp.com/add",{
        todoitem:texto
    },function(data){
        
        callApi();
    });
    text.value="";
}

function borrar(id,value){
    
    $.post("https://immense-plateau-68535.herokuapp.com/remove",{
        todoitemId:id,
        userName:value,
    },function(data){
        alert("Borraste la tarea con el Id: "+id+" con el value: "+value);
        callApi();    
    });    
}


