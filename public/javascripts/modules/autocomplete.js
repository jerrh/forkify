function autocomplete(input, latInput, lngInput) {
  // Skips function from running if no input on page
  if(!input) return;
  const dropdown = new google.maps.places.Autocomplete(input);

  dropdown.addListener('place_changed', () => {
    const place = dropdown.getplace();
    latInput.value = place.geometry.location.lat();
    lngInput.value = place.geometry.location.lng();  
  });

  // If user hits enter on address field, don't submit form
  input.on('keydown', (e) => {
    if (e.keyCode === 13) e.preventDefault();
  });
}

export default autocomplete;