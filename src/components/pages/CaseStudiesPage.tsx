import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink, Calendar, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { BaseCrudService } from '@/integrations';
import { CaseStudies } from '@/entities';
import { format } from 'date-fns';

export default function CaseStudiesPage() {
  const [caseStudies, setCaseStudies] = useState<CaseStudies[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        const { items } = await BaseCrudService.getAll<CaseStudies>('casestudies');
        setCaseStudies(items);
      } catch (error) {
        console.error('Error fetching case studies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCaseStudies();
  }, []);

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return '';
    try {
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      return format(dateObj, 'MMMM yyyy');
    } catch {
      return '';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="font-heading text-xl text-black">Loading case studies...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
            <Link to="/" className="font-heading text-lg sm:text-xl font-black text-black flex-shrink-0">
              LetsGrowPro
            </Link>
            
            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              <Link to="/case-studies" className="font-paragraph text-base text-primary font-semibold">
                Case Studies
              </Link>
              <Link to="/faq" className="font-paragraph text-base text-black hover:text-primary transition-colors font-medium">
                FAQ
              </Link>
              <Link to="/contact" className="font-paragraph text-base text-black hover:text-primary transition-colors font-medium">
                Contact
              </Link>
            </div>

            <Button asChild className="bg-primary text-white hover:bg-primary-hover px-3 sm:px-4 lg:px-6 py-2 sm:py-3 font-semibold rounded-full text-xs sm:text-sm lg:text-base whitespace-nowrap min-w-[90px] sm:min-w-[100px] flex-shrink-0">
              <Link to="/contact">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-12 sm:py-16 lg:py-24">
        <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-7xl font-black text-black mb-6 sm:mb-8 leading-tight">
              SUCCESS STORIES
            </h1>
            <p className="font-paragraph text-lg sm:text-xl text-black/80 leading-relaxed">
              Real results from real clients who trusted us to grow their business. 
              Discover how our proven strategies have transformed companies across various industries.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="pb-12 sm:pb-16 lg:pb-20">
        <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8">
          {caseStudies.length === 0 ? (
            <div className="text-center py-12 sm:py-16 lg:py-20">
              <p className="font-paragraph text-lg text-black/80">
                No case studies available at the moment.
              </p>
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12">
              {caseStudies.map((study, index) => (
                <motion.div
                  key={study._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <div className="bg-white border border-gray-100 rounded-2xl sm:rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300">
                    {/* Case Study Image */}
                    <div className="aspect-video bg-gray-50 flex items-center justify-center">
                      <Image
                        src={study.thumbnailImage || 'https://static.wixstatic.com/media/204237_c9494b0e9e44400286b8874144f58fe5~mv2.png?originWidth=576&originHeight=320'}
                        alt={study.caseStudyTitle || 'Case study'}
                        width={600}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Case Study Content */}
                    <div className="p-6 sm:p-8 lg:p-12">
                      {/* Meta Information */}
                      <div className="flex flex-wrap gap-3 sm:gap-4 mb-4 sm:mb-6">
                        {study.industry && (
                          <div className="flex items-center gap-2 text-black/70">
                            <Building className="w-4 h-4" />
                            <span className="font-paragraph text-sm">{study.industry}</span>
                          </div>
                        )}
                        {study.completionDate && (
                          <div className="flex items-center gap-2 text-black/70">
                            <Calendar className="w-4 h-4" />
                            <span className="font-paragraph text-sm">{formatDate(study.completionDate)}</span>
                          </div>
                        )}
                      </div>

                      <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-3 sm:mb-4 leading-tight">
                        {study.caseStudyTitle}
                      </h2>
                      
                      {study.clientName && (
                        <p className="font-paragraph text-base sm:text-lg text-black/70 mb-6 sm:mb-8">
                          Client: {study.clientName}
                        </p>
                      )}

                      {/* Challenge */}
                      {study.challenge && (
                        <div className="mb-6 sm:mb-8">
                          <h3 className="font-heading text-lg sm:text-xl font-bold text-black mb-3 sm:mb-4">
                            The Challenge
                          </h3>
                          <p className="font-paragraph text-sm sm:text-base text-black/70 leading-relaxed">
                            {study.challenge}
                          </p>
                        </div>
                      )}

                      {/* Solution */}
                      {study.solution && (
                        <div className="mb-6 sm:mb-8">
                          <h3 className="font-heading text-lg sm:text-xl font-bold text-black mb-3 sm:mb-4">
                            Our Solution
                          </h3>
                          <p className="font-paragraph text-sm sm:text-base text-black/70 leading-relaxed">
                            {study.solution}
                          </p>
                        </div>
                      )}

                      {/* Results */}
                      {study.results && (
                        <div className="mb-6 sm:mb-8">
                          <h3 className="font-heading text-lg sm:text-xl font-bold text-black mb-3 sm:mb-4">
                            The Results
                          </h3>
                          <p className="font-paragraph text-sm sm:text-base text-black/70 leading-relaxed">
                            {study.results}
                          </p>
                        </div>
                      )}

                      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                        <Button asChild className="bg-primary text-white hover:bg-primary-hover px-4 sm:px-6 py-2 sm:py-3 font-semibold rounded-full text-sm sm:text-base">
                          <Link to="/contact">
                            Get Similar Results
                          </Link>
                        </Button>
                        
                        {study.projectUrl && (
                          <Button asChild variant="outline" className="border-2 border-black text-black hover:bg-black hover:text-white px-4 sm:px-6 py-2 sm:py-3 font-semibold rounded-full text-sm sm:text-base">
                            <a href={study.projectUrl} target="_blank" rel="noopener noreferrer">
                              View Project
                              <ExternalLink className="ml-2 h-4 w-4" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Results Overview */}
      <section className="py-12 sm:py-16 lg:py-20 border-t border-gray-100">
        <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-4 sm:mb-6 leading-tight">
              PROVEN RESULTS ACROSS INDUSTRIES
            </h2>
            <p className="font-paragraph text-base sm:text-lg text-black/70 max-w-2xl mx-auto">
              Our data-driven approach consistently delivers exceptional outcomes for businesses of all sizes
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {[
              { metric: "250%", label: "Average ROI Increase", description: "Across all campaigns" },
              { metric: "50+", label: "Successful Projects", description: "Completed to date" },
              { metric: "98%", label: "Client Satisfaction", description: "Rate of retention" },
              { metric: "15+", label: "Industries Served", description: "Diverse expertise" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center bg-white border border-gray-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8"
              >
                <div className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-2">
                  {stat.metric}
                </div>
                <div className="font-heading text-sm sm:text-base lg:text-lg font-bold text-black mb-1 sm:mb-2">
                  {stat.label}
                </div>
                <div className="font-paragraph text-xs sm:text-sm text-black/70">
                  {stat.description}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-primary">
        <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6 sm:space-y-8"
          >
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-6xl font-bold text-white leading-tight">
              READY TO BE OUR NEXT SUCCESS STORY?
            </h2>
            <p className="font-paragraph text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
              Let's create a case study that showcases your business transformation and remarkable growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button asChild size="lg" variant="outline" className="bg-white text-primary border-white hover:bg-gray-100 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-full">
                <Link to="/contact">Start Your Success Story</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-full">
                <Link to="/case-studies">Explore More Case Studies</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12 sm:py-16">
        <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8">
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