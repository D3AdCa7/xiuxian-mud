import { mysqlTable, varchar, bigint, int, timestamp, date, unique, index } from 'drizzle-orm/mysql-core';

// 修士表
export const agents = mysqlTable('agents', {
  id: varchar('id', { length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  apiKey: varchar('api_key', { length: 64 }).unique().notNull(),
  name: varchar('name', { length: 32 }).unique().notNull(),

  // 核心数值
  cultivation: bigint('cultivation', { mode: 'number' }).default(0).notNull(),
  realm: varchar('realm', { length: 16 }).default('炼气期').notNull(),
  hp: int('hp').default(100).notNull(),
  location: varchar('location', { length: 32 }).default('新手村').notNull(),

  // 悟道系统
  daoResonance: int('dao_resonance').default(0).notNull(),

  // 冷却
  lastCultivate: timestamp('last_cultivate'),
  lastResonate: date('last_resonate'),
  resonateCount: int('resonate_count').default(0).notNull(),

  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => [
  index('idx_agents_cultivation').on(table.cultivation),
  index('idx_agents_resonance').on(table.daoResonance),
]);

// 悟道表
export const enlightenments = mysqlTable('enlightenments', {
  id: varchar('id', { length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  agentId: varchar('agent_id', { length: 36 }).references(() => agents.id).notNull(),
  realm: varchar('realm', { length: 16 }).notNull(),
  content: varchar('content', { length: 100 }).notNull(),
  resonance: int('resonance').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => [
  index('idx_enlightenments_resonance').on(table.resonance),
]);

// 背包表
export const inventory = mysqlTable('inventory', {
  id: varchar('id', { length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  agentId: varchar('agent_id', { length: 36 }).references(() => agents.id).notNull(),
  itemName: varchar('item_name', { length: 64 }).notNull(),
  quantity: int('quantity').default(1).notNull(),
}, (table) => [
  unique('inventory_agent_item').on(table.agentId, table.itemName),
]);

// 参悟记录表
export const resonanceLog = mysqlTable('resonance_log', {
  id: varchar('id', { length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  agentId: varchar('agent_id', { length: 36 }).references(() => agents.id).notNull(),
  enlightenmentId: varchar('enlightenment_id', { length: 36 }).references(() => enlightenments.id).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => [
  unique('resonance_agent_enlightenment').on(table.agentId, table.enlightenmentId),
]);

// 临时怪物表
export const monsters = mysqlTable('monsters', {
  id: varchar('id', { length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  agentId: varchar('agent_id', { length: 36 }).references(() => agents.id).notNull(),
  name: varchar('name', { length: 32 }).notNull(),
  power: int('power').notNull(),
  rewardCultivation: int('reward_cultivation').notNull(),
  rewardItem: varchar('reward_item', { length: 64 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// 装备表
export const equipment = mysqlTable('equipment', {
  id: varchar('id', { length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  agentId: varchar('agent_id', { length: 36 }).references(() => agents.id).notNull(),
  slot: varchar('slot', { length: 16 }).notNull(), // weapon/armor/accessory
  itemName: varchar('item_name', { length: 64 }).notNull(),
  quality: varchar('quality', { length: 16 }).notNull(),
  baseStat: int('base_stat').notNull(),
  finalStat: int('final_stat').notNull(),
  equipped: int('equipped').default(0).notNull(), // 0=未装备, 1=已装备
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// 怪物图鉴表
export const bestiary = mysqlTable('bestiary', {
  id: varchar('id', { length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  agentId: varchar('agent_id', { length: 36 }).references(() => agents.id).notNull(),
  monsterName: varchar('monster_name', { length: 64 }).notNull(),
  kills: int('kills').default(0).notNull(),
  firstSeen: timestamp('first_seen').defaultNow().notNull(),
}, (table) => [
  unique('bestiary_agent_monster').on(table.agentId, table.monsterName),
]);

// 修仙日志表
export const gameLogs = mysqlTable('game_logs', {
  id: varchar('id', { length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  agentId: varchar('agent_id', { length: 36 }).references(() => agents.id).notNull(),
  agentName: varchar('agent_name', { length: 32 }).notNull(),
  action: varchar('action', { length: 32 }).notNull(), // cultivate/explore/fight/equip/use...
  detail: varchar('detail', { length: 255 }),
  result: varchar('result', { length: 32 }), // success/fail
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => [
  index('idx_logs_agent').on(table.agentId),
  index('idx_logs_action').on(table.action),
  index('idx_logs_time').on(table.createdAt),
]);

export type Agent = typeof agents.$inferSelect;
export type NewAgent = typeof agents.$inferInsert;
export type Enlightenment = typeof enlightenments.$inferSelect;
export type InventoryItem = typeof inventory.$inferSelect;
export type Monster = typeof monsters.$inferSelect;
export type EquipmentItem = typeof equipment.$inferSelect;
export type BestiaryEntry = typeof bestiary.$inferSelect;
export type GameLog = typeof gameLogs.$inferSelect;
