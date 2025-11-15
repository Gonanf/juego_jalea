CREATE TABLE `user_library` (
	`user_id` text NOT NULL,
	`game_id` text NOT NULL,
	`createdAt` integer,
	`updatedAt` integer,
	PRIMARY KEY(`game_id`, `user_id`),
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`game_id`) REFERENCES `games`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_event_winners` (
	`event_id` text NOT NULL,
	`game_id` text NOT NULL,
	`createdAt` integer,
	`updatedAt` integer,
	PRIMARY KEY(`game_id`, `event_id`),
	FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`game_id`) REFERENCES `games`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_event_winners`("event_id", "game_id", "createdAt", "updatedAt") SELECT "event_id", "game_id", "createdAt", "updatedAt" FROM `event_winners`;--> statement-breakpoint
DROP TABLE `event_winners`;--> statement-breakpoint
ALTER TABLE `__new_event_winners` RENAME TO `event_winners`;--> statement-breakpoint
PRAGMA foreign_keys=ON;