public class Casa{
    private String nombre;
    private Persona[] habitantes;
    private int metrosCuadrados;

    public Casa(int metrosCuadrados){
        if(metrosCuadrados > 30){
            this.metrosCuadrados = metrosCuadrados;
            this.habitantes = new Persona[this.metrosCuadrados / 30];
        }else{
            this.metrosCuadrados = 30;
            System.out.println("Su casa es muy chica.");
        }
    }

    //viveAqui(). Recibe una persona y devuelve un booleano, 
    //verdadero en caso de que lo encuentre.
    public boolean viveAqui(Persona p){
        for(int i = 0; i < habitantes.length ; i++){
            if( habitantes[i].equals(p) ){
                return true;
            }
        }
        return false;
    }

    /*   * asignarHabitante(). Recibe una Persona y lo almacena en la casa,
    * siempre y cuando haya espacio, mostrando un mensaje por pantalla
    * para saber si se pudo o no concretar la acción.
    * -> Además deberá verificar que no esté ya viviendo aquí.
    * En caso de que si, debe mostrar por pantalla "Ya vive aquí".*/

    public void asignarHabitante(Persona p){
        for( int i = 0; i < habitantes.length ; i++){
            if( habitantes[i] == null){
                habitantes[i] = p;
                break;
            }
        }
    }

}

/**
 * La clase casa cuenta con los siguientes atributos:
 * nombre
 * habitantes[]
 * metrosCuadrados
 * 
 * Los siguientes métodos:
 * Constructor que recibe los metros cuadrados de la casa.
 * -> El mínimo de una casa debe ser de 30 metros cuadrados.
 * -> En base a los metros cuadrados debe determinar la cantidad de 
 * habitantes que puede contener la casa. La relación es que cada 30
 * metros cuadrados puede vivir una persona.
 * 
 * viveAqui(). Recibe una persona y devuelve un booleano, 
 * verdadero en caso de que lo encuentre.
 * 
 * asignarHabitante(). Recibe una Persona y lo almacena en la casa,
 * siempre y cuando haya espacio, mostrando un mensaje por pantalla
 * para saber si se pudo o no concretar la acción.
 * -> Además deberá verificar que no esté ya viviendo aquí.
 * En caso de que si, debe mostrar por pantalla "Ya vive aquí".
 * 
 * espacioDisponible(). Devuelve cuantos espacios hay disponibles
 * para que puedan agregar personas
 * 
 * espacioOcupado(). Devuelve la cantidad de habitantes que tiene
 * actualmente la casa.
 * 
 * toString(). Debe devolver un String con el siguiente formato:
 * "
 * Vivienda: El Carancho (340 m^2)
 * Habitantes:
 * (5333215) Juan Perez
 * (4433285) María Sanchez
 * "
 */