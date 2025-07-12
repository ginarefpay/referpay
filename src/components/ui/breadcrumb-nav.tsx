import { useEffect, useState } from "react";

interface BreadcrumbNavProps {
  onNavigate: (section: string) => void;
}

const BreadcrumbNav = ({ onNavigate }: BreadcrumbNavProps) => {
  const [activeSection, setActiveSection] = useState("hero");

  const sections = [
    { id: "hero", label: "Home" },
    { id: "vision", label: "Vision" },
    { id: "about", label: "About" },
    { id: "how-it-works", label: "How It Works" },
    { id: "value", label: "Value" },
    { id: "dapp", label: "DApp" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200; // Offset for header

      for (const section of sections.reverse()) {
        const element = document.getElementById(section.id);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 hidden xl:block">
      <div className="bg-card/80 backdrop-blur-lg border border-border rounded-lg p-2">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => onNavigate(section.id)}
            className={`
              block w-3 h-3 rounded-full mb-3 last:mb-0 transition-all duration-300
              ${activeSection === section.id 
                ? 'bg-primary scale-125' 
                : 'bg-muted-foreground/30 hover:bg-primary/50'
              }
            `}
            title={section.label}
          />
        ))}
      </div>
    </nav>
  );
};

export default BreadcrumbNav;