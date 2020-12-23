class Tarea {
    constructor(tarea, fecha, time, importancia) {
        this.tarea = tarea
        this.fecha = fecha
        this.time = time
        this.importancia = importancia
    }
}

// Añadir tarea a la lista
const addTask = (work, deadline) => {
    const urgency = document.getElementById('urgency').value
    const taskList = document.getElementById('task-list')
    const div = document.createElement('div')
    div.classList.add('task')
    div.setAttribute('id', Date.now())
    let paragraphId = Date.now() + 1
    div.innerHTML = ` 
    <div class="task__paragraph">
        <div>   
            <p class="paragraph"> <input type="checkbox" id ="check"></p>
            <p class="paragraph paragraph__text"> <span class="span">Tarea: </span><span>${work.tarea}</span></p> 
        </div>
        <div class="container__date">
            <p class="paragraph__date"> <span class="span"> Fecha:</span> ${work.fecha}</p>
            <p class="paragraph__date"><span class="span"> Hora: ${work.time}</span></p>
        </div>
        <p class="paragraph__date" id="${paragraphId}"></p>
        <p class="paragraph"> <span class="span"> Urgencia:</span> ${work.importancia.toUpperCase()}</p>
        <button class="delete" name="delete">Borrar</button>
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
    taskList.appendChild(div)
    countdown(deadline, paragraphId, '¡Tienes que hacerlo Ya!') //Llamada cuenta atras
    showMessage('Tarea añadida con exito', 'ok')
}

// Cuenta atras
const getRemaininTime = deadline => {
    let now = new Date(),
        remainTime = (new Date(deadline) - now + 1000) / 1000,
        remainSeconds = ('0' + Math.floor(remainTime % 60)).slice(-2),
        remainMinutes = ('0' + Math.floor(remainTime / 60 % 60)).slice(-2),
        remainHours = ('0' + Math.floor(remainTime / 3600 % 24)).slice(-2),
        remainDays = Math.floor(remainTime / (3600 * 24))
    return {
        remainTime,
        remainSeconds,
        remainMinutes,
        remainHours,
        remainDays
    }
}

const countdown = (deadline, elem, finalMessage) => {
    const el = document.getElementById(elem)

    const timerUpdate = setInterval(() => {
        let finalTime = getRemaininTime(deadline)
        el.innerHTML = `<span class="span">Faltan: </span>${finalTime.remainDays}d:${finalTime.remainHours}h:${finalTime.remainMinutes}m:${finalTime.remainSeconds}s`

        if (finalTime.remainTime <= 1) {
            clearInterval(timerUpdate)
            el.innerHTML = finalMessage
        }

    }, 1000)
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

// Pinter elementos del LocalStorage

window.addEventListener('load', () => {
    const arrayStorage = Object.values(localStorage)
    arrayStorage.forEach(task => {
        const { tarea, fecha, time, importancia } = JSON.parse(task)
        const work = new Tarea(tarea, fecha, time, importancia)
        const deadline = fecha + ' ' + time

        addTask(work, deadline)
    })
})

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
        showMessage('Tarea eliminada con exito', 'removed')

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
    const header = document.getElementById('header')
    header.append(info)
    setTimeout(function() {
        document.querySelector('.alert').remove()
    }, 3000)

}

// Evento del formulario
document.getElementById('task-form').addEventListener('submit', function(e) {
    const task = document.getElementById('task').value
    const date = document.getElementById('date').value
    const time = document.getElementById('time').value
    const urgency = document.getElementById('urgency').value

    // Comparar fecha

    const today = new Date()
    let day = today.getDate().toString()
    if (day.length <= 1) day = `0 ${day}`

    let month = (today.getMonth() + 1).toString()
    if (month.length <= 1) month = "0" + month

    let year = today.getFullYear()

    let hours = today.getHours()
    let minutes = today.getMinutes()
    let seconds = today.getSeconds()

    let currentDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`

    if (task === '' || date === '' || time === '' || urgency === '') {
        showMessage('Por favor rellena todos los campos', 'error')
    } else if (date < currentDate) {
        showMessage('No puedes introducir una fecha pasada', 'error')
        document.getElementById('date').focus()
    } else {
        const deadline = date + ' ' + time
        const work = new Tarea(task, date, time, urgency)
        addTask(work, deadline)
        store(work)
        resetForm()
    }
    e.preventDefault()
})