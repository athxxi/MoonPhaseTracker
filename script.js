// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Moon phase images mapping
    const moonPhaseImages = {
        'New Moon': 'assets/new-moon.webp',
        'Waxing Crescent': 'assets/waxing-crescent.webp',
        'First Quarter': 'assets/first-quarter.webp',
        'Waxing Gibbous': 'assets/waxing-gibbous.webp',
        'Full Moon': 'assets/full-moon.webp',
        'Waning Gibbous': 'assets/waning-gibbous.webp',
        'Last Quarter': 'assets/last-quarter.webp',
        'Waning Crescent': 'assets/waning-crescent.webp'
    };

    // DOM elements
    const currentMoonImg = document.getElementById('currentMoonImg');
    const currentPhaseName = document.getElementById('currentPhaseName');
    const currentDateEl = document.getElementById('currentDate');
    const moonGridEl = document.getElementById('moonGrid');

    // Today's date
    const today = new Date();
    const formattedDate = formatDate(today);
    currentDateEl.textContent = formattedDate;

    // Get today's moon phase
    const todayPhase = getMoonPhase(today);
    const todayPhaseName = getPhaseName(todayPhase);

    // Display today's moon phase
    displayMoonPhase(currentMoonImg, todayPhaseName);
    currentPhaseName.textContent = todayPhaseName;

    // Generate next 7 days
    generateNext7Days();

    // Function to generate next 7 days
    function generateNext7Days() {
        moonGridEl.innerHTML = '';
        
        for (let i = 1; i <= 7; i++) {
            const nextDate = new Date();
            nextDate.setDate(today.getDate() + i);
            
            const phase = getMoonPhase(nextDate);
            const phaseName = getPhaseName(phase);
            const dateStr = formatDate(nextDate);
            
            const moonDayEl = document.createElement('div');
            moonDayEl.className = 'moon-day';
            
            moonDayEl.innerHTML = `
                <div class="moon-date">${dateStr}</div>
                <div class="moon-icon">
                    <img src="${moonPhaseImages[phaseName]}" alt="${phaseName}">
                </div>
                <div class="moon-phase">${phaseName}</div>
            `;
            
            moonGridEl.appendChild(moonDayEl);
        }
    }
    
    // Function to display moon phase with appropriate image
    function displayMoonPhase(element, phaseName) {
        element.src = moonPhaseImages[phaseName];
        element.alt = phaseName;
    }
    
    // Fallback moon phase calculation
    function getMoonPhase(date = new Date()) {
        // This is a simplified approximation
        const knownNewMoon = new Date('2023-11-13'); // A known new moon date
        const lunarCycle = 29.53; // days in lunar cycle
        
        const diffTime = Math.abs(date - knownNewMoon);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        const phase = (diffDays % lunarCycle) / lunarCycle;
        
        return phase;
    }
    
    function getPhaseName(phase) {
        // Convert phase value (0-1) to phase name
        if (phase < 0.03 || phase >= 0.97) return "New Moon";
        if (phase < 0.22) return "Waxing Crescent";
        if (phase < 0.28) return "First Quarter";
        if (phase < 0.47) return "Waxing Gibbous";
        if (phase < 0.53) return "Full Moon";
        if (phase < 0.72) return "Waning Gibbous";
        if (phase < 0.78) return "Last Quarter";
        return "Waning Crescent";
    }
    
    // Helper function to format date as "Day, Month Date, Year"
    function formatDate(date) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }
});