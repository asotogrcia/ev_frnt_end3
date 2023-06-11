/*
1.- ID:email        ID:err_correo
2.- ID:pass         ID:err_pass
3.- ID:ver_pass     ID:err_ver_pass
4.- ID:direccion    ID:err_direccion
5.- ID:comuna       ID:err_comuna
6.- ID:web          ID:err_web
7.- ID:celular      ID:err_cel
8.- ID:pasatiempos  ID:err_pst
9.- ID:acepto       ID:err_acepto
*/

/*
Los campos para el correo electrónico, la contraseña, la dirección y el número de teléfono 
deben ser obligatorios.
- Debe validar el formato del correo electrónico, la URL de la página web personal y el 
número de teléfono.
- La contraseña debe tener de 3 a 6 caracteres y al menos un dígito y una letra.
- La confirmación debe coincidir con la contraseña.
- El usuario debe ingresar al menos 2 aficiones.
- El usuario debe seleccionar una comuna y no puede haber una comuna preseleccionada.

*/
function validar() {
    var ret_correo = validar_correo();
    var ret_passwd = validar_passwd();
    var ret_direccion = validar_direc();    
    var ret_fono = validar_fono();
    var ret_pagina = validar_pagina();
    var ret_comuna = validar_selec_comuna();
    var ret_pasatiempos = verificar_pasatiempos();
    var ret_see_pasatiempos = mostrar_pasatiempos();
    var ret_checkbox = verificar_checkbox();

    return ret_correo && ret_passwd && ret_direccion && ret_fono && ret_pagina && ret_comuna && ret_checkbox && ret_pasatiempos && ret_see_pasatiempos;
}

//ID:email        ID:err_correo
function validar_correo(){
    var correo = document.getElementById("correo").value;
    var div = document.getElementById("err_correo");
    var arroba = correo.indexOf("@");
    var punto = correo.lastIndexOf(".");
    
    if (correo.length == 0){
        div.innerText = "Ingrese un correo electrónico.";
        div.className = "text-danger";
        return false;
    } else {
        if (arroba < 1) {
            div.innerText = "El correo electrónico no es válido.";
            div.className = "text-danger";
            return false;
        } else {
            if (arroba < 2) {
                div.innerText = "El nombre de usuario del correo no es válido.";
                div.className = "text-danger";
                return false;
            } else {
                if (arroba + 3 > punto || punto + 1 >= correo.length - 1) {
                    div.innerText = "El nombre de dominio no es válido.";
                    div.className = "text-danger";
                    return false;
                } else {
                    div.innerText = "";
                    return true;
                }
            }
        }
    }
}
// ID:pass      ID:ver_pass     ID:err_pass 
/* La contraseña debe tener de 3 a 6 caracteres y al menos un dígito y una letra. */
function validar_passwd (){
    let pass = document.getElementById("pass").value;
    let ver_pass = document.getElementById("ver_pass").value;
    let div = document.getElementById("err_pass");
    let div_err = document.getElementById("err_ver_pass");
    div.innerText = "";
    let char_switch = false;
    let digit_switch = false;

    if (pass.length < 3 || pass.length > 5) {
        div.innerText = "La contraseña debe tener de 3 a 6 caracteres.";
        div.className = "text-danger";
        return false;
    } else {
        for (let i = 0; i < pass.length; i++) {
            let digit_value = (pass[i]);
            if (!isNaN(parseInt(digit_value))){
                digit_switch = true;
                break;
            } else {
                digit_switch = false;
            }
        }
        for (let i = 0; i < pass.length; i++) {
            let char_value = (pass[i]);
            if (!isNaN(parseInt(char_value))){
                char_switch = false;
            } else {
                char_switch = true;
                break;
            }
        }
        if (!(digit_switch && char_switch)) {
            div.innerText = "La contraseña debe contener al menos un dígito y una letra.";
            div.className = "text-danger";
            return false;
        } else {
            if ( pass != ver_pass) {
                div_err.innerText = "Las contraseñas deben ser iguales.";
                div_err.className = "text-danger";
                return false;
            } else {
                div_err.innerText = "";
                return true;
            }
        }
    }
}

/* 
ID:direccion    ID:err_direccion
- Validar la dirección del usuario
- Dirección no puede ser nula
- Mínimo 10 caracteres
- Máximo 40 caracteres
*/
function validar_direc(){
    let direccion = document.getElementById("direccion").value;
    let div = document.getElementById("err_direccion");
    div.innerText = "";

    if (direccion.length < 9 || direccion.length > 39 ) {
        div.innerText = "Dirección inválida (Mínimo 10 caracteres, máximo 40).";
        div.className = "text-danger";
        return false;
    } else {
        div.innerText = "";
        return true;
    }
}


/*  Validar web
- Tener más de 3 caracteres de longitud antes del punto
- Tener mínimo 2 caracteres de longitud después del punto 
ID:web          ID:err_web  */
function validar_pagina(){
    let web = document.getElementById("web").value;
    let div = document.getElementById("err_web");
    let punto = web.lastIndexOf(".");
    div.innerText = "";

    if (punto < 2 || punto === null) {
        div.innerText = "Página web no válida.";
        div.className = "text-danger";
        return false;
    } else {
        if (punto + 1 >= web.length - 1) {
            div.innerText = "El nombre de dominio no es válido.";
            div.className = "text-danger";
            return false;
        } else {
            div.innerText = "";
            return true;
        }
    }
}

