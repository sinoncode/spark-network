import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import {
  Plus,
  Trash2,
  Upload,
  Palette,
  X,
  GripVertical,
  Sparkles,
  Save
} from "lucide-react";

// ==========================================
// TYPES
// ==========================================

type ColorRGB = { r: number; g: number; b: number };
type ColorHSV = { h: number; s: number; v: number };

type Experience = {
  id: string;
  key: string;
  label: string;
  description: string | null;
  icon: string; // emoji or text
  color: string;
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  iconColor: string;
  iconBackgroundColor: string;
  isActive: boolean;
  sortOrder: number;
  categoryId?: string;
};

type Category = {
  id: string;
  title: string;
  description: string;
  icon: File | null;
  iconPreview: string;
  color: string;
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  iconColor: string;
  iconBackgroundColor: string;
  isActive: boolean;
  sortOrder: number;
  experiences: Experience[];
};

// ==========================================
// COLOR UTILITIES
// ==========================================

const hexToRgb = (hex: string): ColorRGB => {
  let r = 0, g = 0, b = 0;
  if (hex.length === 4) {
    r = parseInt("0x" + hex[1] + hex[1]);
    g = parseInt("0x" + hex[2] + hex[2]);
    b = parseInt("0x" + hex[3] + hex[3]);
  } else if (hex.length === 7) {
    r = parseInt("0x" + hex[1] + hex[2]);
    g = parseInt("0x" + hex[3] + hex[4]);
    b = parseInt("0x" + hex[5] + hex[6]);
  }
  return { r, g, b };
};

