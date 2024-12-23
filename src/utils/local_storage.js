export const save_LS = (nombre, info) => {
  localStorage.setItem(nombre, info);
};

export const delete_LS = (nombre) => {
  localStorage.removeItem(nombre);
};

export const read_LS = (nombre) => {
  return localStorage.getItem(nombre);
};

export const save_object_LS = (nombre, info) => {
  localStorage.setItem(nombre, JSON.stringify(info));
};

export const read_object_LS = (nombre) => {
  const value = localStorage.getItem(nombre);
  return value ? JSON.parse(value) : null;
};
