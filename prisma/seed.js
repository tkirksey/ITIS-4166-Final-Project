import prisma from '../src/config/db.js';
import bcrypt from "bcrypt";

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

try {
    // Only truncate table in development
    if (isDev) {
        await prisma.$queryRaw`TRUNCATE users, zoos, animals, reviews RESTART IDENTITY;`;
        console.log('Development: All tables truncated.');
    }

    const count = await prisma.user.count();

    // since everyother table has a dependency to users,
    // we only need to check if we have no users
    if (count === 0) {

        const userData = [
            { 
                email: "alice@greenzoo.com", 
                password: await bcrypt.hash("iloveanimals", 10)
            },
            { 
                email: "bob@orangezoo.com", 
                password: await bcrypt.hash("bestzoo123", 10)
            },
            { 
                email: "john@gmail.com", 
                password: await bcrypt.hash("simple1234", 10)
            },
            { 
                email: "jane@gmail.com", 
                password: await bcrypt.hash("andclean123", 10)
            },
            { 
                email: "siteadmin@admin.org", 
                password: await bcrypt.hash("Outdoors1627", 10), 
                role: "ADMIN" 
            }
        ];

        const users = [];

        for (let data of userData){
            const user = await prisma.user.create({data:data});
            users.push(user);
        }

        const zooData = [
            { 
                name: 'Green Zoo', 
                location: 'Charlotte, NC', 
                yearOpened: 2026, 
                ownerId: users.find((user) => user.email === 'alice@greenzoo.com').id 
            },
            {
                name: 'Orange Zoo',
                location: 'Concord, NC',
                yearOpened: 2019,
                ownerId: users.find((user) => user.email === 'bob@orangezoo.com').id
            }
        ];

        const zoos = [];

        for (let data of zooData){
            const zoo = await prisma.zoo.create({data: data});
            zoos.push(zoo);
        }

        const animalData = [
            {
                nickname: 'Alex',
                species: 'African Lion',
                zooId: zoos.find((zoo) => zoo.name === 'Green Zoo').id
            },
            {
                nickname: 'Melman',
                species: 'Southern Giraffe',
                zooId: zoos.find((zoo) => zoo.name === 'Green Zoo').id
            },
            {
                nickname: 'Marty',
                species: 'Plains Zebra',
                zooId: zoos.find((zoo) => zoo.name === 'Green Zoo').id
            },
            {
                nickname: 'Tony',
                species: 'South China Tiger',
                zooId: zoos.find((zoo) => zoo.name === 'Orange Zoo').id
            },
            {
                nickname: 'Baast',
                species: 'Black Panther',
                zooId: zoos.find((zoo) => zoo.name === 'Orange Zoo').id
            },
            {
                nickname: 'Diane',
                species: 'Red Fox',
                zooId: zoos.find((zoo) => zoo.name === 'Orange Zoo').id
            }
        ];

        for (let data of animalData){
            await prisma.animal.create({data: data});
        }

        const reviewData = [
            {
                rating: 5,
                content: 'Wonderful zoo here in Charlotte! Owner was very nice!',
                authorId: users.find((user) => user.email === 'john@gmail.com').id,
                zooId: zoos.find((zoo) => zoo.name === 'Green Zoo').id
            },
            {
                rating: 3,
                content: 'An okay zoo. Not as impressive as the zoo in Charlotte.',
                authorId: users.find((user) => user.email === 'john@gmail.com').id,
                zooId: zoos.find((zoo) => zoo.name === 'Orange Zoo').id
            },
            {
                rating: 4,
                content: 'Had a great time visiting this zoo, but $7 for a bottle of water is crazy!',
                authorId: users.find((user) => user.email === 'jane@gmail.com').id,
                zooId: zoos.find((zoo) => zoo.name === 'Green Zoo').id
            },
            {
                rating: 2,
                content: 'Not very cleanly facilities and $18 for a small cup of water is just downright inhumane.',
                authorId: users.find((user) => user.email === 'jane@gmail.com').id,
                zooId: zoos.find((zoo) => zoo.name === 'Orange Zoo').id
            }
        ];

        for (let data of reviewData){
            await prisma.review.create({data:data});
        }

        console.log('Database seeded successfully!');
    } else {
        console.log('Database already contains data. Skipping user seed.');
    }



} catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
} finally {
    await prisma.$disconnect();
}
