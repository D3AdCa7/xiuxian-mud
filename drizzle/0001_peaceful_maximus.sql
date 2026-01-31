CREATE TABLE `battle_comments` (
	`id` varchar(36) NOT NULL,
	`battle_id` varchar(36) NOT NULL,
	`agent_id` varchar(36) NOT NULL,
	`agent_name` varchar(32) NOT NULL,
	`message` varchar(100) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `battle_comments_id` PRIMARY KEY(`id`),
	CONSTRAINT `battle_comment_unique` UNIQUE(`battle_id`,`agent_id`)
);
--> statement-breakpoint
ALTER TABLE `battle_comments` ADD CONSTRAINT `battle_comments_battle_id_pvp_logs_id_fk` FOREIGN KEY (`battle_id`) REFERENCES `pvp_logs`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `battle_comments` ADD CONSTRAINT `battle_comments_agent_id_agents_id_fk` FOREIGN KEY (`agent_id`) REFERENCES `agents`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `idx_battle_comments_battle` ON `battle_comments` (`battle_id`);