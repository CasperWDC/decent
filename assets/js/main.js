$(document).ready(function() {
    const apiURL = 'https://restcountries.com/v3.1/all';
    let countries = [];
    let currentIndex = 0;
    const countriesPerPage = 20;
    let isLoading = false;

    // Fetch all countries
    $.ajax({
        url: apiURL,
        method: 'GET',
        success: function(data) {
            countries = data;
            displayCountries();
        },
        error: function() {
            $('#countryList').html('<p class="text-danger">Failed to load data. Please try again later.</p>');
        }
    });

    // Function to display countries
    function displayCountries() {
        isLoading = true;
        const countryList = $('#countryList');
        for (let i = currentIndex; i < currentIndex + countriesPerPage && i < countries.length; i++) {
            const country = countries[i];
            const countryItem = `
                <div class="col-sm-12 col-md-4 mb-4 col-lg-2">
                    <div class="card">
                        <img src="${country.flags.png}" class="card-img-top" alt="Flag of ${country.name.common}">
                        <div class="card-body">
                            <h5 class="card-title">${country.name.common}</h5>
                            <a class="btn btn-primary" href="/country.html?countryName=${country.name.common}">Details</a>
                        </div>
                    </div>
                </div>
            `;
            countryList.append(countryItem);
        }
        currentIndex += countriesPerPage;
        isLoading = false;
        $('#loading').hide();
    }

    // Infinite scroll
    $(window).scroll(function() {
        if (!isLoading && $(window).scrollTop() + $(window).height() >= $(document).height() - 100) {
            if (currentIndex < countries.length) {
                $('#loading').show();
                setTimeout(displayCountries, 500);
            }
        }
    });
});