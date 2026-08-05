export type PropertyStatus =
    | "active"
    | "draft"
    | "sold"
    | "inactive"
    | "archived";

export type ListingType = "sale" | "rent";

export type FurnishingStatus =
    | "fully_furnished"
    | "semi_furnished"
    | "unfurnished"
    | "partly_furnished";

export type FacingDirection =
    | "north"
    | "south"
    | "east"
    | "west"
    | "north_east"
    | "north_west"
    | "south_east"
    | "south_west";

export type PropertyCategory =
    | "residential"
    | "land"
    | "commercial";

export type PropertySubType =
    | "penthouse"
    | "plot_residential"
    | "villa"
    | "apartment"
    | "house"
    | "studio"
    | "office"
    | "warehouse"
    | "shop";

export type ExclusivityType =
    | "exclusive_mandate"
    | "open_mandate"
    | null;

export type PriceType = "fixed" | "negotiable" | null;

export type MapDisplayType =
    | "exact_address"
    | "approximate_radius"
    | "street_only"
    | "hidden";

export type ConfidentialityLevel =
    | "public"
    | "private"
    | "confidential";

export type ConditionStatus =
    | "excellent"
    | "like_new"
    | "good"
    | "fair"
    | "needs_renovation"
    | "to_renovate"
    | null;

export type ConstructionType =
    | "concrete_beton"
    | "brick"
    | "wood_frame"
    | "steel"
    | "mixed"
    | null;

export type RoofType =
    | "flat_terrasse"
    | "pitched"
    | "gable"
    | "hip"
    | "mansard"
    | null;

export type FacadeMaterial =
    | "stone"
    | "brick"
    | "render"
    | "wood"
    | "metal"
    | "glass"
    | null;

export type WindowGlazing =
    | "single"
    | "double"
    | "triple"
    | null;

export type WindowFrameMaterial =
    | "wood"
    | "aluminium"
    | "wood_aluminium"
    | "pvc"
    | "steel"
    | null;

export type ViewType =
    | "lake_water"
    | "mountain"
    | "city"
    | "garden"
    | "park"
    | "sea"
    | "courtyard"
    | null;

export type ViewQuality =
    | "panoramic"
    | "clear"
    | "partial"
    | "obstructed"
    | null;

export type SunlightExposure =
    | "bright_sunny"
    | "sunny"
    | "partial_shade"
    | "shady"
    | null;

export type GardenType =
    | "private"
    | "shared"
    | "communal"
    | null;

export type GardenStyle =
    | "landscaped"
    | "natural"
    | "japanese"
    | "mediterranean"
    | "formal"
    | null;

export type TerraceType =
    | "rooftop"
    | "ground_floor"
    | "balcony_extension"
    | "loggia"
    | null;

export type SwimmingPoolType =
    | "overflow_infinity"
    | "skimmer"
    | "natural"
    | "indoor"
    | null;

export type FencingType =
    | "full"
    | "partial"
    | "none"
    | null;

export type FencingMaterial =
    | "wall"
    | "fence"
    | "hedge"
    | "gate"
    | null;

export type GarageDoorType =
    | "electric_sectional"
    | "manual_up_over"
    | "roller"
    | "side_hinged"
    | null;

export type ParkingType =
    | "underground"
    | "surface"
    | "carport"
    | "garage"
    | null;

export type ParkingIncluded =
    | "yes_included_in_price"
    | "no_available_separately"
    | "no_not_available"
    | null;

export type KitchenType =
    | "open_american"
    | "separate"
    | "eat_in"
    | "galley"
    | null;

export type KitchenEquipment =
    | "fully_equipped"
    | "partially_equipped"
    | "not_equipped"
    | null;

export type WorktopMaterial =
    | "quartz"
    | "granite"
    | "marble"
    | "wood"
    | "laminate"
    | "stainless_steel"
    | null;

export type FloorMaterial =
    | "parquet_solid"
    | "parquet"
    | "laminate"
    | "tile"
    | "stone"
    | "carpet"
    | "concrete"
    | null;

export type FireplaceType =
    | "wood_burning"
    | "gas"
    | "electric"
    | "bioethanol"
    | null;

export type SaunaType =
    | "finnish_sauna"
    | "infrared"
    | "steam_room"
    | "bio_sauna"
    | null;

export type HeatingSource =
    | "ground_source_heat_pump"
    | "air_source_heat_pump"
    | "gas"
    | "oil"
    | "electric"
    | "wood"
    | "pellet"
    | "district_heating"
    | "solar"
    | null;

export type HeatingDistribution =
    | "underfloor_radiant"
    | "radiators"
    | "air_convection"
    | "wall_heating"
    | null;

export type HeatingControl =
    | "smart_thermostat"
    | "programmable"
    | "manual"
    | "zone_control"
    | null;

export type HotWaterProduction =
    | "heat_pump"
    | "gas_boiler"
    | "electric"
    | "solar_thermal"
    | "district_heating"
    | null;

export type AirConditioningType =
    | "multi_split"
    | "single_split"
    | "central"
    | "portable"
    | null;

export type VentilationSystem =
    | "double_flow_vmc"
    | "single_flow_vmc"
    | "natural"
    | "mechanical"
    | null;

export type SolarPanelsType =
    | "owners_panels"
    | "shared"
    | "lease"
    | null;

export type SmartHomeLevel =
    | "full"
    | "partial"
    | "basic"
    | null;

export type SecuritySystemType =
    | "monitored_alarm"
    | "unmonitored_alarm"
    | "camera_only"
    | null;

export type CCTVType =
    | "outdoor"
    | "indoor"
    | "both"
    | null;

export type InternetType =
    | "fibre_ftth"
    | "fibre_fttb"
    | "dsl"
    | "cable"
    | "satellite"
    | "4g"
    | "5g"
    | null;

export type TVReception =
    | "satellite"
    | "cable"
    | "terrestrial"
    | "streaming"
    | null;

export type ApartmentHeatingSystem =
    | "collective_district_heating"
    | "individual"
    | "collective_gas"
    | "collective_electric"
    | null;

export type ApartmentHotWater =
    | "collective"
    | "individual"
    | null;

export type CaretakerType =
    | "full_time"
    | "part_time"
    | "external_company"
    | null;

export type ConciergeServices =
    | "basic"
    | "premium"
    | "full"
    | null;

export type PositionInBuilding =
    | "top_floor"
    | "ground_floor"
    | "mid_floor"
    | "garden_level"
    | "mezzanine"
    | null;

