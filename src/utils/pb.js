// Conexión a PocketBase
import PocketBase from 'pocketbase';

// URL de PocketBase - cambiar según configuración
const PB_URL = import.meta.env.VITE_PB_URL || 'http://127.0.0.1:8090';

let pb;

try {
  pb = new PocketBase(PB_URL);
} catch (e) {
  console.warn('PocketBase no disponible, usando modo offline');
  pb = null;
}

export default pb;

// Helper para verificar conexión
export async function verificarConexion() {
  if (!pb) return false;
  try {
    await pb.health.check();
    return true;
  } catch {
    return false;
  }
}

// Helper para obtener items con fallback
export async function obtenerItems(coleccion, filtro = '') {
  if (!pb) return [];
  try {
    const result = await pb.collection(coleccion).getList(1, 100, { filter });
    return result.items;
  } catch {
    return [];
  }
}

// Helper para crear item
export async function crearItem(coleccion, data) {
  if (!pb) return null;
  try {
    return await pb.collection(coleccion).create(data);
  } catch (e) {
    console.error(`Error creando en ${coleccion}:`, e);
    return null;
  }
}

// Helper para actualizar item
export async function actualizarItem(coleccion, id, data) {
  if (!pb) return null;
  try {
    return await pb.collection(coleccion).update(id, data);
  } catch (e) {
    console.error(`Error actualizando en ${coleccion}:`, e);
    return null;
  }
}

// Helper para eliminar item
export async function eliminarItem(coleccion, id) {
  if (!pb) return false;
  try {
    await pb.collection(coleccion).delete(id);
    return true;
  } catch (e) {
    console.error(`Error eliminando de ${coleccion}:`, e);
    return false;
  }
}
