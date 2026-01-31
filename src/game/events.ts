// 修炼随机事件系统

export type EventType = 'good' | 'bad' | 'neutral';

export interface EventResult {
  cultivationMultiplier: number; // 修为倍率，1 = 100%，0 = 无修为
  daoResonance?: number; // 道韵奖励
  hpDamage?: number; // HP 损失（负数）
  itemReward?: string; // 物品奖励
  itemQuantity?: number; // 物品数量
  cooldownReset?: boolean; // 是否重置冷却
}

export interface CultivationEvent {
  id: number;
  emoji: string;
  name: string;
  type: EventType;
  description: string;
  result: EventResult;
}

export const CULTIVATION_EVENTS: CultivationEvent[] = [
  // 好事（10种）
  {
    id: 1,
    emoji: '🌟',
    name: '灵气潮汐',
    type: 'good',
    description: '天地灵气涌动，恰逢灵气潮汐！',
    result: { cultivationMultiplier: 2.0 },
  },
  {
    id: 2,
    emoji: '💡',
    name: '顿悟',
    type: 'good',
    description: '电光火石间，你对天地法则有了新的领悟！',
    result: { cultivationMultiplier: 1.5, daoResonance: 1 },
  },
  {
    id: 3,
    emoji: '🍀',
    name: '福缘深厚',
    type: 'good',
    description: '冥冥之中自有天意，你发现了埋藏的宝物！',
    result: { cultivationMultiplier: 1.3, itemReward: '灵石', itemQuantity: 2 },
  },
  {
    id: 4,
    emoji: '🦋',
    name: '仙蝶引路',
    type: 'good',
    description: '一只灵蝶翩翩飞来，引导你进入更深层的悟道状态。',
    result: { cultivationMultiplier: 1.4 },
  },
  {
    id: 5,
    emoji: '📖',
    name: '古籍残页',
    type: 'good',
    description: '修炼中你意外发现一页泛黄的古籍残页！',
    result: { cultivationMultiplier: 1.2, itemReward: '古籍残页', itemQuantity: 1 },
  },
  {
    id: 6,
    emoji: '🌸',
    name: '花开见佛',
    type: 'good',
    description: '心如止水，一念之间，花开见佛！',
    result: { cultivationMultiplier: 1.6 },
  },
  {
    id: 7,
    emoji: '⚡',
    name: '雷霆洗礼',
    type: 'good',
    description: '天降紫雷，淬炼你的肉身与灵魂！',
    result: { cultivationMultiplier: 1.8 },
  },
  {
    id: 8,
    emoji: '🐉',
    name: '龙气加持',
    type: 'good',
    description: '地脉龙气涌动，你恰好位于龙穴之上！',
    result: { cultivationMultiplier: 1.7 },
  },
  {
    id: 9,
    emoji: '🎭',
    name: '前辈指点',
    type: 'good',
    description: '一位神秘前辈在梦中指点你的修行！',
    result: { cultivationMultiplier: 1.5 },
  },
  {
    id: 10,
    emoji: '💎',
    name: '灵石矿脉',
    type: 'good',
    description: '修炼时地面塌陷，露出一小片灵石矿脉！',
    result: { cultivationMultiplier: 1.25, itemReward: '灵石', itemQuantity: 3 },
  },

  // 坏事（7种）
  {
    id: 11,
    emoji: '👹',
    name: '心魔侵扰',
    type: 'bad',
    description: '心魔乘虚而入，扰乱你的道心！',
    result: { cultivationMultiplier: 0.8 },
  },
  {
    id: 12,
    emoji: '🌪️',
    name: '走火入魔',
    type: 'bad',
    description: '真气运行出错，险些走火入魔！',
    result: { cultivationMultiplier: 0.7 },
  },
  {
    id: 13,
    emoji: '💨',
    name: '灵气紊乱',
    type: 'bad',
    description: '天地灵气突然紊乱，修炼全部白费！',
    result: { cultivationMultiplier: 0 },
  },
  {
    id: 14,
    emoji: '🦇',
    name: '邪祟干扰',
    type: 'bad',
    description: '阴邪之气侵入，打断了你的修炼！',
    result: { cultivationMultiplier: 0.9 },
  },
  {
    id: 15,
    emoji: '😴',
    name: '昏睡过去',
    type: 'bad',
    description: '修炼太过疲惫，你昏睡了过去...',
    result: { cultivationMultiplier: 0.85 },
  },
  {
    id: 16,
    emoji: '🌑',
    name: '天劫预兆',
    type: 'bad',
    description: '天劫之气降临，压制你的修为增长！',
    result: { cultivationMultiplier: 0.75 },
  },
  {
    id: 17,
    emoji: '💔',
    name: '旧伤复发',
    type: 'bad',
    description: '修炼触动旧伤，气血翻涌！',
    result: { cultivationMultiplier: 0.8, hpDamage: -100 },
  },

  // 中性（3种）
  {
    id: 18,
    emoji: '🔮',
    name: '神秘商人',
    type: 'neutral',
    description: '一位神秘商人出现在你面前，留下一件物品便消失了。',
    result: { cultivationMultiplier: 1.0, itemReward: 'random', itemQuantity: 1 },
  },
  {
    id: 19,
    emoji: '👻',
    name: '故人托梦',
    type: 'neutral',
    description: '梦中有故人来访，留下一句谜语："逆水行舟，不进则退。"',
    result: { cultivationMultiplier: 1.0 },
  },
  {
    id: 20,
    emoji: '🌙',
    name: '时空错乱',
    type: 'neutral',
    description: '时空产生错乱，你回到了修炼之前的状态！',
    result: { cultivationMultiplier: 1.0, cooldownReset: true },
  },
];

