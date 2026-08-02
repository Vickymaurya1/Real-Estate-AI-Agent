"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  PropertyListing,
  MarketplaceInquiry,
  MarketplaceReservation,
  ClientViewing,
  mockListings,
  mockInquiries,
  mockReservations,
  mockViewings,
} from "@/lib/mock-data";
import { toast } from "sonner";

interface ListingsStats {
  totalCount: number;
  availableCount: number;
  pendingCount: number;
  soldCount: number;
  rentedCount: number;
  activeListingsCount: number;
}

interface ListingsContextType {
  listings: PropertyListing[];
  inquiries: MarketplaceInquiry[];
  reservations: MarketplaceReservation[];
  viewings: ClientViewing[];
  stats: ListingsStats;
  addListing: (listing: Omit<PropertyListing, "id" | "createdAt" | "formattedPrice" | "viewingsCount" | "inquiriesCount">) => void;
  updateListing: (id: string, listing: Partial<PropertyListing>) => void;
  deleteListing: (id: string) => void;
  toggleFeatured: (id: string) => void;
  addInquiryReply: (inquiryId: string, replyMessage: string) => void;
  addInquiry: (listingId: string, listingTitle: string, buyerName: string, buyerEmail: string, buyerPhone: string, message: string) => void;
  rescheduleViewing: (id: string, newDate: string, newTime: string) => Promise<void>;
  bookViewing: (listingId: string, listingTitle: string, listingImage: string, listingAddress: string, buyerName: string, buyerEmail: string, date: string, time: string) => void;
  resetToDefaultData: () => void;
}

const ListingsContext = createContext<ListingsContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY_LISTINGS = "estatecall_listings_v1";
const LOCAL_STORAGE_KEY_INQUIRIES = "estatecall_inquiries_v1";
const LOCAL_STORAGE_KEY_RESERVATIONS = "estatecall_reservations_v1";
const LOCAL_STORAGE_KEY_VIEWINGS = "estatecall_viewings_v1";

