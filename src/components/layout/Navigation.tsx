
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  NavigationMenu, 
  NavigationMenuItem, 
  NavigationMenuLink, 
  NavigationMenuList,
  navigationMenuTriggerStyle 
} from '@/components/ui/navigation-menu';
import { Menu, X, Wallet } from 'lucide-react';
import { useEnhancedBlockchainData } from '@/hooks/useEnhancedBlockchainData';
import { usePolygonNetwork } from '@/hooks/usePolygonNetwork';
import OnboardingModal from '@/components/onboarding/OnboardingModal';

const Navigation = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  
  const { connectedWallet, actions } = useEnhancedBlockchainData();
  const { ensurePolygonNetwork } = usePolygonNetwork();

  const navigationItems = [
    { label: 'Home', path: '/' },
    { label: 'Features', path: '/features' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' }
  ];

  const handleConnectWallet = async () => {
    const networkOk = await ensurePolygonNetwork();
    if (networkOk) {
      await actions.connectWallet();
    }
  };

  const handleGetStarted = () => {
    setShowOnboarding(true);
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    handleConnectWallet();
  };

  // Don't show navigation on DApp page
  if (location.pathname === '/dapp') {
    return null;
  }

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-gradient-primary">
            ReferPay
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList>
                {navigationItems.map((item) => (
                  <NavigationMenuItem key={item.path}>
                    <Link to={item.path}>
                      <NavigationMenuLink 
                        className={navigationMenuTriggerStyle()}
                        active={location.pathname === item.path}
                      >
                        {item.label}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Connect Wallet Button */}
          <div className="flex items-center gap-4">
            {!connectedWallet ? (
              <Button 
                onClick={handleGetStarted}
                className="btn-glow-primary"
              >
                <Wallet className="h-4 w-4 mr-2" />
                Connect Wallet
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <div className="text-sm font-mono bg-muted px-3 py-1 rounded">
                  {connectedWallet.slice(0, 6)}...{connectedWallet.slice(-4)}
                </div>
                <Link to="/dapp">
                  <Button variant="outline" size="sm">
                    Dashboard
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-background border-t">
            <div className="container mx-auto px-4 py-4 space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-3 py-2 rounded-md text-sm hover:bg-muted transition-colors ${
                    location.pathname === item.path ? 'bg-muted' : ''
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Onboarding Modal */}
      <OnboardingModal
        open={showOnboarding}
        onClose={() => setShowOnboarding(false)}
        onComplete={handleOnboardingComplete}
      />
    </>
  );
};

export default Navigation;
