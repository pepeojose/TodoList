class Tarea {
    constructor(tarea, fecha, importancia) {
        this.tarea = tarea
        this.fecha = fecha
        this.importancia = importancia
    }
}

const addTask = (work) => {
    const productList = document.getElementById('product-list')
    const div = document.createElement('div')
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
        // const today = new Date()
        // const day = `${today.getFullYear()} ${today.getMonth()+1} ${today.getDate()}`
        // console.log(day)
        // console.log(date)


    if (task === '' || date === '' || urgency === '') {
        alert('Vacio')
            // } else if (date < day) {
            //     console.log(day)
            //     alert('Fecha no')
            // } else {
        const work = new Tarea(task, date, urgency)
        console.log(work)
        addTask(work)
        resetForm()
    }
    e.preventDefault()
})