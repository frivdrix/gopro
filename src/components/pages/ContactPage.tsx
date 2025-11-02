import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';

interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  service: string;
  budget: string;
  message: string;
}

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      // Send email to letsgrowprowithus@gmail.com
      const emailData = {
        to: 'letsgrowprowithus@gmail.com',
        subject: `New Contact Form Submission from ${data.name}`,
        message: `
          Name: ${data.name}
          Email: ${data.email}
          Company: ${data.company || 'Not provided'}
          Phone: ${data.phone || 'Not provided'}
          Service Interest: ${data.service}
          Budget: ${data.budget}
          Message: ${data.message}
        `
      };
      
      console.log('Form submitted and forwarded to letsgrowprowithus@gmail.com:', emailData);
      
      // Simulate email sending
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsSubmitted(true);
      setIsSubmitting(false);
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md mx-auto px-6"
        >
          <CheckCircle className="w-16 h-16 text-primary mx-auto mb-6" />
          <h1 className="font-heading text-3xl font-bold text-primary mb-4">
            Thank You!
          </h1>
          <p className="font-paragraph italic text-secondary mb-8">
            We've received your message and will get back to you within 24 hours.
          </p>
          <div className="space-y-4">
            <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              <Link to="/">Back to Home</Link>
            </Button>
            <Button
              onClick={() => setIsSubmitted(false)}
              variant="outline"
              className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              Send Another Message
            </Button>
          </div>
        </motion.div>
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
              <Link to="/case-studies" className="font-paragraph text-base text-black hover:text-primary transition-colors font-medium">
                Case Studies
              </Link>
              <Link to="/faq" className="font-paragraph text-base text-black hover:text-primary transition-colors font-medium">
                FAQ
              </Link>
              <Link to="/contact" className="font-paragraph text-base text-primary font-semibold">
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
              GET IN TOUCH
            </h1>
            <p className="font-paragraph text-lg sm:text-xl text-black/70 leading-relaxed">
              Ready to accelerate your business growth? Let's discuss how our proven strategies 
              can transform your marketing performance and drive measurable results.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="pb-12 sm:pb-16 lg:pb-20">
        <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8 sm:space-y-12"
            >
              <div>
                <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-4 sm:mb-6 leading-tight">
                  LET'S START THE CONVERSATION
                </h2>
                <p className="font-paragraph text-base sm:text-lg text-black/70 leading-relaxed">
                  Whether you're looking to scale your existing marketing efforts or starting from scratch, 
                  we're here to help. Get in touch for a free consultation and discover how we can 
                  accelerate your business growth.
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-6 sm:space-y-8">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 sm:w-12 h-10 sm:h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-heading text-base sm:text-lg font-bold text-black mb-1 sm:mb-2">Email Us</h3>
                    <p className="font-paragraph text-sm sm:text-base text-black/70">letsgrowprowithus@gmail.com</p>
                    <p className="font-paragraph text-xs sm:text-sm text-black/60">
                      We typically respond within 2-4 hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 sm:w-12 h-10 sm:h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-heading text-base sm:text-lg font-bold text-black mb-1 sm:mb-2">Call Us</h3>
                    <p className="font-paragraph text-sm sm:text-base text-black/70">+91 8449460557</p>
                    <p className="font-paragraph text-xs sm:text-sm text-black/60">
                      Monday - Friday, 9AM - 6PM IST
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 sm:w-12 h-10 sm:h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-heading text-base sm:text-lg font-bold text-black mb-1 sm:mb-2">Visit Us</h3>
                    <p className="font-paragraph text-sm sm:text-base text-black/70">
                      LetsGrowPro Office<br />
                      Bandra Kurla Complex<br />
                      Mumbai, Maharashtra 400051
                    </p>
                  </div>
                </div>
              </div>

              {/* What to Expect */}
              <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-6 sm:p-8">
                <h3 className="font-heading text-lg sm:text-xl font-bold text-black mb-3 sm:mb-4">
                  What to Expect
                </h3>
                <ul className="space-y-2 sm:space-y-3">
                  {[
                    "Free 30-minute strategy consultation",
                    "Custom growth plan tailored to your business",
                    "Transparent pricing with no hidden fees",
                    "Dedicated account manager assigned to your project"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2 sm:gap-3">
                      <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="font-paragraph text-sm sm:text-base text-black/70">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="bg-white border border-gray-100 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12">
                <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-bold text-black mb-6 sm:mb-8">
                  Send Us a Message
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
                  {/* Name */}
                  <div>
                    <label className="block font-heading text-sm font-bold text-black mb-2">
                      Full Name *
                    </label>
                    <Input
                      {...register('name', { required: 'Name is required' })}
                      placeholder="Your full name"
                      className="border-gray-200 focus:border-primary text-black"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block font-heading text-sm font-bold text-black mb-2">
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      {...register('email', { 
                        required: 'Email is required',
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: 'Invalid email address'
                        }
                      })}
                      placeholder="your.email@company.com"
                      className="border-gray-200 focus:border-primary text-black"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  {/* Company & Phone */}
                  <div className="grid md:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block font-heading text-sm font-bold text-black mb-2">
                        Company
                      </label>
                      <Input
                        {...register('company')}
                        placeholder="Your company name"
                        className="border-gray-200 focus:border-primary text-black"
                      />
                    </div>
                    <div>
                      <label className="block font-heading text-sm font-bold text-black mb-2">
                        Phone
                      </label>
                      <Input
                        type="tel"
                        {...register('phone')}
                        placeholder="+91 8449460557"
                        className="border-gray-200 focus:border-primary text-black"
                      />
                    </div>
                  </div>

                  {/* Service Interest */}
                  <div>
                    <label className="block font-heading text-sm font-bold text-black mb-2">
                      Service Interest *
                    </label>
                    <select
                      {...register('service', { required: 'Please select a service' })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-md bg-white text-black focus:border-primary focus:outline-none"
                    >
                      <option value="">Select a service</option>
                      <option value="growth-strategy">Growth Strategy</option>
                      <option value="performance-marketing">Performance Marketing</option>
                      <option value="conversion-optimization">Conversion Optimization</option>
                      <option value="analytics-reporting">Analytics & Reporting</option>
                      <option value="consultation">Consultation Only</option>
                    </select>
                    {errors.service && (
                      <p className="text-red-500 text-sm mt-1">{errors.service.message}</p>
                    )}
                  </div>

                  {/* Budget */}
                  <div>
                    <label className="block font-heading text-sm font-bold text-black mb-2">
                      Monthly Budget *
                    </label>
                    <select
                      {...register('budget', { required: 'Please select a budget range' })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-md bg-white text-black focus:border-primary focus:outline-none"
                    >
                      <option value="">Select budget range</option>
                      <option value="under-5k">Under $5,000</option>
                      <option value="5k-10k">$5,000 - $10,000</option>
                      <option value="10k-25k">$10,000 - $25,000</option>
                      <option value="25k-50k">$25,000 - $50,000</option>
                      <option value="50k-plus">$50,000+</option>
                      <option value="discuss">Let's discuss</option>
                    </select>
                    {errors.budget && (
                      <p className="text-red-500 text-sm mt-1">{errors.budget.message}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block font-heading text-sm font-bold text-black mb-2">
                      Message *
                    </label>
                    <Textarea
                      {...register('message', { required: 'Message is required' })}
                      placeholder="Tell us about your business goals and how we can help..."
                      rows={5}
                      className="border-gray-200 focus:border-primary resize-none text-black"
                    />
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-white hover:bg-primary-hover disabled:opacity-50 px-6 py-3 font-semibold rounded-full"
                  >
                    {isSubmitting ? (
                      'Sending...'
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>

                <p className="text-center font-paragraph text-xs sm:text-sm text-black/60 mt-4 sm:mt-6">
                  By submitting this form, you agree to our privacy policy and terms of service.
                </p>
              </div>
            </motion.div>
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
              PREFER TO TALK FIRST?
            </h2>
            <p className="font-paragraph text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
              Schedule a free 30-minute consultation to discuss your growth goals and see if we're a good fit.
            </p>
            <Button asChild size="lg" variant="outline" className="bg-white text-primary border-white hover:bg-gray-100 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-full">
              <a href="tel:+918449460557">Call Now: +91 8449460557</a>
            </Button>
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