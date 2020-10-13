class Tarea {
    constructor(tarea, fecha, importancia) {
        this.tarea = tarea
        this.fecha = fecha
        this.importancia = importancia
    }
}

// Añadir tarea a la lista
const addTask = (work) => {
    const urgency = document.getElementById('urgency').value
    const productList = document.getElementById('task-list')
    const div = document.createElement('div')
    div.classList.add('tarea')
    div.innerHTML = `
    <div class="tarea__paragraph">
        <div>   
            <p class="paragraph"> <input type="checkbox" id ="check"></p>
            <p class="paragraph paragraph__text"> <span class="span">Tarea:</span><span>${work.tarea}</span></p> 
        </div>
        <p class="paragraph__date"> <span class="span"> Fecha:</span> ${work.fecha}</p> 
        <p class="paragraph"> <span class="span"> Urgencia:</span> ${work.importancia.toUpperCase()}</p>
        <button class="delete" id="delete" name="delete">Borrar</button>
    </div>
    `
        // Color de las tareas
    switch (urgency) {
        case 'urgente':
            div.style.backgroundColor = 'red'
            break;
        case 'normal':
            div.style.backgroundColor = 'green'
            break;
        case 'tranqui':
            div.style.backgroundColor = 'blue'
            break;
        default:
            break;
    }
    productList.appendChild(div)
    showMessage('Tarea añadida con exito', 'ok')
}

//Almacenar tarea en LocalStorage
const store = (work) => {
    if (typeof(Storage !== 'undefined')) {
        localStorage.setItem(work.tarea, JSON.stringify(work))
    }
}

//Eliminar del LocalStorage
const removeStorage = (ele) => {
    localStorage.removeItem(ele)
}

// Resetear formulario
const resetForm = () => {
    document.getElementById('task-form').reset()
}

//Tarea completada

document.getElementById('task-list').addEventListener('click', function(e) {
    if (e.target.id === 'check') {
        const paragraphText = e.target.parentElement.parentElement.childNodes[3]
        paragraphText.classList.toggle('finished')
        if (paragraphText.classList.contains('finished')) {
            showMessage('Tarea realizada con exito', 'ok')
        } else showMessage('Tarea no realizada', 'error')
    }
})


//Eliminar tarea
document.getElementById('task-list').addEventListener('click', function(e) {
    if (e.target.name === 'delete') {
        taskToRemove = e.target.parentElement.parentElement
        taskToRemove.remove()
        showMessage('Tarea eliminada con exito', 'eliminado')

        //Localizar key del elemento a borrar en localStorage
        const taskItems = Array.from(e.target.parentElement.children)
        const taskItem = taskItems[0].lastElementChild.lastElementChild.textContent


        if (taskItem.length >= 1) {
            removeStorage(taskItem)
        }
    }
})

// Mensajes de informacion
const showMessage = (message, cssClass) => {
    let info = document.createElement('div')
    info.className = `alert ${cssClass}`

    info.innerHTML = `
    <p>${message}</p>
    `
    const nav = document.querySelector('.nav')
    nav.append(info)
    setTimeout(function() {
        document.querySelector('.alert').remove()
    }, 3000)

}

// Evento del formulario
document.getElementById('task-form').addEventListener('submit', function(e) {
    const task = document.getElementById('task').value
    const date = document.getElementById('date').value
    const urgency = document.getElementById('urgency').value

    // Comparar fecha

    const today = new Date()
    let day = today.getDate().toString()
    if (day.length <= 1) day = `0 ${day}`

    let month = (today.getMonth() + 1).toString()
    if (month.length <= 1) month = "0" + month

    let year = today.getFullYear()

    let currentDate = `${year}-${month}-${day}`

    if (task === '' || date === '' || urgency === '') {
        showMessage('Por favor rellena todos los campos', 'error')
    } else if (date < currentDate) {
        showMessage('No puedes introducir una fecha pasada', 'error')
        document.getElementById('date').focus()
    } else {
        const work = new Tarea(task, date, urgency)
        addTask(work)
        store(work)
        resetForm()
    }
    e.preventDefault()
})