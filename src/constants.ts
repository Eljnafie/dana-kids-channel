import { Video, Activity, Product, TeamMember, Quiz, BlogPost, Song, GameItem } from './types';

export const CHANNEL_URL = "https://www.youtube.com/@%D8%AF%D9%86%D8%A7%D9%84%D9%84%D8%A3%D8%B7%D9%81%D8%A7%D9%84";

export const YOUTUBE_CONFIG = {
  // To enable dynamic updates:
  // 1. Get an API Key from Google Cloud Console (YouTube Data API v3).
  // 2. Find your Channel ID (advanced settings in YouTube Studio).
  API_KEY: '', 
  CHANNEL_ID: '' 
};

const VIDEOS_EN: Video[] = [
  { id: 'v1', title: 'Learn the ABCs with Dana!', thumbnail: 'https://picsum.photos/seed/abc/640/360', category: 'Learning', description: 'A fun adventure through the alphabet with songs and colors.', youtubeId: 'dQw4w9WgXcQ' },
  { id: 'v2', title: 'DIY Paper Airplanes', thumbnail: 'https://picsum.photos/seed/crafts/640/360', category: 'Crafts', description: 'Make high-flying paper planes in 5 minutes.', youtubeId: 'dQw4w9WgXcQ' },
  { id: 'v3', title: 'Five Little Ducks Song', thumbnail: 'https://picsum.photos/seed/song/640/360', category: 'Songs', description: 'Sing along to this classic nursery rhyme!', youtubeId: 'dQw4w9WgXcQ' },
  { id: 'v4', title: 'Colors of the Rainbow', thumbnail: 'https://picsum.photos/seed/colors/640/360', category: 'Learning', description: 'Learn all the colors in English and Arabic.', youtubeId: 'dQw4w9WgXcQ' },
  { id: 'v5', title: 'Funny Cat Moments', thumbnail: 'https://picsum.photos/seed/cats/640/360', category: 'Fun', description: 'Laugh out loud with these silly kittens.', youtubeId: 'dQw4w9WgXcQ' },
  { id: 'v6', title: 'Build a Cardboard Castle', thumbnail: 'https://picsum.photos/seed/castle/640/360', category: 'Crafts', description: 'Recycle old boxes into a magical kingdom.', youtubeId: 'dQw4w9WgXcQ' }
];

const VIDEOS_AR: Video[] = [
  { id: 'v1', title: 'تعلم الحروف مع دنا!', thumbnail: 'https://picsum.photos/seed/abc/640/360', category: 'تعليمي', description: 'مغامرة ممتعة عبر الحروف الأبجدية مع الأغاني والألوان.', youtubeId: 'dQw4w9WgXcQ' },
  { id: 'v2', title: 'صنع طائرات ورقية', thumbnail: 'https://picsum.photos/seed/crafts/640/360', category: 'حرف يدوية', description: 'اصنع طائرات ورقية تحلق عالياً في 5 دقائق فقط.', youtubeId: 'dQw4w9WgXcQ' },
  { id: 'v3', title: 'أغنية الخمس بطات', thumbnail: 'https://picsum.photos/seed/song/640/360', category: 'أغاني', description: 'غنِ معنا هذه الأغنية الكلاسيكية المحبوبة للأطفال!', youtubeId: 'dQw4w9WgXcQ' },
  { id: 'v4', title: 'ألوان الطيف', thumbnail: 'https://picsum.photos/seed/colors/640/360', category: 'تعليمي', description: 'تعلم كل الألوان باللغتين العربية والإنجليزية.', youtubeId: 'dQw4w9WgXcQ' },
  { id: 'v5', title: 'مواقف مضحكة للقطط', thumbnail: 'https://picsum.photos/seed/cats/640/360', category: 'مرح', description: 'اضحك من قلبك مع هذه القطط الظريفة.', youtubeId: 'dQw4w9WgXcQ' },
  { id: 'v6', title: 'بناء قلعة من الكرتون', thumbnail: 'https://picsum.photos/seed/castle/640/360', category: 'حرف يدوية', description: 'أعد تدوير الصناديق القديمة إلى قلعة سحرية.', youtubeId: 'dQw4w9WgXcQ' }
];

