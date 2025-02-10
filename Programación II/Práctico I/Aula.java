public class Aula{
    
}

/**
 * La clase aula cuenta con los siguientes atributos:
 * alumnos[] (el aula no puede tener más de 20 alumnos)
 * profesor (no puede haber mas de un profesor asignado al aula)
 * curso (se setea una vez que ingresa un alumno o profesor)
 * 
 * --Recuerden: no puede ingresar ningún profesor o alumno de otro curso si no
 * coincide el curso del alumno o profesor
 * 
 * Métodos: 
 * Constructor por defecto que deja todos los valores libres para poder cargar
 * alumnos, profesor y curso.
 * 
 * agregarProfesor(). Ingresa un profesor, verifica si está libre y lo asigna,
 * mostrando por pantalla un mensaje "Asignado correctamente".
 * De caso contrario debe mostrar por pantalla el motivo de por qué no se pudo
 * asignar el profesor.
 * 
 * hayProfesor(). Devuelve verdadero en caso de que ya haya un profesor.
 * Devuelve falso en el caso de que no haya un profesor asignado.
 * 
 * removerProfesor(). Permite liberar el profesor en el caso de que haya uno.
 * 
 * agregarAlumno(). Ingresa un alumno, busca si hay lugar disponible.
 * 
 * buscarAlumno(). Devuelve verdadero si es que lo encuentra. Falso si no.
 * 
 * removerAlumno(). Quita del aula al alumno que se envía por parámetro, liberando el espacio.
 * 
 * hayEspacioLibre(). Devuelve verdadero o falso dependiendo de los espacios libres
 * que hayan en el aula para los alumnos.
 * 
 */