import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

export const StoreConfigTab = () => {
  const [storeConfig, setStoreConfig] = useState({
    name: 'Mi Tienda de Café',
    description: 'Los mejores granos de café de la región, tostados a la perfección.',
    logo: '',
    phone: '300 123 4567',
    address: 'Calle Falsa 123, Rionegro'
  });

  useEffect(() => {
    const savedConfig = localStorage.getItem('storeConfig');
    if (savedConfig) {
      setStoreConfig(JSON.parse(savedConfig));
    }
  }, []);

  const handleConfigChange = (e) => {
    setStoreConfig({ ...storeConfig, [e.target.name]: e.target.value });
  };

  const handleSaveConfig = () => {
    localStorage.setItem('storeConfig', JSON.stringify(storeConfig));
    toast({
      title: "Configuración guardada",
      description: "Los cambios se han guardado exitosamente"
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configuración de la tienda</CardTitle>
        <p className="text-sm text-gray-600">Actualiza los detalles públicos de tu tienda.</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nombre de la tienda</label>
            <Input type="text" name="name" value={storeConfig.name} onChange={handleConfigChange} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Descripción de la tienda</label>
            <Textarea name="description" value={storeConfig.description} onChange={handleConfigChange} rows={3} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">URL del logotipo</label>
              <Input type="url" name="logo" value={storeConfig.logo} onChange={handleConfigChange} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono de contacto</label>
              <Input type="tel" name="phone" value={storeConfig.phone} onChange={handleConfigChange} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Dirección</label>
            <Input type="text" name="address" value={storeConfig.address} onChange={handleConfigChange} />
          </div>
          <Button onClick={handleSaveConfig} className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Settings className="mr-2 h-4 w-4" />
            Guardar Cambios
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};