const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/flavoria_db';

// ============================================================================
// SCHEMAS & MODELS
// ============================================================================

// 1. Dish Schema
const DishSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true, index: true },
  title: { type: String, required: true },
  subtitle: { type: String },
  category: { type: String, required: true, index: true },
  price: { type: Number, required: true },
  rating: { type: Number, default: 4.8 },
  badge: { type: String, default: '' },
  image: { type: String, required: true },
  prepTime: { type: String, default: '15 mins' },
  cookTime: { type: String, default: '20 mins' },
  calories: { type: String, default: '450 kcal' },
  tags: [{ type: String }],
  ingredients: [{ type: String }],
  instructions: [{ type: String }],
  chefNote: { type: String },
  winePairing: { type: String }
}, { timestamps: true });

// 2. Reservation Schema
const ReservationSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  guests: { type: Number, required: true, min: 1 },
  date: { type: String, required: true },
  time: { type: String, required: true },
  specialRequests: { type: String, default: '' },
  status: { type: String, enum: ['Confirmed', 'Seated', 'Completed', 'Cancelled'], default: 'Confirmed' }
}, { timestamps: true });

// 3. Order Schema
const OrderSchema = new mongoose.Schema({
  orderCode: { type: String, required: true, unique: true, index: true },
  items: [{
    dishId: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, default: 1 }
  }],
  subtotal: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  tax: { type: Number, default: 0 },
  total: { type: Number, required: true },
  voucherCode: { type: String, default: '' },
  customerInfo: {
    name: { type: String, default: 'Guest Diner' },
    phone: { type: String, default: '' },
    address: { type: String, default: '' }
  },
  status: { type: String, enum: ['Received', 'Preparing', 'Ready', 'Delivered'], default: 'Received' }
}, { timestamps: true });

const Dish = mongoose.model('Dish', DishSchema);
const Reservation = mongoose.model('Reservation', ReservationSchema);
const Order = mongoose.model('Order', OrderSchema);

