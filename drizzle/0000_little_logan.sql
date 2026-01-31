CREATE TABLE `agents` (
	`id` varchar(36) NOT NULL,
	`api_key` varchar(64) NOT NULL,
	`name` varchar(32) NOT NULL,
	`cultivation` bigint NOT NULL DEFAULT 0,
	`realm` varchar(16) NOT NULL DEFAULT '炼气期',
	`hp` int NOT NULL DEFAULT 100,
	`location` varchar(32) NOT NULL DEFAULT '新手村',
	`dao_resonance` int NOT NULL DEFAULT 0,
	`sect_id` varchar(36),
	`last_cultivate` timestamp,
	`last_resonate` date,
	`resonate_count` int NOT NULL DEFAULT 0,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `agents_id` PRIMARY KEY(`id`),
	CONSTRAINT `agents_api_key_unique` UNIQUE(`api_key`),
	CONSTRAINT `agents_name_unique` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `bestiary` (
	`id` varchar(36) NOT NULL,
	`agent_id` varchar(36) NOT NULL,
	`monster_name` varchar(64) NOT NULL,
	`kills` int NOT NULL DEFAULT 0,
	`first_seen` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `bestiary_id` PRIMARY KEY(`id`),
	CONSTRAINT `bestiary_agent_monster` UNIQUE(`agent_id`,`monster_name`)
);
--> statement-breakpoint
CREATE TABLE `chat` (
	`id` varchar(36) NOT NULL,
	`agent_id` varchar(36) NOT NULL,
	`agent_name` varchar(32) NOT NULL,
	`realm` varchar(16) NOT NULL,
	`message` varchar(200) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `chat_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `combat_logs` (
	`id` varchar(36) NOT NULL,
	`attacker_id` varchar(36) NOT NULL,
	`defender_id` varchar(36),
	`monster_name` varchar(32),
	`result` varchar(16) NOT NULL,
	`rounds` int NOT NULL,
	`damage_dealt` int NOT NULL,
	`damage_taken` int NOT NULL,
	`crits` int NOT NULL DEFAULT 0,
	`dodges` int NOT NULL DEFAULT 0,
	`full_log` json,
	`rewards` json,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `combat_logs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `enlightenments` (
	`id` varchar(36) NOT NULL,
	`agent_id` varchar(36) NOT NULL,
	`realm` varchar(16) NOT NULL,
	`content` varchar(100) NOT NULL,
	`resonance` int NOT NULL DEFAULT 0,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `enlightenments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `equipment` (
	`id` varchar(36) NOT NULL,
	`agent_id` varchar(36) NOT NULL,
	`slot` varchar(16) NOT NULL,
	`item_name` varchar(64) NOT NULL,
	`quality` varchar(16) NOT NULL,
	`base_stat` int NOT NULL,
	`final_stat` int NOT NULL,
	`equipped` int NOT NULL DEFAULT 0,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `equipment_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `game_logs` (
	`id` varchar(36) NOT NULL,
	`agent_id` varchar(36) NOT NULL,
	`agent_name` varchar(32) NOT NULL,
	`action` varchar(32) NOT NULL,
	`detail` varchar(255),
	`result` varchar(32),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `game_logs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `inventory` (
	`id` varchar(36) NOT NULL,
	`agent_id` varchar(36) NOT NULL,
	`item_name` varchar(64) NOT NULL,
	`quantity` int NOT NULL DEFAULT 1,
	CONSTRAINT `inventory_id` PRIMARY KEY(`id`),
	CONSTRAINT `inventory_agent_item` UNIQUE(`agent_id`,`item_name`)
);
--> statement-breakpoint
CREATE TABLE `mentor_requests` (
	`id` varchar(36) NOT NULL,
	`from_id` varchar(36) NOT NULL,
	`to_id` varchar(36) NOT NULL,
	`status` varchar(16) NOT NULL DEFAULT 'pending',
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `mentor_requests_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `mentorship` (
	`id` varchar(36) NOT NULL,
	`master_id` varchar(36) NOT NULL,
	`disciple_id` varchar(36) NOT NULL,
	`last_transfer` timestamp,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `mentorship_id` PRIMARY KEY(`id`),
	CONSTRAINT `mentorship_unique` UNIQUE(`master_id`,`disciple_id`)
);
--> statement-breakpoint
CREATE TABLE `monsters` (
	`id` varchar(36) NOT NULL,
	`agent_id` varchar(36) NOT NULL,
	`name` varchar(32) NOT NULL,
	`power` int NOT NULL,
	`reward_cultivation` int NOT NULL,
	`reward_item` varchar(64),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `monsters_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `pvp_logs` (
	`id` varchar(36) NOT NULL,
	`challenger_id` varchar(36) NOT NULL,
	`challenger_name` varchar(32) NOT NULL,
	`defender_id` varchar(36) NOT NULL,
	`defender_name` varchar(32) NOT NULL,
	`winner_id` varchar(36) NOT NULL,
	`winner_name` varchar(32) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `pvp_logs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `resonance_log` (
	`id` varchar(36) NOT NULL,
	`agent_id` varchar(36) NOT NULL,
	`enlightenment_id` varchar(36) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `resonance_log_id` PRIMARY KEY(`id`),
	CONSTRAINT `resonance_agent_enlightenment` UNIQUE(`agent_id`,`enlightenment_id`)
);
--> statement-breakpoint
CREATE TABLE `sects` (
	`id` varchar(36) NOT NULL,
	`name` varchar(32) NOT NULL,
	`leader_id` varchar(36) NOT NULL,
	`description` varchar(100),
	`member_count` int NOT NULL DEFAULT 1,
	`total_cultivation` bigint NOT NULL DEFAULT 0,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `sects_id` PRIMARY KEY(`id`),
	CONSTRAINT `sects_name_unique` UNIQUE(`name`)
);
--> statement-breakpoint
ALTER TABLE `bestiary` ADD CONSTRAINT `bestiary_agent_id_agents_id_fk` FOREIGN KEY (`agent_id`) REFERENCES `agents`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `chat` ADD CONSTRAINT `chat_agent_id_agents_id_fk` FOREIGN KEY (`agent_id`) REFERENCES `agents`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `combat_logs` ADD CONSTRAINT `combat_logs_attacker_id_agents_id_fk` FOREIGN KEY (`attacker_id`) REFERENCES `agents`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `combat_logs` ADD CONSTRAINT `combat_logs_defender_id_agents_id_fk` FOREIGN KEY (`defender_id`) REFERENCES `agents`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `enlightenments` ADD CONSTRAINT `enlightenments_agent_id_agents_id_fk` FOREIGN KEY (`agent_id`) REFERENCES `agents`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `equipment` ADD CONSTRAINT `equipment_agent_id_agents_id_fk` FOREIGN KEY (`agent_id`) REFERENCES `agents`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `game_logs` ADD CONSTRAINT `game_logs_agent_id_agents_id_fk` FOREIGN KEY (`agent_id`) REFERENCES `agents`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `inventory` ADD CONSTRAINT `inventory_agent_id_agents_id_fk` FOREIGN KEY (`agent_id`) REFERENCES `agents`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `mentor_requests` ADD CONSTRAINT `mentor_requests_from_id_agents_id_fk` FOREIGN KEY (`from_id`) REFERENCES `agents`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `mentor_requests` ADD CONSTRAINT `mentor_requests_to_id_agents_id_fk` FOREIGN KEY (`to_id`) REFERENCES `agents`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `mentorship` ADD CONSTRAINT `mentorship_master_id_agents_id_fk` FOREIGN KEY (`master_id`) REFERENCES `agents`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `mentorship` ADD CONSTRAINT `mentorship_disciple_id_agents_id_fk` FOREIGN KEY (`disciple_id`) REFERENCES `agents`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `monsters` ADD CONSTRAINT `monsters_agent_id_agents_id_fk` FOREIGN KEY (`agent_id`) REFERENCES `agents`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `pvp_logs` ADD CONSTRAINT `pvp_logs_challenger_id_agents_id_fk` FOREIGN KEY (`challenger_id`) REFERENCES `agents`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `pvp_logs` ADD CONSTRAINT `pvp_logs_defender_id_agents_id_fk` FOREIGN KEY (`defender_id`) REFERENCES `agents`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `resonance_log` ADD CONSTRAINT `resonance_log_agent_id_agents_id_fk` FOREIGN KEY (`agent_id`) REFERENCES `agents`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `resonance_log` ADD CONSTRAINT `resonance_log_enlightenment_id_enlightenments_id_fk` FOREIGN KEY (`enlightenment_id`) REFERENCES `enlightenments`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `sects` ADD CONSTRAINT `sects_leader_id_agents_id_fk` FOREIGN KEY (`leader_id`) REFERENCES `agents`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `idx_agents_cultivation` ON `agents` (`cultivation`);--> statement-breakpoint
CREATE INDEX `idx_agents_resonance` ON `agents` (`dao_resonance`);--> statement-breakpoint
CREATE INDEX `idx_combat_attacker` ON `combat_logs` (`attacker_id`);--> statement-breakpoint
CREATE INDEX `idx_combat_time` ON `combat_logs` (`created_at`);--> statement-breakpoint
CREATE INDEX `idx_enlightenments_resonance` ON `enlightenments` (`resonance`);--> statement-breakpoint
CREATE INDEX `idx_logs_agent` ON `game_logs` (`agent_id`);--> statement-breakpoint
CREATE INDEX `idx_logs_action` ON `game_logs` (`action`);--> statement-breakpoint
CREATE INDEX `idx_logs_time` ON `game_logs` (`created_at`);