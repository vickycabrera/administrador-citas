import React, { Fragment, useState } from 'react';
import uuid from 'uuid/v4';
import PropTypes from 'prop-types';


const Formulario = ({crearCita}) => {

    //crear state de citas
    const [cita, actualizarCita] = useState({
        mascota: "",
        dueño: "",
        fecha: "",
        hora: "",
        sintomas: "",
    });

    //se setea el error si el form esta incompleto
    const [error, actualizarError] = useState(false);

    
    //actualiza el estado cuando cambia el input
    const actualizarState = (e) => {
        actualizarCita({
            ...cita,
            [e.target.name]: e.target.value
        });
    };
    
    //extraer valores
    const { mascota, dueño, fecha, hora, sintomas } = cita;

    const submitCita = (e) => {

        e.preventDefault();

        //validar campos
        if(mascota.trim()==="" || dueño.trim()===""  || fecha.trim()===""  || hora.trim()===""  || sintomas.trim()==="" ){
            actualizarError(true);
            return;
        }
        //eliminar el mensaje previo
        actualizarError(false);

        //asignar un ID
        cita.id= uuid();

        //funcion llega por props
        crearCita(cita);

        //reiniciar el form
        actualizarCita({
            mascota: "",
            dueño: "",
            fecha: "",
            hora: "",
            sintomas: "", 
        })
    }


    return (
        <Fragment>
            <h2>Crear cita</h2>

            { error ? <p className="alerta-error">Todos los campos son obligatorios</p>: null}

            <form onSubmit={submitCita}>
                <label>Nombre Mascota</label>
                <input
                    name="mascota"
                    onChange={actualizarState}
                    className="u-full-width"
                    type="text"
                    value={mascota}
                />

                <label>Nombre Dueño</label>
                <input 
                    name="dueño"
                    onChange={actualizarState}
                    className="u-full-width"
                    type="text"
                    value={dueño}
                />
                    
                <label>Fecha</label>
                <input
                    name="fecha"
                    onChange={actualizarState}
                    className="u-full-width"
                    type="date"
                    value={fecha}
                />

                <label>Hora</label>
                <input
                    name="hora"
                    onChange={actualizarState}
                    className="u-full-width"
                    type="time"
                    value={hora}
                />

                <label>Síntomas</label>
                <textarea
                    className="u-full-width"
                    name="sintomas"
                    onChange={actualizarState}
                    value={sintomas} 
                ></textarea>

                <button
                    type="submit"
                    className="u-full-width button-primary"
                >Agregar cita
                </button>
            </form>
        </Fragment>
    )




}

Formulario.propTypes = {
    crearCita : PropTypes.func.isRequired,
}

export default Formulario;