// 怪物生成系统

import { getRandomItem } from './items';

const MONSTER_NAMES = [
  '妖兽', '邪修', '魔物', '灵兽', '野兽',
  '妖狼', '毒蛇', '巨蜘蛛', '食人花', '石魔',
  '雷鹰', '火蟒', '冰狼', '风虎', '土熊',
];

const MONSTER_PREFIXES = [
  '', '小', '普通', '精英', '变异', '远古', '上古',
];

export interface GeneratedMonster {
  name: string;
  power: number;
  rewardCultivation: number;
  rewardItem: string | null;
}

export function generateMonster(agentCultivation: number): GeneratedMonster {
  // 生成实力在玩家 50%-150% 之间的怪物
  const minPower = Math.max(10, agentCultivation * 0.5);
  const maxPower = Math.max(20, agentCultivation * 1.5);
  const power = Math.floor(minPower + Math.random() * (maxPower - minPower));

  // 根据实力选择前缀
  let prefixIndex = 0;
  if (power > agentCultivation * 1.2) {
    prefixIndex = Math.floor(Math.random() * 3) + 4; // 变异/远古/上古
  } else if (power > agentCultivation * 0.8) {
    prefixIndex = Math.floor(Math.random() * 2) + 2; // 普通/精英
  } else {
    prefixIndex = Math.floor(Math.random() * 2); // 空/小
  }

  const prefix = MONSTER_PREFIXES[prefixIndex] ?? '';
  const baseName = MONSTER_NAMES[Math.floor(Math.random() * MONSTER_NAMES.length)] ?? '妖兽';
  const name = prefix + baseName;

  // 奖励计算
  const rewardCultivation = Math.floor(power * 0.1);
  const rewardItem = Math.random() < 0.3 ? getRandomItem() : null;

  return {
    name,
    power,
    rewardCultivation,
    rewardItem,
  };
}

export function getMonsterHint(agentAttack: number, monsterPower: number): string {
  const ratio = agentAttack / monsterPower;

  if (ratio >= 1.5) {
    return '此敌实力远低于你，轻松可胜';
  } else if (ratio >= 1.0) {
    return '你的修为足以挑战此敌';
  } else if (ratio >= 0.7) {
    return '此敌略强于你，需谨慎应对';
  } else {
    return '此敌远超你的实力，建议回避';
  }
}
