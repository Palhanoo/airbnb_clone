export interface Listing {
    id: string;
    listing_url: string;
    scrape_id: string;
    last_scraped: string;
    name: string;
    summary:null | string;
    space: null | string;
    description: string;
    experiences_offered: string;
    neighborhood_overview: null | string;
    notes: null | string;
    transit: null | string;
    access: null | string;
    interaction: null | string;
    house_rules?: null | any;
    thumbnail_url: null | string;
    medium_url: null | string;
    picture_url: Pictureurl;
    xl_picture_url: null | string;
    host_id: null | string;
    host_url: null | string;
    host_name: null | string;
    host_since: null | string;
    host_location: null | string;
    host_about?: null | any;
    host_response_time: null | string;
    host_response_rate: null | number;
    host_acceptance_rate?: null | any;
    host_thumbnail_url: null | string;
    host_picture_url: null | string;
    host_neighbourhood?: null | any;
    host_listings_count: null | number;
    host_total_listings_count: null | number;
    host_verifications: string[];
    street: string;
    neighbourhood?: any;
    neighbourhood_cleansed: string;
    neighbourhood_group_cleansed?: any;
    city: string;
    state: string;
    zipcode?: any;
    market: string;
    smart_location: string;
    country_code: string;
    country: string;
    latitude: string;
    longitude: string;
    property_type: string;
    room_type: string;
    accommodates: number;
    bathrooms: number;
    bedrooms: number;
    beds: number;
    bed_type: string;
    amenities: string[];
    square_feet?: any;
    price: number;
    weekly_price?: any;
    monthly_price?: any;
    security_deposit?: any;
    cleaning_fee?: any;
    guests_included: number;
    extra_people: number;
    minimum_nights: number;
    maximum_nights: number;
    calendar_updated: string;
    has_availability?: any;
    availability_30: number;
    availability_60: number;
    availability_90: number;
    availability_365: number;
    calendar_last_scraped: string;
    number_of_reviews: number;
    first_review: null | string;
    last_review: null | string;
    review_scores_rating: null | number;
    review_scores_accuracy: null | number;
    review_scores_cleanliness: null | number;
    review_scores_checkin: null | number;
    review_scores_communication: null | number;
    review_scores_location: null | number;
    review_scores_value: null | number;
    license?: null | any;
    jurisdiction_names?: null | any;
    cancellation_policy: null | string;
    calculated_host_listings_count: null | number;
    reviews_per_month: null | number;
    geolocation: Geolocation;
    features: string[];
  }
  
  interface Geolocation {
    lon: number;
    lat: number;
  }
  
  interface Pictureurl {
    thumbnail: boolean;
    filename: string;
    format: string;
    width: number;
    mimetype: string;
    etag: string;
    id: string;
    last_synchronized: string;
    color_summary: string[];
    height: number;
  }