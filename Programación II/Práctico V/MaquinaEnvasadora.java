public class MaquinaEnvasadora{

}

/**
 * La clase envasadora cuenta con los siguientes atributos:
 * cartucho1 []
 * cartucho2 []
 * cartucho3 []
 * paquete []
 * 
 * Cada cartucho contiene galletitas de un mismo sabor.
 * El paquete contiene 50 galletitas.
 * 
 * 
 * Los siguientes métodos:
 * El constructor debe inicializar todos los atributos como null
 * 
 * agregarGalletitas() - Recibe un Cartucho de galletitas que se colocan en uno de los cartuchos libres.
 * En el caso de que los 3 cartuchos contengan galletitas todavía en su interior, debe mostrar un mensaje
 * por pantalla que diga "No hay cartuchos vacíos"
 * 
 * agregarPaquetes() - Recibe una plancha de Paquetes plásticos para poder envasar las galletitas.
 * En el caso de que todavía hayan paquetes, muestre por pantalla "Todavía hay paquetes libres"
 * 
 * revisarCartuchos() - Envía un mensaje por pantalla en donde se puede ver fácilmente el estado de los 
 * cartuchos. El formato sería de la siguiente forma.
 * Cartucho 1 - Listo
 * Cartucho 2 - Listo
 * Cartucho 3 - Vacio
 * Antes de mostrar el estado debe remover automaticamente los cartuchos que ya no tienen galletitas.
 * 
 * surtir() - este método necesita tener al menos 1 cartucho de donde sacar galletitas y las va
 * agregando de una en una al paquete hasta que esté lleno o bien se terminen las galletitas.
 * En el caso de que hayan mas de 1 cartucho la elección se realiza en forma aleatoria entre las disponibles.
 * Si se terminan las galletitas y el paquete no está listo, deberá mostrar el mensaje "Recargue galletitas"
 * Cada vez que se termina de cargar un paquete mostrará por pantalla "Paquete listo"
 * 
 * 
 */