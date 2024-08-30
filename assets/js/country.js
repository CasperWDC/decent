$(document).ready(function() {
    const countryName = getQueryParam('countryName'); // Get the countryName parameter from the URL

    if (!countryName) {
        alert('Country name is missing in the URL.');
        return;
    }

    $.ajax({
        url: `https://restcountries.com/v3.1/name/${countryName}`,
        method: 'GET',
        success: function(data) {
            const country = data[0];
            $('#countryName').text(country.name.common);
            $('#countryCapital').text(country.capital ? country.capital[0] : 'N/A');
            $('#countryFlag').attr('src', country.flags.png);
        },
        error: function() {
            alert('Failed to load country details. Please try again later.');
        }
    });
});

// Utility function to get query parameters
function getQueryParam(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
}


