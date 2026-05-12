// Bilingual copy dictionary — Swahili + English parity.
// Access via t(lang, key); lang is 'sw' | 'en'.

export type Lang = "sw" | "en";

export const COPY: Record<string, { sw: string; en: string }> = {
  // Brand
  brand: { sw: "SIMBA BIMA", en: "SIMBA BIMA" },
  tagline: { sw: "Nguvu Moja. Kinga Moja.", en: "One Strength. One Protection." },
  tagline_sub: { sw: "Bima rasmi ya Mshabiki", en: "The Lion Protects Its Own" },

  // Onboarding
  welcome: { sw: "Karibu", en: "Welcome" },
  ob_h1: { sw: "Lipa kidogo kila wiki.", en: "Pay a little each week." },
  ob_h2: { sw: "Linda familia yako.", en: "Protect your family." },
  ob_body: {
    sw: "Bima rahisi, kwa lugha yako. Malipo kupitia M-Pesa. Hakuna karatasi.",
    en: "Simple insurance, in your language. Pay with M-Pesa. No paperwork.",
  },
  ob_q1: { sw: "Je, unapanda pikipiki au gari?", en: "Do you ride a motorbike or drive a car?" },
  ob_q1_sub: { sw: "Tutakupendekezea kinga sahihi.", en: "We'll recommend the right cover for you." },
  rider: { sw: "Napanda pikipiki", en: "I ride a motorbike" },
  rider_sub: { sw: "Boda-boda — dereva au abiria", en: "Boda-boda — driver or passenger" },
  driver: { sw: "Nina gari", en: "I drive a car" },
  driver_sub: { sw: "Magari binafsi", en: "Private vehicles" },
  neither: { sw: "Si yoyote", en: "Neither" },
  neither_sub: { sw: "Naponda tu", en: "I walk or commute" },
  get_started: { sw: "ANZA", en: "GET STARTED" },
  continue: { sw: "ENDELEA", en: "CONTINUE" },
  skip: { sw: "Ruka", en: "Skip" },
  language: { sw: "Lugha", en: "Language" },
  phone_login: { sw: "Namba ya simu", en: "Phone number" },
  phone_hint: { sw: "Tumia namba yako ya M-Pesa", en: "Use your M-Pesa number" },
  send_otp: { sw: "TUMA NAMBA YA SIRI", en: "SEND OTP" },
  enter_otp: { sw: "Andika namba ya siri", en: "Enter the code we sent" },
  resend: { sw: "Tuma tena", en: "Resend" },
  verify: { sw: "THIBITISHA", en: "VERIFY" },

  // Home
  hi: { sw: "Mambo", en: "Hi" },
  active_cover: { sw: "Kinga yako", en: "Your cover" },
  days_left: { sw: "Siku zilizobaki wiki hii", en: "Days left this week" },
  weekly_premium: { sw: "Malipo kwa wiki", en: "Weekly premium" },
  base_tier: { sw: "Kinga ya msingi", en: "Base tier" },
  add_on: { sw: "Nyongeza", en: "Add-on" },
  match_day: { sw: "Siku ya mchezo", en: "Match day" },
  match_kicker: { sw: "Funika kabla ya mpira", en: "Cover up before kickoff" },
  vs: { sw: "dhidi ya", en: "vs" },
  file_claim: { sw: "WEKA MADAI", en: "FILE A CLAIM" },
  upgrade: { sw: "PANDISHA", en: "UPGRADE" },
  add_motor: { sw: "ONGEZA GARI", en: "ADD MOTOR" },
  refer: { sw: "MUITE MSHABIKI", en: "REFER A FAN" },
  cover_note: { sw: "HATI YA KINGA", en: "COVER NOTE" },
  quick_actions: { sw: "Vitendo vya haraka", en: "Quick actions" },
  motor_banner_title: { sw: "Una pikipiki?", en: "Got a motorbike?" },
  motor_banner_sub: {
    sw: "Ongeza Boda Shield kwa TSh 920 / wiki",
    en: "Add Boda Shield for TSh 920 / wk",
  },

  // Tiers
  tab_family: { sw: "MIMI NA FAMILIA", en: "ME & FAMILY" },
  tab_motor: { sw: "GARI YANGU", en: "MY VEHICLE" },
  choose: { sw: "Chagua", en: "Choose" },
  per_week: { sw: "/wiki", en: "/wk" },
  per_year: { sw: "/mwaka", en: "/yr" },
  weekly: { sw: "Wiki", en: "Weekly" },
  monthly: { sw: "Mwezi", en: "Monthly" },
  yearly: { sw: "Mwaka", en: "Yearly" },
  popular: { sw: "MSHABIKI WENGI", en: "MOST POPULAR" },
  bundle_with: { sw: "Ongeza kwa", en: "Add to" },

  // Purchase
  step: { sw: "Hatua", en: "Step" },
  of: { sw: "ya", en: "of" },
  confirm_details: { sw: "Thibitisha taarifa", en: "Confirm your details" },
  full_name: { sw: "Jina kamili", en: "Full name" },
  nida: { sw: "Namba ya NIDA", en: "NIDA number" },
  mpesa_no: { sw: "Namba ya M-Pesa", en: "M-Pesa number" },
  vehicle_details: { sw: "Taarifa ya chombo", en: "Vehicle details" },
  reg_no: { sw: "Namba ya usajili", en: "Registration no." },
  make_model: { sw: "Aina / Mfano", en: "Make / Model" },
  scan_reg: { sw: "Piga picha ya kadi", en: "Scan registration card" },
  scan_hint: { sw: "Tutajaza fomu otomatiki", en: "We'll auto-fill the form" },
  review_bundle: { sw: "Kagua bundle yako", en: "Review your bundle" },
  total_weekly: { sw: "Jumla kwa wiki", en: "Weekly total" },
  pay_now: { sw: "LIPA KWA M-PESA", en: "PAY WITH M-PESA" },
  stk_hint: {
    sw: "Utapokea ombi la M-Pesa simuni",
    en: "An M-Pesa request will arrive on your phone",
  },
  covered: { sw: "UMEFUNIKWA", en: "YOU'RE COVERED" },
  covered_sub: { sw: "Hati yako iko tayari", en: "Your cover note is ready" },
  download_note: { sw: "PAKUA HATI", en: "DOWNLOAD NOTE" },
  share_whatsapp: { sw: "TUMA WHATSAPP", en: "SHARE ON WHATSAPP" },

  // Claims
  what_happened: { sw: "Nini kimetokea?", en: "What happened?" },
  pick_one: { sw: "Chagua moja", en: "Pick one" },
  c_moto: { sw: "Ajali ya pikipiki", en: "Motorcycle accident" },
  c_car: { sw: "Ajali ya gari", en: "Car accident" },
  c_hosp: { sw: "Hospitali", en: "Hospital" },
  c_theft: { sw: "Wizi", en: "Theft" },
  c_death: { sw: "Kifo familia", en: "Death in family" },
  c_fire: { sw: "Moto", en: "Fire" },
  add_photos: { sw: "Ongeza picha", en: "Add photos" },
  photos_hint: {
    sw: "Hadi picha 6 — eneo, jeraha, chombo",
    en: "Up to 6 — scene, injury, vehicle",
  },
  voice_note: { sw: "Rekodi sauti", en: "Voice note" },
  voice_hint: { sw: "Eleza kwa kifupi", en: "Briefly describe" },
  submit_claim: { sw: "WASILISHA MADAI", en: "SUBMIT CLAIM" },
  claim_filed: { sw: "MADAI YAMEWEKWA", en: "CLAIM FILED" },
  claim_id: { sw: "Namba ya madai", en: "Claim ID" },
  status_timeline: { sw: "Hali ya madai", en: "Claim status" },
  st_submitted: { sw: "Yamewasilishwa", en: "Submitted" },
  st_review: { sw: "Yanachunguzwa", en: "Under review" },
  st_approved: { sw: "Yameidhinishwa", en: "Approved" },
  st_paid: { sw: "Yamelipwa", en: "Paid" },

  // Wallet
  wallet: { sw: "Pochi", en: "Wallet" },
  pay_method: { sw: "Njia ya malipo", en: "Payment method" },
  primary: { sw: "Kuu", en: "Primary" },
  auto_deduct: { sw: "Kata otomatiki kila wiki", en: "Auto-deduct weekly" },
  pause_cover: { sw: "Simamisha kinga", en: "Pause cover" },
  pause_sub: { sw: "Hadi wiki 2 kwa mwaka", en: "Up to 2 weeks per year" },
  history: { sw: "Historia", en: "History" },
  this_week: { sw: "Wiki hii", en: "This week" },
  last_week: { sw: "Wiki iliyopita", en: "Last week" },
  paid_label: { sw: "ILIYOLIPWA", en: "PAID" },
  due: { sw: "INASUBIRI", en: "DUE" },

  // Profile
  profile: { sw: "Wasifu", en: "Profile" },
  nida_status: { sw: "Hali ya NIDA", en: "NIDA status" },
  verified: { sw: "Imethibitishwa", en: "Verified" },
  dependents: { sw: "Wategemezi", en: "Dependents" },
  vehicles: { sw: "Magari", en: "Vehicles" },
  documents: { sw: "Hati", en: "Documents" },
  logout: { sw: "TOKA", en: "LOG OUT" },
  show_qr: { sw: "Onyesha QR", en: "Show QR" },
  verify_at_roadside: {
    sw: "Kwa ukaguzi wa barabarani",
    en: "For roadside verification",
  },

  // Compliance
  underwriter: {
    sw: "Iliyochukuliwa hatari na MO Assurance Limited, inayodhibitiwa na TIRA",
    en: "Underwritten by MO Assurance Limited, regulated by TIRA",
  },
  tira_no: { sw: "Leseni ya TIRA #UWB/0427/24", en: "TIRA Licence #UWB/0427/24" },
  hospital_disclosure: {
    sw: "Hospital Cash: kiwango cha chini cha masaa 48, hadi siku 5/mwaka",
    en: "Hospital Cash: 48-hour minimum stay, up to 5 days/year",
  },
};

export function t(lang: Lang, key: string): string {
  const v = COPY[key];
  if (!v) return key;
  return v[lang] ?? v.en ?? key;
}

export function fmtTSh(n: number): string {
  return n.toLocaleString("en-US");
}

export const PHOTO = {
  stadiumCrowd:
    "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=900&q=70&auto=format&fit=crop",
  rider:
    "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=900&q=70&auto=format&fit=crop",
  family:
    "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=900&q=70&auto=format&fit=crop",
  fan: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=900&q=70&auto=format&fit=crop",
  match:
    "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=900&q=70&auto=format&fit=crop",
  portrait:
    "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=900&q=70&auto=format&fit=crop",
  boda: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1400&q=70&auto=format&fit=crop",
};
