import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Store, Settings, LogOut } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { StatsCards } from './StatsCards';
import { ProductsTab } from './ProductsTab';
import { AddProductTab } from './AddProductTab';
import { BulkUploadTab } from './BulkUploadTab';
import { OrdersTab } from './OrdersTab';
import { AnalyticsTab } from './AnalyticsTab';
import { StoreConfigTab } from './StoreConfigTab';
import { ProfileTab } from './ProfileTab';

const StoreDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('productos');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const auth = localStorage.getItem('storeAuth');
    if (!auth) {
      navigate('/tienda/login');
    }

    const mockProducts = JSON.parse(localStorage.getItem('storeProducts') || '[]');
    const mockOrders = [
      { id: 'T001', customer: 'Juan Pérez', date: '18/7/2025, 21:25:52', amount: 25000, products: 1, status: 'Nuevo' },
      { id: 'T002', customer: 'Ana Gómez', date: '17/7/2025, 21:25:52', amount: 12000, products: 2, status: 'Cancelado' },
      { id: 'T003', customer: 'Luis Rojas', date: '16/7/2025, 21:25:52', amount: 8000, products: 1, status: 'Cancelado' },
    ];
    
    setProducts(mockProducts);
    setOrders(mockOrders);
  }, [navigate]);

  const addProduct = (product) => {
    const updatedProducts = [...products, product];
    setProducts(updatedProducts);
    localStorage.setItem('storeProducts', JSON.stringify(updatedProducts));
    toast({
      title: "¡Producto agregado!",
      description: "El producto se ha agregado exitosamente"
    });
    setActiveTab('productos');
  };

  const handleLogout = () => {
    localStorage.removeItem('storeAuth');
    toast({ title: "Sesión cerrada", description: "Has cerrado sesión exitosamente." });
    navigate('/');
  };
  
  const handleFeatureClick = () => {
    toast({
      title: "🚧 Esta funcionalidad aún no está implementada",
      description: "¡No te preocupes! Puedes solicitarla en tu próximo prompt! 🚀",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Store className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-gray-800">Mi Tienda</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" onClick={() => setActiveTab('tienda')}>
              <Settings className="mr-2 h-4 w-4" />
              Configuración
            </Button>
            <Button variant="destructive" size="sm" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Salir
            </Button>
          </div>
        </div>
      </header>

      <main className="p-6 max-w-7xl mx-auto">
        <StatsCards productsCount={products.length} />

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 sm:grid-cols-4 md:grid-cols-7">
            <TabsTrigger value="productos">Productos</TabsTrigger>
            <TabsTrigger value="agregar">Agregar</TabsTrigger>
            <TabsTrigger value="carga">Carga</TabsTrigger>
            <TabsTrigger value="pedidos">Pedidos</TabsTrigger>
            <TabsTrigger value="analisis">Análisis</TabsTrigger>
            <TabsTrigger value="tienda">Tienda</TabsTrigger>
            <TabsTrigger value="perfil">Perfil</TabsTrigger>
          </TabsList>

          <TabsContent value="productos" className="mt-6">
            <ProductsTab products={products} />
          </TabsContent>
          <TabsContent value="agregar" className="mt-6">
            <AddProductTab onAddProduct={addProduct} />
          </TabsContent>
          <TabsContent value="carga" className="mt-6">
            <BulkUploadTab />
          </TabsContent>
          <TabsContent value="pedidos" className="mt-6">
            <OrdersTab orders={orders} />
          </TabsContent>
          <TabsContent value="analisis" className="mt-6">
            <AnalyticsTab />
          </TabsContent>
          <TabsContent value="tienda" className="mt-6">
            <StoreConfigTab />
          </TabsContent>
          <TabsContent value="perfil" className="mt-6">
            <ProfileTab onFeatureClick={handleFeatureClick}/>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default StoreDashboard;