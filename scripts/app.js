
import Superheroe from "./Superheroe.js";
import crearTabla from "./tablaDinamica.js";

//Carga del STORAGE
const Superheroes = localStorage.getItem("Superheroes") ? JSON.parse(localStorage.getItem("Superheroes")) : [];
const armas = ["Armadura", "Espada", "Martillo", "Escudo", "Arma de Fuego", "Flechas"];

console.log("Imprimiendo objetos:")
console.log(Superheroes);
actualizarTabla();


const frmSuperheroe = document.forms[0];
frmSuperheroe.addEventListener("submit", (e) =>
{
    const formAlta = e.target;

    console.log(e);

    e.preventDefault();

    console.log("Imprimiendo valores leidos:");

    console.log(formAlta.Alias.value);
    console.log(formAlta.Nombre.value);
    console.log(formAlta.Editorial.value);
    console.log(formAlta.Fuerza.value);
    console.log(formAlta.Arma.value);


    let ID = Date.now();
    let Alias = formAlta.Alias.value;
    let Nombre = formAlta.Nombre.value;
    let Editorial = formAlta.Editorial.value;
    let Fuerza = formAlta.Fuerza.value;
    let Arma = formAlta.Arma.value;

    let resultadoValidacion = validarParametros(ID, Alias, Nombre, Editorial, parseFloat(Fuerza), Arma)

    if (resultadoValidacion == -1)
    {
        alert("No se pudieron validar todos los campos del formulario.");
    }
    else
    {
        const newSuperheroe = new Superheroe(ID, Alias, Nombre, Editorial, parseFloat(Fuerza), Arma);

        Superheroes.push(newSuperheroe);
    
        localStorage.setItem("Superheroes", JSON.stringify(Superheroes));
    
        actualizarTabla();
    }
});
//------------------------------------------------------------------------------------------------------------------------

const botonEliminar = document.getElementById("BtnEliminar");
botonEliminar.addEventListener("click", (e) =>
{
    if (idFilaClickeada != null && idFilaClickeada != undefined)
    {
        Superheroes.forEach((element, index) => 
        {
            if (element.ID == idFilaClickeada) 
            {
                Superheroes.splice(index,1);

                localStorage.setItem("Superheroes", JSON.stringify(Superheroes));

                if(flagFilaSeleccionada == true)
                {
                    idFilaClickeada = null;
                    ultimaFilaSeleccionada.style.backgroundColor = "rgb(233, 227, 227)";
                }
                setearControlesValoresDefault();

                actualizarTabla();

                return;
            }
        });   
    }
    else
    {
        alert("No se puede eliminar si no hay nada seleccionado en la tabla.");
    }
});
//------------------------------------------------------------------------------------------------------------------------

const botonModificar = document.getElementById("BtnModificar");
botonModificar.addEventListener("click", (e) =>
{
    if (idFilaClickeada != null && idFilaClickeada != undefined)
    {
        Superheroes.forEach((element, index) => 
        {
            if (element.ID == idFilaClickeada) 
            {
                Superheroes[index].Alias = document.getElementById("txtBoxAlias").value;
                Superheroes[index].Fuerza = document.getElementById("txtBoxFuerza").value;
                Superheroes[index].Nombre = document.getElementById("txtBoxNombre").value;
                Superheroes[index].Arma = document.getElementById("txtBoxArma").value;

                if (document.getElementById("radioBtnMarvel").checked == true)
                {  
                    Superheroes[index].Editorial = "Marvel";
                }
                else if (document.getElementById("radioBtnDC").checked == true)
                {
                    Superheroes[index].Editorial = "DC";
                }
                
                localStorage.setItem("Superheroes", JSON.stringify(Superheroes));

                if(flagFilaSeleccionada == true)
                {
                    idFilaClickeada = null;
                    ultimaFilaSeleccionada.style.backgroundColor = "rgb(233, 227, 227)";
                }
                setearControlesValoresDefault();

                actualizarTabla();

                return;
            }
        });   
    }
    else
    {
        alert("No se puede modificar si no hay nada seleccionado en la tabla.");
    }
});
//-----------------------------------------------------------------------------------------------------------------------

const botonCancelar = document.getElementById("BtnCancelar");
botonCancelar.addEventListener("click",(e) =>
{
    if(flagFilaSeleccionada == true)
    {
        idFilaClickeada = null;
        ultimaFilaSeleccionada.style.backgroundColor = "rgb(233, 227, 227)";
    }

    setearControlesValoresDefault();
});
//-----------------------------------------------------------------------------------------------------------------------