const ACTIVITIES_EN: Activity[] = [
  { id: 'a1', title: 'Dana Coloring Book', type: 'Printable', isPremium: false, image: 'https://picsum.photos/seed/coloring/400/400', ageGroup: '3-6' },
  { id: 'a2', title: 'Math Puzzle Pack', type: 'Worksheet', isPremium: true, image: 'https://picsum.photos/seed/math/400/400', ageGroup: '6-9' },
  { id: 'a3', title: 'Find the Difference', type: 'Game', isPremium: false, image: 'https://picsum.photos/seed/game/400/400', ageGroup: 'All Ages' },
  { id: 'a4', title: 'Space Adventure Kit', type: 'Printable', isPremium: true, image: 'https://picsum.photos/seed/space/400/400', ageGroup: '5-8' }
];

const ACTIVITIES_AR: Activity[] = [
  { id: 'a1', title: 'كتاب تلوين دنا', type: 'طباعة', isPremium: false, image: 'https://picsum.photos/seed/coloring/400/400', ageGroup: '3-6' },
  { id: 'a2', title: 'حزمة ألغاز الرياضيات', type: 'أوراق عمل', isPremium: true, image: 'https://picsum.photos/seed/math/400/400', ageGroup: '6-9' },
  { id: 'a3', title: 'أوجد الفروقات', type: 'لعبة', isPremium: false, image: 'https://picsum.photos/seed/game/400/400', ageGroup: 'كل الأعمار' },
  { id: 'a4', title: 'مغامرات الفضاء', type: 'طباعة', isPremium: true, image: 'https://picsum.photos/seed/space/400/400', ageGroup: '5-8' }
];

const PRODUCTS_EN: Product[] = [
  { id: 'p1', name: 'Dana Plush Toy', price: 19.99, image: 'https://picsum.photos/seed/plush/400/400', category: 'Toy', externalUrl: 'https://amazon.com' },
  { id: 'p2', name: 'Adventure Storybook', price: 12.50, image: 'https://picsum.photos/seed/book/400/400', category: 'Book', externalUrl: 'https://amazon.com' },
  { id: 'p3', name: 'Dana T-Shirt', price: 15.00, image: 'https://picsum.photos/seed/shirt/400/400', category: 'Merch', externalUrl: 'https://amazon.com' },
  { id: 'p4', name: 'Ultimate Craft Kit', price: 29.99, image: 'https://picsum.photos/seed/kit/400/400', category: 'Kit', externalUrl: 'https://amazon.com' }
];

const PRODUCTS_AR: Product[] = [
  { id: 'p1', name: 'دمية دنا المحشوة', price: 19.99, image: 'https://picsum.photos/seed/plush/400/400', category: 'ألعاب', externalUrl: 'https://amazon.sa' },
  { id: 'p2', name: 'كتاب قصص المغامرات', price: 12.50, image: 'https://picsum.photos/seed/book/400/400', category: 'كتب', externalUrl: 'https://amazon.sa' },
  { id: 'p3', name: 'قميص دنا', price: 15.00, image: 'https://picsum.photos/seed/shirt/400/400', category: 'ملابس', externalUrl: 'https://amazon.sa' },
  { id: 'p4', name: 'صندوق الحرف الشامل', price: 29.99, image: 'https://picsum.photos/seed/kit/400/400', category: 'أدوات', externalUrl: 'https://amazon.sa' }
];

const BLOG_EN: BlogPost[] = [
    { id: 'b1', title: "Why Play is Important for Kids", excerpt: "Discover how playtime helps children develop social and cognitive skills.", content: "<p>Play is not just about having fun; it's a critical part of a child's development.</p><p>Through play, children learn to interact with the world around them...</p>", image: "https://picsum.photos/seed/blog1/800/400", date: "Oct 10, 2023", author: "Dana Team" },
    { id: 'b2', title: "5 Easy Crafts for Rainy Days", excerpt: "Stuck inside? Here are 5 fun crafts using household items.", content: "<p>Rainy days don't have to be boring! Grab some paper, glue, and scissors.</p><ul><li>Paper Plate Masks</li><li>Cardboard Castles</li></ul>", image: "https://picsum.photos/seed/blog2/800/400", date: "Nov 05, 2023", author: "Dana Team" }
];

const BLOG_AR: BlogPost[] = [
    { id: 'b1', title: "لماذا اللعب مهم للأطفال؟", excerpt: "اكتشف كيف يساعد اللعب الأطفال على تطوير المهارات الاجتماعية والمعرفية.", content: "<p>اللعب ليس مجرد متعة؛ إنه جزء حيوي من نمو الطفل.</p><p>من خلال اللعب، يتعلم الأطفال التفاعل مع العالم من حولهم...</p>", image: "https://picsum.photos/seed/blog1/800/400", date: "١٠ أكتوبر ٢٠٢٣", author: "فريق دنا" },
    { id: 'b2', title: "٥ حرف يدوية سهلة للأيام الماطرة", excerpt: "هل أنتم عالقون في المنزل؟ إليكم ٥ حرف ممتعة باستخدام أدوات منزلية.", content: "<p>الأيام الماطرة لا يجب أن تكون مملة! احضر بعض الورق والصمغ والمقص.</p><ul><li>أقنعة الأطباق الورقية</li><li>قلاع الكرتون</li></ul>", image: "https://picsum.photos/seed/blog2/800/400", date: "٥ نوفمبر ٢٠٢٣", author: "فريق دنا" }
];

