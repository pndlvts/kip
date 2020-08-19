let countries = document.querySelectorAll('.locations__country-link');
countries.forEach(e => {
    e.addEventListener('click', function() {
        document.querySelectorAll(".locations__cities").forEach(el => {
            if(e.dataset.country != el.dataset.cities) el.classList.remove('locations__cities_active');
        });
        document.querySelectorAll(".locations__country-link").forEach(el => {
            if(e.dataset.country != el.dataset.country) el.classList.remove('locations__country-link_active');
        });
        let list = document.querySelector('ul[data-cities="' + e.dataset.country + '"]');
        list.classList.toggle('locations__cities_active');
        e.classList.toggle('locations__country-link_active');
    })
})