// ============================================================================
// INITIAL SEED DATA (8 LUXURY FINE-DINING DISHES)
// ============================================================================
const SEED_DISHES = [
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
    cookTime: '0 mins (Chill 4h)',
    calories: '390 kcal',
    tags: ['Italian Classic', 'No-Bake', 'Coffee Lovers'],
    ingredients: [
      '24 crisp Italian Savoiardi ladyfinger biscuits',
      '500g authentic Italian Mascarpone cheese (cold)',
      '4 farm-fresh pasteurized egg yolks',
      '1/2 cup superfine caster sugar',
      '1 1/4 cups freshly brewed dark espresso (cooled)',
      '2 tbsp dark Marsala wine or Kahlúa liqueur',
      'Dutch-processed unsweetened dark cocoa powder',
      'Shaved Valrhona 70% dark chocolate for garnish'
    ],
    instructions: [
      'In a heatproof bowl set over a gentle water bath, whisk egg yolks and caster sugar continuously for 5 minutes until pale, thick, and doubled in volume. Allow to cool completely.',
      'In a separate chilled bowl, whip cold mascarpone cheese until light and aerated. Gently fold into the cooled yolk mixture using a silicone spatula.',
      'In a wide shallow dish, combine cooled espresso and Marsala wine.',
      'Quickly dip each ladyfinger into espresso for 1-2 seconds per side (do not over-saturate) and arrange in a single tight layer in an 8x8 ceramic serving dish.',
      'Spread half of the velvety mascarpone cream evenly over the soaked ladyfingers. Repeat with a second layer of dipped ladyfingers and top with remaining cream.',
      'Refrigerate covered for at least 4 to 6 hours (preferably overnight) to set. Dust generously with Dutch cocoa powder just before slicing.'
    ],
    chefNote: 'A quick dip is essential: over-soaking the biscuits will make the tiramisu watery rather than light and cake-like.',
    winePairing: 'Vin Santo del Chianti or Espresso Martini'
  },
  {
    id: 'truffle-mushroom-risotto',
    title: 'Truffle Mushroom Risotto',
    subtitle: 'Creamy arborio rice',
    category: 'Main Course',
    price: 18.99,
    rating: 4.7,
    badge: 'Chef Choice',
    image: 'images/risotto.jpg',
    prepTime: '15 mins',
    cookTime: '30 mins',
    calories: '510 kcal',
    tags: ['Vegetarian', 'Truffle Infused', 'Slow Cooked'],
    ingredients: [
      '300g premium Italian Carnaroli or Arborio rice',
      '250g mixed wild mushrooms (Chanterelles, Porcini, Cremini), sliced',
      '1 liter simmering organic vegetable or chicken stock',
      '1 small shallot, finely brunoised',
      '1/2 cup dry Italian white wine (Trebbiano)',
      '3 tbsp unsalted European butter',
      '1/2 cup Parmigiano Reggiano, freshly grated',
      '2 tbsp white truffle oil & fresh thyme sprigs'
    ],
    instructions: [
      'In a wide heavy saucepan, heat 1 tbsp butter and sauté wild mushrooms over high heat for 5 minutes until caramelized. Season with salt, pepper, and fresh thyme; reserve half for garnish.',
      'In the same pan, melt 1 tbsp butter and sweat shallots until translucent without browning.',
      'Add rice and toast dry for 2 minutes until translucent around the edges and warm to the touch (tostatura).',
      'Deglaze with white wine, stirring constantly until completely absorbed by the rice grains.',
      'Begin adding simmering broth one ladleful at a time, stirring gently and waiting until liquid is mostly absorbed before adding the next ladle (approx 18-20 minutes).',
      'Remove from heat when grains are tender with a delicate al dente bite. Vigorously beat in remaining cold butter, grated parmesan, and truffle oil (mantecatura) for a glossy, wavy consistency.',
      'Plate onto warm flat dishes, tapping the bottom so the risotto flows evenly. Top with reserved sautéed mushrooms and a drizzle of truffle oil.'
    ],
    chefNote: 'The final vigorous stirring (mantecatura) off the heat is what releases starch to create that signature velvety Italian wave (all’onda).',
    winePairing: 'Barbaresco or Full-bodied Pinot Noir'
  },
  {
    id: 'margherita-pizza',
    title: 'Margherita Pizza',
    subtitle: 'Fresh basil & mozzarella',
    category: 'Main Course',
    price: 16.99,
    rating: 4.8,
    badge: '',
    image: 'images/margherita-pizza.jpg',
    prepTime: '20 mins',
    cookTime: '8 mins',
    calories: '680 kcal',
    tags: ['Wood-Fired', 'Neapolitan', 'Vegetarian'],
    ingredients: [
      '280g slow-fermented Neapolitan pizza dough (72-hour cold retard)',
      '1/2 cup crushed San Marzano D.O.P. tomatoes with sea salt',
      '125g fresh Fior di Latte mozzarella, torn and drained',
      'Fresh Italian sweet basil leaves',
      '2 tbsp Extra virgin olive oil (cold pressed)',
      'Grated Pecorino Romano for dusting'
    ],
    instructions: [
      'Preheat oven with a heavy pizza stone or steel at maximum temperature (500°F / 260°C) for at least 1 hour.',
      'Gently stretch dough by hand on a floured surface, pushing air from the center out into the crust (cornicione). Do not use a rolling pin.',
      'Spoon crushed San Marzano tomatoes evenly over the center, leaving a 1-inch bare border for the crust.',
      'Distribute torn Fior di Latte mozzarella evenly across the sauce. Drizzle with a spiral of extra virgin olive oil.',
      'Slide pizza onto the blazing stone and bake for 6-8 minutes until crust is blistered, charred, and cheese is bubbling.',
      'Immediately garnish with fresh basil leaves and a dusting of Pecorino Romano before slicing.'
    ],
    chefNote: 'Drain the mozzarella on paper towels for 30 minutes before baking to avoid a soggy pizza base.',
    winePairing: 'Chianti Classico or Peroni Nastro Azzurro'
  },
  {
    id: 'mango-passion-mocktail',
    title: 'Mango Passion Mocktail',
    subtitle: 'Tropical refreshing drink',
    category: 'Beverages',
    price: 7.99,
    rating: 4.9,
    badge: 'Popular',
    image: 'images/mango-mocktail.jpg',
    prepTime: '5 mins',
    cookTime: '0 mins',
    calories: '160 kcal',
    tags: ['Non-Alcoholic', 'Zero Proof', 'Fresh Fruit'],
    ingredients: [
      '1/2 cup fresh Alphonso mango purée',
      'Pulp of 2 fresh passion fruits',
      '1 tbsp organic lime juice (freshly squeezed)',
      '1 tbsp agave nectar or mint simple syrup',
      'Chilled sparkling mineral water (San Pellegrino)',
      'Fresh mint sprigs & dehydrated citrus wheels for garnish',
      'Crushed artisanal ice'
    ],
    instructions: [
      'In a cocktail shaker, combine fresh mango purée, passion fruit pulp, lime juice, and agave nectar with ice cubes.',
      'Shake vigorously for 15 seconds until thoroughly chilled and combined.',
      'Fill a tall crystal highball glass with crushed ice.',
      'Strain the tropical mixture into the glass over the ice.',
      'Top gently with sparkling mineral water for a refreshing fizz.',
      'Stir lightly with a cocktail spoon. Garnish with a vibrant fresh mint bouquet and a dehydrated lime wheel.'
    ],
    chefNote: 'Using fresh Alphonso or Honey mangoes provides a naturally sweet, aromatic perfume that needs very little added sugar.',
    winePairing: 'Zero-Proof Pairing: Sparkling Elderflower Tonic'
  },
  {
    id: 'chocolate-lava-cake',
    title: 'Chocolate Lava Cake',
    subtitle: 'Served with vanilla ice cream',
    category: 'Desserts',
    price: 9.99,
    rating: 4.9,
    badge: 'Bestseller',
    image: 'images/lava-cake.jpg',
    prepTime: '15 mins',
    cookTime: '12 mins',
    calories: '540 kcal',
    tags: ['Warm Center', 'Valrhona Cocoa', 'Decadent'],
    ingredients: [
      '120g high-grade bittersweet dark chocolate (70% Valrhona)',
      '100g unsalted French butter',
      '2 whole organic eggs + 2 egg yolks (room temperature)',
      '1/3 cup caster sugar',
      '2 tbsp all-purpose flour, sifted',
      'Pinch of fine sea salt',
      'Bourbon Madagascar vanilla bean ice cream',
      'Fresh organic raspberries & powdered sugar for garnish'
    ],
    instructions: [
      'Preheat oven to 425°F (220°C). Butter four 6-oz ceramic ramekins thoroughly and dust with dark cocoa powder, tapping out any excess.',
      'Melt dark chocolate and butter together in a heatproof bowl set over simmering water until silky smooth. Remove from heat and cool slightly.',
      'In a separate bowl, whisk eggs, egg yolks, sugar, and salt together vigorously until thick, pale, and ribbon-like.',
      'Gently fold melted chocolate into the egg mixture until combined. Sift in flour and fold gently until just incorporated.',
      'Divide batter evenly among prepared ramekins. Place on a baking sheet and bake for 11-12 minutes until edges are firm and center is soft.',
      'Rest for 1 minute, run a thin knife around edges, and invert carefully onto serving plates. Dust with powdered sugar and serve immediately with a scoop of vanilla ice cream.'
    ],
    chefNote: 'Timing is crucial: 1 minute too long turns the molten center into a standard chocolate cake. Check at 11 minutes!',
    winePairing: 'Taylor Fladgate 10 Year Tawny Port'
  }
];

