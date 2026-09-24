/**
 * Saito Travel Guide: Shizuoka & Shimizu Discovery Tour
 * Multi-page Navigation Engine, Tri-lingual Translation (EN / JA / NE),
 * and Interactive Photo Lightbox Modal with Explanations
 */

(function () {
    'use strict';

    // ============================================================
    // 1. PAGE NAVIGATION & DIRECT TAB SWITCHING
    // ============================================================
    const navButtons = document.querySelectorAll('.nav-btn');
    const pageSections = document.querySelectorAll('.page-section');

    function switchPage(pageId, anchorId) {
        if (!pageId) return;

        navButtons.forEach(btn => {
            if (btn.getAttribute('data-page') === pageId) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        pageSections.forEach(section => {
            const sectionId = section.getAttribute('id').replace('page-', '');
            if (sectionId === pageId) {
                section.classList.add('active-page');
            } else {
                section.classList.remove('active-page');
            }
        });

        if (anchorId) {
            setTimeout(() => {
                const targetElem = document.getElementById(anchorId);
                if (targetElem) {
                    targetElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            }, 100);
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    navButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            const targetPage = this.getAttribute('data-page');
            switchPage(targetPage);
        });
    });

    document.querySelectorAll('[data-target-page]').forEach(elem => {
        elem.addEventListener('click', function (e) {
            e.preventDefault();
            const targetPage = this.getAttribute('data-target-page');
            const spotAnchor = this.getAttribute('data-spot-anchor');
            switchPage(targetPage, spotAnchor);
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#spot-')) {
                e.preventDefault();
                const spotId = href.replace('#', '');
                switchPage('spots', spotId);
            }
        });
    });


    // ============================================================
    // 2. INTERACTIVE LIGHTBOX MODAL WITH PHOTO EXPLANATIONS
    // ============================================================
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxBackdrop = document.querySelector('.lightbox-backdrop');
    const lightboxCloseBtn = document.getElementById('lightbox-close');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDesc = document.getElementById('lightbox-desc');
    const lbPrevBtn = document.getElementById('lb-prev-btn');
    const lbNextBtn = document.getElementById('lb-next-btn');

    let currentGalleryItems = [];
    let currentGalleryIndex = 0;

    function openLightbox(galleryItem) {
        const galleryParent = galleryItem.closest('.gallery-grid, .food-gallery-grid');
        if (galleryParent) {
            currentGalleryItems = Array.from(galleryParent.querySelectorAll('.gallery-item'));
            currentGalleryIndex = currentGalleryItems.indexOf(galleryItem);
        } else {
            currentGalleryItems = [galleryItem];
            currentGalleryIndex = 0;
        }

        updateLightboxContent();
        lightboxModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightboxModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    function updateLightboxContent() {
        if (!currentGalleryItems[currentGalleryIndex]) return;
        const item = currentGalleryItems[currentGalleryIndex];

        const imgSrc = item.getAttribute('data-img') || item.querySelector('img').src;
        const titleText = item.getAttribute('data-title') || item.querySelector('.g-caption').textContent;
        const descText = item.getAttribute('data-desc') || 'Explore this delicious dish or highlight of the Shizuoka tour.';

        lightboxImg.src = imgSrc;
        lightboxTitle.textContent = titleText;
        lightboxDesc.textContent = descText;
    }

    function showPrevImage() {
        if (currentGalleryItems.length === 0) return;
        currentGalleryIndex = (currentGalleryIndex - 1 + currentGalleryItems.length) % currentGalleryItems.length;
        updateLightboxContent();
    }

    function showNextImage() {
        if (currentGalleryItems.length === 0) return;
        currentGalleryIndex = (currentGalleryIndex + 1) % currentGalleryItems.length;
        updateLightboxContent();
    }

    // Attach click listeners to all gallery items (spots + food dishes)
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', function () {
            openLightbox(this);
        });
    });

    if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);
    if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
    if (lbPrevBtn) lbPrevBtn.addEventListener('click', showPrevImage);
    if (lbNextBtn) lbNextBtn.addEventListener('click', showNextImage);

    document.addEventListener('keydown', function (e) {
        if (!lightboxModal.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPrevImage();
        if (e.key === 'ArrowRight') showNextImage();
    });


    // ============================================================
    // 3. TRI-LINGUAL TRANSLATION ENGINE (EN / JA / NE)
    // ============================================================
    const langEnBtn = document.getElementById('lang-en-btn');
    const langJaBtn = document.getElementById('lang-ja-btn');
    const langNeBtn = document.getElementById('lang-ne-btn');

    const i18n = {
        en: {
            'nav-home': 'Home',
            'nav-spots': 'Destinations',
            'nav-lunch': 'Lunch Guide',
            'nav-schedule': 'Schedule',

            'hero-date': 'September 12, 2026 (Saturday)',
            'hero-weather': 'Sunny & Clear Mt. Fuji Visibility (26°C / 79°F)',
            'home-title': 'Saito Travel Guide: Shizuoka & Shimizu Discovery Tour',
            'hero-sub': 'Comprehensive day tour featuring Suruga Bay Cruise, Miho no Matsubara World Heritage, and Kunozan Toshogu Shrine.',
            'home-clientName': 'Chubu Computer & Patissier College',
            'home-bus': 'Medium Chartered Coach (1 Bus) | Shin-Tomei Expressway',

            'qs-title': 'Quick Direct Navigation:',
            'qs-1': 'Suruga Bay Promenade Cruise (12:40 - 13:20)',
            'qs-2': 'Miho no Matsubara Pine Grove (13:00 - 13:45)',
            'qs-3': 'Kunozan Toshogu Shrine & Ropeway (13:40 - 15:00)',

            'spots-sub-tag': 'SPOTLIGHT LOCATIONS',
            'spots-section-title': 'Tour Itinerary & 3 Featured Destinations',
            'spots-section-desc': 'Explore the panoramic Suruga Bay Cruise, the historic pine grove of Miho no Matsubara, and the National Treasure Kunozan Toshogu Shrine.',

            // Spot 1
            'spot1-title': 'Suruga Bay Promenade Cruise',
            'spot1-lead': 'Panoramic harbor cruise with sea-level Mount Fuji views and friendly seagulls.',
            'spot1-body': 'A 40-minute scenic cruise departing from Hinode Pier. Passengers enjoy sweeping ocean views of Mount Fuji and the Pine Groves of Miho. Flocks of black-tailed gulls glide alongside the ship, offering an unforgettable interactive bird-feeding experience from the open-air upper deck.',
            's1-h1': 'Direct Mount Fuji ocean panorama',
            's1-h2': 'Interactive seagull bird feeding',
            's1-h3': 'Spacious sundeck & indoor cabins',
            'g1-c1': 'Bay Promenade Vessel at Pier',
            'g1-c2': 'Mount Fuji Ocean Panorama',
            'g1-c3': 'Seagulls Following the Ship',
            's1-fee': '¥1,000 (Group rate) / Student: ¥500',
            's1-rest': '4+ Clean barrier-free restrooms on pier & ship',
            's1-access': '100% flat boarding ramp for wheelchairs & buggies',

            // Spot 2
            'spot2-title': 'Miho no Matsubara Pine Grove',
            'spot2-lead': 'Historic 7km coastline with 30,000 pine trees and Hagoromo celestial pine legend.',
            'spot2-body': 'Registered as part of the UNESCO World Heritage site for Mount Fuji in 2013. A 7-kilometer shoreline shaded by over 30,000 ancient Japanese black pines. It features the revered "Hagoromo no Matsu" pine tree and the newly opened Miho Shirube Cultural Center.',
            's2-h1': 'UNESCO World Heritage monument',
            's2-h2': 'Sacred "Kami-no-Michi" Pine Path',
            's2-h3': 'Modern Miho Shirube Culture Center',
            'g2-c1': 'Miho Pine Shore & Mount Fuji',
            'g2-c2': 'Kami-no-Michi Pine Avenue',
            'g2-c3': 'Miho Shirube Culture Center',
            's2-fee': 'Free (¥0) / Student: Free (¥0)',
            's2-rest': '12 Heated bidet accessible toilets at visitor center',
            's2-access': 'Flat timber boardwalk; free wheelchairs at info desk',

            // Spot 3
            'spot3-title': 'Kunozan Toshogu Shrine & Ropeway',
            'spot3-lead': 'National Treasure sanctuary on Mount Kuno, connected via scenic Nihondaira cable car.',
            'spot3-body': 'The original resting place of shogun Tokugawa Ieyasu. The main sanctuary is designated as a National Treasure of Japan, richly adorned with Momoyama-era lacquer and gold-leaf carvings. Access from Nihondaira is provided by the scenic Nihondaira Ropeway gliding across Jigokudani valley.',
            's3-h1': 'Designated National Treasure of Japan',
            's3-h2': 'Scenic Nihondaira Ropeway gondola',
            's3-h3': 'Museum with Tokugawa samurai armors',
            'g3-c1': 'National Treasure Main Sanctuary',
            'g3-c2': 'Nihondaira Ropeway Gondola',
            'g3-c3': 'Ocean Lookout from Gate',
            's3-fee': '¥800 (Shrine + Ropeway) / Student: ¥400',
            's3-rest': '3 Locations at Nihondaira station & shrine office',
            's3-access': 'Ropeway accessible; inner shrine has stone steps',

            // Common Specs
            'lbl-admission': 'Admission Fee',
            'lbl-restrooms': 'Restroom Facilities',
            'lbl-access': 'Accessibility',
            'gallery-label': 'Photo Gallery (Click image to expand full view & explanation)',
            'food-gallery-label': 'Featured Dishes Photo Gallery (Click dish photo to expand full view & details)',
            'g-view': 'Click to View',
            'btn-gmap': 'Open in Google Maps',

            // Lunch
            'lunch-tag': 'LOCAL GOURMET EXPERIENCE',
            'lunch-heading': 'Shimizu Gourmet Lunch & Menu Guide',
            'lunch-sub': 'Shimizu Port handles nearly half of Japan’s total tuna catch. Discover prime sushi alleys, fish market sashimi bowls, and detailed menus with prices (¥).',
            'l1-desc': 'Located inside the oceanfront S-Pulse Dream Plaza mall. Shimizu Port lands roughly 50% of all deep-sea tuna in Japan. Master chefs serve raw seafood bowls, omakase nigiri, and fresh catches.',
            'l2-desc': 'Situated directly by Shimizu Port docking berths. Operated by local fish wholesalers, offering the freshest possible sashimi at unbeatable wholesale rates.',
            'menu-list-title': 'Detailed Menu Items & Prices (Shimizu Sushi Yokocho)',
            'menu-list-title-2': 'Detailed Menu Items & Prices (Kashi-no-Ichi Market)',
            'btn-dir': 'Directions',

            // Schedule
            'sched-tag': 'FULL DAY TIMETABLE',
            'sched-heading': 'Official Tour Itinerary (08:30 - 18:30)',
            'sched-desc': 'Comfortable chartered coach transit across all destinations with planned highway rest stops.',
            'sched-loc-1': 'Campus Entrance',
            'sched-t-1': 'Departure from Campus',
            'sched-d-1': 'Boarding the chartered medium coach. Departure via Shin-Tomei Expressway.',
            'sched-loc-2': 'S-Pulse Dream Plaza & Shimizu Port',
            'sched-t-2': 'Lunch Break & Harbor Walk',
            'sched-d-2': 'Free time to enjoy Shimizu sushi, sakura shrimp, and fresh tuna bowls.',
            'sched-loc-3': 'Hinode Pier Terminal',
            'sched-t-3': 'Stop 1: Suruga Bay Promenade Cruise',
            'sched-d-3': '40-minute scenic cruise with Mount Fuji views and seagull feeding.',
            'sched-loc-4': 'Miho Peninsula Coast',
            'sched-t-4': 'Stop 2: Miho no Matsubara Pine Grove',
            'sched-d-4': 'Walking through 30,000 pine trees and Kami-no-Michi historic path.',
            'sched-loc-5': 'Nihondaira & Mount Kuno',
            'sched-t-5': 'Stop 3: Kunozan Toshogu & Ropeway',
            'sched-d-5': 'Ropeway cable car ride followed by visiting the National Treasure sanctuary of Tokugawa Ieyasu.',
            'sched-loc-6': 'Highway Rest Area Stop',
            'sched-t-6': 'Return Journey via Expressway',
            'sched-d-6': 'Comfortable return ride with one rest stop for souvenir shopping.',
            'sched-loc-7': 'Campus Front Entrance',
            'sched-t-7': 'Arrival Back at Campus',
            'sched-d-7': 'Safe arrival, dismissal and end of tour.'
        },

        ja: {
            'nav-home': 'ホーム',
            'nav-spots': '観光地一覧',
            'nav-lunch': '昼食ガイド',
            'nav-schedule': '日程表',

            'hero-date': '令和8年9月12日 (土曜日)',
            'hero-weather': '晴天・富士山視界良好 (26°C)',
            'home-title': '斉 観光ガイド: 静岡・清水ディスカバリーツアー',
            'hero-sub': '駿河湾クルーズ、世界遺産・三保の松原、国宝・久能山東照宮を巡る日帰り満喫ツアー。',
            'home-clientName': '中部コンピュータ・パティシエ専門学校様',
            'home-bus': '中型貸切バス (1台) | 新東名高速道路',

            'qs-title': 'クイックページ移動:',
            'qs-1': '駿河湾フェリークルーズ (12:40 - 13:20)',
            'qs-2': '三保の松原 (13:00 - 13:45)',
            'qs-3': '久能山東照宮・ロープウェイ (13:40 - 15:00)',

            'spots-sub-tag': '主要観光スポット',
            'spots-section-title': 'ツアー日程と3大見どころ名所',
            'spots-section-desc': '駿河湾の大パノラマクルーズ、歴史ある三保の松原、そして国宝・久能山東照宮を体験。',

            // Spot 1
            'spot1-title': '駿河湾フェリー・遊覧船クルーズ',
            'spot1-lead': '清水港から望む富士山の大パノラマとカモメとの戯れ体験。',
            'spot1-body': '日の出埠頭から出港する約40分間の絶景クルーズ。船上からは駿河湾越しに富士山と三保の松原が一望できます。デッキではウミネコやカモメへの餌やり体験が楽しめます。',
            's1-h1': '富士山と駿河湾の大パノラマ絶景',
            's1-h2': 'カモメ・ウミネコへの餌やり体験',
            's1-h3': '広々としたサンデッキと室内客室',
            'g1-c1': '日の出埠頭の遊覧船',
            'g1-c2': '海からの富士山大パノラマ',
            'g1-c3': '船を追うカモメの群れ',
            's1-fee': '¥1,000 (団体割引) / 学生: ¥500',
            's1-rest': '埠頭および船内にバリアフリートイレ完備',
            's1-access': '車椅子・ベビーカー対応フラット乗船スロープ',

            // Spot 2
            'spot2-title': '富士山世界文化遺産構成資産 三保の松原',
            'spot2-lead': '約3万本の松林が続く7kmの海岸美と天女の羽衣伝説。',
            'spot2-body': '2013年に富士山世界文化遺産の構成資産に登録。約3万本の松並木と黒砂の海岸越しに見る富士山はまさに絶景。羽衣の松や文化館「みほしるべ」が見どころです。',
            's2-h1': 'ユネスコ世界文化遺産構成資産',
            's2-h2': '神の道（樹齢数百年の松並木参道）',
            's2-h3': '静岡市三保松原文化創造センター「みほしるべ」',
            'g2-c1': '三保の松原と富士山の絶景',
            'g2-c2': '神の道（木道木並木）',
            'g2-c3': 'みほしるべ文化館',
            's2-fee': '無料 (¥0)',
            's2-rest': '文化館内に温水洗浄便座付き多目的トイレ完備',
            's2-access': 'バリアフリー木道整備；車椅子無料貸出あり',

            // Spot 3
            'spot3-title': '国宝 久能山東照宮・日本平ロープウェイ',
            'spot3-lead': '徳川家康公を祀る最初の東照宮。絶景ロープウェイでアクセス。',
            'spot3-body': '徳川家康公の遺訓により建てられた最初の東照宮。権現造りの社殿は国宝に指定。日本平からは地獄谷を越える日本平ロープウェイで空中散歩を満喫できます。',
            's3-h1': '国宝指定の豪華絢爛な御社殿',
            's3-h2': '日本平ロープウェイ空中散歩',
            's3-h3': '家康公の甲冑を展示する博物館',
            'g3-c1': '国宝 久能山東照宮社殿',
            'g3-c2': '日本平ロープウェイゴンドラ',
            'g3-c3': '門からの駿河湾一望',
            's3-fee': '¥800 (社殿+ロープウェイ) / 学生: ¥400',
            's3-rest': '日本平駅および社務所横にトイレあり',
            's3-access': 'ロープウェイ乗降可；境内は石段あり',

            // Common Specs
            'lbl-admission': '拝観・乗船料',
            'lbl-restrooms': 'お手洗い設備',
            'lbl-access': 'バリアフリー対応',
            'gallery-label': 'フォトギャラリー（クリックで拡大＆詳細表示）',
            'food-gallery-label': '料理フォトギャラリー（画像クリックで拡大・料金詳細）',
            'g-view': '詳細を開く',
            'btn-gmap': 'Google Mapsで開く',

            // Lunch
            'lunch-tag': '清水港の名物グルメ',
            'lunch-heading': '清水グルメランチ＆お品書きガイド',
            'lunch-sub': '日本全国のマグロの水揚げ量の約半分を誇る清水港。絶品海鮮丼や寿司、お品書きと価格（税込）を掲載。',
            'l1-desc': 'エスパルスドリームプラザ内。全国から仕入れた最高級マグロや新鮮海鮮を扱う寿司店が集結。',
            'l2-desc': '清水港ドックに隣接する魚市場。水産卸業者が直営する市場ならではの新鮮刺身を堪能。',
            'menu-list-title': 'お品書き・お品物・価格（清水すし横丁）',
            'menu-list-title-2': 'お品書き・お品物・価格（河岸の市）',
            'btn-dir': 'ルート案内',

            // Schedule
            'sched-tag': '当日の運行日程',
            'sched-heading': '公式タイムスケジュール (08:30 - 18:30)',
            'sched-desc': '中型バスによる快適な移動と十分な休憩時間を確保したスケジュール。',
            'sched-loc-1': '学校前',
            'sched-t-1': '学校出発',
            'sched-d-1': '中型貸切バスへ乗車。新東名高速経由にて出発。',
            'sched-loc-2': 'エスパルスドリームプラザ',
            'sched-t-2': '昼食・港散策自由時間',
            'sched-d-2': '清水寿司横丁にてランチ＆港の散策。',
            'sched-loc-3': '日の出埠頭',
            'sched-t-3': '見どころ①: 駿河湾クルーズ',
            'sched-d-3': '40分間の船上富士山鑑賞＆カモメ餌やり体験。',
            'sched-loc-4': '三保半島海岸',
            'sched-t-4': '見どころ②: 三保の松原散策',
            'sched-d-4': '神の道と3万本の松並木散策。',
            'sched-loc-5': '日本平・久能山',
            'sched-t-5': '見どころ③: 久能山東照宮＆ロープウェイ',
            'sched-d-5': 'ロープウェイ乗車と国宝社殿参拝。',
            'sched-loc-6': '高速サービスエリア',
            'sched-t-6': 'サービスエリア休憩・帰路',
            'sched-d-6': 'お土産買い物休憩を挟み豊橋へ。',
            'sched-loc-7': '学校前',
            'sched-t-7': '学校到着・解散',
            'sched-d-7': '無事到着、お疲れ様でした！解散。'
        },

        ne: {
            'nav-home': 'गृहपृष्ठ (Home)',
            'nav-spots': 'भ्रमण स्थलहरू (Destinations)',
            'nav-lunch': 'खाजा गाइड (Lunch)',
            'nav-schedule': 'समय तालिका (Schedule)',

            'hero-date': 'सेप्टेम्बर १२, २०२६ (शनिबार)',
            'hero-weather': 'मौसम: सफा र घाम लागेको, माउन्ट फुजी स्पष्ट देखिने (26°C)',
            'home-title': 'साइतो ट्राभल गाइड: सिजुओका र सिमिजु भ्रमण',
            'hero-sub': 'सुरुगा खाडी क्रुज, युनेस्को विश्व सम्पदा मिहो नो मात्सुबारा र कुनोजान तोसोगु मन्दिरको पूर्ण दिन भ्रमण।',
            'home-clientName': 'चुबु कम्प्युटर तथा पातिसिएर कलेज',
            'home-bus': 'मध्यम आकारको बस (१ वटा) | शिन-तोमे एक्सप्रेसवे',

            'qs-title': 'सोझै पेज खोल्नुहोस् (Direct Links):',
            'qs-1': 'सुरुगा खाडी क्रुज (12:40 - 13:20)',
            'qs-2': 'मिहो नो मात्सुबारा (13:00 - 13:45)',
            'qs-3': 'कुनोजान तोसोगु मन्दिर (13:40 - 15:00)',

            'spots-sub-tag': 'मुख्य भ्रमण स्थानहरू',
            'spots-section-title': '३ मुख्य आकर्षक भ्रमण स्थलहरू (Destinations)',
            'spots-section-desc': 'सुरुगा खाडीको समुद्री क्रुज, ऐतिहासिक सल्लाको जंगल मिहो नो मात्सुबारा र राष्ट्रिय सम्पदा कुनोजान तोसोगु मन्दिर।',

            // Spot 1
            'spot1-title': 'सुरुगा खाडी फेरी तथा क्रुज (Suruga Bay Cruise)',
            'spot1-lead': 'माउन्ट फुजीको मनोरम दृश्य र समुद्री फिस्टा (Seagulls) सँगको अन्तरक्रिया।',
            'spot1-body': 'हिनोदे बन्दरगाहबाट सुरु हुने ४० मिनेटको समुद्री क्रुज। पानीजहाजबाट माउन्ट फुजी र समुन्द्रको सुन्दर दृश्य देखिन्छ। जहाजको माथिल्लो deck बाट चराहरूलाई खाना खुवाउने रमाइलो अनुभव लिन सकिन्छ।',
            's1-h1': 'माउन्ट फुजीको सुन्दर समुद्री दृश्य',
            's1-h2': 'समुद्री चराहरूलाई दाना खुवाउने अवसर',
            's1-h3': 'खुल्ला डेक र आरामदायी भित्री बैठक',
            'g1-c1': 'हिनोदे बन्दरगाहमा रहेको क्रुज जहाज',
            'g1-c2': 'समुन्द्रबाट माउन्ट फुजीको दृश्य',
            'g1-c3': 'जहाजको पछाडि उड्दै गरेका चराहरू',
            's1-fee': '¥१,००० (सामूहिक दर) / विद्यार्थी: ¥५००',
            's1-rest': 'बन्दरगाह र जहाजमा ४ भन्दा बढी सफा शौचालय',
            's1-access': 'ह्विलचेयर र बच्चाको गाडीका लागि १००% समतल बाटो',

            // Spot 2
            'spot2-title': 'मिहो नो मात्सुबारा सल्लाको जंगल (Miho no Matsubara)',
            'spot2-lead': '३०,००० भन्दा बढी प्राचीन सल्लाका रुखहरू भएको ७ किमी लामो ऐतिहासिक समुद्री किनार।',
            'spot2-body': 'सन् २०१३ मा युनेस्को विश्व सम्पदा सूचीमा दर्ता भएको ऐतिहासिक क्षेत्र। ७ किलोमिटर लामो समुद्री किनारमा ३०,००० भन्दा बढी कालो सल्लाका रुखहरू छन्। यहाँ प्रसिद्ध "हगोरोमो" सल्लाको रुख र संस्कृति केन्द्र रहेको छ।',
            's2-h1': 'युनेस्को विश्व सम्पदा क्षेत्र',
            's2-h2': 'पवित्र "कामी-नो-मिची" काठको बाटो',
            's2-h3': 'आधुनिक मिहो सिरुबे सांस्कृतिक केन्द्र',
            'g2-c1': 'सल्लाको किनार र माउन्ट फुजी',
            'g2-c2': 'कामी-नो-मिची सल्लाको पैदल बाटो',
            'g2-c3': 'मिहो सिरुबे संस्कृति केन्द्र',
            's2-fee': 'निःशुल्क (¥0)',
            's2-rest': 'भिजिटर सेन्टरमा १२ वटा आधुनिक शौचालय',
            's2-access': 'काठको समतल पैदल बाटो; निःशुल्क ह्विलचेयर उपलब्ध',

            // Spot 3
            'spot3-title': 'कुनोजान तोसोगु मन्दिर र केबलकार (Kunozan Toshogu & Ropeway)',
            'spot3-lead': 'माउन्ट कुनोमा अवस्थित राष्ट्रिय सम्पदा मन्दिर र रोपेवे केबलकार।',
            'spot3-body': 'तोकुगावा इएयासुको मूल मन्दिर। मुख्य मन्दिरलाई जापानको राष्ट्रिय सम्पदा घोषणा गरिएको छ। निहोन्दाइराबाट रोपेवे केबलकार चढेर मनोरम डाँडाकाँडा र समुन्द्रको दृश्य हेर्दै पुग्न सकिन्छ।',
            's3-h1': 'जापानको आधिकारिक राष्ट्रिय सम्पदा (National Treasure)',
            's3-h2': 'निहोन्दाइरा रोपेवे केबलकारको रमाइलो यात्रा',
            's3-h3': 'तोकुगावा राजाका हतियार र संग्रहालय',
            'g3-c1': 'कुनोजान तोसोगु राष्ट्रिय मन्दिर',
            'g3-c2': 'निहोन्दाइरा रोपेवे केबलकार',
            'g3-c3': 'मन्दिरको ढोकाबाट समुन्द्रको दृश्य',
            's3-fee': '¥८०० (मन्दिर + केबलकार) / विद्यार्थी: ¥४००',
            's3-rest': 'रोपेवे स्टेसन र मन्दिर परिसरमा ३ ठाउँमा शौचालय',
            's3-access': 'केबलकार ह्विलचेयर योग्य; मन्दिर भित्र ढुङ्गाका सिँढीहरू',

            // Common Specs
            'lbl-admission': 'प्रवेश शुल्क (Ticket)',
            'lbl-restrooms': 'शौचालय (Restrooms)',
            'lbl-access': 'अपाङ्गता मैत्री (Accessibility)',
            'gallery-label': 'फोटो ग्यालरी (फोटोमा थिचेर ठूलो दृश्य र विवरण हेर्नुहोस्)',
            'food-gallery-label': 'खानाको फोटो ग्यालरी (फोटोमा थिचेर परिकारको विवरण र मूल्य हेर्नुहोस्)',
            'g-view': 'विवरण हेर्नुहोस्',
            'btn-gmap': 'गुगल म्यापमा खोल्नुहोस्',

            // Lunch
            'lunch-tag': 'सिमिजुको प्रसिद्ध ताजा समुद्री खाना',
            'lunch-heading': 'सिमिजु खाना / खाजा र मेनु विवरण (Menu & Prices)',
            'lunch-sub': 'जापानको आधा जति टुना माछा सिमिजु बन्दरगाहमा आउँछ। यहाँका सुशी, परिकार, र मूल्य (Yen ¥) सूची।',
            'l1-desc': 'एस-पल्स ड्रिम प्लाजा भित्र। यहाँ उत्कृष्ट टुना माछाका परिकार र सुशी पाइन्छ।',
            'l2-desc': 'सिमिजु माछा बजार। ताजा सासिमी (Sashimi) होलसेल दरमा उपलब्ध छ।',
            'menu-list-title': 'मेनु परिकार र मूल्यहरू (सिमिजु सुशी योकोचो)',
            'menu-list-title-2': 'मेनु परिकार र मूल्यहरू (कासी-नो-इची बजार)',
            'btn-dir': 'दिशा / बाटो (Directions)',

            // Schedule
            'sched-tag': 'दिनभरिको समय तालिका',
            'sched-heading': 'आधिकारिक भ्रमण तालिका (08:30 - 18:30)',
            'sched-desc': 'आरामदायी बस यात्रा र पर्याप्त आरामको समय सहितको कार्यतालिका।',
            'sched-loc-1': 'कलेज अगाडि',
            'sched-t-1': 'कलेजबाट प्रस्थान',
            'sched-d-1': 'बस चढ्ने र एक्सप्रेसवे हुँदै प्रस्थान गर्ने।',
            'sched-loc-2': 'एस-पल्स ड्रिम प्लाजा',
            'sched-t-2': 'खाना तथा बन्दरगाह भ्रमण',
            'sched-d-2': 'ताजा सुशी र लन्च खाने समय।',
            'sched-loc-3': 'हिनोदे बन्दरगाह',
            'sched-t-3': 'स्थान १: सुरुगा खाडी क्रुज',
            'sched-d-3': '४० मिनेटको समुद्री क्रुज र चराहरूलाई दाना खुवाउने।',
            'sched-loc-4': 'मिहो किनार',
            'sched-t-4': 'स्थान २: मिहो नो मात्सुबारा',
            'sched-d-4': 'सल्लाको जंगल र ऐतिहासिक बाटो घुम्ने।',
            'sched-loc-5': 'निहोन्दाइरा र कुनोजान',
            'sched-t-5': 'स्थान ३: कुनोजान तोसोगु र केबलकार',
            'sched-d-5': 'केबलकार यात्रा र राष्ट्रिय मन्दिर दर्शन।',
            'sched-loc-6': 'हाईवे रेस्ट एरिया',
            'sched-t-6': 'फिर्ता यात्रा र उपहार किन्ने समय',
            'sched-d-6': 'आराम गर्दै तोयोहासी तर्फ फिर्ता।',
            'sched-loc-7': 'कलेज अगाडि',
            'sched-t-7': 'कलेज आगमन र समापन',
            'sched-d-7': 'सुरक्षित आगमन र भ्रमण समापन।'
        }
    };

    function applyLanguage(lang) {
        if (!i18n[lang]) return;
        const dict = i18n[lang];

        document.querySelectorAll('[data-i18n]').forEach(elem => {
            const key = elem.getAttribute('data-i18n');
            if (dict[key]) {
                elem.textContent = dict[key];
            }
        });

        langEnBtn.classList.toggle('active-lang', lang === 'en');
        langJaBtn.classList.toggle('active-lang', lang === 'ja');
        langNeBtn.classList.toggle('active-lang', lang === 'ne');

        document.documentElement.lang = lang;
    }

    if (langEnBtn) langEnBtn.addEventListener('click', () => applyLanguage('en'));
    if (langJaBtn) langJaBtn.addEventListener('click', () => applyLanguage('ja'));
    if (langNeBtn) langNeBtn.addEventListener('click', () => applyLanguage('ne'));

    // Set default language to 100% Japanese
    applyLanguage('ja');

    console.log('Saito Travel Application Menu & Prices System Updated Successfully.');

})();
