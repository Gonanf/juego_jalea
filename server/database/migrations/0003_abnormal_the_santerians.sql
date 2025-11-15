CREATE TABLE `event_evaluators` (
	`user_id` text NOT NULL,
	`event_id` text NOT NULL,
	`createdAt` integer,
	`updatedAt` integer,
	PRIMARY KEY(`event_id`, `user_id`),
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON UPDATE no action ON DELETE set null
);
