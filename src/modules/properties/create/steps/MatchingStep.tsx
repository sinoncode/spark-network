import { useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  FileText,
  DollarSign,
  MapPin,
  ClipboardList,
  User,
  Image,
  FileCheck,
  Zap,
  Ruler,
  Hammer,
  Compass,
  TreePine,
  Car,
  CookingPot,
  Thermometer,
  Building,
  Landmark,
  Globe,
  Link,
  Search,
  Mountain,
  Tag,
  AlignLeft,
  Hash,
  Calendar,
  Percent,
  Home,
  Shield,
  Wifi,
  Tv,
  Droplets,
  Sun,
  Wind,
  Battery,
  Lock,
  Bell,
  Cctv,
  Phone,
  Paintbrush,
  GlassWater,
  Flower2,
  Fence,
  Warehouse,
  Store,
  TreeDeciduous,
  Shovel,
  Waves,
  Flame,
  Snowflake,
  HardHat,
  Briefcase,
  BarChart3,
  Radio,
  Share2,
  Users,
  Sparkles,
  CheckCircle2,
} from "lucide-react"

// Import all option constants from your types file
import {
  PROPERTY_STATUS_OPTIONS,
  LISTING_TYPE_OPTIONS,
  PROPERTY_CATEGORY_OPTIONS,
  PROPERTY_SUB_TYPE_OPTIONS,
  EXCLUSIVITY_OPTIONS,
  FURNISHING_STATUS_OPTIONS,
  FACING_DIRECTION_OPTIONS,
  CONDITION_OPTIONS,
  MAP_DISPLAY_OPTIONS,
  CONFIDENTIALITY_OPTIONS,
  PRICE_TYPE_OPTIONS,
  COMMISSION_PAYER_OPTIONS,
  SOURCE_OPTIONS,
  POSITION_IN_BUILDING_OPTIONS,
  CARETAKER_OPTIONS,
  CONCIERGE_OPTIONS,
  HEATING_SOURCE_OPTIONS,
  KITCHEN_TYPE_OPTIONS,
  KITCHEN_EQUIPMENT_OPTIONS,
  WORKTOP_OPTIONS,
  FLOOR_MATERIAL_OPTIONS,
  FIREPLACE_OPTIONS,
  SAUNA_OPTIONS,
  SWIMMING_POOL_OPTIONS,
  TERRACE_TYPE_OPTIONS,
  GARDEN_TYPE_OPTIONS,
  GARDEN_STYLE_OPTIONS,
  FENCING_OPTIONS,
  FENCING_MATERIAL_OPTIONS,
  GARAGE_DOOR_OPTIONS,
  PARKING_TYPE_OPTIONS,
  PARKING_INCLUDED_OPTIONS,
  CONSTRUCTION_TYPE_OPTIONS,
  ROOF_TYPE_OPTIONS,
  FACADE_MATERIAL_OPTIONS,
  WINDOW_GLAZING_OPTIONS,
  WINDOW_FRAME_OPTIONS,
  VIEW_TYPE_OPTIONS,
  VIEW_QUALITY_OPTIONS,
  SUNLIGHT_OPTIONS,
  HEATING_DISTRIBUTION_OPTIONS,
  HEATING_CONTROL_OPTIONS,
  HOT_WATER_OPTIONS,
  AC_OPTIONS,
  VENTILATION_OPTIONS,
  SOLAR_PANEL_OPTIONS,
  SMART_HOME_OPTIONS,
  SECURITY_SYSTEM_OPTIONS,
  CCTV_OPTIONS,
  INTERNET_OPTIONS,
  TV_RECEPTION_OPTIONS,
  APARTMENT_HEATING_OPTIONS,
  APARTMENT_HOT_WATER_OPTIONS,
  TOPOGRAPHY_OPTIONS,
  ZONING_CATEGORY_OPTIONS,
  BUILDING_PERMISSION_OPTIONS,
  ROAD_ACCESS_OPTIONS,
  UTILITY_CONNECTION_OPTIONS,
  SOIL_TYPE_OPTIONS,
  FLOOD_ZONE_OPTIONS,
  SEISMIC_ZONE_OPTIONS,
} from "@/types/property.types"

// ==================== INITIAL STATE ====================

