import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ 
    email: '', 
    password: '', 
    confirmPassword: '',
    phone: '' 
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('isAuthenticated', 'true');
    navigate('/dashboard');
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (registerData.password === registerData.confirmPassword) {
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/dashboard');
    }
  };

  const closeModals = () => {
    setShowLogin(false);
    setShowRegister(false);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://cdn.poehali.dev/projects/edbf00c8-6f92-47fd-b5df-04b4df5e9682/files/351f3af3-337e-48a0-8537-d7701c8bb297.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37] to-[#F4D03F] rounded-2xl flex items-center justify-center shadow-2xl">
              <Icon name="Zap" className="text-[#1A1F2C]" size={32} />
            </div>
            <h1 className="text-6xl font-bold text-white drop-shadow-2xl" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              BetMax
            </h1>
          </div>
          <p className="text-xl text-white/90 drop-shadow-lg" style={{ fontFamily: 'Roboto, sans-serif' }}>
            Премиум казино и спортивные ставки
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 animate-scale-in">
          <Button
            onClick={() => setShowLogin(true)}
            className="px-12 py-8 text-xl font-semibold bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#1A1F2C] hover:from-[#F4D03F] hover:to-[#D4AF37] transform hover:scale-105 transition-all duration-300 shadow-2xl rounded-2xl"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            <Icon name="LogIn" size={24} className="mr-3" />
            Войти
          </Button>
          
          <Button
            onClick={() => setShowRegister(true)}
            className="px-12 py-8 text-xl font-semibold bg-white/10 backdrop-blur-md text-white border-2 border-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#1A1F2C] transform hover:scale-105 transition-all duration-300 shadow-2xl rounded-2xl"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            <Icon name="UserPlus" size={24} className="mr-3" />
            Зарегистрироваться
          </Button>
        </div>
      </div>

      {(showLogin || showRegister) && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-20 flex items-center justify-center p-4 animate-fade-in"
          onClick={closeModals}
        >
          <Card 
            className="w-full max-w-md bg-[#1A1F2C]/95 backdrop-blur-xl border-[#D4AF37]/30 shadow-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {showLogin ? 'Вход в аккаунт' : 'Регистрация'}
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={closeModals}
                  className="text-white hover:text-[#D4AF37] hover:bg-white/10"
                >
                  <Icon name="X" size={24} />
                </Button>
              </div>

              {showLogin && (
                <form onSubmit={handleLogin} className="space-y-5">
                  <div>
                    <label className="text-sm font-medium text-white/90 mb-2 block" style={{ fontFamily: 'Roboto, sans-serif' }}>
                      Email или телефон
                    </label>
                    <Input
                      type="text"
                      placeholder="Введите email или телефон"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-[#D4AF37] h-12"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-white/90 mb-2 block" style={{ fontFamily: 'Roboto, sans-serif' }}>
                      Пароль
                    </label>
                    <Input
                      type="password"
                      placeholder="Введите пароль"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-[#D4AF37] h-12"
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#1A1F2C] hover:from-[#F4D03F] hover:to-[#D4AF37] font-semibold text-lg"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    Войти
                  </Button>

                  <div className="text-center">
                    <button 
                      type="button"
                      className="text-sm text-[#D4AF37] hover:text-[#F4D03F] transition-colors"
                      style={{ fontFamily: 'Roboto, sans-serif' }}
                    >
                      Забыли пароль?
                    </button>
                  </div>
                </form>
              )}

              {showRegister && (
                <form onSubmit={handleRegister} className="space-y-5">
                  <div>
                    <label className="text-sm font-medium text-white/90 mb-2 block" style={{ fontFamily: 'Roboto, sans-serif' }}>
                      Email
                    </label>
                    <Input
                      type="email"
                      placeholder="Введите email"
                      value={registerData.email}
                      onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-[#D4AF37] h-12"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-white/90 mb-2 block" style={{ fontFamily: 'Roboto, sans-serif' }}>
                      Телефон
                    </label>
                    <Input
                      type="tel"
                      placeholder="+7 (___) ___-__-__"
                      value={registerData.phone}
                      onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-[#D4AF37] h-12"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-white/90 mb-2 block" style={{ fontFamily: 'Roboto, sans-serif' }}>
                      Пароль
                    </label>
                    <Input
                      type="password"
                      placeholder="Минимум 6 символов"
                      value={registerData.password}
                      onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-[#D4AF37] h-12"
                      required
                      minLength={6}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-white/90 mb-2 block" style={{ fontFamily: 'Roboto, sans-serif' }}>
                      Подтвердите пароль
                    </label>
                    <Input
                      type="password"
                      placeholder="Повторите пароль"
                      value={registerData.confirmPassword}
                      onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-[#D4AF37] h-12"
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#1A1F2C] hover:from-[#F4D03F] hover:to-[#D4AF37] font-semibold text-lg"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    Зарегистрироваться
                  </Button>

                  <p className="text-xs text-white/70 text-center" style={{ fontFamily: 'Roboto, sans-serif' }}>
                    Регистрируясь, вы соглашаетесь с условиями использования
                  </p>
                </form>
              )}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Login;
