
import { Github, Twitter, Linkedin, Mail, Youtube, Video, Send } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: "https://github.com/referpay", label: "GitHub" },
    { icon: Twitter, href: "https://x.com/referpayorg", label: "Twitter" },
    { icon: Linkedin, href: "https://linkedin.com/company/referpay", label: "LinkedIn" },
    { icon: Youtube, href: "https://youtube.com/@referpayorg", label: "YouTube" },
    { icon: Video, href: "https://tiktok.com/@referpayorg", label: "TikTok" },
    { icon: Send, href: "https://t.me/referpayorg", label: "Telegram" },
  ];

  const footerLinks = [
    {
      title: "Platform",
      links: [
        { label: "How it Works", href: "#vision" },
        { label: "Features", href: "#value" },
        { label: "DApp", href: "#dapp" },
        { label: "Dashboard", href: "/dashboard" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Whitepaper", href: "/whitepaper" },
        { label: "Documentation", href: "#" },
        { label: "GitHub", href: "https://github.com/referpay" },
        { label: "API", href: "#" },
        { label: "Support", href: "mailto:support@referpay.org" },
        { label: "FAQ", href: "#" },
      ],
    },
    {
      title: "Contact",
      links: [
        { label: "General", href: "mailto:contact@referpay.org" },
        { label: "Support", href: "mailto:support@referpay.org" },
        { label: "Business", href: "mailto:business@referpay.org" },
        { label: "Press", href: "mailto:press@referpay.org" },
        { label: "Partnerships", href: "mailto:partnerships@referpay.org" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Cookie Policy", href: "#" },
        { label: "Compliance", href: "#" },
      ],
    },
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src="/lovable-uploads/633f9e66-854c-4ba9-a849-fa17dbb293ba.png" 
                alt="ReferPay.org Logo" 
                className="h-10 w-auto"
              />
              <span className="text-2xl font-bold text-gradient-primary">ReferPay</span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              Invest in a huge, secure project for a very small amount. 
              Your chance to be part of the foundation.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 rounded-lg bg-secondary/50 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all duration-300"
                    aria-label={social.label}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-foreground mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith('/') ? (
                      <Link 
                        to={link.href}
                        className="text-muted-foreground hover:text-primary transition-colors duration-300"
                      >
                        {link.label}
                      </Link>
                    ) : link.href.startsWith('#') ? (
                      <a 
                        href={link.href}
                        className="text-muted-foreground hover:text-primary transition-colors duration-300"
                        onClick={(e) => {
                          if (link.href !== '#') {
                            e.preventDefault();
                            const element = document.getElementById(link.href.slice(1));
                            if (element) {
                              element.scrollIntoView({ behavior: 'smooth' });
                            }
                          }
                        }}
                      >
                        {link.label}
                      </a>
                    ) : (
                      <a 
                        href={link.href}
                        className="text-muted-foreground hover:text-primary transition-colors duration-300"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-muted-foreground text-sm">
            © {currentYear} ReferPay.org. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
            <span>Made with ❤️ for the Web3 community</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
