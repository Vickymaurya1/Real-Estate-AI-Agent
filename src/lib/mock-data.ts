export type PropertyType =
  | "House"
  | "Apartment"
  | "Condo"
  | "Townhouse"
  | "Plot"
  | "Commercial";

export type ListingStatus = "Available" | "Pending" | "Sold" | "Rented";

export type ListingType = "For Sale" | "For Rent";

export type PriceDisplay = "Fixed Price" | "Price on Request" | "Starting From";

export interface PropertyListing {
  id: string;
  title: string;
  price: number;
  formattedPrice: string;
  priceDisplay: PriceDisplay;
  listingType: ListingType;
  address: string;
  city: string;
  state: string;
  zip: string;
  beds: number;
  baths: number;
  sqft: number;
  parking: number;
  yearBuilt: number;
  propertyType: PropertyType;
  status: ListingStatus;
  featured: boolean;
  image: string;
  virtualTourUrl?: string;
  description: string;
  agentName: string;
  viewingsCount: number;
  inquiriesCount: number;
  createdAt: string;
}

export interface ClientViewing {
  id: string;
  listingId: string;
  listingTitle: string;
  listingImage: string;
  listingAddress: string;
  buyerName: string;
  buyerEmail: string;
  date: string;
  time: string;
  status: "Confirmed" | "Pending" | "Cancelled";
  paid: boolean;
  createdAt: string;
}

export interface InquiryReply {
  id: string;
  sender: "agent" | "buyer";
  senderName: string;
  message: string;
  createdAt: string;
}

export interface MarketplaceInquiry {
  id: string;
  listingId: string;
  listingTitle: string;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  message: string;
  status: "new" | "replied" | "closed";
  createdAt: string;
  replies: InquiryReply[];
}

export interface MarketplaceReservation {
  id: string;
  listingId: string;
  listingTitle: string;
  listingPrice: string;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  reservedDate: string;
  status: "Confirmed" | "Pending Deposit" | "Cancelled";
  depositAmount: string;
  depositPaid: boolean;
  createdAt: string;
}

export interface CallSummary {
  customerName: string;
  location: string;
  propertyType: string;
  configuration: string;
  budgetRange: string;
  purpose: string;
  timeline: string;
  questionsAsked: string[];
  nextStep: string;
  sentiment: "Highly Interested" | "Interested" | "Neutral" | "Not Interested";
}

export interface CallRecord {
  id: string;
  listingId: string;
  listingTitle: string;
  customerName: string;
  duration: string;
  createdAt: string;
  transcript: { id?: string; role: "assistant" | "user"; text: string; timestamp?: string }[];
  summary: CallSummary;
}

export interface ConversationTrendPoint {
  date: string;
  calls: number;
  viewings: number;
}

export interface TodaysActivity {
  todaysCalls: number;
  thisWeekCalls: number;
  callbacksRequested: number;
  activeAgents: number;
  availableListings: number;
}

export interface DashboardStats {
  agencyName: string;
  activeAgentsCount: number;
  activeListingsCount: number;
  totalConversations: number;
  viewingsBooked: number;
  conversionRate: number;
  avgCallDuration: string;
  todaysActivity: TodaysActivity;
}

