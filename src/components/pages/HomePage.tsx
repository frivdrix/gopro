import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, TrendingUp, Target, Zap, Users, Play, CheckCircle, Star, BarChart3, Rocket, Shield, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { BaseCrudService } from '@/integrations';
import { PartnerLogos, Services, CaseStudies, Testimonials } from '@/entities';

// Animated Logo Component
const AnimatedLogo = () => {
  const letters = "LetsGrowPro".split("");
  
  return (
    <div className="flex items-center">
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: index * 0.1,
            duration: 0.6,
            ease: "easeOut"
          }}
          whileHover={{ 
            scale: 1.1,
            color: "#00ff77",
            transition: { duration: 0.2 }
          }}
          className="font-heading text-lg sm:text-xl lg:text-2xl font-black text-black cursor-pointer"
        >
          {letter}
        </motion.span>
      ))}
      
      {/* Animated TrendingUp Icon after logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0, rotate: -45 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ 
          delay: letters.length * 0.1 + 0.3,
          duration: 0.6,
          ease: "easeOut"
        }}
        className="ml-3 flex items-center"
      >
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0],
            y: [0, -2, 0]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          whileHover={{
            scale: 1.2,
            rotate: 15,
            transition: { duration: 0.2 }
          }}
          className="cursor-pointer"
        >
          <TrendingUp className="w-6 h-6 text-primary" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default function HomePage() {
  const [partnerLogos, setPartnerLogos] = useState<PartnerLogos[]>([]);
  const [services, setServices] = useState<Services[]>([]);
  const [caseStudies, setCaseStudies] = useState<CaseStudies[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonials[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [partnersData, servicesData, caseStudiesData, testimonialsData] = await Promise.all([
          BaseCrudService.getAll<PartnerLogos>('partnerlogos'),
          BaseCrudService.getAll<Services>('services'),
          BaseCrudService.getAll<CaseStudies>('casestudies'),
          BaseCrudService.getAll<Testimonials>('testimonials')
        ]);
        
        setPartnerLogos(partnersData.items.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)));
        setServices(servicesData.items.slice(0, 4));
        setCaseStudies(caseStudiesData.items.slice(0, 3));
        setTestimonials(testimonialsData.items.slice(0, 3));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
// ⬇⬇ DOWNLOAD-ALL FILES BUTTON (paste below your existing useEffect, before the return)
useEffect(() => {
  // Guard for SSR/Astro
  if (typeof window === "undefined" || typeof document === "undefined") return;

  // (Optional) help TS with the monaco global without adding a .d.ts file
  const monacoAny = (window as any).monaco;

  // --- create button
  const button = document.createElement("button");
  button.textContent = "📥 DOWNLOAD ALL FILES";
  Object.assign(button.style, {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    zIndex: 9999,
    padding: "20px 40px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "18px",
    fontWeight: "bold",
    boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
    transition: "all 0.2s ease",
    fontFamily: "system-ui, -apple-system, sans-serif",
  } as CSSStyleDeclaration);

  // Hover effects
  const onEnter = () => {
    button.style.transform = "scale(1.05)";
    button.style.boxShadow = "0 12px 30px rgba(0,0,0,0.4)";
  };
  const onLeave = () => {
    button.style.transform = "scale(1)";
    button.style.boxShadow = "0 8px 20px rgba(0,0,0,0.3)";
  };
  button.addEventListener("mouseenter", onEnter);
  button.addEventListener("mouseleave", onLeave);

  // Helpers
  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
  const getEditorContent = () => {
    try {
      if (monacoAny?.editor?.getModels) {
        const models = monacoAny.editor.getModels();
        if (models.length > 0) return models[0].getValue();
      }
    } catch {}
    const viewLines = document.querySelector(".view-lines") as HTMLElement | null;
    if (viewLines) return viewLines.textContent || viewLines.innerText;
    return null;
  };
  const downloadFile = (folderPath: string, filename: string, content: string) => {
    const fullName = folderPath ? `${folderPath}__${filename}` : filename;
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fullName;
    a.click();
    URL.revokeObjectURL(url);
    console.log(`✅ ${fullName}`);
  };

  button.onclick = async () => {
    console.log("🚀 Starting complete project download with folder structure...");

    // ⬇⬇ PASTE YOUR FULL fileStructure OBJECT HERE (exactly as you have it)
    const fileStructure: Record<string, string[]> = {
      /* ... your 'root', 'eslint-rules', 'integrations', etc. ... */
    };
    // ⬆⬆ END PASTE

    let totalFiles = 0;
    Object.values(fileStructure).forEach((files) => (totalFiles += files.length));
    console.log(`📦 Found ${totalFiles} files to download`);

    let successCount = 0;
    let failCount = 0;
    let currentFile = 0;

    for (const [folder, files] of Object.entries(fileStructure)) {
      console.log(`\n📁 Processing folder: ${folder}`);
      for (const filename of files) {
        currentFile++;
        console.log(`\n[${currentFile}/${totalFiles}] ${folder}/${filename}`);
        try {
          const allElements = Array.from(document.querySelectorAll<HTMLElement>("*"));
          const fileElement = allElements.find((el) => {
            const text = el.textContent?.trim();
            return text === filename && el.children.length <= 1;
          });

          if (fileElement) {
            fileElement.click();
            console.log("   ⏳ Waiting for editor...");
            await sleep(1500);

            const content = getEditorContent();
            if (content && content.length > 10) {
              downloadFile(folder === "root" ? "" : folder, filename, content);
              successCount++;
            } else {
              console.warn("   ⚠️ No content");
              failCount++;
            }
          } else {
            console.warn("   ⚠️ File not found in sidebar");
            failCount++;
          }

          await sleep(600);
        } catch (err) {
          console.error("   ❌ Error:", err);
          failCount++;
        }
      }
    }

    const guide = `
FOLDER STRUCTURE GUIDE
${"=".repeat(60)}

Your files have been downloaded with folder paths in their names.
Example: "src__components__pages__HomePage.tsx"

To recreate the folder structure:
1. Create these folders in your project:
   - eslint-rules/
   - integrations/
     - cms/
     - errorHandlers/
     - members/
       - providers/
   - public/
   - src/
     - components/
       - pages/
       - ui/
     - entities/
     - hooks/
     - lib/
     - pages/
     - styles/

2. Move files to their folders based on the __ separator:
   - src__components__pages__HomePage.tsx → src/components/pages/HomePage.tsx
   - integrations__cms__index.ts → integrations/cms/index.ts
   - etc.

Files downloaded: ${successCount}
Failed: ${failCount}
Total: ${totalFiles}
`;

    downloadFile("", "FOLDER-STRUCTURE-GUIDE.txt", guide);

    console.log("\n" + "=".repeat(60));
    console.log("📦 DOWNLOAD COMPLETE!");
    console.log(`✅ Success: ${successCount} files`);
    console.log(`❌ Failed: ${failCount} files`);
    console.log("=".repeat(60));

    alert(
      `Download Complete!\n\n✅ Downloaded: ${successCount} files\n❌ Failed: ${failCount} files\n\nFiles are named with folder structure:\ne.g., "src__components__pages__HomePage.tsx"\n\nCheck your Downloads folder and the FOLDER-STRUCTURE-GUIDE.txt file!`
    );
  };

  document.body.appendChild(button);

  // cleanup
  return () => {
    button.removeEventListener("mouseenter", onEnter);
    button.removeEventListener("mouseleave", onLeave);
    if (button.parentNode) button.parentNode.removeChild(button);
  };
}, []);
// ⬆⬆ END DOWNLOAD-ALL FILES BUTTON
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-6 sm:gap-4">
            <Link to="/" className="flex-shrink-0 min-w-0 max-w-[55%] sm:max-w-none">
              <AnimatedLogo />
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              <Link to="/case-studies" className="font-paragraph text-base text-black hover:text-primary transition-colors font-medium">
                Case Studies
              </Link>
              <Link to="/faq" className="font-paragraph text-base text-black hover:text-primary transition-colors font-medium">
                FAQ
              </Link>
              <Link to="/contact" className="font-paragraph text-base text-black hover:text-primary transition-colors font-medium">
                Contact
              </Link>
            </div>

            <div className="flex items-center space-x-3 sm:space-x-4 flex-shrink-0">
              <Button asChild className="bg-primary text-white hover:bg-primary-hover px-3 sm:px-4 lg:px-6 py-2 sm:py-3 font-semibold rounded-full text-xs sm:text-sm lg:text-base whitespace-nowrap min-w-[90px] sm:min-w-[100px]">
                <Link to="/contact">Get Started</Link>
              </Button>
              
              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-md text-black hover:text-primary transition-colors flex-shrink-0"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-white border-t border-gray-100"
            >
              <div className="px-4 py-6 space-y-4">
                <Link 
                  to="/case-studies" 
                  className="block font-paragraph text-base text-black hover:text-primary transition-colors font-medium py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Case Studies
                </Link>
                <Link 
                  to="/faq" 
                  className="block font-paragraph text-base text-black hover:text-primary transition-colors font-medium py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  FAQ
                </Link>
                <Link 
                  to="/contact" 
                  className="block font-paragraph text-base text-black hover:text-primary transition-colors font-medium py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-white via-gray-50/30 to-green-50/20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-green-50/10"></div>
        <div className="relative max-w-[120rem] mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:p-[32px] lg:pt-[52px] pr-[32px] pb-[52px] pl-[32px]">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
            {/* Left side - Text content */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="space-y-4 sm:space-y-6 text-center lg:text-left"
            >
              <div className="space-y-4 sm:space-y-6">
                <h1 className="font-heading text-4xl sm:text-5xl lg:text-7xl font-black text-black leading-[0.9] tracking-tight">
                  Transform local Search queries into
                  <br />
                  <span className="text-primary">Customer appointments</span>
                </h1>
                
                <p className="font-paragraph text-lg sm:text-xl text-black/80 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                  We help ambitious companies achieve sustainable growth through data-driven strategies 
                  and performance optimization.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <Button asChild size="lg" className="bg-primary text-white hover:bg-primary-hover px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-full w-full sm:w-auto">
                    <Link to="/contact">Get Started Today</Link>
                  </Button>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <Button asChild variant="outline" size="lg" className="border-2 border-black text-black hover:bg-black hover:text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-full w-full sm:w-auto">
                    <Link to="/case-studies" className="flex items-center gap-2">
                      <Play className="w-4 sm:w-5 h-4 sm:h-5" />
                      View Our Work
                    </Link>
                  </Button>
                </motion.div>
              </div>

              {/* Stats */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="grid grid-cols-3 gap-4 sm:gap-8 pt-8 sm:pt-12"
              >
                <div className="text-center">
                  <div className="font-heading text-2xl sm:text-3xl lg:text-4xl font-black text-primary">250%</div>
                  <div className="font-paragraph text-xs sm:text-sm text-black/70 font-medium">Avg ROI Increase</div>
                </div>
                <div className="text-center">
                  <div className="font-heading text-2xl sm:text-3xl lg:text-4xl font-black text-primary">50+</div>
                  <div className="font-paragraph text-xs sm:text-sm text-black/70 font-medium">Happy Clients</div>
                </div>
                <div className="text-center">
                  <div className="font-heading text-2xl sm:text-3xl lg:text-4xl font-black text-primary">98%</div>
                  <div className="font-paragraph text-xs sm:text-sm text-black/70 font-medium">Success Rate</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right side - Visual content */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="relative order-first lg:order-last"
            >
              <div className="relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-100">
                <div className="space-y-6 sm:space-y-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-12 sm:w-16 h-12 sm:h-16 bg-primary rounded-xl sm:rounded-2xl flex items-center justify-center">
                        <BarChart3 className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="font-heading text-lg sm:text-xl font-bold text-black">Growth Dashboard</h3>
                        <p className="font-paragraph text-xs sm:text-sm text-black/60">Real-time performance</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-heading text-2xl sm:text-3xl font-black text-primary">+127%</div>
                      <div className="font-paragraph text-xs text-black/60">This month</div>
                    </div>
                  </div>
                  
                  <div className="space-y-4 sm:space-y-6">
                    <div className="space-y-2 sm:space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-paragraph text-sm text-black font-medium">Conversion Rate</span>
                        <span className="font-paragraph text-sm font-bold text-black">8.4%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2 sm:h-3">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: "84%" }}
                          transition={{ duration: 1.5, delay: 1 }}
                          className="bg-primary h-2 sm:h-3 rounded-full"
                        ></motion.div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 sm:space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-paragraph text-sm text-black font-medium">Revenue Growth</span>
                        <span className="font-paragraph text-sm font-bold text-black">+45%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2 sm:h-3">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: "45%" }}
                          transition={{ duration: 1.5, delay: 1.2 }}
                          className="bg-primary h-2 sm:h-3 rounded-full"
                        ></motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Moving Logos Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-12 sm:mt-14 lg:mt-16 overflow-hidden"
          >
            <div className="relative">
              {/* Gradient overlays for smooth fade effect */}
              <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10"></div>
              <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10"></div>
              
              {/* Moving logos container */}
              <motion.div
                className="flex items-center gap-12 whitespace-nowrap"
                animate={{
                  x: [0, -1600], // Move logos from right to left
                }}
                transition={{
                  duration: 30, // 30 seconds for full cycle
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                {/* First set of logos */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                  className="flex-shrink-0 flex items-center justify-center h-24 px-8"
                >
                  <Image
                    src="https://static.wixstatic.com/media/204237_a574bc224cea40469f28d46e6817c907~mv2.png"
                    alt="Betreuungswelt"
                    width={280}
                    className="max-h-20 w-auto object-contain filter grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.1 }}
                  className="flex-shrink-0 flex items-center justify-center h-24 px-8"
                >
                  <Image
                    src="https://static.wixstatic.com/media/204237_a9e1c74c5892461ca6424190522bbd11~mv2.png"
                    alt="Lagerhaus Ansbach"
                    width={260}
                    className="max-h-20 w-auto object-contain filter grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                  className="flex-shrink-0 flex items-center justify-center h-24 px-8"
                >
                  <Image
                    src="https://static.wixstatic.com/media/204237_9528899566b4430e8e37c76f3c77be74~mv2.png"
                    alt="Tobias Reicheneder"
                    width={260}
                    className="max-h-20 w-auto object-contain filter grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.3 }}
                  className="flex-shrink-0 flex items-center justify-center h-24 px-8"
                >
                  <Image
                    src="https://static.wixstatic.com/media/204237_2f2b825198ae46ecada5d28edc98790f~mv2.png"
                    alt="Meteora"
                    width={240}
                    className="max-h-20 w-auto object-contain filter grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.4 }}
                  className="flex-shrink-0 flex items-center justify-center h-24 px-8"
                >
                  <Image
                    src="https://static.wixstatic.com/media/204237_30dad271092f4ab89418c25e5e80bc23~mv2.png"
                    alt="Dr. Anja Geisler"
                    width={220}
                    className="max-h-20 w-auto object-contain filter grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                  />
                </motion.div>

                {/* New logos */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.5 }}
                  className="flex-shrink-0 flex items-center justify-center h-24 px-8"
                >
                  <Image
                    src="https://static.wixstatic.com/media/204237_9a278266bb5c4d298c84af3382d1be92~mv2.png"
                    alt="VALGI Gebäudeservice"
                    width={260}
                    className="max-h-20 w-auto object-contain filter grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.6 }}
                  className="flex-shrink-0 flex items-center justify-center h-24 px-8"
                >
                  <Image
                    src="https://static.wixstatic.com/media/204237_c4e6e7194c2f4422bb2d8c1b35b0c9ae~mv2.png"
                    alt="HOLZBAU Johannsen"
                    width={260}
                    className="max-h-20 w-auto object-contain filter grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.7 }}
                  className="flex-shrink-0 flex items-center justify-center h-24 px-8"
                >
                  <Image
                    src="https://static.wixstatic.com/media/204237_f097bdb43b4446d299ecdae1f1ab8d2c~mv2.png"
                    alt="STÜBER"
                    width={240}
                    className="max-h-20 w-auto object-contain filter grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                  />
                </motion.div>

                {/* Duplicate set for seamless loop */}
                <motion.div
                  className="flex-shrink-0 flex items-center justify-center h-24 px-8"
                >
                  <Image
                    src="https://static.wixstatic.com/media/204237_a574bc224cea40469f28d46e6817c907~mv2.png"
                    alt="Betreuungswelt"
                    width={280}
                    className="max-h-20 w-auto object-contain filter grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                  />
                </motion.div>
                
                <motion.div
                  className="flex-shrink-0 flex items-center justify-center h-24 px-8"
                >
                  <Image
                    src="https://static.wixstatic.com/media/204237_a9e1c74c5892461ca6424190522bbd11~mv2.png"
                    alt="Lagerhaus Ansbach"
                    width={260}
                    className="max-h-20 w-auto object-contain filter grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                  />
                </motion.div>

                <motion.div
                  className="flex-shrink-0 flex items-center justify-center h-24 px-8"
                >
                  <Image
                    src="https://static.wixstatic.com/media/204237_9528899566b4430e8e37c76f3c77be74~mv2.png"
                    alt="Tobias Reicheneder"
                    width={260}
                    className="max-h-20 w-auto object-contain filter grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                  />
                </motion.div>

                <motion.div
                  className="flex-shrink-0 flex items-center justify-center h-24 px-8"
                >
                  <Image
                    src="https://static.wixstatic.com/media/204237_2f2b825198ae46ecada5d28edc98790f~mv2.png"
                    alt="Meteora"
                    width={240}
                    className="max-h-20 w-auto object-contain filter grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                  />
                </motion.div>

                <motion.div
                  className="flex-shrink-0 flex items-center justify-center h-24 px-8"
                >
                  <Image
                    src="https://static.wixstatic.com/media/204237_30dad271092f4ab89418c25e5e80bc23~mv2.png"
                    alt="Dr. Anja Geisler"
                    width={220}
                    className="max-h-20 w-auto object-contain filter grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                  />
                </motion.div>

                <motion.div
                  className="flex-shrink-0 flex items-center justify-center h-24 px-8"
                >
                  <Image
                    src="https://static.wixstatic.com/media/204237_9a278266bb5c4d298c84af3382d1be92~mv2.png"
                    alt="VALGI Gebäudeservice"
                    width={260}
                    className="max-h-20 w-auto object-contain filter grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                  />
                </motion.div>

                <motion.div
                  className="flex-shrink-0 flex items-center justify-center h-24 px-8"
                >
                  <Image
                    src="https://static.wixstatic.com/media/204237_c4e6e7194c2f4422bb2d8c1b35b0c9ae~mv2.png"
                    alt="HOLZBAU Johannsen"
                    width={260}
                    className="max-h-20 w-auto object-contain filter grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                  />
                </motion.div>

                <motion.div
                  className="flex-shrink-0 flex items-center justify-center h-24 px-8"
                >
                  <Image
                    src="https://static.wixstatic.com/media/204237_f097bdb43b4446d299ecdae1f1ab8d2c~mv2.png"
                    alt="STÜBER"
                    width={240}
                    className="max-h-20 w-auto object-contain filter grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                  />
                </motion.div>

                {/* Third set for extra seamless effect */}
                <motion.div
                  className="flex-shrink-0 flex items-center justify-center h-24 px-8"
                >
                  <Image
                    src="https://static.wixstatic.com/media/204237_a574bc224cea40469f28d46e6817c907~mv2.png"
                    alt="Betreuungswelt"
                    width={280}
                    className="max-h-20 w-auto object-contain filter grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                  />
                </motion.div>
                
                <motion.div
                  className="flex-shrink-0 flex items-center justify-center h-24 px-8"
                >
                  <Image
                    src="https://static.wixstatic.com/media/204237_a9e1c74c5892461ca6424190522bbd11~mv2.png"
                    alt="Lagerhaus Ansbach"
                    width={260}
                    className="max-h-20 w-auto object-contain filter grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                  />
                </motion.div>

                <motion.div
                  className="flex-shrink-0 flex items-center justify-center h-24 px-8"
                >
                  <Image
                    src="https://static.wixstatic.com/media/204237_9528899566b4430e8e37c76f3c77be74~mv2.png"
                    alt="Tobias Reicheneder"
                    width={260}
                    className="max-h-20 w-auto object-contain filter grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                  />
                </motion.div>

                <motion.div
                  className="flex-shrink-0 flex items-center justify-center h-24 px-8"
                >
                  <Image
                    src="https://static.wixstatic.com/media/204237_2f2b825198ae46ecada5d28edc98790f~mv2.png"
                    alt="Meteora"
                    width={240}
                    className="max-h-20 w-auto object-contain filter grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                  />
                </motion.div>

                <motion.div
                  className="flex-shrink-0 flex items-center justify-center h-24 px-8"
                >
                  <Image
                    src="https://static.wixstatic.com/media/204237_30dad271092f4ab89418c25e5e80bc23~mv2.png"
                    alt="Dr. Anja Geisler"
                    width={220}
                    className="max-h-20 w-auto object-contain filter grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                  />
                </motion.div>

                <motion.div
                  className="flex-shrink-0 flex items-center justify-center h-24 px-8"
                >
                  <Image
                    src="https://static.wixstatic.com/media/204237_9a278266bb5c4d298c84af3382d1be92~mv2.png"
                    alt="VALGI Gebäudeservice"
                    width={260}
                    className="max-h-20 w-auto object-contain filter grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                  />
                </motion.div>

                <motion.div
                  className="flex-shrink-0 flex items-center justify-center h-24 px-8"
                >
                  <Image
                    src="https://static.wixstatic.com/media/204237_c4e6e7194c2f4422bb2d8c1b35b0c9ae~mv2.png"
                    alt="HOLZBAU Johannsen"
                    width={260}
                    className="max-h-20 w-auto object-contain filter grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                  />
                </motion.div>

                <motion.div
                  className="flex-shrink-0 flex items-center justify-center h-24 px-8"
                >
                  <Image
                    src="https://static.wixstatic.com/media/204237_f097bdb43b4446d299ecdae1f1ab8d2c~mv2.png"
                    alt="STÜBER"
                    width={240}
                    className="max-h-20 w-auto object-contain filter grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                  />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Trusted Partners Section */}
      {/* Real-Time Performance Dashboard */}
      <section className="pt-2 sm:pt-3 lg:pt-4 pb-6 sm:pb-8 lg:pb-10 bg-white">
        <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-6xl font-black text-black mb-4 sm:mb-6 leading-tight">
              Real-Time
              <span className="text-primary block">Performance Dashboard</span>
            </h2>
            <p className="font-paragraph text-lg sm:text-xl text-black/70 max-w-3xl mx-auto leading-relaxed">
              Monitor your Google Ads campaigns with our advanced analytics dashboard
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-gray-100"
          >
            <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Left Column - Metrics */}
              <div className="lg:col-span-1 space-y-6">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-black">Campaign Performance</h3>
                    <p className="font-paragraph text-sm text-black/60">Last 30 days</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-paragraph text-sm text-black font-medium">Click-Through Rate</span>
                      <span className="font-heading text-lg font-bold text-primary">12.4%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: "84%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="bg-primary h-2 rounded-full"
                      ></motion.div>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-paragraph text-sm text-black font-medium">Conversion Rate</span>
                      <span className="font-heading text-lg font-bold text-primary">8.7%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: "67%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: 0.7 }}
                        className="bg-primary h-2 rounded-full"
                      ></motion.div>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-paragraph text-sm text-black font-medium">Quality Score</span>
                      <span className="font-heading text-lg font-bold text-primary">9.2/10</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: "92%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: 0.9 }}
                        className="bg-primary h-2 rounded-full"
                      ></motion.div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Dashboard Area */}
              <div className="lg:col-span-2">
                <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8">
                  {/* Dashboard Header */}
                  <div className="text-center mb-8">
                    <h4 className="font-heading text-xl sm:text-2xl font-bold text-black mb-2">Google Ads Dashboard</h4>
                  </div>

                  {/* Main Metrics Row */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
                    <div className="text-center">
                      <div className="font-heading text-2xl sm:text-3xl lg:text-4xl font-black text-black mb-1">127</div>
                      <div className="font-paragraph text-xs sm:text-sm text-black font-medium mb-1">New Inquiries</div>
                      <div className="font-paragraph text-xs text-primary">+12% this week</div>
                    </div>
                    <div className="text-center">
                      <div className="font-heading text-2xl sm:text-3xl lg:text-4xl font-black text-black mb-1">2,431</div>
                      <div className="font-paragraph text-xs sm:text-sm text-black font-medium mb-1">Clicks</div>
                      <div className="font-paragraph text-xs text-primary">+8% this week</div>
                    </div>
                    <div className="text-center">
                      <div className="font-heading text-2xl sm:text-3xl lg:text-4xl font-black text-black mb-1">16.7%</div>
                      <div className="font-paragraph text-xs sm:text-sm text-black font-medium mb-1">Conversion Rate</div>
                      <div className="font-paragraph text-xs text-primary">+5% this week</div>
                    </div>
                    <div className="text-center">
                      <div className="font-heading text-2xl sm:text-3xl lg:text-4xl font-black text-black mb-1">4.2x</div>
                      <div className="font-paragraph text-xs sm:text-sm text-black font-medium mb-1">ROAS</div>
                      <div className="font-paragraph text-xs text-primary">+15% this week</div>
                    </div>
                  </div>

                  {/* Campaign Details */}
                  <div className="border-t border-gray-100 pt-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-3 border-b border-gray-50">
                        <div>
                          <div className="font-paragraph text-sm font-medium text-black">Local Plumbing Services</div>
                        </div>
                        <div className="text-right">
                          <div className="font-paragraph text-sm text-black">€45/day • 12 inquiries</div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-gray-50">
                        <div>
                          <div className="font-paragraph text-sm font-medium text-black">Electrical Repair Campaign</div>
                        </div>
                        <div className="text-right">
                          <div className="font-paragraph text-sm text-black">€38/day • 8 inquiries</div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center py-3">
                        <div>
                          <div className="font-paragraph text-sm font-medium text-black">HVAC Installation</div>
                        </div>
                        <div className="text-right">
                          <div className="font-paragraph text-sm text-black">€52/day • 15 inquiries</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Green accent line separator */}
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="w-24 h-1 bg-primary mx-auto mt-12 rounded-full"
          ></motion.div>
        </div>
      </section>
      {/* Three Step Process Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-6xl font-black text-black mb-4 sm:mb-6 leading-tight">
              How We Transform
              <span className="text-primary block">Your Business</span>
            </h2>
            <p className="font-paragraph text-lg sm:text-xl text-black/70 max-w-3xl mx-auto leading-relaxed">
              Our proven 3-step process that converts local search queries into customer appointments
            </p>
          </motion.div>

          <div className="relative">
            {/* Progress Line */}
            <div className="hidden lg:block absolute top-24 left-1/2 transform -translate-x-1/2 w-full max-w-4xl">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, delay: 0.5 }}
                className="h-1 bg-primary rounded-full origin-left"
              ></motion.div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 relative">
              {/* Step 1 */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-center relative"
              >
                {/* Step Number */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4, type: "spring", stiffness: 200 }}
                  className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 relative z-10"
                >
                  <span className="font-heading text-2xl font-black text-white">1</span>
                </motion.div>

                {/* Content */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 shadow-lg"
                >
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-black mb-4">
                    Target group setup and strategy
                  </h3>
                  <div className="space-y-3 text-left">
                    <p className="font-paragraph text-sm text-black/70">
                      We analyze your target group and build your landing strategy for predictable customer inquiries - data-driven, local, relevant.
                    </p>
                    <div className="space-y-2">
                      <div className="font-paragraph text-xs text-black/60">
                        • Keyword research (long/tail/shortail keywords)
                      </div>
                      <div className="font-paragraph text-xs text-black/60">
                        • Local boundaries (e.g. Düsseldorf 15km)
                      </div>
                      <div className="font-paragraph text-xs text-black/60">
                        • Objectives of acquisition (appointment booking / call / purchase)
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Step 2 */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-center relative"
              >
                {/* Step Number */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6, type: "spring", stiffness: 200 }}
                  className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 relative z-10"
                >
                  <span className="font-heading text-2xl font-black text-white">2</span>
                </motion.div>

                {/* Content */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 shadow-lg"
                >
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-black mb-4">
                    Google Ads + Landing Page
                  </h3>
                  <div className="space-y-3 text-left">
                    <p className="font-paragraph text-sm text-black/70">
                      Depending on the offer, we will build appropriate landing page for the cheapest ads and track everything in the background - you don't have to worry about anything.
                    </p>
                    <div className="space-y-2">
                      <div className="font-paragraph text-xs text-black/60">
                        • Local Phone Number Near You
                      </div>
                      <div className="font-paragraph text-xs text-black/60">
                        • Landing Page or Book Appointment
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Step 3 */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-center relative"
              >
                {/* Step Number */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.8, type: "spring", stiffness: 200 }}
                  className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 relative z-10"
                >
                  <span className="font-heading text-2xl font-black text-white">3</span>
                </motion.div>

                {/* Content */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 1.0 }}
                  className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 shadow-lg"
                >
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-black mb-4">
                    Customer inquiries & optimization
                  </h3>
                  <div className="space-y-3 text-left">
                    <p className="font-paragraph text-sm text-black/70">
                      You will receive your first customer inquiries after just 24-72 hours, then continually optimize everything for maximum results.
                    </p>
                    <div className="space-y-2">
                      <div className="font-paragraph text-xs text-primary font-medium">
                        New Inquiry: John D. - Plumbing Emergency
                      </div>
                      <div className="font-paragraph text-xs text-primary font-medium">
                        New Inquiry: Sarah K. - Kitchen Renovation
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Results Summary */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-center mt-12 sm:mt-16"
          >
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto">
              <h4 className="font-heading text-xl sm:text-2xl font-bold text-primary mb-4">
                Start receiving customer inquiries in 24-72 hours
              </h4>
              <p className="font-paragraph text-black/70 mb-6">
                Our proven system transforms local search queries into qualified customer appointments for your business.
              </p>
              <Button asChild size="lg" className="bg-primary text-white hover:bg-primary-hover px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-full">
                <Link to="/contact">Start Your 3-Step Journey</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-6xl font-black text-black mb-4 sm:mb-6 leading-tight">
              Why Choose
              <span className="text-primary block">LetsGrowPro?</span>
            </h2>
            <p className="font-paragraph text-lg sm:text-xl text-black/70 max-w-3xl mx-auto leading-relaxed">
              We combine proven strategies with cutting-edge technology to deliver exceptional results
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: Rocket,
                title: "Rapid Growth",
                description: "Accelerate your business growth with our proven methodologies and data-driven approach."
              },
              {
                icon: Target,
                title: "Targeted Strategy",
                description: "Custom strategies tailored to your specific industry, audience, and business goals."
              },
              {
                icon: BarChart3,
                title: "Data-Driven Results",
                description: "Every decision backed by comprehensive analytics and performance metrics."
              },
              {
                icon: Shield,
                title: "Proven Track Record",
                description: "Over 250% average ROI increase across all our client partnerships."
              },
              {
                icon: Users,
                title: "Expert Team",
                description: "Dedicated growth specialists with years of experience in performance marketing."
              },
              {
                icon: Zap,
                title: "Fast Implementation",
                description: "Quick setup and execution to start seeing results within the first 30 days."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white rounded-2xl p-6 sm:p-8 text-center hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <motion.div 
                  className="w-12 sm:w-16 h-12 sm:h-16 bg-primary rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <feature.icon className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
                </motion.div>
                <h3 className="font-heading text-lg sm:text-xl font-bold text-black mb-3 sm:mb-4">
                  {feature.title}
                </h3>
                <p className="font-paragraph text-sm sm:text-base text-black/70 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Services Preview */}
      {/* Case Studies Preview */}
      {/* Process Section */}
      {/* Track Record Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-6xl font-black text-black mb-4 sm:mb-6 leading-tight">
              Our track record –
              <span className="text-primary block">your Security</span>
            </h2>
            <p className="font-paragraph text-lg sm:text-xl text-black/70 max-w-3xl mx-auto leading-relaxed">
              Visibility on Google doesn't have to be complicated. With the help of AI, we reduce your time and maximize your results.
            </p>
          </motion.div>

          {/* Statistics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16 sm:mb-20">
            {[
              { number: "529+", label: "Projects", color: "text-primary" },
              { number: "60", label: "Minutes time commitment", color: "text-primary" },
              { number: "24", label: "Hours to first inquiries", color: "text-primary" },
              { number: "14.6", label: "Average ROAS", color: "text-primary" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="text-center"
              >
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.6, type: "spring", stiffness: 200 }}
                  className={`font-heading text-4xl sm:text-5xl lg:text-6xl font-black ${stat.color} mb-2`}
                >
                  {stat.number}
                </motion.div>
                <div className="font-paragraph text-sm sm:text-base text-black/70 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Customer Reviews Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-6xl font-black text-black mb-4 sm:mb-6 leading-tight">
              What Local Businesses
              <span className="text-primary block">Say About Us</span>
            </h2>
            <p className="font-paragraph text-lg sm:text-xl text-black/70 max-w-3xl mx-auto leading-relaxed">
              Real reviews from local business owners who transformed their customer acquisition
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Review 1 - Massage Parlor (Female) */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.8 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 hover:shadow-xl transition-all duration-300 group"
            >
              <motion.div 
                className="flex items-center mb-4 sm:mb-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.5 }}
                  >
                    <Star className="w-4 sm:w-5 h-4 sm:h-5 text-primary fill-current" />
                  </motion.div>
                ))}
              </motion.div>
              <p className="font-paragraph text-black/80 mb-6 sm:mb-8 text-sm sm:text-base leading-relaxed">
                "Within 48 hours of launching our Google Ads campaign, we had 12 new massage appointments booked. Our phone hasn't stopped ringing since!"
              </p>
              <motion.div 
                className="flex items-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Image
                  src="https://static.wixstatic.com/media/204237_fde0f32d4d1c47d4a6a9235be443815a~mv2.png?originWidth=128&originHeight=128"
                  alt="Sarah Chen"
                  width={56}
                  className="w-12 sm:w-14 h-12 sm:h-14 rounded-full object-cover mr-3 sm:mr-4"
                />
                <div>
                  <div className="font-heading text-sm sm:text-base font-bold text-black">
                    Sarah Chen
                  </div>
                  <div className="font-paragraph text-xs sm:text-sm text-black/60">
                    Owner, Zen Massage Therapy
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Review 2 - Auto Repair Shop (Male) */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 hover:shadow-xl transition-all duration-300 group"
            >
              <motion.div 
                className="flex items-center mb-4 sm:mb-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.6 }}
                  >
                    <Star className="w-4 sm:w-5 h-4 sm:h-5 text-primary fill-current" />
                  </motion.div>
                ))}
              </motion.div>
              <p className="font-paragraph text-black/80 mb-6 sm:mb-8 text-sm sm:text-base leading-relaxed">
                "My auto shop went from 3-4 customers per day to being booked solid for weeks. The local ads brought in exactly the customers I needed."
              </p>
              <motion.div 
                className="flex items-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Image
                  src="https://static.wixstatic.com/media/204237_6de4a6d7b4164683b92b17637940d536~mv2.png?originWidth=128&originHeight=128"
                  alt="David Martinez"
                  width={56}
                  className="w-12 sm:w-14 h-12 sm:h-14 rounded-full object-cover mr-3 sm:mr-4"
                />
                <div>
                  <div className="font-heading text-sm sm:text-base font-bold text-black">
                    David Martinez
                  </div>
                  <div className="font-paragraph text-xs sm:text-sm text-black/60">
                    Owner, Martinez Auto Repair
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Review 3 - Spa (Female) */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 hover:shadow-xl transition-all duration-300 group"
            >
              <motion.div 
                className="flex items-center mb-4 sm:mb-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.7 }}
                  >
                    <Star className="w-4 sm:w-5 h-4 sm:h-5 text-primary fill-current" />
                  </motion.div>
                ))}
              </motion.div>
              <p className="font-paragraph text-black/80 mb-6 sm:mb-8 text-sm sm:text-base leading-relaxed">
                "The ROI has been incredible. We spent €800 on ads last month and generated €12,000 in new bookings. Best investment we've ever made!"
              </p>
              <motion.div 
                className="flex items-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Image
                  src="https://static.wixstatic.com/media/204237_caa093ad911147aa984c9f8afd27736b~mv2.png?originWidth=128&originHeight=128"
                  alt="Emma Thompson"
                  width={56}
                  className="w-12 sm:w-14 h-12 sm:h-14 rounded-full object-cover mr-3 sm:mr-4"
                />
                <div>
                  <div className="font-heading text-sm sm:text-base font-bold text-black">
                    Emma Thompson
                  </div>
                  <div className="font-paragraph text-xs sm:text-sm text-black/60">
                    Owner, Serenity Day Spa
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Review 4 - Plumbing Business (Male) */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 hover:shadow-xl transition-all duration-300 group"
            >
              <motion.div 
                className="flex items-center mb-4 sm:mb-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.8 }}
                  >
                    <Star className="w-4 sm:w-5 h-4 sm:h-5 text-primary fill-current" />
                  </motion.div>
                ))}
              </motion.div>
              <p className="font-paragraph text-black/80 mb-6 sm:mb-8 text-sm sm:text-base leading-relaxed">
                "Emergency calls increased by 300% and regular maintenance bookings doubled. LetsGrowPro's targeting brought me the high-value customers I needed."
              </p>
              <motion.div 
                className="flex items-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Image
                  src="https://static.wixstatic.com/media/204237_dd182be4ca784e8eb4239d95e5a402a3~mv2.png?originWidth=128&originHeight=128"
                  alt="Robert Wilson"
                  width={56}
                  className="w-12 sm:w-14 h-12 sm:h-14 rounded-full object-cover mr-3 sm:mr-4"
                />
                <div>
                  <div className="font-heading text-sm sm:text-base font-bold text-black">
                    Robert Wilson
                  </div>
                  <div className="font-paragraph text-xs sm:text-sm text-black/60">
                    Owner, Wilson Plumbing Services
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Review 5 - Barbershop (Male) */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 hover:shadow-xl transition-all duration-300 group"
            >
              <motion.div 
                className="flex items-center mb-4 sm:mb-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
              >
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.9 }}
                  >
                    <Star className="w-4 sm:w-5 h-4 sm:h-5 text-primary fill-current" />
                  </motion.div>
                ))}
              </motion.div>
              <p className="font-paragraph text-black/80 mb-6 sm:mb-8 text-sm sm:text-base leading-relaxed">
                "My barbershop went from struggling to survive to having a 2-week waiting list. The local targeting brought exactly the right customers to my door."
              </p>
              <motion.div 
                className="flex items-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Image
                  src="https://static.wixstatic.com/media/204237_3e23de07befa433890d43bb9975b808b~mv2.png?originWidth=128&originHeight=128"
                  alt="Mike Johnson"
                  width={56}
                  className="w-12 sm:w-14 h-12 sm:h-14 rounded-full object-cover mr-3 sm:mr-4"
                />
                <div>
                  <div className="font-heading text-sm sm:text-base font-bold text-black">
                    Mike Johnson
                  </div>
                  <div className="font-paragraph text-xs sm:text-sm text-black/60">
                    Owner, Classic Cuts Barbershop
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Review 6 - Beauty Salon (Female) */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 hover:shadow-xl transition-all duration-300 group"
            >
              <motion.div 
                className="flex items-center mb-4 sm:mb-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
              >
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 1.0 }}
                  >
                    <Star className="w-4 sm:w-5 h-4 sm:h-5 text-primary fill-current" />
                  </motion.div>
                ))}
              </motion.div>
              <p className="font-paragraph text-black/80 mb-6 sm:mb-8 text-sm sm:text-base leading-relaxed">
                "The team understood our local market perfectly. We now rank #1 for 'beauty salon near me' and our revenue has tripled in 6 months."
              </p>
              <motion.div 
                className="flex items-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Image
                  src="https://static.wixstatic.com/media/204237_b9e6725bbfee4a69aa04c40266450076~mv2.png?originWidth=128&originHeight=128"
                  alt="Lisa Wang"
                  width={56}
                  className="w-12 sm:w-14 h-12 sm:h-14 rounded-full object-cover mr-3 sm:mr-4"
                />
                <div>
                  <div className="font-heading text-sm sm:text-base font-bold text-black">
                    Lisa Wang
                  </div>
                  <div className="font-paragraph text-xs sm:text-sm text-black/60">
                    Owner, Glow Beauty Lounge
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-center mt-8 sm:mt-12"
            >
              <Button asChild size="lg" className="bg-primary text-white hover:bg-primary-hover px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-full">
                <Link to="/case-studies">View All Case Studies</Link>
              </Button>
            </motion.div>
        </div>
      </section>
      {/* Final CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-primary">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6 sm:space-y-8"
          >
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-6xl font-black text-white leading-tight">
              Ready to Scale
              <span className="block">Your Business?</span>
            </h2>
            <p className="font-paragraph text-lg sm:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Join hundreds of successful companies who have transformed their growth with our proven strategies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button asChild size="lg" variant="outline" className="bg-white text-primary border-white hover:bg-gray-100 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-full w-full sm:w-auto">
                  <Link to="/contact">Get Your Free Consultation</Link>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button asChild size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-full w-full sm:w-auto">
                  <Link to="/case-studies">View Our Work</Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-black py-12 sm:py-16">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
            <div className="space-y-4 sm:space-y-6 sm:col-span-2 lg:col-span-1">
              <div className="font-heading text-xl sm:text-2xl font-black text-white">LetsGrowPro</div>
              <p className="font-paragraph text-white/70 leading-relaxed text-sm sm:text-base">
                Growth marketing & performance agency dedicated to scaling ambitious businesses.
              </p>
            </div>
            
            <div className="space-y-4 sm:space-y-6">
              <div className="font-heading text-base sm:text-lg font-bold text-white">Pages</div>
              <div className="space-y-2 sm:space-y-3">
                <Link to="/case-studies" className="block font-paragraph text-sm sm:text-base text-white/70 hover:text-primary transition-colors">
                  Case Studies
                </Link>
                <Link to="/faq" className="block font-paragraph text-sm sm:text-base text-white/70 hover:text-primary transition-colors">
                  FAQ
                </Link>
                <Link to="/contact" className="block font-paragraph text-sm sm:text-base text-white/70 hover:text-primary transition-colors">
                  Contact
                </Link>
              </div>
            </div>
            
            <div className="space-y-4 sm:space-y-6">
              <div className="font-heading text-base sm:text-lg font-bold text-white">Contact</div>
              <div className="space-y-2 sm:space-y-3">
                <p className="font-paragraph text-sm sm:text-base text-white/70">letsgrowprowithus@gmail.com</p>
                <p className="font-paragraph text-sm sm:text-base text-white/70">+91 8449460557</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-12 sm:mt-16 pt-6 sm:pt-8 text-center">
            <p className="font-paragraph text-sm sm:text-base text-white/70">
              © 2024 LetsGrowPro. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}