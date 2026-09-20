/**
 * FLAVORIA FINE DINING - CORE APPLICATION LOGIC
 * Full Interactive Frontend: Recipes, Carousel, Filter, Cart, Table Booking, Search
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. DATA STORE: 8 RECOMMENDED DISHES & DETAILED RECIPES
  // =========================================================================
  let DISHES_DATA = [
    {
      id: 'grilled-salmon',
      title: 'Grilled Salmon',
      subtitle: 'Served with lemon butter sauce',
      category: 'Main Course',
      price: 24.99,
      rating: 4.8,
      badge: 'Bestseller',
      image: 'images/salmon.jpg',
      prepTime: '15 mins',
      cookTime: '20 mins',
      calories: '480 kcal',
      tags: ['Gluten-Free', 'Omega-3 Rich', 'Chef Favorite'],
      ingredients: [
        '2 fresh Atlantic Salmon fillets (skin-on, center cut)',
        '3 tbsp grass-fed unsalted French butter',
        '1 organic lemon (freshly zested and juiced)',
        '2 cloves garlic, finely grated',
        '1 bunch fresh green asparagus, trimmed',
        'Fresh baby dill & Italian flat parsley',
        'Flaky Maldon sea salt & crushed pink peppercorn',
        '1 tbsp extra virgin olive oil'
      ],
      instructions: [
        'Pat salmon fillets thoroughly dry with paper towels to ensure a crispy skin. Season liberally with sea salt and pink peppercorns.',
        'Heat extra virgin olive oil in a heavy stainless-steel or cast-iron skillet over medium-high heat until shimmering.',
        'Place salmon skin-side down. Press gently with a fish spatula for 20 seconds. Sear undisturbed for 4-5 minutes until golden and crisp.',
        'Flip fillets gently. Add butter, grated garlic, and trimmed asparagus spears directly into the pan.',
        'Baste the salmon continuously with foaming lemon garlic butter for 3 minutes until cooked to tender medium perfection.',
        'Finish with freshly squeezed lemon juice, zest, and chopped baby dill. Plate alongside charred asparagus and lemon wedge.'
      ],
      chefNote: 'For the silkiest finish, allow the butter to gently brown before deglazing with fresh lemon juice. This enhances the caramelized nutty profile.',
      winePairing: 'Domaine Laroche Chablis 2022 or Sancerre Blanc'
    },
    {
      id: 'creamy-prawn-pasta',
      title: 'Creamy Prawn Pasta',
      subtitle: 'Penne in creamy garlic sauce',
      category: 'Main Course',
      price: 21.99,
      rating: 4.7,
      badge: 'New',
      image: 'images/prawn-pasta.jpg',
      prepTime: '10 mins',
      cookTime: '15 mins',
      calories: '620 kcal',
      tags: ['Artisanal Pasta', 'Wild Caught', 'Signature Sauce'],
      ingredients: [
        '300g bronze-cut Penne Rigate or Tagliatelle',
        '12 wild-caught jumbo tiger prawns, peeled and deveined',
        '1 cup heavy double cream (organic)',
        '3 cloves garlic, thinly shaved',
        '1/2 cup freshly grated Parmigiano Reggiano (24 months)',
        '1/4 cup dry white wine (Pinot Grigio)',
        'Fresh Italian basil leaves & lemon zest',
        'Pinch of crushed red pepper flakes'
      ],
      instructions: [
        'Bring a large pot of salted water to a vigorous rolling boil. Cook penne until 1 minute shy of al dente.',
        'In a wide sauté skillet, heat olive oil over medium-high. Sear prawns for 90 seconds per side until pink and curled. Remove and set aside.',
        'In the same pan, sauté shaved garlic and chili flakes for 30 seconds until fragrant. Deglaze with white wine and reduce by half.',
        'Pour in heavy double cream and simmer gently for 2 minutes until velvety. Whisk in grated Parmigiano Reggiano until completely smooth.',
        'Toss drained pasta and seared prawns directly into the creamy garlic sauce over low heat, allowing pasta to absorb the richness.',
        'Garnish with freshly torn basil leaves, cracked black pepper, and extra grated parmesan.'
      ],
      chefNote: 'Always reserve 1/4 cup of starchy pasta water to adjust the emulsion to silky Italian restaurant standards.',
      winePairing: 'Gavi di Gavi or Santa Margherita Pinot Grigio'
    },
    {
      id: 'ribeye-steak',
      title: 'Ribeye Steak',
      subtitle: 'Grilled to perfection',
      category: 'Main Course',
      price: 29.99,
      rating: 4.9,
      badge: '',
      image: 'images/ribeye-steak.jpg',
      prepTime: '10 mins',
      cookTime: '15 mins',
      calories: '740 kcal',
      tags: ['Prime Angus', 'Dry Aged', 'Wood Charcoal'],
      ingredients: [
        '350g Prime Angus Ribeye (28-day dry aged, 1.5-inch thick)',
        '2 tbsp clarified butter (ghee)',
        '3 sprigs fresh rosemary & 4 sprigs fresh thyme',
        '4 unpeeled garlic cloves, lightly crushed',
        'Coarse flaky sea salt & crushed tellicherry black pepper',
        '1 tbsp truffle herb compound butter for finishing'
      ],
      instructions: [
        'Bring steak to room temperature 45 minutes prior to grilling. Season liberally on all sides with coarse sea salt and cracked pepper.',
        'Heat a heavy cast-iron skillet over high heat until smoking hot.',
        'Sear steak for 2.5 minutes without moving until a deep mahogany crust forms. Flip and sear the second side for 2 minutes.',
        'Lower heat slightly. Add clarified butter, crushed garlic, rosemary, and thyme. Baste steak vigorously for 2 minutes for medium-rare.',
        'Transfer steak to a warm carving board and allow to rest undisturbed for 7-8 minutes.',
        'Slice against the grain and crown with a medallion of truffle herb butter.'
      ],
      chefNote: 'Never skip resting the steak! Resting allows the moisture and flavorful juices to settle back into every fiber.',
      winePairing: 'Barolo 2018 or Napa Valley Cabernet Sauvignon'
    },
    {
      id: 'classic-tiramisu',
      title: 'Classic Tiramisu',
      subtitle: 'With cocoa & mascarpone',
      category: 'Desserts',
      price: 8.99,
      rating: 4.6,
      badge: '',
      image: 'images/tiramisu.jpg',
      prepTime: '25 mins',
      cookTime: 'Chill 4 hrs',
      calories: '390 kcal',
      tags: ['Traditional Italian', 'Espresso Infused', 'Vegetarian'],
      ingredients: [
        '24 authentic Italian Savoiardi ladyfinger biscuits',
        '500g Lombardy Mascarpone cheese (chilled)',
        '4 free-range pasteurized egg yolks',
        '1/2 cup superfine castor sugar',
        '1.5 cups freshly brewed strong espresso (cooled)',
        '2 tbsp Marsala wine or Dark Rum',
        'High-grade Dutch unsweetened cocoa powder'
      ],
      instructions: [
        'Whisk egg yolks and sugar in a heatproof bowl over a simmering water bath for 6 minutes until pale, thick, and tripled in volume.',
        'Allow mixture to cool slightly, then gently fold into chilled mascarpone until completely silky and velvety.',
        'Combine cold espresso and Marsala wine in a wide shallow dish. Dip each ladyfinger biscuit for just 2 seconds.',
        'Arrange a single layer of dipped ladyfingers in a glass dish. Spread half of the whipped mascarpone cream smoothly over top.',
        'Repeat with a second layer of ladyfingers and finish with the remaining cream.',
        'Refrigerate for at least 4 hours (ideally overnight). Generously dust with Dutch cocoa powder through a fine sieve right before serving.'
      ],
      chefNote: 'A quick 2-second dip ensures the ladyfingers absorb the espresso without becoming soggy.',
      winePairing: 'Vin Santo del Chianti or Artisanal Espresso'
    },
    {
      id: 'truffle-mushroom-risotto',
      title: 'Truffle Mushroom Risotto',
      subtitle: 'Creamy arborio rice',
      category: 'Starters',
      price: 18.99,
      rating: 4.8,
      badge: '',
      image: 'images/risotto.jpg',
      prepTime: '15 mins',
      cookTime: '25 mins',
      calories: '460 kcal',
      tags: ['Italian Classic', 'Black Truffle', 'Vegetarian'],
      ingredients: [
        '1.5 cups Carnaroli or Arborio rice',
        '300g mixed wild forest mushrooms (Porcini, Cremini, Chanterelles)',
        '4 cups warm aromatic vegetable broth',
        '1 French shallot, finely minced',
        '1/3 cup crisp dry white wine',
        '3 tbsp cold butter (cubed)',
        '1/2 cup 24-month Parmigiano Reggiano',
        '1 tbsp white truffle oil & fresh shaved black truffle'
      ],
      instructions: [
        'In a sauté pan, caramelize sliced wild mushrooms in olive oil and butter until deep golden. Season and set aside.',
        'In a heavy saucepan, sweat minced shallots until translucent. Add rice and toast dry for 2 minutes until edges become translucent.',
        'Deglaze with dry white wine, stirring constantly until completely absorbed.',
        'Gradually add warm broth ladle by ladle, stirring frequently and allowing liquid to absorb before the next ladle (~18 minutes).',
        'Once rice is al dente and creamy, remove from heat. Vigorously beat in cold cubed butter and parmesan (la mantecatura).',
        'Fold in sautéed mushrooms, drizzle with white truffle oil, and top with fresh herbs.'
      ],
      chefNote: 'Mantecatura is the secret to true Italian risotto: vigorously whipping in cold butter off the heat yields that luxurious creaminess.',
      winePairing: 'Nebbiolo Langhe or Chianti Classico Riserva'
    },
    {
      id: 'margherita-pizza',
      title: 'Margherita Pizza',
      subtitle: 'Fresh basil & mozzarella',
      category: 'Main Course',
      price: 16.99,
      rating: 4.9,
      badge: '',
      image: 'images/margherita-pizza.jpg',
      prepTime: '20 mins',
      cookTime: '8 mins',
      calories: '680 kcal',
      tags: ['Wood-Fired', 'Neapolitan', 'Vegetarian'],
      ingredients: [
        '280g slow-fermented 48hr Neapolitan dough ball',
        '1/2 cup San Marzano D.O.P. crushed tomato sauce',
        '150g fresh Fior di Latte mozzarella, gently torn',
        'Fresh Genovese basil leaves',
        '2 tbsp extra virgin olive oil (first cold press)',
        'Flaky sea salt'
      ],
      instructions: [
        'Preheat your pizza oven or baking stone to maximum heat (500°F / 260°C) for 45 minutes.',
        'Gently stretch dough ball by hand on a semolina-dusted surface, pressing from center out to form an airy cornicione crust.',
        'Ladle San Marzano tomato sauce onto the center and swirl outward in a spiral.',
        'Scatter hand-torn fresh mozzarella evenly over the sauce.',
        'Bake on blazing stone for 6-8 minutes until crust is puffed, blistered with leopard spots, and cheese is bubbling.',
        'Top immediately with fresh basil leaves and a generous spiral of raw extra virgin olive oil.'
      ],
      chefNote: 'Add fresh basil right after pulling the pizza from the oven; the residual heat releases the fragrant aromatic oils.',
      winePairing: 'Peroni Nastro Azzurro or Sangiovese'
    },
    {
      id: 'mango-passion-mocktail',
      title: 'Mango Passion Mocktail',
      subtitle: 'Tropical refreshing drink',
      category: 'Beverages',
      price: 7.99,
      rating: 4.7,
      badge: '',
      image: 'images/mango-mocktail.jpg',
      prepTime: '5 mins',
      cookTime: '0 mins',
      calories: '120 kcal',
      tags: ['Non-Alcoholic', 'Tropical Citrus', 'Refreshing'],
      ingredients: [
        '1/2 cup ripe Alphonso mango purée',
        'Pulp and seeds of 1 fresh passion fruit',
        '1 tbsp freshly squeezed lime juice',
        '1 tbsp lemongrass or agave nectar',
        'Chilled sparkling San Pellegrino mineral water',
        'Crushed ice, dehydrated orange wheel, and fresh mint sprig'
      ],
      instructions: [
        'Fill a chilled highball glass half-full with crushed ice.',
        'In a cocktail shaker, shake mango purée, passion fruit pulp, lime juice, and agave syrup with ice cubes for 10 seconds.',
        'Strain liquid directly over the crushed ice.',
        'Top gently with sparkling mineral water to create a sunset gradient effervescence.',
        'Garnish with a citrus wheel, slap of fresh mint, and a glass straw.'
      ],
      chefNote: 'Slapping the mint sprig between your palms activates the essential oils right before garnishing.',
      winePairing: 'Non-Alcoholic Botanical Aperitif'
    },
    {
      id: 'chocolate-lava-cake',
      title: 'Chocolate Lava Cake',
      subtitle: 'Served with vanilla ice cream',
      category: 'Desserts',
      price: 9.99,
      rating: 4.9,
      badge: '',
      image: 'images/lava-cake.jpg',
      prepTime: '15 mins',
      cookTime: '12 mins',
      calories: '510 kcal',
      tags: ['Valrhona 70%', 'Molten Core', 'Artisanal Dessert'],
      ingredients: [
        '120g Valrhona 70% dark bittersweet chocolate',
        '1/2 cup unsalted French butter',
        '2 whole eggs + 2 egg yolks',
        '1/3 cup powdered sugar',
        '3 tbsp unbleached flour',
        '1 tsp pure Madagascar vanilla bean extract',
        'Artisanal bourbon vanilla bean ice cream scoop'
      ],
      instructions: [
        'Preheat oven to 425°F (220°C). Generously butter four 6-ounce ramekins and dust the inside with cocoa powder.',
        'Melt dark chocolate and butter together in a heatproof bowl set over simmering water; stir until glossy and smooth.',
        'In a bowl, whisk eggs, egg yolks, powdered sugar, and vanilla until pale and frothy.',
        'Gently fold melted chocolate into egg mixture, then sift in flour and fold until just combined.',
        'Divide batter into prepared ramekins. Bake for exactly 12 minutes until edges are set but center remains soft.',
        'Let rest for 1 minute, carefully invert onto dessert plates, and crown with cold bourbon vanilla ice cream.'
      ],
      chefNote: 'Watch the timer carefully! A 12-minute bake leaves the core gloriously warm and molten.',
      winePairing: 'Taylor Fladgate 10 Year Tawny Port or Double Ristretto'
    }
  ];

  // =========================================================================
  // 2. HERO CAROUSEL DATA & LOGIC
  // =========================================================================
  // 2. HERO CAROUSEL & SWIPING ENGINE (TOUCH & MOUSE DRAG SWIPE)
  // =========================================================================
  const HERO_SLIDES = [
    {
      image: 'images/hero-dish.jpg',
      title: 'Delicious Food,<br>Unforgettable <span class="accent-font">Moments</span>',
      description: 'A perfect blend of taste, art, and ambiance.<br>Crafted to delight your senses.',
      badgeTitle: 'Signature Creation',
      badgeDish: 'Roasted Herb Chicken & Edible Violas'
    },
    {
      image: 'images/hero-dish-2.jpg',
      title: 'Artisan Flavors,<br>Masterful <span class="accent-font">Tradition</span>',
      description: 'Organic culinary mastery prepared fresh every evening<br>by our executive culinary team.',
      badgeTitle: 'Chef Special',
      badgeDish: 'Pan-Seared Salmon & Green Asparagus'
    }
  ];

  let currentHeroIndex = 0;
  let heroTimer = null;

  function initHeroCarousel() {
    const dotsContainer = document.getElementById('hero-dots');
    if (dotsContainer) {
      const dots = dotsContainer.querySelectorAll('.dot');
      dots.forEach(dot => {
        dot.addEventListener('click', () => {
          const slideIndex = parseInt(dot.getAttribute('data-slide'), 10);
          const dir = slideIndex > currentHeroIndex ? 'next' : 'prev';
          goToHeroSlide(slideIndex, dir);
          resetHeroTimer();
        });
      });
    }

    // Prev / Next Arrow buttons
    const prevBtn = document.getElementById('hero-prev-btn');
    const nextBtn = document.getElementById('hero-next-btn');
    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        prevHeroSlide();
        resetHeroTimer();
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        nextHeroSlide();
        resetHeroTimer();
      });
    }

    // Touch & Mouse Drag Swipe Support on Hero Section
    initHeroSwipeGestures();

    startHeroTimer();
  }

  function nextHeroSlide() {
    const nextIndex = (currentHeroIndex + 1) % HERO_SLIDES.length;
    goToHeroSlide(nextIndex, 'next');
  }

  function prevHeroSlide() {
    const prevIndex = (currentHeroIndex - 1 + HERO_SLIDES.length) % HERO_SLIDES.length;
    goToHeroSlide(prevIndex, 'prev');
  }

  function goToHeroSlide(index, direction = 'next') {
    if (index < 0 || index >= HERO_SLIDES.length) return;
    currentHeroIndex = index;
    const slide = HERO_SLIDES[index];

    const heroImg = document.getElementById('hero-main-img');
    const heroTitle = document.querySelector('.hero-headline');
    const heroDesc = document.querySelector('.hero-description');
    const badgeTitle = document.querySelector('.badge-title');
    const badgeDish = document.querySelector('.badge-dish');
    const dots = document.querySelectorAll('#hero-dots .dot');

    if (heroImg) {
      const slideOutX = direction === 'next' ? '-35px' : '35px';
      const slideInX = direction === 'next' ? '35px' : '-35px';

      heroImg.style.transition = 'transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.22s ease';
      heroImg.style.transform = `translateX(${slideOutX}) scale(0.94)`;
      heroImg.style.opacity = '0.2';

      setTimeout(() => {
        heroImg.src = slide.image;
        heroImg.style.transition = 'none';
        heroImg.style.transform = `translateX(${slideInX}) scale(0.94)`;

        requestAnimationFrame(() => {
          heroImg.style.transition = 'transform 0.38s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.38s ease';
          heroImg.style.transform = 'translateX(0) scale(1)';
          heroImg.style.opacity = '1';
        });
      }, 220);
    }

    if (heroTitle) {
      heroTitle.style.opacity = '0.35';
      setTimeout(() => {
        heroTitle.innerHTML = slide.title;
        heroTitle.style.opacity = '1';
      }, 150);
    }

    if (heroDesc) {
      heroDesc.style.opacity = '0.35';
      setTimeout(() => {
        heroDesc.innerHTML = slide.description;
        heroDesc.style.opacity = '1';
      }, 150);
    }

    if (badgeTitle) badgeTitle.textContent = slide.badgeTitle;
    if (badgeDish) badgeDish.textContent = slide.badgeDish;

    dots.forEach((dot, idx) => {
      if (idx === index) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  function initHeroSwipeGestures() {
    const heroSection = document.getElementById('hero');
    if (!heroSection) return;

    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;

    // Mobile / Tablet Touch Events
    heroSection.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    heroSection.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      touchEndY = e.changedTouches[0].screenY;
      handleSwipe();
    }, { passive: true });

    function handleSwipe() {
      const diffX = touchEndX - touchStartX;
      const diffY = touchEndY - touchStartY;
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 35) {
        if (diffX < 0) {
          nextHeroSlide(); // Swiped left -> Next
        } else {
          prevHeroSlide(); // Swiped right -> Previous
        }
        resetHeroTimer();
      }
    }

    // Desktop Mouse Drag to Swipe
    let mouseStartX = 0;
    let isMouseDown = false;

    heroSection.addEventListener('mousedown', (e) => {
      if (e.target.closest('button, a, input, select')) return;
      isMouseDown = true;
      mouseStartX = e.clientX;
    });

    window.addEventListener('mouseup', (e) => {
      if (!isMouseDown) return;
      isMouseDown = false;
      const diffX = e.clientX - mouseStartX;
      if (Math.abs(diffX) > 40) {
        if (diffX < 0) {
          nextHeroSlide(); // Dragged left -> Next
        } else {
          prevHeroSlide(); // Dragged right -> Previous
        }
        resetHeroTimer();
      }
    });

    // Pause timer on hover
    heroSection.addEventListener('mouseenter', () => {
      clearInterval(heroTimer);
    });

    heroSection.addEventListener('mouseleave', () => {
      startHeroTimer();
    });
  }

  function startHeroTimer() {
    if (HERO_SLIDES.length <= 1) return;
    clearInterval(heroTimer);
    heroTimer = setInterval(() => {
      nextHeroSlide();
    }, 6500);
  }

  function resetHeroTimer() {
    if (heroTimer) clearInterval(heroTimer);
    startHeroTimer();
  }

  // =========================================================================
  // 3. CHEF'S RECOMMENDATIONS GRID & FILTER TABS
  // =========================================================================
  let currentFilter = 'all';

  function renderDishesGrid(filter = 'all') {
    const grid = document.getElementById('dishes-grid');
    if (!grid) return;

    grid.innerHTML = '';
    const filtered = filter === 'all' 
      ? DISHES_DATA 
      : DISHES_DATA.filter(dish => dish.category.toLowerCase() === filter.toLowerCase());

    filtered.forEach(dish => {
      const card = document.createElement('div');
      card.className = 'dish-card';
      card.setAttribute('data-id', dish.id);

      card.innerHTML = `
        <div class="dish-thumb-wrap">
          ${dish.badge ? `<span class="dish-badge">${dish.badge}</span>` : ''}
          <img src="${dish.image}" alt="${dish.title}" class="dish-thumb" loading="lazy">
          <div class="dish-hover-actions">
            <button class="card-action-btn btn-view-recipe" data-id="${dish.id}">View Recipe</button>
            <button class="card-action-btn btn-quick-add" data-id="${dish.id}">+ Order</button>
          </div>
        </div>
        <div class="dish-body">
          <h4 class="dish-title">${dish.title}</h4>
          <p class="dish-desc">${dish.subtitle}</p>
          <div class="dish-meta-row">
            <div class="dish-rating">
              <span class="stars-icon">★★★★★</span>
              <span>(${dish.rating.toFixed(1)})</span>
            </div>
            <div class="dish-price">$${dish.price.toFixed(2)}</div>
          </div>
        </div>
      `;

      // Event listener to open recipe modal on card or button click
      card.addEventListener('click', (e) => {
        if (e.target.closest('.btn-quick-add')) {
          e.stopPropagation();
          addToCart(dish.id);
          return;
        }
        openRecipeModal(dish.id);
      });

      grid.appendChild(card);
    });
  }

  function initFilterTabs() {
    const tabs = document.querySelectorAll('#recommendation-tabs .tab-btn');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const filter = tab.getAttribute('data-filter');
        currentFilter = filter;
        renderDishesGrid(filter);
      });
    });

    // Category Circles click interaction
    const catItems = document.querySelectorAll('.category-item');
    catItems.forEach(item => {
      item.addEventListener('click', () => {
        const cat = item.getAttribute('data-category');
        scrollToSection('recommendations');
        
        // Find matching tab or set filter
        const matchingTab = Array.from(tabs).find(t => t.getAttribute('data-filter').toLowerCase() === cat.toLowerCase());
        if (matchingTab) {
          matchingTab.click();
        } else {
          // If pizza or specials, search or filter
          renderDishesGrid('all');
          showToast(`Browsing ${cat} selection`, 'info');
        }
      });
    });
  }

  // =========================================================================
  // 4. RECIPE INSPECTOR MODAL
  // =========================================================================
  let activeRecipeDish = null;

  function openRecipeModal(dishId) {
    const dish = DISHES_DATA.find(d => d.id === dishId);
    if (!dish) return;

    activeRecipeDish = dish;

    const modal = document.getElementById('recipe-modal');
    const modalImg = document.getElementById('recipe-modal-img');
    const modalCategory = document.getElementById('recipe-modal-category');
    const modalTitle = document.getElementById('recipe-modal-title');
    const modalSub = document.getElementById('recipe-modal-subtitle');
    const modalPrice = document.getElementById('recipe-modal-price');
    const prepTime = document.getElementById('recipe-prep-time');
    const cookTime = document.getElementById('recipe-cook-time');
    const calories = document.getElementById('recipe-calories');
    const rating = document.getElementById('recipe-rating');
    const tagsRow = document.getElementById('recipe-modal-tags');
    const ingList = document.getElementById('recipe-ingredients-list');
    const instList = document.getElementById('recipe-instructions-list');
    const chefNote = document.getElementById('recipe-chef-note');
    const winePairing = document.getElementById('recipe-wine-pairing');

    modalImg.src = dish.image;
    modalImg.alt = dish.title;
    modalCategory.textContent = dish.category;
    modalTitle.textContent = dish.title;
    modalSub.textContent = dish.subtitle;
    modalPrice.textContent = `$${dish.price.toFixed(2)}`;
    prepTime.textContent = dish.prepTime;
    cookTime.textContent = dish.cookTime;
    calories.textContent = dish.calories;
    rating.textContent = `★ ${dish.rating.toFixed(1)}`;

    // Render tags
    tagsRow.innerHTML = dish.tags.map(t => `<span class="recipe-tag">${t}</span>`).join('');

    // Render interactive ingredients
    ingList.innerHTML = dish.ingredients.map((ing, i) => `
      <li class="ingredient-item" onclick="this.classList.toggle('checked')">
        <input type="checkbox" id="ing-${i}">
        <label for="ing-${i}">${ing}</label>
      </li>
    `).join('');

    // Render instructions
    instList.innerHTML = dish.instructions.map(inst => `<li>${inst}</li>`).join('');

    // Render chef advice & wine
    chefNote.textContent = dish.chefNote;
    winePairing.textContent = dish.winePairing;

    // Reset tabs to ingredients
    const tabBtns = modal.querySelectorAll('.recipe-tab-btn');
    const tabPanes = modal.querySelectorAll('.recipe-tab-pane');
    tabBtns.forEach(btn => btn.classList.remove('active'));
    tabPanes.forEach(pane => pane.classList.remove('active'));
    tabBtns[0].classList.add('active');
    document.getElementById('pane-ingredients').classList.add('active');

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeRecipeModal() {
    const modal = document.getElementById('recipe-modal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  function initRecipeModalTabs() {
    const tabBtns = document.querySelectorAll('.recipe-tab-btn');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const tab = btn.getAttribute('data-tab');
        document.querySelectorAll('.recipe-tab-pane').forEach(p => p.classList.remove('active'));
        const pane = document.getElementById(`pane-${tab}`);
        if (pane) pane.classList.add('active');
      });
    });

    const closeBtn = document.getElementById('btn-close-recipe');
    if (closeBtn) closeBtn.addEventListener('click', closeRecipeModal);

    const addDishBtn = document.getElementById('btn-add-recipe-dish');
    if (addDishBtn) {
      addDishBtn.addEventListener('click', () => {
        if (activeRecipeDish) {
          addToCart(activeRecipeDish.id);
          closeRecipeModal();
          openCartDrawer();
        }
      });
    }

    const printBtn = document.getElementById('btn-print-recipe');
    if (printBtn) {
      printBtn.addEventListener('click', () => {
        window.print();
      });
    }
  }

  // =========================================================================
  // 5. TABLE RESERVATION SYSTEM
  // =========================================================================
  function openReservationModal() {
    const modal = document.getElementById('reservation-modal');
    if (modal) {
      // Set default date to tomorrow
      const dateInput = document.getElementById('res-date');
      if (dateInput && !dateInput.value) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        dateInput.value = tomorrow.toISOString().split('T')[0];
      }

      // Reset form view
      document.getElementById('reservation-form').classList.remove('hidden');
      document.getElementById('reservation-confirmation').classList.add('hidden');

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeReservationModal() {
    const modal = document.getElementById('reservation-modal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  function initReservation() {
    const bookNavBtn = document.getElementById('nav-reservation-link');
    const heroBookBtn = document.getElementById('hero-btn-book');
    const closeBtn = document.getElementById('btn-close-reservation');

    if (bookNavBtn) bookNavBtn.addEventListener('click', (e) => { e.preventDefault(); openReservationModal(); });
    if (heroBookBtn) heroBookBtn.addEventListener('click', openReservationModal);
    if (closeBtn) closeBtn.addEventListener('click', closeReservationModal);

    const form = document.getElementById('reservation-form');
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
        const origText = submitBtn ? submitBtn.textContent : '';
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = 'Confirming Table...';
        }

        const name = document.getElementById('res-name').value.trim();
        const guests = parseInt(document.getElementById('res-guests').value, 10) || 2;
        const date = document.getElementById('res-date').value;
        const time = document.getElementById('res-time').value;
        const seating = document.querySelector('input[name="seating"]:checked')?.value || 'Main Dining Room';
        const email = `${name.toLowerCase().replace(/[^a-z0-9]/g, '') || 'guest'}@flavoria.com`;
        const phone = '+1 234 567 8900';

        let code = '#FLV-' + Math.floor(1000 + Math.random() * 9000);
        let fromDb = false;

        try {
          const res = await fetch('/api/reservations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, phone, guests, date, time, seating })
          });
          if (res.ok) {
            const data = await res.json();
            if (data.reservation && data.reservation.code) {
              code = data.reservation.code;
              fromDb = true;
            }
          }
        } catch (err) {
          console.warn('Backend reservation request failed, using offline fallback:', err);
        } finally {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = origText;
          }
        }

        document.getElementById('ticket-code').textContent = code;
        document.getElementById('ticket-name').textContent = name;
        document.getElementById('ticket-datetime').textContent = `${date} at ${time}`;
        document.getElementById('ticket-party').textContent = `${guests} Guests`;
        document.getElementById('ticket-seating').textContent = seating;

        form.classList.add('hidden');
        document.getElementById('reservation-confirmation').classList.remove('hidden');

        showToast(
          fromDb 
            ? `Table reserved & saved to MongoDB! Booking ${code}` 
            : `Table reserved! Booking ${code}`,
          'success'
        );
        checkDatabaseHealth();
      });
    }
  }

  // =========================================================================
  // 6. SHOPPING CART & CHECKOUT DRAWER
  // =========================================================================
  let cart = []; // Array of { id, quantity }
  let appliedDiscount = 0; // percentage (e.g. 20)
  let activeCoupon = '';

  function openCartDrawer() {
    const overlay = document.getElementById('cart-drawer-overlay');
    if (overlay) {
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      renderCart();
    }
  }

  function closeCartDrawer() {
    const overlay = document.getElementById('cart-drawer-overlay');
    if (overlay) {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  function addToCart(dishId) {
    const dish = DISHES_DATA.find(d => d.id === dishId);
    if (!dish) return;

    const existing = cart.find(item => item.id === dishId);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ id: dishId, quantity: 1 });
    }

    updateCartCountBadge();
    showToast(`Added "${dish.title}" to order`, 'success');
  }

  function removeFromCart(dishId) {
    cart = cart.filter(item => item.id !== dishId);
    updateCartCountBadge();
    renderCart();
  }

  function changeQuantity(dishId, delta) {
    const item = cart.find(i => i.id === dishId);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
      removeFromCart(dishId);
    } else {
      updateCartCountBadge();
      renderCart();
    }
  }

  function updateCartCountBadge() {
    const badge = document.getElementById('cart-count-badge');
    const totalCount = cart.reduce((sum, i) => sum + i.quantity, 0);
    if (badge) {
      badge.textContent = totalCount;
      badge.style.transform = 'scale(1.3)';
      setTimeout(() => { badge.style.transform = 'scale(1)'; }, 200);
    }
  }

  function renderCart() {
    const countLabel = document.getElementById('cart-items-counter');
    const itemsBody = document.getElementById('cart-items-body');
    const emptyState = document.getElementById('empty-cart-state');
    const subtotalEl = document.getElementById('cart-subtotal');
    const discountEl = document.getElementById('cart-discount');
    const discountRow = document.getElementById('row-discount');
    const deliveryEl = document.getElementById('cart-delivery');
    const totalEl = document.getElementById('cart-total');
    const progressFill = document.getElementById('delivery-progress-fill');
    const progressLabel = document.getElementById('delivery-progress-label');

    const totalCount = cart.reduce((sum, i) => sum + i.quantity, 0);
    if (countLabel) countLabel.textContent = `(${totalCount} item${totalCount === 1 ? '' : 's'})`;

    if (cart.length === 0) {
      if (emptyState) emptyState.style.display = 'block';
      itemsBody.innerHTML = '';
      itemsBody.appendChild(emptyState);

      subtotalEl.textContent = '$0.00';
      totalEl.textContent = '$0.00';
      deliveryEl.textContent = '$0.00';
      discountRow.style.display = 'none';
      if (progressFill) progressFill.style.width = '0%';
      if (progressLabel) progressLabel.textContent = 'Add $50.00 more for Free Delivery';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';
    itemsBody.innerHTML = '';

    let subtotal = 0;

    cart.forEach(item => {
      const dish = DISHES_DATA.find(d => d.id === item.id);
      if (!dish) return;

      const itemTotal = dish.price * item.quantity;
      subtotal += itemTotal;

      const itemEl = document.createElement('div');
      itemEl.className = 'cart-item';
      itemEl.innerHTML = `
        <img src="${dish.image}" alt="${dish.title}" class="cart-item-img">
        <div class="cart-item-info">
          <h5 class="cart-item-title">${dish.title}</h5>
          <span class="cart-item-price">$${dish.price.toFixed(2)}</span>
          <div class="cart-qty-ctrl">
            <button class="qty-btn" onclick="window.changeQuantity('${dish.id}', -1)">-</button>
            <span class="qty-val">${item.quantity}</span>
            <button class="qty-btn" onclick="window.changeQuantity('${dish.id}', 1)">+</button>
          </div>
        </div>
        <button class="cart-item-remove" onclick="window.removeFromCart('${dish.id}')" title="Remove item">&times;</button>
      `;
      itemsBody.appendChild(itemEl);
    });

    // Discount
    let discountAmount = 0;
    if (appliedDiscount > 0) {
      discountAmount = (subtotal * appliedDiscount) / 100;
      discountRow.style.display = 'flex';
      discountEl.textContent = `-$${discountAmount.toFixed(2)}`;
    } else {
      discountRow.style.display = 'none';
    }

    // Delivery Fee ($50 free threshold)
    const FREE_DELIVERY_THRESHOLD = 50.00;
    let deliveryFee = 4.99;
    if (subtotal >= FREE_DELIVERY_THRESHOLD) {
      deliveryFee = 0.00;
      deliveryEl.textContent = 'FREE';
      deliveryEl.className = 'gold-text';
      if (progressFill) progressFill.style.width = '100%';
      if (progressLabel) progressLabel.textContent = '🎉 You unlocked Free Fine Dining Delivery!';
    } else {
      const remaining = FREE_DELIVERY_THRESHOLD - subtotal;
      deliveryEl.textContent = `$${deliveryFee.toFixed(2)}`;
      deliveryEl.className = '';
      const percent = Math.min(100, Math.round((subtotal / FREE_DELIVERY_THRESHOLD) * 100));
      if (progressFill) progressFill.style.width = `${percent}%`;
      if (progressLabel) progressLabel.textContent = `Add $${remaining.toFixed(2)} more for Free Delivery`;
    }

    const finalTotal = Math.max(0, subtotal - discountAmount + deliveryFee);
    subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    totalEl.textContent = `$${finalTotal.toFixed(2)}`;
  }

  function applyVoucher(code) {
    const cleaned = code.trim().toUpperCase();
    const statusEl = document.getElementById('voucher-status');

    if (cleaned === 'FLAVOR20') {
      appliedDiscount = 20;
      activeCoupon = 'FLAVOR20';
      if (statusEl) {
        statusEl.className = 'voucher-status success';
        statusEl.textContent = '✓ 20% First Order discount applied!';
      }
      renderCart();
      showToast('Special 20% discount applied!', 'success');
      return true;
    } else if (cleaned === 'WELCOME10') {
      appliedDiscount = 10;
      activeCoupon = 'WELCOME10';
      if (statusEl) {
        statusEl.className = 'voucher-status success';
        statusEl.textContent = '✓ 10% Welcome voucher applied!';
      }
      renderCart();
      showToast('10% Welcome voucher applied!', 'success');
      return true;
    } else {
      if (statusEl) {
        statusEl.className = 'voucher-status error';
        statusEl.textContent = 'Invalid promo code. Try FLAVOR20';
      }
      return false;
    }
  }

  function applySpecialOffer() {
    // Add Grilled Salmon to cart if empty
    if (cart.length === 0) {
      addToCart('grilled-salmon');
    }
    applyVoucher('FLAVOR20');
    openCartDrawer();
  }

  function initCart() {
    const cartTrigger = document.getElementById('btn-cart-trigger');
    const closeBtn = document.getElementById('btn-close-cart');
    const voucherBtn = document.getElementById('btn-apply-voucher');
    const voucherInput = document.getElementById('voucher-input');
    const checkoutBtn = document.getElementById('btn-checkout');
    const specialOfferBtn = document.getElementById('btn-order-offer');

    if (cartTrigger) cartTrigger.addEventListener('click', openCartDrawer);
    if (closeBtn) closeBtn.addEventListener('click', closeCartDrawer);

    if (voucherBtn && voucherInput) {
      voucherBtn.addEventListener('click', () => {
        applyVoucher(voucherInput.value);
      });
      voucherInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') applyVoucher(voucherInput.value);
      });
    }

    if (specialOfferBtn) {
      specialOfferBtn.addEventListener('click', applySpecialOffer);
    }

    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', async () => {
        if (cart.length === 0) {
          showToast('Please add items to your gourmet order first.', 'info');
          return;
        }

        const origText = checkoutBtn.textContent;
        checkoutBtn.disabled = true;
        checkoutBtn.textContent = 'Processing Order...';

        try {
          const payload = {
            items: cart.map(i => ({ dishId: i.id, quantity: i.quantity })),
            voucherCode: activeCoupon || '',
            customer: {
              name: 'Flavoria Gourmet Guest',
              email: 'guest@flavoria.com'
            }
          };

          const res = await fetch('/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });

          let orderCode = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
          let dbSaved = false;

          if (res.ok) {
            const data = await res.json();
            if (data.order && data.order.orderCode) {
              orderCode = data.order.orderCode;
              dbSaved = true;
            }
          }

          closeCartDrawer();
          showToast(
            dbSaved 
              ? `Order ${orderCode} sent to Kitchen & saved to MongoDB!` 
              : `Order ${orderCode} confirmed with Kitchen!`,
            'success'
          );

          alert(`🎉 Order Confirmed: ${orderCode}\n\nThank you for choosing Flavoria Fine Dining!\nYour order has been recorded${dbSaved ? ' in our MongoDB culinary database' : ''} and dispatched to our Executive Chef.`);
          
          cart = [];
          appliedDiscount = 0;
          activeCoupon = '';
          updateCartCountBadge();
          renderCart();
          checkDatabaseHealth();
        } catch (err) {
          console.warn('Checkout backend error, fallback to offline confirmation:', err);
          closeCartDrawer();
          alert('Thank you for choosing Flavoria! Your gourmet tasting order has been placed with our Executive Kitchen.');
          cart = [];
          updateCartCountBadge();
          renderCart();
        } finally {
          checkoutBtn.disabled = false;
          checkoutBtn.textContent = origText;
        }
      });
    }
  }

  // =========================================================================
  // 7. REAL-TIME SEARCH MODAL
  // =========================================================================
  function openSearchModal() {
    const modal = document.getElementById('search-modal');
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      const input = document.getElementById('search-input-field');
      if (input) {
        input.value = '';
        setTimeout(() => input.focus(), 150);
        renderSearchResults('');
      }
    }
  }

  function closeSearchModal() {
    const modal = document.getElementById('search-modal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  function renderSearchResults(query) {
    const resultsContainer = document.getElementById('search-results-list');
    if (!resultsContainer) return;

    const cleanQuery = query.toLowerCase().trim();
    const matched = DISHES_DATA.filter(dish => {
      if (!cleanQuery) return true;
      const titleMatch = dish.title.toLowerCase().includes(cleanQuery);
      const catMatch = dish.category.toLowerCase().includes(cleanQuery);
      const subMatch = dish.subtitle.toLowerCase().includes(cleanQuery);
      const ingMatch = dish.ingredients.some(ing => ing.toLowerCase().includes(cleanQuery));
      return titleMatch || catMatch || subMatch || ingMatch;
    });

    if (matched.length === 0) {
      resultsContainer.innerHTML = `
        <div class="text-center" style="padding: 24px; color: var(--text-muted);">
          <p>No dishes or ingredients found matching "${query}"</p>
        </div>
      `;
      return;
    }

    resultsContainer.innerHTML = matched.map(dish => `
      <div class="search-result-card" onclick="window.selectSearchResult('${dish.id}')">
        <img src="${dish.image}" alt="${dish.title}" class="search-result-thumb">
        <div class="search-result-info">
          <h5>${dish.title} <span class="gold-text">($${dish.price.toFixed(2)})</span></h5>
          <p>${dish.subtitle} • <em>${dish.category}</em></p>
        </div>
      </div>
    `).join('');
  }

  function selectSearchResult(dishId) {
    closeSearchModal();
    openRecipeModal(dishId);
  }

  function initSearch() {
    const trigger = document.getElementById('btn-search-trigger');
    const closeBtn = document.getElementById('btn-close-search');
    const input = document.getElementById('search-input-field');

    if (trigger) trigger.addEventListener('click', openSearchModal);
    if (closeBtn) closeBtn.addEventListener('click', closeSearchModal);

    if (input) {
      input.addEventListener('input', (e) => {
        renderSearchResults(e.target.value);
      });
    }

    // Keyboard shortcut (Ctrl+K or '/' to open search)
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey && e.key.toLowerCase() === 'k') || (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA')) {
        e.preventDefault();
        openSearchModal();
      }
      if (e.key === 'Escape') {
        closeRecipeModal();
        closeReservationModal();
        closeCartDrawer();
        closeSearchModal();
        closeUserModal();
      }
    });
  }

  // =========================================================================
  // 8. USER PROFILE MODAL
  // =========================================================================
  function openUserModal() {
    const modal = document.getElementById('user-modal');
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeUserModal() {
    const modal = document.getElementById('user-modal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  function handleUserLogin() {
    closeUserModal();
    showToast('Welcome back, VIP Guest Member!', 'success');
  }

  function handleGuestDemo(e) {
    if (e) e.preventDefault();
    closeUserModal();
    showToast('Signed in as Guest VIP Member', 'info');
  }

  function initUserModal() {
    const trigger = document.getElementById('btn-user-trigger');
    const closeBtn = document.getElementById('btn-close-user');
    if (trigger) trigger.addEventListener('click', openUserModal);
    if (closeBtn) closeBtn.addEventListener('click', closeUserModal);
  }

  // =========================================================================
  // 9. TOAST NOTIFICATION ENGINE
  // =========================================================================
  function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let icon = '✦';
    if (type === 'success') icon = '✓';
    if (type === 'info') icon = 'ℹ';

    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  // =========================================================================
  // 10. NAVIGATION & SMOOTH SCROLLING
  // =========================================================================
  function scrollToSection(sectionId) {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  function initNav() {
    const homeLink = document.getElementById('nav-home');
    const menuLink = document.getElementById('nav-menu');
    const aboutLink = document.getElementById('nav-about');
    const exploreBtn = document.getElementById('hero-btn-explore');

    if (homeLink) homeLink.addEventListener('click', (e) => { e.preventDefault(); scrollToSection('hero'); });
    if (menuLink) menuLink.addEventListener('click', (e) => { e.preventDefault(); scrollToSection('recommendations'); });
    if (aboutLink) aboutLink.addEventListener('click', (e) => { e.preventDefault(); scrollToSection('about'); });
    if (exploreBtn) exploreBtn.addEventListener('click', () => scrollToSection('recommendations'));

    // Mobile Hamburger
    const mobileBtn = document.getElementById('btn-mobile-menu');
    if (mobileBtn) {
      mobileBtn.addEventListener('click', () => {
        openSearchModal();
      });
    }
  }

  // =========================================================================
  // 11. LIVE BACKEND & DATABASE SYNCHRONIZATION
  // =========================================================================
  let lastDbHealthData = null;

  async function checkDatabaseHealth() {
    try {
      const res = await fetch('/api/health');
      if (res.ok) {
        lastDbHealthData = await res.json();
      }
    } catch (err) {
      // Background health check silent fallback
    }
  }

  async function loadDishesFromBackend() {
    try {
      const res = await fetch('/api/dishes');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.dishes) && data.dishes.length > 0) {
          DISHES_DATA = data.dishes;
          renderDishesGrid(currentFilter || 'all');
        }
      }
    } catch (err) {
      console.warn('Could not load dishes from backend, using bundled recipe catalog:', err);
    }
  }

  function initDatabaseStatusPill() {
    // Database indicator removed from UI as requested
  }

  // =========================================================================
  // INITIALIZATION ON DOM READY
  // =========================================================================
  document.addEventListener('DOMContentLoaded', () => {
    initHeroCarousel();
    renderDishesGrid('all');
    initFilterTabs();
    initRecipeModalTabs();
    initReservation();
    initCart();
    initSearch();
    initUserModal();
    initNav();
    initDatabaseStatusPill();
    checkDatabaseHealth();
    loadDishesFromBackend();

    // Periodic heartbeat check every 30 seconds
    setInterval(checkDatabaseHealth, 30000);
  });

  // Expose necessary functions globally for inline HTML events
  window.openRecipeModal = openRecipeModal;
  window.closeRecipeModal = closeRecipeModal;
  window.openReservationModal = openReservationModal;
  window.closeReservationModal = closeReservationModal;
  window.openCartDrawer = openCartDrawer;
  window.closeCartDrawer = closeCartDrawer;
  window.addToCart = addToCart;
  window.removeFromCart = removeFromCart;
  window.changeQuantity = changeQuantity;
  window.applySpecialOffer = applySpecialOffer;
  window.openSearchModal = openSearchModal;
  window.closeSearchModal = closeSearchModal;
  window.selectSearchResult = selectSearchResult;
  window.handleUserLogin = handleUserLogin;
  window.handleGuestDemo = handleGuestDemo;
  window.showToast = showToast;
  window.scrollToSection = scrollToSection;
  window.checkDatabaseHealth = checkDatabaseHealth;

})();
