const NAV_ITEMS = document.querySelector('#nav-items');
const MENU = document.querySelector('#menu');
const NAV = document.querySelector('#nav');
const MATCH = matchMedia('(min-width: 768px)');
const LOGO = document.querySelector('#logo');

//formulario
const NOMBRE = document.querySelector('#nombre');
const EMAIL = document.querySelector('#email');
const TEXT_AREA = document.querySelector('#textarea');
const FORMULARIO = document.querySelector('#formulario');

const DATOS = {
  nombre: '', 
  email: '',
  textarea: '',
}

class Backend {
  llenado(campo) {
    DATOS[campo.target.name] = campo.target.value.trim();
  }

  validarEmail(email) {
    const REGEX = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    return REGEX.test( email );
  }
}

class Ui {
  mensaje(sms, tipo, referencia) {
    const DOM_DIV = document.createElement('div');
    DOM_DIV.classList.add('footer__sms','flex', 'items-center', 'justify-center', 'gap-3');
    DOM_DIV.innerHTML = sms;

    if(tipo === 'error'){
      DOM_DIV.classList.add('footer__sms--error');
    }else {
      DOM_DIV.classList.add('footer__sms--success');
    }

    referencia.appendChild(DOM_DIV);

    setTimeout(() => {
      DOM_DIV.remove();
    }, 3000);
  }
}

const UI = new Ui();
const BACKEND = new Backend();

//
allFunctions();
function allFunctions() {
  MENU.addEventListener('click', openAndCloseMenu);
  addEventListener('DOMContentLoaded', match(MATCH));

  //formulario
  obtenerDatos();
}

function openAndCloseMenu() {
  if(NAV_ITEMS.classList.contains('-right-full')) {
    NAV_ITEMS.classList.remove('-right-full');
    NAV_ITEMS.classList.add('right-0');
    MENU.name = 'close-outline';
    return;
  }
  NAV_ITEMS.classList.add('-right-full');
  NAV_ITEMS.classList.remove('right-0');
  MENU.name = 'menu-outline';
}

function match(matchMed) {
  let DOM_LI = document.createElement('li');
  DOM_LI.innerHTML = `<a href="#" class="nav_item"> <img class="w-12 drop-shadow-[0_0_10px_#fb923c] hover:drop-shadow-[0_0_13px_#fb925a]" src="../build/img/logo.png" alt="Imagen Logo"> </a>`;

  if(matchMed.matches) {
    NAV_ITEMS.insertBefore(DOM_LI, NAV_ITEMS.children[2]);
    LOGO.remove();
    return;
  }
  DOM_LI.remove();
}

function obtenerDatos() {
  NOMBRE.addEventListener('blur', llenarObj);
  EMAIL.addEventListener('blur', llenarObj);
  TEXT_AREA.addEventListener('blur', llenarObj);
  FORMULARIO.addEventListener('submit', validar);
}

function llenarObj(e) {

  if(e.target.value.trim() === '') {
    UI.mensaje(`<lord-icon src="https://cdn.lordicon.com/ncxoarcp.json" trigger="loop" delay="250" colors="primary:#fff" state="hover" style="width:23px;height:23px"></lord-icon> El campo ${e.target.name} se encuentra vacío`, 'error', e.target.parentElement);
  }else if(e.target.name === 'email' && !BACKEND.validarEmail(e.target.value)){
    UI.mensaje(`<lord-icon src="https://cdn.lordicon.com/vacmyjrh.json" trigger="loop" state="hover-2" delay="250" colors="primary:#fff" style="width:23px;height:23px"></lord-icon> Este no es un correo`, 'error',e.target.parentElement);
  }
  BACKEND.llenado(e);
}

function validar(e) {
  e.preventDefault();
  const {nombre, email, textarea} = DATOS;
  if(nombre === '' || email === '' || textarea === '' ){
    UI.mensaje(`<lord-icon src="https://cdn.lordicon.com/vacmyjrh.json" trigger="loop" state="hover-2" delay="250" colors="primary:#fff" style="width:23px;height:23px"></lord-icon> Alguno de los campos se encuentra vacío`, 'error',FORMULARIO.parentElement);
    return;
  }
  UI.mensaje(`Se mando con exito tu mensaje  <lord-icon src="https://cdn.lordicon.com/yqzmiobz.json" trigger="loop" delay="800" colors="primary:#fff" style="width:23px;height:23px"></lord-icon>`, '', FORMULARIO.parentElement); limpiarObj();
  FORMULARIO.reset();
}

function limpiarAlerta() {
  if(FORMULARIO.firstChild) {
    FORMULARIO.removeChild(FORMULARIO.firstChild);
  }
}

function limpiarObj() {
  DATOS.nombre = '';
  DATOS.email = '';
  DATOS.textarea = '';
}
