export const Utils =  {
	getPriorityColor(percent) {
	    // Clamp between 0 and 100
		const p = Math.min(100, Math.max(0, percent));
	    
	    // Red (high importance) = 0, Green (low importance) = 120
	    const hue = 120 - (p / 100) * 120;
	    
	    return `hsl(${hue}, 100%, 50%)`;
	}
}
