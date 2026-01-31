// 境界系统配置

export interface RealmConfig {
  name: string;
  minCultivation: number;
  cultivationGain: number; // 每次修炼获得的修为
  locations: string[];
}

export const REALMS: RealmConfig[] = [
  { name: '炼气期', minCultivation: 0, cultivationGain: 50, locations: ['新手村'] },
  { name: '筑基期', minCultivation: 1000, cultivationGain: 100, locations: ['新手村', '外围森林'] },
  { name: '金丹期', minCultivation: 10000, cultivationGain: 200, locations: ['新手村', '外围森林', '灵脉山'] },
  { name: '元婴期', minCultivation: 100000, cultivationGain: 500, locations: ['新手村', '外围森林', '灵脉山', '秘境入口'] },
  { name: '化神期', minCultivation: 1000000, cultivationGain: 1000, locations: ['新手村', '外围森林', '灵脉山', '秘境入口', '深渊'] },
  { name: '飞升', minCultivation: 10000000, cultivationGain: 0, locations: ['天界'] },
];

export function getCurrentRealm(cultivation: number): RealmConfig {
  for (let i = REALMS.length - 1; i >= 0; i--) {
    const realm = REALMS[i];
    if (realm && cultivation >= realm.minCultivation) {
      return realm;
    }
  }
  return REALMS[0]!;
}

export function getNextRealm(cultivation: number): RealmConfig | null {
  const currentRealm = getCurrentRealm(cultivation);
  const currentIndex = REALMS.findIndex(r => r.name === currentRealm.name);
  if (currentIndex < REALMS.length - 1) {
    return REALMS[currentIndex + 1] ?? null;
  }
  return null;
}

export function calculateStats(cultivation: number) {
  return {
    hp: Math.max(100, cultivation * 10),
    attack: Math.max(10, cultivation),
    defense: Math.max(5, Math.floor(cultivation * 0.5)),
  };
}

// 修炼冷却时间（秒）
export const CULTIVATE_COOLDOWN = 3600; // 1小时

// 每日参悟限制
export const DAILY_RESONATE_LIMIT = 3;
