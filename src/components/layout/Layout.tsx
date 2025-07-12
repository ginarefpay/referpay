import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import ScrollIndicator from "../ui/scroll-indicator";
import BreadcrumbNav from "../ui/breadcrumb-nav";
import BackToTop from "../ui/back-to-top";

interface LayoutProps {
  children: ReactNode;
  onNavigate: (section: string) => void;
}

const Layout = ({ children, onNavigate }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <ScrollIndicator />
      <Header onNavigate={onNavigate} />
      <BreadcrumbNav onNavigate={onNavigate} />
      <BackToTop />
      <main className="pt-16"> {/* Account for fixed header */}
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;