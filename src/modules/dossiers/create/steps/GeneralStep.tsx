import { useState } from "react";
import { motion } from "framer-motion";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import {
  Badge
} from "@/components/ui/badge";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import {
  Separator
} from "@/components/ui/separator";

import {
  ScrollArea
} from "@/components/ui/scroll-area";

import {
  MapPin,
  BedDouble,
  Bath,
  Car,
  Square,
  Calendar,
  Building2,
  Home,
  Phone,
  Mail,
  Globe,
  Download,
  Eye,
  FileText,
  Image as ImageIcon,
  FileSpreadsheet,
  FileArchive,
  Clock3,
  Pencil,
  Share2,
  Trash2,
  CheckCircle2,
  Star,
  Heart,
  PenTool,
  ChevronRight,
  Upload,
  File,
} from "lucide-react";

import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface PropertyDocument {
  id: number;
  name: string;
  type: "pdf" | "image" | "docx" | "xlsx";
  size: string;
  uploaded: string;
}

interface PropertyFeature {
  id: number;
  label: string;
}

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  description: string;
}

const property = {
  id: "#PR-2026-00891",

  title: "Luxury Modern Villa",

  status: "Active",

  listingType: "Sale",

  price: "CHF 1,791,000",

  city: "Delémont",

  state: "Jura",

  country: "Switzerland",

  address: "Rue de la Gare 18",

  postalCode: "2800",

  area: "144 m²",

  landArea: "920 m²",

  bedrooms: 4,

  bathrooms: 3,

  parking: 2,

  builtYear: 2022,

  description:
    "A stunning luxury villa situated in the heart of Delémont. This property features spacious living areas, premium finishes, landscaped gardens, panoramic mountain views, and excellent access to schools, shopping, and transportation.",

  coordinates: {
    lat: 47.3642,
    lng: 7.3445,
  },

  owner: {
    name: "Michael Scott",
    phone: "+41 78 554 2233",
    email: "owner@email.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300",
  },

  agent: {
    name: "Edyta Graf",
    company: "Swiss Luxury Estates",
    phone: "+41 76 807 7458",
    email: "edyta@agency.ch",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300",
  },

  images: [
    "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200",
    "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=1200",
    "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200",
  ],
};

const features: PropertyFeature[] = [
  { id: 1, label: "Swimming Pool" },
  { id: 2, label: "Private Garden" },
  { id: 3, label: "Balcony" },
  { id: 4, label: "Terrace" },
  { id: 5, label: "Air Conditioning" },
  { id: 6, label: "Solar Panels" },
  { id: 7, label: "Smart Home" },
  { id: 8, label: "Security System" },
  { id: 9, label: "Fiber Internet" },
  { id: 10, label: "Fireplace" },
  { id: 11, label: "Wine Cellar" },
  { id: 12, label: "Gym Room" },
];

const documents: PropertyDocument[] = [
  {
    id: 1,
    name: "Sales Contract.pdf",
    type: "pdf",
    size: "3.2 MB",
    uploaded: "12 Jan 2026",
  },
  {
    id: 2,
    name: "Property Images.zip",
    type: "image",
    size: "18 MB",
    uploaded: "14 Jan 2026",
  },
  {
    id: 3,
    name: "Floor Plan.pdf",
    type: "pdf",
    size: "1.8 MB",
    uploaded: "14 Jan 2026",
  },
  {
    id: 4,
    name: "Ownership.docx",
    type: "docx",
    size: "520 KB",
    uploaded: "15 Jan 2026",
  },
  {
    id: 5,
    name: "Price Evaluation.xlsx",
    type: "xlsx",
    size: "780 KB",
    uploaded: "16 Jan 2026",
  },
];

