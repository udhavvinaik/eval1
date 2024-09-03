const seedData = [
    {
        name: "Spicy Arrabbiata Pasta",
        image: "https://images.unsplash.com/photo-1516100882582-96c3a05fe590?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8U3BpY3klMjBBcnJhYmJpYXRhJTIwUGFzdGF8ZW58MHx8MHx8fDA%3D",
        price: 512,
        rating: 4.5,
    },
    {
        name: "Tandoori Chicken Pizza",
        image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8VGFuZG9vcmklMjBDaGlja2VuJTIwUGl6emF8ZW58MHx8MHx8fDA%3D",
        price: 918,
        rating: 4.5,
    },
    {
        name: "Crispy Spiced Parmesan Chicken",
        image: "https://images.unsplash.com/photo-1637200699168-bebbb02916f8?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Q3Jpc3B5JTIwQ2hpY2tlbnxlbnwwfHwwfHx8MA%3D%3D",
        price: 1002,
        rating: 4.5,
    },
    {
        name: "Herb-Grilled Salmon",
        image: "https://images.unsplash.com/photo-1675870792392-116a80bd7ad6?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c2FsbW9ufGVufDB8fDB8fHww",
        price: 1500,
        rating: 3.8,
    },
    {
        name: "Creamy Lobster Bisque",
        image: "https://images.unsplash.com/photo-1707995546403-a8cb996e5932?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bG9ic3RlcnxlbnwwfHwwfHx8Mg%3D%3D",
        price: 2000,
        rating: 3.8,
    },
    {
        name: "Garlic Shrimp Scampi",
        image: "https://images.unsplash.com/photo-1535400255456-984241443b29?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2hyaW1wfGVufDB8fDB8fHwy",
        price: 2500,
        rating: 3.8,
    },
    {
        name: "California Roll",
        image: "https://images.unsplash.com/photo-1553701275-1d6118df60bf?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Q2FsaWZvcm5pYSUyMFJvbGx8ZW58MHx8MHx8fDI%3D",
        price: 800,
        rating: 4.2,
    },
    {
        name: "Spicy Tuna Sashimi",
        image: "https://images.unsplash.com/photo-1624904025431-d905ca1ba91e?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8U3BpY3klMjBUdW5hJTIwU2FzaGltaXxlbnwwfHwwfHx8Mg%3D%3D",
        price: 1500,
        rating: 4.2,
    },
    {
        name: "Miso Soup",
        image: "https://images.unsplash.com/photo-1478749485505-2a903a729c63?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c291cHxlbnwwfHwwfHx8Mg%3D%3D",
        price: 800,
        rating: 4.2,
    },
    {
        name: "Classic Filet Mignon",
        image: "https://images.unsplash.com/photo-1559847844-5315695dadae?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZmlsbGV0fGVufDB8fDB8fHwy",
        price: 2800,
        rating: 4.7,
    },
    {
        name: "New York Strip Steak",
        image: "https://images.unsplash.com/photo-1556269923-e4ef51d69638?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c3RyaXAlMjBzdGVha3xlbnwwfHwwfHx8Mg%3D%3D",
        price: 2400,
        rating: 4.7,
    },
    {
        name: "Signature Ribeye",
        image: "https://images.unsplash.com/photo-1625937329368-9c6e55f665ba?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmliZXllfGVufDB8fDB8fHwy",
        price: 2300,
        rating: 4.7,
    },
    {
        name: "Sushi Platter",
        image: "https://images.unsplash.com/photo-1570877215023-229052e10c34?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c3VzaGklMjBwbGF0dGVyfGVufDB8fDB8fHwy",
        price: 2000,
        rating: 4.0,
    },
    {
        name: "Pad Thai",
        image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8UGFkJTIwVGhhaXxlbnwwfHwwfHx8Mg%3D%3D",
        price: 1005,
        rating: 4.0,
    },
    {
        name: "Mongolian Beef",
        image: "https://images.unsplash.com/photo-1548869206-93b036288d7e?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmVlZnxlbnwwfHwwfHx8Mg%3D%3D",
        price: 1800,
        rating: 4.0,
    },
];

module.exports = seedData;
