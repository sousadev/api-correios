const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const allPackages = async (req, res) => {
  const result = await prisma.package.findMany({
    where: {
      userId: req.idNumber,
    },
  });
  console.log(await result);
  (await result) ? res.status(200).json(await result) : res.status(404);
};

const createPackage = async (req, res) => {
  const result = await prisma.package.create({
    data: {
      nickname: req.body.nickname,
      userId: req.idNumber,
      trackingCode: req.body.trackingCode,
    },
  });

  (await result)
    ? res.status(201).json(await result)
    : res.status(500).json({ message: 'error' });
};

module.exports = { allPackages, createPackage };
