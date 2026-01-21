// Load first 50 listings via fetch/await
(async () => {
  const spinner = document.getElementById('spinner');
  const listingsRow = document.getElementById('listings');

  try {
    const res = await fetch('./airbnb_sf_listings_500.json');
    if (!res.ok) throw new Error('Network response was not ok');
    const data = await res.json();

    const first50 = data.slice(0, 50);

    listingsRow.innerHTML = first50.map(listing => `
      <div class="col-12 col-md-6 col-lg-4">
        <div class="listing card h-100">
          <img src="${listing.picture_url}" class="card-img-top" alt="${listing.name}" />
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${listing.name}</h5>
            <p class="card-text flex-grow-1">${listing.description.substring(0, 120)}…</p>
            <ul class="list-unstyled small mb-2">
              <li><strong>Price:</strong> ${listing.price}</li>
              <li><strong>Host:</strong> ${listing.host_name}</li>
              <li><strong>Amenities:</strong> ${JSON.parse(listing.amenities || '[]').slice(0,3).join(', ')}…</li>
            </ul>
            <a href="${listing.listing_url}" target="_blank" class="btn btn-primary mt-auto">View on Airbnb</a>
          </div>
        </div>
      </div>
    `).join('');

  } catch (err) {
    console.error(err);
    listingsRow.innerHTML = `<div class="alert alert-danger">Could not load listings.</div>`;
  } finally {
    spinner.remove();
  }
})();