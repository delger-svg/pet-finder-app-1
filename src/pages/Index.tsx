import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

type Theme = "light" | "dark" | "system";
type Lang = "ru" | "en";

const T: Record<Lang, Record<string, string>> = {
  ru: {
    feed: "Лента", search: "Поиск", map: "Карта", chat: "Чат", favorites: "Избранное", profile: "Профиль",
    nearYou: "Рядом с тобой", allPets: "Все →", newsTitle: "Новости и объявления",
    heroSub: "Сегодня ищут дом", heroCta: "Помочь сейчас →", heroCount: "128 питомцев",
    searchPlaceholder: "Имя или порода...", allTypes: "Все виды", allCities: "Все города",
    found: "Найдено:", notFound: "Питомцев не найдено", changeFilters: "Попробуй изменить фильтры",
    mapTitle: "Карта питомцев", mapSub: "Москва и окрестности", nearest: "Ближайшие питомцы",
    details: "Подробнее", youAreHere: "📍 Вы здесь",
    chatTitle: "Чат", online: "● Онлайн", messagePlaceholder: "Написать сообщение...",
    favTitle: "Избранное", favSaved: "питомца сохранено", favEmpty: "Пока пусто",
    favHint: "Нажми ❤️ на карточке питомца,\nчтобы добавить в избранное", findPet: "Найти питомца",
    profileName: "Александра", profileCity: "Москва", profileSince: "С нами с марта 2024",
    myPets: "Мои питомцы", add: "Добавить", notifications: "Уведомления", enabled: "Включены",
    security: "Безопасность", verified: "Верифицирован", support: "Поддержка", settings: "Настройки",
    logout: "Выйти из аккаунта", writeTo: "Написать хозяину",
    settingsTitle: "Настройки", themeLabel: "Тема", langLabel: "Язык",
    themeLight: "Светлая", themeDark: "Тёмная", themeSystem: "Системная",
    langRu: "Русский", langEn: "English", close: "Готово",
    statsAnimals: "Питомца", statsFav: "Избранных", statsMsgs: "Сообщений",
  },
  en: {
    feed: "Feed", search: "Search", map: "Map", chat: "Chat", favorites: "Favorites", profile: "Profile",
    nearYou: "Near you", allPets: "All →", newsTitle: "News & Announcements",
    heroSub: "Looking for a home today", heroCta: "Help now →", heroCount: "128 pets",
    searchPlaceholder: "Name or breed...", allTypes: "All types", allCities: "All cities",
    found: "Found:", notFound: "No pets found", changeFilters: "Try changing filters",
    mapTitle: "Pet Map", mapSub: "Moscow & surroundings", nearest: "Nearest pets",
    details: "Details", youAreHere: "📍 You are here",
    chatTitle: "Chat", online: "● Online", messagePlaceholder: "Write a message...",
    favTitle: "Favorites", favSaved: "pets saved", favEmpty: "Nothing here yet",
    favHint: "Tap ❤️ on a pet card\nto add to favorites", findPet: "Find a pet",
    profileName: "Alexandra", profileCity: "Moscow", profileSince: "With us since March 2024",
    myPets: "My pets", add: "Add", notifications: "Notifications", enabled: "Enabled",
    security: "Security", verified: "Verified", support: "Support", settings: "Settings",
    logout: "Sign out", writeTo: "Message owner",
    settingsTitle: "Settings", themeLabel: "Theme", langLabel: "Language",
    themeLight: "Light", themeDark: "Dark", themeSystem: "System",
    langRu: "Русский", langEn: "English", close: "Done",
    statsAnimals: "Pets", statsFav: "Favorites", statsMsgs: "Messages",
  },
};

const DOG_IMG = "https://cdn.poehali.dev/projects/48dbc168-ef97-4112-a5d9-8f2497e37ea1/files/1b1d1e9e-ba73-4297-b83a-f6d8a7ad2024.jpg";
const CAT_IMG = "https://cdn.poehali.dev/projects/48dbc168-ef97-4112-a5d9-8f2497e37ea1/files/08d15c17-5cf2-4e17-84ea-d9d823d73a41.jpg";
const RABBIT_IMG = "https://cdn.poehali.dev/projects/48dbc168-ef97-4112-a5d9-8f2497e37ea1/files/1dfe1ff9-61be-44c4-9aa0-f7f4f60e9b6e.jpg";
const COLLIE_IMG = "https://cdn.poehali.dev/projects/48dbc168-ef97-4112-a5d9-8f2497e37ea1/files/e3198954-4aa1-4cfa-affc-138db054fa26.jpg";

type Tab = "feed" | "search" | "map" | "chat" | "favorites" | "profile";

const pets = [
  { id: 1, name: "Барсик", breed: "Золотистый ретривер", age: "2 года", city: "Москва", type: "Собака", img: DOG_IMG, desc: "Ласковый и игривый пёс, обожает детей и прогулки в парке." },
  { id: 2, name: "Мурка", breed: "Рыжий табби", age: "1 год", city: "Санкт-Петербург", type: "Кошка", img: CAT_IMG, desc: "Спокойная кошечка, ищет уютный дом с хозяином на диване." },
  { id: 3, name: "Снежок", breed: "Нидерландский карликовый", age: "8 месяцев", city: "Казань", type: "Кролик", img: RABBIT_IMG, desc: "Пушистый и любопытный, любит морковку и свежую зелень." },
  { id: 4, name: "Рекс", breed: "Бордер колли", age: "3 года", city: "Москва", type: "Собака", img: COLLIE_IMG, desc: "Активный и умный пёс, знает более 20 команд. Нужен активный хозяин!" },
];

const news = [
  { id: 1, title: "Приют «Лапки» нашёл дом для 50 кошек за месяц", time: "2 часа назад", emoji: "🐱", tag: "Новость" },
  { id: 2, title: "Новые правила выгула собак в Москве с июня", time: "5 часов назад", emoji: "📋", tag: "Важно" },
  { id: 3, title: "История Рекса: как пёс пережил зиму на улице", time: "вчера", emoji: "🐶", tag: "История" },
  { id: 4, title: "Ветеринарная клиника дарит бесплатные прививки", time: "вчера", emoji: "💉", tag: "Акция" },
];

const initMessages = [
  { id: 1, user: "Анна К.", avatar: "🦋", text: "Здравствуйте! Расскажите подробнее о Барсике?", time: "14:22", isMe: false },
  { id: 2, user: "Я", avatar: "😊", text: "Привет! Барсик очень дружелюбный, любит играть с мячом.", time: "14:25", isMe: true },
  { id: 3, user: "Анна К.", avatar: "🦋", text: "Отлично! Можно договориться о встрече?", time: "14:27", isMe: false },
  { id: 4, user: "Я", avatar: "😊", text: "Конечно, пишите удобное время!", time: "14:28", isMe: true },
];

const mapPets = [
  { id: 1, name: "Барсик", type: "🐕", x: 30, y: 40, city: "Парк Горького" },
  { id: 2, name: "Мурка", type: "🐈", x: 55, y: 25, city: "Тверской район" },
  { id: 3, name: "Снежок", type: "🐇", x: 70, y: 60, city: "Хамовники" },
  { id: 4, name: "Рекс", type: "🐕", x: 20, y: 65, city: "Замоскворечье" },
];

