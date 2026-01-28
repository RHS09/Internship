
export const calculateSlotPrice = (basePrice: number, hour: number): number => {
  // Night surge: 6 PM (18) to Midnight (24) -> 30% hike
  if (hour >= 18 || hour < 5) {
    return Math.round(basePrice * 1.3);
  }
  // Peak early morning: 5 AM to 8 AM -> 20% hike
  if (hour >= 5 && hour < 8) {
    return Math.round(basePrice * 1.2);
  }
  return basePrice;
};

/**
 * Calculates price for a custom time range (e.g., 11:15 to 12:30)
 * Handles proportional surge pricing for matches that cross price boundaries.
 */
export const calculateRangePrice = (basePrice: number, startStr: string, endStr: string): number => {
  const parseTime = (str: string) => {
    const [h, m] = str.split(':').map(Number);
    return h * 60 + m;
  };

  const start = parseTime(startStr);
  const end = parseTime(endStr);
  
  if (end <= start) return 0;

  const durationMinutes = end - start;
  let totalPrice = 0;

  // Iterate minute by minute to calculate exact price (efficient enough for match durations)
  for (let m = start; m < end; m++) {
    const currentHour = Math.floor(m / 60) % 24;
    let minuteRate = basePrice / 60;

    if (currentHour >= 18 || currentHour < 5) {
      minuteRate *= 1.3;
    } else if (currentHour >= 5 && currentHour < 8) {
      minuteRate *= 1.2;
    }

    totalPrice += minuteRate;
  }

  return Math.round(totalPrice);
};

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(price);
};

export const getHourLabel = (hour: number) => {
  const period = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  return `${displayHour}:00 ${period}`;
};

export const formatTimeDisplay = (timeStr: string) => {
  if (!timeStr) return '';
  const [h, m] = timeStr.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const displayHour = h % 12 || 12;
  const displayMin = m.toString().padStart(2, '0');
  return `${displayHour}:${displayMin} ${period}`;
};
