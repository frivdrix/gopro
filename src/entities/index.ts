/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: casestudies
 * Interface for CaseStudies
 */
export interface CaseStudies {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  caseStudyTitle?: string;
  /** @wixFieldType text */
  clientName?: string;
  /** @wixFieldType text */
  industry?: string;
  /** @wixFieldType text */
  challenge?: string;
  /** @wixFieldType text */
  solution?: string;
  /** @wixFieldType text */
  results?: string;
  /** @wixFieldType image */
  thumbnailImage?: string;
  /** @wixFieldType url */
  projectUrl?: string;
  /** @wixFieldType date */
  completionDate?: Date | string;
}


/**
 * Collection ID: frequentlyaskedquestions
 * Interface for FrequentlyAskedQuestions
 */
export interface FrequentlyAskedQuestions {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  question?: string;
  /** @wixFieldType text */
  answer?: string;
  /** @wixFieldType text */
  category?: string;
  /** @wixFieldType boolean */
  isFeatured?: boolean;
  /** @wixFieldType number */
  displayOrder?: number;
}


/**
 * Collection ID: partnerlogos
 * Interface for PartnerLogos
 */
export interface PartnerLogos {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  partnerName?: string;
  /** @wixFieldType image */
  logoImage?: string;
  /** @wixFieldType url */
  websiteUrl?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType number */
  displayOrder?: number;
}


/**
 * Collection ID: pricingplans
 * Interface for PricingPlans
 */
export interface PricingPlans {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  planName?: string;
  /** @wixFieldType number */
  price?: number;
  /** @wixFieldType text */
  billingCycle?: string;
  /** @wixFieldType text */
  shortDescription?: string;
  /** @wixFieldType text */
  featuresSummary?: string;
  /** @wixFieldType text */
  callToActionText?: string;
  /** @wixFieldType url */
  callToActionUrl?: string;
  /** @wixFieldType boolean */
  isRecommended?: boolean;
}


/**
 * Collection ID: services
 * Interface for Services
 */
export interface Services {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  serviceName?: string;
  /** @wixFieldType text */
  shortDescription?: string;
  /** @wixFieldType text */
  detailedDescription?: string;
  /** @wixFieldType image */
  serviceImage?: string;
  /** @wixFieldType text */
  benefits?: string;
  /** @wixFieldType text */
  callToActionText?: string;
  /** @wixFieldType url */
  callToActionUrl?: string;
}


/**
 * Collection ID: testimonials
 * Interface for Testimonials
 */
export interface Testimonials {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  clientName?: string;
  /** @wixFieldType text */
  clientTitleCompany?: string;
  /** @wixFieldType text */
  testimonialText?: string;
  /** @wixFieldType image */
  clientPhoto?: string;
  /** @wixFieldType number */
  rating?: number;
  /** @wixFieldType date */
  datePosted?: Date | string;
}
