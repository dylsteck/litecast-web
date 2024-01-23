// source: https://gist.github.com/mko4444/90d5bcf9da58bd856ab280853ff144f3
/**
 * Returns a relative time string for UI like in the Warpcast client.
 * Works for both past and future dates.
 
 * @param {number|string} ms - timestamp in milliseconds
 * @returns {string} - relative time string
 */
export function getRelativeTime(ms: number | string) {
    const t = new Date(ms).getTime();
    const now = new Date().getTime();
  
    // Calculate the absolute difference in milliseconds
    const diffInMs = Math.abs(now - t);
  
    // Convert milliseconds to time units
    const minutes = Math.floor(diffInMs / 60000);
    const hours = Math.floor(diffInMs / 3600000);
    const days = Math.floor(diffInMs / (3600000 * 24));
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);
  
    // Generate the relative time string based on the difference
    if (years > 0) return `${years}y`;
    if (months > 0 && months < 12) return `${months}mo`;
    if (weeks > 0 && weeks < 4) return `${weeks}w`;
    if (days > 0 && days < 7) return `${days}d`;
    if (hours > 0 && hours < 24) return `${hours}h`;
    if (minutes > 0 && minutes < 60) return `${minutes}m`;
  
    return "Now";
  }