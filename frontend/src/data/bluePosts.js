const bluePosts = [
  // ===== D4 暗黑破坏神4 最新蓝贴 =====
  {
    id: 'bp-d4-24243867',
    title: 'Join the Next Sanctuary Sitdown',
    summary: 'Before our next Public Test Realm, join us in the Sanctuary Discord for the next Sanctuary Sitdown. ',
    url: 'https://news.blizzard.com/en-us/article/24243867/join-the-next-sanctuary-sitdown',
    publishTime: '2026-05-21',
    gameVersion: 'D4',
    category: 'announcement'
  },
  {
    id: 'bp-d4-24271857',
    title: '《暗黑破坏神 IV》补丁说明',
    summary: '',
    url: 'https://d4.blizzard.cn/news/24271857/index.html',
    publishTime: '2026-05-13',
    gameVersion: 'D4',
    category: 'patch'
  },
  {
    id: 'bp-d4-24267729',
    title: '迎接清算：“憎恨之王”扩展内容现已全球同步上线',
    summary: '',
    url: 'https://d4.blizzard.cn/news/24267729/index.html',
    publishTime: '2026-04-30',
    gameVersion: 'D4',
    category: 'expansion'
  },
  {
    id: 'bp-d4-20260417',
    title: '《暗黑破坏神Ⅳ》国服限时免费领取现已开启',
    summary: '',
    url: 'https://d4.blizzard.cn/news/20260417/43086_1296479.html',
    publishTime: '2026-04-30',
    gameVersion: 'D4',
    category: 'announcement'
  },
  {
    id: 'bp-d4-20260428',
    title: '「中国神话」系列外观现已上线',
    summary: '',
    url: 'https://d4.blizzard.cn/h5/20260428/luckydraw/?channel=gw',
    publishTime: '2026-04-30',
    gameVersion: 'D4',
    category: 'event'
  },
  {
    id: 'bp-d4-20260430',
    title: '《暗黑破坏神Ⅳ》× 闪迪推出联合礼盒',
    summary: '',
    url: 'https://d4.blizzard.cn/news/20260430/43086_1298562.html',
    publishTime: '2026-04-30',
    gameVersion: 'D4',
    category: 'announcement'
  },
  {
    id: 'bp-d4-20260429',
    title: '网鱼×NVIDIA×《暗黑破坏神Ⅳ》联动开启！',
    summary: '',
    url: 'https://d4.blizzard.cn/news/20260429/43086_1298498.html',
    publishTime: '2026-04-29',
    gameVersion: 'D4',
    category: 'event'
  },
  {
    id: 'bp-d4-24267731',
    title: 'A Light Extinguished: A Tribute',
    summary: 'Some flames burn so fiercely, they consume themselves. Pay tribute to one who sacrificed everything. ',
    url: 'https://news.blizzard.com/en-us/article/24267731/a-light-extinguished-a-tribute',
    publishTime: '2026-04-24',
    gameVersion: 'D4',
    category: 'announcement'
  },
  {
    id: 'bp-d4-24264017',
    title: 'New Tales: On Nightmare’s Wings',
    summary: 'Devour these tales of nightmares as three iconic characters battle their most treacherous foes: their own doubts and fears. ',
    url: 'https://news.blizzard.com/en-us/article/24264017/new-tales-on-nightmares-wings',
    publishTime: '2026-04-17',
    gameVersion: 'D4',
    category: 'announcement'
  },
  {
    id: 'bp-d4-24261474',
    title: 'Lord of Hatred Developer Update Stream Announce Blog',
    summary: 'Tune in to our next Developer Update Livestream, where we’ll showcase new content coming with the Lord of Hatred expansion. ',
    url: 'https://news.blizzard.com/en-us/article/24261474/lord-of-hatred-developer-update-stream-announce-blog',
    publishTime: '2026-04-16',
    gameVersion: 'D4',
    category: 'announcement'
  },
  {
    id: 'bp-d4-24266794',
    title: 'A Fowl Beast Rages',
    summary: 'Please, heed our call to aid. This unlikely beast has destroyed our village. No one can stand against its avian fury. ',
    url: 'https://news.blizzard.com/en-us/article/24266794/a-fowl-beast-rages',
    publishTime: '2026-04-01',
    gameVersion: 'D4',
    category: 'announcement'
  },
  {
    id: 'bp-d4-24266869',
    title: 'Diablo IV Patch Notes (2.6)',
    summary: 'We will continually update this article with all patches the development team implements for Diablo IV. ',
    url: 'https://news.blizzard.com/en-us/article/24266869/diablo-iv-patch-notes-2-6',
    publishTime: '2026-03-20',
    gameVersion: 'D4',
    category: 'patch'
  },
  {
    id: 'bp-d4-24259141',
    title: 'A New Tale: “The Lost & the Damned”',
    summary: 'Gather round to hear the perilous journey walked by any who are damned to become a Warlock. ',
    url: 'https://news.blizzard.com/en-us/article/24259141/a-new-tale-the-lost-the-damned',
    publishTime: '2026-03-18',
    gameVersion: 'D4',
    category: 'announcement'
  },
  {
    id: 'bp-d4-24267728',
    title: 'Master Hell Itself with the Warlock',
    summary: 'Harness the demonic powers of Hell as the all-new Warlock class. This visceral caster summons demonic legions and wields hellish energies to unleash devastation. ',
    url: 'https://news.blizzard.com/en-us/article/24267728/master-hell-itself-with-the-warlock',
    publishTime: '2026-03-05',
    gameVersion: 'D4',
    category: 'announcement'
  },
  {
    id: 'bp-d4-24244648',
    title: 'Become the Butcher in Season of Slaughter',
    summary: 'Become the Butcher and turn your enemies into Fresh Meat in Season of Slaughter, and play as the Paladin for free up to Level 25. ',
    url: 'https://news.blizzard.com/en-us/article/24244648/become-the-butcher-in-season-of-slaughter',
    publishTime: '2026-03-05',
    gameVersion: 'D4',
    category: 'patch'
  },
  {
    id: 'bp-d4-24265936',
    title: 'Join Our Next Developer Update Livestream',
    summary: 'Tune in to our next Developer Update Stream, which includes a deep dive for the new Warlock Class and upcoming Season. ',
    url: 'https://news.blizzard.com/en-us/article/24265936/join-our-next-developer-update-livestream',
    publishTime: '2026-03-02',
    gameVersion: 'D4',
    category: 'announcement'
  },
  {
    id: 'bp-d4-24243862',
    title: 'Catch Up on the Diablo 30th Anniversary Spotlight',
    summary: 'Catch up on the Diablo Spotlight, showcasing our newest class: the Warlock, new skill tree updates, and more. ',
    url: 'https://news.blizzard.com/en-us/article/24243862/catch-up-on-the-diablo-30th-anniversary-spotlight',
    publishTime: '2026-02-11',
    gameVersion: 'D4',
    category: 'patch'
  },
  {
    id: 'bp-d4-24259137',
    title: 'Tune-in to the Diablo 30th Anniversary Spotlight',
    summary: 'Join us at 2 p.m., February 11th to behold the next class coming to Diablo IV. ',
    url: 'https://news.blizzard.com/en-us/article/24259137/tune-in-to-the-diablo-30th-anniversary-spotlight',
    publishTime: '2026-02-05',
    gameVersion: 'D4',
    category: 'announcement'
  },
  {
    id: 'bp-d4-24247517',
    title: 'Arouse Celestial Fortune in Lunar Awakening',
    summary: 'The Lunar New Year is upon us! Activate any Shrine for 100% bonus experience and earn Ancestral Favor Reputation to receive festive rewards. ',
    url: 'https://news.blizzard.com/en-us/article/24247517/arouse-celestial-fortune-in-lunar-awakening',
    publishTime: '2026-02-04',
    gameVersion: 'D4',
    category: 'announcement'
  },
  {
    id: 'bp-d4-24247516',
    title: 'The 2.6.0 PTR: What You Need to Know',
    summary: 'Preview the upcoming Killstreak system, powerful Bloodied Items, and more in the 2.6.0 PTR. ',
    url: 'https://news.blizzard.com/en-us/article/24247516/the-2-6-0-ptr-what-you-need-to-know',
    publishTime: '2026-01-29',
    gameVersion: 'D4',
    category: 'announcement'
  },
  {
    id: 'bp-d4-24247514',
    title: 'Dominate The Tower and Leaderboards Beta',
    summary: 'Prepare to enter the Tower and Leaderboards Beta, an all-new challenge for the Seasonal Realm. Ascend the Tower and help shape this mode for seasons to come. ',
    url: 'https://news.blizzard.com/en-us/article/24247514/dominate-the-tower-and-leaderboards-beta',
    publishTime: '2026-01-09',
    gameVersion: 'D4',
    category: 'announcement'
  },
  {
    id: 'bp-d4-24243642',
    title: 'Goblins and Gifts Galore in Goblin Greedings',
    summary: 'Goblin Greedings descends on Sanctuary as Treasure Goblin variants roam in increased numbers and bountiful spoils. Earn bonus Whisper Caches and claim free holiday cosmetics. ',
    url: 'https://news.blizzard.com/en-us/article/24243642/goblins-and-gifts-galore-in-goblin-greedings',
    publishTime: '2025-12-16',
    gameVersion: 'D4',
    category: 'announcement'
  },
  {
    id: 'bp-d4-24243641',
    title: 'A New Tale: “The Calling”',
    summary: 'Gather ‘round to hear the arduous journey to become a Paladin in this rousing new tale. ',
    url: 'https://news.blizzard.com/en-us/article/24243641/a-new-tale-the-calling',
    publishTime: '2025-12-15',
    gameVersion: 'D4',
    category: 'announcement'
  },
  {
    id: 'bp-d4-24247511',
    title: 'Stand Against Mephisto: Pre-Purchase Lord of Hatred',
    summary: 'Make your final stand against the Prime Evil Mephisto in a rich new campaign, master two new classes, and discover the ancient region of Skovos. ',
    url: 'https://news.blizzard.com/en-us/article/24247511/stand-against-mephisto-pre-purchase-lord-of-hatred',
    publishTime: '2025-12-12',
    gameVersion: 'D4',
    category: 'announcement'
  },
  {
    id: 'bp-d4-24244399',
    title: 'Wield Divine Might as The Paladin',
    summary: 'Play as our newest Paladin Class by pre-purchasing Lord of Hatred. Take up your hammer and shield and wield Holy Light to rain down heavenly justice. ',
    url: 'https://news.blizzard.com/en-us/article/24244399/wield-divine-might-as-the-paladin',
    publishTime: '2025-12-12',
    gameVersion: 'D4',
    category: 'announcement'
  },
  {
    id: 'bp-d4-24244466',
    title: 'Diablo IV Patch Notes (2.5)',
    summary: 'We will continually update this article with all patches the development team implements for Diablo IV. ',
    url: 'https://news.blizzard.com/en-us/article/24244466/diablo-iv-patch-notes-2-5',
    publishTime: '2025-12-03',
    gameVersion: 'D4',
    category: 'patch'
  },
  {
    id: 'bp-d4-24244465',
    title: 'Vanquish the Lesser Evils in Season of Divine Intervention',
    summary: 'Harness the power of the High Heavens to beat back the invasion of the lesser evils. Fear Azmodan’s arrival in Season of Divine Intervention. ',
    url: 'https://news.blizzard.com/en-us/article/24244465/vanquish-the-lesser-evils-in-season-of-divine-intervention',
    publishTime: '2025-12-03',
    gameVersion: 'D4',
    category: 'patch'
  },
  {
    id: 'bp-d4-24250347',
    title: 'Join our next Developer Update Livestream',
    summary: 'Tune in to our next Developer Update Stream, which will cover Season of Divine Intervention, and earn the Unhilted Striker One-handed Sword cosmetic.',
    url: 'https://news.blizzard.com/en-us/article/24250347/join-our-next-developer-update-livestream',
    publishTime: '2025-12-01',
    gameVersion: 'D4',
    category: 'patch'
  },

  // ===== D3 暗黑破坏神3 最新蓝贴 =====
  {
    id: 'bp-d3-24262572',
    title: '《暗黑破坏神III》第 38 赛季：无形之忆3月27日开启',
    summary: '',
    url: 'https://d3.blizzard.cn/news/24262572/index.html',
    publishTime: '2026-03-18',
    gameVersion: 'D3',
    category: 'season'
  },
  {
    id: 'bp-d3-24247149',
    title: '“崔斯特姆的黑化”活动将于2026年1月1日回归',
    summary: '',
    url: 'https://d3.blizzard.cn/news/24247149/index.html',
    publishTime: '2025-12-24',
    gameVersion: 'D3',
    category: 'event'
  },
  {
    id: 'bp-d3-20251223',
    title: '“地狱嗨购节”跨年限时折扣现已开启',
    summary: '',
    url: 'https://d3.blizzard.cn/news/20251223/41611_1278067.html',
    publishTime: '2025-12-23',
    gameVersion: 'D3',
    category: 'announcement'
  },
  {
    id: 'bp-d3-24243442',
    title: '第37赛季预览：禁忌档案室',
    summary: '',
    url: 'https://d3.blizzard.cn/news/24243442/index.html',
    publishTime: '2025-11-24',
    gameVersion: 'D3',
    category: 'season'
  },
  {
    id: 'bp-d3-24246200',
    title: 'Blend Devilish Brews with Diablo: Drinks, Potions, & Elixirs',
    summary: 'Ghoulish concoctions and bold tinctures await in Diablo: Drinks, Potions, & Elixirs, a new book from Insight Editions. ',
    url: 'https://news.blizzard.com/en-us/article/24246200/blend-devilish-brews-with-diablo-drinks-potions-elixirs',
    publishTime: '2025-11-07',
    gameVersion: 'D3',
    category: 'announcement'
  },
  {
    id: 'bp-d3-24245211',
    title: 'BLIZZCON 2026 SOLD OUT!',
    summary: 'Check out all that\'s in store and how you can secure your spot for BlizzCon 2026. ',
    url: 'https://news.blizzard.com/en-us/article/24245211/blizzcon-2026-sold-out',
    publishTime: '2025-11-05',
    gameVersion: 'D3',
    category: 'announcement'
  },
  {
    id: 'bp-d3-24231417',
    title: '第36赛季：地狱魔王将于9月12日开放',
    summary: '',
    url: 'https://d3.blizzard.cn/news/24231417/index.html',
    publishTime: '2025-09-03',
    gameVersion: 'D3',
    category: 'season'
  },
  {
    id: 'bp-d3-2025711',
    title: '英雄们，集结！暴雪游戏确认参展2025ChinaJoy！',
    summary: '',
    url: 'https://d3.blizzard.cn/news/2025711/index.html',
    publishTime: '2025-07-11',
    gameVersion: 'D3',
    category: 'announcement'
  },
  {
    id: 'bp-d3-20250623',
    title: '登录方式即将切换，请您尽快操作',
    summary: '',
    url: 'https://d3.blizzard.cn/news/20250623/41611_1242488.html',
    publishTime: '2025-06-23',
    gameVersion: 'D3',
    category: 'announcement'
  },
  {
    id: 'bp-d3-24191146',
    title: '国服测试福利全服派送 第35赛季“永恒之战”现已开启',
    summary: '',
    url: 'https://d3.blizzard.cn/news/24191146/index.html',
    publishTime: '2025-05-22',
    gameVersion: 'D3',
    category: 'season'
  },
  {
    id: 'bp-d3-23420227',
    title: '国服商城功能现已全部开放！超值“狂欢节礼包”同步登场',
    summary: '',
    url: 'https://d3.blizzard.cn/news/23420227/index.html',
    publishTime: '2025-05-01',
    gameVersion: 'D3',
    category: 'announcement'
  },
  {
    id: 'bp-d3-24166297',
    title: '《暗黑破坏神III》国服技术测试将于4月16日开启',
    summary: '',
    url: 'https://d3.blizzard.cn/news/24166297/index.html',
    publishTime: '2025-04-14',
    gameVersion: 'D3',
    category: 'announcement'
  },
  {
    id: 'bp-d3-20250408',
    title: '暗黑破坏神系列总经理致国服玩家寄语',
    summary: '',
    url: 'https://d3.blizzard.cn/news/20250408/41611_1224115.html',
    publishTime: '2025-04-09',
    gameVersion: 'D3',
    category: 'announcement'
  },
  {
    id: 'bp-d3-24186408',
    title: 'Play Diablo III on Game Pass now!',
    summary: 'The legendary action-RPG is now available on Game Pass, including the original game and the Reaper of Souls expansion. ',
    url: 'https://news.blizzard.com/en-us/article/24186408/play-diablo-iii-on-game-pass-now',
    publishTime: '2025-04-08',
    gameVersion: 'D3',
    category: 'announcement'
  },
  {
    id: 'bp-d3-24178650',
    title: 'BlizzCon Returns In 2026',
    summary: 'Our celebration of our universes, connection, and community is coming back to the Anaheim Convention Center next year. ',
    url: 'https://news.blizzard.com/en-us/article/24178650/blizzcon-returns-in-2026',
    publishTime: '2025-03-11',
    gameVersion: 'D3',
    category: 'announcement'
  },
  {
    id: 'bp-d3-24167110',
    title: 'The Darkening of Tristram Returns January 3, 2025!',
    summary: 'Our anniversary event is fast approaching! Prepare to face mysterious cultists and enter a portal into Diablo\'s past. ',
    url: 'https://news.blizzard.com/en-us/article/24167110/the-darkening-of-tristram-returns-january-3-2025',
    publishTime: '2024-12-29',
    gameVersion: 'D3',
    category: 'announcement'
  },
  {
    id: 'bp-d3-24137819',
    title: 'Season 33: Shades of the Nephalem – Has Concluded',
    summary: 'Diablo III Season 33 begins on October 25. Eradicate Hell’s emissaries using powerful boons granted by the season theme, and more. ',
    url: 'https://news.blizzard.com/en-us/article/24137819/season-33-shades-of-the-nephalem-has-concluded',
    publishTime: '2024-10-26',
    gameVersion: 'D3',
    category: 'patch'
  },
  {
    id: 'bp-d3-24104599',
    title: 'Season 32: Ethereal Memory – Has Concluded',
    summary: 'Diablo III Season 32 begins on July 12. Exterminate Hell’s emissaries using powerful boons granted by the season theme, and more. ',
    url: 'https://news.blizzard.com/en-us/article/24104599/season-32-ethereal-memory-has-concluded',
    publishTime: '2024-10-26',
    gameVersion: 'D3',
    category: 'patch'
  },
  {
    id: 'bp-d3-24135096',
    title: 'Diablo III PTR 2.7.8 - Has Concluded',
    summary: 'The Diablo III Patch 2.7.8 PTR begins on September 17 and lasts one week. Join us in testing technical updates for Mac. ',
    url: 'https://news.blizzard.com/en-us/article/24135096/diablo-iii-ptr-2-7-8-has-concluded',
    publishTime: '2024-09-13',
    gameVersion: 'D3',
    category: 'announcement'
  },
  {
    id: 'bp-d3-24078323',
    title: 'Season 31: Season of the Forbidden Archives – Has Concluded',
    summary: 'Diablo III Season 31: Season of the Forbidden Archives begins on April 12. Nephalem can harness the power of Forbidden Archives theme, which first debuted with Season 20. ',
    url: 'https://news.blizzard.com/en-us/article/24078323/season-31-season-of-the-forbidden-archives-has-concluded',
    publishTime: '2024-03-27',
    gameVersion: 'D3',
    category: 'patch'
  },
  {
    id: 'bp-d3-24046224',
    title: 'Season 30 The Lords of Hell – Has Concluded',
    summary: 'Diablo III Season 30 begins on January 12. Eradicate Hell’s emissaries using powerful boons from Season 30’s theme and see new Class balance changes. ',
    url: 'https://news.blizzard.com/en-us/article/24046224/season-30-the-lords-of-hell-has-concluded',
    publishTime: '2024-01-05',
    gameVersion: 'D3',
    category: 'season'
  },
  {
    id: 'bp-d3-24030420',
    title: 'The Darkening of Tristram Returns January 3, 2024!',
    summary: 'Our anniversary event is fast approaching! Prepare to face mysterious cultists and enter a portal into Diablo\'s past.',
    url: 'https://news.blizzard.com/en-us/article/24030420/the-darkening-of-tristram-returns-january-3-2024',
    publishTime: '2023-12-29',
    gameVersion: 'D3',
    category: 'announcement'
  },
  {
    id: 'bp-d3-24031819',
    title: 'Diablo III PTR 2.7.7 - Has Concluded',
    summary: 'The Diablo III Patch 2.7.7 PTR begins on December 5 and lasts one week. Join us in testing the returning Rites of Sanctuary and Visions of Enmity Season Themes and balance changes for all Classes. ',
    url: 'https://news.blizzard.com/en-us/article/24031819/diablo-iii-ptr-2-7-7-has-concluded',
    publishTime: '2023-12-01',
    gameVersion: 'D3',
    category: 'announcement'
  },
  {
    id: 'bp-d3-24009159',
    title: 'Raise Hell with the BlizzCon Collection',
    summary: 'Celebrate and raise Hell with the BlizzCon Collection. Secure the Lapisvein Mount, Trophies, and more in-game items. ',
    url: 'https://news.blizzard.com/en-us/article/24009159/raise-hell-with-the-blizzcon-collection',
    publishTime: '2023-10-09',
    gameVersion: 'D3',
    category: 'announcement'
  },
  {
    id: 'bp-d3-23999068',
    title: 'Season 29 Visions of Enmity – Has Concluded',
    summary: 'Season 29 Visions of Enmity goes live on September 15 at 5 p.m. PDT/CET/KST. Enter Diabolical Fissures and slash through fearsome foes for helpful rewards. ',
    url: 'https://news.blizzard.com/en-us/article/23999068/season-29-visions-of-enmity-has-concluded',
    publishTime: '2023-09-08',
    gameVersion: 'D3',
    category: 'patch'
  },
  {
    id: 'bp-d3-23987087',
    title: 'Diablo III PTR 2.7.6 - Has Concluded',
    summary: 'The Diablo III 2.7.6 PTR begins on August 16 and lasts two weeks. Join us in testing the new Solo Self Found feature, Visions of Enmity Season theme, and more. ',
    url: 'https://news.blizzard.com/en-us/article/23987087/diablo-iii-ptr-2-7-6-has-concluded',
    publishTime: '2023-08-29',
    gameVersion: 'D3',
    category: 'announcement'
  },
  {
    id: 'bp-d3-23897180',
    title: 'Season 28 Rites of Sanctuary - Has Ended',
    summary: 'Season 28 Rites of Sanctuary goes live on February 24 at 5 p.m. PST/CET/KST. Unlock formidable powers in the Altar of Rites as you complete the Seasonal Journey. ',
    url: 'https://news.blizzard.com/en-us/article/23897180/season-28-rites-of-sanctuary-has-ended',
    publishTime: '2023-08-28',
    gameVersion: 'D3',
    category: 'patch'
  },
  {
    id: 'bp-d3-23893120',
    title: 'Hell’s Ink Tattoo Shop Takeover Tour Has Reignited',
    summary: 'The Diablo Hell’s Ink Tattoo Shop Takeover Tour has reignited! This time, we’re bathing four new cities in ink straight from the Burning Hells—read on to see how you can enter to win a custom Diablo tattoo. ',
    url: 'https://news.blizzard.com/en-us/article/23893120/hells-ink-tattoo-shop-takeover-tour-has-reignited',
    publishTime: '2023-02-01',
    gameVersion: 'D3',
    category: 'announcement'
  },
  {
    id: 'bp-d3-23893119',
    title: 'Diablo III PTR 2.7.5 - Has Concluded',
    summary: 'The Diablo III 2.7.5 PTR begins on January 31st and lasts one week. Join us in testing the new Altar of Rites—where you choose your path to power, and more. ',
    url: 'https://news.blizzard.com/en-us/article/23893119/diablo-iii-ptr-2-7-5-has-concluded',
    publishTime: '2023-01-26',
    gameVersion: 'D3',
    category: 'patch'
  },

  // ===== D2 暗黑破坏神2 重制版 最新蓝贴 =====
  {
    id: 'bp-d2-24261478',
    title: '《暗黑破坏神2》重制版天梯第14赛季现已开启',
    summary: '',
    url: 'https://d2.blizzard.cn/news/24261478/index.html',
    publishTime: '2026-05-11',
    gameVersion: 'D2',
    category: 'ladder'
  },
  {
    id: 'bp-d2-24266710',
    title: 'Diablo II: Resurrected PTR 3.2 Now Live',
    summary: 'The 3.2 PTR introduces balance changes for the Warlock Class, alongside updates to Terror Zones. Jump into the PTR to experience them firsthand on April 14 at 10:00 a.m. PT. ',
    url: 'https://news.blizzard.com/en-us/article/24266710/diablo-ii-resurrected-ptr-3-2-now-live',
    publishTime: '2026-04-10',
    gameVersion: 'D2',
    category: 'announcement'
  },
  {
    id: 'bp-d2-20260203',
    title: '《暗黑破坏神II》重制版国服环境净化处罚公告（4月5日更新）',
    summary: '',
    url: 'https://d2.blizzard.cn/news/20260203/42929_1285202.html',
    publishTime: '2026-04-05',
    gameVersion: 'D2',
    category: 'announcement'
  },
  {
    id: 'bp-d2-24271875',
    title: '术士君临 - 3.1.2补丁说明',
    summary: '',
    url: 'https://d2.blizzard.cn/news/24271875/index.html',
    publishTime: '2026-04-04',
    gameVersion: 'D2',
    category: 'patch'
  },
  {
    id: 'bp-d2-24263998',
    title: 'Enter the Warlock Hardcore 99 Race',
    summary: 'Race to Level 99 on the Hardcore Realm as the Warlock for a chance to be immortalized in The Grimoire of the Unfallen. ',
    url: 'https://news.blizzard.com/en-us/article/24263998/enter-the-warlock-hardcore-99-race',
    publishTime: '2026-02-20',
    gameVersion: 'D2',
    category: 'announcement'
  },
  {
    id: 'bp-d2-24244884',
    title: 'Reign of the Warlock - 3.1.1 Patch Notes',
    summary: 'These are the Patch notes for the 3.1.1 Client Patch for the Reign of the Warlock, our known issues can be found here. ',
    url: 'https://news.blizzard.com/en-us/article/24244884/reign-of-the-warlock-3-1-1-patch-notes',
    publishTime: '2026-02-19',
    gameVersion: 'D2',
    category: 'patch'
  },
  {
    id: 'bp-d2-24243863',
    title: '在“术士君临”中倾泻湮灭之力',
    summary: '',
    url: 'https://d2.blizzard.cn/news/24243863/index.html',
    publishTime: '2026-02-12',
    gameVersion: 'D2',
    category: 'expansion'
  },
  {
    id: 'bp-d2-262126142',
    title: '《暗黑破坏神2®》重制版“术士君临”游戏扩展包正式上线',
    summary: '',
    url: 'https://d2.blizzard.cn/news/262126142/index.html',
    publishTime: '2026-02-12',
    gameVersion: 'D2',
    category: 'expansion'
  },
  {
    id: 'bp-d2-24246296',
    title: '《暗黑破坏神2》重制版天梯第13赛季现已开启',
    summary: '',
    url: 'https://d2.blizzard.cn/news/24246296/index.html',
    publishTime: '2026-02-09',
    gameVersion: 'D2',
    category: 'ladder'
  },
  {
    id: 'bp-d2-20251222',
    title: '“地狱嗨购节”跨年限时折扣现已开启',
    summary: '',
    url: 'https://d2.blizzard.cn/news/20251222/42929_1277898.html',
    publishTime: '2025-12-22',
    gameVersion: 'D2',
    category: 'announcement'
  },
  {
    id: 'bp-d2-24250349',
    title: '“恐惧二十二夜”活动现已开放',
    summary: '',
    url: 'https://d2.blizzard.cn/news/24250349/index.html',
    publishTime: '2025-12-17',
    gameVersion: 'D2',
    category: 'event'
  },
  {
    id: 'bp-d2-20251121',
    title: '关于《暗黑破坏神2》重制版国服非赛季人物存档问题的修复公告',
    summary: '',
    url: 'https://d2.blizzard.cn/news/20251121/42929_1272408.html',
    publishTime: '2025-11-21',
    gameVersion: 'D2',
    category: 'season'
  },
  {
    id: 'bp-d2-24245211',
    title: 'BLIZZCON 2026 SOLD OUT!',
    summary: 'Check out all that\'s in store and how you can secure your spot for BlizzCon 2026. ',
    url: 'https://news.blizzard.com/en-us/article/24245211/blizzcon-2026-sold-out',
    publishTime: '2025-11-05',
    gameVersion: 'D2',
    category: 'announcement'
  },
  {
    id: 'bp-d2-20251027',
    title: '《暗黑破坏神II》好友邀约活动开启 勇者相伴共同出征',
    summary: '',
    url: 'https://d2.blizzard.cn/news/20251027/42929_1267024.html',
    publishTime: '2025-10-27',
    gameVersion: 'D2',
    category: 'event'
  },
  {
    id: 'bp-d2-24226703',
    title: 'Diablo II: Resurrected Ladder Season 12 Has Concluded',
    summary: 'Ladder Season 12 begins on October 3! Muster the might to liberate Sanctuary’s denizens from sinister influences as you race to Level 99. ',
    url: 'https://news.blizzard.com/en-us/article/24226703/diablo-ii-resurrected-ladder-season-12-has-concluded',
    publishTime: '2025-10-04',
    gameVersion: 'D2',
    category: 'season'
  },
  {
    id: 'bp-d2-20250929',
    title: '《暗黑破坏神II》重制版国服环境净化处罚公告（9月29日更新）',
    summary: '',
    url: 'https://d2.blizzard.cn/news/20250929/42929_1262557.html',
    publishTime: '2025-09-29',
    gameVersion: 'D2',
    category: 'announcement'
  },
  {
    id: 'bp-d2-24208340',
    title: 'Diablo II: Resurrected Ladder Season 11 Has Concluded',
    summary: 'Ladder Season 11 begins on June 20! Muster the might to liberate Sanctuary’s denizens from sinister influences as you race to Level 99. ',
    url: 'https://news.blizzard.com/en-us/article/24208340/diablo-ii-resurrected-ladder-season-11-has-concluded',
    publishTime: '2025-06-21',
    gameVersion: 'D2',
    category: 'season'
  },
  {
    id: 'bp-d2-24179243',
    title: 'Diablo II: Resurrected Ladder Season 10 Has Concluded',
    summary: 'Ladder Season 10 begins on March 7! Muster the might to liberate Sanctuary’s denizens from sinister influences as you race to Level 99. ',
    url: 'https://news.blizzard.com/en-us/article/24179243/diablo-ii-resurrected-ladder-season-10-has-concluded',
    publishTime: '2025-03-08',
    gameVersion: 'D2',
    category: 'season'
  },
  {
    id: 'bp-d2-24158875',
    title: 'Diablo II: Resurrected Ladder Season 9 Has Concluded',
    summary: 'Ladder Season 9 begins on December 6! Muster the might to liberate Sanctuary’s denizens from sinister influences as you race to Level 99. ',
    url: 'https://news.blizzard.com/en-us/article/24158875/diablo-ii-resurrected-ladder-season-9-has-concluded',
    publishTime: '2024-12-07',
    gameVersion: 'D2',
    category: 'season'
  },
  {
    id: 'bp-d2-24161249',
    title: '22 Nights of Terror Holiday Event',
    summary: 'Sleigh your way through Diablo II: Resurrected this holiday season across 22 Nights of Terror, where frightfully festive gameplay modifiers will rotate daily. ',
    url: 'https://news.blizzard.com/en-us/article/24161249/22-nights-of-terror-holiday-event',
    publishTime: '2024-12-06',
    gameVersion: 'D2',
    category: 'announcement'
  },
  {
    id: 'bp-d2-24111638',
    title: 'Diablo II: Resurrected Ladder Season 8 Has Concluded',
    summary: 'Ladder Season 8 begins on August 23! Muster the might to liberate Sanctuary’s denizens from sinister influences as you race to Level 99. ',
    url: 'https://news.blizzard.com/en-us/article/24111638/diablo-ii-resurrected-ladder-season-8-has-concluded',
    publishTime: '2024-08-09',
    gameVersion: 'D2',
    category: 'patch'
  },
  {
    id: 'bp-d2-24096018',
    title: 'Diablo II: Resurrected Ladder Season 7 Has Concluded',
    summary: 'Ladder Season 7 begins on May 23! Muster the might to liberate Sanctuary’s denizens from sinister influences and an untimely demise as you race to Level 99. ',
    url: 'https://news.blizzard.com/en-us/article/24096018/diablo-ii-resurrected-ladder-season-7-has-concluded',
    publishTime: '2024-05-24',
    gameVersion: 'D2',
    category: 'patch'
  },
  {
    id: 'bp-d2-24061888',
    title: 'Diablo II: Resurrected Ladder Season 6 Has Concluded',
    summary: 'Ladder Season 6 begins on February 22! Muster the might to liberate Sanctuary’s denizens from sinister influences as you race to Level 99. ',
    url: 'https://news.blizzard.com/en-us/article/24061888/diablo-ii-resurrected-ladder-season-6-has-concluded',
    publishTime: '2024-02-15',
    gameVersion: 'D2',
    category: 'patch'
  }
]

export { bluePosts }
