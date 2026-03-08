import { motion } from "framer-motion";
import { Instagram, Youtube, ArrowDown } from "lucide-react";
import heroImg from "@assets/image_1772982996419.png";
import aboutImg from "@assets/AboutUs.png";
import { ContactForm } from "@/components/ContactForm";

// Framer motion variants for elegant reveals
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background w-full overflow-x-hidden">
      {/* Navigation */}
      <nav className="absolute top-0 left-0 w-full z-50 p-6 md:p-10 flex justify-between items-center text-white/90 backdrop-blur-sm bg-gradient-to-b from-white/20 to-transparent">
        <div className="text-sm tracking-widest uppercase font-medium">
          The Wholesome Pilgrims Co.
        </div>

        <div className="hidden md:flex gap-8 text-sm tracking-widest uppercase">
          <a href="#about" className="hover:opacity-70 transition-opacity">About</a>
          <a href="#contact" className="hover:opacity-70 transition-opacity">Contact</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen w-full flex flex-col items-center justify-center text-center px-4">
        {/* Background Image with elegant wash */}
        <div className="absolute inset-0 z-0">
          <motion.div 
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-full h-full"
          >
            <img 
              src={heroImg} 
              alt="Beautiful scenic landscape" 
              className="w-full h-full object-cover object-center"
            />
          </motion.div>
          <div className="absolute inset-0 bg-black/30 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
        </div>

        {/* Hero Content */}
        <motion.div 
          className="relative z-20 text-white max-w-4xl mx-auto mt-20"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-7xl lg:text-8xl font-display mb-6 text-balance leading-tight text-white/90 drop-shadow-lg"
          >
            Soulful Stays, <br className="hidden md:block" />
            <span className="italic text-white/80">Untold Stories</span>
          </motion.h1>
          <motion.p 
            variants={fadeInUp}
            className="text-lg md:text-xl font-sans font-light tracking-wide opacity-90 max-w-2xl mx-auto"
          >
            Curated Airbnb experiences and travel chronicles for the mindful wanderer.
          </motion.p>
        </motion.div>

        {/* Scroll Indicator - Clickable */}
        <motion.button 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          onClick={() => {
            const aboutSection = document.getElementById('about');
            aboutSection?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="absolute bottom-10 z-20 text-white flex flex-col items-center cursor-pointer hover:opacity-70 transition-opacity"
        >
          <span className="text-xs uppercase tracking-[0.2em] mb-3 opacity-80">Discover</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ArrowDown className="w-5 h-5 opacity-80" />
          </motion.div>
        </motion.button>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 md:py-32 px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          {/* Image */}
          <motion.div variants={fadeInUp} className="relative aspect-[4/5] w-full">
            <div className="absolute inset-0 bg-primary/5 translate-x-4 translate-y-4 -z-10" />
            <img 
              src={aboutImg} 
              alt="Dhanashree & Samrat" 
              className="w-full h-full object-cover shadow-2xl shadow-foreground/5"
            />
          </motion.div>

          {/* Text Content */}
          <div className="space-y-12">
            <motion.div variants={fadeInUp}>
              <h4 className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">About Us</h4>
              <h2 className="text-4xl md:text-5xl font-display text-foreground mb-6">Meet Dhanashree <span className="italic text-foreground/70">&</span> Samrat</h2>
              <p className="text-foreground/80 leading-relaxed text-lg">
                We are passionate travelers and storytellers dedicated to uncovering the world's most serene and inspiring corners. Our journey began with a simple desire: to transform how people experience travel.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <h3 className="text-2xl font-display mb-4">What We Offer</h3>
              <p className="text-foreground/80 leading-relaxed">
                From meticulously curated Airbnb stays that feel like home, to immersive travel vlogs that transport you to distant lands, we provide everything you need to inspire your next soulful pilgrimage.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <h3 className="text-2xl font-display mb-4">Our Philosophy</h3>
              <p className="text-foreground/80 leading-relaxed">
                We believe in travel that enriches the soul. It's not just about the destination, but the connections made, the cultures experienced, and the quiet moments of reflection along the way.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Quote / Divider Section */}
      <section className="py-20 px-6 bg-foreground text-background text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <p className="text-3xl md:text-4xl lg:text-5xl font-display italic leading-tight text-balance">
            "To travel is to take a journey into yourself."
          </p>
        </motion.div>
      </section>

      {/* Contact & Social Section */}
      <section id="contact" className="py-24 md:py-32 px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-16 lg:gap-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          {/* Social Links */}
          <motion.div variants={fadeInUp} className="flex flex-col justify-between">
            <div>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-display mb-8">Follow <br/> <span className="italic">Us.</span></h2>
              <p className="text-foreground/70 text-lg mb-10 max-w-sm">
                Join our community of wanderers. Share your journey and discover ours through our visual diaries.
              </p>
              
              <div className="flex flex-col gap-6">
                <a 
                  href="https://www.instagram.com/the_wholesome_pilgrims_co?igsh=MWE5dTBwYmJwcXR1cQ%3D%3D&utm_source=qr" 
                  className="flex items-center gap-4 group w-fit"
                >
                  <div className="w-12 h-12 rounded-full border border-foreground/20 flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-all duration-300">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <span className="text-lg tracking-wide group-hover:pl-2 transition-all duration-300">Instagram</span>
                </a>
                
                <a 
                  href="https://www.youtube.com/@The_Wholesome_Pilgrims_Co" 
                  className="flex items-center gap-4 group w-fit"
                >
                  <div className="w-12 h-12 rounded-full border border-foreground/20 flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-all duration-300">
                    <Youtube className="w-5 h-5" />
                  </div>
                  <span className="text-lg tracking-wide group-hover:pl-2 transition-all duration-300">YouTube</span>
                </a>
              </div>
            </div>
            
            <div className="mt-20 lg:mt-0 text-sm text-foreground/50 tracking-wide">
              © {new Date().getFullYear()} The Wholesome Pilgrims Co. <br/> All rights reserved.
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={fadeInUp} className="bg-white/40 backdrop-blur-sm p-8 md:p-12 shadow-2xl shadow-foreground/5">
            <h3 className="text-3xl font-display mb-2">Get in Touch</h3>
            <p className="text-foreground/70 mb-10">Collaborations, inquiries, or just to say hello.</p>
            <ContactForm />
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
