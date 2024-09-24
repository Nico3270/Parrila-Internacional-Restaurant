import Link from 'next/link';
import { FaEye, FaClock, FaCheckCircle, FaUtensils, FaTimesCircle } from 'react-icons/fa';

interface Order {
  id: string;
  clientName: string;
  status: 'Creada' | 'Recibida' | 'En preparación' | 'No pagada' | 'Pagada';
  createdAt: string;
}

// Array de órdenes de ejemplo
const orders: Order[] = [
  { id: '001', clientName: 'Juan Pérez', status: 'Creada', createdAt: '2024-09-01' },
  { id: '002', clientName: 'Maria García', status: 'Recibida', createdAt: '2024-09-02' },
  { id: '003', clientName: 'Luis Gómez', status: 'En preparación', createdAt: '2024-09-03' },
  { id: '004', clientName: 'Ana Mendoza', status: 'No pagada', createdAt: '2024-09-04' },
  { id: '005', clientName: 'Carlos Ruiz', status: 'Pagada', createdAt: '2024-09-05' },
];

// Función para mostrar el ícono y color basado en el estado
const getStatusIconAndColor = (status: Order['status']) => {
  switch (status) {
    case 'Creada':
      return { icon: <FaClock className="text-blue-500" />, color: 'bg-blue-100 text-blue-600' };
    case 'Recibida':
      return { icon: <FaCheckCircle className="text-green-500" />, color: 'bg-green-100 text-green-600' };
    case 'En preparación':
      return { icon: <FaUtensils className="text-yellow-500" />, color: 'bg-yellow-100 text-yellow-600' };
    case 'No pagada':
      return { icon: <FaTimesCircle className="text-red-500" />, color: 'bg-red-100 text-red-600' };
    case 'Pagada':
      return { icon: <FaCheckCircle className="text-green-700" />, color: 'bg-green-100 text-green-600' };
    default:
      return { icon: null, color: '' };
  }
};

export default function OrdersPage() {
  return (
    <div className="container mx-auto p-6">
      {/* Título */}
      <h1 className="text-4xl font-bold mb-8 text-center">Órdenes</h1>
      
      {/* Tabla de Órdenes */}
      <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-100 text-gray-600 text-left">
            <th className="py-3 px-4 uppercase font-semibold text-sm">ID</th>
            <th className="py-3 px-4 uppercase font-semibold text-sm">Cliente</th>
            <th className="py-3 px-4 uppercase font-semibold text-sm">Estado</th>
            <th className="py-3 px-4 uppercase font-semibold text-sm">Fecha</th>
            <th className="py-3 px-4 uppercase font-semibold text-sm">Opciones</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            const { icon, color } = getStatusIconAndColor(order.status);
            return (
              <tr key={order.id} className="border-t border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-4">{order.id}</td>
                <td className="py-3 px-4">{order.clientName}</td>
                <td className="py-3 px-4">
                  <span className={`inline-flex items-center gap-2 py-1 px-3 rounded-full text-sm font-medium ${color}`}>
                    {icon} {order.status}
                  </span>
                </td>
                <td className="py-3 px-4">{order.createdAt}</td>
                <td className="py-3 px-4">
                  <Link href={`/order/${order.id}`} className="text-blue-600 hover:underline inline-flex items-center">
                  
                      <FaEye className="mr-1" /> Ver orden
                  
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
