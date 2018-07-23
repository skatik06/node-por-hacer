const fs = require('fs');

//creacion de arreglos
let listadoPorHacer = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);
    //writeFile (nombreArchivo, DatosAImprimir,Callback) Escribir en archivos
    fs.writeFile(`db/data.json`, data, (err) => {
        if (err)
            throw new Error('no se pudo grabar', err);
    });
}

const cargarDB = () => { //metodo para leer json
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }
}

const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}

const actualizar = (descripcion, completado) => {
    cargarDB();
    // si manda -1 es que no lo encontro
    let index = listadoPorHacer.findIndex(tarea => {
        return tarea.descripcion === descripcion;
    });

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

const eliminar = (descripcion) => {
    cargarDB();

    let nuevoListado = listadoPorHacer.filter(tarea => {
        return tarea.descripcion !== descripcion;
    });
    if (listadoPorHacer.length === nuevoListado.length) {
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }
}

const crear = (descripcion) => {
    cargarDB();
    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);
    guardarDB(); //esta es una funcion que guarda archivo
    return porHacer;
}
module.exports = {
    crear,
    getListado,
    actualizar,
    eliminar
}