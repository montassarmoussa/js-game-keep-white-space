const {Vec, getTimeStr, Position} = require('../KeepWhiteSpace/main.js');


test('new Vec(1, 2) returns{x: 1, y: 2}', () => {
  const resultat = new Vec(1, 2);

  expect(resultat.x).toBe(1);
  expect(resultat.y).toBe(2);
});

test('new Vec(1, 2).add(new Vec(3, 4)) returns{x: 4, y: 6}', () =>{
  const resulat = new Vec(1, 2).add(new Vec(3, 4));

  expect(resulat.x).toBe(4);
  expect(resulat.y).toBe(6);
});

test('new Vec(1, 2).mul(-2, 3) returns{x: -2, y: 6}', () =>{
  const resultat = new Vec(1, 2).mul(-2, 3);

  expect(resultat.x).toBe(-2);
  expect(resultat.y).toBe(6);
});

test('new Vec(1, 2).dot(new Vec(2, 1)) returns4', () =>{
  const resultat = new Vec(1, 2).dot(new Vec(2, 1));

  expect(resultat).toBe(4);
});

test('new Vec(1, 2).cross(new Vec(3, 4).mul(-2,3)) returns24', () =>{
  const resultat = new Vec(1, 2).cross(new Vec(3, 4).mul(-2, 3));

  expect(resultat).toBe(24);
});

test('new Vec(1, 2).dot(new Vec(1, 2).add(new Vec(new Vec(1, 2).dot(new Vec(2, 1)), new Vec(1, 2).cross(new Vec(3, 4).mul(-2,3))))) returns57', () => {
  const resultat = new Vec(1, 2).dot(new Vec(1, 2).add(new Vec(new Vec(1, 2).dot(new Vec(2, 1)), new Vec(1, 2).cross(new Vec(3, 4).mul(-2, 3)))));

  expect(resultat).toBe(57);
});

test('new Vec(1, 2).add(3) returns{x: NaN, y: NaN}', () => {
  const resultat = new Vec(1, 2).add(3);

  expect(resultat.x).toBeNaN();
  expect(resultat.y).toBeNaN();
});

test('new Vec(1, 1).cross(new Vec(-42, -42)) returns0', () => {
  const resultat = new Vec(1, 1).cross(new Vec(-42, -42));

  expect(resultat).toBe(0);
});

test('getTimeStr(424242) returns"7:04.24"', () => {
  const resultat = getTimeStr(424242);

  expect(resultat).toBe('7:04.24');
});

test('getTimeStr(-123456) returns"-3:-4.-4"', () => {
  const resultat = getTimeStr(-123456);

  expect(resultat).toBe('-3:-4.-4');
});

// test que j'ajoute en plus 1/5
test('Nouvelle Position', () => {
  const poisition = new Position(2, 5);

  expect(poisition.x).toBe(2);
  expect(poisition.y).toBe(5);
});

// test que j'ajoute en plus 2/5
test(' Position Move', () =>{
  const position = new Position(2, 3);
  position.move(5, 7);
  expect(position.x).toBe(7);
  expect(position.y).toBe(10);
});

// test que j'ajoute en plus 3/5
test('Vec.add avec (0,0) renvoie le vecteur inchangé', () => {
  const resultat = new Vec(5, 7).add(new Vec(0, 0));
  expect(resultat.x).toBe(5);
  expect(resultat.y).toBe(7);
});

// test que j'ajoute en plus 4/5
test('Deux Position.move successifs cumulent les déplacements', () => {
  const position = new Position(0, 0);
  position.move(3, 4);
  position.move(1, 2);
  expect(position.x).toBe(4);
  expect(position.y).toBe(6);
});

// test que j'ajoute en plus 4/5
test('Vec.dot avec vecteurs perpendiculaires donne 0', () => {
  const resultat = new Vec(1, 0).dot(new Vec(0, 1));
  expect(resultat).toBe(0);
});