export type CommissionPayer =
    | "seller"
    | "buyer"
    | "split"
    | null;

export type SourceType =
    | "referral"
    | "direct"
    | "portal"
    | "walk_in"
    | "social_media"
    | null;

// Land-specific enums
export type Topography =
    | "gently_sloping"
    | "flat"
    | "steep"
    | "terraced"
    | null;

export type ZoningCategory =
    | "residential_zone"
    | "commercial_zone"
    | "mixed_use"
    | "agricultural"
    | "industrial"
    | null;

export type BuildingPermissionStatus =
    | "granted_valid"
    | "granted_expired"
    | "pending"
    | "not_required"
    | "denied"
    | null;

export type RoadAccess =
    | "public_paved_road"
    | "public_unpaved"
    | "private_road"
    | "no_access"
    | null;

export type UtilityConnection =
    | "connected"
    | "nearby"
    | "not_connected"
    | null;

export type SoilType =
    | "loam"
    | "clay"
    | "sand"
    | "silt"
    | "rocky"
    | "peat"
    | null;

export type FloodZone =
    | "none"
    | "low"
    | "medium"
    | "high"
    | null;

export type SeismicZone =
    | "zone_1"
    | "zone_2"
    | "zone_3"
    | "zone_4"
    | null;


// ==================== SUB-INTERFACES ====================

export interface Coordinates {
    latitude: number | null;
    longitude: number | null;
}

export interface Classification {
    category: PropertyCategory;
    sub_type: PropertySubType;
    transaction_type: ListingType;
    listing_status: PropertyStatus;
}

export interface Mandate {
    exclusivity: ExclusivityType;
    mandate_start_date: string | null;
    mandate_end_date: string | null;
    listing_date: string | null;
    publication_date: string | null;
    publication_channels: string[];
}

export interface Pricing {
    price: number;
    currency: string;
    price_type: PriceType;
    price_per_sqm: number | null;
    price_reduced: boolean;
    original_price: number | null;
    reduction_amount: number | null;
    reduction_date: string | null;
    vat_applicable: boolean | null;
    vat_rate: number | null;
    discount: number | null;
    formatted_price: string;
}

export interface Location {
    address_line_1: string | null;
    address_line_2: string | null;
    zip_code: string | null;
    city: string | null;
    district: string | null;
    state: string | null;
    country: string | null;
    coordinates: Coordinates;
    map_display: MapDisplayType;
    confidentiality_level: ConfidentialityLevel;
    neighborhood_description: string | null;
}

export interface Agents {
    assigned_agent_id: number;
    referral_agent_id: number | null;
    commission_rate: number | null;
    commission_payer: CommissionPayer;
    source: SourceType;
}

export interface Media {
    main_photo: string | null;
    photos: string[];
    watermark_option: string | null;
    video_url: string | null;
    virtual_tour_url: string | null;
    floor_plan_url: string | null;
    location_map_url: string | null;
    brochure_url: string | null;
    epc_document_url: string | null;
}

export interface Documents {
    title_deed: string | null;
    floor_plan: string | null;
    id_proof: string | null;
    legal_documents: string | null;
}

export interface Energy {
    energy_class: string | null;
    co2_class: string | null;
    primary_energy_kwh: number | null;
    final_energy_kwh: number | null;
    heating_source: HeatingSource;
}

export interface Dimensions {
    gross_floor_area: number | null;
    living_area: number | null;
    net_habitable_area: number | null;
    carrez_law_area: number | null;
    plot_area: number | null;
    plot_area_ares: number | null;
    plot_area_hectares: number | null;
    rooms: number | null;
    bedrooms: number | null;
    bathrooms: number | null;
    shower_rooms: number | null;
    separate_wcs: number | null;
    balconies: number | null;
    floor_number: string | null;
    total_floors: number | null;
    floors_storeys: number | null;
    ceiling_height: number | null;
    basement: string | null;
    basement_area: number | null;
    attic: string | null;
    attic_area: number | null;
    cellar_type: string | null;
    apartment_layout: string | null;
    entrance_hall: boolean;
    separate_dining_room: boolean;
    utility_laundry_room: boolean;
    home_office_study: boolean;
    playroom: boolean;
    guest_suite: boolean;
    staff_quarters: boolean;
    storage_debarras: boolean;
    separate_cellar: boolean;
    separate_cellar_area: number | null;
    separate_attic: boolean;
    separate_attic_area: number | null;
}

export interface Construction {
    year_built: number | null;
    year_renovated: number | null;
    condition: ConditionStatus;
    construction_type: ConstructionType;
    roof_type: RoofType;
    facade_material: FacadeMaterial;
    insulation_walls: string | null;
    insulation_walls_year: number | null;
    insulation_roof: string | null;
    insulation_roof_year: number | null;
    insulation_floor: string | null;
    window_glazing: WindowGlazing;
    window_frame_material: WindowFrameMaterial;
    listed_heritage: boolean;
    listed_heritage_grade: string | null;
    building_permit_number: string | null;
    building_permit_date: string | null;
    asbestos_diagnosis: string | null;
    lead_paint_diagnosis: string | null;
    termite_diagnosis: string | null;
    electricity_compliance: string | null;
    gas_compliance: string | null;
}

export interface Orientation {
    facing_direction: FacingDirection;
    garden_orientation: FacingDirection | null;
    view_type: ViewType;
    view_quality: ViewQuality;
    floor_level: string | null;
    sunlight_exposure: SunlightExposure;
}

export interface Outdoor {
    garden: boolean;
    garden_area: number | null;
    garden_type: GardenType;
    garden_style: GardenStyle;
    terrace: boolean;
    terrace_area: number | null;
    terrace_type: TerraceType;
    terrace_access: string | null;
    balcony: boolean;
    balcony_area: number | null;
    loggia: boolean;
    loggia_area: number | null;
    conservatory_veranda: boolean;
    conservatory_area: number | null;
    private_garden: boolean;
    private_garden_area: number | null;
    swimming_pool: SwimmingPoolType;
    pool_area: number | null;
    pool_heated: boolean;
    pool_cover_safety: boolean;
    hot_tub: boolean;
    pond_water_feature: boolean;
    outdoor_kitchen: boolean;
    greenhouse: boolean;
    pergola_gazebo: boolean;
    trampoline_play_area: boolean;
    orchard: boolean;
    vegetable_garden: boolean;
    outbuilding: boolean;
    outbuilding_purpose: string | null;
    outbuilding_area: number | null;
    fencing: FencingType;
    fencing_material: FencingMaterial;
    automatic_gate: boolean;
    intercom_at_gate: boolean;
    floor_to_ceiling_windows: boolean;
    shutters_type: string | null;
}