// ============================================================================
// DATABASE CONNECTION & INITIALIZATION
// ============================================================================
let isConnected = false;

async function connectDB() {
  try {
    if (isConnected) return;
    
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    
    isConnected = true;
    console.log(`[MongoDB] Connected successfully to ${MONGODB_URI}`);
    
    // Seed initial dishes if empty
    await seedDishesIfEmpty();
  } catch (err) {
    console.error(`[MongoDB] Connection error:`, err.message);
    isConnected = false;
  }
}

async function seedDishesIfEmpty() {
  try {
    const count = await Dish.countDocuments();
    if (count === 0) {
      console.log(`[MongoDB] Seeding ${SEED_DISHES.length} initial culinary dishes...`);
      await Dish.insertMany(SEED_DISHES);
      console.log(`[MongoDB] Seeding complete!`);
    } else {
      console.log(`[MongoDB] Database already contains ${count} dishes.`);
    }
  } catch (err) {
    console.error(`[MongoDB] Seeding error:`, err.message);
  }
}

// Connection event listeners
mongoose.connection.on('disconnected', () => {
  isConnected = false;
  console.log('[MongoDB] Disconnected.');
});

mongoose.connection.on('reconnected', () => {
  isConnected = true;
  console.log('[MongoDB] Reconnected.');
});

module.exports = {
  connectDB,
  Dish,
  Reservation,
  Order,
  SEED_DISHES,
  getConnectionStatus: () => isConnected
};
