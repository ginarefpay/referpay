import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface HeaderProps {
  onNavigate: (section: string) => void;
}

const Header = ({ onNavigate }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const navigationItems = [
    { label: "Home", section: "hero" },
    { label: "Vision", section: "vision" },
    { label: "About", section: "about" },
    { label: "How It Works", section: "how-it-works" },
    { label: "Value", section: "value" },
    { label: "DApp", section: "dapp" },
  ];

  const handleNavigation = (section: string) => {
    onNavigate(section);
    setIsOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img 
            src="/lovable-uploads/633f9e66-854c-4ba9-a849-fa17dbb293ba.png" 
            alt="ReferPay.org Logo" 
            className="h-8 w-auto"
          />
          <span className="text-xl font-bold text-gradient-primary">ReferPay</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navigationItems.map((item) => (
            <button
              key={item.section}
              onClick={() => handleNavigation(item.section)}
              className="text-foreground hover:text-primary transition-colors duration-300 font-medium"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Button 
            onClick={() => handleNavigation("dapp")}
            className="btn-glow-primary"
          >
            Launch DApp
          </Button>
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
              <div className="flex items-center space-x-3 mb-8">
                <img 
                  src="/lovable-uploads/633f9e66-854c-4ba9-a849-fa17dbb293ba.png" 
                  alt="ReferPay.org Logo" 
                  className="h-8 w-auto"
                />
                <span className="text-xl font-bold text-gradient-primary">ReferPay</span>
              </div>

              {/* Mobile Navigation */}
              <nav className="flex flex-col space-y-4">
                {navigationItems.map((item) => (
                  <button
                    key={item.section}
                    onClick={() => handleNavigation(item.section)}
                    className="text-left text-lg text-foreground hover:text-primary transition-colors duration-300 font-medium py-2"
                  >
                    {item.label}
                  </button>
                ))}
              </nav>

              {/* Mobile CTA */}
              <div className="pt-6 border-t border-border">
                <Button 
                  onClick={() => handleNavigation("dapp")}
                  className="btn-glow-primary w-full"
                  size="lg"
                >
                  Launch DApp
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;