export interface Parking {
    covered_parking: boolean;
    open_parking: boolean;
    parking_slots: number | null;
    ev_charging: boolean;
    garage_attached: string | null;
    garage_attached_area: number | null;
    garage_detached: string | null;
    carport: string | null;
    outdoor_parking_spaces: number | null;
    garage_door_type: GarageDoorType;
    ev_charging_garage: boolean;
    ev_charging_garage_kw: number | null;
    garage_pit: boolean;
    garage_water_sink: boolean;
    garage_electricity: boolean;
    parking_included: ParkingIncluded;
    parking_type: ParkingType;
    parking_spaces_included: number | null;
    parking_level: string | null;
    parking_space_numbers: string | null;
    ev_charging_parking: boolean;
    ev_charging_parking_kw: number | null;
    cellar_included: ParkingIncluded;
    cellar_number: string | null;
    cellar_area: number | null;
    separate_storage_unit: boolean;
    separate_storage_area: number | null;
    motorbike_scooter_space: boolean;
    bicycle_storage_type: string | null;
}

export interface Equipment {
    kitchen_type: KitchenType;
    kitchen_equipment: KitchenEquipment;
    kitchen_appliances: string[];
    worktop_material: WorktopMaterial;
    bathroom_fittings: string[];
    floor_material_living: FloorMaterial;
    floor_material_bedrooms: FloorMaterial;
    floor_material_kitchen: FloorMaterial;
    mouldings_cornices: boolean;
    fireplace: FireplaceType;
    sauna: SaunaType;
    home_cinema: boolean;
    games_room: boolean;
    wine_cellar_room: boolean;
    wine_cellar_capacity: number | null;
    elevator_house: boolean;
    disability_access: string | null;
    ramped_entrance: boolean;
    wide_doorways: boolean;
    laundry_room: boolean;
    ironing_room: boolean;
    pantry: boolean;
    staff_entrance: boolean;
    double_height_ceiling: boolean;
    furnishing_status: FurnishingStatus;
    alarm_system: string | null;
    door_security: string | null;
    intercom_front_door: string | null;
    apartment_ac: string | null;
    apartment_ac_rooms: string | null;
    double_glazing: boolean;
    roller_shutters: boolean;
    washing_machine_connection: boolean;
    dryer_connection: boolean;
    satellite_dish_allowed: string | null;
    fibre_optic_prewired: boolean;
    tv_points: number | null;
}

export interface HVAC {
    heating_source: HeatingSource;
    heating_distribution: HeatingDistribution;
    heating_control: HeatingControl;
    hot_water_production: HotWaterProduction;
    hot_water_tank_litres: number | null;
    air_conditioning: AirConditioningType;
    ac_rooms_covered: string | null;
    ventilation_system: VentilationSystem;
    solar_panels_pv: SolarPanelsType;
    solar_panels_kwp: number | null;
    solar_thermal: boolean;
    battery_storage: boolean;
    battery_storage_kwh: number | null;
    ev_charging_points: number | null;
    ev_charging_kw_point: number | null;
    rainwater_harvesting: boolean;
    rainwater_capacity_l: number | null;
    water_softener: boolean;
    double_flux_ventilation: boolean;
    smart_home: SmartHomeLevel;
    smart_home_brand: string | null;
    security_system: SecuritySystemType;
    cctv: CCTVType;
    safe_room: boolean;
    smoke_detectors: boolean;
    co_detectors: boolean;
    sprinklers: boolean;
    internet_type: InternetType;
    internet_download_mbps: number | null;
    internet_upload_mbps: number | null;
    tv_reception: TVReception;
    apartment_heating_system: ApartmentHeatingSystem;
    apartment_hot_water: ApartmentHotWater;
    apartment_ventilation: string | null;
    building_solar_panels: boolean;
    green_energy_contract: boolean;
    annual_energy_cost_min: number | null;
    annual_energy_cost_max: number | null;
}

export interface BuildingInfo {
    position_in_building: PositionInBuilding;
    building_architectural_style: string | null;
    building_condition: ConditionStatus;
    building_classification: string | null;
    units_in_building: number | null;
    elevator_count: number | null;
    lift_all_floors: boolean;
    caretaker_type: CaretakerType;
    digicode_entry: boolean;
    intercom_type: string | null;
    bicycle_storage_room: boolean;
    pram_storage: boolean;
    communal_laundry: boolean;
    communal_garden: boolean;
    rooftop_shared: boolean;
    swimming_pool_shared: boolean;
    fitness_room_shared: boolean;
    concierge_services: ConciergeServices;
    disability_access_building: string | null;
    facade_renovation_year: number | null;
    roof_renovation_year: number | null;
    elevator_last_serviced: string | null;
}

export interface Financials {
    cadastral_reference: string | null;
    land_registry_number: string | null;
    annual_property_tax: number | null;
    annual_insurance_cost: number | null;
    annual_maintenance: number | null;
    maintenance_charges: number | null;
    monthly_hoa_charges: number | null;
    co_ownership: boolean;
    co_ownership_legal_ongoing: boolean;
    tenants_in_place: boolean;
    rental_income_monthly: number | null;
    rental_income_annual: number | null;
    rental_yield_gross: number | null;
    permitted_uses: string | null;
    right_of_way: boolean;
    right_of_way_description: string | null;
    pre_emption_right: boolean;
    pre_emption_holder: string | null;
    mortgage_encumbrance: string | null;
    mortgage_amount: number | null;
    asking_price_justification: string | null;
    comparable_sales: string | null;
    tax_percentage: number | null;
    co_ownership_reference: string | null;
    co_ownership_share_pct: number | null;
    monthly_co_ownership_charges: number | null;
    charges_include: string[];
    charges_exclude: string | null;
    sinking_fund_contribution: number | null;
    outstanding_works_amount: number | null;
    legal_proceedings_ongoing: boolean;
    legal_proceedings_details: string | null;
    agm_date: string | null;
    syndic_managing_agent: string | null;
    number_of_lots: number | null;
    current_monthly_rent: number | null;
    current_lease_type: string | null;
    lease_start_date: string | null;
    lease_end_date: string | null;
    security_deposit_months: number | null;
    rental_yield_net: number | null;
    rental_potential_month: number | null;
}

