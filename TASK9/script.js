// --- 1. Mock API Service ---
// Simulating a backend with delays
const api = {
    // API 1: Determines user's location
    getUserRegion: () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const regions = ['Europe', 'Asia', 'Caribbean'];
                const randomRegion = regions[Math.floor(Math.random() * regions.length)];
                console.log(`API 1 Fetched: User is in ${randomRegion}`);
                resolve(randomRegion);
            }, 1000); // 1 second delay
        });
    },

    // API 2: Gets deals based on that location
    getDestinations: (region) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Mock Database
                const db = {
                    'Europe': [
                        { city: 'Paris', country: 'France', price: 1200, img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400' },
                        { city: 'Rome', country: 'Italy', price: 1100, img: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400' },
                        { city: 'Berlin', country: 'Germany', price: 950, img: 'https://imgs.search.brave.com/TT0P8zEEpsMseWJRPisClltwChOuhswBaDkY9nQFozg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9mYW1vdXMtYnJh/bmRlbmJ1cmctZ2F0/ZS1iZXJsaW4td2l0/aC10ZWxldmlzaW9u/LXRvd2VyLWRhd25f/MTA0ODk0NC0xODk4/NzUxNy5qcGc_c2Vt/dD1haXNfaHlicmlk/Jnc9NzQwJnE9ODA' }
                    ],
                    'Asia': [
                        { city: 'Tokyo', country: 'Japan', price: 1500, img: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=400' },
                        { city: 'Bangkok', country: 'Thailand', price: 800, img: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=400' },
                        { city: 'Bali', country: 'Indonesia', price: 900, img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400' }
                    ],
                    'Caribbean': [
                        { city: 'Havana', country: 'Cuba', price: 1100, img: 'https://images.unsplash.com/photo-1500759285222-a95626b934cb?w=400' },
                        { city: 'Nassau', country: 'Bahamas', price: 1300, img: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=400' },
                        { city: 'San Juan', country: 'Puerto Rico', price: 1000, img: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=400' }
                    ]
                };

                // Simulate occasional network error (10% chance)
                if (Math.random() < 0.1) {
                    reject("Network Timeout: Failed to fetch destinations.");
                } else {
                    resolve(db[region]);
                }
            }, 1500); // 1.5 second delay
        });
    }
};

// --- 2. DOM Elements ---
const grid = document.getElementById('destinations-grid');
const statusMsg = document.getElementById('status-message');
const refreshBtn = document.getElementById('refresh-btn');

// --- 3. Helper Functions ---

function showStatus(msg, type) {
    statusMsg.textContent = msg;
    statusMsg.className = `status-box ${type}`; // Apply 'loading' or 'error' class
}

function clearStatus() {
    statusMsg.className = 'status-box hidden';
}

function renderCards(destinations) {
    grid.innerHTML = ''; // Clear previous
    
    destinations.forEach(dest => {
        const card = document.createElement('div');
        card.className = 'card';
        
        card.innerHTML = `
            <img src="${dest.img}" alt="${dest.city}">
            <div class="card-content">
                <h3>${dest.city}, ${dest.country}</h3>
                <span class="price">$${dest.price}</span>
            </div>
        `;
        
        grid.appendChild(card);
    });
}

// --- 4. Main Async Logic ---

async function loadDashboard() {
    try {
        // Reset UI
        grid.innerHTML = ''; 
        showStatus('Identifying your region...', 'loading');
        refreshBtn.disabled = true;

        // Step 1: Wait for User Region
        const region = await api.getUserRegion();
        
        // Update UI between steps
        showStatus(`Region detected: ${region}. Finding deals...`, 'loading');

        // Step 2: Wait for Destinations based on Region
        // (This depends on the result of Step 1)
        const deals = await api.getDestinations(region);

        // Step 3: Success
        clearStatus();
        renderCards(deals);

    } catch (error) {
        // Handle Errors from either Step 1 or Step 2
        console.error(error);
        showStatus(`⚠ Error: ${error}`, 'error');
    } finally {
        // Always re-enable button
        refreshBtn.disabled = false;
    }
}

// --- 5. Event Listeners ---
refreshBtn.addEventListener('click', loadDashboard);

// Initial Load
document.addEventListener('DOMContentLoaded', loadDashboard);