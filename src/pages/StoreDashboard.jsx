import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Store, ArrowLeft, Settings, LogOut, DollarSign, Package, ShoppingCart, TrendingUp, Plus, Upload, BarChart3, User } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const StoreDashboard = () => {
  const [activeTab, setActiveTab] = useState('productos');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    price: '',
    discount: '',
    stock: '',
    description: ''
  });
  const [storeConfig, setStoreConfig] = useState({
    name: 'Mi Tienda de Café',
    description: 'Los mejores granos de café de la región, tostados a la perfección.',
    logo: 'https://ejemplo.com/logo.png',
    phone: '300 123 4567',
    address: 'Calle Falsa 123, Rionegro'
  });

  useEffect(() => {
    // Load mock data
    const mockProducts = JSON.parse(localStorage.getItem('storeProducts') || '[]');
    const mockOrders = [
      {
        id: 'T001',
        customer: 'Juan Pérez',
        date: '18/7/2025, 21:25:52',
        amount: 25000,
        products: 1,
        status: 'Nuevo'
      },
      {
        id: 'T002',
        customer: 'Ana Gómez',
        date: '17/7/2025, 21:25:52',
        amount: 12000,
        products: 2,
        status: 'Cancelado'
      },
      {
        id: 'T003',
        customer: 'Luis Rojas',
        date: '16/7/2025, 21:25:52',
        amount: 8000,
        products: 1,
        status: 'Cancelado'
      }
    ];
    
    setProducts(mockProducts);
    setOrders(mockOrders);
  }, []);

  const handleProductInputChange = (e) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value
    });
  };

  const handleProductSelectChange = (value) => {
    setNewProduct({
      ...newProduct,
      category: value
    });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    
    const requiredFields = ['name', 'category', 'price', 'stock', 'description'];
    const missingFields = requiredFields.filter(field => !newProduct[field]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos obligatorios",
        variant: "destructive"
      });
      return;
    }
    
    const product = {
      id: Date.now(),
      ...newProduct,
      createdAt: new Date().toISOString()
    };
    
    const updatedProducts = [...products, product];
    setProducts(updatedProducts);
    localStorage.setItem('storeProducts', JSON.stringify(updatedProducts));
    
    setNewProduct({
      name: '',
      category: '',
      price: '',
      discount: '',
      stock: '',
      description: ''
    });
    
    toast({
      title: "¡Producto agregado!",
      description: "El producto se ha agregado exitosamente"
    });
  };

  const handleBulkUpload = () => {
    toast({
      title: "🚧 Esta funcionalidad aún no está implementada",
      description: "¡No te preocupes! Puedes solicitarla en tu próximo prompt! 🚀",
    });
  };

  const handleOrderAction = (orderId, action) => {
    toast({
      title: `Pedido ${action}`,
      description: `El pedido ${orderId} ha sido ${action.toLowerCase()}`
    });
  };

  const handleConfigChange = (e) => {
    setStoreConfig({
      ...storeConfig,
      [e.target.name]: e.target.value
    });
  };

  const handleSaveConfig = () => {
    localStorage.setItem('storeConfig', JSON.stringify(storeConfig));
    toast({
      title: "Configuración guardada",
      description: "Los cambios se han guardado exitosamente"
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('storeAuth');
    window.location.href = '/';
  };

  const handleFeatureClick = () => {
    toast({
      title: "🚧 Esta funcionalidad aún no está implementada",
      description: "¡No te preocupes! Puedes solicitarla en tu próximo prompt! 🚀",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
            </Link>
            <div className="flex items-center space-x-2">
              <Store className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold text-gray-800">Mi tienda</span>
            </div>
            <span className="text-sm text-gray-500">Panel de control</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
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

      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Ventas Totales</p>
                  <p className="text-2xl font-bold text-gray-900">$125.300</p>
                  <p className="text-xs text-green-600">+20.1% desde el mes pasado</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Productos</p>
                  <p className="text-2xl font-bold text-gray-900">{products.length}</p>
                  <p className="text-xs text-blue-600">+2 nuevos esta semana</p>
                </div>
                <Package className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pedidos</p>
                  <p className="text-2xl font-bold text-gray-900">15</p>
                  <p className="text-xs text-purple-600">+12% desde ayer</p>
                </div>
                <ShoppingCart className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Comisión Plataforma</p>
                  <p className="text-2xl font-bold text-red-600">-$6265</p>
                  <p className="text-xs text-gray-500">5% de las ventas</p>
                </div>
                <TrendingUp className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="productos">Productos</TabsTrigger>
            <TabsTrigger value="agregar">Agregar/Editar</TabsTrigger>
            <TabsTrigger value="carga">Carga Masiva</TabsTrigger>
            <TabsTrigger value="pedidos">Pedidos</TabsTrigger>
            <TabsTrigger value="analisis">Análisis</TabsTrigger>
            <TabsTrigger value="tienda">Tienda</TabsTrigger>
            <TabsTrigger value="perfil">Perfil</TabsTrigger>
          </TabsList>

          <TabsContent value="productos" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Mis productos</CardTitle>
                <p className="text-sm text-gray-600">Gestiona tu inventario y productos.</p>
              </CardHeader>
              <CardContent>
                {products.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Cargando productos...</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {products.map((product) => (
                      <div key={product.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">{product.name}</h3>
                            <p className="text-sm text-gray-600">{product.category}</p>
                            <p className="text-lg font-bold text-green-600">${product.price}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-600">Stock: {product.stock}</p>
                            {product.discount && (
                              <p className="text-sm text-orange-600">Descuento: {product.discount}%</p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="agregar" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Agregar Nuevo Producto</CardTitle>
                <p className="text-sm text-gray-600">Completa la información de tu producto.</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddProduct} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre del producto
                      </label>
                      <Input
                        type="text"
                        name="name"
                        value={newProduct.name}
                        onChange={handleProductInputChange}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Categoría
                      </label>
                      <Select onValueChange={handleProductSelectChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cafe">Café</SelectItem>
                          <SelectItem value="artesanias">Artesanías</SelectItem>
                          <SelectItem value="alimentos">Alimentos</SelectItem>
                          <SelectItem value="bebidas">Bebidas</SelectItem>
                          <SelectItem value="dulces">Dulces</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Precio (COP)
                      </label>
                      <Input
                        type="number"
                        name="price"
                        value={newProduct.price}
                        onChange={handleProductInputChange}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Descuento (%)
                      </label>
                      <Input
                        type="number"
                        name="discount"
                        value={newProduct.discount}
                        onChange={handleProductInputChange}
                        min="0"
                        max="100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Existencias
                      </label>
                      <Input
                        type="number"
                        name="stock"
                        value={newProduct.stock}
                        onChange={handleProductInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Descripción
                    </label>
                    <Textarea
                      name="description"
                      value={newProduct.description}
                      onChange={handleProductInputChange}
                      rows={4}
                      required
                    />
                  </div>

                  <Button type="submit" className="orange-gradient text-white">
                    <Plus className="mr-2 h-4 w-4" />
                    Agregar producto
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="carga" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Carga Masiva de Productos</CardTitle>
                <p className="text-sm text-gray-600">Ahorra tiempo agregando múltiples productos desde un archivo Excel (.xlsx).</p>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <Button onClick={handleBulkUpload} className="mb-4">
                    Seleccionar archivo
                  </Button>
                  <p className="text-sm text-gray-500">O arrastra y suelta el archivo aquí</p>
                </div>
                <p className="text-xs text-gray-500 mt-4">
                  El archivo debe tener las columnas en este orden: nombre, descripción, precio, categoría, stock, descuento (opcional). La primera fila debe ser el encabezado.
                </p>
                <Button onClick={handleBulkUpload} className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white">
                  Cargar productos
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pedidos" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Pedidos Recientes</CardTitle>
                <p className="text-sm text-gray-600">Gestiona los pedidos de tus clientes.</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold">Pedido # {order.id}</h3>
                          <p className="text-sm text-gray-600">Cliente: {order.customer}</p>
                          <p className="text-sm text-gray-600">{order.date}</p>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          order.status === 'Nuevo' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-lg font-bold text-green-600">${order.amount.toLocaleString()} ({order.products} prod.)</p>
                        </div>
                        <div className="space-x-2">
                          {order.status === 'Nuevo' && (
                            <>
                              <Button 
                                size="sm" 
                                className="bg-yellow-500 hover:bg-yellow-600"
                                onClick={() => handleOrderAction(order.id, 'Aceptar')}
                              >
                                Aceptar
                              </Button>
                              <Button 
                                size="sm" 
                                variant="destructive"
                                onClick={() => handleOrderAction(order.id, 'Cancelar')}
                              >
                                Cancelar
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analisis" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Análisis de ventas</CardTitle>
                <p className="text-sm text-gray-600">Visualiza el rendimiento de tu tienda</p>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Análisis Avanzadas</h3>
                  <p className="text-gray-600 mb-4">Gráficos e informes detallados próximamente.</p>
                  <Button onClick={handleFeatureClick} className="bg-yellow-500 hover:bg-yellow-600 text-white">
                    Ver informes detallados
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tienda" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Configuración de la tienda</CardTitle>
                <p className="text-sm text-gray-600">Actualiza los detalles públicos de tu tienda.</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre de la tienda
                    </label>
                    <Input
                      type="text"
                      name="name"
                      value={storeConfig.name}
                      onChange={handleConfigChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Descripción de la tienda
                    </label>
                    <Textarea
                      name="description"
                      value={storeConfig.description}
                      onChange={handleConfigChange}
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        URL del logotipo
                      </label>
                      <Input
                        type="url"
                        name="logo"
                        value={storeConfig.logo}
                        onChange={handleConfigChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Teléfono de contacto
                      </label>
                      <Input
                        type="tel"
                        name="phone"
                        value={storeConfig.phone}
                        onChange={handleConfigChange}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dirección
                    </label>
                    <Input
                      type="text"
                      name="address"
                      value={storeConfig.address}
                      onChange={handleConfigChange}
                    />
                  </div>
                  <Button onClick={handleSaveConfig} className="orange-gradient text-white">
                    <Settings className="mr-2 h-4 w-4" />
                    Guardar Cambios
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="perfil" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Mi perfil</CardTitle>
                <p className="text-sm text-gray-600">Gestiona tu información personal y de cuenta.</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre Completo
                      </label>
                      <Input
                        type="text"
                        defaultValue="Janier Mosquera"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Correo Electrónico
                      </label>
                      <Input
                        type="email"
                        defaultValue="jamosquera051@gmail.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nueva Contraseña
                    </label>
                    <Input
                      type="password"
                      placeholder="Dejar en blanco para no cambiar"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirmar nueva contraseña
                    </label>
                    <Input
                      type="password"
                      placeholder="Dejar en blanco para no cambiar"
                    />
                  </div>
                  <Button onClick={handleFeatureClick} className="orange-gradient text-white">
                    <User className="mr-2 h-4 w-4" />
                    Guardar perfil
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default StoreDashboard;