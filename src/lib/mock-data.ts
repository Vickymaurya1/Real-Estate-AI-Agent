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
    price: 3450000,
    formattedPrice: "$3,450,000",
    priceDisplay: "Fixed Price",
    listingType: "For Sale",
    address: "742 Evergreen Terrace",
    city: "Beverly Hills",
    state: "CA",
    zip: "90210",
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
    description: "Ultra-luxury modern estate with panoramic canyon views, Infinity pool, custom wine cellar, and integrated smart home automation.",
    agentName: "Sarah Jenkins",
    viewingsCount: 42,
    inquiriesCount: 128,
    createdAt: "2026-07-15",
  },
  {
    id: "prop-102",
    title: "Skyline Luxury Penthouse",
    price: 12500,
    formattedPrice: "$12,500/mo",
    priceDisplay: "Starting From",
    listingType: "For Rent",
    address: "100 Ocean Drive, Tower A",
    city: "Miami",
    state: "FL",
    zip: "33139",
    beds: 3,
    baths: 3.5,
    sqft: 3200,
    parking: 2,
    yearBuilt: 2022,
    propertyType: "Apartment",
    status: "Available",
    featured: true,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=80",
    description: "Full-floor penthouse with 360-degree ocean views, private elevator access, wrap-around terrace, and 24/7 concierge.",
    agentName: "Michael Vance",
    viewingsCount: 31,
    inquiriesCount: 94,
    createdAt: "2026-07-18",
  },
  {
    id: "prop-103",
    title: "Oakwood Modern Townhouse",
    price: 1850000,
    formattedPrice: "$1,850,000",
    priceDisplay: "Fixed Price",
    listingType: "For Sale",
    address: "412 Chestnut Street",
    city: "Austin",
    state: "TX",
    zip: "78701",
    beds: 4,
    baths: 4,
    sqft: 2950,
    parking: 2,
    yearBuilt: 2021,
    propertyType: "Townhouse",
    status: "Pending",
    featured: false,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
    description: "Architectural townhouse featuring Scandinavian oak finishes, rooftop deck with outdoor kitchen, and private garage.",
    agentName: "Sarah Jenkins",
    viewingsCount: 28,
    inquiriesCount: 65,
    createdAt: "2026-07-20",
  },
  {
    id: "prop-104",
    title: "Coastal Breeze Condo",
    price: 890000,
    formattedPrice: "$890,000",
    priceDisplay: "Price on Request",
    listingType: "For Sale",
    address: "88 Ocean Boulevard #402",
    city: "San Diego",
    state: "CA",
    zip: "92109",
    beds: 2,
    baths: 2,
    sqft: 1450,
    parking: 1,
    yearBuilt: 2020,
    propertyType: "Condo",
    status: "Available",
    featured: true,
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=80",
    description: "Sunlit beachfront condo steps from the water. Includes upgraded quartz kitchen, private balcony, and resort amenities.",
    agentName: "David Miller",
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
    listingAddress: "742 Evergreen Terrace, Beverly Hills, CA",
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
    listingAddress: "100 Ocean Drive, Tower A, Miami, FL",
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
    listingAddress: "88 Ocean Boulevard #402, San Diego, CA",
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
    buyerPhone: "+1 (555) 234-5678",
    message: "Hi! Is the infinity pool heated year-round? Would like to schedule an in-person walkthrough this Saturday.",
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
    buyerPhone: "+1 (555) 987-6543",
    message: "Looking for a 12-month corporate lease starting Sept 1st. Are utilities included in the monthly rent?",
    status: "replied",
    createdAt: "2026-08-01 04:30 PM",
    replies: [
      {
        id: "rep-1",
        sender: "agent",
        senderName: "Prestige AI Concierge",
        message: "Hello Marcus! Water & internet are included; electricity is metered separately. I can hold the lease draft for you.",
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
    buyerPhone: "+1 (555) 456-7890",
    message: "What are the monthly HOA fees for this condo, and is short-term rental permitted by the board?",
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
    listingPrice: "$3,450,000",
    buyerName: "Alexander Wright",
    buyerEmail: "alex.wright@luxury.org",
    buyerPhone: "+1 (555) 321-9876",
    reservedDate: "2026-08-05 11:00 AM",
    status: "Confirmed",
    depositAmount: "$15,000",
    depositPaid: true,
    createdAt: "2026-08-01",
  },
  {
    id: "res-102",
    listingId: "prop-103",
    listingTitle: "Oakwood Modern Townhouse",
    listingPrice: "$1,850,000",
    buyerName: "Sophia Martinez",
    buyerEmail: "sophia.m@designstudio.com",
    buyerPhone: "+1 (555) 654-3210",
    reservedDate: "2026-08-06 03:30 PM",
    status: "Pending Deposit",
    depositAmount: "$10,000",
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
