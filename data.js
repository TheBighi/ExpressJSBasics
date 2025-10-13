const posts = [
  { id: 1, title: 'Food', content: "Cool post about food and stuff", author: "Mina", published: true, createdAt: (new Date).toISOString(), updatedAt: (new Date).toISOString()},
  { id: 2, title: 'Cinema', content: "Opinions on the new movie", author: "Mina", published: false, createdAt: (new Date).toISOString(), updatedAt: (new Date).toISOString()}
];

module.exports = posts;