export default function LandscapeBanner() {
  return (
    <div className="w-full bg-white py-6">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative w-full h-[250px] md:h-[400px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
          <img 
            src="/landscape-photo.jpg" // Put your landscape file in the public folder
            alt="Ravi Sir in Action" 
            className="w-full h-full object-cover"
          />
          {/* Subtle Overlay to make it look premium */}
          <div className="absolute inset-0 bg-gradient-to-t from-congress-blue/20 to-transparent" />
        </div>
        
        {/* Optional Caption */}
        <p className="mt-4 text-center text-gray-500 font-medium italic">
          "Working towards a better and more inclusive Domlur"
        </p>
      </div>
    </div>
  );
}