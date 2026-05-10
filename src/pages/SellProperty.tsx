import { motion } from 'motion/react';
import { CheckCircle2, ShieldCheck, Globe2, Users2, Home, Landmark, Building2, Palmtree, ArrowRight } from 'lucide-react';

export default function SellProperty() {
  const buyerTypes = [
    { icon: <Users2 className="w-6 h-6" />, title: "Balikbayans", desc: "Returning Filipinos looking for their dream homes." },
    { icon: <Globe2 className="w-6 h-6" />, title: "Global Investors", desc: "International buyers seeking high-yield opportunities." },
    { icon: <ShieldCheck className="w-6 h-6" />, title: "OFWs", desc: "Hardworking Filipinos securing their family's future." },
    { icon: <CheckCircle2 className="w-6 h-6" />, title: "Local Executives", desc: "Professionals seeking premium living spaces in Cebu." }
  ];

  const propertyTypes = [
    "House and Lot", "Residential Lots", "Commercial Lots", "Industrial Land",
    "Beachfront Properties", "Condominium Units", "Commercial Buildings", "Investment Properties"
  ];

  const steps = [
    { number: "01", title: "Property Evaluation", desc: "We conduct a thorough inspection to determine the best market value." },
    { number: "02", title: "Marketing Strategy", desc: "High-quality photography and global listing across our network." },
    { number: "03", title: "Buyer Matching", desc: "We connect you with serious, pre-qualified buyers and investors." },
    { number: "04", title: "Negotiation & Closing", desc: "Professional handling of offers to ensure you get the best deal." },
    { number: "05", title: "Title Transfer", desc: "End-to-end support for a seamless and legal ownership transfer." }
  ];

  return (
    <div className="pt-24 pb-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-jade-950/60 z-10" />
          <img 
            src="/images/livingroom.jpg" 
            alt="Premium Living Room" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative z-20 text-center px-6 max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-serif font-bold text-white mb-6"
          >
            Sell Your Property <br />
            <span className="text-emerald-400 italic font-light">The Right Way</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-jade-100/90 font-light tracking-wide max-w-2xl mx-auto"
          >
            Join Cebu's most trusted real estate network. We transform property listings into successful transitions with global reach and local expertise.
          </motion.p>
        </div>
      </section>

      {/* Why List With Us */}
      <section className="section-container">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-serif font-bold text-jade-900 dark:text-jade-50 mb-6">
              Why List Your <span className="text-puyo-jade dark:text-emerald-500">Cebu Property</span> Today?
            </h2>
            <p className="text-jade-700 dark:text-jade-300 mb-8 leading-relaxed">
              With over 20 years of proven experience in the Philippine real estate market, Puyo Philippines provides complete support — from initial inspection to final title transfer. We make the process smooth and hassle-free.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {buyerTypes.map((item, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-xl bg-jade-50 dark:bg-jade-900/40 border border-jade-100 dark:border-jade-800">
                  <div className="text-puyo-jade dark:text-emerald-400 shrink-0">{item.icon}</div>
                  <div>
                    <h4 className="font-bold text-sm text-jade-900 dark:text-jade-50">{item.title}</h4>
                    <p className="text-xs text-jade-600 dark:text-jade-400 mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -inset-4 bg-emerald-500/10 blur-3xl rounded-full" />
            <div className="geometric-card p-8 relative">
              <h3 className="text-xl font-serif font-bold mb-6 flex items-center gap-3">
                <Home className="text-puyo-jade dark:text-emerald-400" />
                We Handle All Property Types
              </h3>
              <ul className="grid grid-cols-1 gap-3">
                {propertyTypes.map((type, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-jade-700 dark:text-jade-300 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-puyo-jade dark:bg-emerald-500" />
                    {type}
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-6 border-t border-jade-100 dark:border-jade-800 text-center">
                <p className="text-xs text-jade-500 italic">"No matter the property type, our goal is simple: bring in the right buyer and close the deal efficiently."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-jade-900 text-white py-24 relative overflow-hidden">
        <div className="chinese-accent absolute top-0 right-0 text-[20rem] translate-x-1/2 -translate-y-1/4 opacity-[0.03]">售</div>
        <div className="section-container relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold mb-4">Our Trusted Process</h2>
            <div className="h-1 w-24 bg-emerald-500 mx-auto" />
          </div>
          
          <div className="grid md:grid-cols-5 gap-8">
            {steps.map((step, idx) => (
              <div key={idx} className="relative">
                <div className="text-6xl font-serif font-black text-white/5 absolute -top-8 left-0 select-none">
                  {step.number}
                </div>
                <h4 className="text-lg font-bold mb-3 text-emerald-400">{step.title}</h4>
                <p className="text-sm text-jade-200 font-light leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fees & CTA */}
      <section className="section-container text-center">
        <div className="max-w-3xl mx-auto bg-white dark:bg-jade-950 border border-jade-100 dark:border-jade-800 rounded-3xl p-12 shadow-2xl">
          <Landmark className="w-12 h-12 text-puyo-jade dark:text-emerald-400 mx-auto mb-6" />
          <h2 className="text-3xl font-serif font-bold mb-4">Professional Standards</h2>
          <p className="text-jade-600 dark:text-jade-400 mb-8">
            Our standard professional fee is <span className="font-bold text-puyo-jade dark:text-emerald-400">5%</span> of the agreed selling price. 
            For rentals, we charge <span className="font-bold text-puyo-jade dark:text-emerald-400">one month's rent</span> for a standard one-year lease. 
            We only earn when you succeed.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="jade-button py-4 px-12 flex items-center justify-center gap-2">
              List Your Property Now <ArrowRight className="w-4 h-4" />
            </button>
            <button className="px-12 py-4 rounded-lg border border-jade-200 dark:border-jade-700 font-bold uppercase tracking-widest text-[10px] hover:bg-jade-50 dark:hover:bg-jade-900 transition-colors">
              Contact Consultant
            </button>
          </div>
          <p className="mt-6 text-xs text-jade-400">Or call us at +63 917 796 5825 for immediate assistance.</p>
        </div>
      </section>
    </div>
  );
}
