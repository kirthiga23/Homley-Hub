// All 28 districts
const districts = [
  "Ariyalur","Chennai","Coimbatore","Cuddalore","Dharmapuri","Dindigul","Erode",
  "Kanchipuram","Kanyakumari","Karur","Krishnagiri","Madurai","Nagapattinam","Namakkal",
  "Perambalur","Pudukkottai","Ramanathapuram","Salem","Sivaganga","Thanjavur","Theni",
  "Thoothukudi","Tiruchirappalli","Tirunelveli","Tirupur","Tiruvallur","Tiruvarur","Vellore"
];

// Populate districts in dropdown
const locationSelect = document.getElementById("location");
districts.forEach(d => {
    const option = document.createElement("option");
    option.value = d;
    option.textContent = d;
    locationSelect.appendChild(option);
});

// Hotels array: one hotel per district, with dynamic image
const hotels = districts.map(district => ({
    name: `${district} Comfort Stay`,
    location: district,
    price: Math.floor(Math.random() * 2000) + 1000, // Random price 1000-3000
    image: `https://source.unsplash.com/250x150/?hotel,${district.replace(/\s+/g,'-')}`,
    mapLink: `https://www.google.com/maps/search/${encodeURIComponent(district + ' hotel')}`
}));

const form = document.getElementById('bookingForm');
const hotelsContainer = document.getElementById('hotelsContainer');

form.addEventListener('submit', function(e){
    e.preventDefault();

    const name = document.getElementById('name').value;
    const location = document.getElementById('location').value;
    const members = document.getElementById('members').value;
    const budget = document.getElementById('budget').value;
    const days = document.getElementById('days').value;

    const filteredHotels = hotels.filter(h => 
        h.location.toLowerCase() === location.toLowerCase() && h.price <= budget
    );

    hotelsContainer.innerHTML = '';

    if(filteredHotels.length > 0){
        filteredHotels.forEach(h => {
            const hotelCard = document.createElement('div');
            hotelCard.classList.add('hotel-card');

            hotelCard.innerHTML = `
                <img src="${h.image}" alt="${h.name}">
                <div class="hotel-info">
                    <h3>${h.name}</h3>
                    <p>Location: ${h.location}</p>
                    <p>Price: ₹${h.price} per night</p>
                    <p>Total for ${days} day(s): ₹${h.price * days}</p>
                    <a href="${h.mapLink}" target="_blank">View on Map</a>
                </div>
            `;
            hotelsContainer.appendChild(hotelCard);
        });
    } else {
        hotelsContainer.innerHTML = "<p>No hotels found for your criteria.</p>";
    }
});
