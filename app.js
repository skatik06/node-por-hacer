//const argv = require('yargs').argv;
const argv = require('./config/yargs').argv;
const porHacer = require('./por-hacer/por-hacer');
const color = require('colors');

let comando = argv._[0];

switch (comando) {
    case 'crear':
        // console.log('crear por hacer');
        let tarea = porHacer.crear(argv.descripcion);
        console.log(tarea);
        break;
    case 'listar':
        let listado = porHacer.getListado();
        for (let lis of listado) {
            console.log('=====Por Hacer====='.green);
            console.log(lis.descripcion);
            console.log('Estado: ', lis.completado);
            console.log('==================='.green);
        }
        //console.log('mostrar todas las tareas por hacer');
        break;
    case 'actualizar':
        //console.log('actualizar una tarea');
        let actualizado = porHacer.actualizar(argv.descripcion, argv.completado);
        console.log(actualizado);
        break;
    case 'eliminar':
        let eliminado = porHacer.eliminar(argv.descripcion);
        console.log(eliminado);
        break;
    default:
        console.log('comando no es reconocido');

}