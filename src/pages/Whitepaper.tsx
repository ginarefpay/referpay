
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Layout from "@/components/layout/Layout";
import { FileText, Download, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Whitepaper = () => {
  const handleNavigation = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  const downloadWhitepaper = () => {
    // Create a blob with the whitepaper content
    const content = `
ReferPay.org Whitepaper
Version 1.0 - ${new Date().getFullYear()}

Executive Summary
ReferPay.org is a revolutionary Web3 platform that transforms traditional referral marketing through blockchain technology...
    `;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ReferPay-Whitepaper-v1.0.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Layout onNavigate={handleNavigation}>
      <div className="min-h-screen bg-gradient-to-br from-background via-card/50 to-background py-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </div>

          <div className="text-center mb-12">
            <FileText className="h-16 w-16 text-primary mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-gradient-primary mb-4">
              ReferPay.org Whitepaper
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              The Future of Decentralized Referral Marketing
            </p>
            <Button onClick={downloadWhitepaper} className="btn-glow-primary">
              <Download className="h-5 w-5 mr-2" />
              Download PDF
            </Button>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Executive Summary</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-lg max-w-none">
                <p>
                  ReferPay.org represents a paradigm shift in referral marketing, leveraging blockchain technology 
                  to create a transparent, secure, and profitable ecosystem for all participants. Our platform 
                  transforms traditional word-of-mouth marketing into a quantifiable, rewarding experience.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">The Problem</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-lg max-w-none">
                <p>
                  Traditional referral systems suffer from several critical issues:
                </p>
                <ul>
                  <li>Lack of transparency in reward distribution</li>
                  <li>Delayed or inconsistent payments</li>
                  <li>Limited tracking capabilities</li>
                  <li>Trust issues between platforms and users</li>
                  <li>Geographical restrictions and payment barriers</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Our Solution</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-lg max-w-none">
                <p>
                  ReferPay.org addresses these challenges through:
                </p>
                <ul>
                  <li><strong>Blockchain Transparency:</strong> All transactions are recorded on-chain</li>
                  <li><strong>Instant Payments:</strong> Smart contracts enable immediate reward distribution</li>
                  <li><strong>Global Accessibility:</strong> Decentralized infrastructure removes geographical barriers</li>
                  <li><strong>Founding Deed NFTs:</strong> Permanent ownership and revenue rights</li>
                  <li><strong>Community Governance:</strong> Token holders participate in platform decisions</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Tokenomics</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-lg max-w-none">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Founding Deed NFTs</h4>
                    <ul>
                      <li>Total Supply: 100,000 NFTs</li>
                      <li>Price: 5 USDC per NFT</li>
                      <li>Referral Reward: $1 per successful referral</li>
                      <li>Lifetime Revenue Rights</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Revenue Distribution</h4>
                    <ul>
                      <li>60% - Platform Development</li>
                      <li>25% - Marketing & Growth</li>
                      <li>10% - Team & Advisors</li>
                      <li>5% - Community Treasury</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Technology Stack</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-lg max-w-none">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Blockchain Layer</h4>
                    <ul>
                      <li>Polygon (MATIC) Network</li>
                      <li>ERC-721 NFT Standard</li>
                      <li>Smart Contract Security</li>
                      <li>IPFS Metadata Storage</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Application Layer</h4>
                    <ul>
                      <li>React & TypeScript</li>
                      <li>Web3 Integration</li>
                      <li>Real-time Analytics</li>
                      <li>Mobile-Responsive Design</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Roadmap</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-lg max-w-none">
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-primary">Q1 2025 - Foundation</h4>
                    <ul>
                      <li>Launch Founding Deed NFT sale</li>
                      <li>Complete core platform development</li>
                      <li>Establish legal framework</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary">Q2 2025 - Growth</h4>
                    <ul>
                      <li>Mobile application release</li>
                      <li>Advanced analytics dashboard</li>
                      <li>Strategic partnerships</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary">Q3-Q4 2025 - Scale</h4>
                    <ul>
                      <li>Multi-chain expansion</li>
                      <li>Enterprise solutions</li>
                      <li>Governance token launch</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Legal & Compliance</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-lg max-w-none">
                <p>
                  ReferPay.org operates under comprehensive legal frameworks designed to ensure 
                  regulatory compliance across jurisdictions. Our commitment to transparency and 
                  user protection guides all platform operations.
                </p>
                <div className="mt-4 space-y-2">
                  <p><strong>Regulatory Approach:</strong> Proactive compliance with evolving Web3 regulations</p>
                  <p><strong>User Protection:</strong> Industry-leading security and privacy standards</p>
                  <p><strong>Transparency:</strong> Open-source smart contracts and regular audits</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Separator className="my-12" />
          
          <div className="text-center">
            <p className="text-muted-foreground">
              For more information, contact us at{" "}
              <a href="mailto:contact@referpay.org" className="text-primary hover:underline">
                contact@referpay.org
              </a>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Whitepaper;
