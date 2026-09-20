import
  {
    Activity,
    Apple,
    Brain,
    Droplets,
    Flower2,
    HeartPulse,
    Leaf,
    Moon,
    Salad,
    Scale,
    Sparkles,
    Stethoscope,
    Sun,
  } from "lucide-react";

export const clinic = {
  name: "ShushrutamVed Care",
  tagline: "Where Modern Medicine Meets Natural Healing",
  practice: "Holistic & Integrative Wellness",
  doctor: "Dr. Aarti Sen",
  qualification: "M.Sc. Biotechnology",
  experience: "6+ Years",
  phone: "+91 6260520932",
  phoneHref: "tel:+916260520932",
  whatsapp: "https://wa.me/916260520932",
  email: "draarti.shushrutamvedcare@gmail.com",
  address: "B/86 OM Nagar, Kolar Road, Bhopal Madhya Pradesh 462042",
  hours: [
    { day: "Monday – Friday", time: "9:00 AM – 7:00 PM" },
    { day: "Saturday", time: "9:00 AM – 4:00 PM" },
    { day: "Sunday", time: "Online consultations only" },
  ],
  map: "https://www.google.com/maps?q=B/86+OM+Nagar+Kolar+Road+Bhopal&output=embed",
};

export const specializations = [
  "Molecular Research",
  "Plant Tissue Culture",
  "Oncology Nutrition",
  "Naturopathy",
  "Lifestyle Medicine",
  "Ayurveda",
  "Yoga & Yogasana",
  "Reiki",
  "Panchakarma",
  "Wellness",
];

export const services = [
  {
    title: "Naturopathy Consultation",
    description: "A root-cause consultation that maps your history, habits and healing potential.",
    icon: Leaf,
  },
  {
    title: "Oncology Nutrition Support",
    description:
      "Personalized nutrition guidance for individuals navigating cancer-related care — always alongside, never instead of, your treating oncologist.",
    icon: Apple,
  },
  {
    title: "Diet & Lifestyle Counselling",
    description: "Evidence-led nutrition plans built around your kitchen, culture and routine.",
    icon: Salad,
  },
  {
    title: "Yoga Therapy",
    description: "Therapeutic asana, breathwork and mobility sequencing for your condition.",
    icon: Flower2,
  },
  {
    title: "Stress Management",
    description: "Nervous-system care with guided relaxation, sleep hygiene and mindful routines.",
    icon: Brain,
  },
  {
    title: "Weight Management",
    description: "Sustainable metabolic reset — no crash diets, no supplements you don't need.",
    icon: Scale,
  },
  {
    title: "Detox & Wellness Programs",
    description: "Gentle, medically-guided detox cycles that restore energy and clarity.",
    icon: Sparkles,
  },
  {
    title: "Pain Management",
    description: "Natural therapies for back, neck, knee and joint pain without dependency.",
    icon: Activity,
  },
  {
    title: "Thyroid Lifestyle Support",
    description: "Nutrition and rhythm-based support to stabilise energy, weight and mood.",
    icon: Sun,
  },
  {
    title: "Diabetes Lifestyle Support",
    description: "Glycaemic control through food sequencing, movement and monitoring.",
    icon: HeartPulse,
  },
  {
    title: "Digestive Health Programs",
    description: "Relief from acidity, bloating and constipation by healing the gut lining.",
    icon: Droplets,
  },
  {
    title: "Women's Wellness",
    description: "Hormone-aware care across cycles, fertility, motherhood and menopause.",
    icon: Stethoscope,
  },
  {
    title: "PCOS & Menstrual Health",
    description: "Cycle-syncing protocols to regulate hormones, skin, weight and mood.",
    icon: Moon,
  },
];

export const conditionGroups = [
  {
    group: "Metabolic & Hormonal",
    items: ["Weight Management", "Thyroid", "Diabetes", "PCOS", "High Blood Pressure"],
  },
  {
    group: "Digestive Health",
    items: ["Acidity", "Gas", "Constipation"],
  },
  {
    group: "Pain & Mobility",
    items: ["Back Pain", "Neck Pain", "Knee Pain", "Arthritis"],
  },
  {
    group: "Mind & Sleep",
    items: ["Migraine", "Stress", "Anxiety", "Sleep Disorders"],
  },
];

export const allConditions = conditionGroups.flatMap((g) => g.items);

export const processSteps = [
  {
    title: "Consultation",
    description:
      "A 45-minute conversation about your symptoms, reports, sleep, stress and daily rhythm.",
  },
  {
    title: "Assessment",
    description:
      "Clinical and nutritional evaluation to identify the root cause rather than the symptom.",
  },
  {
    title: "Personalised Plan",
    description:
      "A written protocol covering food, movement, breathwork, sleep and natural therapies.",
  },
  {
    title: "Guided Follow-up",
    description:
      "Scheduled reviews with measurable checkpoints, so the plan adapts as your body responds.",
  },
];

export const trustPoints = [
  {
    title: "6+ Years Experience",
    description: "Clinical practice rooted in biotechnology research and integrative wellness care.",
    icon: Stethoscope,
  },
  {
    title: "Personalised Care",
    description: "No templates. Every protocol is written for one person — you.",
    icon: HeartPulse,
  },
  {
    title: "Holistic Wellness",
    description: "Food, movement, breath and sleep treated as one connected system.",
    icon: Leaf,
  },
  {
    title: "Lifestyle Management",
    description: "Practical habits you can actually keep, long after the programme ends.",
    icon: Sparkles,
  },
];

export const faqs = [
  {
    q: "What happens in the first consultation?",
    a: "We spend around 45 minutes reviewing your health history, current reports, digestion, sleep, stress and daily routine. You leave with clear first steps, not a long list of products.",
  },
  {
    q: "Do I need to stop my existing medication?",
    a: "Never on your own. Our holistic care — Ayurveda, naturopathy, nutrition and lifestyle medicine — works alongside your treating physician. Any change is discussed with you and monitored carefully.",
  },
  {
    q: "Do you offer nutrition support for someone going through cancer treatment?",
    a: "Yes. Our oncology nutrition support offers personalised, evidence-informed nutrition guidance for people navigating cancer-related care. It is a complementary service that always works alongside — never instead of — your treating oncologist and medical team. We do not treat or claim to treat cancer; the focus is nutrition and quality of life within the plan your doctors oversee.",
  },
  {
    q: "How soon will I see results?",
    a: "Most people notice improvements in energy, digestion and sleep within two to four weeks. Hormonal and metabolic conditions typically follow a three to six month arc.",
  },
  {
    q: "Are online consultations available?",
    a: "Yes. Video consultations are available across India, with the same personalised plan, follow-up schedule and WhatsApp support as in-clinic care.",
  },
  {
    q: "Will I be put on a restrictive diet?",
    a: "No. Plans are built around your regional kitchen and family meals. The aim is a way of eating you can sustain, not a diet you dread.",
  },
  {
    q: "Do you support PCOS and thyroid together?",
    a: "Yes. These frequently overlap, and the protocol addresses insulin sensitivity, cycle regulation, sleep and stress as one integrated plan.",
  },
];
