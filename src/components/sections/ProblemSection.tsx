import { AlertTriangle, Clock, DollarSign } from "lucide-react";

const ProblemSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Title */}
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            <span className="text-gradient-accent">لماذا تموت الأفكار العظيمة؟</span>
          </h2>
          
          {/* Story Content */}
          <div className="text-lg md:text-xl text-muted-foreground mb-12 leading-relaxed space-y-6">
            <p>
              في كل يوم، يولد حلم في عقل مخترع، ولكن للأسف، 90% من هذه الأحلام تموت قبل أن ترى النور.
            </p>
            
            <p>
              المشكلة ليست في نقص الإبداع، بل في <span className="text-primary font-semibold">نقص التمويل والدعم</span>.
            </p>
            
            <p>
              الآلاف من الأفكار الثورية تضيع كل عام لأن أصحابها لا يجدون الطريق الصحيح لتحويلها إلى واقع.
            </p>
          </div>

          {/* Problem Statistics */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="card-glow p-6 rounded-xl text-center">
              <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gradient-accent mb-2">90%</h3>
              <p className="text-muted-foreground">من الأفكار العظيمة تموت</p>
            </div>
            
            <div className="card-glow p-6 rounded-xl text-center">
              <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gradient-primary mb-2">5 سنوات</h3>
              <p className="text-muted-foreground">متوسط وقت الحصول على تمويل</p>
            </div>
            
            <div className="card-glow p-6 rounded-xl text-center">
              <DollarSign className="h-12 w-12 text-gold mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gradient-gold mb-2">مليارات</h3>
              <p className="text-muted-foreground">الدولارات المفقودة سنوياً</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;