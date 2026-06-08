export const mockChatTemplates = {
  meat: {
    message: "Replacing beef with chicken or plant-based protein 3 times a week would save approximately 650 kg CO2e annually. Over 10 years, this accumulates to 6.5 metric tons of CO2e (equivalent to 295 mature trees absorbing carbon for a year), and saves you approximately $1,800 in grocery costs. It also reduces your water footprint by 450,000 liters!",
    chartData: [
      { year: 0, statusQuo: 0, withAction: 0 },
      { year: 2, statusQuo: 1.3, withAction: 0.5 },
      { year: 4, statusQuo: 2.6, withAction: 1.0 },
      { year: 6, statusQuo: 3.9, withAction: 1.5 },
      { year: 8, statusQuo: 5.2, withAction: 2.0 },
      { year: 10, statusQuo: 6.5, withAction: 2.5 }
    ]
  },
  ev: {
    message: "Switching from a petrol sedan to a mid-range Electric Vehicle (EV) next year will save an average of 3,100 kg CO2e annually. Over a 10-year period, this amounts to 31 metric tons of CO2e (equivalent to 1,410 mature tree-years) and saves you $12,400 in fuel and maintenance costs. The simulation factors in your local grid's current carbon intensity.",
    chartData: [
      { year: 0, statusQuo: 0, withAction: 0 },
      { year: 2, statusQuo: 6.2, withAction: 1.8 },
      { year: 4, statusQuo: 12.4, withAction: 3.6 },
      { year: 6, statusQuo: 18.6, withAction: 5.4 },
      { year: 8, statusQuo: 24.8, withAction: 7.2 },
      { year: 10, statusQuo: 31.0, withAction: 9.0 }
    ]
  },
  solar: {
    message: "Enrolling in community solar will reduce your household electricity carbon footprint to zero. This saves roughly 1,800 kg CO2e annually. Over 10 years, that is 18 metric tons of CO2e saved (equivalent to 818 tree-years) while providing a guaranteed 10% discount on your monthly electric utility bill.",
    chartData: [
      { year: 0, statusQuo: 0, withAction: 0 },
      { year: 2, statusQuo: 3.6, withAction: 0 },
      { year: 4, statusQuo: 7.2, withAction: 0 },
      { year: 6, statusQuo: 10.8, withAction: 0 },
      { year: 8, statusQuo: 14.4, withAction: 0 },
      { year: 10, statusQuo: 18.0, withAction: 0 }
    ]
  },
  general: {
    message: "Based on my current simulation of your lifestyle, your primary carbon drivers are heating (gas) and daily commuting (driving solo). Shifting to a smart thermostat could save 280 kg CO2e/year, and cycling just 2 days a week would cut transit emissions by 40%. Tell me: 'What if I bike to work?' or 'What if I lower my thermostat?' to run a projection.",
    chartData: [
      { year: 0, statusQuo: 0, withAction: 0 },
      { year: 2, statusQuo: 1.5, withAction: 0.8 },
      { year: 4, statusQuo: 3.0, withAction: 1.6 },
      { year: 6, statusQuo: 4.5, withAction: 2.4 },
      { year: 8, statusQuo: 6.0, withAction: 3.2 },
      { year: 10, statusQuo: 7.5, withAction: 4.0 }
    ]
  }
};

export const mockReceipts = [
  {
    id: "rec_1",
    name: "Whole Foods Market Receipt",
    date: "June 06, 2026",
    store: "Whole Foods Market #1024",
    total: "$64.30",
    totalCarbon: 15.6,
    items: [
      { name: "ORGANIC RIBEYE STEAK (0.8 kg)", cost: "$24.99", carbon: 12.4, level: "high", alternative: "Plant-Based Meatballs (-11.2 kg CO2)" },
      { name: "OAT MILK (1.8 L)", cost: "$4.89", carbon: 0.6, level: "low", alternative: "Excellent! Already 70% lower than dairy." },
      { name: "ORGANIC AVOCADOS (4 count)", cost: "$5.99", carbon: 0.8, level: "medium", alternative: "Local Butter Spread (-0.4 kg CO2)" },
      { name: "LOCAL HEIRLOOM APPLES (1.5 kg)", cost: "$4.50", carbon: 0.3, level: "low", alternative: "Great choice! Grown locally within 100 miles." },
      { name: "IMPORTED STRAWBERRIES (0.5 kg)", cost: "$3.93", carbon: 1.5, level: "medium", alternative: "Local Seasonal Berries (-1.1 kg CO2)" }
    ]
  },
  {
    id: "rec_2",
    name: "Starbucks Coffee Receipt",
    date: "June 08, 2026",
    store: "Starbucks #4329",
    total: "$11.45",
    totalCarbon: 1.3,
    items: [
      { name: "GRANDE LATTE (WHOLE MILK)", cost: "$5.45", carbon: 0.9, level: "high", alternative: "Oat Milk Latte (-0.7 kg CO2)" },
      { name: "BUTTER CROISSANT", cost: "$4.25", carbon: 0.4, level: "medium", alternative: "Vegan Berry Muffin (-0.2 kg CO2)" }
    ]
  }
];

