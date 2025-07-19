import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Truck, ArrowLeft, User, Mail, Phone, MapPin, CreditCard, Lock } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const DeliveryRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    vehicleType: '',
    licenseNumber: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (value) => {
    setFormData({
      ...formData,
      vehicleType: value
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    
    const requiredFields = ['name', 'email', 'phone', 'address', 'vehicleType', 'licenseNumber', 'password'];
    if (requiredFields.some(field => !formData[field])) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos",
        variant: "destructive"
      });
      return;
    }
    
    const deliveries = JSON.parse(localStorage.getItem('deliveries') || '[]');
    deliveries.push({ id: Date.now(), ...formData });
    localStorage.setItem('deliveries', JSON.stringify(deliveries));
    
    toast({
      title: "¡Registro exitoso!",
      description: "Tu cuenta de domiciliario ha sido creada. Ahora puedes iniciar sesión."
    });
    
    navigate('/domiciliario/login');
  };

  return (
    <div className="min-h-screen purple-gradient flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Link to="/" className="inline-flex items-center text-white hover:text-purple-200 mb-8 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver al inicio
        </Link>

        <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
          <CardHeader className="text-center pb-6">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="h-8 w-8 text-purple-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-slate-800">Portal de Domiciliarios</CardTitle>
            <p className="text-slate-600">Únete y genera ingresos extra entregando productos</p>
          </CardHeader>

          <CardContent>
            <div className="flex mb-6">
              <Link to="/domiciliario/login" className="flex-1">
                <Button variant="outline" className="w-full">
                  Iniciar sesión
                </Button>
              </Link>
              <Button 
                className="flex-1 ml-2 bg-purple-600 hover:bg-purple-700 text-white"
                disabled
              >
                Registrarse
              </Button>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Nombre Completo
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    type="text"
                    name="name"
                    placeholder="Carlos Rodríguez"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Correo Electrónico
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    type="email"
                    name="email"
                    placeholder="domiciliario@ejemplo.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Teléfono
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    type="tel"
                    name="phone"
                    placeholder="+57 300 123 4567"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Dirección
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    type="text"
                    name="address"
                    placeholder="Calle 123 #45-67, Bogotá"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Tipo de vehículo
                </label>
                <Select onValueChange={handleSelectChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="moto">Motocicleta</SelectItem>
                    <SelectItem value="bicicleta">Bicicleta</SelectItem>
                    <SelectItem value="carro">Automóvil</SelectItem>
                    <SelectItem value="pie">A pie</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Número de Cédula
                </label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    type="text"
                    name="licenseNumber"
                    placeholder="1234567890"
                    value={formData.licenseNumber}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="bg-orange-50 p-3 rounded-lg text-sm border border-orange-200">
                <p className="text-orange-800">
                  <strong>Requisitos:</strong> Debes ser mayor de 18 años, tener documento de identidad válido y medio de transporte propio.
                </p>
              </div>

              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3">
                Registrarse como domiciliario
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default DeliveryRegister;