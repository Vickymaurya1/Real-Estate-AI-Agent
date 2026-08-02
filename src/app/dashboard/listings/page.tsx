"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Building2,
  Plus,
  Search,
  Star,
  Eye,
  Pencil,
  Trash2,
  Upload,
  Bed,
  Bath,
  Maximize2,
  Car,
  Calendar,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { useListingsContext } from "@/context/listings-context";
import { PropertyListing, PropertyType, ListingStatus, ListingType, PriceDisplay } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export default function ListingsCrudPage() {
  const { listings, stats, addListing, updateListing, deleteListing, toggleFeatured } = useListingsContext();

  // Search & Filters State
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  // Dialog States
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingListing, setEditingListing] = useState<PropertyListing | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  // Form Fields State
  const [formData, setFormData] = useState({
    title: "",
    price: 500000,
    priceDisplay: "Fixed Price" as PriceDisplay,
    listingType: "For Sale" as ListingType,
    address: "",
    city: "",
    state: "",
    zip: "",
    beds: 3,
    baths: 2,
    sqft: 1800,
    parking: 2,
    yearBuilt: 2022,
    propertyType: "House" as PropertyType,
    status: "Available" as ListingStatus,
    featured: false,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=80",
    virtualTourUrl: "",
    description: "",
    agentName: "Vicky Maurya",
  });

  const [uploadedImagePreview, setUploadedImagePreview] = useState<string | null>(null);

  // Open Form for Add
  const handleOpenAdd = () => {
    setEditingListing(null);
    setFormData({
      title: "",
      price: 750000,
      priceDisplay: "Fixed Price",
      listingType: "For Sale",
      address: "",
      city: "",
      state: "",
      zip: "",
      beds: 3,
      baths: 2.5,
      sqft: 2100,
      parking: 2,
      yearBuilt: 2023,
      propertyType: "House",
      status: "Available",
      featured: false,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
      virtualTourUrl: "",
      description: "",
      agentName: "Vicky Maurya",
    });
    setUploadedImagePreview(null);
    setIsFormOpen(true);
  };

  // Open Form for Edit
  const handleOpenEdit = (listing: PropertyListing) => {
    setEditingListing(listing);
    setFormData({
      title: listing.title,
      price: listing.price,
      priceDisplay: listing.priceDisplay,
      listingType: listing.listingType,
      address: listing.address,
      city: listing.city,
      state: listing.state,
      zip: listing.zip,
      beds: listing.beds,
      baths: listing.baths,
      sqft: listing.sqft,
      parking: listing.parking,
      yearBuilt: listing.yearBuilt,
      propertyType: listing.propertyType,
      status: listing.status,
      featured: listing.featured,
      image: listing.image,
      virtualTourUrl: listing.virtualTourUrl || "",
      description: listing.description,
      agentName: listing.agentName,
    });
    setUploadedImagePreview(listing.image);
    setIsFormOpen(true);
  };

  // Handle Drag & Drop / File Select
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 20 * 1024 * 1024) {
      toast.error("File size exceeds 20MB limit!");
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setUploadedImagePreview(previewUrl);
    setFormData((prev) => ({ ...prev, image: previewUrl }));
    toast.success("Image uploaded successfully!");
  };

  // Submit Form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.address) {
      toast.error("Please fill in Title and Address.");
      return;
    }

    if (editingListing) {
      updateListing(editingListing.id, formData);
    } else {
      addListing(formData);
    }

    setIsFormOpen(false);
  };

  // Filter listings
  const filteredListings = listings.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.city.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || item.status.toLowerCase() === statusFilter.toLowerCase();

    const matchesType =
      typeFilter === "all" || item.propertyType.toLowerCase() === typeFilter.toLowerCase();

    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 1. Top Header & Stat Chips */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary" />
            <span>Property Listings</span>
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Manage your agency's property inventory, price displays, and availability statuses.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={handleOpenAdd}
            size="sm"
            className="h-9 gap-1.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-semibold shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Listing</span>
          </Button>
        </div>
      </div>

      {/* Stat Chips Row */}
      <div className="flex flex-wrap items-center gap-2">
        <Badge
          onClick={() => setStatusFilter("all")}
          variant="outline"
          className={`cursor-pointer px-3 py-1 text-xs font-semibold rounded-full transition-all ${
            statusFilter === "all"
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-card text-foreground border-border hover:bg-muted"
          }`}
        >
          Total: {stats.totalCount}
        </Badge>
        <Badge
          onClick={() => setStatusFilter("available")}
          variant="outline"
          className={`cursor-pointer px-3 py-1 text-xs font-semibold rounded-full transition-all ${
            statusFilter === "available"
              ? "bg-emerald-600 text-white border-emerald-600"
              : "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border-emerald-500/30 hover:bg-emerald-100"
          }`}
        >
          Available: {stats.availableCount}
        </Badge>
        <Badge
          onClick={() => setStatusFilter("pending")}
          variant="outline"
          className={`cursor-pointer px-3 py-1 text-xs font-semibold rounded-full transition-all ${
            statusFilter === "pending"
              ? "bg-amber-600 text-white border-amber-600"
              : "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border-amber-500/30 hover:bg-amber-100"
          }`}
        >
          Pending: {stats.pendingCount}
        </Badge>
        <Badge
          onClick={() => setStatusFilter("sold")}
          variant="outline"
          className={`cursor-pointer px-3 py-1 text-xs font-semibold rounded-full transition-all ${
            statusFilter === "sold"
              ? "bg-gray-700 text-white border-gray-700"
              : "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300 border-gray-300 hover:bg-gray-200"
          }`}
        >
          Sold: {stats.soldCount}
        </Badge>
        <Badge
          onClick={() => setStatusFilter("rented")}
          variant="outline"
          className={`cursor-pointer px-3 py-1 text-xs font-semibold rounded-full transition-all ${
            statusFilter === "rented"
              ? "bg-indigo-600 text-white border-indigo-600"
              : "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 border-indigo-500/30 hover:bg-indigo-100"
          }`}
        >
          Rented: {stats.rentedCount}
        </Badge>
      </div>

      {/* 2. Search & Filters Bar */}
      <Card className="bg-card border-border shadow-xs rounded-2xl p-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search title, address, city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 pl-9 text-xs rounded-xl bg-background border-border"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={(val) => setStatusFilter(val || "all")}>
              <SelectTrigger className="h-9 text-xs w-36 rounded-xl bg-background border-border">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="sold">Sold</SelectItem>
                <SelectItem value="rented">Rented</SelectItem>
              </SelectContent>
            </Select>

            {/* Type Filter */}
            <Select value={typeFilter} onValueChange={(val) => setTypeFilter(val || "all")}>
              <SelectTrigger className="h-9 text-xs w-36 rounded-xl bg-background border-border">
                <SelectValue placeholder="Property Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="condo">Condo</SelectItem>
                <SelectItem value="townhouse">Townhouse</SelectItem>
                <SelectItem value="plot">Plot</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* 3. Listings Grid / Table */}
      <div className="grid gap-4">
        {filteredListings.length === 0 ? (
          <Card className="bg-card border-border p-12 text-center rounded-2xl">
            <Building2 className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
            <h3 className="text-base font-bold text-foreground">No listings found</h3>
            <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
              Try adjusting your search query or filter selections, or click below to add a new listing.
            </p>
            <Button onClick={handleOpenAdd} size="sm" className="mt-4 text-xs font-semibold gap-1.5">
              <Plus className="w-4 h-4" />
              Add Listing
            </Button>
          </Card>
        ) : (
          filteredListings.map((listing) => (
            <Card
              key={listing.id}
              className="bg-card border-border shadow-xs hover:shadow-md transition-all rounded-2xl overflow-hidden p-4"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Left: Thumbnail & Title Info */}
                <div className="flex items-center gap-4">
                  <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-xl bg-muted">
                    <img
                      src={listing.image}
                      alt={listing.title}
                      className="h-full w-full object-cover"
                    />
                    <button
                      onClick={() => toggleFeatured(listing.id)}
                      className="absolute top-1.5 left-1.5 p-1 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
                      title={listing.featured ? "Unfeature property" : "Mark as Featured"}
                    >
                      <Star
                        className={`w-3.5 h-3.5 ${
                          listing.featured ? "fill-amber-400 text-amber-400" : "text-white"
                        }`}
                      />
                    </button>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-base text-foreground leading-snug">
                        {listing.title}
                      </h3>
                      {listing.featured && (
                        <Badge className="bg-accent text-white border-none text-[9px] font-extrabold uppercase">
                          Featured
                        </Badge>
                      )}
                      <Badge className="bg-primary/10 text-primary border-none text-[10px] font-bold">
                        {listing.propertyType}
                      </Badge>
                      <Badge
                        className={`border-none text-[10px] font-bold ${
                          listing.status === "Available"
                            ? "bg-emerald-500 text-white"
                            : listing.status === "Pending"
                            ? "bg-amber-500 text-white"
                            : listing.status === "Rented"
                            ? "bg-indigo-500 text-white"
                            : "bg-gray-500 text-white"
                        }`}
                      >
                        {listing.status}
                      </Badge>
                    </div>

                    <p className="text-xs text-muted-foreground">
                      {listing.address}, {listing.city}, {listing.state} {listing.zip}
                    </p>

                    {/* Specs Row */}
                    <div className="flex items-center gap-4 pt-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Bed className="w-3.5 h-3.5 text-primary" />
                        {listing.beds} Beds
                      </span>
                      <span className="flex items-center gap-1">
                        <Bath className="w-3.5 h-3.5 text-primary" />
                        {listing.baths} Baths
                      </span>
                      <span className="flex items-center gap-1">
                        <Maximize2 className="w-3.5 h-3.5 text-primary" />
                        {listing.sqft} sqft
                      </span>
                      <span className="flex items-center gap-1 hidden sm:flex">
                        <Car className="w-3.5 h-3.5 text-primary" />
                        {listing.parking} Parking
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Price & Action Buttons */}
                <div className="flex md:flex-col items-end justify-between md:justify-center gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-border/60">
                  <div className="text-right">
                    <p className="text-lg font-extrabold text-primary">
                      {listing.formattedPrice}
                    </p>
                    <p className="text-[10px] text-muted-foreground font-medium">
                      {listing.priceDisplay} • {listing.listingType}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link href={`/listing/${listing.id}`}>
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0 rounded-lg">
                        <Eye className="w-3.5 h-3.5 text-muted-foreground" />
                      </Button>
                    </Link>

                    <Button
                      onClick={() => handleOpenEdit(listing)}
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 p-0 rounded-lg border-border hover:bg-muted"
                    >
                      <Pencil className="w-3.5 h-3.5 text-foreground" />
                    </Button>

                    <Button
                      onClick={() => setDeleteTargetId(listing.id)}
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 p-0 rounded-lg border-rose-200 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* 4. Add / Edit Listing Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-card border-border p-6">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">
              {editingListing ? "Edit Property Listing" : "New Property Listing"}
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Fill in the property details, pricing, and upload high-resolution images.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 py-2 text-xs">
            {/* Image Upload Box */}
            <div className="space-y-1.5">
              <label className="font-semibold text-foreground">Property Photo</label>
              <div className="relative border-2 border-dashed border-border rounded-xl p-4 text-center hover:border-primary/50 transition-colors bg-muted/30">
                {uploadedImagePreview ? (
                  <div className="relative h-40 w-full overflow-hidden rounded-lg">
                    <img src={uploadedImagePreview} alt="Preview" className="h-full w-full object-cover" />
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      onClick={() => setUploadedImagePreview(null)}
                      className="absolute top-2 right-2 text-xs h-7"
                    >
                      Change Photo
                    </Button>
                  </div>
                ) : (
                  <label className="cursor-pointer flex flex-col items-center justify-center space-y-2 py-4">
                    <Upload className="w-8 h-8 text-muted-foreground" />
                    <div>
                      <p className="font-semibold text-foreground">Click to upload or drag & drop</p>
                      <p className="text-[10px] text-muted-foreground">JPG, PNG, WEBP up to 20MB</p>
                    </div>
                    <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                  </label>
                )}
              </div>
            </div>

            {/* Title */}
            <div className="space-y-1">
              <label className="font-semibold text-foreground">Listing Title *</label>
              <Input
                type="text"
                placeholder="e.g. Skyline Luxury Penthouse"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="h-9 text-xs rounded-xl"
                required
              />
            </div>

            {/* Property Type & Listing Type Row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="font-semibold text-foreground">Property Type</label>
                <Select
                  value={formData.propertyType}
                  onValueChange={(val) => val && setFormData({ ...formData, propertyType: val as PropertyType })}
                >
                  <SelectTrigger className="h-9 text-xs rounded-xl">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="House">House</SelectItem>
                    <SelectItem value="Apartment">Apartment</SelectItem>
                    <SelectItem value="Condo">Condo</SelectItem>
                    <SelectItem value="Townhouse">Townhouse</SelectItem>
                    <SelectItem value="Plot">Plot</SelectItem>
                    <SelectItem value="Commercial">Commercial</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Listing Type</label>
                <Select
                  value={formData.listingType}
                  onValueChange={(val) => val && setFormData({ ...formData, listingType: val as ListingType })}
                >
                  <SelectTrigger className="h-9 text-xs rounded-xl">
                    <SelectValue placeholder="Select listing type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="For Sale">For Sale</SelectItem>
                    <SelectItem value="For Rent">For Rent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Street Address */}
            <div className="space-y-1">
              <label className="font-semibold text-foreground">Street Address *</label>
              <Input
                type="text"
                placeholder="e.g. 742 Evergreen Terrace"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="h-9 text-xs rounded-xl"
                required
              />
            </div>

            {/* City, State, ZIP */}
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="font-semibold text-foreground">City</label>
                <Input
                  type="text"
                  placeholder="Beverly Hills"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="h-9 text-xs rounded-xl"
                />
              </div>
              <div className="space-y-1">
                <label className="font-semibold text-foreground">State</label>
                <Input
                  type="text"
                  placeholder="CA"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="h-9 text-xs rounded-xl"
                />
              </div>
              <div className="space-y-1">
                <label className="font-semibold text-foreground">ZIP Code</label>
                <Input
                  type="text"
                  placeholder="90210"
                  value={formData.zip}
                  onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                  className="h-9 text-xs rounded-xl"
                />
              </div>
            </div>

            {/* Price & Price Display Row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="font-semibold text-foreground">Price ($)</label>
                <Input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  className="h-9 text-xs rounded-xl"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Price Display</label>
                <Select
                  value={formData.priceDisplay}
                  onValueChange={(val) => val && setFormData({ ...formData, priceDisplay: val as PriceDisplay })}
                >
                  <SelectTrigger className="h-9 text-xs rounded-xl">
                    <SelectValue placeholder="Price display mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Fixed Price">Fixed Price</SelectItem>
                    <SelectItem value="Price on Request">Price on Request</SelectItem>
                    <SelectItem value="Starting From">Starting From</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Specs Row: Beds, Baths, Area, Parking */}
            <div className="grid grid-cols-4 gap-3">
              <div className="space-y-1">
                <label className="font-semibold text-foreground">Beds</label>
                <Input
                  type="number"
                  value={formData.beds}
                  onChange={(e) => setFormData({ ...formData, beds: Number(e.target.value) })}
                  className="h-9 text-xs rounded-xl"
                />
              </div>
              <div className="space-y-1">
                <label className="font-semibold text-foreground">Baths</label>
                <Input
                  type="number"
                  step="0.5"
                  value={formData.baths}
                  onChange={(e) => setFormData({ ...formData, baths: Number(e.target.value) })}
                  className="h-9 text-xs rounded-xl"
                />
              </div>
              <div className="space-y-1">
                <label className="font-semibold text-foreground">Area (sqft)</label>
                <Input
                  type="number"
                  value={formData.sqft}
                  onChange={(e) => setFormData({ ...formData, sqft: Number(e.target.value) })}
                  className="h-9 text-xs rounded-xl"
                />
              </div>
              <div className="space-y-1">
                <label className="font-semibold text-foreground">Parking</label>
                <Input
                  type="number"
                  value={formData.parking}
                  onChange={(e) => setFormData({ ...formData, parking: Number(e.target.value) })}
                  className="h-9 text-xs rounded-xl"
                />
              </div>
            </div>

            {/* Status & Year Built */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="font-semibold text-foreground">Status</label>
                <Select
                  value={formData.status}
                  onValueChange={(val) => val && setFormData({ ...formData, status: val as ListingStatus })}
                >
                  <SelectTrigger className="h-9 text-xs rounded-xl">
                    <SelectValue placeholder="Listing status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Available">Available</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Sold">Sold</SelectItem>
                    <SelectItem value="Rented">Rented</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Year Built</label>
                <Input
                  type="number"
                  value={formData.yearBuilt}
                  onChange={(e) => setFormData({ ...formData, yearBuilt: Number(e.target.value) })}
                  className="h-9 text-xs rounded-xl"
                />
              </div>
            </div>

            {/* Virtual Tour URL */}
            <div className="space-y-1">
              <label className="font-semibold text-foreground">Virtual Tour URL (Optional)</label>
              <Input
                type="url"
                placeholder="https://my.matterport.com/show/?m=..."
                value={formData.virtualTourUrl}
                onChange={(e) => setFormData({ ...formData, virtualTourUrl: e.target.value })}
                className="h-9 text-xs rounded-xl"
              />
            </div>

            {/* Description */}
            <div className="space-y-1">
              <label className="font-semibold text-foreground">Description</label>
              <textarea
                rows={3}
                placeholder="Describe key features, views, and amenities..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full rounded-xl border border-border bg-background p-2.5 text-xs focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* Featured Checkbox */}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="featured-checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
              />
              <label htmlFor="featured-checkbox" className="font-semibold text-foreground cursor-pointer">
                Mark as Featured Property (Highlights on Overview & Portal)
              </label>
            </div>

            <DialogFooter className="pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsFormOpen(false)}
                className="h-9 text-xs font-semibold rounded-xl"
              >
                Cancel
              </Button>
              <Button type="submit" className="h-9 text-xs font-semibold rounded-xl bg-primary text-white hover:bg-primary/90">
                {editingListing ? "Save Changes" : "Create Listing"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* 5. Delete Confirm Dialog */}
      <Dialog open={!!deleteTargetId} onOpenChange={() => setDeleteTargetId(null)}>
        <DialogContent className="max-w-md rounded-2xl bg-card border-border p-6">
          <DialogHeader>
            <DialogTitle className="text-base font-bold text-rose-600">Delete Property Listing</DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Are you sure you want to delete this listing? This action cannot be undone and will remove it from the Overview and Marketplace.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="pt-4">
            <Button
              variant="outline"
              onClick={() => setDeleteTargetId(null)}
              className="h-9 text-xs font-semibold rounded-xl"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (deleteTargetId) {
                  deleteListing(deleteTargetId);
                  setDeleteTargetId(null);
                }
              }}
              className="h-9 text-xs font-semibold rounded-xl bg-rose-600 text-white hover:bg-rose-700"
            >
              Confirm Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
