-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_wp_s3cu_form_on_landing" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "main_point" INTEGER NOT NULL,
    "sex" TEXT,
    "age" TEXT,
    "params" TEXT,
    "createdAt" TEXT NOT NULL,
    "updatedAt" TEXT NOT NULL
);
INSERT INTO "new_wp_s3cu_form_on_landing" ("age", "createdAt", "id", "main_point", "params", "sex", "updatedAt") SELECT "age", "createdAt", "id", "main_point", "params", "sex", "updatedAt" FROM "wp_s3cu_form_on_landing";
DROP TABLE "wp_s3cu_form_on_landing";
ALTER TABLE "new_wp_s3cu_form_on_landing" RENAME TO "wp_s3cu_form_on_landing";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