const activities: TimelineItem[] = [
  {
    id: 1,
    title: "Property Created",
    date: "10 Jan 2026",
    description: "Property was added into the CRM.",
  },
  {
    id: 2,
    title: "Photos Uploaded",
    date: "11 Jan 2026",
    description: "Professional photography completed.",
  },
  {
    id: 3,
    title: "Contract Attached",
    date: "12 Jan 2026",
    description: "Sales agreement uploaded.",
  },
  {
    id: 4,
    title: "Published",
    date: "13 Jan 2026",
    description: "Listing became publicly available.",
  },
];

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 25,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
    },
  },
};

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

function getDocumentIcon(type: PropertyDocument["type"]) {
  switch (type) {
    case "pdf":
      return <FileText className="h-6 w-6 text-red-500" />;

    case "image":
      return <ImageIcon className="h-6 w-6 text-blue-500" />;

    case "xlsx":
      return (
        <FileSpreadsheet className="h-6 w-6 text-green-600" />
      );

    case "docx":
      return <FileArchive className="h-6 w-6 text-indigo-500" />;

    default:
      return <FileText className="h-6 w-6" />;
  }
}

export default function PropertyDetails() {
  const [selectedImage, setSelectedImage] = useState(
    property.images[0]
  );

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="show"
      className="space-y-8 p-6"
    >
      {/* Hero */}
      <motion.div variants={fadeUp}>
        <Card className="overflow-hidden border-0 shadow-xl">
          <div className="grid gap-0 lg:grid-cols-3">
            {/* Gallery */}
            <div className="lg:col-span-2">
              <div className="relative h-[500px] overflow-hidden bg-slate-100">
                <motion.img
                  key={selectedImage}
                  src={selectedImage}
                  alt={property.title}
                  initial={{ opacity: 0.3, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="h-full w-full object-cover"
                />

                <div className="absolute left-6 top-6 flex gap-3">
                  <Badge className="bg-emerald-600 hover:bg-emerald-600">
                    {property.status}
                  </Badge>

                  <Badge variant="secondary">
                    {property.listingType}
                  </Badge>
                </div>

                <div className="absolute bottom-6 left-6 rounded-xl bg-black/45 px-5 py-4 text-white backdrop-blur">
                  <h1 className="text-3xl font-bold">
                    {property.title}
                  </h1>

                  <div className="mt-2 flex items-center gap-2 text-sm text-white/90">
                    <MapPin className="h-4 w-4" />
                    {property.address}, {property.city},{" "}
                    {property.country}
                  </div>
                </div>
              </div>

              {/* Thumbnails */}

              <div className="flex gap-3 overflow-x-auto border-t bg-slate-50 p-4">
                {property.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(image)}
                    className={`overflow-hidden rounded-xl border-2 transition-all ${selectedImage === image
                      ? "border-blue-600"
                      : "border-transparent hover:border-slate-300"
                      }`}
                  >
                    <img
                      src={image}
                      alt=""
                      className="h-24 w-36 object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Sidebar */}

            <div className="flex flex-col justify-between bg-white">
              <CardContent className="space-y-8 p-8">
                <div>
                  <p className="text-sm text-slate-500">
                    Property ID
                  </p>

                  <h2 className="mt-1 text-lg font-semibold">
                    {property.id}
                  </h2>
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Listing Price
                  </p>

                  <h2 className="mt-2 text-4xl font-bold text-blue-700">
                    {property.price}
                  </h2>
                </div>

                <Separator />

                {/* Actions */}

                {/* <div className="space-y-3">
                  <Button className="w-full justify-start gap-2">
                    <Pencil className="h-4 w-4" />
                    Edit Property
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                  >
                    <Share2 className="h-4 w-4" />
                    Share Listing
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                  >
                    <Heart className="h-4 w-4" />
                    Add to Favorites
                  </Button>

                  <Button
                    variant="destructive"
                    className="w-full justify-start gap-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete Property
                  </Button>
                </div> */}

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">
                      Bedrooms
                    </span>

                    <span className="flex items-center gap-2 font-semibold">
                      <BedDouble className="h-5 w-5 text-blue-600" />
                      {property.bedrooms}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">
                      Bathrooms
                    </span>

                    <span className="flex items-center gap-2 font-semibold">
                      <Bath className="h-5 w-5 text-blue-600" />
                      {property.bathrooms}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">
                      Parking
                    </span>

                    <span className="flex items-center gap-2 font-semibold">
                      <Car className="h-5 w-5 text-blue-600" />
                      {property.parking}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">
                      Built Year
                    </span>

                    <span className="flex items-center gap-2 font-semibold">
                      <Calendar className="h-5 w-5 text-blue-600" />
                      {property.builtYear}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">
                      Living Area
                    </span>

                    <span className="flex items-center gap-2 font-semibold">
                      <Square className="h-5 w-5 text-blue-600" />
                      {property.area}
                    </span>
                  </div>
                </div>
              </CardContent>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Summary Cards */}

      <motion.div
        variants={fadeUp}
        className="grid gap-6 md:grid-cols-2 xl:grid-cols-4"
      >
        <Card className="shadow-md transition-all hover:-translate-y-1 hover:shadow-xl">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-full bg-blue-100 p-4">
              <Home className="h-7 w-7 text-blue-600" />
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Property Type
              </p>

              <h3 className="text-lg font-semibold">
                Luxury Villa
              </h3>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md transition-all hover:-translate-y-1 hover:shadow-xl">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-full bg-emerald-100 p-4">
              <Building2 className="h-7 w-7 text-emerald-600" />
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Land Area
              </p>

              <h3 className="text-lg font-semibold">
                {property.landArea}
              </h3>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md transition-all hover:-translate-y-1 hover:shadow-xl">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-full bg-amber-100 p-4">
              <Star className="h-7 w-7 text-amber-600" />
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Listing Status
              </p>

              <h3 className="text-lg font-semibold">
                {property.status}
              </h3>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md transition-all hover:-translate-y-1 hover:shadow-xl">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-full bg-violet-100 p-4">
              <CheckCircle2 className="h-7 w-7 text-violet-600" />
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Availability
              </p>

              <h3 className="text-lg font-semibold">
                Ready to Move
              </h3>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* ===========================
    PROPERTY INFORMATION
=========================== */}

      <motion.div variants={fadeUp}>
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              Property Information
            </CardTitle>
          </CardHeader>

          <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            <div className="flex items-center gap-3">
              <Home className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">
                  Property Type
                </p>
                <p className="font-semibold">Luxury Villa</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Square className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">
                  Living Area
                </p>
                <p className="font-semibold">{property.area}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Square className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">
                  Land Area
                </p>
                <p className="font-semibold">
                  {property.landArea}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <BedDouble className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">
                  Bedrooms
                </p>
                <p className="font-semibold">
                  {property.bedrooms}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Bath className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">
                  Bathrooms
                </p>
                <p className="font-semibold">
                  {property.bathrooms}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Car className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">
                  Parking
                </p>
                <p className="font-semibold">
                  {property.parking}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">
                  Built Year
                </p>
                <p className="font-semibold">
                  {property.builtYear}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Badge className="h-5 w-5 rounded-full px-2">
                {property.status}
              </Badge>

              <div>
                <p className="text-sm text-muted-foreground">
                  Status
                </p>

                <p className="font-semibold">
                  {property.status}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Star className="h-5 w-5 text-yellow-500" />

              <div>
                <p className="text-sm text-muted-foreground">
                  Listing Type
                </p>

                <p className="font-semibold">
                  {property.listingType}
                </p>
              </div>
            </div>

          </CardContent>
        </Card>
      </motion.div>

      {/* ===========================
      DESCRIPTION
=========================== */}

      <motion.div
        variants={fadeUp}
        className="mt-6"
      >
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle>Description</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="leading-7 text-muted-foreground">
              {property.description}
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* ===========================
      PROPERTY FEATURES
=========================== */}

      <motion.div
        variants={fadeUp}
        className="mt-6"
      >
        <Card className="shadow-lg border-0">

          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              Property Features
            </CardTitle>
          </CardHeader>

          <CardContent>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

              {features.map((feature) => (

                <motion.div
                  key={feature.id}
                  whileHover={{
                    scale: 1.03,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                >
                  <Card className="border bg-muted/20 hover:bg-primary/5 transition-all cursor-pointer">

                    <CardContent className="flex items-center gap-3 p-4">

                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />

                      <span className="text-sm font-medium">
                        {feature.label}
                      </span>

                    </CardContent>

                  </Card>
                </motion.div>

              ))}

            </div>

          </CardContent>

        </Card>
      </motion.div>

      {/* ==========================================
      LOCATION + AGENT + OWNER
========================================== */}

      <motion.div
        variants={fadeUp}
        className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6"
      >

        {/* ================= LOCATION ================= */}

        <Card className="lg:col-span-2 shadow-lg border-0">

          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Property Location
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">

            <div className="grid md:grid-cols-2 gap-5">

              <div>
                <p className="text-sm text-muted-foreground">
                  Street Address
                </p>

                <p className="font-semibold">
                  {property.address}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  City
                </p>

                <p className="font-semibold">
                  {property.city}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  State
                </p>

                <p className="font-semibold">
                  {property.state}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Country
                </p>

                <p className="font-semibold">
                  {property.country}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  ZIP Code
                </p>

                <p className="font-semibold">
                  {property.postalCode}
                </p>
              </div>

            </div>

            <div className="overflow-hidden rounded-xl border h-[350px]">

              <iframe
                title="Property Location"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(
                  `${property.address}, ${property.city}`
                )}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                className="w-full h-full"
                loading="lazy"
              />

            </div>

          </CardContent>

        </Card>

        {/* ================= RIGHT SIDEBAR ================= */}

        <div className="space-y-6">

          {/* AGENT */}

          <Card className="shadow-lg border-0">

            <CardHeader>
              <CardTitle>Listing Agent</CardTitle>
            </CardHeader>

            <CardContent className="space-y-5">

              <div className="flex items-center gap-4">

                <Avatar className="h-16 w-16">
                  <AvatarImage src={property.agent.avatar} />
                  <AvatarFallback>
                    {property.agent.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                <div>

                  <h3 className="font-semibold text-lg">
                    {property.agent.name}
                  </h3>

                  <p className="text-sm text-muted-foreground">
                    {property.agent.company}
                  </p>

                </div>

              </div>

              <Separator />

              <div className="space-y-3">

                <div className="flex items-center gap-3">

                  <Phone className="h-4 w-4 text-primary" />

                  <span>{property.agent.phone}</span>

                </div>

                <div className="flex items-center gap-3">

                  <Mail className="h-4 w-4 text-primary" />

                  <span>{property.agent.email}</span>

                </div>

              </div>

              <div className="grid grid-cols-2 gap-3">

                <Button className="w-full">
                  Call
                </Button>

                <Button
                  variant="outline"
                  className="w-full"
                >
                  Email
                </Button>

              </div>

            </CardContent>

          </Card>

          {/* OWNER */}

          <Card className="shadow-lg border-0">

            <CardHeader>
              <CardTitle>Property Owner</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">

              <div className="flex items-center gap-4">

                <Avatar className="h-14 w-14">
                  <AvatarImage src={property.owner.avatar} />
                  <AvatarFallback>
                    {property.owner.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                <div>

                  <h3 className="font-semibold">
                    {property.owner.name}
                  </h3>

                  <p className="text-sm text-muted-foreground">
                    Property Owner
                  </p>

                </div>

              </div>

              <Separator />

              <div className="space-y-3">

                <div className="flex items-center gap-3">

                  <Phone className="h-4 w-4 text-primary" />

                  <span>{property.owner.phone}</span>

                </div>

                <div className="flex items-center gap-3">

                  <Mail className="h-4 w-4 text-primary" />

                  <span>{property.owner.email}</span>

                </div>

              </div>

              <Button
                variant="secondary"
                className="w-full"
              >
                Contact Owner
              </Button>

            </CardContent>

          </Card>

        </div>

      </motion.div>
      {/* ==================== DOCUMENTS ==================== */}
      <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Property Documents
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              All important files related to this property.
            </p>
          </div>

          {/* <Button variant="outline" className="rounded-xl">
            <Upload className="mr-2 h-4 w-4" />
            Upload Document
          </Button> */}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            {
              title: "Floor Plan",
              type: "PDF",
              size: "2.8 MB",
              icon: FileText,
              color: "bg-red-100 text-red-600",
            },
            {
              title: "Ownership Deed",
              type: "DOC",
              size: "850 KB",
              icon: File,
              color: "bg-blue-100 text-blue-600",
            },
            {
              title: "Electrical Layout",
              type: "DWG",
              size: "4.2 MB",
              icon: PenTool,
              color: "bg-amber-100 text-amber-600",
            },
            {
              title: "Property Images",
              type: "ZIP",
              size: "18 MB",
              icon: ImageIcon,
              color: "bg-emerald-100 text-emerald-600",
            },
          ].map((doc) => {
            const Icon = doc.icon;

            return (
              <motion.div
                key={doc.title}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="group rounded-2xl border border-slate-200 p-5 transition-all hover:border-blue-300 hover:shadow-lg"
              >
                <div
                  className={cn(
                    "mb-4 flex h-14 w-14 items-center justify-center rounded-2xl",
                    doc.color
                  )}
                >
                  <Icon className="h-7 w-7" />
                </div>

                <h3 className="font-semibold text-slate-900">
                  {doc.title}
                </h3>

                <div className="mt-2 flex items-center justify-between text-sm text-slate-500">
                  <span>{doc.type}</span>
                  <span>{doc.size}</span>
                </div>

                <div className="mt-5 flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 rounded-xl"
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    View
                  </Button>

                  <Button
                    size="sm"
                    className="rounded-xl bg-blue-600 hover:bg-blue-700"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ==================== END DOCUMENTS ==================== */}

      <div className="mt-8 grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">

        {/* ==================== ACTIVITY TIMELINE ==================== */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-xl font-bold text-slate-900">
            Activity Timeline
          </h2>

          <div className="space-y-6">
            {[
              {
                title: "Property Listed",
                desc: "Luxury Villa was added to the marketplace.",
                time: "2 weeks ago",
              },
              {
                title: "Price Updated",
                desc: "Price reduced by $50,000 after owner approval.",
                time: "10 days ago",
              },
              {
                title: "Documents Uploaded",
                desc: "Ownership deed and floor plan uploaded.",
                time: "4 days ago",
              },
              {
                title: "Inspection Scheduled",
                desc: "Property inspection booked for next Monday.",
                time: "Today",
              },
            ].map((activity, index) => (
              <div key={activity.title} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="h-3 w-3 rounded-full bg-blue-600" />
                  {index !== 3 && (
                    <div className="mt-1 h-full w-px bg-slate-200" />
                  )}
                </div>

                <div className="pb-6">
                  <h3 className="font-semibold text-slate-900">
                    {activity.title}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {activity.desc}
                  </p>

                  <span className="mt-2 inline-block text-xs text-slate-400">
                    {activity.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ==================== NOTES ==================== */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">
              Private Notes
            </h2>

            <Button size="sm" className="rounded-xl">
              Save Notes
            </Button>
          </div>

          <Textarea
            rows={12}
            placeholder="Write notes about this property..."
            defaultValue={`• Client requested a second inspection.

• Swimming pool requires minor maintenance.

• Kitchen was renovated in 2024.

• Owner is open to negotiation.

• All legal documents verified.`}
            className="rounded-2xl"
          />
        </div>
      </div>

    </motion.div>
  );
}