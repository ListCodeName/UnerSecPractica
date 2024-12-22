public class Persona{

}

/**
 * La clase persona cuenta con los siguientes atributos:
 * nombre
 * apellido
 * dni
 * 
 * Los siguientes métodos:
 * Constructor con parámetros para nombre y apellido con los siguientes requisitos.
 * -> El dni debe generarse aleatoriamente teniendo la salvedad de que no sea un número
 * negativo ni cero.
 * -> El nombre de la persona creada no debe contener números ni caracteres especiales.
 * En el caso de que lo tenga, deberán elegir un nombre aleatoriamente dentro de un 
 * grupo de 10 nombres predeterminados ejemplo {Juan, Jose, María, ...}
 * -> Lo mismo debe aplicarse para el apellido.
 * 
 * equals(). Debe devolver un booleano dependiendo si es igual o no comparandolo con la persona que
 * se envía por parámetro. El criterio es, si tienen distinto dni, son distintos.
 * 
 * toString(). Devuelve un String con el siguiente formato:
 * (5333215) Juan Perez
 * 
 */