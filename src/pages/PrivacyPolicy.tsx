
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
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
            <Shield className="h-16 w-16 text-primary mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-gradient-primary mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-muted-foreground">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>1. Information We Collect</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p><strong>1.1 Blockchain Data</strong></p>
                <p>
                  When you interact with our smart contracts, certain information is automatically recorded on the blockchain:
                </p>
                <ul>
                  <li>Wallet addresses</li>
                  <li>Transaction hashes</li>
                  <li>NFT ownership records</li>
                  <li>Referral relationships</li>
                </ul>
                
                <p><strong>1.2 Website Usage Data</strong></p>
                <ul>
                  <li>IP addresses and device information</li>
                  <li>Browser type and version</li>
                  <li>Pages visited and time spent</li>
                  <li>Referral sources</li>
                </ul>

                <p><strong>1.3 Communication Data</strong></p>
                <ul>
                  <li>Support ticket contents</li>
                  <li>Email communications</li>
                  <li>User feedback</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. How We Use Your Information</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>We use collected information for:</p>
                <ul>
                  <li><strong>Platform Operation:</strong> Processing transactions, tracking referrals, distributing rewards</li>
                  <li><strong>User Support:</strong> Responding to inquiries and resolving issues</li>
                  <li><strong>Security:</strong> Detecting fraud and protecting user accounts</li>
                  <li><strong>Analytics:</strong> Understanding platform usage and improving services</li>
                  <li><strong>Communications:</strong> Sending platform updates and important notices</li>
                  <li><strong>Legal Compliance:</strong> Meeting regulatory requirements</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. Information Sharing</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p><strong>3.1 Public Blockchain Data</strong></p>
                <p>
                  Blockchain transactions are inherently public. Your wallet address and transaction history 
                  are visible on the blockchain and through blockchain explorers.
                </p>

                <p><strong>3.2 Service Providers</strong></p>
                <p>We may share information with trusted third parties who assist in:</p>
                <ul>
                  <li>Website hosting and maintenance</li>
                  <li>Analytics and monitoring</li>
                  <li>Customer support</li>
                  <li>Legal and compliance services</li>
                </ul>

                <p><strong>3.3 Legal Requirements</strong></p>
                <p>
                  We may disclose information when required by law, court order, or to protect our rights and the safety of users.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. Data Security</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>We implement industry-standard security measures:</p>
                <ul>
                  <li><strong>Encryption:</strong> Data transmission and storage encryption</li>
                  <li><strong>Access Controls:</strong> Restricted access to personal information</li>
                  <li><strong>Monitoring:</strong> Continuous security monitoring and threat detection</li>
                  <li><strong>Audits:</strong> Regular security assessments and smart contract audits</li>
                </ul>
                <p>
                  However, no method of transmission over the Internet or electronic storage is 100% secure. 
                  We cannot guarantee absolute security.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. Your Rights and Choices</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p><strong>5.1 Wallet Control</strong></p>
                <p>You maintain full control over your Web3 wallet and can disconnect from our platform at any time.</p>

                <p><strong>5.2 Data Rights</strong></p>
                <p>Depending on your jurisdiction, you may have rights to:</p>
                <ul>
                  <li>Access your personal information</li>
                  <li>Correct inaccurate data</li>
                  <li>Request data deletion (subject to blockchain immutability)</li>
                  <li>Data portability</li>
                  <li>Object to processing</li>
                </ul>

                <p><strong>5.3 Communication Preferences</strong></p>
                <p>You can opt out of non-essential communications by contacting us at privacy@referpay.org</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6. Cookies and Tracking</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>We use cookies and similar technologies for:</p>
                <ul>
                  <li><strong>Essential Cookies:</strong> Required for basic platform functionality</li>
                  <li><strong>Analytics Cookies:</strong> Help us understand how users interact with our platform</li>
                  <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                </ul>
                <p>You can control cookie settings through your browser preferences.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>7. International Data Transfers</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>
                  As a decentralized platform, data may be processed and stored in various jurisdictions. 
                  We ensure appropriate safeguards are in place for international data transfers in accordance 
                  with applicable privacy laws.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>8. Data Retention</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>
                  We retain personal information only as long as necessary for the purposes outlined in this policy. 
                  Blockchain data is immutable and cannot be deleted from the blockchain.
                </p>
                <ul>
                  <li><strong>Website Data:</strong> Retained for 3 years after last interaction</li>
                  <li><strong>Support Communications:</strong> Retained for 5 years</li>
                  <li><strong>Blockchain Data:</strong> Permanent on the blockchain</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>9. Children's Privacy</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>
                  Our platform is not intended for users under 18 years of age. We do not knowingly collect 
                  personal information from children. If you believe a child has provided us with personal 
                  information, please contact us immediately.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>10. Changes to This Policy</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>
                  We may update this Privacy Policy from time to time. Changes will be posted on this page 
                  with an updated "Last updated" date. Significant changes will be communicated through 
                  appropriate channels.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>11. Contact Us</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>For privacy-related questions or requests:</p>
                <p>
                  Email: <a href="mailto:privacy@referpay.org" className="text-primary">privacy@referpay.org</a><br />
                  Subject Line: Privacy Inquiry<br />
                  Response Time: Within 30 days
                </p>
                <p>
                  For EU residents: You have the right to lodge a complaint with your local data protection authority.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
