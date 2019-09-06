function onFormSubmit(e) {
  var startTime = Date.now();

  var keys = Object.keys(e.namedValues);
  var dateKey;
  var eventKey;
  var memoKey;

  keys.forEach(function(key) {
    if (key.indexOf('日時') > -1) {
      dateKey = key;
    } else if (key.indexOf('イベント') > -1) {
      eventKey = key;
    } else if (key.indexOf('メモ') > -1) {
      memoKey = key;
    }
  });

  var date = e.namedValues[dateKey][0] ? new Date(e.namedValues[dateKey][0]) : new Date();
  var events = e.namedValues[eventKey][0].split(/,\s*/);
  var memo = e.namedValues[memoKey][0];

  if (events.indexOf(TYPE_NAME.poo) > -1) {
    records.appendJournalRecord(date, TYPE.POO, memo);
  }
  if (events.indexOf(TYPE_NAME.pee) > -1) {
    records.appendJournalRecord(date, TYPE.PEE, memo);
  }
  if (events.indexOf(TYPE_NAME.milk) > -1) {
    records.appendJournalRecord(date, TYPE.MILK, memo);
  }
  if (events.indexOf(TYPE_NAME.health) > -1) {
    records.appendJournalRecord(date, TYPE.HEALTH, memo);
  }

  var executionTime = Date.now() - startTime;
  Logger.log('onFormSubmit took ' + executionTime + ' ms');
}

function registerPoo() {
  var startTime = Date.now();

  records.appendJournalRecord(new Date(), TYPE.POO);

  var executionTime = Date.now() - startTime;
  Logger.log('registerPoo took ' + executionTime + ' ms');
}

function registerPee() {
  var startTime = Date.now();

  records.appendJournalRecord(new Date(), TYPE.PEE);

  var executionTime = Date.now() - startTime;
  Logger.log('registerPee took ' + executionTime + ' ms');
}

function registerPooAndPee() {
  var startTime = Date.now();

  records.appendJournalRecord(new Date(), TYPE.POO);
  records.appendJournalRecord(new Date(), TYPE.PEE);

  var executionTime = Date.now() - startTime;
  Logger.log('registerPooAndPee took ' + executionTime + ' ms');
}

function registerMilk() {
  var startTime = Date.now();

  records.appendJournalRecord(new Date(), TYPE.MILK);

  var executionTime = Date.now() - startTime;
  Logger.log('registerMilk took ' + executionTime + ' ms');
}

var records = {};

records.getSheet = function () {
  if (!records.sheet) {
    records.sheet = SpreadsheetApp.getActive().getSheetByName('records');
  }
  return records.sheet;
}

records.appendJournalRecord = function (date, type, memo) {
  var startTime = Date.now();
  Logger.log('appendJournalRecord started');

  records.getSheet().appendRow(records.createJournalRecordRowContent(date, type, memo));

  var executionTime = Date.now() - startTime;
  Logger.log('appendJournalRecord took ' + executionTime + ' ms');
};

records.createJournalRecordRowContent = function (date, type, memo) {
  var row = [];
  row.push("'" + date.toLocaleDateString());
  row.push("'" + date.toLocaleTimeString().replace(/[^:0-9]/g, ''));
  row.push(TYPE_NAME[type]);
  if (memo) {
    row.push(memo);
  }
  return row;
}
