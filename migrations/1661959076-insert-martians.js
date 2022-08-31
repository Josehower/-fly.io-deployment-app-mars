const martians = [
  { name: 'Peter', age: 10 },
  { name: 'Rita', age: 8 },
  { name: 'Severus', age: 58 },
  { name: 'Polly', age: 46 },
  { name: 'Rebecca', age: 13 },
  { name: 'Harry', age: 70 },
  { name: 'Lulu', age: 32 },
  { name: 'Sandy', age: 24 },
  { name: 'Morris', age: 12 },
];

exports.up = async (sql) => {
  await sql`
    INSERT INTO martians ${sql(martians, 'name', 'age')}
  `;
};

exports.down = async (sql) => {
  for (const martian of martians) {
    await sql`
      DELETE FROM
      martians
      WHERE
			  name = ${martian.name} AND
			  age = ${martian.age}
    `;
  }
};