const initialForm = {
  internal_reference: "",
  title: "",
  description: null as string | null,
  keywords: [] as string[],
  internal_notes: null as string | null,
  status: "draft" as string,

  classification: {
    category: "residential" as string,
    sub_type: "apartment" as string,
    transaction_type: "sale" as string,
    listing_status: "draft" as string,
  },

  pricing: {
    price: 0 as number | null,
    currency: "CHF" as string,
    price_type: null as string | null,
    price_per_sqm: null as number | null,
    price_reduced: false as boolean | null,
    original_price: null as number | null,
    reduction_amount: null as number | null,
    reduction_date: null as string | null,
    vat_applicable: null as boolean | null,
    vat_rate: null as number | null,
    discount: null as number | null,
    formatted_price: "" as string,
  },

  location: {
    address_line_1: null as string | null,
    address_line_2: null as string | null,
    zip_code: null as string | null,
    city: null as string | null,
    district: null as string | null,
    state: null as string | null,
    country: "CH" as string,
    coordinates: { latitude: null as number | null, longitude: null as number | null },
    map_display: "exact_address" as string,
    confidentiality_level: "public" as string,
    neighborhood_description: null as string | null,
  },

  mandate: {
    exclusivity: null as string | null,
    mandate_start_date: null as string | null,
    mandate_end_date: null as string | null,
    listing_date: null as string | null,
    publication_date: null as string | null,
    publication_channels: [] as string[],
  },

  agents: {
    assigned_agent_id: null as number | null,
    referral_agent_id: null as number | null,
    commission_rate: null as number | null,
    commission_payer: null as string | null,
    source: null as string | null,
  },

  media: {
    main_photo: null as string | null,
    photos: [] as string[],
    watermark_option: null as string | null,
    video_url: null as string | null,
    virtual_tour_url: null as string | null,
    floor_plan_url: null as string | null,
    location_map_url: null as string | null,
    brochure_url: null as string | null,
    epc_document_url: null as string | null,
  },

  documents: {
    title_deed: null as string | null,
    floor_plan: null as string | null,
    id_proof: null as string | null,
    legal_documents: null as string | null,
  },

  energy: {
    energy_class: null as string | null,
    co2_class: null as string | null,
    primary_energy_kwh: null as number | null,
    final_energy_kwh: null as number | null,
    heating_source: null as string | null,
  },

  dimensions: {
    gross_floor_area: null as number | null,
    living_area: null as number | null,
    net_habitable_area: null as number | null,
    carrez_law_area: null as number | null,
    plot_area: null as number | null,
    plot_area_ares: null as number | null,
    plot_area_hectares: null as number | null,
    rooms: null as number | null,
    bedrooms: null as number | null,
    bathrooms: null as number | null,
    shower_rooms: null as number | null,
    separate_wcs: null as number | null,
    balconies: null as number | null,
    floor_number: null as string | null,
    total_floors: null as number | null,
    floors_storeys: null as number | null,
    ceiling_height: null as number | null,
    basement: null as string | null,
    basement_area: null as number | null,
    attic: null as string | null,
    attic_area: null as number | null,
    cellar_type: null as string | null,
    apartment_layout: null as string | null,
    entrance_hall: false as boolean,
    separate_dining_room: false as boolean,
    utility_laundry_room: false as boolean,
    home_office_study: false as boolean,
    playroom: false as boolean,
    guest_suite: false as boolean,
    staff_quarters: false as boolean,
    storage_debarras: false as boolean,
    separate_cellar: false as boolean,
    separate_cellar_area: null as number | null,
    separate_attic: false as boolean,
    separate_attic_area: null as number | null,
  },

  construction: {
    year_built: null as number | null,
    year_renovated: null as number | null,
    condition: null as string | null,
    construction_type: null as string | null,
    roof_type: null as string | null,
    facade_material: null as string | null,
    insulation_walls: null as string | null,
    insulation_walls_year: null as number | null,
    insulation_roof: null as string | null,
    insulation_roof_year: null as number | null,
    insulation_floor: null as string | null,
    window_glazing: null as string | null,
    window_frame_material: null as string | null,
    listed_heritage: false as boolean,
    listed_heritage_grade: null as string | null,
    building_permit_number: null as string | null,
    building_permit_date: null as string | null,
    asbestos_diagnosis: null as string | null,
    lead_paint_diagnosis: null as string | null,
    termite_diagnosis: null as string | null,
    electricity_compliance: null as string | null,
    gas_compliance: null as string | null,
  },

  orientation: {
    facing_direction: null as string | null,
    garden_orientation: null as string | null,
    view_type: null as string | null,
    view_quality: null as string | null,
    floor_level: null as string | null,
    sunlight_exposure: null as string | null,
  },

  outdoor: {
    garden: false as boolean,
    garden_area: null as number | null,
    garden_type: null as string | null,
    garden_style: null as string | null,
    terrace: false as boolean,
    terrace_area: null as number | null,
    terrace_type: null as string | null,
    terrace_access: null as string | null,
    balcony: false as boolean,
    balcony_area: null as number | null,
    loggia: false as boolean,
    loggia_area: null as number | null,
    conservatory_veranda: false as boolean,
    conservatory_area: null as number | null,
    private_garden: false as boolean,
    private_garden_area: null as number | null,
    swimming_pool: null as string | null,
    pool_area: null as number | null,
    pool_heated: false as boolean,
    pool_cover_safety: false as boolean,
    hot_tub: false as boolean,
    pond_water_feature: false as boolean,
    outdoor_kitchen: false as boolean,
    greenhouse: false as boolean,
    pergola_gazebo: false as boolean,
    trampoline_play_area: false as boolean,
    orchard: false as boolean,
    vegetable_garden: false as boolean,
    outbuilding: false as boolean,
    outbuilding_purpose: null as string | null,
    outbuilding_area: null as number | null,
    fencing: null as string | null,
    fencing_material: null as string | null,
    automatic_gate: false as boolean,
    intercom_at_gate: false as boolean,
    floor_to_ceiling_windows: false as boolean,
    shutters_type: null as string | null,
  },

  parking: {
    covered_parking: false as boolean,
    open_parking: false as boolean,
    parking_slots: null as number | null,
    ev_charging: false as boolean,
    garage_attached: null as string | null,
    garage_attached_area: null as number | null,
    garage_detached: null as string | null,
    carport: null as string | null,
    outdoor_parking_spaces: null as number | null,
    garage_door_type: null as string | null,
    ev_charging_garage: false as boolean,
    ev_charging_garage_kw: null as number | null,
    garage_pit: false as boolean,
    garage_water_sink: false as boolean,
    garage_electricity: false as boolean,
    parking_included: null as string | null,
    parking_type: null as string | null,
    parking_spaces_included: null as number | null,
    parking_level: null as string | null,
    parking_space_numbers: null as string | null,
    ev_charging_parking: false as boolean,
    ev_charging_parking_kw: null as number | null,
    cellar_included: null as string | null,
    cellar_number: null as string | null,
    cellar_area: null as number | null,
    separate_storage_unit: false as boolean,
    separate_storage_area: null as number | null,
    motorbike_scooter_space: false as boolean,
    bicycle_storage_type: null as string | null,
  },

  equipment: {
    kitchen_type: null as string | null,
    kitchen_equipment: null as string | null,
    kitchen_appliances: [] as string[],
    worktop_material: null as string | null,
    bathroom_fittings: [] as string[],
    floor_material_living: null as string | null,
    floor_material_bedrooms: null as string | null,
    floor_material_kitchen: null as string | null,
    mouldings_cornices: false as boolean,
    fireplace: null as string | null,
    sauna: null as string | null,
    home_cinema: false as boolean,
    games_room: false as boolean,
    wine_cellar_room: false as boolean,
    wine_cellar_capacity: null as number | null,
    elevator_house: false as boolean,
    disability_access: null as string | null,
    ramped_entrance: false as boolean,
    wide_doorways: false as boolean,
    laundry_room: false as boolean,
    ironing_room: false as boolean,
    pantry: false as boolean,
    staff_entrance: false as boolean,
    double_height_ceiling: false as boolean,
    furnishing_status: null as string | null,
    alarm_system: null as string | null,
    door_security: null as string | null,
    intercom_front_door: null as string | null,
    apartment_ac: null as string | null,
    apartment_ac_rooms: null as string | null,
    double_glazing: false as boolean,
    roller_shutters: false as boolean,
    washing_machine_connection: false as boolean,
    dryer_connection: false as boolean,
    satellite_dish_allowed: null as string | null,
    fibre_optic_prewired: false as boolean,
    tv_points: null as number | null,
  },

  hvac: {
    heating_source: null as string | null,
    heating_distribution: null as string | null,
    heating_control: null as string | null,
    hot_water_production: null as string | null,
    hot_water_tank_litres: null as number | null,
    air_conditioning: null as string | null,
    ac_rooms_covered: null as string | null,
    ventilation_system: null as string | null,
    solar_panels_pv: null as string | null,
    solar_panels_kwp: null as number | null,
    solar_thermal: false as boolean,
    battery_storage: false as boolean,
    battery_storage_kwh: null as number | null,
    ev_charging_points: null as number | null,
    ev_charging_kw_point: null as number | null,
    rainwater_harvesting: false as boolean,
    rainwater_capacity_l: null as number | null,
    water_softener: false as boolean,
    double_flux_ventilation: false as boolean,
    smart_home: null as string | null,
    smart_home_brand: null as string | null,
    security_system: null as string | null,
    cctv: null as string | null,
    safe_room: false as boolean,
    smoke_detectors: false as boolean,
    co_detectors: false as boolean,
    sprinklers: false as boolean,
    internet_type: null as string | null,
    internet_download_mbps: null as number | null,
    internet_upload_mbps: null as number | null,
    tv_reception: null as string | null,
    apartment_heating_system: null as string | null,
    apartment_hot_water: null as string | null,
    apartment_ventilation: null as string | null,
    building_solar_panels: false as boolean,
    green_energy_contract: false as boolean,
    annual_energy_cost_min: null as number | null,
    annual_energy_cost_max: null as number | null,
  },

  building_info: {
    position_in_building: null as string | null,
    building_architectural_style: null as string | null,
    building_condition: null as string | null,
    building_classification: null as string | null,
    units_in_building: null as number | null,
    elevator_count: null as number | null,
    lift_all_floors: false as boolean,
    caretaker_type: null as string | null,
    digicode_entry: false as boolean,
    intercom_type: null as string | null,
    bicycle_storage_room: false as boolean,
    pram_storage: false as boolean,
    communal_laundry: false as boolean,
    communal_garden: false as boolean,
    rooftop_shared: false as boolean,
    swimming_pool_shared: false as boolean,
    fitness_room_shared: false as boolean,
    concierge_services: null as string | null,
    disability_access_building: null as string | null,
    facade_renovation_year: null as number | null,
    roof_renovation_year: null as number | null,
    elevator_last_serviced: null as string | null,
  },

  financials: {
    cadastral_reference: null as string | null,
    land_registry_number: null as string | null,
    annual_property_tax: null as number | null,
    annual_insurance_cost: null as number | null,
    annual_maintenance: null as number | null,
    maintenance_charges: null as number | null,
    monthly_hoa_charges: null as number | null,
    co_ownership: false as boolean,
    co_ownership_legal_ongoing: false as boolean,
    tenants_in_place: false as boolean,
    rental_income_monthly: null as number | null,
    rental_income_annual: null as number | null,
    rental_yield_gross: null as number | null,
    permitted_uses: null as string | null,
    right_of_way: false as boolean,
    right_of_way_description: null as string | null,
    pre_emption_right: false as boolean,
    pre_emption_holder: null as string | null,
    mortgage_encumbrance: null as string | null,
    mortgage_amount: null as number | null,
    asking_price_justification: null as string | null,
    comparable_sales: null as string | null,
    tax_percentage: null as number | null,
    co_ownership_reference: null as string | null,
    co_ownership_share_pct: null as number | null,
    monthly_co_ownership_charges: null as number | null,
    charges_include: [] as string[],
    charges_exclude: null as string | null,
    sinking_fund_contribution: null as number | null,
    outstanding_works_amount: null as number | null,
    legal_proceedings_ongoing: false as boolean,
    legal_proceedings_details: null as string | null,
    agm_date: null as string | null,
    syndic_managing_agent: null as string | null,
    number_of_lots: null as number | null,
    current_monthly_rent: null as number | null,
    current_lease_type: null as string | null,
    lease_start_date: null as string | null,
    lease_end_date: null as string | null,
    security_deposit_months: null as number | null,
    rental_yield_net: null as number | null,
    rental_potential_month: null as number | null,
  },

  linked: {
    owners: [] as any[],
    buyers: [] as any[],
    deals: [] as any[],
    visits: [] as any[],
  },

  portal_syndication: {
    publish_to_website: false as boolean,
    publish_to_portals: [] as string[],
    publication_languages: [] as string[],
    translation_status: null as string | null,
    listing_display_address: null as string | null,
    watermark_photos: null as string | null,
    featured_premium: false as boolean,
    top_of_portal_boost: false as boolean,
    top_of_portal_expiry: null as string | null,
    social_media_autopost: false as boolean,
    social_media_channels: [] as string[],
    email_blast: false as boolean,
    print_publication: false as boolean,
    print_publication_name: null as string | null,
    window_card: false as boolean,
    window_card_office: null as string | null,
  },

  matching: {
    budget_min: null as number | null,
    budget_max: null as number | null,
    property_types: [] as string[],
    locations: [] as string[],
    min_living_area: null as number | null,
    min_bedrooms: null as number | null,
    min_bathrooms: null as number | null,
    garden_required: null as boolean | null,
    parking_required: null as boolean | null,
    parking_count: null as number | null,
    floor_preference: null as string | null,
    view_preference: null as string | null,
    max_monthly_charges: null as number | null,
    furnished: null as boolean | null,
    pets_allowed: null as boolean | null,
    disability_access: false as boolean,
    energy_class_min: null as string | null,
    move_in_date: null as string | null,
    contact_preference: null as string | null,
    alert_frequency: null as string | null,
    gdpr_consent: false as boolean,
    gdpr_consent_date: null as string | null,
    marketing_consent: false as boolean,
  },

  type_specific: {
    land: {
      area: {
        total_area: null as number | null,
        total_area_ares: null as number | null,
        total_area_hectares: null as number | null,
        road_frontage_m: null as number | null,
        depth_m: null as number | null,
        perimeter_m: null as number | null,
        cadastral_parcels_count: null as number | null,
        cadastral_parcel_numbers: null as string | null,
        buildable_area: null as number | null,
        max_footprint_ces: null as number | null,
        land_shape: null as string | null,
        topography: null as string | null,
        elevation_m: null as number | null,
        aspect_orientation: null as string | null,
      },
      zoning: {
        zoning_category: null as string | null,
        building_permission_status: null as string | null,
        building_permit_expiry_date: null as string | null,
        max_building_height: null as number | null,
        max_floors_allowed: null as number | null,
        setback_front: null as number | null,
        setback_rear: null as number | null,
        setback_side: null as number | null,
        cos_far: null as number | null,
        ces_ratio: null as number | null,
        max_units_allowed: null as number | null,
        permitted_uses: [] as string[],
        architectural_constraints: null as string | null,
        national_park: false as boolean,
        national_park_name: null as string | null,
        natura_2000_zone: false as boolean,
        classified_protected_site: false as boolean,
        subdivision_required: null as boolean | null,
      },
      access_utilities: {
        road_access: null as string | null,
        road_frontage_sides: null as number | null,
        access_gate: false as boolean,
        water_connection: null as string | null,
        water_connection_distance_m: null as number | null,
        electricity_connection: null as string | null,
        electricity_connection_distance_m: null as number | null,
        gas_connection: null as string | null,
        gas_connection_distance_m: null as number | null,
        sewage_connection: null as string | null,
        telecom_connection: null as string | null,
        irrigation_water_rights: false as boolean,
        water_source_on_land: null as string | null,
        distance_to_town_km: null as number | null,
        distance_to_train_km: null as number | null,
        distance_to_motorway_km: null as number | null,
        distance_to_airport_km: null as number | null,
        distance_to_schools_km: null as number | null,
        distance_to_shops_km: null as number | null,
      },
      characteristics: {
        soil_type: null as string | null,
        soil_quality: null as string | null,
        soil_contamination: null as string | null,
        subsoil_report_available: false as boolean,
        flood_zone: null as string | null,
        flood_zone_reference: null as string | null,
        seismic_zone: null as string | null,
        landslide_risk: null as string | null,
        radon_risk: null as string | null,
        vegetation: null as string | null,
        tree_species: null as string | null,
        protected_trees: false as boolean,
        crops_cultivation: null as string | null,
        agricultural_tenancy: false as boolean,
        agricultural_tenancy_type: null as string | null,
        agricultural_tenancy_end: null as string | null,
        mineral_rights: null as string | null,
        hunting_rights: null as string | null,
        hunting_rights_holder: null as string | null,
        fishing_rights: null as string | null,
      },
      legal_financial: {
        cadastral_value: null as number | null,
        annual_land_tax: null as number | null,
        servitudes: null as string | null,
        servitudes_description: null as string | null,
        pre_emption_rights: null as string | null,
        environmental_constraints: null as string | null,
        archaeological_interest: null as string | null,
        co_ownership_of_land: false as boolean,
        seller_financing: false as boolean,
        seller_financing_terms: null as string | null,
        division_possibility: null as string | null,
        price_per_are: null as number | null,
        price_per_hectare: null as number | null,
      },
    },
  },
}

