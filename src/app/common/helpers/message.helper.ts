export const errorMessage = {
  required: 'Este campo es requerido!',
  passwordCompare: 'Las contraseñas no coinciden',
  email: 'No es un email valido',
  phone: 'No es un telefono valido',
  max: (value: number = 0) => `Superó el valor máximo permitido: ${value}`,
  minLength: (value: number = 0) => `Debe tener mínimo ${value} carácteres`,
  maxLength: (value: number = 0) => `Debe tener máximo ${value} carácteres`,
};