const rgbToHex = (r: number, g: number, b: number): string => {
  const toHex = (c: number) => {
    const hex = Math.round(c).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  return "#" + toHex(r) + toHex(g) + toHex(b);
};

const rgbToHsv = (r: number, g: number, b: number): ColorHSV => {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  const s = max === 0 ? 0 : d / max;
  const v = max;
  if (d !== 0) {
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return { h: h * 360, s: s * 100, v: v * 100 };
};

const hsvToRgb = (h: number, s: number, v: number): ColorRGB => {
  s /= 100; v /= 100;
  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;
  let r = 0, g = 0, b = 0;
  if (h >= 0 && h < 60) { r = c; g = x; b = 0; }
  else if (h >= 60 && h < 120) { r = x; g = c; b = 0; }
  else if (h >= 120 && h < 180) { r = 0; g = c; b = x; }
  else if (h >= 180 && h < 240) { r = 0; g = x; b = c; }
  else if (h >= 240 && h < 300) { r = x; g = 0; b = c; }
  else { r = c; g = 0; b = x; }
  return { r: (r + m) * 255, g: (g + m) * 255, b: (b + m) * 255 };
};

// ==========================================
// COLOR PICKER COMPONENT
// ==========================================

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  onClose: () => void;
}

const ColorPickerPopup: React.FC<ColorPickerProps> = ({ color, onChange, onClose }) => {
  const [hsv, setHsv] = useState(() => {
    const rgb = hexToRgb(color || "#FFFFFF");
    return rgbToHsv(rgb.r, rgb.g, rgb.b);
  });

  const satRef = useRef<HTMLDivElement>(null);
  const hueRef = useRef<HTMLDivElement>(null);

  const currentHex = useMemo(() => {
    const rgb = hsvToRgb(hsv.h, hsv.s, hsv.v);
    return rgbToHex(rgb.r, rgb.g, rgb.b);
  }, [hsv]);

  const handleSaturationChange = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!satRef.current) return;
    const rect = satRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));
    
    const newHsv = { ...hsv, s: x * 100, v: (1 - y) * 100 };
    setHsv(newHsv);
    const rgb = hsvToRgb(newHsv.h, newHsv.s, newHsv.v);
    onChange(rgbToHex(rgb.r, rgb.g, rgb.b));
  }, [hsv, onChange]);

  const handleHueChange = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!hueRef.current) return;
    const rect = hueRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const newHue = x * 360;
    setHsv(prev => ({ ...prev, h: newHue }));
    const rgb = hsvToRgb(newHue, hsv.s, hsv.v);
    onChange(rgbToHex(rgb.r, rgb.g, rgb.b));
  }, [hsv.s, hsv.v, onChange]);

  const handleMouseDown = (handler: (e: any) => void) => (e: React.MouseEvent) => {
    handler(e);
    const moveHandler = (ev: MouseEvent) => handler(ev);
    const upHandler = () => {
      window.removeEventListener('mousemove', moveHandler);
      window.removeEventListener('mouseup', upHandler);
    };
    window.addEventListener('mousemove', moveHandler);
    window.addEventListener('mouseup', upHandler);
  };

  return (
    <div className="absolute z-[10000] mt-2 p-4 rounded-2xl bg-white/95 dark:bg-[#1c1c1e]/95 backdrop-blur-xl border border-gray-200/50 dark:border-white/10 shadow-2xl w-[280px] animate-in fade-in zoom-in-95 duration-200">
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Color Picker</span>
        <button type="button" onClick={onClose} className="p-1 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors">
          <X size={14} className="text-gray-500 dark:text-gray-400" />
        </button>
      </div>

      {/* Saturation Map */}
      <div 
        ref={satRef}
        className="relative w-full h-[140px] rounded-lg cursor-crosshair mb-3 overflow-hidden"
        style={{ backgroundColor: `hsl(${hsv.h}, 100%, 50%)` }}
        onMouseDown={handleMouseDown(handleSaturationChange)}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
        <div 
          className="absolute w-4 h-4 -ml-2 -mt-2 rounded-full border-2 border-white shadow-md pointer-events-none transition-transform duration-75"
          style={{ 
            left: `${hsv.s}%`, 
            top: `${100 - hsv.v}%`,
            backgroundColor: currentHex
          }}
        />
      </div>

      {/* Hue Slider */}
      <div 
        ref={hueRef}
        className="relative w-full h-3 rounded-full cursor-pointer mb-4"
        style={{ background: 'linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)' }}
        onMouseDown={handleMouseDown(handleHueChange)}
      >
        <div 
          className="absolute top-1/2 -mt-1.5 -ml-1.5 w-3 h-3 rounded-full border-2 border-white shadow-md pointer-events-none bg-white"
          style={{ left: `${(hsv.h / 360) * 100}%` }}
        />
      </div>

      {/* Hex Input & Preview */}
      <div className="flex items-center gap-3">
        <div 
          className="w-10 h-10 rounded-lg border border-gray-200 dark:border-white/10 shadow-inner shrink-0"
          style={{ backgroundColor: currentHex }}
        />
        <div className="flex-1">
          <label className="text-[10px] text-gray-400 uppercase font-bold">Hex Code</label>
          <input 
            type="text" 
            value={currentHex.toUpperCase()}
            onChange={(e) => {
              const val = e.target.value;
              if (/^#[0-9A-Fa-f]{0,6}$/.test(val)) {
                if (val.length === 7) {
                  const rgb = hexToRgb(val);
                  setHsv(rgbToHsv(rgb.r, rgb.g, rgb.b));
                  onChange(val);
                }
              }
            }}
            className="w-full bg-gray-50 dark:bg-[#2c2c2e] border border-gray-200 dark:border-white/10 rounded-lg px-3 py-1.5 text-sm font-mono text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FC8D0E]/50 transition-all"
          />
        </div>
      </div>
      
      <div className="mt-3 flex gap-2">
        {['#4ECDC4', '#E05C5C', '#3B82F6', '#9B59B6', '#C97A2A', '#4CAF50', '#FC8D0E', '#1E1E1E'].map(c => (
          <button
            key={c}
            type="button"
            onClick={() => {
              const rgb = hexToRgb(c);
              setHsv(rgbToHsv(rgb.r, rgb.g, rgb.b));
              onChange(c);
            }}
            className="w-6 h-6 rounded-full border-2 border-white/20 hover:scale-110 transition-transform shadow-sm"
            style={{ backgroundColor: c }}
          />
        ))}
      </div>
    </div>
  );
};

// ==========================================
// MAIN COMPONENT
// ==========================================

