const inputTarefa = document.querySelector(".input-nova-tarefa");
const btnTarefa = document.querySelector(".btn-add-tarefa");
const tarefas = document.querySelector(".tarefas");


//captura o evento de tecla no <input>
inputTarefa.addEventListener('keypress', function(e) {
    if(e.keyCode === 13){
        if(!inputTarefa.value) return;
        criaLi(inputTarefa.value);
    }
});

//captura o evento de click no <button>
btnTarefa.addEventListener('click', function () {       
    if(!inputTarefa.value) return;
    criaLi(inputTarefa.value);
});

//cria um elemento e um textNode dentro da <ul>
function criaLi(text) {
    const textNode = document.createTextNode(text);
    const list = document.createElement("li"); 
    list.appendChild(textNode);
    tarefas.appendChild(list);
    limpaInput();
    criaBtnApagar(list);
    salvarTarefas();
}

//cira um botão que apaga uma tarefa
function criaBtnApagar(li) { 
    li.innerText += ' ';
    const btnApagar = document.createElement("button");
    btnApagar.innerText = "Apagar";
    btnApagar.setAttribute('class', 'apagar');
    li.appendChild(btnApagar);
}

//limpa input
function limpaInput() {     
    inputTarefa.value = '';
    inputTarefa.focus();
}

//evento para apagar um <li> quando o bntApagar for clicado
document.addEventListener('click', function (e) {
    const element = e.target;
    //console.log(element);
    if(element.classList.contains('apagar')){
        element.parentElement.remove();
        salvarTarefas();
    }
});


function salvarTarefas() {
    const liTarefas = tarefas.querySelectorAll('li');
    const listaDeTarefas = [];

    for( let tarefa of liTarefas) {
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
        listaDeTarefas.push(tarefaTexto);
        //console.log(listaDeTarefas);
    }

    const tarefasJSON = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefas', tarefasJSON);

}

function addTarefasSalvas() {
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas);

    for(let tarefa of listaDeTarefas){
        criaLi(tarefa);
    }
}

addTarefasSalvas();