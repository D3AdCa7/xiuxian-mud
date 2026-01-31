// 装备系统

export type EquipmentSlot = 'weapon' | 'armor' | 'accessory';
export type EquipmentQuality = '凡品' | '良品' | '极品' | '仙品' | '神品';

export interface EquipmentConfig {
  name: string;
  slot: EquipmentSlot;
  baseStat: number;
  realmRequired: string;
}

export interface Equipment {
  name: string;
  slot: EquipmentSlot;
  quality: EquipmentQuality;
  baseStat: number;
  finalStat: number;
}

// 品质倍率
export const QUALITY_MULTIPLIERS: Record<EquipmentQuality, number> = {
  '凡品': 1,
  '良品': 1.5,
  '极品': 2,
  '仙品': 3,
  '神品': 5,
};

// 品质掉落概率
export const QUALITY_DROP_RATES: { quality: EquipmentQuality; weight: number }[] = [
  { quality: '凡品', weight: 60 },
  { quality: '良品', weight: 25 },
  { quality: '极品', weight: 10 },
  { quality: '仙品', weight: 4 },
  { quality: '神品', weight: 1 },
];

// 装备配置
export const EQUIPMENT_LIST: EquipmentConfig[] = [
  // 武器（+攻击）
  { name: '木剑', slot: 'weapon', baseStat: 10, realmRequired: '炼气期' },
  { name: '铁剑', slot: 'weapon', baseStat: 30, realmRequired: '筑基期' },
  { name: '灵剑', slot: 'weapon', baseStat: 80, realmRequired: '金丹期' },
  { name: '仙剑', slot: 'weapon', baseStat: 200, realmRequired: '元婴期' },
  { name: '神剑', slot: 'weapon', baseStat: 500, realmRequired: '化神期' },
  
  // 护甲（+防御）
  { name: '布衣', slot: 'armor', baseStat: 5, realmRequired: '炼气期' },
  { name: '皮甲', slot: 'armor', baseStat: 15, realmRequired: '筑基期' },
  { name: '灵甲', slot: 'armor', baseStat: 40, realmRequired: '金丹期' },
  { name: '仙甲', slot: 'armor', baseStat: 100, realmRequired: '元婴期' },
  { name: '神甲', slot: 'armor', baseStat: 250, realmRequired: '化神期' },
  
  // 饰品（+血量）
  { name: '护身符', slot: 'accessory', baseStat: 50, realmRequired: '炼气期' },
  { name: '玉佩', slot: 'accessory', baseStat: 150, realmRequired: '筑基期' },
  { name: '灵珠', slot: 'accessory', baseStat: 400, realmRequired: '金丹期' },
  { name: '仙环', slot: 'accessory', baseStat: 1000, realmRequired: '元婴期' },
  { name: '神链', slot: 'accessory', baseStat: 2500, realmRequired: '化神期' },
];

// 随机品质
export function rollQuality(): EquipmentQuality {
  const totalWeight = QUALITY_DROP_RATES.reduce((sum, q) => sum + q.weight, 0);
  let rand = Math.random() * totalWeight;
  
  for (const { quality, weight } of QUALITY_DROP_RATES) {
    rand -= weight;
    if (rand <= 0) return quality;
  }
  return '凡品';
}

// 根据境界获取可掉落的装备
export function getDroppableEquipment(realm: string): EquipmentConfig[] {
  const realmOrder = ['炼气期', '筑基期', '金丹期', '元婴期', '化神期', '飞升'];
  const realmIndex = realmOrder.indexOf(realm);
  
  return EQUIPMENT_LIST.filter(eq => {
    const eqRealmIndex = realmOrder.indexOf(eq.realmRequired);
    return eqRealmIndex <= realmIndex;
  });
}

// 生成随机装备
export function generateEquipment(realm: string): Equipment | null {
  const droppable = getDroppableEquipment(realm);
  if (droppable.length === 0) return null;
  
  const config = droppable[Math.floor(Math.random() * droppable.length)]!;
  const quality = rollQuality();
  const multiplier = QUALITY_MULTIPLIERS[quality];
  
  return {
    name: config.name,
    slot: config.slot,
    quality,
    baseStat: config.baseStat,
    finalStat: Math.floor(config.baseStat * multiplier),
  };
}

// 装备品质颜色 emoji
export function getQualityEmoji(quality: EquipmentQuality): string {
  const emojis: Record<EquipmentQuality, string> = {
    '凡品': '⚪',
    '良品': '🟢',
    '极品': '🔵',
    '仙品': '🟣',
    '神品': '🟡',
  };
  return emojis[quality];
}

// 检查境界是否满足装备要求
export function canEquip(equipmentName: string, playerRealm: string): boolean {
  const config = EQUIPMENT_LIST.find(eq => eq.name === equipmentName);
  if (!config) return false;
  
  const realmOrder = ['炼气期', '筑基期', '金丹期', '元婴期', '化神期', '飞升'];
  const playerRealmIndex = realmOrder.indexOf(playerRealm);
  const eqRealmIndex = realmOrder.indexOf(config.realmRequired);
  
  return playerRealmIndex >= eqRealmIndex;
}

// 获取槽位中文名
export function getSlotName(slot: EquipmentSlot): string {
  const names: Record<EquipmentSlot, string> = {
    'weapon': '武器',
    'armor': '护甲',
    'accessory': '饰品',
  };
  return names[slot];
}

// 获取槽位属性名
export function getSlotStatName(slot: EquipmentSlot): string {
  const names: Record<EquipmentSlot, string> = {
    'weapon': '攻击',
    'armor': '防御',
    'accessory': '血量',
  };
  return names[slot];
}
