import { create } from "zustand";
import { AgendaService } from "@/services/agenda.service";
import { toast } from "@/lib/toast";

import type {
  AgendaEvent,
  AgendaApiEvent,
  AgendaPayload,
  AgendaUser,
} from "@/types/agenda.types";
import { getCategoryColor } from "@/types/agenda.types";

interface AgendaStore {
  loading: boolean;
  saving: boolean;
  deleting: boolean;
  events: AgendaEvent[];
  users: AgendaUser[];
  selectedEvent: AgendaEvent | null;
  fetchEvents: () => Promise<void>;
  fetchEvent: (id: number | string) => Promise<AgendaEvent | null>;
  createEvent: (data: AgendaPayload) => Promise<boolean>;
  updateEvent: (id: number | string, data: AgendaPayload) => Promise<boolean>;
  deleteEvent: (id: number | string) => Promise<boolean>;
  searchUsers: (keyword: string) => Promise<void>;
  setSelectedEvent: (event: AgendaEvent | null) => void;
  clearUsers: () => void;
}

const mapApiEventToUI = (apiEvent: AgendaApiEvent): AgendaEvent => {
  return {
    id: String(apiEvent.id),
    title: apiEvent.title,
    description: apiEvent.description,
    start: new Date(`${apiEvent.start_date}T${apiEvent.start_time}`),
    end: new Date(`${apiEvent.end_date}T${apiEvent.end_time}`),
    color: getCategoryColor(apiEvent.category),
    category: apiEvent.category,
    location: apiEvent.location,

    members: apiEvent.members
      ? apiEvent.members.map((member) => ({
        id: member.id,
        name: member.name,
        email: member.email,
      }))
      : [],
  };
};

export const useAgendaStore = create<AgendaStore>((set, get) => ({
  loading: false,
  saving: false,
  deleting: false,

  events: [],
  users: [],
  selectedEvent: null,

  setSelectedEvent: (event) => set({ selectedEvent: event }),

  clearUsers: () => set({ users: [] }),

  fetchEvents: async () => {
    set({ loading: true });
    try {
      const response = await AgendaService.getAll();
      if (response.data.success) {
        set({ events: response.data.data.map(mapApiEventToUI) });
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message ?? "Unable to fetch events.");
    } finally {
      set({ loading: false });
    }
  },

  fetchEvent: async (id) => {
    set({ loading: true });
    try {
      const response = await AgendaService.getById(id);
      if (response.data.success) {
        const event = mapApiEventToUI(response.data.data);
        set({ selectedEvent: event });
        return event;
      }
      return null;
    } catch (error: any) {
      toast.error(error.response?.data?.message ?? "Unable to fetch event.");
      return null;
    } finally {
      set({ loading: false });
    }
  },

  createEvent: async (payload) => {
    set({ saving: true });
    try {
      const response = await AgendaService.create(payload);
      if (response.data.success) {
        set((state) => ({
          events: [...state.events, mapApiEventToUI(response.data.data)],
        }));
        toast.success("Event created successfully.");
        return true;
      }
      toast.error(response.data.message || "Failed to create event.");
      return false;
    } catch (error: any) {
      toast.error(error.response?.data?.message ?? "Unable to create event.");
      return false;
    } finally {
      set({ saving: false });
    }
  },

  updateEvent: async (id, payload) => {
    set({ saving: true });
    try {
      const response = await AgendaService.update(id, payload);
      if (response.data.success) {
        set((state) => ({
          events: state.events.map((event) =>
            event.id === String(id) ? mapApiEventToUI(response.data.data) : event
          ),
        }));
        toast.success("Event updated successfully.");
        return true;
      }
      toast.error(response.data.message || "Failed to update event.");
      return false;
    } catch (error: any) {
      toast.error(error.response?.data?.message ?? "Unable to update event.");
      return false;
    } finally {
      set({ saving: false });
    }
  },

  deleteEvent: async (id) => {
    set({ deleting: true });
    try {
      const response = await AgendaService.delete(id);
      if (response.data.success !== false) {
        set((state) => ({
          events: state.events.filter((event) => event.id !== String(id)),
        }));
        toast.success("Event deleted successfully.");
        return true;
      }
      return false;
    } catch (error: any) {
      toast.error(error.response?.data?.message ?? "Unable to delete event.");
      return false;
    } finally {
      set({ deleting: false });
    }
  },

  searchUsers: async (keyword) => {
    if (!keyword.trim()) {
      set({ users: [] });
      return;
    }
    try {
      const response = await AgendaService.searchUsers(keyword);
      if (response.data.success) {
        set({ users: response.data.data });
      }
    } catch (error: any) {
      console.error(error);
      set({ users: [] });
    }
  },
}));