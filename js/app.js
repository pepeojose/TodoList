class Tarea {
    constructor(tarea, fecha, importancia) {
        this.tarea = tarea
        this.fecha = fecha
        this.importancia = importancia
    }
}

const addTask = (work) => {
    const productList = document.getElementById('product-list')
    const div = document.createElement('DIV')
    div.innerHTML = `
    <div class="tarea">
        <p>
            <span class="span">Tarea</span> ${work.tarea} 
            <span class="span"> Fecha</span> ${work.fecha} 
            <span class="span"> Urgencia</span> ${work.importancia}
            <button class="delete" name="delete">Borrar</button>
        </p>
    </div>
    `
    productList.appendChild(div)
}

const resetForm = () => {
    document.getElementById('task-form').reset()
}

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
        alert('Vacio')
    } else if (date < currentDate) {
        alert('Fecha no')
    } else {
        const work = new Tarea(task, date, urgency)
        console.log(work)
        addTask(work)
        resetForm()
    }
    e.preventDefault()
})