/* ============================================================
   BYCYCLE — Product Catalog (10 models, real photography)
   Photos: Pexels (free license, no attribution required)
   ============================================================ */

const COLOR_PALETTE = [
  { name: 'Matte Black',    hex: '#1c1c1e' },
  { name: 'Gloss Black',    hex: '#0a0a0c' },
  { name: 'Graphite Grey',  hex: '#4b4f57' },
  { name: 'Silver',         hex: '#b7bcc4' },
  { name: 'Cloud White',    hex: '#f2f3f5' },
  { name: 'Ivory',          hex: '#e9e2d0' },
  { name: 'Volt Green',     hex: '#b6ff3c' },
  { name: 'Forest Green',   hex: '#2f5233' },
  { name: 'Olive',          hex: '#5c5f3a' },
  { name: 'Teal',           hex: '#1f7a72' },
  { name: 'Sky Blue',       hex: '#5aa9e6' },
  { name: 'Cobalt Blue',    hex: '#2451c9' },
  { name: 'Navy',           hex: '#1b2a4a' },
  { name: 'Indigo',         hex: '#4b3f8f' },
  { name: 'Violet',         hex: '#8b5fbf' },
  { name: 'Magenta',        hex: '#c23b8f' },
  { name: 'Blush Pink',     hex: '#e58fa6' },
  { name: 'Crimson',        hex: '#b5192b' },
  { name: 'Racing Red',     hex: '#e0212c' },
  { name: 'Burnt Orange',   hex: '#c9542f' },
  { name: 'Amber',          hex: '#d98e2b' },
  { name: 'Mustard',        hex: '#d1a92e' },
  { name: 'Sunflower',      hex: '#f0c419' },
  { name: 'Copper',         hex: '#a9673b' }
];


