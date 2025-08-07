
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Scale } from "lucide-react";
import { Link } from "react-router-dom";

const TermsOfService = () => {
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
            <Scale className="h-16 w-16 text-primary mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-gradient-primary mb-4">
              Terms of Service
            </h1>
            <p className="text-lg text-muted-foreground">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>1. Acceptance of Terms</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>
                  By accessing or using ReferPay.org ("Platform"), you agree to be bound by these Terms of Service ("Terms"). 
                  If you disagree with any part of these terms, you may not access the Platform.
                </p>
                <p>
                  These Terms constitute a legally binding agreement between you and ReferPay.org regarding your use 
                  of the Platform and related services.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. Platform Description</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>
                  ReferPay.org is a decentralized referral marketing platform that utilizes blockchain technology 
                  to facilitate transparent and automated referral rewards through NFT ownership and smart contracts.
                </p>
                <p>Key platform features include:</p>
                <ul>
                  <li>Founding Deed NFT purchase and ownership</li>
                  <li>Referral link generation and tracking</li>
                  <li>Automated reward distribution</li>
                  <li>User dashboard and analytics</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. User Eligibility</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>To use the Platform, you must:</p>
                <ul>
                  <li>Be at least 18 years of age</li>
                  <li>Have the legal capacity to enter into agreements</li>
                  <li>Not be prohibited from using the Platform under applicable laws</li>
                  <li>Maintain control of a compatible Web3 wallet</li>
                </ul>
                <p>
                  Users are responsible for ensuring their use complies with local laws and regulations.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. NFT Purchase and Ownership</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p><strong>4.1 Founding Deed NFTs</strong></p>
                <p>
                  Founding Deed NFTs represent membership in the ReferPay.org ecosystem and provide holders 
                  with referral earning rights. Each NFT costs 5 USDC and grants the holder the ability to 
                  earn $1 for each successful referral.
                </p>
                <p><strong>4.2 Ownership Rights</strong></p>
                <ul>
                  <li>NFT ownership is recorded on the blockchain</li>
                  <li>Owners retain full control and transfer rights</li>
                  <li>Referral earnings are tied to NFT ownership</li>
                  <li>No refunds are available after purchase</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. Referral System</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p><strong>5.1 Referral Mechanics</strong></p>
                <p>
                  Users with Founding Deed NFTs can generate referral links to earn rewards when new users 
                  purchase NFTs through their links.
                </p>
                <p><strong>5.2 Prohibited Activities</strong></p>
                <ul>
                  <li>Self-referrals or circular referrals</li>
                  <li>Spam or unsolicited marketing</li>
                  <li>Misrepresentation of the Platform</li>
                  <li>Manipulation of referral tracking</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6. Payment and Fees</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>
                  All payments are processed through blockchain transactions using USDC. Users are responsible for:
                </p>
                <ul>
                  <li>Gas fees for blockchain transactions</li>
                  <li>Ensuring sufficient wallet balance</li>
                  <li>Understanding transaction finality</li>
                  <li>Any applicable taxes on earnings</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>7. Platform Risks</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p><strong>Users acknowledge and accept the following risks:</strong></p>
                <ul>
                  <li><strong>Technology Risk:</strong> Smart contracts and blockchain technology may have vulnerabilities</li>
                  <li><strong>Market Risk:</strong> NFT and cryptocurrency values may fluctuate</li>
                  <li><strong>Regulatory Risk:</strong> Changes in laws may affect platform operations</li>
                  <li><strong>Operational Risk:</strong> Platform may experience downtime or technical issues</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>8. Disclaimers</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>
                  THE PLATFORM IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. WE DISCLAIM ALL WARRANTIES, 
                  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, 
                  AND NON-INFRINGEMENT.
                </p>
                <p>
                  We do not guarantee platform availability, transaction success, or earning potential.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>9. Limitation of Liability</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, REFERPAY.ORG SHALL NOT BE LIABLE FOR ANY INDIRECT, 
                  INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF 
                  PROFITS, DATA, OR OTHER INTANGIBLE LOSSES.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>10. Modifications</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>
                  We reserve the right to modify these Terms at any time. Changes will be effective upon posting. 
                  Continued use of the Platform constitutes acceptance of modified Terms.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>11. Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>For questions about these Terms, contact us at:</p>
                <p>
                  Email: <a href="mailto:legal@referpay.org" className="text-primary">legal@referpay.org</a><br />
                  Website: <a href="https://referpay.org" className="text-primary">https://referpay.org</a>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TermsOfService;
