const btn_listas = document.querySelectorAll('.btn');
btn_listas.forEach((btn) => {
    btn.addEventListener('click', () => {
        if(btn.id == 'personas'){
            mostrarPersonas()
        }else if(btn.id == 'empleados'){
            mostrarEmpleados()
        }else if(btn.id=='jefes'){
            mostrarJefes()
        }
    })
})

const form = document.getElementById('form');
form.addEventListener('submit', ($event) => {
    $event.preventDefault();

    const formData = new FormData(form);
    const formValues = Object.fromEntries(formData.entries())
    agregarPersona(formValues);
})

const personas = [];
const empleados = [];
const jefes = [];


class Persona {
    constructor(persona) {
        this.nombre = persona.nombre;
        this.apellido = persona.apellido;
        this.dni = persona.dni;
        this.fecha_nacimiento = persona.fecha_nacimiento;
        this.fecha_alta = persona.fecha_alta;
        this.estado_civil = persona.estado_civil;
        this.sueldo_base = persona.sueldo_base;
        this.porcentaje = persona.porcentaje;
        this.puesto_trabajo = persona.puesto_trabajo;
    }

    obtenerEdad() {
        let edad = this.#calcularEdad()
        return edad
    }


    #calcularEdad() {
        const nacimiento = new Date(this.fecha_nacimiento);
        const hoy = new Date();
        let edad = hoy.getFullYear() - nacimiento.getFullYear();
        const mes = hoy.getMonth() - nacimiento.getMonth();
        if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
            edad--;
        }
        return Number(edad);
    }
}

class Empleado extends Persona {
    static legajo_cont = 1;

    constructor(empleado) {
        super(nombre, apellido, dni, fecha_nacimiento, estado_civil, fecha_alta, sueldo_base,porcentaje, puesto_trabajo);
        this.nombre = empleado.nombre
        this.fecha_alta = empleado.fecha_alta;
        this.sueldo_base = empleado.sueldo_base;
        this.porcentaje = empleado.porcentaje;
        this.puesto_trabajo = empleado.puesto_trabajo;
        this.legajo = Empleado.legajo_cont++;
    }

    aumentarSueldo(porcentaje){
        if(!porcentaje > 0 && porcentaje < 100) {
            console.log("Ingrese un numero entre 0 y 100")
        }else{
            let cantidad_de_aumento = 0;
            cantidad_de_aumento = (this.sueldo_base * 100) / porcentaje;
            this.sueldo_base = this.sueldo_base + cantidad_de_aumento;
            return `Su sueldo aumento ${porcentaje}% dando como resultado un monto total de $${this.sueldo_base}.`
        }
    }

    set aumentarSueldo (porcentaje){
        this.aumentarSueldo(porcentaje)
    }
}

class Jefatura extends Empleado {
    static legajo_cont = 1;

    constructor(nombre, apellido, dni, fecha_nacimiento, estado_civil, fecha_alta, sueldo_base, puesto_trabajo) {
        super(nombre, apellido, dni, fecha_nacimiento, estado_civil, fecha_alta, sueldo_base, puesto_trabajo);
        this.esJefe = true;
        this.legajo = Jefatura.legajo_cont++;
        this.fecha_alta = fecha_alta;
        this.sueldo_base = sueldo_base;
    }
}

function agregarPersona(persona) {
    const nuevaPersona = new Persona(persona);

    if(nuevaPersona.puesto_trabajo == 'Jefe de sección'){
        const nuevoJefe = new Jefatura(persona);
        jefes.push(nuevoJefe);
    }else{
        const nuevoEmpleado = new Empleado(persona);
        empleados.push(nuevoEmpleado);
    }
    personas.push(nuevaPersona);

}

function mostrarPersonas() {
    const personasDiv = document.getElementById('response');
    personasDiv.innerHTML = '';

    personas.forEach((persona, index) => {

        let edad = persona.obtenerEdad();
        const personaCard = document.createElement('div');
        personaCard.classList.add('col-sm-6', 'mb-3');
        personaCard.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${persona.nombre}</h5>
                    <p class="card-text">Edad: ${edad}</p>
                    <p class="card-text">Puesto: ${persona.puesto_trabajo}</p>
                    <p class="card-text">Sueldo: $${persona.sueldo_base}</p>
                    <button class="btn btn-danger"  onclick="eliminarPersona(${index})">Eliminar</button>
                </div>
            </div>`;
        personasDiv.appendChild(personaCard);
    });
}

function mostrarEmpleados() {
    const empleadosDiv = document.getElementById('response');
    empleadosDiv.innerHTML = '';

    empleados.forEach((empleado, index) => {
        const empleadoCard = document.createElement('div');
        empleadoCard.classList.add('col-sm-6', 'mb-3');
        empleadoCard.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${empleado.nombre}</h5>
                    <p class="card-text">Puesto: ${empleado.puesto_trabajo}</p>
                    <button class="btn btn-danger"  onclick="eliminarEmpleado(${index})">Eliminar</button>
                </div>
            </div>`;
        empleadosDiv.appendChild(empleadoCard);
    });
}

function mostrarJefes() {
    const jefesDiv = document.getElementById('response');
    jefesDiv.innerHTML = '';

    jefes.forEach((jefe, index) => {
        const jefeCard = document.createElement('div');
        jefeCard.classList.add('col-sm-6', 'mb-3');
        jefeCard.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">jefe ${jefe.nombre}</h5>
                    <p class="card-text">Puesto: ${jefe.puesto_trabajo}</p>
                    <button class="btn btn-danger"  onclick="eliminarJefe(${index})">Eliminar</button>
                </div>
            </div>`;
        jefesDiv.appendChild(jefeCard);
    });
}

function eliminarPersona(index) {
    personas.splice(index, 1);
    mostrarPersonas();
}

function eliminarJefe(index) {
    jefes.splice(index, 1);
    mostrarJefes();
}

function eliminarEmpleado(index) {
    empleados.splice(index, 1);
    mostrarEmpleados();
}