// 随机物品池（用于神秘商人）
const RANDOM_ITEMS = ['灵石', '聚灵丹', '疗伤丹', '妖兽内丹', '天材地宝'];

// 触发事件概率
export const EVENT_TRIGGER_CHANCE = 0.3; // 30%

// 好事:坏事:中性 权重
const TYPE_WEIGHTS = {
  good: 50, // 50%
  bad: 35, // 35%
  neutral: 15, // 15%
};

export function rollForEvent(): CultivationEvent | null {
  // 先判断是否触发事件
  if (Math.random() > EVENT_TRIGGER_CHANCE) {
    return null;
  }

  // 决定事件类型
  const roll = Math.random() * 100;
  let eventType: EventType;
  if (roll < TYPE_WEIGHTS.good) {
    eventType = 'good';
  } else if (roll < TYPE_WEIGHTS.good + TYPE_WEIGHTS.bad) {
    eventType = 'bad';
  } else {
    eventType = 'neutral';
  }

  // 从该类型的事件中随机选择
  const eventsOfType = CULTIVATION_EVENTS.filter((e) => e.type === eventType);
  const selectedEvent = eventsOfType[Math.floor(Math.random() * eventsOfType.length)];

  return selectedEvent || null;
}

export function resolveEventItem(itemReward: string | undefined): string | null {
  if (!itemReward) return null;
  if (itemReward === 'random') {
    return RANDOM_ITEMS[Math.floor(Math.random() * RANDOM_ITEMS.length)] || '灵石';
  }
  return itemReward;
}

export function getEventMessage(event: CultivationEvent, baseCultivation: number, actualGained: number): string {
  const multiplierPercent = Math.round(event.result.cultivationMultiplier * 100);

  let message = `${event.emoji} **${event.name}**：${event.description}`;

  if (event.result.cultivationMultiplier > 1) {
    message += ` 修为 +${multiplierPercent}%！`;
  } else if (event.result.cultivationMultiplier < 1 && event.result.cultivationMultiplier > 0) {
    message += ` 修为 -${100 - multiplierPercent}%！`;
  } else if (event.result.cultivationMultiplier === 0) {
    message += ` 本次修炼颗粒无收！`;
  }

  if (event.result.daoResonance) {
    message += ` 道韵 +${event.result.daoResonance}！`;
  }

  if (event.result.hpDamage) {
    message += ` 生命 ${event.result.hpDamage}！`;
  }

  if (event.result.cooldownReset) {
    message += ` 修炼冷却已重置！`;
  }

  return message;
}
