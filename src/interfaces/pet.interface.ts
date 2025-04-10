export interface Pet {
    id: string;        // UUID generado automáticamente
    name: string;      // Nombre de la mascota
    breed?: string;    // Raza de la mascota (opcional)
    age: number;       // Edad de la mascota
    user_id: string;   // ID del usuario asociado a la mascota (UUID)
  }