let flagFilaSeleccionada = false;
let ultimaFilaSeleccionada;
let idFilaClickeada;

const contenedorTabla = document.getElementById("table-container");
contenedorTabla.addEventListener("click", (e) => 
{
    const ubicacionClickeada = e.target; 
    idFilaClickeada = e.target.parentElement.dataset.id;

    if (ubicacionClickeada.matches("tr td") == true)
    {
        console.log("El ID del Superheroe seleccionado: "+idFilaClickeada);
        const fila = ubicacionClickeada.parentElement;

        if (fila.matches("tr") == true && flagFilaSeleccionada == false && fila != null && fila != undefined)
        { 
            mostrarEnControlesFilaSeleccionada(idFilaClickeada);

            fila.style.backgroundColor = 'antiquewhite';
            flagFilaSeleccionada = true;
            ultimaFilaSeleccionada = fila;
        }
        else if (fila.matches("tr") == true && flagFilaSeleccionada == true && fila != null && fila != undefined) 
        {
            mostrarEnControlesFilaSeleccionada(idFilaClickeada);

            ultimaFilaSeleccionada.style.backgroundColor = "rgb(233, 227, 227)";

            fila.style.backgroundColor = 'antiquewhite';
            ultimaFilaSeleccionada = fila;
            flagFilaSeleccionada = true;
        }
    }
});

function mostrarEnControlesFilaSeleccionada(idRecibido) 
{
    Superheroes.forEach((element) => 
    {
    if (element.ID == idRecibido) 
    {
        document.getElementById("txtBoxAlias").value = element.Alias;
        document.getElementById("txtBoxNombre").value = element.Nombre;
        document.getElementById("txtBoxFuerza").value = element.Fuerza;
        document.getElementById("txtBoxArma").value = element.Arma;

        if (frmSuperheroe.Editorial[0].checked == true && element.Editorial == "DC") 
        {
            frmSuperheroe.Editorial[1].checked = true;
        }
        else if (frmSuperheroe.Editorial[1].checked == true && element.Editorial == "Marvel") 
        {
            frmSuperheroe.Editorial[0].checked = true;
        }
    }
    });
}
//------------------------------------------------------------------------------------------------------------------------


function actualizarTabla()
{
    const data = localStorage.getItem("Superheroes") ? JSON.parse(localStorage.getItem("Superheroes")) : [];            

    const container = document.querySelector(".table-container");

    while(container.children.length > 0) 
    { 
        container.removeChild(container.firstElementChild);
    }

    if (data.length > 0)
    {
        container.appendChild(crearTabla(Superheroes));
    }
}
//------------------------------------------------------------------------------------------------------------------------

function setearControlesValoresDefault()
{
    document.getElementById("txtBoxAlias").value = "";
    document.getElementById("txtBoxNombre").value = "";
    document.getElementById("txtBoxFuerza").value = "";
    document.getElementById("txtBoxArma").value = "";
    frmSuperheroe.Editorial[0].checked = true;
}

function validarParametros(idRecibido,aliasRecibido,nombreRecibido,editorialRecibida,fuerzaRecibida,armaRecibida) 
{
    let retorno;

    if (idRecibido == null || idRecibido == undefined || 
        aliasRecibido == null || aliasRecibido == undefined || aliasRecibido.length > 20 || aliasRecibido == "" ||
        nombreRecibido == null || nombreRecibido == undefined || nombreRecibido == "" || 
        editorialRecibida == null || editorialRecibida == undefined || editorialRecibida.length > 6 || editorialRecibida == "" ||
        isNaN(fuerzaRecibida) == true || fuerzaRecibida.length > 18 ||fuerzaRecibida > 100 || fuerzaRecibida < 0 || fuerzaRecibida == null || fuerzaRecibida == undefined ||
        isNaN(armaRecibida) == false || armaRecibida.length > 15 ||armaRecibida < 0 || armaRecibida == null || armaRecibida == undefined) 
    {
        retorno = -1;
    }
    else
    {
        retorno = 0;
    }

    return retorno;
}

setTimeout(() => 
{
    const divSpinner = document.getElementById("divSpinner");
    divSpinner.setAttribute("Hidden", true);

    const divPrincipal = document.getElementById("table-container");
    divPrincipal.removeAttribute("Hidden");
},3000);