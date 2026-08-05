import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    Calendar,
    Clock,
    MapPin,
    Tag,
    Users,
    Trash2,
    X,
    Save,
    Upload,
    FileText,
    Image as ImageIcon,
    File,
    Search,
    Loader2,
    Navigation,
} from "lucide-react"

import {
    GoogleMap,
    MarkerF,
    Autocomplete,
    useJsApiLoader,
} from "@react-google-maps/api"

import type {
    AgendaPayload,
    AgendaEvent,
    AgendaUser,
} from "@/types/agenda.types"

import { useAgendaStore } from "@/store/agendaStore"

interface EventDialogProps {
    open: boolean;
    event: AgendaEvent | null;
    selectedDate: Date;
    onClose: () => void;
    onSave: (payload: AgendaPayload) => void;
    onDelete: (id: string) => void;
}

const defaultColors = [
    "#60A5FA",
    "#A78BFA",
    "#34D399",
    "#FBBF24",
    "#F87171",
    "#EC4899",
];

const EventDialog = ({
    open,
    event,
    selectedDate,
    onClose,
    onSave,
    onDelete,
}: EventDialogProps) => {


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(event.target.files || [])

        const validFiles = selectedFiles.filter((file) => {
            const maxSize = 10 * 1024 * 1024

            if (file.size > maxSize) {
                return false
            }

            return true
        })

        setAttachments((previous) => [...previous, ...validFiles])

        event.target.value = ""
    }

    const removeAttachment = (index: number) => {
        setAttachments((previous) =>
            previous.filter((_, attachmentIndex) => attachmentIndex !== index)
        )
    }

    const getFileIcon = (file: File) => {
        if (file.type.startsWith("image/")) {
            return <ImageIcon className="h-4 w-4" />
        }

        if (file.type.includes("pdf")) {
            return <FileText className="h-4 w-4" />
        }

        return <File className="h-4 w-4" />
    }

    const onAutocompleteLoad = (
        autocomplete: google.maps.places.Autocomplete
    ) => {
        autocompleteRef.current = autocomplete
    }

    const handlePlaceChanged = () => {
        const place = autocompleteRef.current?.getPlace()

        if (!place?.geometry?.location) {
            return
        }

        const latitude = place.geometry.location.lat()
        const longitude = place.geometry.location.lng()

        setLocation(place.formatted_address || place.name || "")
        setLocationCoordinates({
            latitude,
            longitude,
        })

        setMapCenter({
            lat: latitude,
            lng: longitude,
        })
    }

    const useCurrentLocation = () => {
        if (!navigator.geolocation) {
            return
        }

        setMapLoading(true)

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const latitude = position.coords.latitude
                const longitude = position.coords.longitude

                setLocationCoordinates({
                    latitude,
                    longitude,
                })

                setMapCenter({
                    lat: latitude,
                    lng: longitude,
                })

                setMapLoading(false)
            },
            () => {
                setMapLoading(false)
            }
        )
    }

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [location, setLocation] = useState("");
    const [category, setCategory] = useState("");

    const [memberSearch, setMemberSearch] = useState("");

    const [selectedMembers, setSelectedMembers] =
        useState<AgendaUser[]>([]);

    const {
        users,
        searchUsers,
        clearUsers,
    } = useAgendaStore();

    const [color, setColor] = useState(defaultColors[0]);

    const [startDate, setStartDate] = useState("");
    const [startTime, setStartTime] = useState("09:00");

    const [endDate, setEndDate] = useState("");
    const [endTime, setEndTime] = useState("10:00");

    const formatDateInput = (date: Date) => {
        return date.toISOString().split("T")[0];
    };
    const fileInputRef = useRef<HTMLInputElement>(null)
    const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null)

    const [attachments, setAttachments] = useState<File[]>([])
    const [locationCoordinates, setLocationCoordinates] = useState<{
        latitude: number | null
        longitude: number | null
    }>({
        latitude: null,
        longitude: null,
    })

    const [mapCenter, setMapCenter] = useState({
        lat: 46.8182,
        lng: 8.2275,
    })

    const [mapLoading, setMapLoading] = useState(false)

    const { isLoaded: isMapLoaded } = useJsApiLoader({
        id: "2morrow-agenda-map",
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        libraries: ["places"],
    })
    const resetForm = () => {
        const today = formatDateInput(selectedDate);

        setTitle("");
        setDescription("");
        setLocation("");
        setCategory("");
        setSelectedMembers([]);

        setColor(defaultColors[0]);

        setStartDate(today);
        setEndDate(today);

        setStartTime("09:00");
        setEndTime("10:00");
    };

    useEffect(() => {
        const timeout = setTimeout(() => {

            if (memberSearch.trim().length >= 2) {

                searchUsers(memberSearch);


            } else {

                clearUsers();

            }

        }, 350);

        return () => clearTimeout(timeout);

    }, [memberSearch]);

    useEffect(() => {
        if (!open) return;

        if (!event) {
            resetForm();

            setAttachments([])

            setLocationCoordinates({
                latitude: null,
                longitude: null,
            })

            setMapCenter({
                lat: 46.8182,
                lng: 8.2275,
            })

            return;
        }

        setTitle(event.title);
        setDescription(event.description || "");

        setLocation(event.location || "");
        setCategory(event.category || "");

        setSelectedMembers(
            event.members || []
        );

        setColor(event.color);

        setStartDate(formatDateInput(event.start));
        setEndDate(formatDateInput(event.end));

        setStartTime(
            event.start.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
            })
        );

        setLocationCoordinates({
            latitude: event.latitude || null,
            longitude: event.longitude || null,
        })

        if (event.latitude && event.longitude) {
            setMapCenter({
                lat: event.latitude,
                lng: event.longitude,
            })
        }

        setEndTime(
            event.end.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
            })
        );
    }, [event, open]);

    const handleSave = () => {
        if (!title.trim()) {
            return;
        }

        const payload: AgendaPayload = {
            title,
            description,
            start_date: startDate,
            end_date: endDate,
            start_time: startTime,
            end_time: endTime,
            location,
            category,
            members: selectedMembers.map((member) => member.id),

            latitude: locationCoordinates.latitude,
            longitude: locationCoordinates.longitude,

            attachments,
        }

        console.log("Payload Object:", payload);
        console.log("Payload JSON:", JSON.stringify(payload, null, 2));

        onSave(payload);
    };

    const handleDelete = () => {
        if (!event) return;

        onDelete(event.id);
        onClose();
    };
    return (
        <AnimatePresence>
            {open && (
                <>
                    {/* Backdrop */}

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
                    />

                    {/* Dialog */}

                    <motion.div
                        initial={{
                            opacity: 0,
                            scale: 0.95,
                            y: 40,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            y: 0,
                        }}
                        exit={{
                            opacity: 0,
                            scale: 0.95,
                            y: 40,
                        }}
                        transition={{
                            duration: 0.25,
                        }}
                     className="
fixed inset-0 lg:top-40 lg:left-1/3 z-50
flex flex-col
bg-white shadow-2xl
dark:bg-[#141414]
sm:left-1/2 sm:top-1/2
sm:w-full sm:max-w-2xl
sm:max-h-[90vh]
sm:-translate-x-1/2 sm:-translate-y-1/2
sm:rounded-3xl
sm:inset-auto
"
                    >

                        {/* Header */}

                        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/50 p-4 sm:p-6">

                            <div>

                                <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 sm:text-2xl">
                                    {event ? "Edit Event" : "Create Event"}
                                </h2>

                                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400 sm:mt-1 sm:text-sm">
                                    Organize your meetings and schedule.
                                </p>

                            </div>

                            <button
                                onClick={onClose}
                                className="rounded-xl bg-slate-100 dark:bg-slate-800 p-2 transition hover:bg-slate-200 dark:hover:bg-slate-700"
                            >
                                <X size={18} />
                            </button>

                        </div>

                        {/* Body */}

                        <div className="flex-1 space-y-5 overflow-y-auto p-4 sm:max-h-[60vh] sm:space-y-6 sm:p-6">

                            {/* Title */}

                            <div>

                                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                                    <Calendar size={16} />
                                    Title
                                </label>

                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Event title"
                                    className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 px-4 py-3 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:bg-[#1A1A1A] dark:text-white dark:focus:ring-sky-900"
                                />

                            </div>

                            {/* Description */}

                            <div>

                                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                                    Description
                                </label>

                                <textarea
                                    rows={4}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Write something..."
                                    className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 px-4 py-3 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:bg-[#1A1A1A] dark:text-white dark:focus:ring-sky-900"
                                />

                            </div>

                            {/* Date */}

                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5">

                                <div>

                                    <label className="mb-2 flex items-center gap-2 text-sm font-semibold">

                                        <Calendar size={16} />

                                        Start Date

                                    </label>

                                    <input
                                        type="date"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 px-4 py-3 dark:bg-[#1A1A1A] dark:text-white dark:focus:ring-sky-900"
                                    />

                                </div>

                                <div>

                                    <label className="mb-2 flex items-center gap-2 text-sm font-semibold">

                                        <Calendar size={16} />

                                        End Date

                                    </label>

                                    <input
                                        type="date"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 px-4 py-3 dark:bg-[#1A1A1A] dark:text-white dark:focus:ring-sky-900"
                                    />

                                </div>

                            </div>

                            {/* Time */}

                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5">

                                <div>

                                    <label className="mb-2 flex items-center gap-2 text-sm font-semibold">

                                        <Clock size={16} />

                                        Start Time

                                    </label>

                                    <input
                                        type="time"
                                        value={startTime}
                                        onChange={(e) => setStartTime(e.target.value)}
                                        className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 px-4 py-3 dark:bg-[#1A1A1A] dark:text-white dark:focus:ring-sky-900"
                                    />

                                </div>

                                <div>

                                    <label className="mb-2 flex items-center gap-2 text-sm font-semibold">

                                        <Clock size={16} />

                                        End Time

                                    </label>

                                    <input
                                        type="time"
                                        value={endTime}
                                        onChange={(e) => setEndTime(e.target.value)}
                                        className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 px-4 py-3 dark:bg-[#1A1A1A] dark:text-white dark:focus:ring-sky-900"
                                    />

                                </div>

                            </div>

                            {/* Category */}

                            <div>

                                <label className="mb-2 flex items-center gap-2 text-sm font-semibold">

                                    <Tag size={16} />

                                    Category

                                </label>

                                <input
                                    type="text"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    placeholder="Development"
                                    className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 px-4 py-3 dark:bg-[#1A1A1A] dark:text-white dark:focus:ring-sky-900"
                                />

                            </div>

                            {/* Location */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                                        <MapPin size={16} />
                                        Event location
                                    </label>

                                    <button
                                        type="button"
                                        onClick={useCurrentLocation}
                                        disabled={mapLoading}
                                        className="flex items-center gap-1.5 text-xs font-semibold text-[#2780C3] transition hover:text-[#1D6EA9] disabled:opacity-50"
                                    >
                                        {mapLoading ? (
                                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                        ) : (
                                            <Navigation className="h-3.5 w-3.5" />
                                        )}
                                        Use current location
                                    </button>
                                </div>

                                {isMapLoaded ? (
                                    <>
                                        <Autocomplete
                                            onLoad={onAutocompleteLoad}
                                            onPlaceChanged={handlePlaceChanged}
                                        >
                                            <div className="relative">
                                                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                                                <input
                                                    value={location}
                                                    onChange={(event) => setLocation(event.target.value)}
                                                    placeholder="Search city, address, landmark or property..."
                                                    className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:border-[#2780C3] focus:ring-4 focus:ring-[#2780C3]/10 dark:border-white/10 dark:bg-[#1A1A1A] dark:text-white"
                                                />
                                            </div>
                                        </Autocomplete>

                                        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 dark:border-white/10 dark:bg-[#1A1A1A]">
                                            <GoogleMap
                                                mapContainerStyle={{
                                                    width: "100%",
                                                    height: window.innerWidth < 640 ? "180px" : "260px",
                                                }}
                                                center={mapCenter}
                                                zoom={locationCoordinates.latitude ? 15 : 6}
                                                options={{
                                                    disableDefaultUI: true,
                                                    zoomControl: true,
                                                    streetViewControl: false,
                                                    mapTypeControl: false,
                                                }}
                                            >
                                                {locationCoordinates.latitude &&
                                                    locationCoordinates.longitude && (
                                                        <MarkerF
                                                            position={{
                                                                lat: locationCoordinates.latitude,
                                                                lng: locationCoordinates.longitude,
                                                            }}
                                                        />
                                                    )}
                                            </GoogleMap>
                                        </div>

                                        {locationCoordinates.latitude && locationCoordinates.longitude && (
                                            <div className="flex flex-col gap-1 rounded-xl border border-[#2780C3]/15 bg-[#2780C3]/5 px-3 py-2.5 text-xs dark:border-[#2780C3]/25 dark:bg-[#2780C3]/10 sm:flex-row sm:items-center sm:justify-between sm:px-4 sm:py-3">
                                                <span className="font-medium text-slate-600 dark:text-slate-300">
                                                    Selected coordinates
                                                </span>

                                                <span className="font-semibold text-[#2780C3] dark:text-[#8BC9F4]">
                                                    {locationCoordinates.latitude.toFixed(6)},{" "}
                                                    {locationCoordinates.longitude.toFixed(6)}
                                                </span>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <div className="flex h-[180px] items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-sm text-slate-500 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-400 sm:h-[260px]">
                                        Loading map...
                                    </div>
                                )}
                            </div>
                            {/* Members */}

                            <div className="relative">

                                <label className="mb-2 flex items-center gap-2 text-sm font-semibold">

                                    <Users size={16} />

                                    Members

                                </label>

                                <input
                                    value={memberSearch}
                                    onChange={(e) => setMemberSearch(e.target.value)}
                                    placeholder="Search by name or email..."
                                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 dark:border-slate-800 dark:bg-[#1A1A1A]"
                                />

                                {users.length > 0 && (

                                    <div className="absolute left-0 right-0 z-50 mt-2 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-[#202020]">

                                        {users.map((user) => (

                                            <button
                                                key={user.id}
                                                type="button"
                                                onClick={() => {

                                                    if (
                                                        selectedMembers.some(
                                                            (m) => m.id === user.id
                                                        )
                                                    )
                                                        return;

                                                    setSelectedMembers([
                                                        ...selectedMembers,
                                                        user,
                                                    ]);

                                                    setMemberSearch("");

                                                    clearUsers();
                                                }}
                                                className="flex w-full flex-col items-start px-4 py-3 transition hover:bg-sky-50 dark:hover:bg-slate-800"
                                            >

                                                <span className="font-medium">

                                                    {user.name}

                                                </span>

                                                <span className="text-xs text-slate-500">

                                                    {user.email}

                                                </span>

                                            </button>

                                        ))}

                                    </div>

                                )}

                                {selectedMembers.length > 0 && (

                                    <div className="mt-4 flex flex-wrap gap-2">

                                        {selectedMembers.map((member) => (

                                            <div
                                                key={member.id}
                                                className="flex items-center gap-2 rounded-full bg-sky-100 px-3 py-1 text-sm"
                                            >

                                                {member.name}

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setSelectedMembers(
                                                            selectedMembers.filter(
                                                                (m) =>
                                                                    m.id !== member.id
                                                            )
                                                        )
                                                    }
                                                >
                                                    <X size={14} />
                                                </button>

                                            </div>

                                        ))}

                                    </div>

                                )}

                            </div>
                            {/* File Upload */}

                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                                        <Upload size={16} />
                                        Attachments
                                    </label>

                                    <span className="text-xs text-slate-400 dark:text-slate-500">
                                        Maximum file size: 10MB
                                    </span>
                                </div>

                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    multiple
                                    accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg,.webp"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />

                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="flex w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/70 px-4 py-5 text-center transition hover:border-[#2780C3]/50 hover:bg-[#2780C3]/5 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-[#2780C3]/50 dark:hover:bg-[#2780C3]/10 sm:px-5 sm:py-7"
                                >
                                    <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-[#2780C3]/10 text-[#2780C3] dark:bg-[#2780C3]/20 dark:text-[#8BC9F4]">
                                        <Upload className="h-5 w-5" />
                                    </div>

                                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                                        Upload documents or images
                                    </p>

                                    <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                                        PDF, DOCX, XLSX, JPG, PNG or WEBP
                                    </p>
                                </button>

                                {attachments.length > 0 && (
                                    <div className="space-y-2">
                                        {attachments.map((file, index) => {
                                            const isImage = file.type.startsWith("image/")
                                            const previewUrl = isImage ? URL.createObjectURL(file) : null

                                            return (
                                                <div
                                                    key={`${file.name}-${index}`}
                                                    className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 dark:border-white/10 dark:bg-white/[0.03]"
                                                >
                                                    {isImage && previewUrl ? (
                                                        <img
                                                            src={previewUrl}
                                                            alt={file.name}
                                                            className="h-11 w-11 rounded-lg object-cover"
                                                        />
                                                    ) : (
                                                        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#2780C3]/10 text-[#2780C3] dark:bg-[#2780C3]/20 dark:text-[#8BC9F4]">
                                                            {getFileIcon(file)}
                                                        </div>
                                                    )}

                                                    <div className="min-w-0 flex-1">
                                                        <p className="truncate text-sm font-semibold text-slate-700 dark:text-slate-200">
                                                            {file.name}
                                                        </p>

                                                        <p className="text-xs text-slate-400 dark:text-slate-500">
                                                            {(file.size / 1024 / 1024).toFixed(2)} MB
                                                        </p>
                                                    </div>

                                                    <button
                                                        type="button"
                                                        onClick={() => removeAttachment(index)}
                                                        className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-500/10"
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            )
                                        })}
                                    </div>
                                )}
                            </div>

                            {/* Color Picker */}

                            <div>

                                <label className="mb-3 block text-sm font-semibold">
                                    Event Color
                                </label>

                                <div className="flex flex-wrap gap-3 sm:gap-4">

                                    {defaultColors.map((item) => (

                                        <button
                                            key={item}
                                            type="button"
                                            onClick={() => setColor(item)}
                                            className={`h-9 w-9 rounded-full border-4 transition sm:h-10 sm:w-10 ${color === item
                                                ? "border-slate-700 scale-110"
                                                : "border-transparent"
                                                }`}
                                            style={{
                                                backgroundColor: item,
                                            }}
                                        />

                                    ))}

                                </div>

                            </div>
                        </div>

                        {/* Footer */}

                        <div className="flex flex-col-reverse gap-3 border-t border-slate-100 dark:border-slate-800/50 bg-slate-50 dark:bg-[#1A1A1A] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:rounded-b-3xl sm:px-6 sm:py-5">

                            {/* Delete Button */}

                            <div>

                                {event && (

                                    <button
                                        onClick={handleDelete}
                                        className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-2 text-red-600 transition hover:bg-red-100"
                                    >
                                        <Trash2 size={18} />
                                        Delete
                                    </button>

                                )}

                            </div>

                            {/* Action Buttons */}

                            <div className="flex items-center gap-2 sm:gap-3">

                                <button
                                    onClick={onClose}
                                    className="flex-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#141414] px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-200 transition hover:bg-slate-100 dark:hover:bg-slate-800 sm:flex-none sm:px-5 sm:text-base"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={() => {
                                        handleSave();
                                        onClose();
                                    }}
                                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl sm:flex-none sm:px-6 sm:text-base"
                                >
                                    <Save size={18} />
                                    {event ? "Update Event" : "Save Event"}
                                </button>

                            </div>

                        </div>

                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default EventDialog;