const CATALOG = {
  urban: {
    id: 'urban', badge: 'Urban', name: 'Blackline Urban', price: 1199,
    tagline: 'Nimble commuter build with upright geometry and puncture-resistant tires.',
    description: 'The Blackline Urban is built for the daily commute — an upright riding position, quick-accelerating alloy frame, and puncture-resistant tires that shrug off city streets.',
    specs: [['Frame weight','9.4kg'],['Drivetrain','9-speed'],['Brakes','Hydraulic disc'],['Wheel size','700c'],['Finish','Custom powder-coat']],
    sizes: ['S','M','L'],
    photo: 'https://images.pexels.com/photos/12470022/pexels-photo-12470022.jpeg?w=1000&q=80',
    photoCredit: 'Photo via Pexels'
  },
  trail: {
    id: 'trail', badge: 'Trail', name: 'Blackline Trail', price: 1799,
    tagline: 'Wide-tread suspension fork and reinforced frame for rough terrain.',
    description: 'The Blackline Trail trades speed for confidence on rough ground — a reinforced frame, wide-tread rubber, and a suspension fork tuned for roots, rocks, and everything in between.',
    specs: [['Frame weight','11.2kg'],['Drivetrain','12-speed'],['Brakes','Hydraulic disc'],['Wheel size','29"'],['Finish','Custom powder-coat']],
    sizes: ['S','M','L','XL'],
    photo: 'assets/trail/side_blue.jpg',
    photoCredit: 'BYCYCLE studio photography',
    // real photographed color variants — clicking a swatch swaps to an actual
    // photo of that finish, it never fakes it by filtering the original image
    colorPhotos: [
      { name: 'Cobalt Blue',   hex: '#2451c9', side: 'assets/trail/side_blue.jpg',   close: 'assets/trail/close_blue.jpg' },
      { name: 'Burnt Orange',  hex: '#c9542f', side: 'assets/trail/side_orange.jpg', close: 'assets/trail/close_orange.jpg' },
      { name: 'Cloud White',   hex: '#f2f3f5', side: 'assets/trail/side_white.jpg',  close: 'assets/trail/close_white.jpg' }
    ]
  },
  backcountry: {
    id: 'backcountry', badge: 'Trail', name: 'Blackline Backcountry', price: 1949,
    tagline: 'Long-travel geometry built for all-day climbs and technical descents.',
    description: 'The Backcountry stretches the Trail platform for bigger days out — longer travel, a slacker head angle, and a frame tuned to stay composed on the way down as much as the way up.',
    specs: [['Frame weight','12.0kg'],['Drivetrain','12-speed'],['Brakes','Hydraulic disc'],['Wheel size','29"'],['Finish','Custom powder-coat']],
    sizes: ['M','L','XL'],
    photo: 'assets/trail/side_gray.jpg',
    photoCredit: 'BYCYCLE studio photography',
    colorPhotos: [
      { name: 'Graphite Grey',  hex: '#4b4f57', side: 'assets/trail/side_gray.jpg',           close: 'assets/trail/close_gray.jpg' },
      { name: 'Volt Green',     hex: '#b6ff3c', side: 'assets/trail/side_green.jpg',          close: 'assets/trail/close_green.jpg' },
      { name: 'Trail Lime',     hex: '#8bd93c', side: 'assets/trail/side_limegreen_rack.jpg', close: 'assets/trail/close_limegreen_rack.jpg' }
    ]
  },
  race: {
    id: 'race', badge: 'Race', name: 'Blackline Race', price: 2399,
    tagline: 'Aero-profile tubing and a stiff drivetrain built for competitive pace.',
    description: 'The Blackline Race is the fastest frame we build — aero-profile tubing, a stiff bottom bracket for maximum power transfer, and a race-tuned drivetrain.',
    specs: [['Frame weight','7.8kg'],['Drivetrain','12-speed'],['Brakes','Hydraulic disc'],['Wheel size','700c'],['Finish','Custom powder-coat']],
    sizes: ['XS','S','M','L'],
    photo: 'https://images.pexels.com/photos/11292520/pexels-photo-11292520.jpeg?w=1000&q=80',
    photoCredit: 'Photo via Pexels'
  },
  gravel: {
    id: 'gravel', badge: 'Gravel', name: 'Blackline Gravel', price: 1699,
    tagline: 'Wide-clearance frame built to move fast between pavement and dirt.',
    description: 'Built for routes that mix pavement, gravel, and everything between — wider tire clearance, a slightly relaxed geometry, and mounts for the gear a long day out demands.',
    specs: [['Frame weight','9.9kg'],['Drivetrain','11-speed'],['Brakes','Hydraulic disc'],['Wheel size','700c'],['Finish','Custom powder-coat']],
    sizes: ['S','M','L'],
    photo: 'https://images.pexels.com/photos/17719833/pexels-photo-17719833.jpeg?w=1000&q=80',
    photoCredit: 'Photo via Pexels'
  },
  heritage: {
    id: 'heritage', badge: 'Heritage', name: 'Blackline Heritage', price: 1049,
    tagline: 'Classic silhouette with a modern drivetrain underneath.',
    description: 'A classic silhouette built for riders who want timeless lines without giving up modern reliability — a smooth-shifting drivetrain hides under a heritage-inspired frame.',
    specs: [['Frame weight','10.6kg'],['Drivetrain','7-speed'],['Brakes','Mechanical disc'],['Wheel size','700c'],['Finish','Custom powder-coat']],
    sizes: ['S','M','L'],
    photo: 'https://images.pexels.com/photos/10312626/pexels-photo-10312626.jpeg?w=1000&q=80',
    photoCredit: 'Photo via Pexels'
  },
  studio: {
    id: 'studio', badge: 'Heritage', name: 'Blackline Studio', price: 1149,
    tagline: 'A minimalist, single-tone frame designed for clean city miles.',
    description: 'Pared back to the essentials — one clean tone, a light frame, and just enough gearing for city hills without the extra weight of a full drivetrain.',
    specs: [['Frame weight','9.1kg'],['Drivetrain','Single-speed'],['Brakes','Mechanical disc'],['Wheel size','700c'],['Finish','Custom powder-coat']],
    sizes: ['S','M','L'],
    photo: 'https://images.pexels.com/photos/28216069/pexels-photo-28216069.jpeg?w=1000&q=80',
    photoCredit: 'Photo via Pexels'
  },
  coastal: {
    id: 'coastal', badge: 'Cruiser', name: 'Blackline Coastal', price: 899,
    tagline: 'Relaxed cruiser geometry built for boardwalks and slow afternoons.',
    description: 'An easy-going cruiser with swept-back bars and a relaxed riding position built for boardwalks, not commutes.',
    specs: [['Frame weight','11.8kg'],['Drivetrain','3-speed'],['Brakes','Coaster + rim'],['Wheel size','26"'],['Finish','Custom powder-coat']],
    sizes: ['One Size'],
    photo: 'https://images.pexels.com/photos/28216176/pexels-photo-28216176.jpeg?w=1000&q=80',
    photoCredit: 'Photo via Pexels'
  },
  fold: {
    id: 'fold', badge: 'Fold', name: 'Blackline Fold', price: 999,
    tagline: 'Compact folding frame that fits in a trunk, a closet, or a train.',
    description: 'The Blackline Fold folds down in under fifteen seconds without sacrificing the ride quality the Blackline name is built on.',
    specs: [['Frame weight','8.1kg'],['Drivetrain','8-speed'],['Brakes','Mechanical disc'],['Wheel size','20"'],['Finish','Custom powder-coat']],
    sizes: ['One Size'],
    photo: 'https://images.pexels.com/photos/10963099/pexels-photo-10963099.jpeg?w=1000&q=80',
    photoCredit: 'Photo via Pexels'
  },
  dualtone: {
    id: 'dualtone', badge: 'Street', name: 'Blackline Dual-Tone', price: 1349,
    tagline: 'A street-tuned build with a lively frame and quick steering.',
    description: 'A playful, street-tuned build — a slightly shorter wheelbase for quick steering through traffic, paired with a lively frame that rewards a bit of speed.',
    specs: [['Frame weight','9.7kg'],['Drivetrain','10-speed'],['Brakes','Hydraulic disc'],['Wheel size','700c'],['Finish','Custom powder-coat']],
    sizes: ['S','M','L'],
    photo: 'https://images.pexels.com/photos/12950641/pexels-photo-12950641.jpeg?w=1000&q=80',
    photoCredit: 'Photo via Pexels'
  }
};
