    
import Personaje from "./Personaje.js";
    class Superheroe extends Personaje
    {    
        constructor(idRecibido,aliasRecibido,nombreRecibido,editorialRecibida,fuerzaRecibida,armaRecibida)
        {
            super(idRecibido,nombreRecibido,fuerzaRecibida)
            this.Alias = aliasRecibido;
            this.Editorial = editorialRecibida;
            this.Arma =  armaRecibida;
        }
    }

    export default Superheroe;