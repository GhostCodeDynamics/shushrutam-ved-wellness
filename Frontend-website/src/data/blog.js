import aboutNature from "@/assets/about-nature.jpg";
import leafTexture from "@/assets/leaf-texture.jpg";

export const blogCategories = [
  "All",
  "Hormonal Health",
  "Gut Health",
  "Mind & Sleep",
  "Weight & Metabolism",
];

export const blogPosts = [
  {
    slug: "pcos-cycle-syncing-beginners-guide",
    title: "PCOS, Simplified: A Beginner's Guide to Cycle-Syncing",
    excerpt:
      "Irregular cycles, stubborn weight, acne that won't quit — PCOS feels chaotic, but your hormones follow patterns. Here's how we read them, and where to begin.",
    category: "Hormonal Health",
    date: "12 Aug 2026",
    readTime: "7 min read",
    image: aboutNature,
    imageAlt: "Fresh herbs, seeds and balanced food arranged on natural linen",
    takeaways: [
      "PCOS is driven largely by insulin sensitivity — food sequencing matters more than food fear.",
      "Track three things for one month: cycle days, sleep hours, and energy after meals.",
      "Strength training twice a week improves insulin response more than daily cardio alone.",
      "Change is measured over 3–6 cycles, not 3–6 days.",
    ],
    content: [
      {
        type: "p",
        text: "Polycystic Ovary Syndrome is one of the most common concerns we see at ShushrutamVed Care — and one of the most misunderstood. PCOS is not a disease you 'catch'; it is a pattern of hormonal signalling, most often involving insulin resistance, elevated androgens and disrupted ovulation. The good news: patterns can be re-patterned.",
      },
      {
        type: "h2",
        text: "Start with observation, not restriction",
      },
      {
        type: "p",
        text: "Before changing anything, we ask patients to track three things for one full month: the length of their cycle, their sleep hours, and their energy levels after meals. This simple log reveals more than most lab reports — it shows whether blood sugar swings, undersleeping or chronic stress is driving the picture.",
      },
      {
        type: "h2",
        text: "Food sequencing beats food fear",
      },
      {
        type: "p",
        text: "You don't need to give up roti, rice or your family kitchen. What matters enormously is the order and composition of meals: vegetables and protein first, slow carbs alongside (not alone), and refined sugar kept to post-meal windows rather than empty-stomach snacking. This single habit steadies insulin — and insulin steadies almost everything downstream in PCOS.",
      },
      {
        type: "h2",
        text: "Move muscle, not just calories",
      },
      {
        type: "p",
        text: "Two sessions of strength or resistance work per week — bodyweight squats, bands, light dumbbells — improve insulin sensitivity more reliably than an hour of daily treadmill walking. Add a 10-minute walk after your largest meal and you have a protocol most women can sustain for years.",
      },
      {
        type: "list",
        items: [
          "Protein at breakfast within 90 minutes of waking",
          "A 10-minute walk after lunch and dinner",
          "A fixed sleep window, even on weekends",
          "Strength training twice a week",
        ],
      },
      {
        type: "p",
        text: "Expect the arc to take three to six cycles. Hormones move slowly and then suddenly — most of our patients report better energy and digestion first, steadier cycles second, and skin and weight changes last. That order is normal, and it is how you know healing is happening from the inside out.",
      },
    ],
  },
  {
    slug: "thyroid-weight-energy-rhythm",
    title: "Thyroid & Weight: Why Energy Rhythm Matters More Than Willpower",
    excerpt:
      "Eating less but gaining more? With thyroid imbalance, the issue is rarely discipline — it's rhythm. How sleep, meal timing and stress shape your metabolism.",
    category: "Hormonal Health",
    date: "28 Jul 2026",
    readTime: "6 min read",
    image: leafTexture,
    imageAlt: "Soft green botanical leaves in natural light",
    takeaways: [
      "Thyroid hormones follow a daily rhythm — irregular sleep and meals flatten that rhythm.",
      "Very-low-calorie diets can suppress thyroid output further; gentle deficits win long-term.",
      "Morning light, fixed meal times and adequate protein are first-line lifestyle tools.",
      "Never adjust thyroid medication without your treating physician.",
    ],
    content: [
      {
        type: "p",
        text: "One of the most frustrating sentences we hear in clinic is: 'I barely eat, and I still gain weight.' For people managing hypothyroidism, this is a real physiological experience — not an excuse. When thyroid output dips, basal metabolic rate drops, digestion slows, and the body holds energy defensively.",
      },
      {
        type: "h2",
        text: "Your thyroid keeps time",
      },
      {
        type: "p",
        text: "Thyroid hormones follow a circadian rhythm. Late nights, skipped breakfasts and erratic meal timings flatten that rhythm, so the gland never gets a clean signal. The first prescription in our thyroid protocols is almost never a food — it is a schedule: fixed wake time, daylight within an hour of waking, and meals at roughly the same hours daily.",
      },
      {
        type: "h2",
        text: "Eat enough to heal",
      },
      {
        type: "p",
        text: "Crash diets are uniquely counterproductive here. Sharp calorie restriction signals scarcity, which can further suppress thyroid conversion of T4 to active T3. Our approach uses a gentle deficit built on adequate protein (roughly a palm-sized portion per meal), cooked vegetables, and sufficient calories to support daily movement.",
      },
      {
        type: "list",
        items: [
          "Fixed wake–sleep window, 7–8 hours of sleep",
          "Protein with every meal, especially breakfast",
          "Selenium and iodine from food (eggs, fish, dairy, iodised salt) — not mega-dose supplements",
          "Daily 20–30 minute walk, plus twice-weekly strength work",
        ],
      },
      {
        type: "p",
        text: "A final, non-negotiable note: our nutrition and lifestyle support works alongside your endocrinologist, never instead of them. Medication decisions belong to you and your doctor together — our role is to make the lifestyle foundation so strong that your reports, energy and weight steadily move in the right direction.",
      },
    ],
  },
  {
    slug: "acidity-bloating-heal-your-gut-lining",
    title: "Acidity & Bloating: Healing the Gut Lining, Not Just Silencing It",
    excerpt:
      "Antacids quiet the burn but don't heal the cause. An integrative view of acidity, gas and constipation — and the 4-week gut reset we actually use.",
    category: "Gut Health",
    date: "9 Jul 2026",
    readTime: "8 min read",
    image: aboutNature,
    imageAlt: "Herbal ingredients, seeds and infused water for digestive wellness",
    takeaways: [
      "Most acidity is a rhythm problem (late meals, fast eating, low chewing) before it is a food problem.",
      "A 3-hour gap between dinner and sleep resolves night-time acidity for most people.",
      "Chew count, meal spacing and hydration timing beat elimination diets as first steps.",
      "Persistent or alarming symptoms always deserve proper medical evaluation first.",
    ],
    content: [
      {
        type: "p",
        text: "Acidity, gas and constipation are so common that many people accept them as personality traits. They aren't. In our experience, most digestive complaints trace back to three correctable habits: eating too fast, eating too late, and drinking too little water between (not during) meals.",
      },
      {
        type: "h2",
        text: "The 3-hour dinner rule",
      },
      {
        type: "p",
        text: "If you take one thing from this article: finish dinner at least three hours before sleep. Lying down on a full stomach is the single biggest driver of night-time reflux we observe. An early, lighter dinner — khichdi, soup-stew, or vegetables with a small grain portion — resolves symptoms for a surprising share of patients within two weeks.",
      },
      {
        type: "h2",
        text: "Chew like it matters (it does)",
      },
      {
        type: "p",
        text: "Digestion begins in the mouth, and most of us outsource that job to the stomach. Twenty to thirty chews per bite, phones kept aside, and a pause halfway through the meal activate the parasympathetic 'rest and digest' state. Patients often laugh at this prescription — until their bloating halves.",
      },
      {
        type: "list",
        items: [
          "Dinner 3 hours before bed; keep it light and warm",
          "Water between meals, small sips with meals",
          "One fermented food daily — curd, buttermilk or kanji",
          "A short, slow walk after meals instead of sitting",
        ],
      },
      {
        type: "p",
        text: "Where symptoms persist beyond four weeks of disciplined rhythm, or where there are red flags — difficulty swallowing, unexplained weight loss, blood in stool, persistent vomiting — see your physician promptly. Natural care is powerful, and part of its discipline is knowing when the body needs investigation first.",
      },
    ],
  },
  {
    slug: "sleep-protocol-fall-asleep-faster",
    title: "The Sleep Protocol: Fall Asleep Faster Without Pills",
    excerpt:
      "You can't force sleep, but you can invite it. The wind-down sequence, light discipline and morning anchors behind our most successful sleep recoveries.",
    category: "Mind & Sleep",
    date: "21 Jun 2026",
    readTime: "6 min read",
    image: leafTexture,
    imageAlt: "Calm green leaves — rest, breath and sleep",
    takeaways: [
      "Sleep is prepared in the morning (daylight) as much as at night (dimming).",
      "A fixed wake time matters more than a fixed bedtime.",
      "Screens aren't the only stimulant — late arguments, heavy late dinners and intense late workouts count too.",
      "Give any sleep protocol a full 14 nights before judging it.",
    ],
    content: [
      {
        type: "p",
        text: "Sleep complaints have quietly become one of our top three consultation reasons. The pattern is familiar: exhausted at midnight, alert at 1 AM, groggy at 7 AM. Most sleep difficulty we see isn't a broken sleep system — it's a confused circadian clock, and clocks can be reset.",
      },
      {
        type: "h2",
        text: "Anchor the morning first",
      },
      {
        type: "p",
        text: "Counterintuitively, we begin sleep treatment at sunrise. Bright outdoor light within an hour of waking sets the timer for melatonin release roughly fourteen hours later. Patients who 'can't fall asleep before 2 AM' are often simply people whose eyes haven't seen morning daylight in months. A fixed wake time — weekends included — is the highest-leverage sleep habit that exists.",
      },
      {
        type: "h2",
        text: "Build a 45-minute runway",
      },
      {
        type: "p",
        text: "Sleep needs a runway, not a crash landing. Dim the lights, move the phone out of the bedroom (an alarm clock costs very little), take a warm shower, and spend ten minutes on slow breathing — inhale for four counts, exhale for six. This isn't mysticism; extended exhales measurably downshift the nervous system toward sleep.",
      },
      {
        type: "list",
        items: [
          "Same wake time daily, daylight within an hour",
          "No caffeine after 2 PM; no heavy dinner after 8 PM",
          "45-minute dim-light wind-down, phone outside the room",
          "4-6 breathing for 10 minutes in bed",
        ],
      },
      {
        type: "p",
        text: "Judge the protocol after fourteen consistent nights, not three. Sleep architecture rebuilds gradually — first you fall asleep slightly faster, then night wakings shorten, and finally mornings feel genuinely different. That progression is the signature of a clock coming back into rhythm.",
      },
    ],
  },
  {
    slug: "sustainable-weight-loss-no-crash-diets",
    title: "Sustainable Weight Loss: The Metabolic Reset Without Crash Diets",
    excerpt:
      "Lost 5 kg, regained 7? The crash-diet cycle breaks metabolisms and morale alike. What a gentle, keepable fat-loss protocol actually looks like.",
    category: "Weight & Metabolism",
    date: "2 Jun 2026",
    readTime: "7 min read",
    image: aboutNature,
    imageAlt: "Wholesome natural foods, seeds and grains for balanced nutrition",
    takeaways: [
      "Aim for 0.4–0.6 kg per week — faster almost always rebounds.",
      "Protein and strength training protect muscle, which protects metabolism.",
      "Track waist, energy and sleep — the scale alone lies by hydration.",
      "The plan you can follow for 2 years beats the plan that works for 2 weeks.",
    ],
    content: [
      {
        type: "p",
        text: "Almost every weight consultation at our clinic begins with the same history: a strict diet that worked brilliantly for a month, then a rebound that left the person heavier than before. This is not a failure of character — it is the predictable physiology of aggressive restriction: muscle loss, metabolic adaptation, and a hunger system that roars back.",
      },
      {
        type: "h2",
        text: "Slow is fast",
      },
      {
        type: "p",
        text: "Our target is deliberately unglamorous: roughly half a kilo per week. At that pace the body sheds fat while preserving muscle, hunger stays manageable, and — critically — the habits forming underneath are ones you can keep indefinitely. A plan you abandon is not a plan that works; it is a plan that harms.",
      },
      {
        type: "h2",
        text: "Eat from your own kitchen",
      },
      {
        type: "p",
        text: "No imported superfoods required. Dal, eggs, curd, peanuts, seasonal vegetables, whole grains in measured portions — the Indian kitchen already contains everything a metabolic reset needs. Our diet plans are written around what your family actually cooks, because a separate 'diet menu' survives about eleven days in any real household.",
      },
      {
        type: "list",
        items: [
          "Half-plate vegetables at lunch and dinner",
          "A palm of protein at every meal",
          "8,000–10,000 steps daily, in any splits",
          "Strength work twice a week; sleep 7+ hours",
        ],
      },
      {
        type: "p",
        text: "Measure more than weight: waist circumference monthly, energy on a 1–10 scale weekly, and how your clothes fit. When those three move and the scale stalls, you are usually mid-recomposition — losing fat, keeping muscle — which is exactly the outcome worth celebrating.",
      },
    ],
  },
  {
    slug: "stress-breathwork-calm-nervous-system",
    title: "Stressed All Day, Wired All Night? Calming the Nervous System",
    excerpt:
      "Headaches, jaw tightness, shallow breath, 3 AM wakefulness — the body keeps the score of chronic stress. Practical nervous-system care you can start today.",
    category: "Mind & Sleep",
    date: "18 May 2026",
    readTime: "5 min read",
    image: leafTexture,
    imageAlt: "Green foliage — calm, breath and nervous-system recovery",
    takeaways: [
      "Chronic stress is a body state, not just a mind state — treat it through the body.",
      "Two minutes of slow exhale breathing can measurably lower acute tension.",
      "Non-negotiable daily anchors (walk, daylight, wind-down) outperform occasional retreats.",
      "Ongoing anxiety or low mood deserves professional support — reaching out is strength.",
    ],
    content: [
      {
        type: "p",
        text: "Stress has become background noise — constant notifications, long commutes, financial pressure, caregiving. The nervous system adapts by staying half-activated all the time: shallow breathing, tight shoulders, a gut that never quite settles. Over months, this 'wired' baseline shows up as migraine, acidity, insomnia and hormonal disruption.",
      },
      {
        type: "h2",
        text: "Talk to the body first",
      },
      {
        type: "p",
        text: "You cannot think your way out of a body state, but you can breathe your way toward one. The physiological sigh — two short inhales through the nose followed by one long exhale through the mouth, repeated for two minutes — is the fastest tool we teach. Use it before difficult meetings, in traffic, or at 3 AM when the mind loops.",
      },
      {
        type: "h2",
        text: "Anchors beat escapes",
      },
      {
        type: "p",
        text: "A yearly vacation cannot compensate for 350 dysregulated days. What works is boring and daily: a morning walk without podcasts, one real lunch break away from screens, an evening wind-down. Patients resist this advice because it seems too small — then report, three weeks later, that the small things changed everything.",
      },
      {
        type: "list",
        items: [
          "Physiological sighs: 2 minutes, twice daily",
          "One screen-free walk every day",
          "A written 'closing ritual' to end the workday",
          "Consistent sleep window as non-negotiable",
        ],
      },
      {
        type: "p",
        text: "And an important boundary: lifestyle tools support everyday stress beautifully, but persistent anxiety, panic, or low mood that interferes with work and relationships deserves professional mental-health care. Our holistic care walks alongside that support — if you're struggling, please reach out to a qualified counsellor or psychiatrist as well as us.",
      },
    ],
  },
];

export function getPost(slug) {
  return blogPosts.find((p) => p.slug === slug);
}

export function getRelated(slug, count = 3) {
  const current = getPost(slug);
  if (!current) return blogPosts.slice(0, count);
  const sameCategory = blogPosts.filter((p) => p.slug !== slug && p.category === current.category);
  const others = blogPosts.filter((p) => p.slug !== slug && p.category !== current.category);
  return [...sameCategory, ...others].slice(0, count);
}
