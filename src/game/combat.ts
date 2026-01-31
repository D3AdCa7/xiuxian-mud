// 战斗系统

export interface CombatResult {
  result: 'victory' | 'defeat';
  combatLog: string[];
  hpLost: number;
  cultivationLost: number;
  rewards?: {
    cultivation: number;
    items: { name: string; quantity: number }[];
  };
}

export function resolveCombat(
  agentAttack: number,
  agentDefense: number,
  agentHp: number,
  monsterPower: number,
  monsterName: string,
  rewardCultivation: number,
  rewardItem: string | null
): CombatResult {
  const combatLog: string[] = [];

  // 简单战斗计算
  if (agentAttack > monsterPower) {
    // 胜利
    const damageDealt = agentAttack;
    const damageReceived = Math.max(0, Math.floor(monsterPower * 0.2 - agentDefense * 0.1));

    combatLog.push(`你施展功法，攻击${monsterName}`);
    combatLog.push(`造成 ${damageDealt} 伤害`);

    if (damageReceived > 0) {
      combatLog.push(`${monsterName}反击，你受到 ${damageReceived} 伤害`);
    } else {
      combatLog.push(`${monsterName}的攻击被你轻松化解`);
    }

    combatLog.push(`${monsterName}倒下了！`);

    const items: { name: string; quantity: number }[] = [];
    if (rewardItem) {
      items.push({ name: rewardItem, quantity: 1 });
      combatLog.push(`获得物品：${rewardItem}`);
    }

    combatLog.push(`修为 +${rewardCultivation}`);

    return {
      result: 'victory',
      combatLog,
      hpLost: damageReceived,
      cultivationLost: 0,
      rewards: {
        cultivation: rewardCultivation,
        items,
      },
    };
  } else {
    // 失败
    const damageReceived = Math.floor(monsterPower * 0.5);
    const cultivationLost = Math.floor(agentAttack * 0.05);

    combatLog.push(`你施展功法，攻击${monsterName}`);
    combatLog.push(`${monsterName}轻松躲过了你的攻击`);
    combatLog.push(`${monsterName}反击，你受到 ${damageReceived} 重创`);
    combatLog.push(`你仓皇逃离，损失修为 ${cultivationLost}`);

    return {
      result: 'defeat',
      combatLog,
      hpLost: damageReceived,
      cultivationLost,
    };
  }
}