const TEAM_EN: TeamMember[] = [
  { id: 't1', name: "Dana", role: "Host & Creator", image: "https://picsum.photos/seed/dana/300/300", bio: "Dana loves singing, painting, and teaching kids new things every day!" },
  { id: 't2', name: "Mr. Owl", role: "Wise Mascot", image: "https://picsum.photos/seed/owl/300/300", bio: "He knows everything about science, math, and flying!" }
];

const TEAM_AR: TeamMember[] = [
  { id: 't1', name: "دنا", role: "المقدمة والمبتكرة", image: "https://picsum.photos/seed/dana/300/300", bio: "تحب دنا الغناء والرسم وتعليم الأطفال أشياء جديدة كل يوم!" },
  { id: 't2', name: "السيد بومة", role: "التميمة الحكيمة", image: "https://picsum.photos/seed/owl/300/300", bio: "يعرف كل شيء عن العلوم والرياضيات والطيران!" }
];

const QUIZZES_EN: Quiz[] = [
  {
    id: 'q1', title: 'Animal Sounds', category: 'Animals', thumbnail: 'https://picsum.photos/seed/animals/400/400', description: 'Can you guess what sound each animal makes?',
    questions: [
      { id: 'q1_1', text: 'What does the cow say?', options: ['Moo', 'Woof', 'Meow', 'Oink'], correctIndex: 0 },
      { id: 'q1_2', text: 'Who says "Quack Quack"?', options: ['Dog', 'Cat', 'Duck', 'Lion'], correctIndex: 2 },
      { id: 'q1_3', text: 'What sound does a sheep make?', options: ['Roar', 'Baa', 'Hiss', 'Chirp'], correctIndex: 1 }
    ]
  },
  {
    id: 'q2', title: 'Space Explorer', category: 'Space', thumbnail: 'https://picsum.photos/seed/spacequiz/400/400', description: 'Blast off! How much do you know about space?',
    questions: [
      { id: 'q2_1', text: 'Which planet do we live on?', options: ['Mars', 'Earth', 'Jupiter', 'Saturn'], correctIndex: 1 },
      { id: 'q2_2', text: 'What is the big yellow ball in the sky?', options: ['The Moon', 'A Pizza', 'The Sun', 'A Star'], correctIndex: 2 },
      { id: 'q2_3', text: 'Astronauts wear a special...', options: ['Swimsuit', 'Hat', 'Suit', 'Mask'], correctIndex: 2 }
    ]
  },
  {
    id: 'q3', title: 'Alphabet Fun', category: 'Letters', thumbnail: 'https://picsum.photos/seed/letters/400/400', description: 'Test your ABC knowledge!',
    questions: [
      { id: 'q3_1', text: 'What is the first letter of the alphabet?', options: ['B', 'C', 'A', 'Z'], correctIndex: 2 },
      { id: 'q3_2', text: 'Which animal starts with "Z"?', options: ['Zebra', 'Lion', 'Bear', 'Dog'], correctIndex: 0 },
      { id: 'q3_3', text: 'What letter comes after "B"?', options: ['A', 'D', 'E', 'C'], correctIndex: 3 }
    ]
  }
];