export const mockListings: PropertyListing[] = [
  {
    id: "prop-101",
    title: "The Grand Horizon Villa",
    price: 34500000,
    formattedPrice: "₹3.45 Cr",
    priceDisplay: "Fixed Price",
    listingType: "For Sale",
    address: "Plot 42, Sector 150, Noida Expressway",
    city: "Noida",
    state: "UP",
    zip: "201310",
    beds: 5,
    baths: 6,
    sqft: 5800,
    parking: 3,
    yearBuilt: 2023,
    propertyType: "House",
    status: "Available",
    featured: true,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=80",
    virtualTourUrl: "https://my.matterport.com/show/?m=demo",
    description: "Ultra-luxury modern villa featuring Vastu-compliant architecture, private landscaped garden, modular Italian kitchen, 100% power backup, servant quarters, RERA registration, and integrated smart home automation.",
    agentName: "Priya Sharma",
    viewingsCount: 42,
    inquiriesCount: 128,
    createdAt: "2026-07-15",
  },
  {
    id: "prop-102",
    title: "Skyline Luxury Penthouse",
    price: 125000,
    formattedPrice: "₹1.25 Lakh/mo",
    priceDisplay: "Starting From",
    listingType: "For Rent",
    address: "Tower A, 18th Floor, Turner Road, Bandra West",
    city: "Mumbai",
    state: "MH",
    zip: "400050",
    beds: 3,
    baths: 3.5,
    sqft: 3200,
    parking: 2,
    yearBuilt: 2022,
    propertyType: "Apartment",
    status: "Available",
    featured: true,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=80",
    description: "Full-floor penthouse with 360-degree Arabian Sea views, private high-speed elevator access, wrap-around terrace, 2 covered stilt parking spaces, clubhouse membership, and 24/7 security concierge.",
    agentName: "Rajesh Verma",
    viewingsCount: 31,
    inquiriesCount: 94,
    createdAt: "2026-07-18",
  },
  {
    id: "prop-103",
    title: "Oakwood Modern Townhouse",
    price: 18500000,
    formattedPrice: "₹1.85 Cr",
    priceDisplay: "Fixed Price",
    listingType: "For Sale",
    address: "100 Feet Road, 12th Main, Indiranagar",
    city: "Bengaluru",
    state: "KA",
    zip: "560038",
    beds: 4,
    baths: 4,
    sqft: 2950,
    parking: 2,
    yearBuilt: 2021,
    propertyType: "Townhouse",
    status: "Pending",
    featured: false,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
    description: "Architectural luxury townhouse featuring teakwood finishes, rooftop terrace garden with outdoor kitchen, modular kitchen, EV charging point, servant room, and 24/7 gated security.",
    agentName: "Vikram Malhotra",
    viewingsCount: 28,
    inquiriesCount: 65,
    createdAt: "2026-07-20",
  },
  {
    id: "prop-104",
    title: "Coastal Breeze Condo",
    price: 8900000,
    formattedPrice: "₹89 Lakh",
    priceDisplay: "Price on Request",
    listingType: "For Sale",
    address: "Flat 402, North Main Road, Koregaon Park",
    city: "Pune",
    state: "MH",
    zip: "411001",
    beds: 2,
    baths: 2,
    sqft: 1450,
    parking: 1,
    yearBuilt: 2020,
    propertyType: "Condo",
    status: "Available",
    featured: true,
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=80",
    description: "Sunlit premium apartment steps from Osho Teerth Park. Includes upgraded quartz modular kitchen, private balcony, covered stilt parking, clubhouse access, swimming pool, and 100% power backup.",
    agentName: "Ananya Deshmukh",
    viewingsCount: 19,
    inquiriesCount: 52,
    createdAt: "2026-07-25",
  },
];

export const mockViewings: ClientViewing[] = [
  {
    id: "vw-101",
    listingId: "prop-101",
    listingTitle: "The Grand Horizon Villa",
    listingImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=80",
    listingAddress: "Plot 42, Sector 150, Noida, UP 201310",
    buyerName: "Vicky Maurya",
    buyerEmail: "vicky@estatecall.ai",
    date: "2026-08-05",
    time: "10:30 AM",
    status: "Confirmed",
    paid: true,
    createdAt: "2026-08-01",
  },
  {
    id: "vw-102",
    listingId: "prop-102",
    listingTitle: "Skyline Luxury Penthouse",
    listingImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=80",
    listingAddress: "Tower A, Turner Road, Bandra West, Mumbai, MH 400050",
    buyerName: "Vicky Maurya",
    buyerEmail: "vicky@estatecall.ai",
    date: "2026-08-07",
    time: "02:00 PM",
    status: "Pending",
    paid: false,
    createdAt: "2026-08-02",
  },
  {
    id: "vw-103",
    listingId: "prop-104",
    listingTitle: "Coastal Breeze Condo",
    listingImage: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=80",
    listingAddress: "Flat 402, North Main Road, Koregaon Park, Pune, MH 411001",
    buyerName: "Vicky Maurya",
    buyerEmail: "vicky@estatecall.ai",
    date: "2026-08-10",
    time: "04:30 PM",
    status: "Confirmed",
    paid: true,
    createdAt: "2026-08-02",
  },
];