export function ListingsProvider({ children }: { children: React.ReactNode }) {
  const [listings, setListings] = useState<PropertyListing[]>(mockListings);
  const [inquiries, setInquiries] = useState<MarketplaceInquiry[]>(mockInquiries);
  const [reservations, setReservations] = useState<MarketplaceReservation[]>(mockReservations);
  const [viewings, setViewings] = useState<ClientViewing[]>(mockViewings);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedListings = localStorage.getItem(LOCAL_STORAGE_KEY_LISTINGS);
      if (savedListings) setListings(JSON.parse(savedListings));

      const savedInquiries = localStorage.getItem(LOCAL_STORAGE_KEY_INQUIRIES);
      if (savedInquiries) setInquiries(JSON.parse(savedInquiries));

      const savedReservations = localStorage.getItem(LOCAL_STORAGE_KEY_RESERVATIONS);
      if (savedReservations) setReservations(JSON.parse(savedReservations));

      const savedViewings = localStorage.getItem(LOCAL_STORAGE_KEY_VIEWINGS);
      if (savedViewings) setViewings(JSON.parse(savedViewings));
    } catch (e) {
      console.error("Failed to load state from localStorage", e);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Save to localStorage on state change
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_LISTINGS, JSON.stringify(listings));
      localStorage.setItem(LOCAL_STORAGE_KEY_INQUIRIES, JSON.stringify(inquiries));
      localStorage.setItem(LOCAL_STORAGE_KEY_RESERVATIONS, JSON.stringify(reservations));
      localStorage.setItem(LOCAL_STORAGE_KEY_VIEWINGS, JSON.stringify(viewings));
    } catch (e) {
      console.error("Failed to save state to localStorage", e);
    }
  }, [listings, inquiries, reservations, viewings, isInitialized]);

  // Derived stats
  const stats: ListingsStats = {
    totalCount: listings.length,
    availableCount: listings.filter((l) => l.status === "Available").length,
    pendingCount: listings.filter((l) => l.status === "Pending").length,
    soldCount: listings.filter((l) => l.status === "Sold").length,
    rentedCount: listings.filter((l) => l.status === "Rented").length,
    activeListingsCount: listings.filter((l) => l.status === "Available").length,
  };

  const addListing = (
    data: Omit<PropertyListing, "id" | "createdAt" | "formattedPrice" | "viewingsCount" | "inquiriesCount">
  ) => {
    const formattedPrice =
      data.listingType === "For Rent"
        ? `$${data.price.toLocaleString()}/mo`
        : `$${data.price.toLocaleString()}`;

    const newListing: PropertyListing = {
      ...data,
      id: `prop-${Date.now()}`,
      formattedPrice,
      viewingsCount: 0,
      inquiriesCount: 0,
      createdAt: new Date().toISOString().split("T")[0],
    };

    setListings((prev) => [newListing, ...prev]);
    toast.success(`Property "${newListing.title}" created successfully!`);
  };

  const updateListing = (id: string, updatedData: Partial<PropertyListing>) => {
    setListings((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const merged = { ...item, ...updatedData };
        if (updatedData.price !== undefined || updatedData.listingType !== undefined) {
          merged.formattedPrice =
            merged.listingType === "For Rent"
              ? `$${merged.price.toLocaleString()}/mo`
              : `$${merged.price.toLocaleString()}`;
        }
        return merged;
      })
    );
    toast.success("Listing updated successfully!");
  };

  const deleteListing = (id: string) => {
    setListings((prev) => prev.filter((item) => item.id !== id));
    toast.success("Listing deleted.");
  };

  const toggleFeatured = (id: string) => {
    setListings((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextFeatured = !item.featured;
          toast.info(
            nextFeatured ? `"${item.title}" marked as Featured` : `"${item.title}" unfeatured`
          );
          return { ...item, featured: nextFeatured };
        }
        return item;
      })
    );
  };

  const addInquiryReply = (inquiryId: string, replyMessage: string) => {
    setInquiries((prev) =>
      prev.map((inq) => {
        if (inq.id === inquiryId) {
          const newReply = {
            id: `rep-${Date.now()}`,
            sender: "agent" as const,
            senderName: "Vicky Maurya (Agency Admin)",
            message: replyMessage,
            createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          };
          return {
            ...inq,
            status: "replied",
            replies: [...inq.replies, newReply],
          };
        }
        return inq;
      })
    );
    toast.success("Reply sent to buyer!");
  };

  const addInquiry = (
    listingId: string,
    listingTitle: string,
    buyerName: string,
    buyerEmail: string,
    buyerPhone: string,
    message: string
  ) => {
    const newInquiry: MarketplaceInquiry = {
      id: `inq-${Date.now()}`,
      listingId,
      listingTitle,
      buyerName,
      buyerEmail,
      buyerPhone,
      message,
      status: "new",
      createdAt: new Date().toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }),
      replies: [],
    };
    setInquiries((prev) => [newInquiry, ...prev]);
    toast.success("Your question has been sent to Prestige Estates!");
  };

  const rescheduleViewing = async (id: string, newDate: string, newTime: string) => {
    // Simulate network delay
    await new Promise((res) => setTimeout(res, 500));

    setViewings((prev) =>
      prev.map((vw) => {
        if (vw.id === id) {
          return {
            ...vw,
            date: newDate,
            time: newTime,
            status: "Pending", // Reset status to Pending per requirement
          };
        }
        return vw;
      })
    );

    toast.success("Viewing reschedule request submitted! Status reset to Pending.");
  };

  const bookViewing = (
    listingId: string,
    listingTitle: string,
    listingImage: string,
    listingAddress: string,
    buyerName: string,
    buyerEmail: string,
    date: string,
    time: string
  ) => {
    const newViewing: ClientViewing = {
      id: `vw-${Date.now()}`,
      listingId,
      listingTitle,
      listingImage,
      listingAddress,
      buyerName,
      buyerEmail,
      date,
      time,
      status: "Confirmed",
      paid: true,
      createdAt: new Date().toISOString().split("T")[0],
    };

    setViewings((prev) => [newViewing, ...prev]);
    toast.success(`Viewing for "${listingTitle}" booked for ${date} at ${time}!`);
  };

  const resetToDefaultData = () => {
    setListings(mockListings);
    setInquiries(mockInquiries);
    setReservations(mockReservations);
    setViewings(mockViewings);
    localStorage.removeItem(LOCAL_STORAGE_KEY_LISTINGS);
    localStorage.removeItem(LOCAL_STORAGE_KEY_INQUIRIES);
    localStorage.removeItem(LOCAL_STORAGE_KEY_RESERVATIONS);
    localStorage.removeItem(LOCAL_STORAGE_KEY_VIEWINGS);
    toast.info("Store reset to initial seeded mock data.");
  };

  return (
    <ListingsContext.Provider
      value={{
        listings,
        inquiries,
        reservations,
        viewings,
        stats,
        addListing,
        updateListing,
        deleteListing,
        toggleFeatured,
        addInquiryReply,
        addInquiry,
        rescheduleViewing,
        bookViewing,
        resetToDefaultData,
      }}
    >
      {children}
    </ListingsContext.Provider>
  );
}

export function useListingsContext() {
  const context = useContext(ListingsContext);
  if (!context) {
    throw new Error("useListingsContext must be used within a ListingsProvider");
  }
  return context;
}
