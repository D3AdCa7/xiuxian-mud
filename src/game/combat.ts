// 战斗系统 - 回合制战斗

// 战斗属性
export interface CombatStats {
  hp: number;
  maxHp: number;
  attack: number;
  defense: number;
  speed: number;
  critRate: number;      // 暴击率 0-100
  critDamage: number;    // 暴击伤害倍率 1.5-3.0
  dodgeRate: number;     // 闪避率 0-30
}

// 回合事件
export interface RoundEvent {
  type: 'normal' | 'crit' | 'dodge' | 'block' | 'combo' | 'flash';
  emoji: string;
  description: string;
}

// 单个回合记录
export interface RoundLog {
  round: number;
  attacker: string;
  defender: string;
  events: RoundEvent[];
  damage: number;
  attackerHp: number;
  defenderHp: number;
  narrative: string;
}

// 战斗结果
export interface CombatResult {
  result: 'victory' | 'defeat';
  combatLog: string[];
  fullLog: RoundLog[];
  rounds: number;
  damageDealt: number;
  damageTaken: number;
  crits: number;
  dodges: number;
  hpLost: number;
  cultivationLost: number;
  rewards?: {
    cultivation: number;
    items: { name: string; quantity: number }[];
  };
}

// 随机事件配置
const COMBAT_EVENTS = {
  crit: { baseRate: 10, emoji: '💥', minDamageMultiplier: 1.5, maxDamageMultiplier: 2.0 },
  dodge: { baseRate: 5, emoji: '💨', description: '闪避' },
  block: { rate: 10, emoji: '🛡️', damageReduction: 0.5 },
  combo: { rate: 5, emoji: '⚡', description: '连击' },
  flash: { rate: 1, emoji: '🍀', damageMultiplier: 3, description: '灵光一闪' },
};

// 攻击动作描述
const ATTACK_ACTIONS = [
  '施展剑法',
  '挥出一拳',
  '凝聚真气攻击',
  '使出绝招',
  '祭出法宝',
  '运功一掌',
];

// 怪物攻击描述
const MONSTER_ATTACKS: Record<string, string[]> = {
  default: ['利爪袭来', '张口噬咬', '狂暴冲撞', '释放妖气', '发出怒吼攻击'],
};

// 防御描述
const DEFENSE_DESCRIPTIONS = [
  '你灵巧闪避，毫发无伤',
  '你侧身躲开了攻击',
  '你身形一闪，避开了致命一击',
  '你及时后撤，化险为夷',
];

// 格挡描述
const BLOCK_DESCRIPTIONS = [
  '你运起护体真气，挡下了部分伤害',
  '你举剑格挡，化解了大部分攻势',
  '你以力化力，减轻了伤害',
];

// 暴击描述
const CRIT_DESCRIPTIONS = [
  '剑气凌厉',
  '一击命中要害',
  '气势如虹',
  '势不可挡',
  '威力惊人',
];

// 灵光一闪描述
const FLASH_DESCRIPTIONS = [
  '灵光一闪，你领悟了破绽',
  '电光火石间，你找到了致命弱点',
  '天道眷顾，你抓住了千载难逢的机会',
];

// 计算战斗属性（基于修为 + 装备 + 图鉴加成）
export function calculateCombatStats(
  cultivation: number,
  equipBonus: { attack: number; defense: number; hp: number },
  bestiaryBonus: number = 0 // 图鉴伤害加成百分比
): CombatStats {
  // 基础属性
  const baseHp = Math.max(100, cultivation * 10);
  const baseAttack = Math.max(10, cultivation);
  const baseDefense = Math.max(5, Math.floor(cultivation * 0.5));

  // 速度基于修为的对数增长
  const baseSpeed = Math.floor(10 + Math.log10(cultivation + 1) * 20);

  // 暴击率随修为缓慢增长，上限30%
  const baseCritRate = Math.min(30, 10 + Math.floor(Math.log10(cultivation + 1) * 5));

  // 暴击伤害基础1.5倍
  const baseCritDamage = 1.5;

  // 闪避率基于防御，上限30%
  const baseDodgeRate = Math.min(30, 5 + Math.floor(baseDefense / 100));

  return {
    hp: baseHp + equipBonus.hp,
    maxHp: baseHp + equipBonus.hp,
    attack: Math.floor((baseAttack + equipBonus.attack) * (1 + bestiaryBonus / 100)),
    defense: baseDefense + equipBonus.defense,
    speed: baseSpeed,
    critRate: baseCritRate,
    critDamage: baseCritDamage,
    dodgeRate: baseDodgeRate,
  };
}

