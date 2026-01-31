// 物品系统

export interface ItemEffect {
  type: 'cultivation' | 'hp';
  value: number;
}

export interface ItemConfig {
  name: string;
  description: string;
  effect: ItemEffect;
  dropRate: number; // 掉落概率 0-1
}

export const ITEMS: Record<string, ItemConfig> = {
  '妖兽内丹': {
    name: '妖兽内丹',
    description: '妖兽体内凝结的灵力精华',
    effect: { type: 'cultivation', value: 100 },
    dropRate: 0.3,
  },
  '聚灵丹': {
    name: '聚灵丹',
    description: '凝聚天地灵气的丹药',
    effect: { type: 'cultivation', value: 500 },
    dropRate: 0.1,
  },
  '疗伤丹': {
    name: '疗伤丹',
    description: '快速恢复伤势的丹药',
    effect: { type: 'hp', value: 1000 },
    dropRate: 0.2,
  },
  '灵石': {
    name: '灵石',
    description: '蕴含灵气的石头',
    effect: { type: 'cultivation', value: 50 },
    dropRate: 0.4,
  },
  '天材地宝': {
    name: '天材地宝',
    description: '稀有的修炼资源',
    effect: { type: 'cultivation', value: 1000 },
    dropRate: 0.05,
  },
  '古籍残页': {
    name: '古籍残页',
    description: '记载着上古功法的残页',
    effect: { type: 'cultivation', value: 200 },
    dropRate: 0.1,
  },
};

export function getRandomItem(): string | null {
  const items = Object.values(ITEMS);
  const rand = Math.random();

  for (const item of items) {
    if (rand < item.dropRate) {
      return item.name;
    }
  }
  return null;
}

export function applyItemEffect(item: ItemConfig, currentCultivation: number, currentHp: number) {
  const maxHp = Math.max(100, currentCultivation * 10);

  if (item.effect.type === 'cultivation') {
    return {
      cultivation: currentCultivation + item.effect.value,
      hp: currentHp,
      message: `修为 +${item.effect.value}`,
    };
  } else {
    const newHp = Math.min(maxHp, currentHp + item.effect.value);
    return {
      cultivation: currentCultivation,
      hp: newHp,
      message: `生命值 +${item.effect.value}`,
    };
  }
}
