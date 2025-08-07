
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Bell, Check, DollarSign, Users, Gift } from "lucide-react";

interface Notification {
  id: string;
  type: "referral" | "earning" | "milestone";
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  amount?: number;
}

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Mock notifications - replace with actual API calls
    const mockNotifications: Notification[] = [
      {
        id: "1",
        type: "referral",
        title: "New Referral!",
        message: "Someone just joined using your referral link",
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        read: false,
        amount: 1.00
      },
      {
        id: "2", 
        type: "earning",
        title: "Payment Received",
        message: "Your referral rewards have been distributed",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        read: false,
        amount: 3.00
      },
      {
        id: "3",
        type: "milestone",
        title: "Achievement Unlocked!",
        message: "You've reached Bronze Partner status",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        read: true
      }
    ];
    
    setNotifications(mockNotifications);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case "referral":
        return <Users className="h-4 w-4 text-blue-500" />;
      case "earning":
        return <DollarSign className="h-4 w-4 text-green-500" />;
      case "milestone":
        return <Gift className="h-4 w-4 text-purple-500" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <Card className="border-0 shadow-none">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Notifications</CardTitle>
              {unreadCount > 0 && (
                <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                  <Check className="h-4 w-4 mr-1" />
                  Mark all read
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-3 max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                <Bell className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No notifications yet</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    notification.read 
                      ? "bg-card/50 hover:bg-card/70" 
                      : "bg-primary/10 hover:bg-primary/20 border border-primary/20"
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-sm truncate">
                          {notification.title}
                        </h4>
                        {notification.amount && (
                          <Badge variant="secondary" className="text-xs">
                            +${notification.amount.toFixed(2)}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatTimestamp(notification.timestamp)}
                      </p>
                    </div>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    )}
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationCenter;
