import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePropertyStore } from "@/store/propertyStore";
import { motion, AnimatePresence } from "framer-motion";
import {
    IconMapPin,
    IconBed,
    IconBath,
    IconRuler,
    IconBuilding,
    IconParking,
    IconLeaf,
    IconStar,
    IconVideo,
    IconFile,
    IconChevronLeft,
    IconChevronRight,
    IconEdit,
    IconCompass,
    IconCalendar,
    IconShield,
    IconBulb,
    IconDeviceLaptop,
    IconDiamond,
    IconCheck,
    IconExternalLink,
    IconArmchair,
} from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

import {
    PROPERTY_STATUS_OPTIONS,
    PROPERTY_SUB_TYPE_OPTIONS,
    LISTING_TYPE_OPTIONS,
    FURNISHING_STATUS_OPTIONS,
    FACING_DIRECTION_OPTIONS,
} from "@/types/property.types";

// Placeholder images
const IMAGES = [
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1400&q=90",
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1400&q=90",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1400&q=90",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1400&q=90",
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1400&q=90",
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
const formatPrice = (price: number | string, currency: string = 'CHF') =>
    new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency,
        maximumFractionDigits: 0,
    }).format(Number(price));

const getStatusConfig = (status: string) => {
    switch (status) {
        case "active": return { label: "Active", className: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" };
        case "draft": return { label: "Draft", className: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/20" };
        case "sold": return { label: "Sold", className: "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/20" };
        case "archived": return { label: "Archived", className: "bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/20" };
        default: return { label: "Inactive", className: "bg-zinc-500/15 text-zinc-600 dark:text-zinc-400 border-zinc-500/20" };
    }
};

const getLabel = (options: {label: string, value: string}[], value?: string) => 
    options.find(o => o.value === value)?.label ?? value ?? "—";

// ─── Sub-components ──────────────────────────────────────────────────────────

function AmenityTag({ label }: { label: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/8 border border-primary/15 text-sm font-medium text-foreground/80"
        >
            <IconCheck size={13} className="text-primary shrink-0" />
            {label}
        </motion.div>
    );
}

function StatCard({
    icon: Icon,
    label,
    value,
    sub,
}: {
    icon: React.ElementType;
    label: string;
    value: string | number;
    sub?: string;
}) {
    return (
        <div className="flex flex-col gap-1 p-4 rounded-2xl bg-muted/50 border border-border/60 hover:border-primary/30 hover:bg-muted/80 transition-all duration-200">
            <div className="flex items-center gap-2 text-muted-foreground mb-0.5">
                <Icon size={15} />
                <span className="text-xs font-medium uppercase tracking-wider">
                    {label}
                </span>
            </div>
            <span className="text-xl font-semibold text-foreground leading-none">
                {value}
            </span>
            {sub && (
                <span className="text-xs text-muted-foreground">{sub}</span>
            )}
        </div>
    );
}

function DocumentCard({
    label,
    href,
}: {
    label: string;
    href: string | null;
}) {
    return (
        <div
            className={cn(
                "group flex items-center justify-between p-4 rounded-xl border transition-all duration-200",
                href
                    ? "border-border/60 bg-muted/30 hover:border-primary/40 hover:bg-muted/60 cursor-pointer"
                    : "border-border/30 bg-muted/10 opacity-50"
            )}
            onClick={() => href && window.open(href, '_blank')}
        >
            <div className="flex items-center gap-3">
                <div
                    className={cn(
                        "p-2 rounded-lg",
                        href
                            ? "bg-primary/10 text-primary"
                            : "bg-muted text-muted-foreground"
                    )}
                >
                    <IconFile size={16} />
                </div>
                <div>
                    <p className="text-sm font-medium text-foreground">
                        {label}
                    </p>
                    <p className="text-xs text-muted-foreground">
                        {href ? "Available" : "Not uploaded"}
                    </p>
                </div>
            </div>
            {href && (
                <IconExternalLink
                    size={15}
                    className="text-muted-foreground group-hover:text-primary transition-colors"
                />
            )}
        </div>
    );
}

// ─── Gallery ─────────────────────────────────────────────────────────────────
function Gallery({ images }: { images: string[] }) {
    const [active, setActive] = useState(0);

    const prev = () => setActive((i) => (i - 1 + images.length) % images.length);
    const next = () => setActive((i) => (i + 1) % images.length);

    if (!images || images.length === 0) return null;

    return (
        <div className="w-full space-y-3">
            {/* Main image */}
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-muted">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={active}
                        src={images[active]}
                        alt={`Property view ${active + 1}`}
                        className="absolute inset-0 h-full w-full object-cover"
                        initial={{ opacity: 0, scale: 1.04 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.97 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                    />
                </AnimatePresence>

                {/* Nav arrows */}
                <button
                    onClick={prev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 transition-all"
                >
                    <IconChevronLeft size={18} />
                </button>
                <button
                    onClick={next}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 transition-all"
                >
                    <IconChevronRight size={18} />
                </button>

                {/* Counter */}
                <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-xs font-medium">
                    {active + 1} / {images.length}
                </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                {images.map((src, i) => (
                    <button
                        key={i}
                        onClick={() => setActive(i)}
                        className={cn(
                            "relative shrink-0 h-16 w-24 rounded-xl overflow-hidden border-2 transition-all duration-200",
                            i === active
                                ? "border-primary scale-[1.03]"
                                : "border-transparent opacity-60 hover:opacity-90"
                        )}
                    >
                        <img
                            src={src}
                            alt=""
                            className="h-full w-full object-cover"
                        />
                    </button>
                ))}
            </div>
        </div>
    );
}

// ─── Section wrapper ──────────────────────────────────────────────────────────
function Section({
    title,
    children,
    className,
}: {
    title: string;
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div className={cn("space-y-4", className)}>
            <h2 className="text-base font-semibold text-foreground tracking-tight">
                {title}
            </h2>
            {children}
        </div>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function PropertyViewPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { fetchPropertyById, selectedProperty: p, detailsLoading } = usePropertyStore();

    useEffect(() => {
        if (id) {
            fetchPropertyById(id);
        }
    }, [id, fetchPropertyById]);

    if (detailsLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-muted-foreground gap-4">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="text-sm font-medium">Loading property details...</p>
            </div>
        );
    }

    if (!p) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-muted-foreground gap-4">
                <p className="text-sm font-medium">Property not found.</p>
                <Button onClick={() => navigate("/properties/list")} variant="outline">
                    Back to Properties
                </Button>
            </div>
        );
    }

    const status = getStatusConfig(p.classification?.listing_status ?? "draft");
    const originalPrice = Number(p.pricing?.price || 0);
    const discount = p.pricing?.discount ? Number(p.pricing.discount) : 0;
    const finalPrice = originalPrice - discount;
    
    // Extract actual images or use placeholders if none
    const propertyImages = p.media?.images?.length ? p.media.images.map(img => img.url) : IMAGES;

    return (
        <div className="min-h-screen bg-background text-foreground">
            <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

                {/* ── Header bar ── */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-wrap items-start justify-between gap-4"
                >
                    <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                            <Badge
                                variant="outline"
                                className={cn(
                                    "text-xs font-semibold px-2.5 py-0.5 rounded-full border",
                                    status.className
                                )}
                            >
                                {status.label}
                            </Badge>
                            <Badge
                                variant="outline"
                                className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-primary/8 border-primary/20 text-primary"
                            >
                                {p.classification?.transaction_type === "sale" ? "For Sale" : "For Rent"}
                            </Badge>
                            {p.classification?.sub_type && (
                                <Badge
                                    variant="outline"
                                    className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-muted border-border/60 text-muted-foreground"
                                >
                                    {getLabel(PROPERTY_SUB_TYPE_OPTIONS, p.classification.sub_type)}
                                </Badge>
                            )}
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight">
                            {p.title}
                        </h1>
                        <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
                            <IconMapPin size={14} className="text-primary shrink-0" />
                            <span>
                                {[p.location?.address_line_1, p.location?.city, p.location?.state, p.location?.country, p.location?.zip_code]
                                    .filter(Boolean)
                                    .join(", ")}
                            </span>
                        </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2 shrink-0">
                        <Button onClick={() => navigate(`/properties/edit/${p.id}`)} size="sm" className="gap-1.5 rounded-full">
                            <IconEdit size={15} />
                            Edit
                        </Button>
                    </div>
                </motion.div>

                {/* ── Main grid ── */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* ── Left column (2/3) ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 }}
                        className="lg:col-span-2 space-y-8"
                    >
                        {/* Gallery */}
                        <Gallery images={propertyImages} />

                        {/* Quick stats bar */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            <StatCard
                                icon={IconBed}
                                label="Bedrooms"
                                value={p.dimensions?.bedrooms ?? "—"}
                            />
                            <StatCard
                                icon={IconBath}
                                label="Bathrooms"
                                value={p.dimensions?.bathrooms ?? "—"}
                            />
                            <StatCard
                                icon={IconRuler}
                                label="Living Area"
                                value={p.dimensions?.living_area ? `${Number(p.dimensions.living_area).toLocaleString()} m²` : "—"}
                            />
                            <StatCard
                                icon={IconBuilding}
                                label="Floor"
                                value={
                                    p.dimensions?.floor_number && p.dimensions?.total_floors
                                        ? `${p.dimensions.floor_number} / ${p.dimensions.total_floors}`
                                        : "—"
                                }
                            />
                        </div>

                        {/* Tabs */}
                        <Tabs defaultValue="details" className="w-full">
                            <TabsList className="h-10 p-1 rounded-xl bg-muted/60 border border-border/50 w-full sm:w-auto">
                                {[
                                    { value: "details", label: "Details" },
                                    { value: "amenities", label: "Amenities" },
                                    { value: "documents", label: "Media & Docs" },
                                    { value: "financial", label: "Financial" },
                                ].map((tab) => (
                                    <TabsTrigger
                                        key={tab.value}
                                        value={tab.value}
                                        className="rounded-lg text-sm font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm"
                                    >
                                        {tab.label}
                                    </TabsTrigger>
                                ))}
                            </TabsList>

                            {/* ── Details ── */}
                            <TabsContent value="details" className="mt-6 space-y-6">
                                <Section title="About this property">
                                    <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                                        {p.description || "No description provided."}
                                    </p>
                                </Section>

                                <Separator />

                                <Section title="Property specifications">
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                        {[
                                            {
                                                icon: IconArmchair,
                                                label: "Furnishing",
                                                value: getLabel(FURNISHING_STATUS_OPTIONS, p.equipment?.furnishing_status),
                                            },
                                            {
                                                icon: IconCompass,
                                                label: "Facing",
                                                value: getLabel(FACING_DIRECTION_OPTIONS, p.orientation?.facing_direction),
                                            },
                                            {
                                                icon: IconCalendar,
                                                label: "Year Built",
                                                value: p.construction?.year_built ?? "—",
                                            },
                                            {
                                                icon: IconLeaf,
                                                label: "Balconies",
                                                value: p.dimensions?.balconies ?? "—",
                                            },
                                            {
                                                icon: IconParking,
                                                label: "Parking Slots",
                                                value: p.parking?.parking_slots ?? "—",
                                            },
                                            {
                                                icon: IconBuilding,
                                                label: "Property Type",
                                                value: getLabel(PROPERTY_SUB_TYPE_OPTIONS, p.classification?.sub_type),
                                            },
                                        ].map(({ icon: Icon, label, value }) => (
                                            <div
                                                key={label}
                                                className="flex items-start gap-3 p-3 rounded-xl bg-muted/40 border border-border/50"
                                            >
                                                <div className="p-1.5 rounded-lg bg-primary/10 text-primary mt-0.5 shrink-0">
                                                    <Icon size={14} />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-muted-foreground uppercase tracking-wide">
                                                        {label}
                                                    </p>
                                                    <p className="text-sm font-medium text-foreground mt-0.5">
                                                        {String(value)}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </Section>

                                <Separator />

                                <Section title="Parking">
                                    <div className="flex flex-wrap gap-3">
                                        <div
                                            className={cn(
                                                "flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium",
                                                p.parking?.covered_parking
                                                    ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                                                    : "bg-muted/40 border-border/40 text-muted-foreground"
                                            )}
                                        >
                                            <IconParking size={15} />
                                            Covered Parking
                                            {p.parking?.covered_parking ? (
                                                <IconCheck size={13} />
                                            ) : null}
                                        </div>
                                        <div
                                            className={cn(
                                                "flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium",
                                                p.parking?.open_parking
                                                    ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                                                    : "bg-muted/40 border-border/40 text-muted-foreground"
                                            )}
                                        >
                                            <IconParking size={15} />
                                            Open Parking
                                            {p.parking?.open_parking ? (
                                                <IconCheck size={13} />
                                            ) : null}
                                        </div>
                                    </div>
                                </Section>

                                <Separator />

                                <Section title="Neighborhood">
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {p.location?.neighborhood_description || "No neighborhood details provided."}
                                    </p>
                                    {p.location?.coordinates?.latitude && p.location?.coordinates?.longitude && (
                                        <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                                            <IconMapPin size={13} className="text-primary" />
                                            <span>
                                                {p.location.coordinates.latitude}, {p.location.coordinates.longitude}
                                            </span>
                                        </div>
                                    )}
                                </Section>

                                {p.seo?.keywords && p.seo.keywords.length > 0 && (
                                    <>
                                        <Separator />
                                        <Section title="Tags">
                                            <div className="flex flex-wrap gap-2">
                                                {p.seo.keywords.map((kw) => (
                                                    <span
                                                        key={kw}
                                                        className="px-2.5 py-1 rounded-full bg-muted border border-border/60 text-xs text-muted-foreground capitalize"
                                                    >
                                                        #{kw}
                                                    </span>
                                                ))}
                                            </div>
                                        </Section>
                                    </>
                                )}
                            </TabsContent>

                            {/* ── Amenities ── */}
                            <TabsContent value="amenities" className="mt-6 space-y-6">
                                {[
                                    {
                                        title: "Interior Amenities",
                                        icon: IconBulb,
                                        items: p.equipment?.interior_amenities ?? [],
                                        color: "text-violet-500",
                                    },
                                    {
                                        title: "Exterior Features",
                                        icon: IconLeaf,
                                        items: p.equipment?.exterior_amenities ?? [],
                                        color: "text-emerald-500",
                                    },
                                    {
                                        title: "Wellness & Recreation",
                                        icon: IconDiamond,
                                        items: p.equipment?.wellness_amenities ?? [],
                                        color: "text-amber-500",
                                    },
                                    {
                                        title: "Security & Safety",
                                        icon: IconShield,
                                        items: p.equipment?.security_amenities ?? [],
                                        color: "text-red-500",
                                    },
                                    {
                                        title: "Smart Home",
                                        icon: IconDeviceLaptop,
                                        items: p.equipment?.smart_home_features ?? [],
                                        color: "text-blue-500",
                                    },
                                ].map(
                                    ({ title, icon: Icon, items, color }) =>
                                        items.length > 0 && (
                                            <Section key={title} title="">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <Icon
                                                        size={16}
                                                        className={color}
                                                    />
                                                    <h3 className="text-sm font-semibold text-foreground">
                                                        {title}
                                                    </h3>
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {items.map((item) => (
                                                        <AmenityTag
                                                            key={item}
                                                            label={item}
                                                        />
                                                    ))}
                                                </div>
                                            </Section>
                                        )
                                )}
                            </TabsContent>

                            {/* ── Media & Documents ── */}
                            <TabsContent value="documents" className="mt-6 space-y-6">
                                <Section title="Virtual Tours & Video">
                                    <div className="flex flex-wrap gap-3">
                                        {p.media?.videos?.map((vid, idx) => (
                                            <a
                                                key={idx}
                                                href={vid.url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border/60 bg-muted/40 hover:border-primary/40 hover:bg-muted/60 text-sm font-medium text-foreground transition-all"
                                            >
                                                <IconVideo size={15} className="text-red-500" />
                                                Watch Video Tour {idx + 1}
                                                <IconExternalLink size={12} className="text-muted-foreground" />
                                            </a>
                                        ))}
                                        
                                        {p.media?.virtual_tours?.map((tour, idx) => (
                                            <a
                                                key={idx}
                                                href={tour.url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border/60 bg-muted/40 hover:border-primary/40 hover:bg-muted/60 text-sm font-medium text-foreground transition-all"
                                            >
                                                <IconStar size={15} className="text-amber-500" />
                                                Virtual 3D Tour {idx + 1}
                                                <IconExternalLink size={12} className="text-muted-foreground" />
                                            </a>
                                        ))}

                                        {(!p.media?.videos?.length && !p.media?.virtual_tours?.length) && (
                                            <p className="text-sm text-muted-foreground">No virtual tours available.</p>
                                        )}
                                    </div>
                                </Section>
                                
                                <Separator />

                                <Section title="Property documents">
                                    {p.media?.documents?.length ? (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {p.media.documents.map((doc, idx) => (
                                                <DocumentCard
                                                    key={idx}
                                                    label={doc.title || `Document ${idx+1}`}
                                                    href={doc.url}
                                                />
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-sm text-muted-foreground">No documents uploaded.</p>
                                    )}
                                    
                                    <p className="text-xs text-muted-foreground mt-4 flex items-center gap-1.5">
                                        <IconShield size={13} className="text-emerald-500" />
                                        All documents are securely stored and encrypted.
                                    </p>
                                </Section>
                            </TabsContent>

                            {/* ── Financial ── */}
                            <TabsContent value="financial" className="mt-6 space-y-6">
                                <Section title="Pricing breakdown">
                                    <div className="rounded-2xl border border-border/60 overflow-hidden divide-y divide-border/50">
                                        {[
                                            {
                                                label: "Listed price",
                                                value: formatPrice(p.pricing?.price || 0, p.pricing?.currency),
                                                highlight: false,
                                            },
                                            {
                                                label: "Discount",
                                                value: discount
                                                    ? `− ${formatPrice(String(discount), p.pricing?.currency)}`
                                                    : "None",
                                                highlight: false,
                                                accent: "text-emerald-500",
                                            },
                                            {
                                                label: "Final price",
                                                value: formatPrice(
                                                    String(finalPrice), p.pricing?.currency
                                                ),
                                                highlight: true,
                                            },
                                        ].map(
                                            ({
                                                label,
                                                value,
                                                highlight,
                                                accent,
                                            }) => (
                                                <div
                                                    key={label}
                                                    className={cn(
                                                        "flex items-center justify-between px-5 py-4",
                                                        highlight
                                                            ? "bg-primary/5"
                                                            : "bg-background/50"
                                                    )}
                                                >
                                                    <span
                                                        className={cn(
                                                            "text-sm",
                                                            highlight
                                                                ? "font-semibold text-foreground"
                                                                : "text-muted-foreground"
                                                        )}
                                                    >
                                                        {label}
                                                    </span>
                                                    <span
                                                        className={cn(
                                                            "text-sm font-semibold",
                                                            accent ??
                                                            (highlight
                                                                ? "text-primary"
                                                                : "text-foreground")
                                                        )}
                                                    >
                                                        {value}
                                                    </span>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </Section>

                                <Separator />

                                <Section title="Recurring charges">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <div className="p-4 rounded-xl bg-muted/40 border border-border/50 space-y-1">
                                            <p className="text-xs text-muted-foreground uppercase tracking-wide">
                                                Annual Property Tax
                                            </p>
                                            <p className="text-lg font-semibold text-foreground">
                                                {p.financials?.annual_property_tax
                                                    ? formatPrice(p.financials.annual_property_tax, p.pricing?.currency)
                                                    : "—"}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                Per year
                                            </p>
                                        </div>
                                        <div className="p-4 rounded-xl bg-muted/40 border border-border/50 space-y-1">
                                            <p className="text-xs text-muted-foreground uppercase tracking-wide">
                                                Maintenance Charges
                                            </p>
                                            <p className="text-lg font-semibold text-foreground">
                                                {p.financials?.maintenance_charges
                                                    ? formatPrice(p.financials.maintenance_charges, p.pricing?.currency)
                                                    : "—"}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                Periodical
                                            </p>
                                        </div>
                                        <div className="p-4 rounded-xl bg-muted/40 border border-border/50 space-y-1">
                                            <p className="text-xs text-muted-foreground uppercase tracking-wide">
                                                Monthly HOA
                                            </p>
                                            <p className="text-lg font-semibold text-foreground">
                                                {p.financials?.monthly_hoa_charges
                                                    ? formatPrice(p.financials.monthly_hoa_charges, p.pricing?.currency)
                                                    : "—"}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                Per month
                                            </p>
                                        </div>
                                    </div>
                                </Section>
                            </TabsContent>
                        </Tabs>
                    </motion.div>

                    {/* ── Right column (1/3) ── */}
                    <div className="space-y-6">
                        <div className="p-5 rounded-2xl border border-border/60 bg-muted/20 shadow-sm sticky top-24">
                            <h3 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider">
                                At a Glance
                            </h3>
                            <ul className="space-y-3">
                                <li className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Ref</span>
                                    <span className="font-semibold text-foreground">#{p.internal_reference || "N/A"}</span>
                                </li>
                                <li className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Condition</span>
                                    <span className="font-semibold text-foreground capitalize">
                                        {p.construction?.condition ? p.construction.condition.replace(/_/g, " ") : "—"}
                                    </span>
                                </li>
                                <li className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Price Type</span>
                                    <span className="font-semibold text-foreground capitalize">
                                        {p.pricing?.price_type ? p.pricing.price_type.replace(/_/g, " ") : "—"}
                                    </span>
                                </li>
                                <li className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">VAT</span>
                                    <span className="font-semibold text-foreground">
                                        {p.pricing?.vat_applicable ? `${p.pricing.vat_rate || 0}% Applicable` : "Not Applicable"}
                                    </span>
                                </li>
                                <li className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Confidentiality</span>
                                    <span className="font-semibold text-foreground capitalize">
                                        {p.location?.confidentiality_level || "—"}
                                    </span>
                                </li>
                            </ul>
                            
                            <Button className="w-full mt-6" onClick={() => navigate(`/properties/edit/${p.id}`)}>
                                Edit Property Details
                            </Button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}