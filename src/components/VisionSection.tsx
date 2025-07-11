import { Card } from "@/components/ui/card";

const VisionSection = () => {
  return (
    <section className="py-24 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            <span className="text-gradient-primary">A Platform We All</span>{" "}
            <span className="text-gradient-gold">Own.</span>
          </h2>
        </div>

        <Card className="card-glow p-8 md:p-12 text-center">
          <div className="text-lg md:text-xl leading-relaxed space-y-6 text-muted-foreground">
            <p>
              بمساهمتك البسيطة، أنت لا تمول مشروعاً فقط، بل{" "}
              <span className="text-primary font-semibold">تشارك في تأسيس أول منصة لا مركزية مفتوحة المصدر</span>،
              مملوكة بالكامل لمئة ألف شخص بنوها.
            </p>
            <p>
              في هذا الكيان، <span className="text-gradient-accent">الفكرة ملك للجميع</span>، وصاحبها الأصلي هو{" "}
              <span className="text-gold">شريك مثل أي شريك آخر</span>.
            </p>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-gradient-primary mb-2">100,000</div>
              <div className="text-sm text-muted-foreground">Equal Partners</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gradient-accent mb-2">$5</div>
              <div className="text-sm text-muted-foreground">Entry Investment</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gradient-gold mb-2">∞</div>
              <div className="text-sm text-muted-foreground">Lifetime Royalties</div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default VisionSection;