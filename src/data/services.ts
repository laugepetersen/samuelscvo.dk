/** Services & prices (Ydelser page). */

export type Service = {
  name: string;
  description: string;
  /** Not bookable online — shows an "in-store only" badge instead of the arrow. */
  inStoreOnly?: boolean;
};

export const services: Service[] = [
  { name: "Combo Classic", description: "30 min klip + skæg. Fra 300 kr." },
  { name: "Combo Extended", description: "45 min klip + skæg. Fra 400 kr." },
  { name: "Haircut", description: "30 min klipning. Fra 200 kr." },
  { name: "Long Haircut", description: "45 min klipning. Fra 300 kr." },
  { name: "Skæg", description: "15 min. 100 kr." },
  { name: "Braids", description: "15 min. 100 kr." },
  { name: "Fresh-up", description: "15 min. 150 kr.", inStoreOnly: true },
];
