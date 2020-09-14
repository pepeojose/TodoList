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
            <p class="paragraph"> <input type="checkbox"></p>
            <p class="paragraph"> <span class="span">Tarea:</span> ${work.tarea}</p> 
        </div>
        <p class="paragraph__date"> <span class="span"> Fecha:</span> ${work.fecha}</p> 
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
    productList.appendChild(div)
    showMessage('Tarea añadida con exito', 'ok')
}

// Resetear formulario
const resetForm = () => {
    document.getElementById('task-form').reset()
}

// Mensajes de informacion
const showMessage = (message, cssClass) => {
    let info = document.createElement('div')
    info.className = `alert ${cssClass}`

    info.innerHTML = `
    <p>${message}</p>
    `

    const container = document.querySelector('.container')
    const app = document.querySelector('#app')
    container.prepend(info)
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
    console.log(month)
    if (month.length <= 1) month = "0" + month

    let year = today.getFullYear()

    let currentDate = `${year}-${month}-${day}`
    console.log(currentDate)
    console.log(date)

    if (task === '' || date === '' || urgency === '') {
        console.log('Vacio')
        showMessage('Por favor rellena todos los campos', 'error')
    } else if (date < currentDate) {
        showMessage('No puedes introducir una fecha pasada', 'error')
        document.getElementById('date').focus()
        console.log('Fecha no')
    } else {
        const work = new Tarea(task, date, urgency)
        console.log(work)
        addTask(work)
        resetForm()
    }
    e.preventDefault()
})