export const mockInquiries: MarketplaceInquiry[] = [
  {
    id: "inq-1",
    listingId: "prop-101",
    listingTitle: "The Grand Horizon Villa",
    buyerName: "Elena Rostova",
    buyerEmail: "elena.r@example.com",
    buyerPhone: "+91 98200 12345",
    message: "Namaste! Is the villa Vastu-compliant? Would like to schedule an in-person walkthrough this Saturday.",
    status: "new",
    createdAt: "2026-08-02 10:15 AM",
    replies: [],
  },
  {
    id: "inq-2",
    listingId: "prop-102",
    listingTitle: "Skyline Luxury Penthouse",
    buyerName: "Marcus Sterling",
    buyerEmail: "m.sterling@corporate.com",
    buyerPhone: "+91 98111 98765",
    message: "Looking for a 12-month corporate lease starting Sept 1st. Are society maintenance fees included in the monthly rent?",
    status: "replied",
    createdAt: "2026-08-01 04:30 PM",
    replies: [
      {
        id: "rep-1",
        sender: "agent",
        senderName: "Prestige AI Concierge",
        message: "Hello Marcus! Maintenance & water are included; electricity is metered separately. I can hold the lease agreement draft for you.",
        createdAt: "2026-08-01 04:32 PM",
      },
    ],
  },
  {
    id: "inq-3",
    listingId: "prop-104",
    listingTitle: "Coastal Breeze Condo",
    buyerName: "David Chen",
    buyerEmail: "dchen@techcorp.io",
    buyerPhone: "+91 99300 45678",
    message: "What are the monthly society maintenance fees for this apartment, and is covered stilt car parking included?",
    status: "new",
    createdAt: "2026-08-02 01:20 PM",
    replies: [],
  },
];

export const mockReservations: MarketplaceReservation[] = [
  {
    id: "res-101",
    listingId: "prop-101",
    listingTitle: "The Grand Horizon Villa",
    listingPrice: "₹3.45 Cr",
    buyerName: "Alexander Wright",
    buyerEmail: "alex.wright@luxury.org",
    buyerPhone: "+91 98765 12345",
    reservedDate: "2026-08-05 11:00 AM",
    status: "Confirmed",
    depositAmount: "₹15 Lakh",
    depositPaid: true,
    createdAt: "2026-08-01",
  },
  {
    id: "res-102",
    listingId: "prop-103",
    listingTitle: "Oakwood Modern Townhouse",
    listingPrice: "₹1.85 Cr",
    buyerName: "Sophia Martinez",
    buyerEmail: "sophia.m@designstudio.com",
    buyerPhone: "+91 98199 87654",
    reservedDate: "2026-08-06 03:30 PM",
    status: "Pending Deposit",
    depositAmount: "₹10 Lakh",
    depositPaid: false,
    createdAt: "2026-08-02",
  },
];

export const mockTrendData: ConversationTrendPoint[] = [
  { date: "Jul 20", calls: 42, viewings: 8 },
  { date: "Jul 21", calls: 58, viewings: 11 },
  { date: "Jul 22", calls: 65, viewings: 14 },
  { date: "Jul 23", calls: 51, viewings: 9 },
  { date: "Jul 24", calls: 74, viewings: 18 },
  { date: "Jul 25", calls: 89, viewings: 22 },
  { date: "Jul 26", calls: 95, viewings: 24 },
  { date: "Jul 27", calls: 68, viewings: 15 },
  { date: "Jul 28", calls: 82, viewings: 19 },
  { date: "Jul 29", calls: 91, viewings: 21 },
  { date: "Jul 30", calls: 104, viewings: 26 },
  { date: "Jul 31", calls: 118, viewings: 29 },
  { date: "Aug 01", calls: 132, viewings: 31 },
  { date: "Aug 02", calls: 142, viewings: 34 },
];

