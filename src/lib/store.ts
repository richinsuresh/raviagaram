/**
 * LOCAL STORAGE KEYS
 */
const STORAGE_KEY = 'ravi_sir_events_v1';

/**
 * FETCH ALL EVENTS
 * Safely gets data from browser storage
 */
export const getLocalEvents = () => {
  // Prevent errors during Next.js Server Side Rendering (SSR)
  if (typeof window === 'undefined') return [];
  
  const savedData = localStorage.getItem(STORAGE_KEY);
  return savedData ? JSON.parse(savedData) : [];
};

/**
 * SAVE OR UPDATE EVENT
 * Handles both creating new events and updating existing ones
 */
export const saveEventToLocal = (eventData: any) => {
  if (typeof window === 'undefined') return;

  const existingEvents = getLocalEvents();
  
  // Check if we are updating an existing event or adding a new one
  const index = existingEvents.findIndex((e: any) => e.id === eventData.id);
  
  let updatedEvents;
  if (index !== -1) {
    // Update existing
    updatedEvents = [...existingEvents];
    updatedEvents[index] = eventData;
  } else {
    // Add new to the top
    updatedEvents = [eventData, ...existingEvents];
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedEvents));
};

/**
 * DELETE EVENT
 * Removes a specific event by ID
 */
export const deleteEventFromLocal = (id: string) => {
  if (typeof window === 'undefined') return;

  const existingEvents = getLocalEvents();
  const filteredEvents = existingEvents.filter((event: any) => event.id !== id);
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredEvents));
};