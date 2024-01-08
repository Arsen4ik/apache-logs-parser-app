-- CreateTable
CREATE TABLE "wp_s3cu_form_on_landing" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "main_point" INTEGER NOT NULL,
    "sex" TEXT,
    "age" TEXT,
    "params" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