export const mockDashboardStats: DashboardStats = {
  agencyName: "Prestige Estates",
  activeAgentsCount: 4,
  activeListingsCount: 3,
  totalConversations: 1482,
  viewingsBooked: 124,
  conversionRate: 24.8,
  avgCallDuration: "3m 42s",
  todaysActivity: {
    todaysCalls: 142,
    thisWeekCalls: 846,
    callbacksRequested: 18,
    activeAgents: 4,
    availableListings: 3,
  },
};

export const mockCalls: CallRecord[] = [
  {
    id: "call-101",
    listingId: "prop-101",
    listingTitle: "The Grand Horizon Villa",
    customerName: "Rahul Sharma",
    duration: "4m 12s",
    createdAt: "2026-08-03 04:15 PM",
    transcript: [
      {
        id: "t1",
        role: "assistant",
        text: "Namaste! I'm Alexis, your residential specialist for The Grand Horizon Villa. How can I help you today?",
        timestamp: "04:15 PM",
      },
      {
        id: "t2",
        role: "user",
        text: "Hi Alexis, I'm looking for a 4 BHK villa in Sector 150 Noida. What is the price range for this property?",
        timestamp: "04:15 PM",
      },
      {
        id: "t3",
        role: "assistant",
        text: "The Grand Horizon Villa is priced at ₹3.45 Cr. It offers 5 bedrooms, 6 bathrooms, and 5,800 sq ft of luxury living space with smart home automation.",
        timestamp: "04:16 PM",
      },
      {
        id: "t4",
        role: "user",
        text: "My budget is around 3.5 Crore. Is possession expected by late 2027?",
        timestamp: "04:17 PM",
      },
      {
        id: "t5",
        role: "assistant",
        text: "Yes! Possession is scheduled for December 2027 with flexible construction-linked payment plans.",
        timestamp: "04:18 PM",
      },
      {
        id: "t6",
        role: "user",
        text: "Great! Please schedule an in-person viewing for me this Saturday at 11 AM.",
        timestamp: "04:19 PM",
      },
    ],
    summary: {
      customerName: "Rahul Sharma",
      location: "Sector 150, Noida",
      propertyType: "Luxury Villa",
      configuration: "4-5 BHK Villa",
      budgetRange: "₹3.5 Cr",
      purpose: "End-Use / Personal Residence",
      timeline: "Possession by Dec 2027",
      questionsAsked: [
        "What is the price range for the property?",
        "Is possession expected by late 2027?",
        "Can an in-person viewing be scheduled for Saturday?",
      ],
      nextStep: "In-person site walkthrough booked for Saturday 11:00 AM.",
      sentiment: "Highly Interested",
    },
  },
  {
    id: "call-102",
    listingId: "prop-102",
    listingTitle: "Skyline Luxury Penthouse",
    customerName: "Ananya Roy",
    duration: "2m 45s",
    createdAt: "2026-08-03 01:30 PM",
    transcript: [
      {
        id: "t10",
        role: "assistant",
        text: "Namaste! I'm Alexis. Are you interested in renting or buying the Skyline Luxury Penthouse?",
        timestamp: "01:30 PM",
      },
      {
        id: "t11",
        role: "user",
        text: "I want to rent for a 12-month corporate assignment. Does it include parking and sea views?",
        timestamp: "01:31 PM",
      },
      {
        id: "t12",
        role: "assistant",
        text: "Yes, it has 360-degree Arabian Sea views, 2 covered stilt parking slots, and full penthouse luxury amenities for ₹1.25 Lakh/month.",
        timestamp: "01:32 PM",
      },
    ],
    summary: {
      customerName: "Ananya Roy",
      location: "Bandra West, Mumbai",
      propertyType: "Penthouse Apartment",
      configuration: "3 BHK Penthouse",
      budgetRange: "₹1.25 Lakh/mo",
      purpose: "Corporate Rental",
      timeline: "Immediate / Sept 1st",
      questionsAsked: [
        "Is it available for 12-month corporate rental?",
        "Does it include parking and sea views?",
      ],
      nextStep: "Email corporate lease agreement draft and maintenance breakdown.",
      sentiment: "Interested",
    },
  },
];
