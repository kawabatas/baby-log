var COLUMN = {
  DATE: 'date',
  TIME: 'time',
  EVENT: 'event',
  MEMO: 'memo'
}

var TYPE = {
  POO: 'poo',
  PEE: 'pee',
  MILK: 'milk',
  HEALTH: 'health'
};

var TYPE_NAME = {
  'poo': 'うんち',
  'pee': 'おしっこ',
  'milk': 'ミルク',
  'health': '体調'
};

var TYPE_BY_NAME = {};
Object.keys(TYPE_NAME).forEach(function(key) {
  TYPE_BY_NAME[TYPE_NAME[key]] = key;
});
