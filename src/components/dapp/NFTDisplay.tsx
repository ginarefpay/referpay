import { Card } from "@/components/ui/card";

const NFTDisplay = () => {
  return (
    <div className="flex justify-center">
      <Card className="card-glow p-8 max-w-sm">
        <img 
          src="/lovable-uploads/22230950-ddba-4779-ad05-4a2618a54047.png" 
          alt="ReferPay Founding Deed NFT" 
          className="w-full h-auto rounded-lg mb-6 float-animation"
        />
        <div className="text-center">
          <h3 className="text-xl font-bold text-gradient-gold mb-2">
            ReferPay Founding Deed
          </h3>
          <p className="text-sm text-muted-foreground">
            One of 100,000 Founding Deeds
          </p>
        </div>
      </Card>
    </div>
  );
};

export default NFTDisplay;