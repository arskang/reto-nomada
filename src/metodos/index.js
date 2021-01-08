import moment from 'moment';
import 'moment/locale/es-mx';

const url = "https://whois.nomada.cloud/upload";
const apiKey = "YjJjMzRhYjUtMjdjZS00NjZlLTg0OWYtMDU4ZjA5MjFlMjYy";
const headers = { method: "POST", headers: { Nomada: apiKey } };
const tiposValidos = ["image/png", "image/jpeg", "image/jpg"];

const apiKeyTMD = "173d57fbdc747b64167ef9afd3ec3a1a";
const urlFamoso = (actorName) => `https://api.themoviedb.org/3/search/person?api_key=${apiKeyTMD}&language=es-MX&query=${actorName}&page=1&include_adult=false`;

export const identificarFamoso = async (file) => {
    let body = new FormData();
    body.append("file", file);
    let response = await fetch(url, { ...headers, body });
    if(!response.ok) throw new Error(`¡Una disculpa! Ocurrio el siguiente problema: ${response.statusText}`);
    let { error, actorName } = await response.json();
    if(error.trim() !== "") throw new Error(error);
    return actorName;
};

export const validarTipo = async (tipo) => {
    if(!tiposValidos.includes(tipo)) throw new Error("El archivo cargado no es válido, solo se permite subir imagenes con la extensión .jpg y .png");
};


export const obtenerInfoFamoso = async (actorName) => {
    let response = await fetch(urlFamoso(actorName));
    if(!response.ok) throw new Error(`¡Una disculpa! Ocurrio el siguiente problema: ${response.statusText}`);
    let resultado = await response.json();;
    return resultado;
}

export const obtenerGenero = (genero) => {
    switch(genero) {
        case 1: return "Mujer";
        case 2: return "Hombre";
        default: return "Otro";
    }
}

export const formatearFecha = (fecha) => moment(fecha).format('LL');

export const urlImages = "https://image.tmdb.org/t/p/w500";