export interface Linked {
    owners: any[];
    buyers: any[];
    deals: any[];
    visits: any[];
}

export interface PortalSyndication {
    publish_to_website: boolean;
    publish_to_portals: string[];
    publication_languages: string[];
    translation_status: string | null;
    listing_display_address: string | null;
    watermark_photos: string | null;
    featured_premium: boolean;
    top_of_portal_boost: boolean;
    top_of_portal_expiry: string | null;
    social_media_autopost: boolean;
    social_media_channels: string[];
    email_blast: boolean;
    print_publication: boolean;
    print_publication_name: string | null;
    window_card: boolean;
    window_card_office: string | null;
}

export interface Matching {
    budget_min: number | null;
    budget_max: number | null;
    property_types: string[];
    locations: string[];
    min_living_area: number | null;
    min_bedrooms: number | null;
    min_bathrooms: number | null;
    garden_required: boolean | null;
    parking_required: boolean | null;
    parking_count: number | null;
    floor_preference: string | null;
    view_preference: string | null;
    max_monthly_charges: number | null;
    furnished: boolean | null;
    pets_allowed: boolean | null;
    disability_access: boolean;
    energy_class_min: string | null;
    move_in_date: string | null;
    contact_preference: string | null;
    alert_frequency: string | null;
    gdpr_consent: boolean;
    gdpr_consent_date: string | null;
    marketing_consent: boolean;
}

// ==================== LAND-SPECIFIC TYPES ====================

export interface LandArea {
    total_area: number | null;
    total_area_ares: number | null;
    total_area_hectares: number | null;
    road_frontage_m: number | null;
    depth_m: number | null;
    perimeter_m: number | null;
    cadastral_parcels_count: number | null;
    cadastral_parcel_numbers: string | null;
    buildable_area: number | null;
    max_footprint_ces: number | null;
    land_shape: string | null;
    topography: Topography;
    elevation_m: number | null;
    aspect_orientation: FacingDirection | null;
}

export interface LandZoning {
    zoning_category: ZoningCategory;
    building_permission_status: BuildingPermissionStatus;
    building_permit_expiry_date: string | null;
    max_building_height: number | null;
    max_floors_allowed: number | null;
    setback_front: number | null;
    setback_rear: number | null;
    setback_side: number | null;
    cos_far: number | null;
    ces_ratio: number | null;
    max_units_allowed: number | null;
    permitted_uses: string[];
    architectural_constraints: string | null;
    national_park: boolean;
    national_park_name: string | null;
    natura_2000_zone: boolean;
    classified_protected_site: boolean;
    subdivision_required: boolean | null;
}

export interface LandAccessUtilities {
    road_access: RoadAccess;
    road_frontage_sides: number | null;
    access_gate: boolean;
    water_connection: UtilityConnection;
    water_connection_distance_m: number | null;
    electricity_connection: UtilityConnection;
    electricity_connection_distance_m: number | null;
    gas_connection: UtilityConnection;
    gas_connection_distance_m: number | null;
    sewage_connection: UtilityConnection;
    telecom_connection: UtilityConnection;
    irrigation_water_rights: boolean;
    water_source_on_land: string | null;
    distance_to_town_km: number | null;
    distance_to_train_km: number | null;
    distance_to_motorway_km: number | null;
    distance_to_airport_km: number | null;
    distance_to_schools_km: number | null;
    distance_to_shops_km: number | null;
}

export interface LandCharacteristics {
    soil_type: SoilType;
    soil_quality: string | null;
    soil_contamination: string | null;
    subsoil_report_available: boolean;
    flood_zone: FloodZone;
    flood_zone_reference: string | null;
    seismic_zone: SeismicZone;
    landslide_risk: string | null;
    radon_risk: string | null;
    vegetation: string | null;
    tree_species: string | null;
    protected_trees: boolean;
    crops_cultivation: string | null;
    agricultural_tenancy: boolean;
    agricultural_tenancy_type: string | null;
    agricultural_tenancy_end: string | null;
    mineral_rights: string | null;
    hunting_rights: string | null;
    hunting_rights_holder: string | null;
    fishing_rights: string | null;
}

export interface LandLegalFinancial {
    cadastral_value: number | null;
    annual_land_tax: number | null;
    servitudes: string | null;
    servitudes_description: string | null;
    pre_emption_rights: string | null;
    environmental_constraints: string | null;
    archaeological_interest: string | null;
    co_ownership_of_land: boolean;
    seller_financing: boolean;
    seller_financing_terms: string | null;
    division_possibility: string | null;
    price_per_are: number | null;
    price_per_hectare: number | null;
}

export interface LandDetails {
    area: LandArea;
    zoning: LandZoning;
    access_utilities: LandAccessUtilities;
    characteristics: LandCharacteristics;
    legal_financial: LandLegalFinancial;
}

export interface TypeSpecific {
    land?: LandDetails;
    // Add other property type specifics here as needed:
    // apartment?: ApartmentDetails;
    // villa?: VillaDetails;
    // commercial?: CommercialDetails;
}


// ==================== MAIN PROPERTY INTERFACE ====================

export interface Property {
    id: number;
    internal_reference: string;
    classification: Classification;
    mandate: Mandate;
    title: string;
    description: string | null;
    pricing: Pricing;
    location: Location;
    agents: Agents;
    media: Media;
    documents: Documents;
    energy: Energy;
    dimensions: Dimensions;
    construction: Construction;
    orientation: Orientation;
    outdoor: Outdoor;
    parking: Parking;
    equipment: Equipment;
    hvac: HVAC;
    building_info: BuildingInfo;
    financials: Financials;
    linked: Linked;
    type_specific: TypeSpecific | any[];  // Can be object or empty array
    portal_syndication: PortalSyndication;
    matching: Matching;
    keywords: string[];
    internal_notes: string | null;
    created_by: number | null;
    last_modified_by: number | null;
    created_at: string;
    updated_at: string;
}


// ==================== API RESPONSE TYPES ====================

export interface PropertyMeta {
    current_page: number;
    from: number;
    last_page: number;
    links: PaginationLink[];
    path: string;
    per_page: number;
    to: number;
    total: number;
}

export interface PaginationLink {
    url: string | null;
    label: string;
    page: number | null;
    active: boolean;
}

