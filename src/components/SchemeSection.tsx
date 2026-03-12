export const SchemeSection = () => {
  const SCHEMES = [
    { 
      name: "Gruha Lakshmi", 
      benefit: "₹2,000 Monthly", 
      desc: "Financial assistance for women heads of households.", 
      color: "border-t-congress-saffron" 
    },
    { 
      name: "Gruha Jyothi", 
      benefit: "200 Units Free", 
      desc: "Free electricity for residential households across Karnataka.", 
      color: "border-t-congress-blue" 
    },
    { 
      name: "Shakti Scheme", 
      benefit: "Free Bus Travel", 
      desc: "Safe and free mobility for women in state-run buses.", 
      color: "border-t-congress-green" 
    },
    { 
      name: "Anna Bhagya", 
      benefit: "10kg Free Rice", 
      desc: "Food security for BPL and Antyodaya card holders.", 
      color: "border-t-congress-saffron" 
    },
    { 
      name: "Yuva Nidhi", 
      benefit: "Unemployment Stipend", 
      desc: "Financial support for graduates and diploma holders.", 
      color: "border-t-congress-green" 
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-congress-blue mb-4">Government Guarantee Schemes</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Ensuring the benefits of Karnataka Government's flagship programs reach every household in Domlur and Jogupalya.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {SCHEMES.map((scheme, i) => (
            <div 
              key={i} 
              className={`bg-slate-50 p-6 rounded-2xl border-t-4 ${scheme.color} shadow-sm hover:shadow-md transition-shadow`}
            >
              <h3 className="font-bold text-xl text-congress-blue mb-2">{scheme.name}</h3>
              <p className="text-sm font-bold text-congress-green mb-3">{scheme.benefit}</p>
              <p className="text-xs text-gray-600 leading-relaxed">{scheme.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};