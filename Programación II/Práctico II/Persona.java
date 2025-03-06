public class Persona{
    private String nombre;
    private String apellido;
    private int dni;

    public Persona(String nombre, String apellido){

        Random r = new Random();
        // -32M ~ 32M  ---  -49999999 a 49999999  ---  0 a 499999999
        dni = Math.abs(r.nextInt() % 50000000) +1;

        String[] nombres = {"Juan", "Jose", "María", "Roberto", "Carlos", "Yanina", "Vanesa", "Santiago", "Alejandro", "Morena", "Dylan"};

        boolean flag = false;

        for(int i = 0; i < nombre.lenght(); i++){
            if(Character.isDigit(nombre.charAt(i))){
                flag = true;
                break;
            }
        }

        if(flag){
            //Encontró un numero
            this.nombre = nombres[ Math.abs(r.nextInt() % nombres.lenght()) ];
        }else{
            //No encontró numeros
            this.nombre = nombre;
        }

    }

    public boolean equals(Persona p){
        if(dni == p.getDni()){
            return true;
        }else{
            return false;
        }
    }

    public String toString(){
        //(5333215) Juan Perez
        return "("+ dni + ") " + nombre + " " + apellido;
    }
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