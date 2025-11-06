// LocalStorage işlemleri için yardımcı fonksiyonlar

const Storage = {
    // Şehirleri localStorage'dan al
    getCities: function() {
        const cities = localStorage.getItem('travelCities');
        return cities ? JSON.parse(cities) : [];
    },

    // Şehirleri localStorage'a kaydet
    saveCities: function(cities) {
        localStorage.setItem('travelCities', JSON.stringify(cities));
    },

    // Şehir güncelle
    updateCity: function(updatedCity) {
        const cities = this.getCities();
        const index = cities.findIndex(city => city.id === updatedCity.id);
        if (index !== -1) {
            cities[index] = updatedCity;
            this.saveCities(cities);
            return true;
        }
        return false;
    },

    // ID'ye göre şehir bul
    getCityById: function(cityId) {
        const cities = this.getCities();
        return cities.find(city => city.id === cityId);
    },

    // Favori şehirleri getir
    getFavoriteCities: function() {
        const cities = this.getCities();
        return cities.filter(city => city.favorite);
    },

    // Ziyaret edilen şehirleri getir
    getVisitedCities: function() {
        const cities = this.getCities();
        return cities.filter(city => city.visited);
    }
};