// 计算怪物战斗属性
export function calculateMonsterStats(power: number, monsterName: string): CombatStats {
  return {
    hp: power * 5,
    maxHp: power * 5,
    attack: power,
    defense: Math.floor(power * 0.3),
    speed: Math.floor(10 + Math.log10(power + 1) * 15),
    critRate: 5,
    critDamage: 1.5,
    dodgeRate: 3,
  };
}

// 随机选择数组元素
function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]!;
}

// 随机浮动
function randomFloat(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

// 判定是否触发（百分比概率）
function rollChance(rate: number): boolean {
  return Math.random() * 100 < rate;
}

// 计算伤害
function calculateDamage(
  attackerStats: CombatStats,
  defenderStats: CombatStats
): { baseDamage: number; isCrit: boolean; isFlash: boolean; isBlock: boolean; finalDamage: number } {
  // 检测灵光一闪（1%）
  const isFlash = rollChance(COMBAT_EVENTS.flash.rate);

  // 检测暴击
  const isCrit = !isFlash && rollChance(attackerStats.critRate);

  // 检测格挡
  const isBlock = !isFlash && !isCrit && rollChance(COMBAT_EVENTS.block.rate);

  // 基础伤害 = (攻击 - 防御×0.5) × 随机浮动
  let baseDamage = Math.max(1, attackerStats.attack - defenderStats.defense * 0.5);
  baseDamage = Math.floor(baseDamage * randomFloat(0.9, 1.1));

  let finalDamage = baseDamage;

  if (isFlash) {
    finalDamage = Math.floor(baseDamage * COMBAT_EVENTS.flash.damageMultiplier);
  } else if (isCrit) {
    const critMultiplier = randomFloat(
      COMBAT_EVENTS.crit.minDamageMultiplier,
      COMBAT_EVENTS.crit.maxDamageMultiplier
    );
    finalDamage = Math.floor(baseDamage * critMultiplier);
  } else if (isBlock) {
    finalDamage = Math.floor(baseDamage * COMBAT_EVENTS.block.damageReduction);
  }

  return { baseDamage, isCrit, isFlash, isBlock, finalDamage };
}

// 生成回合叙事
function generateRoundNarrative(
  round: number,
  isPlayerTurn: boolean,
  playerName: string,
  monsterName: string,
  damage: number,
  isDodge: boolean,
  isCrit: boolean,
  isFlash: boolean,
  isBlock: boolean,
  isCombo: boolean,
  isFirst: boolean
): string {
  const lines: string[] = [];
  lines.push(`【第${round}回合】`);

  if (isFirst) {
    if (isPlayerTurn) {
      lines.push('凭借更快的身法，你抢先出手！');
    } else {
      lines.push(`${monsterName}抢先发起攻击！`);
    }
  }

  if (isPlayerTurn) {
    // 玩家攻击
    const action = randomChoice(ATTACK_ACTIONS);
    lines.push(`你${action}，攻向${monsterName}...`);

    if (isDodge) {
      lines.push(`💨 ${monsterName}灵巧地躲开了你的攻击！`);
    } else if (isFlash) {
      lines.push(`🍀 ${randomChoice(FLASH_DESCRIPTIONS)}，造成 ${damage} 点毁灭性伤害！`);
    } else if (isCrit) {
      lines.push(`💥 暴击！${randomChoice(CRIT_DESCRIPTIONS)}，造成 ${damage} 点伤害！`);
    } else if (isBlock) {
      lines.push(`${monsterName}奋力抵挡，造成 ${damage} 点伤害`);
    } else {
      lines.push(`命中！造成 ${damage} 点伤害`);
    }

    if (isCombo) {
      lines.push('⚡ 气势如虹，你再次出手！');
    }
  } else {
    // 怪物攻击
    const monsterActions = MONSTER_ATTACKS[monsterName] ?? MONSTER_ATTACKS.default!;
    const monsterAction = randomChoice(monsterActions);
    lines.push(`${monsterName}反击，${monsterAction}...`);

    if (isDodge) {
      lines.push(`💨 ${randomChoice(DEFENSE_DESCRIPTIONS)}`);
    } else if (isBlock) {
      lines.push(`🛡️ ${randomChoice(BLOCK_DESCRIPTIONS)}，受到 ${damage} 点伤害`);
    } else if (isCrit) {
      lines.push(`💥 ${monsterName}攻击凶猛，你受到 ${damage} 点重创！`);
    } else {
      lines.push(`你被击中，受到 ${damage} 点伤害`);
    }
  }

  return lines.join('\n');
}

// 执行单个攻击
function executeAttack(
  attacker: { name: string; stats: CombatStats; isPlayer: boolean },
  defender: { name: string; stats: CombatStats; isPlayer: boolean },
  round: number,
  isFirst: boolean
): { damage: number; events: RoundEvent[]; narrative: string; isDodge: boolean; combo: boolean } {
  const events: RoundEvent[] = [];

  // 闪避判定
  const isDodge = rollChance(defender.stats.dodgeRate + COMBAT_EVENTS.dodge.baseRate);

  if (isDodge) {
    events.push({ type: 'dodge', emoji: '💨', description: '闪避' });
    const narrative = generateRoundNarrative(
      round, attacker.isPlayer, attacker.isPlayer ? attacker.name : defender.name,
      attacker.isPlayer ? defender.name : attacker.name,
      0, true, false, false, false, false, isFirst
    );
    return { damage: 0, events, narrative, isDodge: true, combo: false };
  }

  // 计算伤害
  const damageResult = calculateDamage(attacker.stats, defender.stats);

  if (damageResult.isFlash) {
    events.push({ type: 'flash', emoji: '🍀', description: '灵光一闪' });
  } else if (damageResult.isCrit) {
    events.push({ type: 'crit', emoji: '💥', description: '暴击' });
  } else if (damageResult.isBlock) {
    events.push({ type: 'block', emoji: '🛡️', description: '格挡' });
  } else {
    events.push({ type: 'normal', emoji: '', description: '' });
  }

  // 连击判定
  const combo = rollChance(COMBAT_EVENTS.combo.rate);
  if (combo) {
    events.push({ type: 'combo', emoji: '⚡', description: '连击' });
  }

  const narrative = generateRoundNarrative(
    round, attacker.isPlayer, attacker.isPlayer ? attacker.name : defender.name,
    attacker.isPlayer ? defender.name : attacker.name,
    damageResult.finalDamage, false, damageResult.isCrit, damageResult.isFlash, damageResult.isBlock, combo, isFirst
  );

  return { damage: damageResult.finalDamage, events, narrative, isDodge: false, combo };
}

// 主战斗函数
export function resolveCombat(
  playerName: string,
  playerStats: CombatStats,
  monsterStats: CombatStats,
  monsterName: string,
  rewardCultivation: number,
  rewardItem: string | null
): CombatResult {
  const combatLog: string[] = [];
  const fullLog: RoundLog[] = [];

  let playerHp = playerStats.hp;
  let monsterHp = monsterStats.hp;
  let totalDamageDealt = 0;
  let totalDamageTaken = 0;
  let totalCrits = 0;
  let totalDodges = 0;

  const MAX_ROUNDS = 20;
  let round = 0;

  // 开场白
  combatLog.push(`═══════════════════════════════`);
  combatLog.push(`⚔️ 战斗开始：${playerName} VS ${monsterName}`);
  combatLog.push(`你：HP ${playerHp} | 攻击 ${playerStats.attack} | 防御 ${playerStats.defense}`);
  combatLog.push(`${monsterName}：HP ${monsterHp} | 攻击 ${monsterStats.attack}`);
  combatLog.push(`═══════════════════════════════`);

  // 速度判定决定先手
  const playerFirst = playerStats.speed >= monsterStats.speed ||
    (playerStats.speed === monsterStats.speed && Math.random() < 0.5);

  while (round < MAX_ROUNDS && playerHp > 0 && monsterHp > 0) {
    round++;
    const roundLog: RoundLog = {
      round,
      attacker: '',
      defender: '',
      events: [],
      damage: 0,
      attackerHp: 0,
      defenderHp: 0,
      narrative: '',
    };

    const isFirst = round === 1;
    const narratives: string[] = [];

    // 第一个攻击者
    const firstAttacker = playerFirst
      ? { name: playerName, stats: playerStats, isPlayer: true }
      : { name: monsterName, stats: monsterStats, isPlayer: false };
    const firstDefender = playerFirst
      ? { name: monsterName, stats: monsterStats, isPlayer: false }
      : { name: playerName, stats: playerStats, isPlayer: true };

    // 执行第一个攻击
    let result = executeAttack(firstAttacker, firstDefender, round, isFirst);
    narratives.push(result.narrative);

    if (firstAttacker.isPlayer) {
      monsterHp = Math.max(0, monsterHp - result.damage);
      totalDamageDealt += result.damage;
      if (result.events.some(e => e.type === 'crit' || e.type === 'flash')) totalCrits++;
    } else {
      playerHp = Math.max(0, playerHp - result.damage);
      totalDamageTaken += result.damage;
      if (result.events.some(e => e.type === 'dodge')) totalDodges++;
    }

    // 处理连击
    while (result.combo && (playerFirst ? monsterHp > 0 : playerHp > 0)) {
      result = executeAttack(firstAttacker, firstDefender, round, false);
      narratives.push(result.narrative);
      if (firstAttacker.isPlayer) {
        monsterHp = Math.max(0, monsterHp - result.damage);
        totalDamageDealt += result.damage;
        if (result.events.some(e => e.type === 'crit' || e.type === 'flash')) totalCrits++;
      } else {
        playerHp = Math.max(0, playerHp - result.damage);
        totalDamageTaken += result.damage;
      }
    }

    // 如果被攻击者还活着，反击
    if ((playerFirst ? monsterHp > 0 : playerHp > 0)) {
      result = executeAttack(firstDefender, firstAttacker, round, false);
      // 只添加后半部分（跳过回合标题）
      const narrativeLines = result.narrative.split('\n');
      narratives.push(narrativeLines.slice(1).join('\n'));

      if (firstDefender.isPlayer) {
        monsterHp = Math.max(0, monsterHp - result.damage);
        totalDamageDealt += result.damage;
        if (result.events.some(e => e.type === 'crit' || e.type === 'flash')) totalCrits++;
      } else {
        playerHp = Math.max(0, playerHp - result.damage);
        totalDamageTaken += result.damage;
        if (result.events.some(e => e.type === 'dodge')) totalDodges++;
      }

      // 处理反击连击
      while (result.combo && (playerFirst ? playerHp > 0 : monsterHp > 0)) {
        result = executeAttack(firstDefender, firstAttacker, round, false);
        narratives.push(result.narrative);
        if (firstDefender.isPlayer) {
          monsterHp = Math.max(0, monsterHp - result.damage);
          totalDamageDealt += result.damage;
        } else {
          playerHp = Math.max(0, playerHp - result.damage);
          totalDamageTaken += result.damage;
        }
      }
    }

    // 回合结束血量显示
    narratives.push(`[你: ${playerHp} HP | ${monsterName}: ${monsterHp} HP]`);

    const fullNarrative = narratives.join('\n');
    combatLog.push(fullNarrative);
    combatLog.push('');

    roundLog.narrative = fullNarrative;
    roundLog.attackerHp = playerHp;
    roundLog.defenderHp = monsterHp;
    fullLog.push(roundLog);
  }

  // 战斗结果
  const isVictory = monsterHp <= 0;

  combatLog.push(`═══════════════════════════════`);

  if (isVictory) {
    combatLog.push(`🎉 战斗胜利！`);
    combatLog.push(`${monsterName}倒下了！`);
    combatLog.push(`总计造成 ${totalDamageDealt} 伤害，受到 ${totalDamageTaken} 伤害`);
    combatLog.push(`暴击 ${totalCrits} 次，闪避 ${totalDodges} 次`);
    combatLog.push(`───────────────────────────────`);
    combatLog.push(`📜 战利品：`);
    combatLog.push(`  修为 +${rewardCultivation}`);
    if (rewardItem) {
      combatLog.push(`  获得物品：${rewardItem}`);
    }

    const items: { name: string; quantity: number }[] = [];
    if (rewardItem) {
      items.push({ name: rewardItem, quantity: 1 });
    }

    return {
      result: 'victory',
      combatLog,
      fullLog,
      rounds: round,
      damageDealt: totalDamageDealt,
      damageTaken: totalDamageTaken,
      crits: totalCrits,
      dodges: totalDodges,
      hpLost: playerStats.hp - playerHp,
      cultivationLost: 0,
      rewards: {
        cultivation: rewardCultivation,
        items,
      },
    };
  } else {
    const cultivationLost = Math.floor(playerStats.attack * 0.05);

    combatLog.push(`💀 战斗失败...`);
    combatLog.push(`你被${monsterName}击败，仓皇逃离`);
    combatLog.push(`总计造成 ${totalDamageDealt} 伤害，受到 ${totalDamageTaken} 伤害`);
    combatLog.push(`损失修为：${cultivationLost}`);

    return {
      result: 'defeat',
      combatLog,
      fullLog,
      rounds: round,
      damageDealt: totalDamageDealt,
      damageTaken: totalDamageTaken,
      crits: totalCrits,
      dodges: totalDodges,
      hpLost: playerStats.hp - playerHp,
      cultivationLost,
    };
  }
}

// 保留旧接口的兼容性（用于平滑过渡）
export function resolveCombatLegacy(
  agentAttack: number,
  agentDefense: number,
  agentHp: number,
  monsterPower: number,
  monsterName: string,
  rewardCultivation: number,
  rewardItem: string | null
): CombatResult {
  const playerStats: CombatStats = {
    hp: agentHp,
    maxHp: agentHp,
    attack: agentAttack,
    defense: agentDefense,
    speed: Math.floor(10 + Math.log10(agentAttack + 1) * 20),
    critRate: Math.min(30, 10 + Math.floor(Math.log10(agentAttack + 1) * 5)),
    critDamage: 1.5,
    dodgeRate: Math.min(30, 5 + Math.floor(agentDefense / 100)),
  };

  const monsterStats = calculateMonsterStats(monsterPower, monsterName);

  return resolveCombat('你', playerStats, monsterStats, monsterName, rewardCultivation, rewardItem);
}
