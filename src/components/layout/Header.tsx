
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { label: "Home", path: "/" },
    { label: "Problem", path: "/problem" },
    { label: "Solution", path: "/solution" },
    { label: "Partnership", path: "/partnership" },
    { label: "Vision", path: "/vision" },
    { label: "About", path: "/about" },
    { label: "DApp", path: "/dapp" },
  ];

  const handleMobileNavClick = () => {
    setIsOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <img 
            src="/lovable-uploads/633f9e66-854c-4ba9-a849-fa17dbb293ba.png" 
            alt="ReferPay.org Logo" 
            className="h-8 w-auto"
          />
          <span className="text-xl font-bold text-gradient-primary">ReferPay</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-foreground hover:text-primary transition-colors duration-300 font-medium ${
                location.pathname === item.path ? 'text-primary' : ''
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Link to="/dapp">
            <Button className="btn-glow-primary">
              Connect Wallet
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Trigger */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80">
            <div className="flex flex-col space-y-6 mt-8">
              {/* Mobile Logo */}
              <Link to="/" className="flex items-center space-x-3 mb-8" onClick={handleMobileNavClick}>
                <img 
                  src="/lovable-uploads/633f9e66-854c-4ba9-a849-fa17dbb293ba.png" 
                  alt="ReferPay.org Logo" 
                  className="h-8 w-auto"
                />
                <span className="text-xl font-bold text-gradient-primary">ReferPay</span>
              </Link>

              {/* Mobile Navigation */}
              <nav className="flex flex-col space-y-4">
                {navigationItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={handleMobileNavClick}
                    className={`text-left text-lg text-foreground hover:text-primary transition-colors duration-300 font-medium py-2 ${
                      location.pathname === item.path ? 'text-primary' : ''
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              {/* Mobile CTA */}
              <div className="pt-6 border-t border-border">
                <Link to="/dapp" onClick={handleMobileNavClick}>
                  <Button 
                    className="btn-glow-primary w-full"
                    size="lg"
                  >
                    Connect Wallet
                  </Button>
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
