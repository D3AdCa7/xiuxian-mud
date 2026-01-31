// 山海经怪物系统

export interface MonsterConfig {
  name: string;
  description: string;
  minPower: number;
  maxPower: number;
  realmRequired: string;
  drops: string[];
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

// 山海经怪物列表
export const MONSTER_LIST: MonsterConfig[] = [
  // === 炼气期怪物（新手村）===
  // 普通
  { name: '狌狌', description: '状如禺而白耳，伏行人走，食之善走', minPower: 10, maxPower: 25, realmRequired: '炼气期', drops: ['兽皮'], rarity: 'common' },
  { name: '狸力', description: '状如豚，有距，其音如狗吠', minPower: 15, maxPower: 30, realmRequired: '炼气期', drops: ['兽骨'], rarity: 'common' },
  { name: '䍺羊', description: '状如羊，无口，不可杀也', minPower: 20, maxPower: 35, realmRequired: '炼气期', drops: ['灵草'], rarity: 'common' },
  { name: '耳鼠', description: '状如鼠，而兔首麋身，以其尾飞', minPower: 25, maxPower: 40, realmRequired: '炼气期', drops: ['妖兽内丹'], rarity: 'common' },
  // 稀有
  { name: '当康', description: '状如豚而有牙，其鸣自叫，见则天下大穰', minPower: 35, maxPower: 55, realmRequired: '炼气期', drops: ['聚灵丹', '灵石'], rarity: 'rare' },
  { name: '鹿蜀', description: '状如马而白首，其文如虎而赤尾，其音如谣', minPower: 45, maxPower: 70, realmRequired: '炼气期', drops: ['培元丹'], rarity: 'rare' },
  // 精英
  { name: '穷奇', description: '状如牛，猬毛，音如獆狗，食人', minPower: 60, maxPower: 100, realmRequired: '炼气期', drops: ['筑基丹', '灵石'], rarity: 'epic' },

  // === 筑基期怪物（外围森林）===
  { name: '蛊雕', description: '状如雕而有角，其音如婴儿，食人', minPower: 100, maxPower: 200, realmRequired: '筑基期', drops: ['灵羽', '聚灵丹'], rarity: 'common' },
  { name: '毕方', description: '状如鹤，一足，赤文青质而白喙', minPower: 120, maxPower: 220, realmRequired: '筑基期', drops: ['火羽', '培元丹'], rarity: 'common' },
  { name: '诸怀', description: '状如牛，四角、人目、彘耳', minPower: 150, maxPower: 250, realmRequired: '筑基期', drops: ['妖兽内丹', '灵石'], rarity: 'common' },
  { name: '猾褢', description: '状如人而彘鬣，穴居而冬蛰', minPower: 180, maxPower: 300, realmRequired: '筑基期', drops: ['聚灵丹'], rarity: 'common' },
  { name: '青耕', description: '状如鹊，青身白喙，白目白尾', minPower: 200, maxPower: 350, realmRequired: '筑基期', drops: ['木灵珠'], rarity: 'rare' },
  { name: '朱厌', description: '状如猿，白首赤足，见则大兵', minPower: 250, maxPower: 450, realmRequired: '筑基期', drops: ['战意精华', '培元丹'], rarity: 'rare' },
  { name: '飞廉', description: '鹿身，头如雀，有角，蛇尾豹文', minPower: 300, maxPower: 550, realmRequired: '筑基期', drops: ['筑基丹', '风灵珠'], rarity: 'epic' },
  { name: '赤眼妖狼', description: '双目赤红，形如巨狼，嗜血成性', minPower: 400, maxPower: 700, realmRequired: '筑基期', drops: ['狼王牙', '血灵珠'], rarity: 'epic' },
  // 传说
  { name: '九尾狐', description: '状如狐而九尾，其音如婴儿，能食人', minPower: 500, maxPower: 900, realmRequired: '筑基期', drops: ['九尾狐皮', '培元丹', '筑基丹'], rarity: 'legendary' },

  // === 金丹期怪物（灵脉山）===
  { name: '蠪侄', description: '状如狸，一目而三尾', minPower: 800, maxPower: 1500, realmRequired: '金丹期', drops: ['灵眼石', '聚灵丹'], rarity: 'common' },
  { name: '猰貐', description: '状如貙，赤目、赤喙、黄身', minPower: 1000, maxPower: 2000, realmRequired: '金丹期', drops: ['金丹', '灵石'], rarity: 'common' },
  { name: '烛龙', description: '人面蛇身而赤，直目正乘，其瞑乃晦，其视乃明', minPower: 1500, maxPower: 3000, realmRequired: '金丹期', drops: ['龙鳞', '金丹'], rarity: 'rare' },
  { name: '英招', description: '人面马身，有虎纹，生鸟翼', minPower: 2000, maxPower: 4000, realmRequired: '金丹期', drops: ['神羽', '培元丹'], rarity: 'rare' },
  { name: '应龙', description: '有翼之龙，黄帝令应龙攻蚩尤', minPower: 3000, maxPower: 6000, realmRequired: '金丹期', drops: ['应龙角', '龙血'], rarity: 'epic' },
  { name: '玄武', description: '龟蛇合体，北方神兽', minPower: 4000, maxPower: 8000, realmRequired: '金丹期', drops: ['玄武甲', '水灵珠'], rarity: 'epic' },
  { name: '夔牛', description: '状如牛，苍身而无角，一足，出入水则必风雨', minPower: 5000, maxPower: 10000, realmRequired: '金丹期', drops: ['夔牛皮', '雷灵珠'], rarity: 'legendary' },

  // === 元婴期怪物（秘境入口）===
  { name: '蜚', description: '状如牛，白首，一目，蛇尾', minPower: 8000, maxPower: 15000, realmRequired: '元婴期', drops: ['疫灵珠', '金丹'], rarity: 'common' },
  { name: '乘黄', description: '状如狐，其背上有角', minPower: 10000, maxPower: 20000, realmRequired: '元婴期', drops: ['仙狐皮', '培元丹'], rarity: 'common' },
  { name: '帝江', description: '状如黄囊，赤如丹火，六足四翼，浑敦无面目', minPower: 15000, maxPower: 30000, realmRequired: '元婴期', drops: ['混沌精华'], rarity: 'rare' },
  { name: '穷奇上古', description: '四凶之一，状如虎而有翼', minPower: 20000, maxPower: 40000, realmRequired: '元婴期', drops: ['凶兽之魂', '天材地宝'], rarity: 'epic' },
  { name: '饕餮', description: '羊身人面，眼在腋下，虎齿人手，食人', minPower: 30000, maxPower: 60000, realmRequired: '元婴期', drops: ['饕餮牙', '天材地宝'], rarity: 'legendary' },

  // === 化神期怪物（深渊）===
  { name: '梼杌', description: '状如虎而犬毛，人面、虎足、猪口牙', minPower: 50000, maxPower: 100000, realmRequired: '化神期', drops: ['凶兽精血', '仙丹'], rarity: 'common' },
  { name: '白泽', description: '能言，知万物之情', minPower: 70000, maxPower: 150000, realmRequired: '化神期', drops: ['白泽图', '神识丹'], rarity: 'rare' },
  { name: '刑天', description: '与帝争神，帝断其首，乃以乳为目，以脐为口，操干戚以舞', minPower: 100000, maxPower: 200000, realmRequired: '化神期', drops: ['神兵碎片', '战神精华'], rarity: 'epic' },
  { name: '蚩尤', description: '铜头铁额，食沙石，造五兵', minPower: 150000, maxPower: 300000, realmRequired: '化神期', drops: ['蚩尤战甲', '仙丹'], rarity: 'epic' },
  { name: '相柳', description: '九首蛇身，食于九土，其所歠所尼，即为源泽', minPower: 200000, maxPower: 500000, realmRequired: '化神期', drops: ['相柳毒血', '仙丹'], rarity: 'legendary' },
  { name: '混沌', description: '四凶之首，状如犬，四足无爪，有目不见，行不开', minPower: 300000, maxPower: 800000, realmRequired: '化神期', drops: ['混沌本源', '太乙仙丹'], rarity: 'legendary' },
];

// 根据境界和修为获取可遇到的怪物
export function getAvailableMonsters(realm: string, cultivation: number): MonsterConfig[] {
  const realmOrder = ['炼气期', '筑基期', '金丹期', '元婴期', '化神期', '飞升'];
  const realmIndex = realmOrder.indexOf(realm);
  
  return MONSTER_LIST.filter(m => {
    const monsterRealmIndex = realmOrder.indexOf(m.realmRequired);
    // 可以遇到当前境界和低一级境界的怪物
    return monsterRealmIndex <= realmIndex && monsterRealmIndex >= realmIndex - 1;
  });
}

// 生成怪物
export function generateMonster(cultivation: number): {
  name: string;
  description: string;
  power: number;
  rewardCultivation: number;
  rewardItem: string | null;
  rarity: string;
} {
  const realmOrder = ['炼气期', '筑基期', '金丹期', '元婴期', '化神期', '飞升'];
  let realm = '炼气期';
  if (cultivation >= 1000000) realm = '化神期';
  else if (cultivation >= 100000) realm = '元婴期';
  else if (cultivation >= 10000) realm = '金丹期';
  else if (cultivation >= 1000) realm = '筑基期';

  const available = getAvailableMonsters(realm, cultivation);
  if (available.length === 0) {
    return { name: '野兽', description: '普通的野兽', power: 10, rewardCultivation: 5, rewardItem: null, rarity: 'common' };
  }

  // 稀有度权重
  const weights: Record<string, number> = { common: 60, rare: 25, epic: 12, legendary: 3 };
  const totalWeight = available.reduce((sum, m) => sum + (weights[m.rarity] || 60), 0);
  let rand = Math.random() * totalWeight;

  let selected: MonsterConfig | null = null;
  for (const monster of available) {
    rand -= weights[monster.rarity] || 60;
    if (rand <= 0) {
      selected = monster;
      break;
    }
  }
  if (!selected) selected = available[0]!;

  // 在范围内随机power
  const power = Math.floor(selected.minPower + Math.random() * (selected.maxPower - selected.minPower));
  
  // 奖励：击杀怪物获得 power 的 10% 修为
  const rewardCultivation = Math.floor(power * 0.1);
  
  // 随机掉落物品
  const rewardItem = selected.drops.length > 0 && Math.random() < 0.5 
    ? selected.drops[Math.floor(Math.random() * selected.drops.length)]! 
    : null;

  return {
    name: selected.name,
    description: selected.description,
    power,
    rewardCultivation,
    rewardItem,
    rarity: selected.rarity,
  };
}

// 获取战斗建议
export function getMonsterHint(playerAttack: number, monsterPower: number): string {
  const ratio = playerAttack / monsterPower;
  if (ratio >= 2) return '此敌弱小，可轻松击杀';
  if (ratio >= 1.2) return '实力相当，可一战';
  if (ratio >= 0.8) return '势均力敌，有风险';
  if (ratio >= 0.5) return '此敌较强，建议谨慎';
  return '此敌远超你的实力，建议回避';
}

// 获取稀有度颜色
export function getRarityEmoji(rarity: string): string {
  const emojis: Record<string, string> = {
    common: '⚪',
    rare: '🟢',
    epic: '🔵',
    legendary: '🟡',
  };
  return emojis[rarity] || '⚪';
}

// 获取稀有度中文
export function getRarityName(rarity: string): string {
  const names: Record<string, string> = {
    common: '普通',
    rare: '稀有',
    epic: '精英',
    legendary: '传说',
  };
  return names[rarity] || '普通';
}