const QUIZZES_AR: Quiz[] = [
  {
    id: 'q1', title: 'أصوات الحيوانات', category: 'حيوانات', thumbnail: 'https://picsum.photos/seed/animals/400/400', description: 'هل يمكنك تخمين صوت كل حيوان؟',
    questions: [
      { id: 'q1_1', text: 'ماذا تقول البقرة؟', options: ['مووو', 'عوعو', 'مياو', 'أوينك'], correctIndex: 0 },
      { id: 'q1_2', text: 'من يقول "كواك كواك"؟', options: ['الكلب', 'القطة', 'البطة', 'الأسد'], correctIndex: 2 },
      { id: 'q1_3', text: 'ما هو صوت الخروف؟', options: ['زئير', 'ماءءء', 'هسهسة', 'زقزقة'], correctIndex: 1 }
    ]
  },
  {
    id: 'q2', title: 'مستكشف الفضاء', category: 'فضاء', thumbnail: 'https://picsum.photos/seed/spacequiz/400/400', description: 'انطلق! كم تعرف عن الفضاء؟',
    questions: [
      { id: 'q2_1', text: 'على أي كوكب نعيش؟', options: ['المريخ', 'الأرض', 'المشتري', 'زحل'], correctIndex: 1 },
      { id: 'q2_2', text: 'ما هي الكرة الصفراء الكبيرة في السماء؟', options: ['القمر', 'بيتزا', 'الشمس', 'نجمة'], correctIndex: 2 },
      { id: 'q2_3', text: 'يرتدي رواد الفضاء بدلة...', options: ['سباحة', 'نوم', 'فضاء', 'رسمية'], correctIndex: 2 }
    ]
  },
  {
    id: 'q3', title: 'مرح الحروف', category: 'حروف', thumbnail: 'https://picsum.photos/seed/letters/400/400', description: 'اختبر معلوماتك في الحروف الأبجدية!',
    questions: [
      { id: 'q3_1', text: 'ما هو أول حرف في الأبجدية؟', options: ['ب', 'ت', 'أ', 'ي'], correctIndex: 2 },
      { id: 'q3_2', text: 'أي حيوان يبدأ بحرف "ز"؟', options: ['زرافة', 'أسد', 'دب', 'كلب'], correctIndex: 0 },
      { id: 'q3_3', text: 'ما الحرف الذي يأتي بعد "أ"؟', options: ['ج', 'د', 'هـ', 'ب'], correctIndex: 3 }
    ]
  }
];

