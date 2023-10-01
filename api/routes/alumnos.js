var express = require("express");
var router = express.Router();
var models = require("../models");

router.get("/", (req, res) => {
    console.log('obtener alumno');   
    const cantAVer = parseInt(req.query.cantAVer) || 10;
    const paginaActual = parseInt(req.query.paginaActual) || 1;
    models.alumno
        .findAll({
        attributes: ['id', 'nombre', 'apellido'],
        offset:((paginaActual-1)*cantAVer),
        limit : cantAVer
    })
    .then((alumnos) => res.send(alumnos))
    .catch(() => res.sendStatus(500));
});

router.post('/', (req, res) => {
    models.alumno
        .create({ nombre: req.body.nombre, apellido: req.body.apellido})
        .then((alumno) => res.status(201).send({ id: alumno.id }))
        .catch((error) => {
        if (error === 'SequelizeUniqueConstraintError: Validation error') {
            res
            .status(400)
            .send('Bad request: existe otro alumno con el mismo nombre');
        } else {
            console.log(`Error al intentar insertar en la base de datos: ${error}`);
            res.sendStatus(500);
        }
    });
});

const findAlumno = (id, { onSuccess, onNotFound, onError }) => {
    models.alumno
        .findOne({
        attributes: ['id', 'nombre', 'apellido'],
        where: { id },
    })
    .then((alumno) => (alumno ? onSuccess(alumno) : onNotFound()))
    .catch(() => onError());
};

router.get('/:id', (req, res) => {
    findAlumno(req.params.id, {
        onSuccess: (alumno) => res.send(alumno),
        onNotFound: () => res.sendStatus(404),
        onError: () => res.sendStatus(500),
    });
});

router.put('/:id', (req, res) => {
    const {id_alumno, id_materia} = req.body;
    const update = {} ;
    if(id_alumno) update.id_alumno = id_alumno ;
    if(id_materia) update.id_materia = id_materia ;
    const onSuccess = (alumno) =>
        alumno
        .update(update)
        .then(() => res.sendStatus(200))
        .catch((error) => {
            if (error === 'SequelizeUniqueConstraintError: Validation error') {
            res
                .status(400)
                .send('Bad request: existe otra inscipcion con el mismo Alumno y Materia');
            } else {
            console.log(
                `Error al intentar actualizar la base de datos: ${error}`,
            );
            res.sendStatus(500);
        }
    });
    findAlumno(req.params.id, {
        onSuccess,
        onNotFound: () => res.sendStatus(404),
        onError: () => res.sendStatus(500),
    });
});

router.delete('/:id', (req, res) => {
    const onSuccess = (alumno) =>
        alumno
        .destroy()
        .then(() => res.sendStatus(200))
        .catch(() => res.sendStatus(500));
    findAlumno(req.params.id, {
        onSuccess,
        onNotFound: () => res.sendStatus(404),
        onError: () => res.sendStatus(500),
    });
});

module.exports = router;