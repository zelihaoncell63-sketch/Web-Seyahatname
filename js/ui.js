// UI işlemleri için yardımcı fonksiyonlar

const UI = {
    // Şehir kartı oluştur
    createCityCard: function(city) {
        const col = document.createElement('div');
        col.className = 'col-md-6 col-lg-4 mb-4';
        
        const ratingStars = city.rating > 0 ? 
            '<span class="rating-stars">' + '★'.repeat(city.rating) + '</span>' : 
            '<small class="text-muted">Değerlendirme yok</small>';
        
        col.innerHTML = `
            <div class="card city-card h-100" data-city-id="${city.id}">
                <div class="position-relative">
                    <img src="${city.image || 'https://via.placeholder.com/300x200?text=Resim+Yok'}" 
                         class="card-img-top" alt="${city.name}" style="height: 200px; object-fit: cover;">
                    <button class="favorite-btn" data-city-id="${city.id}">
                        <i class="bi ${city.favorite ? 'bi-heart-fill text-danger' : 'bi-heart'}"></i>
                    </button>
                    ${city.visited ? '<span class="badge bg-success visited-badge">Ziyaret Edildi</span>' : ''}
                </div>
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${city.name}</h5>
                    <p class="card-text flex-grow-1">${city.description}</p>
                    <div class="mt-auto">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>${ratingStars}</div>
                            <small class="text-muted">${city.places ? city.places.length : 0} yer, ${city.foods ? city.foods.length : 0} yemek</small>
                        </div>
                        <div class="d-grid gap-2 mt-2">
                            <button class="btn btn-outline-primary btn-sm view-detail" data-city-id="${city.id}">
                                Detayları Gör
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        return col;
    },

    // Şehir detay modalını doldur
    fillCityDetailModal: function(city) {
        document.getElementById('detailCityName').textContent = city.name;
        document.getElementById('detailCityImage').src = city.image || 'https://via.placeholder.com/500x300?text=Resim+Yok';
        document.getElementById('detailCityDescription').textContent = city.description;
        
        const visitedBadge = document.getElementById('detailCityVisited');
        if (city.visited) {
            visitedBadge.textContent = 'Ziyaret Edildi';
            visitedBadge.className = 'badge bg-success fs-6';
            document.getElementById('detailCityVisitDate').textContent = `Ziyaret Tarihi: ${this.formatDate(city.visitDate)}`;
        } else {
            visitedBadge.textContent = 'Ziyaret Edilmedi';
            visitedBadge.className = 'badge bg-secondary fs-6';
            document.getElementById('detailCityVisitDate').textContent = '';
        }
        
        const ratingBadge = document.getElementById('detailCityRating');
        if (city.rating > 0) {
            ratingBadge.textContent = `${city.rating} Yıldız`;
            ratingBadge.className = 'badge bg-warning text-dark fs-6';
        } else {
            ratingBadge.textContent = 'Değerlendirme Yok';
            ratingBadge.className = 'badge bg-secondary fs-6';
        }
        
        document.getElementById('detailCityNotes').textContent = city.notes || 'Not eklenmemiş.';
        document.getElementById('toggleVisitedBtn').setAttribute('data-city-id', city.id);
        document.getElementById('toggleFavoriteBtn').setAttribute('data-city-id', city.id);
        
        // Buton metinlerini güncelle
        document.getElementById('toggleVisitedBtn').textContent = city.visited ? 'Ziyaret Edilmedi Olarak İşaretle' : 'Ziyaret Edildi Olarak İşaretle';
        document.getElementById('toggleFavoriteBtn').innerHTML = city.favorite ? 
            '<i class="bi bi-heartbreak"></i> Favorilerden Çıkar' : 
            '<i class="bi bi-heart"></i> Favorilere Ekle';
        document.getElementById('toggleFavoriteBtn').className = city.favorite ? 
            'btn btn-danger' : 'btn btn-outline-danger';
        
        // Gezilecek yerleri doldur
        this.fillPlacesCarousel(city.places || []);
        
        // Yemekleri doldur
        this.fillFoodsGrid(city.foods || []);
    },

    // Gezilecek yerler carousel'ını doldur
    fillPlacesCarousel: function(places) {
        const container = document.getElementById('detailPlacesContainer');
        container.innerHTML = '';
        
        if (places.length === 0) {
            container.innerHTML = `
                <div class="carousel-item active">
                    <div class="text-center py-5">
                        <i class="bi bi-geo-alt display-1 text-muted"></i>
                        <h4 class="text-muted mt-3">Gezilecek yer eklenmemiş</h4>
                    </div>
                </div>
            `;
            return;
        }
        
        places.forEach((place, index) => {
            const carouselItem = document.createElement('div');
            carouselItem.className = `carousel-item ${index === 0 ? 'active' : ''}`;
            carouselItem.innerHTML = `
                <img src="${place.image || 'https://via.placeholder.com/800x400?text=Resim+Yok'}" class="d-block w-100 carousel-image" alt="${place.name}">
                <div class="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-3">
                    <h5>${place.name}</h5>
                    <p>${place.description}</p>
                    <span class="badge bg-primary category-badge">${place.category}</span>
                </div>
            `;
            container.appendChild(carouselItem);
        });
    },

    // Yemekler grid'ini doldur
    fillFoodsGrid: function(foods) {
        const container = document.getElementById('detailFoodsContainer');
        container.innerHTML = '';
        
        if (foods.length === 0) {
            container.innerHTML = `
                <div class="col-12 text-center py-4">
                    <i class="bi bi-egg-fried display-1 text-muted"></i>
                    <h4 class="text-muted mt-3">Yemek eklenmemiş</h4>
                </div>
            `;
            return;
        }
        
        foods.forEach(food => {
            const col = document.createElement('div');
            col.className = 'col-md-6 mb-3';
            col.innerHTML = `
                <div class="card food-card h-100">
                    <img src="${food.image || 'https://via.placeholder.com/300x200?text=Resim+Yok'}" class="card-img-top" alt="${food.name}" style="height: 200px; object-fit: cover;">
                    <div class="card-body">
                        <h5 class="card-title">${food.name}</h5>
                        <p class="card-text">${food.description}</p>
                        <span class="badge bg-success category-badge">${food.category}</span>
                    </div>
                </div>
            `;
            container.appendChild(col);
        });
    },

    // Şehirleri grid'e yerleştir
    displayCities: function(cities, filter = 'all') {
        const citiesGrid = document.getElementById('citiesGrid');
        citiesGrid.innerHTML = '';
        
        let filteredCities = cities;
        
        // Filtreleme
        if (filter === 'visited') {
            filteredCities = cities.filter(city => city.visited);
        } else if (filter === 'not-visited') {
            filteredCities = cities.filter(city => !city.visited);
        } else if (filter === 'favorites') {
            filteredCities = cities.filter(city => city.favorite);
        }
        
        // Arama filtresi
        const searchInput = document.getElementById('searchInput');
        const searchTerm = searchInput.value.toLowerCase();
        if (searchTerm) {
            filteredCities = filteredCities.filter(city => 
                city.name.toLowerCase().includes(searchTerm) || 
                city.description.toLowerCase().includes(searchTerm)
            );
        }
        
        if (filteredCities.length === 0) {
            citiesGrid.innerHTML = `
                <div class="col-12 text-center py-5">
                    <i class="bi bi-geo-alt-fill display-1 text-muted"></i>
                    <h3 class="mt-3 text-muted">Şehir bulunamadı</h3>
                    <p class="text-muted">Filtrelerinizi değiştirmeyi deneyin.</p>
                </div>
            `;
            return;
        }
        
        filteredCities.forEach(city => {
            const cityCard = this.createCityCard(city);
            citiesGrid.appendChild(cityCard);
        });
    },

    // Tarihi formatla
    formatDate: function(dateString) {
        if (!dateString) return 'Belirtilmemiş';
        
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('tr-TR', options);
    },

    // Alert göster
    showAlert: function(message, type) {
        // Basit bir alert gösterimi
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
        alertDiv.style.top = '20px';
        alertDiv.style.right = '20px';
        alertDiv.style.zIndex = '1055';
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        document.body.appendChild(alertDiv);
        
        // 3 saniye sonra alert'i kaldır
        setTimeout(() => {
            if (alertDiv.parentNode) {
                alertDiv.parentNode.removeChild(alertDiv);
            }
        }, 3000);
    }
};