const SONGS_EN: Song[] = [
  { id: 's1', title: 'Happy Day', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', duration: '2:15' },
  { id: 's2', title: 'Playtime Fun', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', duration: '1:45' },
  { id: 's3', title: 'Sleepy Star', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3', duration: '3:00' }
];

const SONGS_AR: Song[] = [
  { id: 's1', title: 'يوم سعيد', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', duration: '2:15' },
  { id: 's2', title: 'وقت المرح', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', duration: '1:45' },
  { id: 's3', title: 'النجمة الناعسة', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3', duration: '3:00' }
];

const GAMES_EN: GameItem[] = [
    { id: 'balloon', title: 'Balloon Pop', description: 'Pop the balloons before they fly away!', path: '/game/balloon', color: 'bg-red-100 text-red-500' },
    { id: 'puzzle', title: 'Slide Puzzle', description: 'Reassemble the picture!', path: '/game/puzzle', color: 'bg-orange-100 text-orange-500' },
    { id: 'memory', title: 'Memory Match', description: 'Find the matching pairs!', path: '/game/memory', color: 'bg-indigo-100 text-indigo-500' },
    { id: 'drawing', title: 'Art Studio', description: 'Unleash your creativity!', path: '/game/drawing', color: 'bg-cyan-100 text-cyan-600' },
    { id: 'tictactoe', title: 'Tic Tac Toe', description: 'Can you beat Mr. Owl?', path: '/game/tictactoe', color: 'bg-green-100 text-green-500' },
    { id: 'rps', title: 'Rock Paper Scissors', description: 'Choose your move!', path: '/game/rps', color: 'bg-pink-100 text-pink-500' }
];

const GAMES_AR: GameItem[] = [
    { id: 'balloon', title: 'فرقعة البالونات', description: 'فرقع البالونات قبل أن تطير بعيداً!', path: '/game/balloon', color: 'bg-red-100 text-red-500' },
    { id: 'puzzle', title: 'لغز الصورة', description: 'أعد ترتيب الصورة المبعثرة!', path: '/game/puzzle', color: 'bg-orange-100 text-orange-500' },
    { id: 'memory', title: 'لعبة الذاكرة', description: 'جد الصور المتطابقة!', path: '/game/memory', color: 'bg-indigo-100 text-indigo-500' },
    { id: 'drawing', title: 'مرسم دنا', description: 'أطلق العنان لإبداعك!', path: '/game/drawing', color: 'bg-cyan-100 text-cyan-600' },
    { id: 'tictactoe', title: 'إكس أو', description: 'هل يمكنك الفوز على السيد بومة؟', path: '/game/tictactoe', color: 'bg-green-100 text-green-500' },
    { id: 'rps', title: 'حجرة ورقة مقص', description: 'اختر حركتك!', path: '/game/rps', color: 'bg-pink-100 text-pink-500' }
];

export const TRANSLATIONS = {
  en: {
    // ... existing ...
    nav_home: 'Home',
    nav_videos: 'Videos',
    nav_activities: 'Activities',
    nav_quizzes: 'Quizzes',
    nav_game: 'Games',
    nav_shop: 'Shop',
    nav_parents: 'Parents',
    nav_about: 'About',
    nav_contact: 'Contact',
    nav_blog: 'Blog',
    nav_profile: 'My Profile',
    nav_privacy: 'Privacy Policy',
    nav_terms: 'Terms of Service',
    nav_cookies: 'Cookie Policy',
    legal_last_updated: 'Last Updated',
    search_placeholder: 'Search...',
    header_hello: 'Hello',
    footer_brand: 'Dana for Children',
    footer_desc: 'Inspiring young minds through fun, learning, and creativity.',
    footer_explore: 'Explore',
    footer_contact: 'Get in Touch',
    footer_rights: 'All rights reserved.',
    footer_safety: 'Designed for safety and fun.',
    footer_email_btn: 'Email Us',
    footer_links_videos: 'Latest Videos',
    footer_links_activities: 'Free Printables',
    footer_links_quizzes: 'Play Quizzes',
    footer_links_shop: 'Merchandise',
    footer_links_parents: 'For Parents',
    footer_questions: 'Questions? Collaborations?',
    hero_title: 'Learn, Play & Grow!',
    hero_desc: 'Join Dana on magical adventures filled with songs, crafts, and learning fun!',
    hero_btn_watch: 'Watch Videos',
    hero_btn_quiz: 'Play Quizzes',
    home_new_videos: 'New Videos',
    home_watch_latest: 'Watch our latest adventures!',
    home_view_all: 'View All',
    home_activities_title: 'Fun Activities',
    home_activities_desc: 'Download coloring pages, puzzles, and worksheets to keep the fun going offline!',
    videos_title: 'Video Gallery',
    videos_subtitle: 'Choose a category to start watching!',
    videos_no_results: 'No videos found in this category yet!',
    video_favorites: 'My Favorites',
    no_favorites: 'No favorites yet. Click the heart on videos you like!',
    watch_back: 'Back to Videos',
    watch_next: 'Watch Next',
    activities_title: 'Activities & Downloads',
    activities_subtitle: 'Printables, games, and fun for everyone.',
    btn_download: 'Download Free',
    btn_get_access: 'Get Access',
    label_premium: 'Premium',
    label_age: 'Age',
    shop_title: "Dana's Shop",
    shop_subtitle: 'Toys, books, and merchandise.',
    shop_items_count: 'items',
    shop_sub_title: 'Join the Monthly Subscription Box!',
    shop_sub_desc: 'Get a box full of crafts, learning activities, and surprises delivered to your door every month.',
    shop_btn_learn: 'Learn More',
    shop_btn_buy: 'Buy Now',
    quiz_title: 'Fun Quizzes',
    quiz_subtitle: 'Test your knowledge and have fun!',
    quiz_play_now: 'Play Now',
    quiz_more_coming: 'More Quizzes Coming Soon!',
    quiz_check_back: 'Check back later for new challenges.',
    quiz_question: 'Question',
    quiz_exit: 'Exit',
    quiz_next: 'Next',
    quiz_correct: 'Correct Answers',
    quiz_play_again: 'Play Again',
    quiz_pick_another: 'Pick Another Quiz',
    games_title: 'Game Zone',
    games_subtitle: 'Play fun games with Dana and friends!',
    game_play_btn: 'Play Game',
    game_title: 'Memory Match',
    game_subtitle: 'Find the matching pairs!',
    game_turns: 'Turns',
    game_reset: 'Restart',
    game_won_title: 'You Won!',
    game_won_desc: 'Amazing memory! You finished in',
    game_play_again: 'Play Again',
    ttt_title: 'Tic Tac Toe',
    ttt_subtitle: 'Can you beat Mr. Owl?',
    ttt_turn: 'Turn',
    ttt_draw: "It's a Draw!",
    ttt_winner: "Winner:",
    rps_title: 'Rock Paper Scissors',
    rps_subtitle: 'Choose your move!',
    rps_you: 'You',
    rps_comp: 'Computer',
    rps_result_win: 'You Win! 🎉',
    rps_result_lose: 'You Lose! 🤖',
    rps_result_draw: 'Draw! 🤝',
    draw_title: 'Art Studio',
    draw_subtitle: 'Unleash your creativity!',
    draw_color: 'Color',
    draw_brush: 'Brush',
    draw_clear: 'Clear',
    draw_save: 'Save',
    draw_erase: 'Eraser',
    balloon_title: 'Balloon Pop',
    balloon_subtitle: 'Pop the balloons!',
    balloon_score: 'Score',
    balloon_time: 'Time',
    balloon_start: 'Start Game',
    balloon_game_over: 'Game Over!',
    puzzle_title: 'Slide Puzzle',
    puzzle_subtitle: 'Reorder the tiles to see the picture!',
    puzzle_moves: 'Moves',
    parents_title: "Parents' Corner",
    parents_intro: "Welcome to our dedicated space for caregivers. Here we share educational resources, parenting tips, and behind-the-scenes insights into how we create safe, engaging content for your little ones.",
    parents_safety_title: 'Our Safety Promise',
    parents_safety_desc: 'We strictly adhere to COPPA guidelines. Our content is vetted by educators to ensure it is age-appropriate, positive, and free from harmful themes.',
    parents_safety_link: 'Read our full safety policy',
    parents_philosophy_title: 'Learning Philosophy',
    parents_philosophy_desc: 'We believe in "Edutainment" - combining education with entertainment. We focus on emotional intelligence, basic literacy, and creative problem solving.',
    parents_philosophy_link: 'Explore resources',
    parents_newsletter_title: 'Join the Family Newsletter',
    parents_newsletter_desc: 'Get weekly activity sheets, parenting hacks, and updates on new videos.',
    parents_newsletter_placeholder: "Parent's Email Address",
    parents_btn_subscribe: 'Subscribe',
    parents_privacy: 'We respect your privacy. Unsubscribe at any time.',
    blog_title: 'Our Blog',
    blog_subtitle: 'Stories, tips, and news from Dana for Children.',
    blog_read_more: 'Read More',
    blog_back: 'Back to Blog',
    search_title: 'Search Results',
    search_for: 'Results for',
    search_no_results: 'No results found. Try a different word!',
    profile_title: 'Customize Your Profile',
    profile_name_label: 'Your Name',
    profile_avatar_label: 'Choose a Character',
    profile_save: 'Save Profile',
    profile_saved_msg: 'Profile Saved!',
    about_title: 'Who We Are',
    about_quote: '"Making the world brighter, one smile at a time."',
    about_p1: 'Dana for Children started with a simple idea: to create a digital space where kids can be kids. In a world of fast-paced content, we slow down to appreciate songs, stories, and the joy of creating things with our hands.',
    about_p2: 'Our videos are designed to be watched *with* parents, sparking conversations and offline play.',
    about_team_title: 'Meet the Friends',
    contact_title: 'Contact Us',
    contact_subtitle: "We'd love to hear from parents and partners!",
    contact_name: 'Name',
    contact_email: 'Email Address',
    contact_subject: 'Subject',
    contact_message: 'Message',
    contact_btn_send: 'Send Message',
    contact_disclaimer: 'For business inquiries regarding the "Dana for Children" YouTube channel, please use the form above. We do not accept unsolicited video submissions.',
    // Radio
    radio_title: "Dana's Radio"
  },
  ar: {
    // ... existing ...
    nav_home: 'الرئيسية',
    nav_videos: 'فيديوهات',
    nav_activities: 'نشاطات',
    nav_quizzes: 'مسابقات',
    nav_game: 'ألعاب',
    nav_shop: 'المتجر',
    nav_parents: 'الأهل',
    nav_about: 'من نحن',
    nav_contact: 'تواصل معنا',
    nav_blog: 'المدونة',
    nav_profile: 'ملفي الشخصي',
    nav_privacy: 'سياسة الخصوصية',
    nav_terms: 'شروط الخدمة',
    nav_cookies: 'سياسة ملفات تعريف الارتباط',
    legal_last_updated: 'آخر تحديث',
    search_placeholder: 'بحث...',
    header_hello: 'مرحباً',
    footer_brand: 'دنا للأطفال',
    footer_desc: 'نلهم العقول الصغيرة بالمرح، التعلم، والإبداع.',
    footer_explore: 'استكشف',
    footer_contact: 'تواصل معنا',
    footer_rights: 'جميع الحقوق محفوظة.',
    footer_safety: 'مصمم بأمان ومرح.',
    footer_email_btn: 'راسلنا',
    footer_links_videos: 'أحدث الفيديوهات',
    footer_links_activities: 'مطبوعات مجانية',
    footer_links_quizzes: 'العب المسابقات',
    footer_links_shop: 'المتجر',
    footer_links_parents: 'للأهل',
    footer_questions: 'لديك أسئلة أو اقتراحات؟',
    hero_title: 'تعلم، العب وانمو!',
    hero_desc: 'انضم إلى دنا في مغامرات سحرية مليئة بالأغاني، الحرف اليدوية، والتعلم الممتع!',
    hero_btn_watch: 'شاهد الفيديوهات',
    hero_btn_quiz: 'العب المسابقات',
    home_new_videos: 'فيديوهات جديدة',
    home_watch_latest: 'شاهد أحدث مغامراتنا!',
    home_view_all: 'عرض الكل',
    home_activities_title: 'نشاطات ممتعة',
    home_activities_desc: 'حمل صفحات التلوين، الألغاز، وأوراق العمل لتستمر المتعة بعيداً عن الشاشة!',
    videos_title: 'مكتبة الفيديو',
    videos_subtitle: 'اختر تصنيفاً وابدأ المشاهدة!',
    videos_no_results: 'لا توجد فيديوهات في هذا التصنيف بعد!',
    video_favorites: 'مفضلاتي',
    no_favorites: 'لا توجد مفضلات بعد. اضغط على القلب لإضافة فيديو!',
    watch_back: 'العودة للفيديوهات',
    watch_next: 'شاهد التالي',
    activities_title: 'نشاطات ومطبوعات',
    activities_subtitle: 'صفحات تلوين، ألعاب، ومرح للجميع.',
    btn_download: 'تحميل مجاني',
    btn_get_access: 'احصل عليه الآن',
    label_premium: 'مميز',
    label_age: 'عمر',
    shop_title: 'متجر دنا',
    shop_subtitle: 'ألعاب، كتب، ومنتجات رائعة.',
    shop_items_count: 'منتجات',
    shop_sub_title: 'اشترك في صندوق دنا الشهري!',
    shop_sub_desc: 'احصل على صندوق مليء بالحرف، النشاطات التعليمية، والمفاجآت يصلك لباب منزلك كل شهر.',
    shop_btn_learn: 'اعرف المزيد',
    shop_btn_buy: 'اشترِ الآن',
    quiz_title: 'مسابقات ممتعة',
    quiz_subtitle: 'اختبر معلوماتك واستمتع باللعب!',
    quiz_play_now: 'العب الآن',
    quiz_more_coming: 'المزيد من المسابقات قريباً!',
    quiz_check_back: 'عد لاحقاً لتحديات جديدة.',
    quiz_question: 'السؤال',
    quiz_exit: 'خروج',
    quiz_next: 'التالي',
    quiz_correct: 'إجابات صحيحة',
    quiz_play_again: 'العب مجدداً',
    quiz_pick_another: 'اختر مسابقة أخرى',
    games_title: 'منطقة الألعاب',
    games_subtitle: 'العب ألعاباً ممتعة مع دنا والأصدقاء!',
    game_play_btn: 'ابدا اللعب',
    game_title: 'لعبة الذاكرة',
    game_subtitle: 'جد الصور المتطابقة!',
    game_turns: 'المحاولات',
    game_reset: 'إعادة اللعب',
    game_won_title: 'أنت فائز!',
    game_won_desc: 'ذاكرة مذهلة! لقد انتهيت في',
    game_play_again: 'العب مجدداً',
    ttt_title: 'إكس أو',
    ttt_subtitle: 'هل يمكنك الفوز على السيد بومة؟',
    ttt_turn: 'دور',
    ttt_draw: "تعادل!",
    ttt_winner: "الفائز:",
    rps_title: 'حجرة ورقة مقص',
    rps_subtitle: 'اختر حركتك!',
    rps_you: 'أنت',
    rps_comp: 'الكمبيوتر',
    rps_result_win: 'أنت فزت! 🎉',
    rps_result_lose: 'أنت خسرت! 🤖',
    rps_result_draw: 'تعادل! 🤝',
    draw_title: 'مرسم دنا',
    draw_subtitle: 'أطلق العنان لإبداعك!',
    draw_color: 'لون',
    draw_brush: 'فرشاة',
    draw_clear: 'مسح الكل',
    draw_save: 'حفظ',
    draw_erase: 'ممحاة',
    balloon_title: 'فرقعة البالونات',
    balloon_subtitle: 'فرقع البالونات!',
    balloon_score: 'النتيجة',
    balloon_time: 'الوقت',
    balloon_start: 'ابدأ اللعب',
    balloon_game_over: 'انتهت اللعبة!',
    puzzle_title: 'لغز الصورة',
    puzzle_subtitle: 'رتب المربعات لتظهر الصورة!',
    puzzle_moves: 'حركات',
    parents_title: 'زاوية الأهل',
    parents_intro: 'مرحباً بكم في مساحتكم المخصصة. هنا نشارك المصادر التعليمية، نصائح التربية، وكواليس صناعة محتوى آمن وممتع لأطفالكم.',
    parents_safety_title: 'وعدنا بالأمان',
    parents_safety_desc: 'نلتزم بصرامة بمعايير حماية الطفل على الإنترنت (COPPA). محتوانا مراجع من قبل تربويين لضمان ملاءمته للعمر، إيجابيته، وخلوه من أي مواضيع ضارة.',
    parents_safety_link: 'اقرأ سياسة الأمان الكاملة',
    parents_philosophy_title: 'فلسفة التعلم',
    parents_philosophy_desc: 'نؤمن بـ "التعلم الترفيهي" - دمج التعليم مع التسلية. نركز على الذكاء العاطفي، أساسيات القراءة، وحل المشكلات بطرق إبداعية.',
    parents_philosophy_link: 'تصفح المصادر',
    parents_newsletter_title: 'انضم إلى عائلة دنا',
    parents_newsletter_desc: 'احصل على أوراق عمل أسبوعية، نصائح، وتحديثات عن الفيديوهات الجديدة.',
    parents_newsletter_placeholder: 'البريد الإلكتروني لولي الأمر',
    parents_btn_subscribe: 'اشترك',
    parents_privacy: 'نحن نحترم خصوصيتك. يمكنك إلغاء الاشتراك في أي وقت.',
    blog_title: 'مدونتنا',
    blog_subtitle: 'قصص، نصائح، وأخبار من دنا للأطفال.',
    blog_read_more: 'اقرأ المزيد',
    blog_back: 'العودة للمدونة',
    search_title: 'نتائج البحث',
    search_for: 'النتائج عن',
    search_no_results: 'لم يتم العثور على نتائج. جرب كلمة أخرى!',
    profile_title: 'صمم ملفك الشخصي',
    profile_name_label: 'اسمك',
    profile_avatar_label: 'اختر شخصية',
    profile_save: 'حفظ الملف',
    profile_saved_msg: 'تم الحفظ!',
    about_title: 'من نحن',
    about_quote: '"نجعل العالم أكثر إشراقاً، ابتسامة تلو الأخرى."',
    about_p1: 'بدأت قناة "دنا للأطفال" بفكرة بسيطة: خلق مساحة رقمية حيث يمكن للأطفال أن يكونوا أطفالاً. في عالم مليء بالمحتوى السريع، نحن نتمهل لنستمتع بالأغاني، القصص، ومتعة صنع الأشياء بأيدينا.',
    about_p2: 'صُممت فيديوهاتنا ليتم مشاهدتها *مع* الأهل، لتشعل شرارة الحوار واللعب بعيداً عن الشاشات.',
    about_team_title: 'تعرف على الأصدقاء',
    contact_title: 'تواصل معنا',
    contact_subtitle: 'نسعد بسماع آراء الأهل والشركاء!',
    contact_name: 'الاسم',
    contact_email: 'البريد الإلكتروني',
    contact_subject: 'الموضوع',
    contact_message: 'الرسالة',
    contact_btn_send: 'إرسال الرسالة',
    contact_disclaimer: 'للاستفسارات التجارية بخصوص قناة "دنا للأطفال" على يوتيوب، يرجى استخدام النموذج أعلاه. نحن لا نقبل تقديمات الفيديو غير المطلوبة.',
    // Radio
    radio_title: 'راديو دنا'
  }
};

export const DATA = {
  en: {
    videos: VIDEOS_EN,
    activities: ACTIVITIES_EN,
    products: PRODUCTS_EN,
    team: TEAM_EN,
    quizzes: QUIZZES_EN,
    blog: BLOG_EN,
    songs: SONGS_EN,
    games: GAMES_EN,
    categories: ['All', 'Favorites', 'Fun', 'Learning', 'Songs', 'Crafts'],
    translations: TRANSLATIONS.en
  },
  ar: {
    videos: VIDEOS_AR,
    activities: ACTIVITIES_AR,
    products: PRODUCTS_AR,
    team: TEAM_AR,
    quizzes: QUIZZES_AR,
    blog: BLOG_AR,
    songs: SONGS_AR,
    games: GAMES_AR,
    categories: ['الكل', 'مفضلاتي', 'مرح', 'تعليمي', 'أغاني', 'حرف يدوية'],
    translations: TRANSLATIONS.ar
  }
};