export interface PropertyLinks {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
}

export interface PropertyListResponse {
    data: Property[];
    links: PropertyLinks;
    meta: PropertyMeta;
}

export interface PropertySingleResponse {
    data: Property;
    // For single property responses, links and meta may not be present
}

export interface PropertyResponse {
    success: boolean;
    message: string;
    data: Property;
}

export interface PropertyValidationErrors {
    [key: string]: string[] | undefined;
}

export interface PropertyErrorResponse {
    success: false;
    message: string;
    errors?: PropertyValidationErrors;
}


// ==================== PAYLOAD TYPES (FOR CREATE/UPDATE) ====================

export interface PropertyPayload {
    // Required fields
    title: string;
    classification: Partial<Classification>;
    pricing: Partial<Pricing>;
    location: Partial<Location>;

    // Optional fields
    internal_reference?: string;
    description?: string | null;
    mandate?: Partial<Mandate>;
    agents?: Partial<Agents>;
    media?: Partial<Media>;
    documents?: Partial<Documents>;
    energy?: Partial<Energy>;
    dimensions?: Partial<Dimensions>;
    construction?: Partial<Construction>;
    orientation?: Partial<Orientation>;
    outdoor?: Partial<Outdoor>;
    parking?: Partial<Parking>;
    equipment?: Partial<Equipment>;
    hvac?: Partial<HVAC>;
    building_info?: Partial<BuildingInfo>;
    financials?: Partial<Financials>;
    type_specific?: Partial<TypeSpecific>;
    portal_syndication?: Partial<PortalSyndication>;
    matching?: Partial<Matching>;
    keywords?: string[];
    internal_notes?: string | null;
    status?: PropertyStatus;
}


// ==================== SELECT/OPTION CONSTANTS ====================

export const PROPERTY_STATUS_OPTIONS = [
    { value: "active" as PropertyStatus, label: "Active" },
    { value: "draft" as PropertyStatus, label: "Draft" },
    { value: "sold" as PropertyStatus, label: "Sold" },
    { value: "inactive" as PropertyStatus, label: "Inactive" },
    { value: "archived" as PropertyStatus, label: "Archived" },
];

export const LISTING_TYPE_OPTIONS = [
    { value: "sale" as ListingType, label: "For Sale" },
    { value: "rent" as ListingType, label: "For Rent" },
];

export const PROPERTY_CATEGORY_OPTIONS = [
    { value: "residential" as PropertyCategory, label: "Residential" },
    { value: "land" as PropertyCategory, label: "Land" },
    { value: "commercial" as PropertyCategory, label: "Commercial" },
];

export const PROPERTY_SUB_TYPE_OPTIONS = [
    { value: "penthouse" as PropertySubType, label: "Penthouse" },
    { value: "plot_residential" as PropertySubType, label: "Residential Plot" },
    { value: "villa" as PropertySubType, label: "Villa" },
    { value: "apartment" as PropertySubType, label: "Apartment" },
    { value: "house" as PropertySubType, label: "House" },
    { value: "studio" as PropertySubType, label: "Studio" },
    { value: "office" as PropertySubType, label: "Office" },
    { value: "warehouse" as PropertySubType, label: "Warehouse" },
    { value: "shop" as PropertySubType, label: "Shop" },
];

export const EXCLUSIVITY_OPTIONS = [
    { value: "exclusive_mandate" as ExclusivityType, label: "Exclusive Mandate" },
    { value: "open_mandate" as ExclusivityType, label: "Open Mandate" },
];

export const FURNISHING_STATUS_OPTIONS = [
    { value: "fully_furnished" as FurnishingStatus, label: "Fully Furnished" },
    { value: "semi_furnished" as FurnishingStatus, label: "Semi Furnished" },
    { value: "partly_furnished" as FurnishingStatus, label: "Partly Furnished" },
    { value: "unfurnished" as FurnishingStatus, label: "Unfurnished" },
];

export const FACING_DIRECTION_OPTIONS = [
    { value: "north" as FacingDirection, label: "North" },
    { value: "south" as FacingDirection, label: "South" },
    { value: "east" as FacingDirection, label: "East" },
    { value: "west" as FacingDirection, label: "West" },
    { value: "north_east" as FacingDirection, label: "North East" },
    { value: "north_west" as FacingDirection, label: "North West" },
    { value: "south_east" as FacingDirection, label: "South East" },
    { value: "south_west" as FacingDirection, label: "South West" },
];

export const CONDITION_OPTIONS = [
    { value: "excellent" as ConditionStatus, label: "Excellent" },
    { value: "like_new" as ConditionStatus, label: "Like New" },
    { value: "good" as ConditionStatus, label: "Good" },
    { value: "fair" as ConditionStatus, label: "Fair" },
    { value: "needs_renovation" as ConditionStatus, label: "Needs Renovation" },
    { value: "to_renovate" as ConditionStatus, label: "To Renovate" },
];

export const MAP_DISPLAY_OPTIONS = [
    { value: "exact_address" as MapDisplayType, label: "Exact Address" },
    { value: "approximate_radius" as MapDisplayType, label: "Approximate Radius" },
    { value: "street_only" as MapDisplayType, label: "Street Only" },
    { value: "hidden" as MapDisplayType, label: "Hidden" },
];

export const CONFIDENTIALITY_OPTIONS = [
    { value: "public" as ConfidentialityLevel, label: "Public" },
    { value: "private" as ConfidentialityLevel, label: "Private" },
    { value: "confidential" as ConfidentialityLevel, label: "Confidential" },
];

export const PRICE_TYPE_OPTIONS = [
    { value: "fixed" as PriceType, label: "Fixed Price" },
    { value: "negotiable" as PriceType, label: "Negotiable" },
];

export const COMMISSION_PAYER_OPTIONS = [
    { value: "seller" as CommissionPayer, label: "Seller" },
    { value: "buyer" as CommissionPayer, label: "Buyer" },
    { value: "split" as CommissionPayer, label: "Split" },
];

export const SOURCE_OPTIONS = [
    { value: "referral" as SourceType, label: "Referral" },
    { value: "direct" as SourceType, label: "Direct" },
    { value: "portal" as SourceType, label: "Portal" },
    { value: "walk_in" as SourceType, label: "Walk In" },
    { value: "social_media" as SourceType, label: "Social Media" },
];