export const mockWasteItems = [
  {
    id: "waste_1",
    name: "Starbucks To-Go Coffee Cup",
    image: "☕",
    instructions: [
      { component: "Paper Cup", bin: "Landfill", detail: "Soiled with liquids, paper fibers cannot be recycled.", color: "#ef4444" },
      { component: "Plastic Lid", bin: "Recycle", detail: "Rinse coffee residue off, category #2 plastic is accepted.", color: "#3b82f6" },
      { component: "Cardboard Sleeve", bin: "Compost", detail: "Corrugated brown cardboard is clean and compostable.", color: "#10b981" }
    ]
  },
  {
    id: "waste_2",
    name: "Plastic Water Bottle (PET #1)",
    image: "💧",
    instructions: [
      { component: "PET Bottle", bin: "Recycle", detail: "Empty fully, crush to save space, recycle in standard bin.", color: "#3b82f6" },
      { component: "Cap", bin: "Recycle", detail: "Keep attached so it doesn't get lost in sorting machines.", color: "#3b82f6" }
    ]
  },
  {
    id: "waste_3",
    name: "Cardboard Takeout Container",
    image: "📦",
    instructions: [
      { component: "Leftover Food Scraps", bin: "Compost", detail: "Organic scraps degrade quickly in compost.", color: "#10b981" },
      { component: "Greasy Box", bin: "Compost", detail: "Soiled cardboard is excellent food for microbial compost systems.", color: "#10b981" },
      { component: "Plastic Fork", bin: "Landfill", detail: "Mixed plastics/cutlery are rarely recyclable. Landfill bin.", color: "#ef4444" }
    ]
  }
];

export const mockLeagues = [
  { rank: 1, name: "Sarah Jenkins", points: 840, avatar: "👩‍🔬", streak: true },
  { rank: 2, name: "David Miller", points: 795, avatar: "👨‍💻", streak: true },
  { rank: 3, name: "Elena Rostova", points: 760, avatar: "👩‍🎨", streak: false },
  { rank: 4, name: "Marcus Thorne", points: 720, avatar: "👨‍💼", streak: true },
  { rank: 5, name: "You (Maya)", points: 680, avatar: "👩‍💼", isUser: true, streak: true },
  { rank: 6, name: "Chloe Zhao", points: 645, avatar: "👩‍⚕️", streak: true },
  { rank: 7, name: "Aarav Sharma", points: 610, avatar: "👨‍🎓", streak: false },
  { rank: 8, name: "Sofia Bianchi", points: 580, avatar: "👩‍🌾", streak: true },
  { rank: 9, name: "James Carter", points: 530, avatar: "👨‍🚒", streak: false },
  { rank: 10, name: "Kenji Sato", points: 490, avatar: "👨‍🍳", streak: true }
];

export const mockMarketplaceItems = [
  {
    id: "market_1",
    name: "1-Month E-Bike Rental",
    partner: "Lime / Spin Share",
    cost: 300,
    discount: "20% Off Unlimited Ride Pass",
    desc: "Valid in any city. Redeemable for a full month of E-Bike rentals to encourage carbon-free commutes.",
    code: "LIME-TERRA-20"
  },
  {
    id: "market_2",
    name: "Community Solar Bond Discount",
    partner: "Common Energy",
    cost: 500,
    discount: "$50 Billing Credit",
    desc: "Connect your existing utility account to community solar and get $50 cashback on your first statement.",
    code: "SOLAR-BOND-50"
  },
  {
    id: "market_3",
    name: "Zero-Waste Starter Grocery Box",
    partner: "Imperfect Foods",
    cost: 200,
    discount: "$15 Off First Box",
    desc: "Get organic, slightly misshapen produce rescued from food waste delivered straight to your door.",
    code: "IMPERFECT-WASTE-15"
  },
  {
    id: "market_4",
    name: "Smart Energy Plugs (Pack of 2)",
    partner: "Kasa Smart Home",
    cost: 400,
    discount: "30% Off Purchase",
    desc: "Smart plugs with automated energy tracking that integrates directly with your TerraTwin dashboard.",
    code: "KASA-SMART-30"
  }
];
