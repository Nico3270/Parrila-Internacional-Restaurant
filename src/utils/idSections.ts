// Definir el tipo para los objetos en el array secciones
type Seccion = { [clave: string]: string };

const secciones: Seccion[] = [
    { "Platos fuertes": "platos_fuertes" },
    { "Entradas": "entradas" },
    { "Hamburguesas": "hamburguesas" },
    { "Perros calientes": "perros_calientes" },
    { "Cervezas": "cervezas" },
    { "Bebidas calientes": "bebidas_calientes" },
    { "Cocteles": "cocteles" },
    {"Pizza" : "pizza"}
];

export const idSecciones = (id: string): string | null => {
    for (const obj of secciones) {
        for (const clave in obj) {
            if (obj[clave] === id) {
                return clave;
            }
        }
    }
    return "Not found";
};
