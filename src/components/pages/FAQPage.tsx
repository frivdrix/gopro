import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BaseCrudService } from '@/integrations';
import { FrequentlyAskedQuestions } from '@/entities';

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FrequentlyAskedQuestions[]>([]);
  const [filteredFaqs, setFilteredFaqs] = useState<FrequentlyAskedQuestions[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const { items } = await BaseCrudService.getAll<FrequentlyAskedQuestions>('frequentlyaskedquestions');
        const sortedFaqs = items.sort((a, b) => {
          // Featured items first, then by display order
          if (a.isFeatured && !b.isFeatured) return -1;
          if (!a.isFeatured && b.isFeatured) return 1;
          return (a.displayOrder || 0) - (b.displayOrder || 0);
        });
        setFaqs(sortedFaqs);
        setFilteredFaqs(sortedFaqs);
      } catch (error) {
        console.error('Error fetching FAQs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  useEffect(() => {
    let filtered = faqs;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(faq => faq.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(faq => 
        faq.question?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredFaqs(filtered);
  }, [faqs, selectedCategory, searchTerm]);

  const categories = ['All', ...Array.from(new Set(faqs.map(faq => faq.category).filter(Boolean)))];

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="font-heading text-xl text-primary">Loading FAQs...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="font-heading text-xl font-bold text-primary">
              LetsGrowPro
            </Link>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/case-studies" className="font-paragraph text-sm text-black hover:text-primary transition-colors">
                Case Studies
              </Link>
              <Link to="/faq" className="font-paragraph text-sm text-primary font-semibold">
                FAQ
              </Link>
              <Link to="/contact" className="font-paragraph text-sm text-black hover:text-primary transition-colors">
                Contact
              </Link>
            </div>

            <Button asChild className="bg-primary text-white hover:bg-primary-hover">
              <Link to="/contact">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="font-heading text-5xl lg:text-7xl font-black text-primary mb-8">
              FREQUENTLY ASKED QUESTIONS
            </h1>
            <p className="font-paragraph text-xl text-black/80 leading-relaxed mb-12">
              Find answers to common questions about our services, processes, and how we can help grow your business.
            </p>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search FAQs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-gray-300 focus:border-primary text-black"
                />
              </div>
              
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md bg-white text-black focus:border-primary focus:outline-none"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="pb-20">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-paragraph text-lg text-black/70 mb-8">
                {searchTerm || selectedCategory !== 'All' 
                  ? 'No FAQs found matching your criteria.' 
                  : 'No FAQs available at the moment.'
                }
              </p>
              {(searchTerm || selectedCategory !== 'All') && (
                <Button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All');
                  }}
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-white"
                >
                  Clear Filters
                </Button>
              )}
            </div>
          ) : (
            <div className="max-w-4xl mx-auto">
              {/* Featured FAQs */}
              {filteredFaqs.some(faq => faq.isFeatured) && (
                <div className="mb-16">
                  <h2 className="font-heading text-3xl font-bold text-primary mb-8 text-center">
                    Most Popular Questions
                  </h2>
                  <div className="space-y-4">
                    {filteredFaqs
                      .filter(faq => faq.isFeatured)
                      .map((faq, index) => (
                        <motion.div
                          key={faq._id}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-primary/5 border border-primary/20 rounded-2xl overflow-hidden"
                        >
                          <button
                            onClick={() => toggleItem(faq._id)}
                            className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-primary/10 transition-colors"
                          >
                            <h3 className="font-heading text-lg font-bold text-primary pr-4">
                              {faq.question}
                            </h3>
                            {openItems.has(faq._id) ? (
                              <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-primary flex-shrink-0" />
                            )}
                          </button>
                          
                          {openItems.has(faq._id) && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="px-8 pb-6"
                            >
                              <p className="font-paragraph text-black/80 leading-relaxed">
                                {faq.answer}
                              </p>
                            </motion.div>
                          )}
                        </motion.div>
                      ))}
                  </div>
                </div>
              )}

              {/* All FAQs */}
              <div>
                {filteredFaqs.some(faq => faq.isFeatured) && (
                  <h2 className="font-heading text-3xl font-bold text-primary mb-8 text-center">
                    All Questions
                  </h2>
                )}
                
                <div className="space-y-4">
                  {filteredFaqs
                    .filter(faq => !faq.isFeatured)
                    .map((faq, index) => (
                      <motion.div
                        key={faq._id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow"
                      >
                        <button
                          onClick={() => toggleItem(faq._id)}
                          className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex-grow pr-4">
                            <h3 className="font-heading text-lg font-bold text-primary mb-2">
                              {faq.question}
                            </h3>
                            {faq.category && (
                              <span className="inline-block px-3 py-1 bg-gray-100 text-black/70 text-xs font-paragraph rounded-full">
                                {faq.category}
                              </span>
                            )}
                          </div>
                          {openItems.has(faq._id) ? (
                            <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-primary flex-shrink-0" />
                          )}
                        </button>
                        
                        {openItems.has(faq._id) && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="px-8 pb-6 border-t border-gray-200"
                          >
                            <p className="font-paragraph text-black/80 leading-relaxed pt-6">
                              {faq.answer}
                            </p>
                          </motion.div>
                        )}
                      </motion.div>
                    ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-20 border-t border-gray-200">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="font-heading text-4xl lg:text-5xl font-bold text-primary mb-6">
              STILL HAVE QUESTIONS?
            </h2>
            <p className="font-paragraph text-lg text-black/70 mb-8 leading-relaxed">
              Can't find the answer you're looking for? Our team is here to help. 
              Get in touch and we'll respond as quickly as possible.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary text-white hover:bg-primary-hover">
                <Link to="/contact">Contact Our Team</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                <Link to="/case-studies">Learn About Our Work</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="font-heading text-4xl lg:text-6xl font-bold text-white">
              READY TO GET STARTED?
            </h2>
            <p className="font-paragraph text-xl text-white max-w-2xl mx-auto">
              Don't let questions hold you back. Start your growth journey today with a free consultation.
            </p>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              <Link to="/contact">Get Your Free Consultation</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="font-heading text-xl font-bold text-primary">LetsGrowPro</div>
              <p className="font-paragraph text-black/70">
                Growth marketing & performance agency dedicated to scaling ambitious businesses.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="font-heading text-lg font-bold text-primary">Pages</div>
              <div className="space-y-2">
                <Link to="/case-studies" className="block font-paragraph text-sm text-black/70 hover:text-primary transition-colors">
                  Case Studies
                </Link>
                <Link to="/faq" className="block font-paragraph text-sm text-black/70 hover:text-primary transition-colors">
                  FAQ
                </Link>
                <Link to="/contact" className="block font-paragraph text-sm text-black/70 hover:text-primary transition-colors">
                  Contact
                </Link>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="font-heading text-lg font-bold text-primary">Contact</div>
              <div className="space-y-2">
                <p className="font-paragraph text-sm text-black/70">letsgrowprowithus@gmail.com</p>
                <p className="font-paragraph text-sm text-black/70">+91 8449460557</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-12 pt-8 text-center">
            <p className="font-paragraph text-sm text-black/70">
              © 2024 LetsGrowPro. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}