export const POSITION_IN_BUILDING_OPTIONS = [
    { value: "top_floor" as PositionInBuilding, label: "Top Floor" },
    { value: "ground_floor" as PositionInBuilding, label: "Ground Floor" },
    { value: "mid_floor" as PositionInBuilding, label: "Mid Floor" },
    { value: "garden_level" as PositionInBuilding, label: "Garden Level" },
    { value: "mezzanine" as PositionInBuilding, label: "Mezzanine" },
];

export const CARETAKER_OPTIONS = [
    { value: "full_time" as CaretakerType, label: "Full Time" },
    { value: "part_time" as CaretakerType, label: "Part Time" },
    { value: "external_company" as CaretakerType, label: "External Company" },
];

export const CONCIERGE_OPTIONS = [
    { value: "basic" as ConciergeServices, label: "Basic" },
    { value: "premium" as ConciergeServices, label: "Premium" },
    { value: "full" as ConciergeServices, label: "Full" },
];

export const HEATING_SOURCE_OPTIONS = [
    { value: "ground_source_heat_pump" as HeatingSource, label: "Ground Source Heat Pump" },
    { value: "air_source_heat_pump" as HeatingSource, label: "Air Source Heat Pump" },
    { value: "gas" as HeatingSource, label: "Gas" },
    { value: "oil" as HeatingSource, label: "Oil" },
    { value: "electric" as HeatingSource, label: "Electric" },
    { value: "wood" as HeatingSource, label: "Wood" },
    { value: "pellet" as HeatingSource, label: "Pellet" },
    { value: "district_heating" as HeatingSource, label: "District Heating" },
    { value: "solar" as HeatingSource, label: "Solar" },
];

export const KITCHEN_TYPE_OPTIONS = [
    { value: "open_american" as KitchenType, label: "Open / American" },
    { value: "separate" as KitchenType, label: "Separate" },
    { value: "eat_in" as KitchenType, label: "Eat-in" },
    { value: "galley" as KitchenType, label: "Galley" },
];

export const KITCHEN_EQUIPMENT_OPTIONS = [
    { value: "fully_equipped" as KitchenEquipment, label: "Fully Equipped" },
    { value: "partially_equipped" as KitchenEquipment, label: "Partially Equipped" },
    { value: "not_equipped" as KitchenEquipment, label: "Not Equipped" },
];

export const WORKTOP_OPTIONS = [
    { value: "quartz" as WorktopMaterial, label: "Quartz" },
    { value: "granite" as WorktopMaterial, label: "Granite" },
    { value: "marble" as WorktopMaterial, label: "Marble" },
    { value: "wood" as WorktopMaterial, label: "Wood" },
    { value: "laminate" as WorktopMaterial, label: "Laminate" },
    { value: "stainless_steel" as WorktopMaterial, label: "Stainless Steel" },
];

export const FLOOR_MATERIAL_OPTIONS = [
    { value: "parquet_solid" as FloorMaterial, label: "Solid Parquet" },
    { value: "parquet" as FloorMaterial, label: "Parquet" },
    { value: "laminate" as FloorMaterial, label: "Laminate" },
    { value: "tile" as FloorMaterial, label: "Tile" },
    { value: "stone" as FloorMaterial, label: "Stone" },
    { value: "carpet" as FloorMaterial, label: "Carpet" },
    { value: "concrete" as FloorMaterial, label: "Concrete" },
];

export const FIREPLACE_OPTIONS = [
    { value: "wood_burning" as FireplaceType, label: "Wood Burning" },
    { value: "gas" as FireplaceType, label: "Gas" },
    { value: "electric" as FireplaceType, label: "Electric" },
    { value: "bioethanol" as FireplaceType, label: "Bioethanol" },
];

export const SAUNA_OPTIONS = [
    { value: "finnish_sauna" as SaunaType, label: "Finnish Sauna" },
    { value: "infrared" as SaunaType, label: "Infrared" },
    { value: "steam_room" as SaunaType, label: "Steam Room" },
    { value: "bio_sauna" as SaunaType, label: "Bio Sauna" },
];

export const SWIMMING_POOL_OPTIONS = [
    { value: "overflow_infinity" as SwimmingPoolType, label: "Overflow / Infinity" },
    { value: "skimmer" as SwimmingPoolType, label: "Skimmer" },
    { value: "natural" as SwimmingPoolType, label: "Natural" },
    { value: "indoor" as SwimmingPoolType, label: "Indoor" },
];

export const TERRACE_TYPE_OPTIONS = [
    { value: "rooftop" as TerraceType, label: "Rooftop" },
    { value: "ground_floor" as TerraceType, label: "Ground Floor" },
    { value: "balcony_extension" as TerraceType, label: "Balcony Extension" },
    { value: "loggia" as TerraceType, label: "Loggia" },
];

export const GARDEN_TYPE_OPTIONS = [
    { value: "private" as GardenType, label: "Private" },
    { value: "shared" as GardenType, label: "Shared" },
    { value: "communal" as GardenType, label: "Communal" },
];

export const GARDEN_STYLE_OPTIONS = [
    { value: "landscaped" as GardenStyle, label: "Landscaped" },
    { value: "natural" as GardenStyle, label: "Natural" },
    { value: "japanese" as GardenStyle, label: "Japanese" },
    { value: "mediterranean" as GardenStyle, label: "Mediterranean" },
    { value: "formal" as GardenStyle, label: "Formal" },
];

export const FENCING_OPTIONS = [
    { value: "full" as FencingType, label: "Full" },
    { value: "partial" as FencingType, label: "Partial" },
    { value: "none" as FencingType, label: "None" },
];

export const FENCING_MATERIAL_OPTIONS = [
    { value: "wall" as FencingMaterial, label: "Wall" },
    { value: "fence" as FencingMaterial, label: "Fence" },
    { value: "hedge" as FencingMaterial, label: "Hedge" },
    { value: "gate" as FencingMaterial, label: "Gate" },
];

export const GARAGE_DOOR_OPTIONS = [
    { value: "electric_sectional" as GarageDoorType, label: "Electric Sectional" },
    { value: "manual_up_over" as GarageDoorType, label: "Manual Up & Over" },
    { value: "roller" as GarageDoorType, label: "Roller" },
    { value: "side_hinged" as GarageDoorType, label: "Side Hinged" },
];

export const PARKING_TYPE_OPTIONS = [
    { value: "underground" as ParkingType, label: "Underground" },
    { value: "surface" as ParkingType, label: "Surface" },
    { value: "carport" as ParkingType, label: "Carport" },
    { value: "garage" as ParkingType, label: "Garage" },
];

