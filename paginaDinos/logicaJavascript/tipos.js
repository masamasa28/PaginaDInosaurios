// Array de dinosaurios con descripciones amigables
const dinosaurios = [
    {nombre: "Tyrannosaurus Rex", descripcion: "El poderoso rey de los dinosaurios"},
    {nombre: "Velociraptor", descripcion: "Pequeño pero muy inteligente"},
    {nombre: "Spinosaurio", descripcion: "El lagarto de espinas"},
    {nombre: "Stegosaurus", descripcion: "Con placas en la espalda y una cola con picos"},
    //{nombre: "Pterodactilo", descripcion: "El gigante volador"}
];

// Función para llenar la lista de dinosaurios
function llenarListaDinosaurios() {
    const lista = document.getElementById('dino-list');
    dinosaurios.forEach(dino => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `${dino.nombre.toLowerCase().replace(/\s+/g, '-')}.html`;
        a.innerHTML = `<strong>${dino.nombre}</strong>: ${dino.descripcion}`;
        li.appendChild(a);
        lista.appendChild(li);
    });
}

// Llamar a la función cuando se carga la página
window.onload = llenarListaDinosaurios;