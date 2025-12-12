import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('sports');
  const [balance] = useState(15000);
  const [bonuses] = useState(500);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  const sportsEvents = [
    {
      id: 1,
      sport: 'Футбол',
      league: 'Премьер-лига',
      home: 'Манчестер Сити',
      away: 'Ливерпуль',
      time: '20:00',
      odds: { home: 2.10, draw: 3.40, away: 3.20 }
    },
    {
      id: 2,
      sport: 'Баскетбол',
      league: 'NBA',
      home: 'Лейкерс',
      away: 'Уорриорз',
      time: '04:30',
      odds: { home: 1.85, draw: null, away: 1.95 }
    },
    {
      id: 3,
      sport: 'Теннис',
      league: 'ATP',
      home: 'Джокович Н.',
      away: 'Алькарас К.',
      time: '16:00',
      odds: { home: 1.70, draw: null, away: 2.15 }
    }
  ];

  const betHistory = [
    { id: 1, event: 'Барселона - Реал Мадрид', bet: 'П1', odds: 2.30, amount: 1000, status: 'won', profit: 1300 },
    { id: 2, event: 'Зенит - Спартак', bet: 'ТБ 2.5', odds: 1.85, amount: 500, status: 'lost', profit: 0 },
    { id: 3, event: 'ЦСКА - Динамо', bet: 'X', odds: 3.10, amount: 750, status: 'pending', profit: 0 }
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Zap" className="text-white" size={20} />
                </div>
                <span className="text-xl font-bold text-foreground">BetMax</span>
              </div>

              <nav className="hidden md:flex items-center gap-4">
                <Button 
                  variant={activeTab === 'sports' ? 'default' : 'ghost'} 
                  size="sm"
                  onClick={() => setActiveTab('sports')}
                >
                  Спорт
                </Button>
                <Button variant="ghost" size="sm">Казино</Button>
                <Button variant="ghost" size="sm">Промо</Button>
                <Button variant="ghost" size="sm">Поддержка</Button>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-3">
                <div className="text-right">
                  <div className="text-xs text-muted-foreground">Баланс</div>
                  <div className="text-sm font-bold text-foreground">{balance.toLocaleString()} ₽</div>
                </div>
                <Badge variant="secondary" className="bg-primary/20 text-primary">
                  +{bonuses} ₽
                </Badge>
              </div>
              
              <Button size="icon" variant="ghost" onClick={handleLogout}>
                <Icon name="LogOut" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="sports">
              <Icon name="Trophy" size={16} className="mr-2" />
              Спортивные ставки
            </TabsTrigger>
            <TabsTrigger value="account">
              <Icon name="User" size={16} className="mr-2" />
              Личный кабинет
            </TabsTrigger>
            <TabsTrigger value="referral">
              <Icon name="Users" size={16} className="mr-2" />
              Реферальная программа
            </TabsTrigger>
          </TabsList>

          <TabsContent value="sports" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                  <Icon name="Flame" size={24} className="text-primary" />
                  Популярные события
                </h2>

                {sportsEvents.map((event) => (
                  <Card key={event.id} className="p-4 bg-card border-border hover:border-primary/50 transition-colors">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{event.sport}</Badge>
                          <span className="text-xs text-muted-foreground">{event.league}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Icon name="Clock" size={14} />
                          {event.time}
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <div className="col-span-3 mb-2">
                          <div className="text-sm font-medium text-foreground">{event.home}</div>
                          <div className="text-sm font-medium text-foreground">{event.away}</div>
                        </div>

                        <Button 
                          className="bg-secondary hover:bg-primary/20 text-foreground h-16 flex flex-col items-center justify-center gap-1"
                          variant="secondary"
                        >
                          <span className="text-xs">П1</span>
                          <span className="text-lg font-bold text-primary">{event.odds.home}</span>
                        </Button>

                        {event.odds.draw && (
                          <Button 
                            className="bg-secondary hover:bg-primary/20 text-foreground h-16 flex flex-col items-center justify-center gap-1"
                            variant="secondary"
                          >
                            <span className="text-xs">X</span>
                            <span className="text-lg font-bold text-primary">{event.odds.draw}</span>
                          </Button>
                        )}

                        <Button 
                          className="bg-secondary hover:bg-primary/20 text-foreground h-16 flex flex-col items-center justify-center gap-1"
                          variant="secondary"
                        >
                          <span className="text-xs">П2</span>
                          <span className="text-lg font-bold text-primary">{event.odds.away}</span>
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="space-y-4">
                <Card className="p-4 bg-card border-border">
                  <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                    <Icon name="Ticket" size={20} />
                    Купон ставок
                  </h3>
                  <div className="text-center text-muted-foreground py-8">
                    <Icon name="ClipboardList" size={48} className="mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Купон пуст</p>
                    <p className="text-xs mt-1">Выберите события</p>
                  </div>
                </Card>

                <Card className="p-4 bg-gradient-to-br from-primary/20 to-primary/5 border-primary/30">
                  <div className="flex items-center gap-3 mb-2">
                    <Icon name="Gift" size={24} className="text-primary" />
                    <h3 className="font-bold text-foreground">Бонус новичкам</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    До 10,000₽ на первый депозит
                  </p>
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Получить бонус
                  </Button>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="account" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-6 bg-gradient-to-br from-primary/20 to-primary/5 border-primary/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Баланс</span>
                  <Icon name="Wallet" size={20} className="text-primary" />
                </div>
                <div className="text-3xl font-bold text-foreground">{balance.toLocaleString()} ₽</div>
                <Button className="w-full mt-4 bg-primary hover:bg-primary/90">
                  Пополнить
                </Button>
              </Card>

              <Card className="p-6 bg-card border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Бонусы</span>
                  <Icon name="Gift" size={20} className="text-primary" />
                </div>
                <div className="text-3xl font-bold text-foreground">{bonuses.toLocaleString()} ₽</div>
                <Button variant="outline" className="w-full mt-4">
                  Использовать
                </Button>
              </Card>

              <Card className="p-6 bg-card border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Активных ставок</span>
                  <Icon name="TrendingUp" size={20} className="text-primary" />
                </div>
                <div className="text-3xl font-bold text-foreground">3</div>
                <Button variant="outline" className="w-full mt-4">
                  Просмотреть
                </Button>
              </Card>
            </div>

            <Card className="p-6 bg-card border-border">
              <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Icon name="History" size={24} />
                История ставок
              </h3>

              <div className="space-y-3">
                {betHistory.map((bet) => (
                  <div 
                    key={bet.id} 
                    className="flex items-center justify-between p-4 bg-secondary rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="font-medium text-foreground">{bet.event}</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {bet.bet} • Коэф. {bet.odds} • Ставка {bet.amount}₽
                      </div>
                    </div>
                    <div className="text-right">
                      {bet.status === 'won' && (
                        <Badge className="bg-green-500/20 text-green-500">
                          +{bet.profit}₽
                        </Badge>
                      )}
                      {bet.status === 'lost' && (
                        <Badge variant="destructive">Проигрыш</Badge>
                      )}
                      {bet.status === 'pending' && (
                        <Badge variant="secondary">В игре</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="referral">
            <Card className="p-6 bg-card border-border">
              <div className="max-w-2xl mx-auto text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Users" size={32} className="text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Реферальная программа
                </h2>
                <p className="text-muted-foreground mb-6">
                  Приглашайте друзей и получайте до 40% от их ставок
                </p>

                <div className="bg-secondary p-4 rounded-lg mb-6">
                  <div className="text-sm text-muted-foreground mb-2">Ваш реферальный код</div>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 bg-background px-4 py-3 rounded font-mono text-foreground">
                      BETMAX2024XYZ
                    </code>
                    <Button size="icon" variant="outline">
                      <Icon name="Copy" size={20} />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-secondary rounded-lg">
                    <div className="text-3xl font-bold text-primary mb-1">0</div>
                    <div className="text-sm text-muted-foreground">Рефералов</div>
                  </div>
                  <div className="p-4 bg-secondary rounded-lg">
                    <div className="text-3xl font-bold text-primary mb-1">0₽</div>
                    <div className="text-sm text-muted-foreground">Заработано</div>
                  </div>
                  <div className="p-4 bg-secondary rounded-lg">
                    <div className="text-3xl font-bold text-primary mb-1">40%</div>
                    <div className="text-sm text-muted-foreground">Процент</div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