export const PARKING_INCLUDED_OPTIONS = [
    { value: "yes_included_in_price" as ParkingIncluded, label: "Yes - Included in Price" },
    { value: "no_available_separately" as ParkingIncluded, label: "No - Available Separately" },
    { value: "no_not_available" as ParkingIncluded, label: "No - Not Available" },
];

export const CONSTRUCTION_TYPE_OPTIONS = [
    { value: "concrete_beton" as ConstructionType, label: "Concrete / Beton" },
    { value: "brick" as ConstructionType, label: "Brick" },
    { value: "wood_frame" as ConstructionType, label: "Wood Frame" },
    { value: "steel" as ConstructionType, label: "Steel" },
    { value: "mixed" as ConstructionType, label: "Mixed" },
];

export const ROOF_TYPE_OPTIONS = [
    { value: "flat_terrasse" as RoofType, label: "Flat / Terrasse" },
    { value: "pitched" as RoofType, label: "Pitched" },
    { value: "gable" as RoofType, label: "Gable" },
    { value: "hip" as RoofType, label: "Hip" },
    { value: "mansard" as RoofType, label: "Mansard" },
];

export const FACADE_MATERIAL_OPTIONS = [
    { value: "stone" as FacadeMaterial, label: "Stone" },
    { value: "brick" as FacadeMaterial, label: "Brick" },
    { value: "render" as FacadeMaterial, label: "Render" },
    { value: "wood" as FacadeMaterial, label: "Wood" },
    { value: "metal" as FacadeMaterial, label: "Metal" },
    { value: "glass" as FacadeMaterial, label: "Glass" },
];

export const WINDOW_GLAZING_OPTIONS = [
    { value: "single" as WindowGlazing, label: "Single" },
    { value: "double" as WindowGlazing, label: "Double" },
    { value: "triple" as WindowGlazing, label: "Triple" },
];

export const WINDOW_FRAME_OPTIONS = [
    { value: "wood" as WindowFrameMaterial, label: "Wood" },
    { value: "aluminium" as WindowFrameMaterial, label: "Aluminium" },
    { value: "wood_aluminium" as WindowFrameMaterial, label: "Wood-Aluminium" },
    { value: "pvc" as WindowFrameMaterial, label: "PVC" },
    { value: "steel" as WindowFrameMaterial, label: "Steel" },
];

export const VIEW_TYPE_OPTIONS = [
    { value: "lake_water" as ViewType, label: "Lake / Water" },
    { value: "mountain" as ViewType, label: "Mountain" },
    { value: "city" as ViewType, label: "City" },
    { value: "garden" as ViewType, label: "Garden" },
    { value: "park" as ViewType, label: "Park" },
    { value: "sea" as ViewType, label: "Sea" },
    { value: "courtyard" as ViewType, label: "Courtyard" },
];

export const VIEW_QUALITY_OPTIONS = [
    { value: "panoramic" as ViewQuality, label: "Panoramic" },
    { value: "clear" as ViewQuality, label: "Clear" },
    { value: "partial" as ViewQuality, label: "Partial" },
    { value: "obstructed" as ViewQuality, label: "Obstructed" },
];

export const SUNLIGHT_OPTIONS = [
    { value: "bright_sunny" as SunlightExposure, label: "Bright & Sunny" },
    { value: "sunny" as SunlightExposure, label: "Sunny" },
    { value: "partial_shade" as SunlightExposure, label: "Partial Shade" },
    { value: "shady" as SunlightExposure, label: "Shady" },
];

export const HEATING_DISTRIBUTION_OPTIONS = [
    { value: "underfloor_radiant" as HeatingDistribution, label: "Underfloor / Radiant" },
    { value: "radiators" as HeatingDistribution, label: "Radiators" },
    { value: "air_convection" as HeatingDistribution, label: "Air Convection" },
    { value: "wall_heating" as HeatingDistribution, label: "Wall Heating" },
];

export const HEATING_CONTROL_OPTIONS = [
    { value: "smart_thermostat" as HeatingControl, label: "Smart Thermostat" },
    { value: "programmable" as HeatingControl, label: "Programmable" },
    { value: "manual" as HeatingControl, label: "Manual" },
    { value: "zone_control" as HeatingControl, label: "Zone Control" },
];

export const HOT_WATER_OPTIONS = [
    { value: "heat_pump" as HotWaterProduction, label: "Heat Pump" },
    { value: "gas_boiler" as HotWaterProduction, label: "Gas Boiler" },
    { value: "electric" as HotWaterProduction, label: "Electric" },
    { value: "solar_thermal" as HotWaterProduction, label: "Solar Thermal" },
    { value: "district_heating" as HotWaterProduction, label: "District Heating" },
];

export const AC_OPTIONS = [
    { value: "multi_split" as AirConditioningType, label: "Multi Split" },
    { value: "single_split" as AirConditioningType, label: "Single Split" },
    { value: "central" as AirConditioningType, label: "Central" },
    { value: "portable" as AirConditioningType, label: "Portable" },
];

export const VENTILATION_OPTIONS = [
    { value: "double_flow_vmc" as VentilationSystem, label: "Double Flow VMC" },
    { value: "single_flow_vmc" as VentilationSystem, label: "Single Flow VMC" },
    { value: "natural" as VentilationSystem, label: "Natural" },
    { value: "mechanical" as VentilationSystem, label: "Mechanical" },
];

export const SOLAR_PANEL_OPTIONS = [
    { value: "owners_panels" as SolarPanelsType, label: "Owner's Panels" },
    { value: "shared" as SolarPanelsType, label: "Shared" },
    { value: "lease" as SolarPanelsType, label: "Lease" },
];

export const SMART_HOME_OPTIONS = [
    { value: "full" as SmartHomeLevel, label: "Full" },
    { value: "partial" as SmartHomeLevel, label: "Partial" },
    { value: "basic" as SmartHomeLevel, label: "Basic" },
];

export const SECURITY_SYSTEM_OPTIONS = [
    { value: "monitored_alarm" as SecuritySystemType, label: "Monitored Alarm" },
    { value: "unmonitored_alarm" as SecuritySystemType, label: "Unmonitored Alarm" },
    { value: "camera_only" as SecuritySystemType, label: "Camera Only" },
];

