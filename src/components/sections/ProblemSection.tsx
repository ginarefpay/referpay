import { AlertTriangle, Clock, DollarSign } from "lucide-react";

const ProblemSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Title */}
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            <span className="text-gradient-accent">Why Do Great Ideas Die?</span>
          </h2>
          
          {/* Story Content */}
          <div className="text-lg md:text-xl text-muted-foreground mb-12 leading-relaxed space-y-6">
            <p>
              Every day, a dream is born in an inventor's mind, but sadly, 90% of these dreams die before they see the light.
            </p>
            
            <p>
              The problem isn't a lack of creativity, but a <span className="text-primary font-semibold">lack of funding and support</span>.
            </p>
            
            <p>
              Thousands of revolutionary ideas are lost every year because their creators can't find the right path to turn them into reality.
            </p>
          </div>

          {/* Problem Statistics */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="card-glow p-6 rounded-xl text-center">
              <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gradient-accent mb-2">90%</h3>
              <p className="text-muted-foreground">of great ideas die</p>
            </div>
            
            <div className="card-glow p-6 rounded-xl text-center">
              <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gradient-primary mb-2">5 Years</h3>
              <p className="text-muted-foreground">average time to get funding</p>
            </div>
            
            <div className="card-glow p-6 rounded-xl text-center">
              <DollarSign className="h-12 w-12 text-gold mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gradient-gold mb-2">Billions</h3>
              <p className="text-muted-foreground">of dollars lost annually</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;