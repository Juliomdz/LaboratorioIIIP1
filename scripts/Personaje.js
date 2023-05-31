    
    class Personaje
    {    
        constructor(idRecibido,nombreRecibido,fuerzaRecibida)
        {
            this.ID = idRecibido;
            this.Nombre = nombreRecibido;
            this.Fuerza = parseFloat(fuerzaRecibida);
        }
    }

    export default Personaje;