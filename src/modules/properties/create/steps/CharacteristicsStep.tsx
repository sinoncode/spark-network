import { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  GoogleMap,
  MarkerF,
  useJsApiLoader,
} from "@react-google-maps/api"

import { MapPin, Building2, Globe, Landmark, DollarSign,
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
  Link,
  Search,
  TreeDeciduous,
  BarChart3,
  Share2,
  Mountain, } from "lucide-react"

import { usePropertyCreationStore } from "../store/propertyCreationStore"
import {
  MAP_DISPLAY_OPTIONS,
  CONFIDENTIALITY_OPTIONS,
   PROPERTY_SUB_TYPE_OPTIONS,
  EXCLUSIVITY_OPTIONS,
  FURNISHING_STATUS_OPTIONS,
  FACING_DIRECTION_OPTIONS,
  CONDITION_OPTIONS,
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

export default function CharacteristicsStep() {
  const { form, updateForm } = usePropertyCreationStore()
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY ?? "",
  })

  const latitude = form.location?.coordinates?.latitude
  const longitude = form.location?.coordinates?.longitude
  const hasValidCoordinates =
    typeof latitude === "number" &&
    typeof longitude === "number"

  const mapCenter = useMemo<google.maps.LatLngLiteral>(
    () => ({
      lat: hasValidCoordinates ? latitude! : 46.2044,
      lng: hasValidCoordinates ? longitude! : 6.1432,
    }),
    [hasValidCoordinates, latitude, longitude]
  )

const getValue = (obj: any, path: string): any => {
  return path.split('.').reduce((o, p) => o?.[p], obj)
}

const setField = (path: string, value: any) => {
  const keys = path.split('.')
  const newForm = { ...form }
  let current: any = newForm
  for (let i = 0; i < keys.length - 1; i++) {
    current[keys[i]] = { ...current[keys[i]] }
    current = current[keys[i]]
  }
  current[keys[keys.length - 1]] = value
  updateForm(newForm)
}

const handleBoolean = (path: string, v: string) => {
  if (v === "") setField(path, null)
  else if (v === "true") setField(path, true)
  else if (v === "false") setField(path, false)
}

const handleArray = (path: string, value: string) => {
  const arr = value.split(',').map(s => s.trim()).filter(Boolean)
  setField(path, arr.length ? arr : null)
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
      <CardTitle className="flex items-center gap-2 text-base text-blue-600">
        <Icon className="h-5 w-5" />
        {title}
      </CardTitle>
    </CardHeader>
  )

  return (
    <div className="space-y-6">

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

    </div>
  )
}