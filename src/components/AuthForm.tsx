import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardHeader, CardContent, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { LogIn, UserPlus, Loader2, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface AuthFormProps {
  onSuccess: () => void;
}

export function AuthForm({ onSuccess }: AuthFormProps) {
  const { login, register, isLoading } = useAuth();
  const [error, setError] = useState('');
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Register form state
  const [registerName, setRegisterName] = useState('');
  const [registerLastName, setRegisterLastName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPhone, setRegisterPhone] = useState('');
  const [registerDateOfBirth, setRegisterDateOfBirth] = useState('');
  const [registerGender, setRegisterGender] = useState('');
  const [registerCountry, setRegisterCountry] = useState('');
  const [registerCity, setRegisterCity] = useState('');
  const [registerAddress, setRegisterAddress] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptMarketing, setAcceptMarketing] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!loginEmail || !loginPassword) {
      setError('Por favor completa todos los campos');
      return;
    }

    const success = await login(loginEmail, loginPassword);
    if (success) {
      toast.success('¡Bienvenido de nuevo! Sesión iniciada exitosamente');
      onSuccess();
    } else {
      setError('Credenciales inválidas. Verifica tu email y contraseña.');
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[+]?[\d\s\-\(\)]{8,15}$/;
    return phoneRegex.test(phone);
  };

  const validatePassword = (password: string) => {
    const hasMinLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return {
      isValid: hasMinLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar,
      errors: {
        minLength: !hasMinLength,
        upperCase: !hasUpperCase,
        lowerCase: !hasLowerCase,
        numbers: !hasNumbers,
        specialChar: !hasSpecialChar
      }
    };
  };

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validaciones obligatorias
    if (!registerName || !registerLastName || !registerEmail || !registerPhone || 
        !registerDateOfBirth || !registerPassword || !registerConfirmPassword) {
      setError('Por favor completa todos los campos obligatorios');
      return;
    }

    // Validación de email
    if (!validateEmail(registerEmail)) {
      setError('Por favor ingresa un email válido');
      return;
    }

    // Validación de teléfono
    if (!validatePhone(registerPhone)) {
      setError('Por favor ingresa un número de teléfono válido');
      return;
    }

    // Validación de edad
    if (calculateAge(registerDateOfBirth) < 18) {
      setError('Debes ser mayor de 18 años para registrarte');
      return;
    }

    // Validación de contraseña
    const passwordValidation = validatePassword(registerPassword);
    if (!passwordValidation.isValid) {
      setError('La contraseña debe tener al menos 8 caracteres, incluir mayúsculas, minúsculas, números y caracteres especiales');
      return;
    }

    // Validación de confirmación de contraseña
    if (registerPassword !== registerConfirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    // Validación de términos y condiciones
    if (!acceptTerms) {
      setError('Debes aceptar los términos y condiciones');
      return;
    }

    // Preparar datos completos del usuario
    const userData = {
      name: registerName,
      lastName: registerLastName,
      email: registerEmail,
      password: registerPassword,
      phone: registerPhone,
      dateOfBirth: registerDateOfBirth,
      gender: registerGender,
      country: registerCountry,
      city: registerCity,
      address: registerAddress,
      acceptMarketing
    };

    const success = await register(userData);
    if (success) {
      toast.success('¡Cuenta creada exitosamente! Tus datos han sido guardados en Supabase');
      onSuccess();
    } else {
      setError('Error al crear la cuenta. Por favor intenta nuevamente.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <CardTitle className="text-center text-2xl">AlquiGo</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login" className="flex items-center space-x-2">
                <LogIn className="w-4 h-4" />
                <span>Iniciar Sesión</span>
              </TabsTrigger>
              <TabsTrigger value="register" className="flex items-center space-x-2">
                <UserPlus className="w-4 h-4" />
                <span>Registrarse</span>
              </TabsTrigger>
            </TabsList>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="tu@email.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Contraseña</Label>
                  <Input
                    id="login-password"
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••"
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground border-0" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Iniciando sesión...
                    </>
                  ) : (
                    'Iniciar Sesión'
                  )}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4">
                {/* Información Personal */}
                <div className="space-y-4">
                  <h3 className="font-medium text-sm text-muted-foreground">Información Personal</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="register-name">Nombre *</Label>
                      <Input
                        id="register-name"
                        type="text"
                        value={registerName}
                        onChange={(e) => setRegisterName(e.target.value)}
                        placeholder="Tu nombre"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-lastname">Apellido *</Label>
                      <Input
                        id="register-lastname"
                        type="text"
                        value={registerLastName}
                        onChange={(e) => setRegisterLastName(e.target.value)}
                        placeholder="Tu apellido"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-email">Correo Electrónico *</Label>
                    <Input
                      id="register-email"
                      type="email"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      placeholder="tu@email.com"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="register-phone">Teléfono *</Label>
                      <Input
                        id="register-phone"
                        type="tel"
                        value={registerPhone}
                        onChange={(e) => setRegisterPhone(e.target.value)}
                        placeholder="+1 234 567 8900"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-dob">Fecha de Nacimiento *</Label>
                      <Input
                        id="register-dob"
                        type="date"
                        value={registerDateOfBirth}
                        onChange={(e) => setRegisterDateOfBirth(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-gender">Género</Label>
                    <Select value={registerGender} onValueChange={setRegisterGender}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona tu género" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Masculino</SelectItem>
                        <SelectItem value="female">Femenino</SelectItem>
                        <SelectItem value="other">Otro</SelectItem>
                        <SelectItem value="prefer-not-to-say">Prefiero no decir</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Dirección */}
                <div className="space-y-4">
                  <h3 className="font-medium text-sm text-muted-foreground">Dirección</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="register-country">País</Label>
                      <Select value={registerCountry} onValueChange={setRegisterCountry}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona tu país" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mx">México</SelectItem>
                          <SelectItem value="us">Estados Unidos</SelectItem>
                          <SelectItem value="es">España</SelectItem>
                          <SelectItem value="ar">Argentina</SelectItem>
                          <SelectItem value="co">Colombia</SelectItem>
                          <SelectItem value="pe">Perú</SelectItem>
                          <SelectItem value="cl">Chile</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-city">Ciudad</Label>
                      <Input
                        id="register-city"
                        type="text"
                        value={registerCity}
                        onChange={(e) => setRegisterCity(e.target.value)}
                        placeholder="Tu ciudad"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-address">Dirección</Label>
                    <Input
                      id="register-address"
                      type="text"
                      value={registerAddress}
                      onChange={(e) => setRegisterAddress(e.target.value)}
                      placeholder="Calle, número, colonia"
                    />
                  </div>
                </div>

                {/* Contraseñas */}
                <div className="space-y-4">
                  <h3 className="font-medium text-sm text-muted-foreground">Seguridad</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Contraseña *</Label>
                    <div className="relative">
                      <Input
                        id="register-password"
                        type={showPassword ? "text" : "password"}
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Mínimo 8 caracteres, incluye mayúsculas, minúsculas, números y símbolos
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-confirm-password">Confirmar Contraseña *</Label>
                    <div className="relative">
                      <Input
                        id="register-confirm-password"
                        type={showConfirmPassword ? "text" : "password"}
                        value={registerConfirmPassword}
                        onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Términos y Condiciones */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="accept-terms"
                      checked={acceptTerms}
                      onCheckedChange={setAcceptTerms}
                    />
                    <Label 
                      htmlFor="accept-terms" 
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Acepto los{' '}
                      <button 
                        type="button"
                        className="text-primary underline hover:no-underline"
                      >
                        términos y condiciones
                      </button>{' '}
                      y la{' '}
                      <button 
                        type="button"
                        className="text-primary underline hover:no-underline"
                      >
                        política de privacidad
                      </button> *
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="accept-marketing"
                      checked={acceptMarketing}
                      onCheckedChange={setAcceptMarketing}
                    />
                    <Label 
                      htmlFor="accept-marketing" 
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Quiero recibir ofertas especiales y promociones por email
                    </Label>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground border-0" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creando cuenta...
                    </>
                  ) : (
                    'Crear Cuenta'
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}