export default function CategoryEditor() {
  const [activeColorPicker, setActiveColorPicker] = useState<string | null>(null);

  // General Profile State
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState("");
  const [title, setTitle] = useState("Close Call");
  const [subTitle, setSubTitle] = useState("Safety Category");
  const [description, setDescription] = useState("Share close call experiences and near-miss incidents to improve workplace safety.");

  // Category State
  const [categories, setCategories] = useState<Category[]>([
    {
      id: "cat-1",
      title: "Close Call",
      description: "Main category for safety incidents",
      icon: null,
      iconPreview: "",
      color: "#4ECDC4",
      backgroundColor: "#1A2E2E",
      textColor: "#FFFFFF",
      borderColor: "#4ECDC4",
      iconColor: "#4ECDC4",
      iconBackgroundColor: "#2A3E3E",
      isActive: true,
      sortOrder: 1,
      experiences: [
        {
          id: "exp-1", key: "FELT_RUSHED", label: "Felt rushed", description: null, icon: "🕐",
          color: "#C97A2A", backgroundColor: "#C97A2A", textColor: "#FFFFFF", borderColor: "#C97A2A",
          iconColor: "#FFFFFF", iconBackgroundColor: "#A85A1A", isActive: true, sortOrder: 1, categoryId: "cat-1"
        },
        {
          id: "exp-2", key: "DISTRACTED", label: "Distracted", description: null, icon: "🚫",
          color: "#E05C5C", backgroundColor: "#1E1E1E", textColor: "#E05C5C", borderColor: "#2A1A1A",
          iconColor: "#E05C5C", iconBackgroundColor: "#2A1A1A", isActive: true, sortOrder: 2, categoryId: "cat-1"
        }
      ]
    }
  ]);

  // Close color picker on outside click
  useEffect(() => {
    const handleClickOutside = () => setActiveColorPicker(null);
    if (activeColorPicker) {
      setTimeout(() => window.addEventListener('click', handleClickOutside), 0);
    }
    return () => window.removeEventListener('click', handleClickOutside);
  }, [activeColorPicker]);

  // Handlers
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhoto(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const addCategory = () => {
    setCategories(prev => [...prev, {
      id: `cat-${Date.now()}`,
      title: "New Category",
      description: "Description for this category",
      icon: null,
      iconPreview: "",
      color: "#FC8D0E",
      backgroundColor: "#1E1E1E",
      textColor: "#FFFFFF",
      borderColor: "#FC8D0E",
      iconColor: "#FC8D0E",
      iconBackgroundColor: "#2A1A0A",
      isActive: true,
      sortOrder: prev.length + 1,
      experiences: []
    }]);
  };

  const removeCategory = (id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id));
  };

  const updateCategory = (id: string, field: keyof Category, value: any) => {
    setCategories(prev => prev.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const addExperience = (catId: string) => {
    setCategories(prev => prev.map(c => {
      if (c.id !== catId) return c;
      return {
        ...c,
        experiences: [...c.experiences, {
          id: `exp-${Date.now()}`,
          key: `EXP_${c.experiences.length + 1}`,
          label: "New Experience",
          description: null,
          icon: "✨",
          color: c.color,
          backgroundColor: c.backgroundColor,
          textColor: c.textColor,
          borderColor: c.borderColor,
          iconColor: c.iconColor,
          iconBackgroundColor: c.iconBackgroundColor,
          isActive: true,
          sortOrder: c.experiences.length + 1,
          categoryId: catId
        }]
      };
    }));
  };

  const removeExperience = (catId: string, expId: string) => {
    setCategories(prev => prev.map(c => {
      if (c.id !== catId) return c;
      return { ...c, experiences: c.experiences.filter(e => e.id !== expId) };
    }));
  };

  const updateExperience = (catId: string, expId: string, field: keyof Experience, value: any) => {
    setCategories(prev => prev.map(c => {
      if (c.id !== catId) return c;
      return {
        ...c,
        experiences: c.experiences.map(e => e.id === expId ? { ...e, [field]: value } : e)
      };
    }));
  };

  const handleSave = () => {
    console.log("Saving Data:", { photo, title, subTitle, description, categories });
  };

  // Helper for Color Field
  const ColorField = ({ label, value, onChange, id }: { label: string, value: string, onChange: (val: string) => void, id: string }) => (
    <div className="relative">
      <label className="block text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">{label}</label>
      <div className="relative group">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setActiveColorPicker(activeColorPicker === id ? null : id);
          }}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/50 dark:bg-white/5 border border-gray-200/60 dark:border-white/10 hover:border-[#FC8D0E]/50 transition-all duration-200 group-hover:shadow-md"
        >
          <div 
            className="w-5 h-5 rounded-md shadow-sm border border-black/5 dark:border-white/10 shrink-0"
            style={{ backgroundColor: value || "#FFFFFF" }}
          />
          <span className="text-xs font-mono text-gray-700 dark:text-gray-300 flex-1 text-left truncate">{(value || "#FFFFFF").toUpperCase()}</span>
          <Palette size={14} className="text-gray-400 group-hover:text-[#FC8D0E] transition-colors shrink-0" />
        </button>
        {activeColorPicker === id && (
          <div onClick={(e) => e.stopPropagation()}>
            <ColorPickerPopup color={value} onChange={onChange} onClose={() => setActiveColorPicker(null)} />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-transparent text-gray-900 dark:text-white transition-colors duration-300">
      
      {/* Background Blur Accents */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full blur-[120px] bg-[#FC8D0E]/10 dark:bg-[#FC8D0E]/5 transition-colors" />
        <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] rounded-full blur-[100px] bg-blue-400/10 dark:bg-blue-500/5 transition-colors" />
      </div>

      <div className="relative max-w-full mx-auto p-4 md:p-8 lg:p-12">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FC8D0E] to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/20 shrink-0">
              <Sparkles className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
                Category Editor
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Manage main categories and associated experiences
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={addCategory}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/70 dark:bg-white/5 border border-gray-200/60 dark:border-white/10 hover:bg-white dark:hover:bg-white/10 transition-all text-sm font-semibold"
            >
              <Plus size={16} />
              <span>Add Category</span>
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FC8D0E] to-orange-600 text-white font-medium shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 text-sm"
            >
              <Save size={18} />
              <span>Save Changes</span>
            </button>
          </div>
        </header>

        {/* Profile Card */}
        <section className="mb-8">
          <div className="backdrop-blur-xl bg-white/70 dark:bg-[#151518]/60 border border-white/40 dark:border-white/5 rounded-3xl p-6 md:p-8 shadow-xl shadow-black/5 dark:shadow-black/20">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-8 w-1 rounded-full bg-[#FC8D0E]" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">General Information</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8">
              {/* Photo Upload */}
              <div className="flex flex-col items-center lg:items-start">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 w-full">Category Icon</label>
                <label
                  htmlFor="profile-photo"
                  className="group relative w-full aspect-square max-w-[240px] rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-600 bg-gray-50/50 dark:bg-[#1c1c1e]/50 cursor-pointer overflow-hidden transition-all duration-300 hover:border-[#FC8D0E] hover:bg-orange-50/30 dark:hover:bg-[#FC8D0E]/5 flex items-center justify-center"
                >
                  {photoPreview ? (
                    <img src={photoPreview} alt="Preview" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  ) : (
                    <div className="flex flex-col items-center gap-3 text-gray-400 dark:text-gray-500 group-hover:text-[#FC8D0E] transition-colors">
                      <div className="w-14 h-14 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center group-hover:bg-orange-100 dark:group-hover:bg-[#FC8D0E]/10 transition-colors">
                        <Upload size={24} />
                      </div>
                      <span className="text-sm font-medium">Upload Icon</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 dark:group-hover:bg-black/20 transition-colors duration-300" />
                </label>
                <input id="profile-photo" type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
              </div>

              {/* Form Fields */}
              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title</label>
                    <input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Close Call"
                      className="w-full h-12 px-4 rounded-xl bg-white/80 dark:bg-[#1c1c1e]/80 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FC8D0E]/50 focus:border-transparent transition-all shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Label</label>
                    <input
                      value={subTitle}
                      onChange={(e) => setSubTitle(e.target.value)}
                      placeholder="e.g. Safety Category"
                      className="w-full h-12 px-4 rounded-xl bg-white/80 dark:bg-[#1c1c1e]/80 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FC8D0E]/50 focus:border-transparent transition-all shadow-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the purpose of this category..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-white/80 dark:bg-[#1c1c1e]/80 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FC8D0E]/50 focus:border-transparent transition-all resize-none shadow-sm"
                  />
                </div>
              </div>
            </div>
            {/* Category Colors */}
             {categories.map((category) => (
                  <div className="mt-8" key={category.id}>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Category Styling & Colors</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                      <ColorField id={`${category.id}-main-color`} label="Main Color" value={category.color} onChange={(v) => updateCategory(category.id, 'color', v)} />
                      <ColorField id={`${category.id}-bg-color`} label="Bg Color" value={category.backgroundColor} onChange={(v) => updateCategory(category.id, 'backgroundColor', v)} />
                      <ColorField id={`${category.id}-text-color`} label="Text Color" value={category.textColor} onChange={(v) => updateCategory(category.id, 'textColor', v)} />
                      <ColorField id={`${category.id}-border-color`} label="Border Color" value={category.borderColor} onChange={(v) => updateCategory(category.id, 'borderColor', v)} />
                      <ColorField id={`${category.id}-icon-color`} label="Icon Color" value={category.iconColor} onChange={(v) => updateCategory(category.id, 'iconColor', v)} />
                      <ColorField id={`${category.id}-icon-bg`} label="Icon Bg" value={category.iconBackgroundColor} onChange={(v) => updateCategory(category.id, 'iconBackgroundColor', v)} />
                    </div>
                  </div>
             ))}
          </div>
        </section>

        {/* Main Categories Section */}
        <section className="space-y-8">
          <div className="grid grid-cols-1 gap-8">
            {categories.map((category) => (
              <div 
                key={category.id}
                className="group backdrop-blur-xl bg-white/60 dark:bg-[#151518]/40 border border-white/30 dark:border-white/5 rounded-3xl shadow-lg shadow-black/5 dark:shadow-black/10 hover:shadow-xl transition-all duration-300"
              >

                {/* Experiences List */}
                <div className="bg-gray-50/30 dark:bg-black/20 p-6 md:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                      <GripVertical size={16} className="text-gray-400" />
                      Experiences
                      <span className="px-2 py-0.5 rounded-full bg-gray-200 dark:bg-white/10 text-gray-600 dark:text-gray-400 text-[10px] font-bold">{category.experiences.length}</span>
                    </h3>
                    <button
                      type="button"
                      onClick={() => addExperience(category.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FC8D0E]/10 text-[#FC8D0E] hover:bg-[#FC8D0E] hover:text-white transition-all text-xs font-bold"
                    >
                      <Plus size={14} />
                      Add Experience
                    </button>
                  </div>

                  <div className="space-y-3">
                    {category.experiences.map((exp) => (
                      <div 
                        key={exp.id}
                        className="flex flex-col md:flex-row gap-4 p-4 rounded-2xl bg-white/80 dark:bg-[#1c1c1e]/60 border border-gray-100 dark:border-white/5 hover:border-[#FC8D0E]/30 hover:shadow-md transition-all duration-200 group/exp"
                      >
                        {/* Drag Handle */}
                        <div className="hidden md:flex items-center text-gray-300 dark:text-gray-600 cursor-grab active:cursor-grabbing">
                          <GripVertical size={18} />
                        </div>

                        {/* Icon Input */}
                        <div className="shrink-0">
                          <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Icon</label>
                          <input
                            value={exp.icon}
                            onChange={(e) => updateExperience(category.id, exp.id, 'icon', e.target.value)}
                            className="w-14 h-14 text-2xl text-center rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-[#FC8D0E]/50 transition-all"
                            maxLength={2}
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Label</label>
                            <input
                              value={exp.label}
                              onChange={(e) => updateExperience(category.id, exp.id, 'label', e.target.value)}
                              className="w-full h-10 px-3 rounded-lg bg-white dark:bg-[#2c2c2e] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#FC8D0E]/50 transition-all"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Key</label>
                            <input
                              value={exp.key}
                              onChange={(e) => updateExperience(category.id, exp.id, 'key', e.target.value)}
                              className="w-full h-10 px-3 rounded-lg bg-white dark:bg-[#2c2c2e] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#FC8D0E]/50 transition-all"
                            />
                          </div>
                          
                          {/* Experience Colors */}
                          <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-3">
                            <ColorField id={`${exp.id}-color`} label="Color" value={exp.color} onChange={(v) => updateExperience(category.id, exp.id, 'color', v)} />
                            <ColorField id={`${exp.id}-bg`} label="Bg Color" value={exp.backgroundColor} onChange={(v) => updateExperience(category.id, exp.id, 'backgroundColor', v)} />
                            <ColorField id={`${exp.id}-text`} label="Text Color" value={exp.textColor} onChange={(v) => updateExperience(category.id, exp.id, 'textColor', v)} />
                          </div>
                        </div>

                        {/* Delete Button */}
                        <div className="shrink-0 flex md:items-start justify-end">
                          <button
                            type="button"
                            onClick={() => removeExperience(category.id, exp.id)}
                            className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all"
                            title="Remove Experience"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                    
                    {category.experiences.length === 0 && (
                      <div className="text-center py-8 text-gray-400 dark:text-gray-600 border-2 border-dashed border-gray-200 dark:border-white/5 rounded-2xl">
                        <p className="text-sm">No experiences added yet</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer Spacer */}
        <div className="h-20" />
      </div>
    </div>
  );
}