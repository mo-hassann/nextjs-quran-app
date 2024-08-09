import { pgTable, uuid, text, varchar, date, timestamp, integer, uniqueIndex, primaryKey } from "drizzle-orm/pg-core";

export const userTable = pgTable("user", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  username: varchar("user_name", { length: 256 }).notNull().unique(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: text("password"),
  emailVerified: timestamp("email_verified"),
  bio: text("bio"),
  image: text("image"),
  dateOfBirth: date("date_of_birth"),
  dailyReadingGoal: integer("daily_reading_goal").notNull().default(30), // 30 minutes
});

export const favoriteChapterTable = pgTable(
  "favorite_chapter",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    userId: uuid("user_id")
      .notNull()
      .references(() => userTable.id, { onDelete: "cascade" }),
    chapterId: integer("chapter_id").notNull(),
    createdAt: date("created_at").defaultNow().notNull(),
  },
  (table) => ({
    uniqueUserChapter: uniqueIndex("user_chapter_favorite").on(table.userId, table.chapterId),
  })
);

export const bookmarkVerseTable = pgTable(
  "bookmark_verse",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    userId: uuid("user_id")
      .notNull()
      .references(() => userTable.id, { onDelete: "cascade" }),
    verseId: integer("verse_id").notNull(),
    chapterId: integer("chapter_id").notNull(),
    createdAt: date("created_at").defaultNow().notNull(),
  },
  (table) => ({
    uniqueUserChapterVerse: uniqueIndex("user_chapter_verse_bookmark").on(table.userId, table.chapterId, table.verseId),
  })
);

export const dailyReadingTimeTable = pgTable(
  "daily_reading_time",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => userTable.id, { onDelete: "cascade" }),
    date: date("date", { mode: "date" }).defaultNow().notNull(),
    readingTime: integer("reading_time").notNull().default(0),
  },
  (table) => ({
    uniqueUserDate: uniqueIndex("user_date").on(table.userId, table.date),
    pk: primaryKey({ columns: [table.userId, table.date] }),
  })
);