export const CCTV_OPTIONS = [
    { value: "outdoor" as CCTVType, label: "Outdoor" },
    { value: "indoor" as CCTVType, label: "Indoor" },
    { value: "both" as CCTVType, label: "Both" },
];

export const INTERNET_OPTIONS = [
    { value: "fibre_ftth" as InternetType, label: "Fibre FTTH" },
    { value: "fibre_fttb" as InternetType, label: "Fibre FTTB" },
    { value: "dsl" as InternetType, label: "DSL" },
    { value: "cable" as InternetType, label: "Cable" },
    { value: "satellite" as InternetType, label: "Satellite" },
    { value: "4g" as InternetType, label: "4G" },
    { value: "5g" as InternetType, label: "5G" },
];

export const TV_RECEPTION_OPTIONS = [
    { value: "satellite" as TVReception, label: "Satellite" },
    { value: "cable" as TVReception, label: "Cable" },
    { value: "terrestrial" as TVReception, label: "Terrestrial" },
    { value: "streaming" as TVReception, label: "Streaming" },
];

export const APARTMENT_HEATING_OPTIONS = [
    { value: "collective_district_heating" as ApartmentHeatingSystem, label: "Collective / District Heating" },
    { value: "individual" as ApartmentHeatingSystem, label: "Individual" },
    { value: "collective_gas" as ApartmentHeatingSystem, label: "Collective Gas" },
    { value: "collective_electric" as ApartmentHeatingSystem, label: "Collective Electric" },
];

export const APARTMENT_HOT_WATER_OPTIONS = [
    { value: "collective" as ApartmentHotWater, label: "Collective" },
    { value: "individual" as ApartmentHotWater, label: "Individual" },
];

// Land-specific options
export const TOPOGRAPHY_OPTIONS = [
    { value: "gently_sloping" as Topography, label: "Gently Sloping" },
    { value: "flat" as Topography, label: "Flat" },
    { value: "steep" as Topography, label: "Steep" },
    { value: "terraced" as Topography, label: "Terraced" },
];

export const ZONING_CATEGORY_OPTIONS = [
    { value: "residential_zone" as ZoningCategory, label: "Residential Zone" },
    { value: "commercial_zone" as ZoningCategory, label: "Commercial Zone" },
    { value: "mixed_use" as ZoningCategory, label: "Mixed Use" },
    { value: "agricultural" as ZoningCategory, label: "Agricultural" },
    { value: "industrial" as ZoningCategory, label: "Industrial" },
];

export const BUILDING_PERMISSION_OPTIONS = [
    { value: "granted_valid" as BuildingPermissionStatus, label: "Granted - Valid" },
    { value: "granted_expired" as BuildingPermissionStatus, label: "Granted - Expired" },
    { value: "pending" as BuildingPermissionStatus, label: "Pending" },
    { value: "not_required" as BuildingPermissionStatus, label: "Not Required" },
    { value: "denied" as BuildingPermissionStatus, label: "Denied" },
];

export const ROAD_ACCESS_OPTIONS = [
    { value: "public_paved_road" as RoadAccess, label: "Public Paved Road" },
    { value: "public_unpaved" as RoadAccess, label: "Public Unpaved" },
    { value: "private_road" as RoadAccess, label: "Private Road" },
    { value: "no_access" as RoadAccess, label: "No Access" },
];

export const UTILITY_CONNECTION_OPTIONS = [
    { value: "connected" as UtilityConnection, label: "Connected" },
    { value: "nearby" as UtilityConnection, label: "Nearby" },
    { value: "not_connected" as UtilityConnection, label: "Not Connected" },
];

export const SOIL_TYPE_OPTIONS = [
    { value: "loam" as SoilType, label: "Loam" },
    { value: "clay" as SoilType, label: "Clay" },
    { value: "sand" as SoilType, label: "Sand" },
    { value: "silt" as SoilType, label: "Silt" },
    { value: "rocky" as SoilType, label: "Rocky" },
    { value: "peat" as SoilType, label: "Peat" },
];

export const FLOOD_ZONE_OPTIONS = [
    { value: "none" as FloodZone, label: "None" },
    { value: "low" as FloodZone, label: "Low" },
    { value: "medium" as FloodZone, label: "Medium" },
    { value: "high" as FloodZone, label: "High" },
];

export const SEISMIC_ZONE_OPTIONS = [
    { value: "zone_1" as SeismicZone, label: "Zone 1" },
    { value: "zone_2" as SeismicZone, label: "Zone 2" },
    { value: "zone_3" as SeismicZone, label: "Zone 3" },
    { value: "zone_4" as SeismicZone, label: "Zone 4" },
];


// ==================== DEFAULT VALUES ====================

export const DEFAULT_PROPERTY_PAYLOAD: PropertyPayload = {
    title: "",
    classification: {
        category: "residential",
        sub_type: "apartment",
        transaction_type: "sale",
        listing_status: "draft",
    },
    pricing: {
        price: 0,
        currency: "CHF",
        price_type: "fixed",
        price_per_sqm: null,
        price_reduced: false,
        original_price: null,
        reduction_amount: null,
        reduction_date: null,
        vat_applicable: null,
        vat_rate: null,
        discount: null,
        formatted_price: "",
    },
    location: {
        address_line_1: null,
        address_line_2: null,
        zip_code: null,
        city: null,
        district: null,
        state: null,
        country: "CH",
        coordinates: {
            latitude: null,
            longitude: null,
        },
        map_display: "exact_address",
        confidentiality_level: "public",
        neighborhood_description: null,
    },
    description: null,
    keywords: [],
    internal_notes: null,
};


// ==================== UTILITY TYPES ====================

/** Extract all leaf keys from a nested object type (for form field mapping) */
export type DeepKeys<T, Prefix extends string = ""> = T extends object
    ? {
        [K in keyof T]-?: K extends string
        ? T[K] extends object
        ? T[K] extends Array<infer U>
        ? `${Prefix}${K}`
        : `${Prefix}${K}` | DeepKeys<T[K], `${Prefix}${K}.`>
        : `${Prefix}${K}`
        : never;
    }[keyof T]
    : never;

/** Make all properties optional recursively */
export type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/** Type guard to check if type_specific has land data */
export function hasLandDetails(typeSpecific: TypeSpecific | any[]): typeSpecific is { land: LandDetails } {
    return typeof typeSpecific === "object" && !Array.isArray(typeSpecific) && "land" in typeSpecific;
}
