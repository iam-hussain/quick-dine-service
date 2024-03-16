import { PrismaClient } from "@prisma/client";
import { create } from "lodash";
import idGenerator from "../src/libs/id-generator";

const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

prisma.$on("query" as never, (e: any) => {
  console.log("Query: " + e.query);
  console.log("Duration: " + e.duration + "ms");
});

async function main() {
  const alice = await prisma.businessAccount.create({
    data: {
      shortId: idGenerator.generateShortID(),
      firstName: "Alice",
      email: "alice@prisma.io",
      username: "alice",
      password:
        "adf43b82b4063a9759fb7b2d041015dd0e48f60783b27c6e0687329306850952b8059cf0d54c4175c799856de1bce72938dbd797c62883bd080d45e60df33693",
      salt: "43c6453dcfe82835eca275d9f0032e7d848c39250c58b03fa9efa9a2d673b99369a3cb44ba92f10817865c668f3e4bde0a1548df0815be1f47ac4f467d4b5d16",
    },
  });

  const bob = await prisma.businessAccount.create({
    data: {
      shortId: idGenerator.generateShortID(),
      firstName: "Bob",
      email: "bob@prisma.io",
      username: "bobs",
      password:
        "adf43b82b4063a9759fb7b2d041015dd0e48f60783b27c6e0687329306850952b8059cf0d54c4175c799856de1bce72938dbd797c62883bd080d45e60df33693",
      salt: "43c6453dcfe82835eca275d9f0032e7d848c39250c58b03fa9efa9a2d673b99369a3cb44ba92f10817865c668f3e4bde0a1548df0815be1f47ac4f467d4b5d16",
    },
  });

  const charlie = await prisma.businessAccount.create({
    data: {
      shortId: idGenerator.generateShortID(),
      firstName: "Charlie",
      email: "charlie@prisma.io",
      username: "charlie",
      password:
        "adf43b82b4063a9759fb7b2d041015dd0e48f60783b27c6e0687329306850952b8059cf0d54c4175c799856de1bce72938dbd797c62883bd080d45e60df33693",
      salt: "43c6453dcfe82835eca275d9f0032e7d848c39250c58b03fa9efa9a2d673b99369a3cb44ba92f10817865c668f3e4bde0a1548df0815be1f47ac4f467d4b5d16",
    },
  });

  const danny = await prisma.businessAccount.create({
    data: {
      shortId: idGenerator.generateShortID(),
      firstName: "Danny",
      email: "danny@prisma.io",
      username: "danny",
      password:
        "adf43b82b4063a9759fb7b2d041015dd0e48f60783b27c6e0687329306850952b8059cf0d54c4175c799856de1bce72938dbd797c62883bd080d45e60df33693",
      salt: "43c6453dcfe82835eca275d9f0032e7d848c39250c58b03fa9efa9a2d673b99369a3cb44ba92f10817865c668f3e4bde0a1548df0815be1f47ac4f467d4b5d16",
    },
  });

  const elena = await prisma.businessAccount.create({
    data: {
      shortId: idGenerator.generateShortID(),
      firstName: "Elena",
      email: "elena@prisma.io",
      username: "elena",
      password:
        "adf43b82b4063a9759fb7b2d041015dd0e48f60783b27c6e0687329306850952b8059cf0d54c4175c799856de1bce72938dbd797c62883bd080d45e60df33693",
      salt: "43c6453dcfe82835eca275d9f0032e7d848c39250c58b03fa9efa9a2d673b99369a3cb44ba92f10817865c668f3e4bde0a1548df0815be1f47ac4f467d4b5d16",
    },
  });

  const store = await prisma.store.create({
    data: {
      shortId: idGenerator.generateShortID(),
      prefix: "ac",
      name: "A Canteen",
      slug: "a-canteen",
      tables: 5,
      addresses: {
        create: {
          shortId: idGenerator.generateShortID(),
          line1: "New street",
          state: "Tamil Nadu",
          county: "India",
          pincode: "606601",
          position: 1,
        },
      },
    },
  });

  const storeId = store.shortId;
  await prisma.businessAccountsOnStores.createMany({
    data: [
      {
        accountId: alice.shortId,
        administer: true,
        storeId,
      },
      {
        accountId: bob.shortId,
        administer: false,
        storeId,
      },
      {
        accountId: charlie.shortId,
        administer: false,
        storeId,
      },
      {
        accountId: danny.shortId,
        administer: false,
        storeId,
      },
      {
        accountId: elena.shortId,
        administer: false,
        storeId,
      },
    ],
  });

  const image1 = await prisma.image.create({
    data: {
      shortId: idGenerator.generateShortID(),
      caption: "Briyani Food",
      altText: "The Briyani pot",
      type: "URL",
      content:
        "https://images.unsplash.com/photo-1642821373181-696a54913e93?q=80&w=4740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  });

  const image2 = await prisma.image.create({
    data: {
      shortId: idGenerator.generateShortID(),
      caption: "Briyani Food",
      altText: "The Briyani Food",
      type: "URL",
      content:
        "https://images.unsplash.com/photo-1642821373181-696a54913e93?q=80&w=4740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  });

  await prisma.category.create({
    data: {
      name: "Briyani",
      deck: "The Special Briyani pot",
      position: 1,
      imageId: image1.shortId,
      storeId,
      shortId: idGenerator.generateShortID(),
      products: {
        create: {
          name: "Mutton Briyani",
          deck: "The Mutton Briyani Pot",
          price: 350,
          storeId: storeId,
          shortId: idGenerator.generateShortID(),
          image: {
            create: {
              shortId: idGenerator.generateShortID(),
              caption: "Mutton Briyani Food",
              altText: "The Mutton Briyani pot",
              type: "URL",
              content:
                "https://media.istockphoto.com/id/980036908/photo/gosht-or-lamb-biryani-prepared-in-basmati-rice-served-with-yogurt-dip-in-terracotta-bowl.jpg?s=1024x1024&w=is&k=20&c=3ZSUuA6nf9xmdX3pWyTcb7iGTme8HudkXOe3bUJDl-c=",
            },
          },
        },
      },
    },
  });

  await prisma.category.create({
    data: {
      name: "Dessert",
      deck: "The Delicious Dessert",
      position: 2,
      storeId,
      imageId: image2.shortId,
      shortId: idGenerator.generateShortID(),
      products: {
        create: [
          {
            shortId: idGenerator.generateShortID(),
            name: "Raspberries and Pistachio Cake",
            deck: "Delicious cake with pistachio and raspberries",
            price: 100,
            storeId: storeId,
            image: {
              create: {
                shortId: idGenerator.generateShortID(),
                caption: "Raspberries and Pistachio Cake",
                altText: "Delicious cake with pistachio and raspberries",
                type: "URL",
                content:
                  "https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=2865&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              },
            },
          },
          {
            name: "Chocolate Donuts",
            deck: "Delicious donuts with chocolate",
            price: 150,
            storeId: storeId,
            shortId: idGenerator.generateShortID(),
            image: {
              create: {
                shortId: idGenerator.generateShortID(),
                caption: "Chocolate Donuts",
                altText: "Delicious donuts with chocolate",
                type: "URL",
                content:
                  "https://images.unsplash.com/photo-1551106652-a5bcf4b29ab6?q=80&w=2837&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              },
            },
          },
        ],
      },
    },
  });
  return true;
}
main()
  .then(async () => {
    await prisma.$disconnect();
    process.exit(0);
  })
  .catch(async (e) => {
    await prisma.$disconnect();
    console.error(e);
    process.exit(1);
  });