/*  Validar fono
- Máximo 9 dígitos (se incluye el prefijo para teléfono fijo(2) y celular (9))
- Deben ser solo números 
ID:celular      ID:err_cel */
function validar_fono(){
    let celular = document.getElementById("celular").value;
    let div = document.getElementById("err_cel");
    let valid_switch = true;
    div.innerText = "";

    for (let i = 0; i < celular.length; i++) {
        let valor = (celular[i]);
        if (!isNaN(parseInt(valor))){
            valid_switch = true;
        } else {
            valid_switch = false;
            break;
        }
    }

    if (!valid_switch) {
        div.innerText = "El número no puede contener letras o caracteres especiales.";
        div.className = "text-danger";
        return false;
    } else {
        if (celular.length != 9) {
            div.innerText = "El número celular solo puede tener 9 dígitos.";
            div.className = "text-danger";
            return false;
        } else {
            div.innerText = "";
            return true;
        }
    }
}

/* Verificar Checkbox
- Debe estár clickado para enviar el formulario */
//ID:acepto       ID:err_acepto
function verificar_checkbox(){
    let acepto = document.getElementById("acepto");
    let div = document.getElementById("err_acepto");
    div.innerText = "";

    if (acepto.checked) {
        div.innerText = "";
        return true;
    } else {
        div.innerText = "Acepte las condiciones de uso.";
        div.className = "text-danger";
        return false;
    }
}

/* Validar pasatiempos
- Al menos 2 aficiones
- Separar por comas */
//ID:pasatiempos  ID:err_pst
function verificar_pasatiempos(){
    let pasatiempos = document.getElementById("pasatiempos").value;
    let div = document.getElementById("err_pst");
    //Reseteo el texto del div.
    div.innerText = "";
    //Lista con aficiones separadas por una coma ","
    var lst_pst = pasatiempos.split(",");

    if (lst_pst.length < 2) {
        div.innerText = "Ingrese al menos 2 pasatiempos.";
        div.className = "text-danger";
        return false;
    } else {
        return true;
    }
}

function capitalize(cad_texto){
    /*  Toma la letra en la posición 0 de la cadena de texto 
    y la convierte a mayúsculas, a eso le suma el resto
    de la cadena de texto con la función slice  */
    return cad_texto[0].toUpperCase() + cad_texto.slice(1);
}

function mostrar_pasatiempos(){
    var pasatiempos = document.getElementById("pasatiempos").value;
    var div = document.getElementById("err_pst");
    var h5_lista = document.getElementById("h5_lista");
    //Lista UL HTML
    var lista = document.getElementById("lista_pasatiempos");
    //Reseteo la lista
    lista.innerText = "";
    //Reseteo el texto del div.
    div.innerText = "";
    //Lista con aficiones separadas por una coma ","
    var lst_pst = pasatiempos.split(",");

    if (lst_pst.length < 2) {
        div.innerText = "Ingrese al menos 2 pasatiempos.";
        div.className = "text-danger";
        return false;
    } else {
        div.innerText = "";
        //Edito el H5 de la lista
        h5_lista.innerText = "Lista Aficiones";
        h5_lista.className = "h5";

        for (let i = 0; i < lst_pst.length; i++) {
            //Agrego los items a la lista al presionar el boton
            let texto = lst_pst[i];
            texto = texto.trimStart();
            //Dejo la primera letra de cada cadena de texto en mayúsculas.
            texto = capitalize(texto);
            var li = document.createElement("li");
            li.textContent = texto;
            lista.appendChild(li);
        }
        return true;
    }
}

/*
        for (let i = 0; i < datos.length; i++) {
            var li = document.createElement("li");
            li.textContent = datos[i];
            lista.appendChild(li);
        }
*/


/* Pasatiempos Opción Local Storage
function verificar_pasatiempos(){
    let aficiones = document.getElementById("pasatiempos").value;
    let lista_aficiones = document.getElementById("lst_pst");
    let div = document.getElementById("err_pst");
    
    div.innerText = "";
    //Lista con las aficiones separadas por una coma ","
    var lst_splt = aficiones.split(",");

    //Se recetea la lista.
    lista_aficiones.innerText = "";

    if (lst_splt.length < 2) {
        div.innerText = "Ingrese al menos 2 pasatiempos";
        div.className = "text-danger";
        return false;
    } else {
        //Agrego los pasatiempos a una lista con los datos
        var lst_pasatiempos = [];
        for (let i = 0; i < lst_splt.length; i++) {
            const elemento = lst_splt[i];
            lst_pasatiempos.append(elemento);
        }
        //Guardo los datos en el local storage
        localStorage.setItem("lista_datos", JSON.stringify(lst_pasatiempos));
        
        return true;
    }
} */

/* Codigo Base
        div.innerText = "";
        lst_splt.forEach(elemento_txt => {
            let li = document.createElement("li");
            li.textContent = elemento_txt;
            lista_aficiones.appendChild(li);
        
        })
        return true;
*/ 



/* Validar la seleccion de comuna
- No debe haber una comuna preseleccionada
- Verificar que haya una comuna seleccionada */
//ID:comuna       ID:err_comuna
function validar_selec_comuna(){
    let selecComuna = document.getElementById("comuna");
    let div = document.getElementById("err_comuna");
    let selecOpcComuna = selecComuna.selectedIndex;
    div.innerText = "";

    if (selecOpcComuna === 0) {
        //No se ha seleccionado ninguna opción
        div.innerText = "Por favor, selecciona una comuna.";
        div.className = "text-danger";
        return false;
    } else {
        //Se ha seleccionado una opción
        div.innerText = "";
        return true;
    }
}