/*
  Warnings:

  - The primary key for the `wp_s3cu_form_on_landing` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `wp_s3cu_form_on_landing` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_wp_s3cu_form_on_landing" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "main_point" INTEGER NOT NULL,
    "sex" TEXT,
    "age" TEXT,
    "params" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_wp_s3cu_form_on_landing" ("age", "createdAt", "id", "main_point", "params", "sex", "updatedAt") SELECT "age", "createdAt", "id", "main_point", "params", "sex", "updatedAt" FROM "wp_s3cu_form_on_landing";
DROP TABLE "wp_s3cu_form_on_landing";
ALTER TABLE "new_wp_s3cu_form_on_landing" RENAME TO "wp_s3cu_form_on_landing";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
