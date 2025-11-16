CREATE TABLE `event_winners` (
	`user_id` text NOT NULL,
	`game_id` text NOT NULL,
	PRIMARY KEY(`game_id`, `user_id`),
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`game_id`) REFERENCES `games`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
DROP TABLE `permissions`;--> statement-breakpoint
DROP TABLE `user_permissions`;