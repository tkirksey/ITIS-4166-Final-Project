-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "zoos" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "year_opened" INTEGER NOT NULL,
    "owner_id" INTEGER NOT NULL,

    CONSTRAINT "zoos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "animals" (
    "id" SERIAL NOT NULL,
    "species" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "zoo_id" INTEGER NOT NULL,

    CONSTRAINT "animals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "id" SERIAL NOT NULL,
    "rating" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "author_id" INTEGER NOT NULL,
    "zoo_id" INTEGER NOT NULL,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "zoos_name_location_owner_id_key" ON "zoos"("name", "location", "owner_id");

-- CreateIndex
CREATE UNIQUE INDEX "animals_species_nickname_zoo_id_key" ON "animals"("species", "nickname", "zoo_id");

-- CreateIndex
CREATE UNIQUE INDEX "reviews_author_id_zoo_id_key" ON "reviews"("author_id", "zoo_id");

-- AddForeignKey
ALTER TABLE "zoos" ADD CONSTRAINT "zoos_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "animals" ADD CONSTRAINT "animals_zoo_id_fkey" FOREIGN KEY ("zoo_id") REFERENCES "zoos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_zoo_id_fkey" FOREIGN KEY ("zoo_id") REFERENCES "zoos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