export default function Index() {
  const [activeTab, setActiveTab] = useState<Tab>("feed");
  const [favorites, setFavorites] = useState<number[]>([2]);
  const [selectedPet, setSelectedPet] = useState<typeof pets[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("Все");
  const [filterCity, setFilterCity] = useState("Все города");
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState(initMessages);
  const [mapSelected, setMapSelected] = useState<typeof mapPets[0] | null>(null);
  const [theme, setTheme] = useState<Theme>("light");
  const [lang, setLang] = useState<Lang>("ru");
  const [showSettings, setShowSettings] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showNewAd, setShowNewAd] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Александра", city: "Москва", phone: "+7 900 123-45-67", about: "Люблю животных, особенно собак 🐾",
  });
  const [editProfile, setEditProfile] = useState(profileData);
  const [ads, setAds] = useState([
    { id: 1, petName: "Барсик", type: "Собака", breed: "Золотистый ретривер", city: "Москва", status: "active", img: DOG_IMG, views: 34, date: "12 мая" },
    { id: 2, petName: "Мурка", type: "Кошка", breed: "Рыжий табби", city: "СПб", status: "closed", img: CAT_IMG, views: 87, date: "3 апреля" },
  ]);
  const [newAd, setNewAd] = useState({ petName: "", type: "Собака", breed: "", city: "", desc: "" });
  const [showNotifSettings, setShowNotifSettings] = useState(false);
  type NotifToggles = { messages: boolean; newPets: boolean; favorites: boolean; news: boolean; adViews: boolean; system: boolean; quietMode: boolean };
  const [notifSettings, setNotifSettings] = useState<NotifToggles & { quietFrom: string; quietTo: string }>({
    messages: true,
    newPets: true,
    favorites: false,
    news: true,
    adViews: true,
    system: false,
    quietMode: false,
    quietFrom: "22:00",
    quietTo: "08:00",
  });
  const [notifList] = useState([
    { id: 1, icon: "💬", title: "Анна К. написала вам", desc: "Можно договориться о встрече?", time: "14:27", read: false },
    { id: 2, icon: "👁️", title: "34 просмотра объявления", desc: "Барсик — Золотистый ретривер", time: "13:00", read: false },
    { id: 3, icon: "🐾", title: "Новый питомец рядом с вами", desc: "Рекс, Бордер колли, Москва", time: "вчера", read: true },
    { id: 4, icon: "❤️", title: "Мурка добавлена в избранное", desc: "Кто-то заинтересовался", time: "вчера", read: true },
    { id: 5, icon: "📋", title: "Новые правила площадки", desc: "Обновление политики конфиденциальности", time: "2 дня назад", read: true },
  ]);
  const [showNotifPanel, setShowNotifPanel] = useState(false);
  const [showSecurity, setShowSecurity] = useState(false);
  const [showSupport, setShowSupport] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [loggedOut, setLoggedOut] = useState(false);
  const [securityData, setSecurityData] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);
  const [supportMessage, setSupportMessage] = useState("");
  const [supportSent, setSupportSent] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [adPhotoUrl, setAdPhotoUrl] = useState<string | null>(null);
  const [activeChatId, setActiveChatId] = useState<number | null>(null);
  const chatContacts = [
    { id: 0, name: "Анна К.", last: "Можно договориться о встрече?", time: "14:27", avatar: "🦋", unread: 2 },
    { id: 1, name: "Приют Лапки", last: "Спасибо за интерес!", time: "вчера", avatar: "🏠", unread: 0 },
    { id: 2, name: "Дмитрий В.", last: "Рекс ещё доступен?", time: "вчера", avatar: "🐾", unread: 1 },
  ];
  const [allMessages, setAllMessages] = useState<Record<number, { id: number; user: string; avatar: string; text: string; time: string; isMe: boolean }[]>>({
    0: [
      { id: 1, user: "Анна К.", avatar: "🦋", text: "Здравствуйте! Расскажите подробнее о Барсике?", time: "14:22", isMe: false },
      { id: 2, user: "Я", avatar: "😊", text: "Привет! Барсик очень дружелюбный, любит играть с мячом.", time: "14:25", isMe: true },
      { id: 3, user: "Анна К.", avatar: "🦋", text: "Отлично! Можно договориться о встрече?", time: "14:27", isMe: false },
    ],
    1: [
      { id: 1, user: "Приют Лапки", avatar: "🏠", text: "Здравствуйте! Чем могу помочь?", time: "11:00", isMe: false },
      { id: 2, user: "Я", avatar: "😊", text: "Интересует котёнок Мурка.", time: "11:05", isMe: true },
      { id: 3, user: "Приют Лапки", avatar: "🏠", text: "Спасибо за интерес! Мурка ещё ищет дом.", time: "11:10", isMe: false },
    ],
    2: [
      { id: 1, user: "Дмитрий В.", avatar: "🐾", text: "Добрый день! Рекс ещё доступен?", time: "вчера", isMe: false },
      { id: 2, user: "Я", avatar: "😊", text: "Да, Рекс ещё ищет хозяина!", time: "вчера", isMe: true },
    ],
  });

  const t = T[lang];

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else if (theme === "light") {
      root.classList.remove("dark");
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.classList.toggle("dark", prefersDark);
    }
  }, [theme]);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const filteredPets = pets.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.breed.toLowerCase().includes(searchQuery.toLowerCase());
    const matchType = filterType === "Все" || filterType === "All" || p.type === filterType;
    const matchCity = filterCity === "Все города" || filterCity === "All cities" || p.city === filterCity;
    return matchSearch && matchType && matchCity;
  });

  const favoritePets = pets.filter(p => favorites.includes(p.id));

  const sendMessage = () => {
    if (!chatInput.trim()) return;
    setMessages(prev => [...prev, {
      id: prev.length + 1, user: lang === "ru" ? "Я" : "Me", avatar: "😊",
      text: chatInput,
      time: new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }),
      isMe: true,
    }]);
    setChatInput("");
  };

  const tabs: { id: Tab; icon: string; label: string }[] = [
    { id: "feed", icon: "Newspaper", label: t.feed },
    { id: "search", icon: "Search", label: t.search },
    { id: "map", icon: "MapPin", label: t.map },
    { id: "chat", icon: "MessageCircle", label: t.chat },
    { id: "favorites", icon: "Heart", label: t.favorites },
    { id: "profile", icon: "User", label: t.profile },
  ];

  return (
    <div className="min-h-screen bg-background paw-bg flex flex-col max-w-md mx-auto relative">
      {/* Header */}
      <header className="bg-card/90 backdrop-blur-sm sticky top-0 z-50 px-5 py-3 flex items-center justify-between border-b border-border shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-3xl animate-bounce-soft inline-block">🐾</span>
          <span className="font-pacifico text-2xl text-primary">PawFind</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowNotifPanel(true)}
            className="relative w-9 h-9 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
          >
            <Icon name="Bell" size={18} />
            {notifList.filter(n => !n.read).length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary rounded-full text-white text-[9px] font-black flex items-center justify-center border border-card">
                {notifList.filter(n => !n.read).length}
              </span>
            )}
          </button>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-orange-300 flex items-center justify-center text-white font-bold text-sm">А</div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto pb-24">

        {/* FEED TAB */}
        {activeTab === "feed" && (
          <div className="animate-fade-in">
            <div className="mx-4 mt-5 rounded-3xl bg-gradient-to-br from-primary to-orange-300 p-5 text-white relative overflow-hidden">
              <div className="absolute right-0 bottom-0 text-8xl opacity-20 rotate-12 select-none">🐾</div>
              <p className="text-sm font-semibold opacity-90 mb-1">Сегодня ищут дом</p>
              <h2 className="text-3xl font-black mb-3">128 питомцев</h2>
              <button className="bg-white text-primary font-bold px-5 py-2 rounded-full text-sm hover:shadow-lg transition-shadow">
                Помочь сейчас →
              </button>
            </div>

            <div className="px-4 mt-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-black text-lg">Рядом с тобой</h3>
                <button className="text-primary text-sm font-bold" onClick={() => setActiveTab("search")}>Все →</button>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1" style={{ scrollbarWidth: "none" }}>
                {pets.map((pet, i) => (
                  <div
                    key={pet.id}
                    className="flex-shrink-0 w-44 bg-white rounded-2xl overflow-hidden shadow-sm card-hover cursor-pointer"
                    style={{ animationDelay: `${i * 0.1}s` }}
                    onClick={() => setSelectedPet(pet)}
                  >
                    <div className="relative h-40 overflow-hidden">
                      <img src={pet.img} alt={pet.name} className="w-full h-full object-cover" />
                      <button
                        className="absolute top-2 right-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-sm"
                        onClick={e => { e.stopPropagation(); toggleFavorite(pet.id); }}
                      >
                        <Icon name="Heart" size={14} className={favorites.includes(pet.id) ? "fill-red-500 text-red-500" : "text-gray-400"} />
                      </button>
                      <span className="absolute bottom-2 left-2 bg-secondary text-white text-xs font-bold px-2 py-0.5 rounded-full">{pet.type}</span>
                    </div>
                    <div className="p-3">
                      <p className="font-black text-sm">{pet.name}</p>
                      <p className="text-muted-foreground text-xs">{pet.breed}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Icon name="MapPin" size={10} className="text-primary" />
                        <span className="text-xs text-muted-foreground">{pet.city}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="px-4 mt-5">
              <h3 className="font-black text-lg mb-3">Новости и объявления</h3>
              <div className="space-y-3">
                {news.map((item, i) => (
                  <div key={item.id} className="bg-white rounded-2xl p-4 flex items-start gap-3 shadow-sm card-hover cursor-pointer animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                    <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center text-2xl flex-shrink-0">{item.emoji}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${item.tag === "Важно" ? "bg-red-100 text-red-600" : item.tag === "Акция" ? "bg-green-100 text-green-600" : "bg-orange-100 text-primary"}`}>
                          {item.tag}
                        </span>
                      </div>
                      <p className="font-bold text-sm leading-snug">{item.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SEARCH TAB */}
        {activeTab === "search" && (
          <div className="px-4 pt-5 animate-fade-in">
            <h2 className="font-black text-2xl mb-4">Найти питомца</h2>
            <div className="relative mb-4">
              <Icon name="Search" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Имя или порода..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white rounded-2xl border border-border focus:outline-none focus:ring-2 focus:ring-primary font-nunito"
              />
            </div>
            <div className="flex gap-2 mb-4 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
              {["Все", "Собака", "Кошка", "Кролик"].map(type => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-bold transition-all ${filterType === type ? "bg-primary text-white shadow-md" : "bg-white text-foreground border border-border"}`}
                >
                  {type === "Собака" ? "🐕 Собака" : type === "Кошка" ? "🐈 Кошка" : type === "Кролик" ? "🐇 Кролик" : "Все виды"}
                </button>
              ))}
            </div>
            <div className="flex gap-2 mb-5 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
              {["Все города", "Москва", "Санкт-Петербург", "Казань"].map(city => (
                <button
                  key={city}
                  onClick={() => setFilterCity(city)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-bold transition-all ${filterCity === city ? "bg-secondary text-white shadow-md" : "bg-white text-foreground border border-border"}`}
                >
                  {city}
                </button>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mb-3 font-semibold">Найдено: {filteredPets.length}</p>
            <div className="space-y-3">
              {filteredPets.map((pet, i) => (
                <div key={pet.id} className="bg-white rounded-2xl overflow-hidden shadow-sm card-hover cursor-pointer flex animate-fade-in" style={{ animationDelay: `${i * 0.08}s` }} onClick={() => setSelectedPet(pet)}>
                  <img src={pet.img} alt={pet.name} className="w-28 h-28 object-cover flex-shrink-0" />
                  <div className="p-4 flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-black text-base">{pet.name}</p>
                        <p className="text-sm text-muted-foreground">{pet.breed}</p>
                        <p className="text-xs text-muted-foreground">{pet.age}</p>
                      </div>
                      <button onClick={e => { e.stopPropagation(); toggleFavorite(pet.id); }} className="mt-1">
                        <Icon name="Heart" size={20} className={favorites.includes(pet.id) ? "fill-red-500 text-red-500" : "text-gray-300"} />
                      </button>
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="bg-secondary/15 text-secondary text-xs font-bold px-2 py-0.5 rounded-full">{pet.type}</span>
                      <div className="flex items-center gap-1">
                        <Icon name="MapPin" size={11} className="text-primary" />
                        <span className="text-xs text-muted-foreground">{pet.city}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {filteredPets.length === 0 && (
                <div className="text-center py-16 animate-scale-in">
                  <div className="text-6xl mb-4">🔍</div>
                  <p className="font-bold text-lg">Питомцев не найдено</p>
                  <p className="text-muted-foreground text-sm mt-1">Попробуй изменить фильтры</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* MAP TAB */}
        {activeTab === "map" && (
          <div className="animate-fade-in">
            <div className="px-4 pt-5 mb-3">
              <h2 className="font-black text-2xl">Карта питомцев</h2>
              <p className="text-muted-foreground text-sm">Москва и окрестности</p>
            </div>
            <div className="mx-4 rounded-3xl overflow-hidden shadow-lg relative" style={{ height: "360px" }}>
              <div className="w-full h-full bg-gradient-to-br from-green-100 via-green-200 to-teal-100 relative">
                <div className="absolute inset-0">
                  <div className="absolute top-1/3 left-0 right-0 h-2 bg-white/60 rounded" />
                  <div className="absolute top-2/3 left-0 right-0 h-1.5 bg-white/50 rounded" />
                  <div className="absolute left-1/3 top-0 bottom-0 w-2 bg-white/60 rounded" />
                  <div className="absolute left-2/3 top-0 bottom-0 w-1.5 bg-white/50 rounded" />
                  <div className="absolute top-[15%] left-[5%] right-[20%] h-1 bg-white/40 rounded rotate-12" />
                </div>
                <div className="absolute top-[20%] left-[10%] w-16 h-12 bg-green-400/40 rounded-xl" />
                <div className="absolute bottom-[20%] right-[15%] w-20 h-14 bg-green-400/30 rounded-xl" />
                {mapPets.map(p => (
                  <button
                    key={p.id}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all ${mapSelected?.id === p.id ? "scale-125" : "scale-100 hover:scale-110"}`}
                    style={{ left: `${p.x}%`, top: `${p.y}%` }}
                    onClick={() => setMapSelected(mapSelected?.id === p.id ? null : p)}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl shadow-lg border-2 ${mapSelected?.id === p.id ? "bg-primary border-white" : "bg-white border-primary"}`}>
                      {p.type}
                    </div>
                  </button>
                ))}
                <div className="absolute" style={{ left: "50%", top: "50%", transform: "translate(-50%,-50%)" }}>
                  <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg" />
                  <div className="w-10 h-10 bg-blue-200/40 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-ping" />
                </div>
                <div className="absolute bottom-3 left-3 bg-white/90 rounded-xl px-3 py-2 text-xs font-semibold">
                  {t.youAreHere}
                </div>
              </div>
            </div>
            {mapSelected && (
              <div className="mx-4 mt-3 bg-white rounded-2xl p-4 shadow-sm animate-scale-in flex items-center gap-3">
                <div className="text-3xl">{mapSelected.type}</div>
                <div className="flex-1">
                  <p className="font-black">{mapSelected.name}</p>
                  <p className="text-sm text-muted-foreground">{mapSelected.city}</p>
                </div>
                <button className="bg-primary text-white font-bold px-4 py-2 rounded-full text-sm">{t.details}</button>
              </div>
            )}
            <div className="px-4 mt-4">
              <h3 className="font-black text-base mb-3">Ближайшие питомцы</h3>
              <div className="space-y-2">
                {mapPets.map(p => (
                  <div key={p.id} className="bg-white rounded-xl px-4 py-3 flex items-center gap-3 shadow-sm cursor-pointer card-hover" onClick={() => setMapSelected(p)}>
                    <span className="text-2xl">{p.type}</span>
                    <div className="flex-1">
                      <p className="font-bold text-sm">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{p.city}</p>
                    </div>
                    <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CHAT TAB */}
        {activeTab === "chat" && (
          <div className="animate-fade-in h-full">
            {activeChatId === null ? (
              /* Список чатов */
              <div>
                <div className="px-4 pt-5 mb-3">
                  <h2 className="font-black text-2xl">{t.chatTitle}</h2>
                </div>
                <div className="px-4">
                  <div className="bg-card rounded-2xl overflow-hidden shadow-sm">
                    {chatContacts.map((chat, i) => (
                      <div
                        key={chat.id}
                        onClick={() => setActiveChatId(chat.id)}
                        className={`flex items-center gap-3 px-4 py-4 cursor-pointer hover:bg-muted/50 active:bg-muted transition-colors ${i > 0 ? "border-t border-border" : ""}`}
                      >
                        <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center text-2xl flex-shrink-0">{chat.avatar}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-0.5">
                            <p className="font-bold text-sm">{chat.name}</p>
                            <span className="text-xs text-muted-foreground">{chat.time}</span>
                          </div>
                          <p className="text-xs text-muted-foreground truncate">{chat.last}</p>
                        </div>
                        {chat.unread > 0 && (
                          <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-[10px] font-bold">{chat.unread}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* Открытый чат */
              <div className="flex flex-col h-full">
                {/* Шапка чата */}
                <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-card sticky top-0 z-10">
                  <button
                    onClick={() => setActiveChatId(null)}
                    className="w-9 h-9 bg-muted rounded-full flex items-center justify-center hover:bg-muted/80 transition-colors flex-shrink-0"
                  >
                    <Icon name="ArrowLeft" size={18} />
                  </button>
                  <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center text-xl flex-shrink-0">
                    {chatContacts[activeChatId].avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-black text-sm">{chatContacts[activeChatId].name}</p>
                    <p className="text-xs text-secondary">{t.online}</p>
                  </div>
                </div>

                {/* Сообщения */}
                <div className="flex-1 p-4 space-y-3 overflow-y-auto">
                  {(allMessages[activeChatId] || []).map(msg => (
                    <div key={msg.id} className={`flex gap-2 ${msg.isMe ? "flex-row-reverse" : ""}`}>
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-base flex-shrink-0">{msg.avatar}</div>
                      <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm ${msg.isMe ? "bg-primary text-white rounded-tr-sm" : "bg-muted rounded-tl-sm"}`}>
                        <p>{msg.text}</p>
                        <p className={`text-xs mt-1 ${msg.isMe ? "text-white/70" : "text-muted-foreground"}`}>{msg.time}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Ввод */}
                <div className="flex items-center gap-2 px-4 py-3 border-t border-border bg-card">
                  <input
                    type="text"
                    placeholder={t.messagePlaceholder}
                    value={chatInput}
                    onChange={e => setChatInput(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === "Enter" && chatInput.trim()) {
                        const newMsg = { id: Date.now(), user: lang === "ru" ? "Я" : "Me", avatar: "😊", text: chatInput, time: new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }), isMe: true };
                        setAllMessages(prev => ({ ...prev, [activeChatId]: [...(prev[activeChatId] || []), newMsg] }));
                        setChatInput("");
                      }
                    }}
                    className="flex-1 bg-muted rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button
                    onClick={() => {
                      if (!chatInput.trim()) return;
                      const newMsg = { id: Date.now(), user: lang === "ru" ? "Я" : "Me", avatar: "😊", text: chatInput, time: new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }), isMe: true };
                      setAllMessages(prev => ({ ...prev, [activeChatId]: [...(prev[activeChatId] || []), newMsg] }));
                      setChatInput("");
                    }}
                    className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white hover:bg-primary/90 transition-colors flex-shrink-0"
                  >
                    <Icon name="Send" size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* FAVORITES TAB */}
        {activeTab === "favorites" && (
          <div className="px-4 pt-5 animate-fade-in">
            <h2 className="font-black text-2xl mb-2">Избранное</h2>
            <p className="text-muted-foreground text-sm mb-5">{favoritePets.length} питомца сохранено</p>
            {favoritePets.length === 0 ? (
              <div className="text-center py-20 animate-scale-in">
                <div className="text-7xl mb-4 inline-block animate-bounce-soft">🤍</div>
                <p className="font-black text-xl">Пока пусто</p>
                <p className="text-muted-foreground text-sm mt-2">Нажми ❤️ на карточке питомца,<br />чтобы добавить в избранное</p>
                <button onClick={() => setActiveTab("search")} className="mt-6 bg-primary text-white font-bold px-6 py-3 rounded-full hover:shadow-lg transition-shadow">
                  Найти питомца
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {favoritePets.map((pet, i) => (
                  <div key={pet.id} className="bg-white rounded-2xl overflow-hidden shadow-sm card-hover animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
                    <div className="flex">
                      <img src={pet.img} alt={pet.name} className="w-32 h-32 object-cover flex-shrink-0" />
                      <div className="p-4 flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-black text-base">{pet.name}</p>
                            <p className="text-sm text-muted-foreground">{pet.breed}</p>
                            <p className="text-xs text-muted-foreground">{pet.age} · {pet.city}</p>
                          </div>
                          <button onClick={() => toggleFavorite(pet.id)}>
                            <Icon name="Heart" size={20} className="fill-red-500 text-red-500" />
                          </button>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{pet.desc}</p>
                        <button className="mt-2 bg-primary text-white text-xs font-bold px-4 py-1.5 rounded-full hover:shadow-md transition-shadow" onClick={() => setSelectedPet(pet)}>
                          Подробнее
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* PROFILE TAB */}
        {activeTab === "profile" && (
          <div className="animate-fade-in">
            {/* Hero */}
            <div className="bg-gradient-to-br from-primary to-orange-300 px-4 pt-6 pb-16 relative">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-4xl shadow-lg">😊</div>
                <div className="text-white flex-1">
                  <p className="font-black text-xl">{profileData.name}</p>
                  <p className="opacity-90 text-sm">{profileData.city}</p>
                  {profileData.about && <p className="opacity-75 text-xs mt-1 line-clamp-1">{profileData.about}</p>}
                </div>
                <button
                  onClick={() => { setEditProfile(profileData); setShowEditProfile(true); }}
                  className="w-9 h-9 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors flex-shrink-0"
                >
                  <Icon name="Pencil" size={16} className="text-white" />
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="mx-4 -mt-10 bg-card rounded-2xl shadow-lg p-4 mb-5">
              <div className="grid grid-cols-3 gap-2 text-center">
                {[
                  { val: `${ads.filter(a => a.status === "active").length}`, label: "Объявлений", emoji: "📢" },
                  { val: `${favoritePets.length}`, label: t.statsFav, emoji: "❤️" },
                  { val: "12", label: t.statsMsgs, emoji: "💬" },
                ].map((stat, i) => (
                  <div key={i} className="bg-muted rounded-xl p-3">
                    <div className="text-xl mb-1">{stat.emoji}</div>
                    <p className="font-black text-xl text-primary">{stat.val}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* My Ads */}
            <div className="px-4 mb-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-black text-lg">Мои объявления</h3>
                <button
                  onClick={() => { setNewAd({ petName: "", type: "Собака", breed: "", city: profileData.city, desc: "" }); setAdPhotoUrl(null); setShowNewAd(true); }}
                  className="flex items-center gap-1.5 bg-primary text-white text-xs font-bold px-3 py-2 rounded-full hover:shadow-md transition-shadow"
                >
                  <Icon name="Plus" size={14} />
                  Добавить
                </button>
              </div>
              {ads.length === 0 ? (
                <div className="bg-card rounded-2xl p-8 text-center shadow-sm border border-dashed border-border">
                  <div className="text-4xl mb-3">📢</div>
                  <p className="font-bold">Нет объявлений</p>
                  <p className="text-sm text-muted-foreground mt-1">Разместите питомца, чтобы найти ему дом</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {ads.map((ad, i) => (
                    <div key={ad.id} className="bg-card rounded-2xl overflow-hidden shadow-sm flex animate-fade-in" style={{ animationDelay: `${i * 0.07}s` }}>
                      <img src={ad.img} alt={ad.petName} className="w-24 h-24 object-cover flex-shrink-0" />
                      <div className="p-3 flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-1">
                          <div className="min-w-0">
                            <p className="font-black text-sm truncate">{ad.petName}</p>
                            <p className="text-xs text-muted-foreground truncate">{ad.breed} · {ad.city}</p>
                          </div>
                          <span className={`flex-shrink-0 text-xs font-bold px-2 py-0.5 rounded-full ${ad.status === "active" ? "bg-green-100 text-green-600" : "bg-muted text-muted-foreground"}`}>
                            {ad.status === "active" ? "Активно" : "Закрыто"}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Icon name="Eye" size={11} /> {ad.views}
                          </span>
                          <span className="text-xs text-muted-foreground">{ad.date}</span>
                        </div>
                        <div className="flex gap-2 mt-2">
                          <button
                            onClick={() => setAds(prev => prev.map(a => a.id === ad.id ? { ...a, status: a.status === "active" ? "closed" : "active" } : a))}
                            className="text-xs font-bold text-primary hover:underline"
                          >
                            {ad.status === "active" ? "Закрыть" : "Открыть"}
                          </button>
                          <button
                            onClick={() => setAds(prev => prev.filter(a => a.id !== ad.id))}
                            className="text-xs font-bold text-red-400 hover:underline"
                          >
                            Удалить
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Menu */}
            <div className="px-4">
              <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
                {[
                  { icon: "Bell", label: t.notifications, desc: t.enabled, onClick: () => setShowNotifSettings(true) },
                  { icon: "Shield", label: t.security, desc: t.verified, onClick: () => setShowSecurity(true) },
                  { icon: "HelpCircle", label: t.support, desc: "", onClick: () => setShowSupport(true) },
                  { icon: "Settings", label: t.settings, desc: "", onClick: () => setShowSettings(true) },
                ].map((item, i) => (
                  <div key={i} className={`flex items-center gap-3 px-4 py-4 cursor-pointer hover:bg-muted/50 transition-colors ${i > 0 ? "border-t border-border" : ""}`} onClick={item.onClick}>
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Icon name={item.icon as "Bell"} size={18} className="text-primary" />
                    </div>
                    <p className="font-bold text-sm flex-1">{item.label}</p>
                    <div className="flex items-center gap-2">
                      {item.desc && <span className="text-xs text-muted-foreground">{item.desc}</span>}
                      <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setShowLogoutConfirm(true)}
                className="w-full mt-4 mb-6 py-3 rounded-2xl border-2 border-red-200 text-red-500 font-bold text-sm hover:bg-red-50 transition-colors"
              >
                {t.logout}
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Notifications Panel */}
      {showNotifPanel && (
        <div className="fixed inset-0 z-[200] flex items-end justify-center" onClick={() => setShowNotifPanel(false)}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="relative bg-card w-full max-w-md rounded-t-3xl animate-slide-up" onClick={e => e.stopPropagation()} style={{ maxHeight: "85vh" }}>
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 bg-border rounded-full" />
            </div>
            <div className="px-5 pt-2 pb-3 flex items-center justify-between">
              <h2 className="font-black text-xl">Уведомления</h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => { setShowNotifPanel(false); setShowNotifSettings(true); }}
                  className="flex items-center gap-1.5 text-xs font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-full"
                >
                  <Icon name="SlidersHorizontal" size={13} />
                  Настройки
                </button>
                <button onClick={() => setShowNotifPanel(false)} className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                  <Icon name="X" size={15} />
                </button>
              </div>
            </div>
            <div className="overflow-y-auto pb-6" style={{ maxHeight: "calc(85vh - 80px)" }}>
              {notifList.map((n, i) => (
                <div key={n.id} className={`flex items-start gap-3 px-5 py-4 transition-colors ${!n.read ? "bg-primary/5" : ""} ${i > 0 ? "border-t border-border" : ""}`}>
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-xl flex-shrink-0 ${!n.read ? "bg-primary/15" : "bg-muted"}`}>
                    {n.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm leading-snug ${!n.read ? "font-black" : "font-bold"}`}>{n.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 truncate">{n.desc}</p>
                    <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
                  </div>
                  {!n.read && <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Notification Settings Modal */}
      {showNotifSettings && (
        <div className="fixed inset-0 z-[200] flex items-end justify-center" onClick={() => setShowNotifSettings(false)}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="relative bg-card w-full max-w-md rounded-t-3xl animate-slide-up" onClick={e => e.stopPropagation()} style={{ maxHeight: "90vh" }}>
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 bg-border rounded-full" />
            </div>
            <div className="px-5 pt-2 pb-3 flex items-center justify-between">
              <h2 className="font-black text-xl">Настройка уведомлений</h2>
              <button onClick={() => setShowNotifSettings(false)} className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                <Icon name="X" size={15} />
              </button>
            </div>

            <div className="overflow-y-auto pb-8 px-5" style={{ maxHeight: "calc(90vh - 80px)" }}>
              {/* Master toggle */}
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-4 mb-5 flex items-center gap-3">
                <div className="w-11 h-11 bg-primary/20 rounded-xl flex items-center justify-center">
                  <Icon name="Bell" size={20} className="text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-black text-sm">Все уведомления</p>
                  <p className="text-xs text-muted-foreground">Включить или выключить всё</p>
                </div>
                <button
                  onClick={() => {
                    const allOn = notifSettings.messages && notifSettings.newPets && notifSettings.favorites && notifSettings.news && notifSettings.adViews && notifSettings.system;
                    setNotifSettings(prev => ({
                      ...prev,
                      messages: !allOn, newPets: !allOn, favorites: !allOn,
                      news: !allOn, adViews: !allOn, system: !allOn,
                    }));
                  }}
                  className={`relative w-12 h-6 rounded-full transition-colors flex-shrink-0 ${
                    [notifSettings.messages, notifSettings.newPets, notifSettings.favorites, notifSettings.news, notifSettings.adViews, notifSettings.system].some(Boolean)
                      ? "bg-primary" : "bg-muted"
                  }`}
                >
                  <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${
                    [notifSettings.messages, notifSettings.newPets, notifSettings.favorites, notifSettings.news, notifSettings.adViews, notifSettings.system].some(Boolean)
                      ? "left-6.5" : "left-0.5"
                  }`} style={{ left: [notifSettings.messages, notifSettings.newPets, notifSettings.favorites, notifSettings.news, notifSettings.adViews, notifSettings.system].some(Boolean) ? "26px" : "2px" }} />
                </button>
              </div>

              {/* Category toggles */}
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-3">По категориям</p>
              <div className="bg-card border border-border rounded-2xl overflow-hidden mb-5 shadow-sm">
                {(
                  [
                    { key: "messages" as const, icon: "MessageCircle", label: "Сообщения", desc: "Новые сообщения в чате", color: "text-blue-500", bg: "bg-blue-50" },
                    { key: "newPets" as const, icon: "PawPrint", label: "Новые питомцы", desc: "Питомцы рядом с вами", color: "text-green-500", bg: "bg-green-50" },
                    { key: "favorites" as const, icon: "Heart", label: "Избранное", desc: "Обновления сохранённых", color: "text-red-500", bg: "bg-red-50" },
                    { key: "adViews" as const, icon: "Eye", label: "Просмотры объявлений", desc: "Кто смотрел ваших питомцев", color: "text-orange-500", bg: "bg-orange-50" },
                    { key: "news" as const, icon: "Newspaper", label: "Новости и акции", desc: "Обновления площадки", color: "text-purple-500", bg: "bg-purple-50" },
                    { key: "system" as const, icon: "Settings", label: "Системные", desc: "Технические уведомления", color: "text-muted-foreground", bg: "bg-muted" },
                  ] as { key: keyof NotifToggles; icon: string; label: string; desc: string; color: string; bg: string }[]
                ).map((item, i) => (
                  <div key={item.key} className={`flex items-center gap-3 px-4 py-3.5 ${i > 0 ? "border-t border-border" : ""}`}>
                    <div className={`w-9 h-9 ${item.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <Icon name={item.icon as "Bell"} size={17} className={item.color} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                    <button
                      onClick={() => setNotifSettings(prev => ({ ...prev, [item.key]: !prev[item.key] }))}
                      className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${notifSettings[item.key] ? "bg-primary" : "bg-muted"}`}
                    >
                      <div
                        className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all"
                        style={{ left: notifSettings[item.key] ? "22px" : "2px" }}
                      />
                    </button>
                  </div>
                ))}
              </div>

              {/* Quiet hours */}
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-3">Режим тишины</p>
              <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm mb-5">
                <div className="flex items-center gap-3 px-4 py-4">
                  <div className="w-9 h-9 bg-indigo-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon name="Moon" size={17} className="text-indigo-500" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm">Не беспокоить</p>
                    <p className="text-xs text-muted-foreground">Уведомления будут отложены</p>
                  </div>
                  <button
                    onClick={() => setNotifSettings(prev => ({ ...prev, quietMode: !prev.quietMode }))}
                    className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${notifSettings.quietMode ? "bg-indigo-500" : "bg-muted"}`}
                  >
                    <div
                      className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all"
                      style={{ left: notifSettings.quietMode ? "22px" : "2px" }}
                    />
                  </button>
                </div>
                {notifSettings.quietMode && (
                  <div className="border-t border-border px-4 py-3 flex items-center gap-4 bg-indigo-50/50 animate-fade-in">
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground mb-1 font-semibold">С</p>
                      <input
                        type="time"
                        value={notifSettings.quietFrom}
                        onChange={e => setNotifSettings(prev => ({ ...prev, quietFrom: e.target.value }))}
                        className="w-full bg-white border border-border rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground mb-1 font-semibold">До</p>
                      <input
                        type="time"
                        value={notifSettings.quietTo}
                        onChange={e => setNotifSettings(prev => ({ ...prev, quietTo: e.target.value }))}
                        className="w-full bg-white border border-border rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      />
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => setShowNotifSettings(false)}
                className="w-full bg-primary text-white font-bold py-4 rounded-2xl hover:shadow-lg transition-shadow"
              >
                Сохранить
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      {showEditProfile && (
        <div className="fixed inset-0 z-[200] flex items-end justify-center" onClick={() => setShowEditProfile(false)}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="relative bg-card w-full max-w-md rounded-t-3xl animate-slide-up overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 bg-border rounded-full" />
            </div>
            <div className="px-5 pb-8">
              <div className="flex items-center justify-between mb-5 mt-2">
                <h2 className="font-black text-xl">Редактировать профиль</h2>
                <button onClick={() => setShowEditProfile(false)} className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                  <Icon name="X" size={16} />
                </button>
              </div>

              {/* Avatar */}
              <div className="flex justify-center mb-5">
                <div className="relative">
                  {avatarUrl
                    ? <img src={avatarUrl} alt="avatar" className="w-20 h-20 rounded-full object-cover shadow-lg" />
                    : <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-orange-300 flex items-center justify-center text-4xl shadow-lg">😊</div>
                  }
                  <label className="absolute -bottom-1 -right-1 w-7 h-7 bg-primary rounded-full flex items-center justify-center shadow-md cursor-pointer">
                    <Icon name="Camera" size={13} className="text-white" />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={e => {
                        const file = e.target.files?.[0];
                        if (file) setAvatarUrl(URL.createObjectURL(file));
                      }}
                    />
                  </label>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { label: "Имя", key: "name", placeholder: "Ваше имя", type: "text" },
                  { label: "Город", key: "city", placeholder: "Ваш город", type: "text" },
                  { label: "Телефон", key: "phone", placeholder: "+7 000 000-00-00", type: "tel" },
                ].map(field => (
                  <div key={field.key}>
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wide block mb-1">{field.label}</label>
                    <input
                      type={field.type}
                      value={editProfile[field.key as keyof typeof editProfile]}
                      onChange={e => setEditProfile(prev => ({ ...prev, [field.key]: e.target.value }))}
                      placeholder={field.placeholder}
                      className="w-full px-4 py-3 bg-muted rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm font-nunito"
                    />
                  </div>
                ))}
                <div>
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wide block mb-1">О себе</label>
                  <textarea
                    value={editProfile.about}
                    onChange={e => setEditProfile(prev => ({ ...prev, about: e.target.value }))}
                    placeholder="Расскажите о себе..."
                    rows={3}
                    className="w-full px-4 py-3 bg-muted rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm font-nunito resize-none"
                  />
                </div>
              </div>

              <button
                onClick={() => { setProfileData(editProfile); setShowEditProfile(false); }}
                className="w-full mt-5 bg-primary text-white font-bold py-4 rounded-2xl hover:shadow-lg transition-shadow"
              >
                Сохранить изменения
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Ad Modal */}
      {showNewAd && (
        <div className="fixed inset-0 z-[200] flex items-end justify-center" onClick={() => setShowNewAd(false)}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="relative bg-card w-full max-w-md rounded-t-3xl animate-slide-up overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 bg-border rounded-full" />
            </div>
            <div className="px-5 pb-8 max-h-[85vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-5 mt-2">
                <h2 className="font-black text-xl">Новое объявление</h2>
                <button onClick={() => setShowNewAd(false)} className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                  <Icon name="X" size={16} />
                </button>
              </div>

              {/* Pet type selector */}
              <div className="mb-4">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wide block mb-2">Вид животного</label>
                <div className="flex gap-2">
                  {["Собака", "Кошка", "Кролик", "Другое"].map(type => (
                    <button
                      key={type}
                      onClick={() => setNewAd(prev => ({ ...prev, type }))}
                      className={`flex-1 py-2.5 rounded-xl text-xs font-bold border-2 transition-all ${newAd.type === type ? "border-primary bg-primary/10 text-primary" : "border-border bg-muted/50 text-muted-foreground"}`}
                    >
                      {type === "Собака" ? "🐕" : type === "Кошка" ? "🐈" : type === "Кролик" ? "🐇" : "🐾"}<br />{type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Photo upload */}
              <div className="mb-4">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wide block mb-2">Фото</label>
                <label className="block cursor-pointer">
                  {adPhotoUrl ? (
                    <div className="relative w-full h-36 rounded-2xl overflow-hidden">
                      <img src={adPhotoUrl} alt="pet" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <p className="text-white font-bold text-sm">Изменить фото</p>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-32 bg-muted rounded-2xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 hover:bg-muted/80 transition-colors">
                      <Icon name="Camera" size={28} className="text-muted-foreground" />
                      <p className="text-sm text-muted-foreground font-semibold">Добавить фото</p>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={e => {
                      const file = e.target.files?.[0];
                      if (file) setAdPhotoUrl(URL.createObjectURL(file));
                    }}
                  />
                </label>
              </div>

              <div className="space-y-3">
                {[
                  { label: "Кличка", key: "petName", placeholder: "Имя питомца" },
                  { label: "Порода", key: "breed", placeholder: "Например: Лабрадор" },
                  { label: "Город", key: "city", placeholder: "Ваш город" },
                ].map(field => (
                  <div key={field.key}>
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wide block mb-1">{field.label}</label>
                    <input
                      type="text"
                      value={newAd[field.key as keyof typeof newAd]}
                      onChange={e => setNewAd(prev => ({ ...prev, [field.key]: e.target.value }))}
                      placeholder={field.placeholder}
                      className="w-full px-4 py-3 bg-muted rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm font-nunito"
                    />
                  </div>
                ))}
                <div>
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wide block mb-1">Описание</label>
                  <textarea
                    value={newAd.desc}
                    onChange={e => setNewAd(prev => ({ ...prev, desc: e.target.value }))}
                    placeholder="Расскажите о характере питомца..."
                    rows={3}
                    className="w-full px-4 py-3 bg-muted rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm font-nunito resize-none"
                  />
                </div>
              </div>

              <button
                onClick={() => {
                  if (!newAd.petName.trim()) return;
                  setAds(prev => [{
                    id: Date.now(), petName: newAd.petName, type: newAd.type,
                    breed: newAd.breed || "Не указана", city: newAd.city || profileData.city,
                    status: "active", img: DOG_IMG, views: 0,
                    date: new Date().toLocaleDateString("ru-RU", { day: "numeric", month: "long" }),
                  }, ...prev]);
                  setShowNewAd(false);
                }}
                disabled={!newAd.petName.trim()}
                className="w-full mt-5 bg-primary text-white font-bold py-4 rounded-2xl hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Опубликовать объявление
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Security Modal */}
      {showSecurity && (
        <div className="fixed inset-0 z-[200] flex items-end justify-center" onClick={() => setShowSecurity(false)}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="relative bg-card w-full max-w-md rounded-t-3xl animate-slide-up overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="flex justify-center pt-3 pb-1"><div className="w-10 h-1 bg-border rounded-full" /></div>
            <div className="px-5 pb-8 max-h-[85vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-5 mt-2">
                <h2 className="font-black text-xl">Безопасность</h2>
                <button onClick={() => setShowSecurity(false)} className="w-8 h-8 bg-muted rounded-full flex items-center justify-center"><Icon name="X" size={15} /></button>
              </div>

              {/* 2FA */}
              <div className="bg-muted/50 rounded-2xl p-4 mb-5 flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon name="Smartphone" size={18} className="text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm">Двухфакторная аутентификация</p>
                  <p className="text-xs text-muted-foreground">{twoFAEnabled ? "Включена — аккаунт защищён" : "Выключена — рекомендуем включить"}</p>
                </div>
                <button
                  onClick={() => setTwoFAEnabled(p => !p)}
                  className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${twoFAEnabled ? "bg-green-500" : "bg-muted"}`}
                >
                  <div className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all" style={{ left: twoFAEnabled ? "22px" : "2px" }} />
                </button>
              </div>

              {/* Change password */}
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-3">Смена пароля</p>
              <div className="space-y-3 mb-5">
                {[
                  { label: "Текущий пароль", key: "currentPassword" },
                  { label: "Новый пароль", key: "newPassword" },
                  { label: "Повторите новый пароль", key: "confirmPassword" },
                ].map(f => (
                  <div key={f.key}>
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wide block mb-1">{f.label}</label>
                    <input
                      type="password"
                      value={securityData[f.key as keyof typeof securityData]}
                      onChange={e => setSecurityData(p => ({ ...p, [f.key]: e.target.value }))}
                      placeholder="••••••••"
                      className="w-full px-4 py-3 bg-muted rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    />
                  </div>
                ))}
                {securityData.newPassword && securityData.confirmPassword && securityData.newPassword !== securityData.confirmPassword && (
                  <p className="text-xs text-red-500 font-semibold">Пароли не совпадают</p>
                )}
              </div>

              <button
                onClick={() => {
                  if (securityData.newPassword && securityData.newPassword === securityData.confirmPassword) {
                    setSecurityData({ currentPassword: "", newPassword: "", confirmPassword: "" });
                    setShowSecurity(false);
                  }
                }}
                disabled={!securityData.currentPassword || !securityData.newPassword || securityData.newPassword !== securityData.confirmPassword}
                className="w-full bg-primary text-white font-bold py-4 rounded-2xl hover:shadow-lg transition-shadow disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Сохранить пароль
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Support Modal */}
      {showSupport && (
        <div className="fixed inset-0 z-[200] flex items-end justify-center" onClick={() => setShowSupport(false)}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="relative bg-card w-full max-w-md rounded-t-3xl animate-slide-up overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="flex justify-center pt-3 pb-1"><div className="w-10 h-1 bg-border rounded-full" /></div>
            <div className="px-5 pb-8 max-h-[85vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-5 mt-2">
                <h2 className="font-black text-xl">Поддержка</h2>
                <button onClick={() => { setShowSupport(false); setSupportSent(false); }} className="w-8 h-8 bg-muted rounded-full flex items-center justify-center"><Icon name="X" size={15} /></button>
              </div>

              {supportSent ? (
                <div className="text-center py-8 animate-fade-in">
                  <div className="text-5xl mb-4">✅</div>
                  <p className="font-black text-xl mb-2">Отправлено!</p>
                  <p className="text-sm text-muted-foreground mb-6">Мы ответим вам в течение 24 часов</p>
                  <button onClick={() => { setSupportSent(false); setShowSupport(false); }} className="bg-primary text-white font-bold px-8 py-3 rounded-2xl">Закрыть</button>
                </div>
              ) : (
                <>
                  {/* FAQ */}
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-3">Часто задаваемые вопросы</p>
                  <div className="bg-card border border-border rounded-2xl overflow-hidden mb-5 shadow-sm">
                    {[
                      { q: "Как разместить объявление?", a: "Перейдите в Профиль → Мои объявления → Добавить" },
                      { q: "Как связаться с владельцем?", a: "Нажмите «Написать хозяину» на карточке питомца" },
                      { q: "Как удалить аккаунт?", a: "Напишите нам в поддержку — удалим в течение 3 дней" },
                    ].map((item, i) => (
                      <div key={i} className={`px-4 py-3.5 ${i > 0 ? "border-t border-border" : ""}`}>
                        <p className="font-bold text-sm mb-1">{item.q}</p>
                        <p className="text-xs text-muted-foreground">{item.a}</p>
                      </div>
                    ))}
                  </div>

                  {/* Message form */}
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-3">Написать нам</p>
                  <textarea
                    value={supportMessage}
                    onChange={e => setSupportMessage(e.target.value)}
                    placeholder="Опишите вашу проблему или вопрос..."
                    rows={4}
                    className="w-full px-4 py-3 bg-muted rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm resize-none mb-4"
                  />
                  <button
                    onClick={() => { if (supportMessage.trim()) { setSupportSent(true); setSupportMessage(""); } }}
                    disabled={!supportMessage.trim()}
                    className="w-full bg-primary text-white font-bold py-4 rounded-2xl hover:shadow-lg transition-shadow disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Отправить сообщение
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Logout Confirm */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-6" onClick={() => setShowLogoutConfirm(false)}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="relative bg-card w-full max-w-sm rounded-3xl p-6 animate-scale-in shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="text-center mb-5">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="LogOut" size={28} className="text-red-500" />
              </div>
              <h3 className="font-black text-xl mb-1">Выйти из аккаунта?</h3>
              <p className="text-sm text-muted-foreground">Вы сможете войти снова в любой момент</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 py-3 rounded-2xl border-2 border-border font-bold text-sm hover:bg-muted transition-colors"
              >
                Отмена
              </button>
              <button
                onClick={() => { setShowLogoutConfirm(false); setLoggedOut(true); }}
                className="flex-1 py-3 rounded-2xl bg-red-500 text-white font-bold text-sm hover:bg-red-600 transition-colors"
              >
                Выйти
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Logged out screen */}
      {loggedOut && (
        <div className="fixed inset-0 z-[300] bg-background flex flex-col items-center justify-center px-8 animate-fade-in">
          <div className="text-6xl mb-6">🐾</div>
          <h2 className="font-black text-2xl mb-2 text-center">Вы вышли из аккаунта</h2>
          <p className="text-muted-foreground text-center mb-8">До встречи! Питомцы ждут вас снова</p>
          <button
            onClick={() => setLoggedOut(false)}
            className="bg-primary text-white font-bold px-8 py-4 rounded-2xl hover:shadow-lg transition-shadow"
          >
            Войти снова
          </button>
        </div>
      )}

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-[200] flex items-end justify-center" onClick={() => setShowSettings(false)}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="relative bg-card w-full max-w-md rounded-t-3xl animate-slide-up overflow-hidden" onClick={e => e.stopPropagation()}>
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 bg-border rounded-full" />
            </div>
            <div className="px-5 pb-8">
              <h2 className="font-black text-xl mb-6 mt-2">{t.settingsTitle}</h2>

              {/* Theme */}
              <div className="mb-6">
                <p className="text-sm font-bold text-muted-foreground mb-3 uppercase tracking-wide">{t.themeLabel}</p>
                <div className="grid grid-cols-3 gap-2">
                  {([
                    { val: "light" as Theme, label: t.themeLight, icon: "Sun" },
                    { val: "dark" as Theme, label: t.themeDark, icon: "Moon" },
                    { val: "system" as Theme, label: t.themeSystem, icon: "Monitor" },
                  ]).map(opt => (
                    <button
                      key={opt.val}
                      onClick={() => setTheme(opt.val)}
                      className={`flex flex-col items-center gap-2 py-4 rounded-2xl border-2 transition-all ${
                        theme === opt.val
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border bg-muted/40 text-muted-foreground hover:border-primary/40"
                      }`}
                    >
                      <Icon name={opt.icon as "Sun"} size={22} />
                      <span className="text-xs font-bold">{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Language */}
              <div className="mb-8">
                <p className="text-sm font-bold text-muted-foreground mb-3 uppercase tracking-wide">{t.langLabel}</p>
                <div className="grid grid-cols-2 gap-2">
                  {([
                    { val: "ru" as Lang, label: t.langRu, flag: "🇷🇺" },
                    { val: "en" as Lang, label: t.langEn, flag: "🇬🇧" },
                  ]).map(opt => (
                    <button
                      key={opt.val}
                      onClick={() => setLang(opt.val)}
                      className={`flex items-center gap-3 px-4 py-4 rounded-2xl border-2 transition-all ${
                        lang === opt.val
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border bg-muted/40 text-muted-foreground hover:border-primary/40"
                      }`}
                    >
                      <span className="text-2xl">{opt.flag}</span>
                      <span className="font-bold text-sm">{opt.label}</span>
                      {lang === opt.val && <Icon name="Check" size={16} className="ml-auto text-primary" />}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setShowSettings(false)}
                className="w-full bg-primary text-white font-bold py-4 rounded-2xl hover:shadow-lg transition-shadow text-base"
              >
                {t.close}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom navigation */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-card/95 backdrop-blur-md border-t border-border px-2 py-2 z-50">
        <div className="flex items-center justify-around">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-2xl transition-all ${activeTab === tab.id ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"}`}
            >
              <div className="relative">
                <Icon name={tab.icon as "Newspaper"} size={22} />
                {tab.id === "chat" && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full border border-white" />
                )}
                {tab.id === "favorites" && favorites.length > 0 && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border border-white flex items-center justify-center">
                    <span className="text-white text-[8px] font-bold">{favorites.length}</span>
                  </div>
                )}
              </div>
              <span className={`text-[10px] font-bold ${activeTab === tab.id ? "text-primary" : ""}`}>{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Pet detail modal */}
      {selectedPet && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center" onClick={() => setSelectedPet(null)}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div className="relative bg-card w-full max-w-md rounded-t-3xl animate-slide-up overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="relative h-72">
              <img src={selectedPet.img} alt={selectedPet.name} className="w-full h-full object-cover" />
              <button onClick={() => setSelectedPet(null)} className="absolute top-4 right-4 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center shadow-md">
                <Icon name="X" size={18} />
              </button>
              <button
                onClick={() => toggleFavorite(selectedPet.id)}
                className="absolute top-4 left-4 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center shadow-md"
              >
                <Icon name="Heart" size={18} className={favorites.includes(selectedPet.id) ? "fill-red-500 text-red-500" : "text-gray-400"} />
              </button>
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-black text-2xl">{selectedPet.name}</h3>
                  <p className="text-muted-foreground">{selectedPet.breed} · {selectedPet.age}</p>
                </div>
                <span className="bg-secondary text-white font-bold px-3 py-1 rounded-full text-sm">{selectedPet.type}</span>
              </div>
              <div className="flex items-center gap-1 mb-3">
                <Icon name="MapPin" size={14} className="text-primary" />
                <span className="text-sm text-muted-foreground">{selectedPet.city}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-5">{selectedPet.desc}</p>
              <div className="flex gap-3">
                <button
                  className="flex-1 bg-primary text-white font-bold py-3 rounded-2xl hover:shadow-lg transition-shadow"
                  onClick={() => { setSelectedPet(null); setActiveTab("chat"); }}
                >
                  {t.writeTo}
                </button>
                <button
                  className="w-12 h-12 border-2 border-border rounded-2xl flex items-center justify-center hover:bg-muted transition-colors"
                  onClick={() => { setSelectedPet(null); setActiveTab("map"); }}
                >
                  <Icon name="MapPin" size={20} className="text-primary" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}