type FormState = typeof initialForm

// ==================== HELPERS ====================

const getValue = (obj: any, path: string): any => {
  return path.split(".").reduce((o, p) => (o ? o[p] : undefined), obj)
}

export default function PropertyForm() {
  const [form, setForm] = useState<FormState>(initialForm)

  const setField = (path: string, value: any) => {
    setForm((prev) => {
      const keys = path.split(".")
      const next = { ...prev }
      let current: any = next
      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] }
        current = current[keys[i]]
      }
      current[keys[keys.length - 1]] = value
      return next
    })
  }

  const handleNumber = (path: string, val: string) => {
    setField(path, val === "" ? null : Number(val))
  }

  const handleBoolean = (path: string, val: string) => {
    setField(path, val === "true" ? true : val === "false" ? false : null)
  }

  const handleArray = (path: string, val: string) => {
    setField(path, val.split(",").map((s) => s.trim()).filter(Boolean))
  }

  const renderInput = (label: string, path: string, type = "text", placeholder?: string) => (
    <div className="space-y-1">
      <Label className="text-xs font-medium text-muted-foreground">{label}</Label>
      <Input
        type={type}
        placeholder={placeholder || label}
        value={getValue(form, path) ?? ""}
        onChange={(e) => setField(path, type === "number" ? (e.target.value === "" ? null : Number(e.target.value)) : e.target.value)}
      />
    </div>
  )

  const renderTextarea = (label: string, path: string) => (
    <div className="space-y-1">
      <Label className="text-xs font-medium text-muted-foreground">{label}</Label>
      <Textarea
        placeholder={label}
        value={getValue(form, path) ?? ""}
        onChange={(e) => setField(path, e.target.value)}
        rows={3}
      />
    </div>
  )

  const renderSelect = (
    label: string,
    path: string,
    options: { value: string | null; label: string }[],
  ) => (
    <div className="space-y-1">
      <Label className="text-xs font-medium text-muted-foreground">{label}</Label>
      <Select value={getValue(form, path) ?? ""} onValueChange={(v) => setField(path, v === "" ? null : v)}>
        <SelectTrigger>
          <SelectValue placeholder={`Select ${label}`} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">-- None --</SelectItem>
          {options.map((opt) => (
            <SelectItem key={String(opt.value)} value={opt.value ?? ""}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )

  const renderBoolean = (label: string, path: string) => (
    <div className="space-y-1">
      <Label className="text-xs font-medium text-muted-foreground">{label}</Label>
      <Select
        value={getValue(form, path) === true ? "true" : getValue(form, path) === false ? "false" : ""}
        onValueChange={(v) => handleBoolean(path, v)}
      >
        <SelectTrigger>
          <SelectValue placeholder={`Select ${label}`} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">-- None --</SelectItem>
          <SelectItem value="true">Yes</SelectItem>
          <SelectItem value="false">No</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )

  const renderArray = (label: string, path: string) => (
    <div className="space-y-1">
      <Label className="text-xs font-medium text-muted-foreground">{label}</Label>
      <Input
        placeholder="Comma separated"
        value={(getValue(form, path) as string[])?.join(", ") ?? ""}
        onChange={(e) => handleArray(path, e.target.value)}
      />
    </div>
  )

  const SectionHeader = ({ icon: Icon, title }: { icon: any; title: string }) => (
    <CardHeader className="pb-3">
      <CardTitle className="flex items-center gap-2 text-base text-orange-400">
        <Icon className="h-5 w-5" />
        {title}
      </CardTitle>
    </CardHeader>
  )

  return (
    <div className="space-y-6 max-w-full mx-auto p-6">
      {/* 1. BASIC INFORMATION */}
      {/* <Card className="border-0 shadow-sm rounded-2xl">
        <SectionHeader icon={FileText} title="Basic Information" />
        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {renderInput("Internal Reference", "internal_reference")}
          {renderInput("Title", "title")}
          {renderSelect("Status", "status", PROPERTY_STATUS_OPTIONS)}
          {renderArray("Keywords", "keywords")}
          {renderSelect("Category", "classification.category", PROPERTY_CATEGORY_OPTIONS)}
          {renderSelect("Sub Type", "classification.sub_type", PROPERTY_SUB_TYPE_OPTIONS)}
          {renderSelect("Transaction Type", "classification.transaction_type", LISTING_TYPE_OPTIONS)}
          {renderSelect("Listing Status", "classification.listing_status", PROPERTY_STATUS_OPTIONS)}
        </CardContent>
        <CardContent className="pt-0">
          {renderTextarea("Description", "description")}
          {renderTextarea("Internal Notes", "internal_notes")}
        </CardContent>
      </Card> */}

      {/* 2. PRICING */}
      <Card className="border-0 shadow-sm rounded-2xl">
        <SectionHeader icon={DollarSign} title="Pricing" />
        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {renderInput("Price", "pricing.price", "number")}
          {renderInput("Currency", "pricing.currency")}
          {renderSelect("Price Type", "pricing.price_type", PRICE_TYPE_OPTIONS)}
          {renderInput("Price per Sqm", "pricing.price_per_sqm", "number")}
          {renderBoolean("Price Reduced", "pricing.price_reduced")}
          {renderInput("Original Price", "pricing.original_price", "number")}
          {renderInput("Reduction Amount", "pricing.reduction_amount", "number")}
          {renderInput("Reduction Date", "pricing.reduction_date", "date")}
          {renderBoolean("VAT Applicable", "pricing.vat_applicable")}
          {renderInput("VAT Rate", "pricing.vat_rate", "number")}
          {renderInput("Discount", "pricing.discount", "number")}
          {renderInput("Formatted Price", "pricing.formatted_price")}
        </CardContent>
      </Card>

      {/* 3. LOCATION */}
      {/* <Card className="border-0 shadow-sm rounded-2xl">
        <SectionHeader icon={MapPin} title="Location" />
        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {renderInput("Address Line 1", "location.address_line_1")}
          {renderInput("Address Line 2", "location.address_line_2")}
          {renderInput("Zip Code", "location.zip_code")}
          {renderInput("City", "location.city")}
          {renderInput("District", "location.district")}
          {renderInput("State", "location.state")}
          {renderInput("Country", "location.country")}
          {renderInput("Latitude", "location.coordinates.latitude", "number")}
          {renderInput("Longitude", "location.coordinates.longitude", "number")}
          {renderSelect("Map Display", "location.map_display", MAP_DISPLAY_OPTIONS)}
          {renderSelect("Confidentiality", "location.confidentiality_level", CONFIDENTIALITY_OPTIONS)}
        </CardContent>
        <CardContent className="pt-0">
          {renderTextarea("Neighborhood Description", "location.neighborhood_description")}
        </CardContent>
      </Card> */}

      {/* 4. MANDATE */}
      <Card className="border-0 shadow-sm rounded-2xl">
        <SectionHeader icon={ClipboardList} title="Mandate" />
        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {renderSelect("Exclusivity", "mandate.exclusivity", EXCLUSIVITY_OPTIONS)}
          {renderInput("Mandate Start Date", "mandate.mandate_start_date", "date")}
          {renderInput("Mandate End Date", "mandate.mandate_end_date", "date")}
          {renderInput("Listing Date", "mandate.listing_date", "date")}
          {renderInput("Publication Date", "mandate.publication_date", "date")}
          {renderArray("Publication Channels", "mandate.publication_channels")}
        </CardContent>
      </Card>

      {/* 5. AGENTS */}
      {/* <Card className="border-0 shadow-sm rounded-2xl">
        <SectionHeader icon={User} title="Agents" />
        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {renderInput("Assigned Agent ID", "agents.assigned_agent_id", "number")}
          {renderInput("Referral Agent ID", "agents.referral_agent_id", "number")}
          {renderInput("Commission Rate", "agents.commission_rate", "number")}
          {renderSelect("Commission Payer", "agents.commission_payer", COMMISSION_PAYER_OPTIONS)}
          {renderSelect("Source", "agents.source", SOURCE_OPTIONS)}
        </CardContent>
      </Card> */}

      {/* 6. DIMENSIONS */}
      <Card className="border-0 shadow-sm rounded-2xl">
        <SectionHeader icon={Ruler} title="Dimensions" />
        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {renderInput("Gross Floor Area", "dimensions.gross_floor_area", "number")}
          {renderInput("Living Area", "dimensions.living_area", "number")}
          {renderInput("Net Habitable Area", "dimensions.net_habitable_area", "number")}
          {renderInput("Carrez Law Area", "dimensions.carrez_law_area", "number")}
          {renderInput("Plot Area", "dimensions.plot_area", "number")}
          {renderInput("Plot Area Ares", "dimensions.plot_area_ares", "number")}
          {renderInput("Plot Area Hectares", "dimensions.plot_area_hectares", "number")}
          {renderInput("Rooms", "dimensions.rooms", "number")}
          {renderInput("Bedrooms", "dimensions.bedrooms", "number")}
          {renderInput("Bathrooms", "dimensions.bathrooms", "number")}
          {renderInput("Shower Rooms", "dimensions.shower_rooms", "number")}
          {renderInput("Separate WCs", "dimensions.separate_wcs", "number")}
          {renderInput("Balconies", "dimensions.balconies", "number")}
          {renderInput("Floor Number", "dimensions.floor_number")}
          {renderInput("Total Floors", "dimensions.total_floors", "number")}
          {renderInput("Floors Storeys", "dimensions.floors_storeys", "number")}
          {renderInput("Ceiling Height", "dimensions.ceiling_height", "number")}
          {renderInput("Basement", "dimensions.basement")}
          {renderInput("Basement Area", "dimensions.basement_area", "number")}
          {renderInput("Attic", "dimensions.attic")}
          {renderInput("Attic Area", "dimensions.attic_area", "number")}
          {renderInput("Cellar Type", "dimensions.cellar_type")}
          {renderInput("Apartment Layout", "dimensions.apartment_layout")}
          {renderBoolean("Entrance Hall", "dimensions.entrance_hall")}
          {renderBoolean("Separate Dining Room", "dimensions.separate_dining_room")}
          {renderBoolean("Utility Laundry Room", "dimensions.utility_laundry_room")}
          {renderBoolean("Home Office Study", "dimensions.home_office_study")}
          {renderBoolean("Playroom", "dimensions.playroom")}
          {renderBoolean("Guest Suite", "dimensions.guest_suite")}
          {renderBoolean("Staff Quarters", "dimensions.staff_quarters")}
          {renderBoolean("Storage Debarras", "dimensions.storage_debarras")}
          {renderBoolean("Separate Cellar", "dimensions.separate_cellar")}
          {renderInput("Separate Cellar Area", "dimensions.separate_cellar_area", "number")}
          {renderBoolean("Separate Attic", "dimensions.separate_attic")}
          {renderInput("Separate Attic Area", "dimensions.separate_attic_area", "number")}
        </CardContent>
      </Card>

      {/* 7. CONSTRUCTION */}
      <Card className="border-0 shadow-sm rounded-2xl">
        <SectionHeader icon={Hammer} title="Construction" />
        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {renderInput("Year Built", "construction.year_built", "number")}
          {renderInput("Year Renovated", "construction.year_renovated", "number")}
          {renderSelect("Condition", "construction.condition", CONDITION_OPTIONS)}
          {renderSelect("Construction Type", "construction.construction_type", CONSTRUCTION_TYPE_OPTIONS)}
          {renderSelect("Roof Type", "construction.roof_type", ROOF_TYPE_OPTIONS)}
          {renderSelect("Facade Material", "construction.facade_material", FACADE_MATERIAL_OPTIONS)}
          {renderInput("Insulation Walls", "construction.insulation_walls")}
          {renderInput("Insulation Walls Year", "construction.insulation_walls_year", "number")}
          {renderInput("Insulation Roof", "construction.insulation_roof")}
          {renderInput("Insulation Roof Year", "construction.insulation_roof_year", "number")}
          {renderInput("Insulation Floor", "construction.insulation_floor")}
          {renderSelect("Window Glazing", "construction.window_glazing", WINDOW_GLAZING_OPTIONS)}
          {renderSelect("Window Frame Material", "construction.window_frame_material", WINDOW_FRAME_OPTIONS)}
          {renderBoolean("Listed Heritage", "construction.listed_heritage")}
          {renderInput("Listed Heritage Grade", "construction.listed_heritage_grade")}
          {renderInput("Building Permit Number", "construction.building_permit_number")}
          {renderInput("Building Permit Date", "construction.building_permit_date", "date")}
          {renderInput("Asbestos Diagnosis", "construction.asbestos_diagnosis")}
          {renderInput("Lead Paint Diagnosis", "construction.lead_paint_diagnosis")}
          {renderInput("Termite Diagnosis", "construction.termite_diagnosis")}
          {renderInput("Electricity Compliance", "construction.electricity_compliance")}
          {renderInput("Gas Compliance", "construction.gas_compliance")}
        </CardContent>
      </Card>

      {/* 8. ORIENTATION */}
      <Card className="border-0 shadow-sm rounded-2xl">
        <SectionHeader icon={Compass} title="Orientation" />
        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {renderSelect("Facing Direction", "orientation.facing_direction", FACING_DIRECTION_OPTIONS)}
          {renderSelect("Garden Orientation", "orientation.garden_orientation", FACING_DIRECTION_OPTIONS)}
          {renderSelect("View Type", "orientation.view_type", VIEW_TYPE_OPTIONS)}
          {renderSelect("View Quality", "orientation.view_quality", VIEW_QUALITY_OPTIONS)}
          {renderInput("Floor Level", "orientation.floor_level")}
          {renderSelect("Sunlight Exposure", "orientation.sunlight_exposure", SUNLIGHT_OPTIONS)}
        </CardContent>
      </Card>

      {/* 9. OUTDOOR */}
      <Card className="border-0 shadow-sm rounded-2xl">
        <SectionHeader icon={TreePine} title="Outdoor" />
        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {renderBoolean("Garden", "outdoor.garden")}
          {renderInput("Garden Area", "outdoor.garden_area", "number")}
          {renderSelect("Garden Type", "outdoor.garden_type", GARDEN_TYPE_OPTIONS)}
          {renderSelect("Garden Style", "outdoor.garden_style", GARDEN_STYLE_OPTIONS)}
          {renderBoolean("Terrace", "outdoor.terrace")}
          {renderInput("Terrace Area", "outdoor.terrace_area", "number")}
          {renderSelect("Terrace Type", "outdoor.terrace_type", TERRACE_TYPE_OPTIONS)}
          {renderInput("Terrace Access", "outdoor.terrace_access")}
          {renderBoolean("Balcony", "outdoor.balcony")}
          {renderInput("Balcony Area", "outdoor.balcony_area", "number")}
          {renderBoolean("Loggia", "outdoor.loggia")}
          {renderInput("Loggia Area", "outdoor.loggia_area", "number")}
          {renderBoolean("Conservatory Veranda", "outdoor.conservatory_veranda")}
          {renderInput("Conservatory Area", "outdoor.conservatory_area", "number")}
          {renderBoolean("Private Garden", "outdoor.private_garden")}
          {renderInput("Private Garden Area", "outdoor.private_garden_area", "number")}
          {renderSelect("Swimming Pool", "outdoor.swimming_pool", SWIMMING_POOL_OPTIONS)}
          {renderInput("Pool Area", "outdoor.pool_area", "number")}
          {renderBoolean("Pool Heated", "outdoor.pool_heated")}
          {renderBoolean("Pool Cover Safety", "outdoor.pool_cover_safety")}
          {renderBoolean("Hot Tub", "outdoor.hot_tub")}
          {renderBoolean("Pond Water Feature", "outdoor.pond_water_feature")}
          {renderBoolean("Outdoor Kitchen", "outdoor.outdoor_kitchen")}
          {renderBoolean("Greenhouse", "outdoor.greenhouse")}
          {renderBoolean("Pergola Gazebo", "outdoor.pergola_gazebo")}
          {renderBoolean("Trampoline Play Area", "outdoor.trampoline_play_area")}
          {renderBoolean("Orchard", "outdoor.orchard")}
          {renderBoolean("Vegetable Garden", "outdoor.vegetable_garden")}
          {renderBoolean("Outbuilding", "outdoor.outbuilding")}
          {renderInput("Outbuilding Purpose", "outdoor.outbuilding_purpose")}
          {renderInput("Outbuilding Area", "outdoor.outbuilding_area", "number")}
          {renderSelect("Fencing", "outdoor.fencing", FENCING_OPTIONS)}
          {renderSelect("Fencing Material", "outdoor.fencing_material", FENCING_MATERIAL_OPTIONS)}
          {renderBoolean("Automatic Gate", "outdoor.automatic_gate")}
          {renderBoolean("Intercom at Gate", "outdoor.intercom_at_gate")}
          {renderBoolean("Floor to Ceiling Windows", "outdoor.floor_to_ceiling_windows")}
          {renderInput("Shutters Type", "outdoor.shutters_type")}
        </CardContent>
      </Card>

      {/* 10. PARKING */}
      <Card className="border-0 shadow-sm rounded-2xl">
        <SectionHeader icon={Car} title="Parking" />
        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {renderBoolean("Covered Parking", "parking.covered_parking")}
          {renderBoolean("Open Parking", "parking.open_parking")}
          {renderInput("Parking Slots", "parking.parking_slots", "number")}
          {renderBoolean("EV Charging", "parking.ev_charging")}
          {renderInput("Garage Attached", "parking.garage_attached")}
          {renderInput("Garage Attached Area", "parking.garage_attached_area", "number")}
          {renderInput("Garage Detached", "parking.garage_detached")}
          {renderInput("Carport", "parking.carport")}
          {renderInput("Outdoor Parking Spaces", "parking.outdoor_parking_spaces", "number")}
          {renderSelect("Garage Door Type", "parking.garage_door_type", GARAGE_DOOR_OPTIONS)}
          {renderBoolean("EV Charging Garage", "parking.ev_charging_garage")}
          {renderInput("EV Charging Garage kW", "parking.ev_charging_garage_kw", "number")}
          {renderBoolean("Garage Pit", "parking.garage_pit")}
          {renderBoolean("Garage Water Sink", "parking.garage_water_sink")}
          {renderBoolean("Garage Electricity", "parking.garage_electricity")}
          {renderSelect("Parking Included", "parking.parking_included", PARKING_INCLUDED_OPTIONS)}
          {renderSelect("Parking Type", "parking.parking_type", PARKING_TYPE_OPTIONS)}
          {renderInput("Parking Spaces Included", "parking.parking_spaces_included", "number")}
          {renderInput("Parking Level", "parking.parking_level")}
          {renderInput("Parking Space Numbers", "parking.parking_space_numbers")}
          {renderBoolean("EV Charging Parking", "parking.ev_charging_parking")}
          {renderInput("EV Charging Parking kW", "parking.ev_charging_parking_kw", "number")}
          {renderSelect("Cellar Included", "parking.cellar_included", PARKING_INCLUDED_OPTIONS)}
          {renderInput("Cellar Number", "parking.cellar_number")}
          {renderInput("Cellar Area", "parking.cellar_area", "number")}
          {renderBoolean("Separate Storage Unit", "parking.separate_storage_unit")}
          {renderInput("Separate Storage Area", "parking.separate_storage_area", "number")}
          {renderBoolean("Motorbike Scooter Space", "parking.motorbike_scooter_space")}
          {renderInput("Bicycle Storage Type", "parking.bicycle_storage_type")}
        </CardContent>
      </Card>

      {/* 11. EQUIPMENT */}
      <Card className="border-0 shadow-sm rounded-2xl">
        <SectionHeader icon={CookingPot} title="Equipment" />
        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {renderSelect("Kitchen Type", "equipment.kitchen_type", KITCHEN_TYPE_OPTIONS)}
          {renderSelect("Kitchen Equipment", "equipment.kitchen_equipment", KITCHEN_EQUIPMENT_OPTIONS)}
          {renderArray("Kitchen Appliances", "equipment.kitchen_appliances")}
          {renderSelect("Worktop Material", "equipment.worktop_material", WORKTOP_OPTIONS)}
          {renderArray("Bathroom Fittings", "equipment.bathroom_fittings")}
          {renderSelect("Floor Material Living", "equipment.floor_material_living", FLOOR_MATERIAL_OPTIONS)}
          {renderSelect("Floor Material Bedrooms", "equipment.floor_material_bedrooms", FLOOR_MATERIAL_OPTIONS)}
          {renderSelect("Floor Material Kitchen", "equipment.floor_material_kitchen", FLOOR_MATERIAL_OPTIONS)}
          {renderBoolean("Mouldings Cornices", "equipment.mouldings_cornices")}
          {renderSelect("Fireplace", "equipment.fireplace", FIREPLACE_OPTIONS)}
          {renderSelect("Sauna", "equipment.sauna", SAUNA_OPTIONS)}
          {renderBoolean("Home Cinema", "equipment.home_cinema")}
          {renderBoolean("Games Room", "equipment.games_room")}
          {renderBoolean("Wine Cellar Room", "equipment.wine_cellar_room")}
          {renderInput("Wine Cellar Capacity", "equipment.wine_cellar_capacity", "number")}
          {renderBoolean("Elevator House", "equipment.elevator_house")}
          {renderInput("Disability Access", "equipment.disability_access")}
          {renderBoolean("Ramped Entrance", "equipment.ramped_entrance")}
          {renderBoolean("Wide Doorways", "equipment.wide_doorways")}
          {renderBoolean("Laundry Room", "equipment.laundry_room")}
          {renderBoolean("Ironing Room", "equipment.ironing_room")}
          {renderBoolean("Pantry", "equipment.pantry")}
          {renderBoolean("Staff Entrance", "equipment.staff_entrance")}
          {renderBoolean("Double Height Ceiling", "equipment.double_height_ceiling")}
          {renderSelect("Furnishing Status", "equipment.furnishing_status", FURNISHING_STATUS_OPTIONS)}
          {renderInput("Alarm System", "equipment.alarm_system")}
          {renderInput("Door Security", "equipment.door_security")}
          {renderInput("Intercom Front Door", "equipment.intercom_front_door")}
          {renderInput("Apartment AC", "equipment.apartment_ac")}
          {renderInput("Apartment AC Rooms", "equipment.apartment_ac_rooms")}
          {renderBoolean("Double Glazing", "equipment.double_glazing")}
          {renderBoolean("Roller Shutters", "equipment.roller_shutters")}
          {renderBoolean("Washing Machine Connection", "equipment.washing_machine_connection")}
          {renderBoolean("Dryer Connection", "equipment.dryer_connection")}
          {renderInput("Satellite Dish Allowed", "equipment.satellite_dish_allowed")}
          {renderBoolean("Fibre Optic Prewired", "equipment.fibre_optic_prewired")}
          {renderInput("TV Points", "equipment.tv_points", "number")}
        </CardContent>
      </Card>

      {/* 12. HVAC */}
      <Card className="border-0 shadow-sm rounded-2xl">
        <SectionHeader icon={Thermometer} title="HVAC" />
        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {renderSelect("Heating Source", "hvac.heating_source", HEATING_SOURCE_OPTIONS)}
          {renderSelect("Heating Distribution", "hvac.heating_distribution", HEATING_DISTRIBUTION_OPTIONS)}
          {renderSelect("Heating Control", "hvac.heating_control", HEATING_CONTROL_OPTIONS)}
          {renderSelect("Hot Water Production", "hvac.hot_water_production", HOT_WATER_OPTIONS)}
          {renderInput("Hot Water Tank Litres", "hvac.hot_water_tank_litres", "number")}
          {renderSelect("Air Conditioning", "hvac.air_conditioning", AC_OPTIONS)}
          {renderInput("AC Rooms Covered", "hvac.ac_rooms_covered")}
          {renderSelect("Ventilation System", "hvac.ventilation_system", VENTILATION_OPTIONS)}
          {renderSelect("Solar Panels PV", "hvac.solar_panels_pv", SOLAR_PANEL_OPTIONS)}
          {renderInput("Solar Panels kWp", "hvac.solar_panels_kwp", "number")}
          {renderBoolean("Solar Thermal", "hvac.solar_thermal")}
          {renderBoolean("Battery Storage", "hvac.battery_storage")}
          {renderInput("Battery Storage kWh", "hvac.battery_storage_kwh", "number")}
          {renderInput("EV Charging Points", "hvac.ev_charging_points", "number")}
          {renderInput("EV Charging kW Point", "hvac.ev_charging_kw_point", "number")}
          {renderBoolean("Rainwater Harvesting", "hvac.rainwater_harvesting")}
          {renderInput("Rainwater Capacity L", "hvac.rainwater_capacity_l", "number")}
          {renderBoolean("Water Softener", "hvac.water_softener")}
          {renderBoolean("Double Flux Ventilation", "hvac.double_flux_ventilation")}
          {renderSelect("Smart Home", "hvac.smart_home", SMART_HOME_OPTIONS)}
          {renderInput("Smart Home Brand", "hvac.smart_home_brand")}
          {renderSelect("Security System", "hvac.security_system", SECURITY_SYSTEM_OPTIONS)}
          {renderSelect("CCTV", "hvac.cctv", CCTV_OPTIONS)}
          {renderBoolean("Safe Room", "hvac.safe_room")}
          {renderBoolean("Smoke Detectors", "hvac.smoke_detectors")}
          {renderBoolean("CO Detectors", "hvac.co_detectors")}
          {renderBoolean("Sprinklers", "hvac.sprinklers")}
          {renderSelect("Internet Type", "hvac.internet_type", INTERNET_OPTIONS)}
          {renderInput("Internet Download Mbps", "hvac.internet_download_mbps", "number")}
          {renderInput("Internet Upload Mbps", "hvac.internet_upload_mbps", "number")}
          {renderSelect("TV Reception", "hvac.tv_reception", TV_RECEPTION_OPTIONS)}
          {renderSelect("Apartment Heating System", "hvac.apartment_heating_system", APARTMENT_HEATING_OPTIONS)}
          {renderSelect("Apartment Hot Water", "hvac.apartment_hot_water", APARTMENT_HOT_WATER_OPTIONS)}
          {renderInput("Apartment Ventilation", "hvac.apartment_ventilation")}
          {renderBoolean("Building Solar Panels", "hvac.building_solar_panels")}
          {renderBoolean("Green Energy Contract", "hvac.green_energy_contract")}
          {renderInput("Annual Energy Cost Min", "hvac.annual_energy_cost_min", "number")}
          {renderInput("Annual Energy Cost Max", "hvac.annual_energy_cost_max", "number")}
        </CardContent>
      </Card>

      {/* 13. ENERGY */}
      <Card className="border-0 shadow-sm rounded-2xl">
        <SectionHeader icon={Zap} title="Energy" />
        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {renderInput("Energy Class", "energy.energy_class")}
          {renderInput("CO2 Class", "energy.co2_class")}
          {renderInput("Primary Energy kWh", "energy.primary_energy_kwh", "number")}
          {renderInput("Final Energy kWh", "energy.final_energy_kwh", "number")}
          {renderSelect("Heating Source", "energy.heating_source", HEATING_SOURCE_OPTIONS)}
        </CardContent>
      </Card>

      {/* 14. BUILDING INFO */}
      <Card className="border-0 shadow-sm rounded-2xl">
        <SectionHeader icon={Building} title="Building Info" />
        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {renderSelect("Position in Building", "building_info.position_in_building", POSITION_IN_BUILDING_OPTIONS)}
          {renderInput("Building Architectural Style", "building_info.building_architectural_style")}
          {renderSelect("Building Condition", "building_info.building_condition", CONDITION_OPTIONS)}
          {renderInput("Building Classification", "building_info.building_classification")}
          {renderInput("Units in Building", "building_info.units_in_building", "number")}
          {renderInput("Elevator Count", "building_info.elevator_count", "number")}
          {renderBoolean("Lift All Floors", "building_info.lift_all_floors")}
          {renderSelect("Caretaker Type", "building_info.caretaker_type", CARETAKER_OPTIONS)}
          {renderBoolean("Digicode Entry", "building_info.digicode_entry")}
          {renderInput("Intercom Type", "building_info.intercom_type")}
          {renderBoolean("Bicycle Storage Room", "building_info.bicycle_storage_room")}
          {renderBoolean("Pram Storage", "building_info.pram_storage")}
          {renderBoolean("Communal Laundry", "building_info.communal_laundry")}
          {renderBoolean("Communal Garden", "building_info.communal_garden")}
          {renderBoolean("Rooftop Shared", "building_info.rooftop_shared")}
          {renderBoolean("Swimming Pool Shared", "building_info.swimming_pool_shared")}
          {renderBoolean("Fitness Room Shared", "building_info.fitness_room_shared")}
          {renderSelect("Concierge Services", "building_info.concierge_services", CONCIERGE_OPTIONS)}
          {renderInput("Disability Access Building", "building_info.disability_access_building")}
          {renderInput("Facade Renovation Year", "building_info.facade_renovation_year", "number")}
          {renderInput("Roof Renovation Year", "building_info.roof_renovation_year", "number")}
          {renderInput("Elevator Last Serviced", "building_info.elevator_last_serviced", "date")}
        </CardContent>
      </Card>

      {/* 15. FINANCIALS */}
      <Card className="border-0 shadow-sm rounded-2xl">
        <SectionHeader icon={Landmark} title="Financials" />
        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {renderInput("Cadastral Reference", "financials.cadastral_reference")}
          {renderInput("Land Registry Number", "financials.land_registry_number")}
          {renderInput("Annual Property Tax", "financials.annual_property_tax", "number")}
          {renderInput("Annual Insurance Cost", "financials.annual_insurance_cost", "number")}
          {renderInput("Annual Maintenance", "financials.annual_maintenance", "number")}
          {renderInput("Maintenance Charges", "financials.maintenance_charges", "number")}
          {renderInput("Monthly HOA Charges", "financials.monthly_hoa_charges", "number")}
          {renderBoolean("Co-Ownership", "financials.co_ownership")}
          {renderBoolean("Co-Ownership Legal Ongoing", "financials.co_ownership_legal_ongoing")}
          {renderBoolean("Tenants in Place", "financials.tenants_in_place")}
          {renderInput("Rental Income Monthly", "financials.rental_income_monthly", "number")}
          {renderInput("Rental Income Annual", "financials.rental_income_annual", "number")}
          {renderInput("Rental Yield Gross", "financials.rental_yield_gross", "number")}
          {renderInput("Permitted Uses", "financials.permitted_uses")}
          {renderBoolean("Right of Way", "financials.right_of_way")}
          {renderInput("Right of Way Description", "financials.right_of_way_description")}
          {renderBoolean("Pre-emption Right", "financials.pre_emption_right")}
          {renderInput("Pre-emption Holder", "financials.pre_emption_holder")}
          {renderInput("Mortgage Encumbrance", "financials.mortgage_encumbrance")}
          {renderInput("Mortgage Amount", "financials.mortgage_amount", "number")}
          {renderInput("Asking Price Justification", "financials.asking_price_justification")}
          {renderInput("Comparable Sales", "financials.comparable_sales")}
          {renderInput("Tax Percentage", "financials.tax_percentage", "number")}
          {renderInput("Co-Ownership Reference", "financials.co_ownership_reference")}
          {renderInput("Co-Ownership Share %", "financials.co_ownership_share_pct", "number")}
          {renderInput("Monthly Co-Ownership Charges", "financials.monthly_co_ownership_charges", "number")}
          {renderArray("Charges Include", "financials.charges_include")}
          {renderInput("Charges Exclude", "financials.charges_exclude")}
          {renderInput("Sinking Fund Contribution", "financials.sinking_fund_contribution", "number")}
          {renderInput("Outstanding Works Amount", "financials.outstanding_works_amount", "number")}
          {renderBoolean("Legal Proceedings Ongoing", "financials.legal_proceedings_ongoing")}
          {renderInput("Legal Proceedings Details", "financials.legal_proceedings_details")}
          {renderInput("AGM Date", "financials.agm_date", "date")}
          {renderInput("Syndic Managing Agent", "financials.syndic_managing_agent")}
          {renderInput("Number of Lots", "financials.number_of_lots", "number")}
          {renderInput("Current Monthly Rent", "financials.current_monthly_rent", "number")}
          {renderInput("Current Lease Type", "financials.current_lease_type")}
          {renderInput("Lease Start Date", "financials.lease_start_date", "date")}
          {renderInput("Lease End Date", "financials.lease_end_date", "date")}
          {renderInput("Security Deposit Months", "financials.security_deposit_months", "number")}
          {renderInput("Rental Yield Net", "financials.rental_yield_net", "number")}
          {renderInput("Rental Potential Month", "financials.rental_potential_month", "number")}
        </CardContent>
      </Card>

      {/* 16. MEDIA */}
      <Card className="border-0 shadow-sm rounded-2xl">
        <SectionHeader icon={Image} title="Media" />
        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {renderInput("Main Photo URL", "media.main_photo")}
          {renderArray("Photos", "media.photos")}
          {renderInput("Watermark Option", "media.watermark_option")}
          {renderInput("Video URL", "media.video_url")}
          {renderInput("Virtual Tour URL", "media.virtual_tour_url")}
          {renderInput("Floor Plan URL", "media.floor_plan_url")}
          {renderInput("Location Map URL", "media.location_map_url")}
          {renderInput("Brochure URL", "media.brochure_url")}
          {renderInput("EPC Document URL", "media.epc_document_url")}
        </CardContent>
      </Card>

      {/* 17. DOCUMENTS */}
      <Card className="border-0 shadow-sm rounded-2xl">
        <SectionHeader icon={FileCheck} title="Documents" />
        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {renderInput("Title Deed", "documents.title_deed")}
          {renderInput("Floor Plan", "documents.floor_plan")}
          {renderInput("ID Proof", "documents.id_proof")}
          {renderInput("Legal Documents", "documents.legal_documents")}
        </CardContent>
      </Card>

      {/* 18. PORTAL SYNDICATION */}
      <Card className="border-0 shadow-sm rounded-2xl">
        <SectionHeader icon={Share2} title="Portal Syndication" />
        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {renderBoolean("Publish to Website", "portal_syndication.publish_to_website")}
          {renderArray("Publish to Portals", "portal_syndication.publish_to_portals")}
          {renderArray("Publication Languages", "portal_syndication.publication_languages")}
          {renderInput("Translation Status", "portal_syndication.translation_status")}
          {renderInput("Listing Display Address", "portal_syndication.listing_display_address")}
          {renderInput("Watermark Photos", "portal_syndication.watermark_photos")}
          {renderBoolean("Featured Premium", "portal_syndication.featured_premium")}
          {renderBoolean("Top of Portal Boost", "portal_syndication.top_of_portal_boost")}
          {renderInput("Top of Portal Expiry", "portal_syndication.top_of_portal_expiry", "date")}
          {renderBoolean("Social Media Autopost", "portal_syndication.social_media_autopost")}
          {renderArray("Social Media Channels", "portal_syndication.social_media_channels")}
          {renderBoolean("Email Blast", "portal_syndication.email_blast")}
          {renderBoolean("Print Publication", "portal_syndication.print_publication")}
          {renderInput("Print Publication Name", "portal_syndication.print_publication_name")}
          {renderBoolean("Window Card", "portal_syndication.window_card")}
          {renderInput("Window Card Office", "portal_syndication.window_card_office")}
        </CardContent>
      </Card>

      {/* 19. MATCHING */}
      <Card className="border-0 shadow-sm rounded-2xl">
        <SectionHeader icon={Search} title="Matching" />
        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {renderInput("Budget Min", "matching.budget_min", "number")}
          {renderInput("Budget Max", "matching.budget_max", "number")}
          {renderArray("Property Types", "matching.property_types")}
          {renderArray("Locations", "matching.locations")}
          {renderInput("Min Living Area", "matching.min_living_area", "number")}
          {renderInput("Min Bedrooms", "matching.min_bedrooms", "number")}
          {renderInput("Min Bathrooms", "matching.min_bathrooms", "number")}
          {renderBoolean("Garden Required", "matching.garden_required")}
          {renderBoolean("Parking Required", "matching.parking_required")}
          {renderInput("Parking Count", "matching.parking_count", "number")}
          {renderInput("Floor Preference", "matching.floor_preference")}
          {renderInput("View Preference", "matching.view_preference")}
          {renderInput("Max Monthly Charges", "matching.max_monthly_charges", "number")}
          {renderBoolean("Furnished", "matching.furnished")}
          {renderBoolean("Pets Allowed", "matching.pets_allowed")}
          {renderBoolean("Disability Access", "matching.disability_access")}
          {renderInput("Energy Class Min", "matching.energy_class_min")}
          {renderInput("Move In Date", "matching.move_in_date", "date")}
          {renderInput("Contact Preference", "matching.contact_preference")}
          {renderInput("Alert Frequency", "matching.alert_frequency")}
          {renderBoolean("GDPR Consent", "matching.gdpr_consent")}
          {renderInput("GDPR Consent Date", "matching.gdpr_consent_date", "date")}
          {renderBoolean("Marketing Consent", "matching.marketing_consent")}
        </CardContent>
      </Card>

      {/* 20. LINKED */}
      <Card className="border-0 shadow-sm rounded-2xl">
        <SectionHeader icon={Link} title="Linked" />
        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {renderArray("Owners", "linked.owners")}
          {renderArray("Buyers", "linked.buyers")}
          {renderArray("Deals", "linked.deals")}
          {renderArray("Visits", "linked.visits")}
        </CardContent>
      </Card>

      {/* 21. LAND DETAILS - AREA */}
      <Card className="border-0 shadow-sm rounded-2xl">
        <SectionHeader icon={Mountain} title="Land Details — Area" />
        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {renderInput("Total Area", "type_specific.land.area.total_area", "number")}
          {renderInput("Total Area Ares", "type_specific.land.area.total_area_ares", "number")}
          {renderInput("Total Area Hectares", "type_specific.land.area.total_area_hectares", "number")}
          {renderInput("Road Frontage m", "type_specific.land.area.road_frontage_m", "number")}
          {renderInput("Depth m", "type_specific.land.area.depth_m", "number")}
          {renderInput("Perimeter m", "type_specific.land.area.perimeter_m", "number")}
          {renderInput("Cadastral Parcels Count", "type_specific.land.area.cadastral_parcels_count", "number")}
          {renderInput("Cadastral Parcel Numbers", "type_specific.land.area.cadastral_parcel_numbers")}
          {renderInput("Buildable Area", "type_specific.land.area.buildable_area", "number")}
          {renderInput("Max Footprint CES", "type_specific.land.area.max_footprint_ces", "number")}
          {renderInput("Land Shape", "type_specific.land.area.land_shape")}
          {renderSelect("Topography", "type_specific.land.area.topography", TOPOGRAPHY_OPTIONS)}
          {renderInput("Elevation m", "type_specific.land.area.elevation_m", "number")}
          {renderSelect("Aspect Orientation", "type_specific.land.area.aspect_orientation", FACING_DIRECTION_OPTIONS)}
        </CardContent>
      </Card>

      {/* 22. LAND DETAILS - ZONING */}
      <Card className="border-0 shadow-sm rounded-2xl">
        <SectionHeader icon={BarChart3} title="Land Details — Zoning" />
        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {renderSelect("Zoning Category", "type_specific.land.zoning.zoning_category", ZONING_CATEGORY_OPTIONS)}
          {renderSelect("Building Permission Status", "type_specific.land.zoning.building_permission_status", BUILDING_PERMISSION_OPTIONS)}
          {renderInput("Building Permit Expiry Date", "type_specific.land.zoning.building_permit_expiry_date", "date")}
          {renderInput("Max Building Height", "type_specific.land.zoning.max_building_height", "number")}
          {renderInput("Max Floors Allowed", "type_specific.land.zoning.max_floors_allowed", "number")}
          {renderInput("Setback Front", "type_specific.land.zoning.setback_front", "number")}
          {renderInput("Setback Rear", "type_specific.land.zoning.setback_rear", "number")}
          {renderInput("Setback Side", "type_specific.land.zoning.setback_side", "number")}
          {renderInput("COS/FAR", "type_specific.land.zoning.cos_far", "number")}
          {renderInput("CES Ratio", "type_specific.land.zoning.ces_ratio", "number")}
          {renderInput("Max Units Allowed", "type_specific.land.zoning.max_units_allowed", "number")}
          {renderArray("Permitted Uses", "type_specific.land.zoning.permitted_uses")}
          {renderInput("Architectural Constraints", "type_specific.land.zoning.architectural_constraints")}
          {renderBoolean("National Park", "type_specific.land.zoning.national_park")}
          {renderInput("National Park Name", "type_specific.land.zoning.national_park_name")}
          {renderBoolean("Natura 2000 Zone", "type_specific.land.zoning.natura_2000_zone")}
          {renderBoolean("Classified Protected Site", "type_specific.land.zoning.classified_protected_site")}
          {renderBoolean("Subdivision Required", "type_specific.land.zoning.subdivision_required")}
        </CardContent>
      </Card>

      {/* 23. LAND DETAILS - ACCESS & UTILITIES */}
      <Card className="border-0 shadow-sm rounded-2xl">
        <SectionHeader icon={Compass} title="Land Details — Access & Utilities" />
        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {renderSelect("Road Access", "type_specific.land.access_utilities.road_access", ROAD_ACCESS_OPTIONS)}
          {renderInput("Road Frontage Sides", "type_specific.land.access_utilities.road_frontage_sides", "number")}
          {renderBoolean("Access Gate", "type_specific.land.access_utilities.access_gate")}
          {renderSelect("Water Connection", "type_specific.land.access_utilities.water_connection", UTILITY_CONNECTION_OPTIONS)}
          {renderInput("Water Connection Distance m", "type_specific.land.access_utilities.water_connection_distance_m", "number")}
          {renderSelect("Electricity Connection", "type_specific.land.access_utilities.electricity_connection", UTILITY_CONNECTION_OPTIONS)}
          {renderInput("Electricity Connection Distance m", "type_specific.land.access_utilities.electricity_connection_distance_m", "number")}
          {renderSelect("Gas Connection", "type_specific.land.access_utilities.gas_connection", UTILITY_CONNECTION_OPTIONS)}
          {renderInput("Gas Connection Distance m", "type_specific.land.access_utilities.gas_connection_distance_m", "number")}
          {renderSelect("Sewage Connection", "type_specific.land.access_utilities.sewage_connection", UTILITY_CONNECTION_OPTIONS)}
          {renderSelect("Telecom Connection", "type_specific.land.access_utilities.telecom_connection", UTILITY_CONNECTION_OPTIONS)}
          {renderBoolean("Irrigation Water Rights", "type_specific.land.access_utilities.irrigation_water_rights")}
          {renderInput("Water Source on Land", "type_specific.land.access_utilities.water_source_on_land")}
          {renderInput("Distance to Town km", "type_specific.land.access_utilities.distance_to_town_km", "number")}
          {renderInput("Distance to Train km", "type_specific.land.access_utilities.distance_to_train_km", "number")}
          {renderInput("Distance to Motorway km", "type_specific.land.access_utilities.distance_to_motorway_km", "number")}
          {renderInput("Distance to Airport km", "type_specific.land.access_utilities.distance_to_airport_km", "number")}
          {renderInput("Distance to Schools km", "type_specific.land.access_utilities.distance_to_schools_km", "number")}
          {renderInput("Distance to Shops km", "type_specific.land.access_utilities.distance_to_shops_km", "number")}
        </CardContent>
      </Card>

      {/* 24. LAND DETAILS - CHARACTERISTICS */}
      <Card className="border-0 shadow-sm rounded-2xl">
        <SectionHeader icon={TreeDeciduous} title="Land Details — Characteristics" />
        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {renderSelect("Soil Type", "type_specific.land.characteristics.soil_type", SOIL_TYPE_OPTIONS)}
          {renderInput("Soil Quality", "type_specific.land.characteristics.soil_quality")}
          {renderInput("Soil Contamination", "type_specific.land.characteristics.soil_contamination")}
          {renderBoolean("Subsoil Report Available", "type_specific.land.characteristics.subsoil_report_available")}
          {renderSelect("Flood Zone", "type_specific.land.characteristics.flood_zone", FLOOD_ZONE_OPTIONS)}
          {renderInput("Flood Zone Reference", "type_specific.land.characteristics.flood_zone_reference")}
          {renderSelect("Seismic Zone", "type_specific.land.characteristics.seismic_zone", SEISMIC_ZONE_OPTIONS)}
          {renderInput("Landslide Risk", "type_specific.land.characteristics.landslide_risk")}
          {renderInput("Radon Risk", "type_specific.land.characteristics.radon_risk")}
          {renderInput("Vegetation", "type_specific.land.characteristics.vegetation")}
          {renderInput("Tree Species", "type_specific.land.characteristics.tree_species")}
          {renderBoolean("Protected Trees", "type_specific.land.characteristics.protected_trees")}
          {renderInput("Crops Cultivation", "type_specific.land.characteristics.crops_cultivation")}
          {renderBoolean("Agricultural Tenancy", "type_specific.land.characteristics.agricultural_tenancy")}
          {renderInput("Agricultural Tenancy Type", "type_specific.land.characteristics.agricultural_tenancy_type")}
          {renderInput("Agricultural Tenancy End", "type_specific.land.characteristics.agricultural_tenancy_end", "date")}
          {renderInput("Mineral Rights", "type_specific.land.characteristics.mineral_rights")}
          {renderInput("Hunting Rights", "type_specific.land.characteristics.hunting_rights")}
          {renderInput("Hunting Rights Holder", "type_specific.land.characteristics.hunting_rights_holder")}
          {renderInput("Fishing Rights", "type_specific.land.characteristics.fishing_rights")}
        </CardContent>
      </Card>

      {/* 25. LAND DETAILS - LEGAL & FINANCIAL */}
      <Card className="border-0 shadow-sm rounded-2xl">
        <SectionHeader icon={Landmark} title="Land Details — Legal & Financial" />
        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {renderInput("Cadastral Value", "type_specific.land.legal_financial.cadastral_value", "number")}
          {renderInput("Annual Land Tax", "type_specific.land.legal_financial.annual_land_tax", "number")}
          {renderInput("Servitudes", "type_specific.land.legal_financial.servitudes")}
          {renderInput("Servitudes Description", "type_specific.land.legal_financial.servitudes_description")}
          {renderInput("Pre-emption Rights", "type_specific.land.legal_financial.pre_emption_rights")}
          {renderInput("Environmental Constraints", "type_specific.land.legal_financial.environmental_constraints")}
          {renderInput("Archaeological Interest", "type_specific.land.legal_financial.archaeological_interest")}
          {renderBoolean("Co-Ownership of Land", "type_specific.land.legal_financial.co_ownership_of_land")}
          {renderBoolean("Seller Financing", "type_specific.land.legal_financial.seller_financing")}
          {renderInput("Seller Financing Terms", "type_specific.land.legal_financial.seller_financing_terms")}
          {renderInput("Division Possibility", "type_specific.land.legal_financial.division_possibility")}
          {renderInput("Price per Are", "type_specific.land.legal_financial.price_per_are", "number")}
          {renderInput("Price per Hectare", "type_specific.land.legal_financial.price_per_hectare", "number")}
        </CardContent>
      </Card>

      <Separator />

      {/* ACTIONS */}
      <div className="flex gap-4 pb-12">
        <Button className="rounded-lg px-8 py-5" onClick={() => console.log(form)}>
          Save Property
        </Button>
        <Button variant="outline" className="rounded-lg px-8 py-5 border-red-400 text-red-500">
          Cancel
        </Button>
      </div>
    </div>
  )
}