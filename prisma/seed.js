const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const places = [
    { name: 'Pondok Pesantren Hidayatussibyan' },
    { name: 'Pondok Pesantren Al-Janawiyah' },
    { name: "Pondok Pesantren Mathla'ul Anwar" },
    { name: 'Kp. Pasanggrahan' },
    { name: 'Kampung Umbulan 2' },
    { name: 'Kampung Cijangkar' },
    { name: 'Kampung Ngamplang' },
    { name: 'Kampung Maruyung' },
    { name: 'Kampung Liomadu' },
    { name: 'Kampung Sempurkurung' }
  ];

  for (const place of places) {
    await prisma.place.create({
      data: place,
    });
  }

  console.log('Seeding selesai!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
