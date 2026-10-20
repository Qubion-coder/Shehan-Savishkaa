// Shehan & Savishkaa Homecoming - RSVP & Wishes collector
// Receives POST requests from the invitation site and writes them to Google Sheets.

var SPREADSHEET_ID = '1YR3ab6DiW_kSgIL3nPifkVPQ2mkE1J0PLZq5CHnRZxY';

var SHEETS = {
  rsvp: {
    name: 'rsvp',
    headers: ['Submitted At', 'Guest Name', 'Attending'],
  },
  wish: {
    name: 'wish',
    headers: ['Submitted At', 'Guest Name', 'Message'],
  },
};

var HEADER_BG = '#a51d2d';
var HEADER_TEXT = '#ffffff';

function doGet(e) {
  return ContentService.createTextOutput('Script is running! Send a POST request to submit data.')
    .setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    // Prevents two guests submitting at the same moment from overwriting each other's row
    lock.waitLock(10000);

    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    var body = e && e.postData && e.postData.contents ? e.postData.contents : '{}';
    var payload = JSON.parse(body);

    var formType = String(payload.formType || '').toLowerCase();
    var submittedAt = payload.submittedAt ? new Date(payload.submittedAt) : new Date();

    if (formType === 'rsvp') {
      var rsvpSheet = getOrCreateSheet_(ss, SHEETS.rsvp);
      rsvpSheet.appendRow([
        submittedAt,
        clean_(payload.name),
        formatAttending_(payload.attending),
      ]);
    } else if (formType === 'wish') {
      var wishSheet = getOrCreateSheet_(ss, SHEETS.wish);
      wishSheet.appendRow([
        submittedAt,
        clean_(payload.name),
        clean_(payload.message),
      ]);
    } else {
      throw new Error('Invalid formType. Expected rsvp or wish.');
    }

    return jsonResponse_({ success: true });
  } catch (err) {
    return jsonResponse_({ success: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// Run once from the editor (select "setup" > Run) to create both sheets right away.
function setup() {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  getOrCreateSheet_(ss, SHEETS.rsvp);
  getOrCreateSheet_(ss, SHEETS.wish);
}

function getOrCreateSheet_(ss, config) {
  var sheet = ss.getSheetByName(config.name);
  if (!sheet) {
    sheet = ss.insertSheet(config.name);
  }

  if (sheet.getLastRow() === 0) {
    var headerRange = sheet.getRange(1, 1, 1, config.headers.length);
    headerRange
      .setValues([config.headers])
      .setFontWeight('bold')
      .setBackground(HEADER_BG)
      .setFontColor(HEADER_TEXT);
    sheet.setFrozenRows(1);
    sheet.getRange('A:A').setNumberFormat('yyyy-mm-dd hh:mm:ss');
    sheet.setColumnWidth(1, 170);
    sheet.setColumnWidth(2, 220);
    sheet.setColumnWidth(3, config.name === 'wish' ? 420 : 120);
    if (config.name === 'wish') {
      sheet.getRange('C:C').setWrap(true);
    }
  }

  return sheet;
}

function formatAttending_(value) {
  var v = String(value || '').toLowerCase();
  if (v === 'yes') return 'Yes';
  if (v === 'no') return 'No';
  return clean_(value);
}

// Stops values starting with = + - @ from being run as spreadsheet formulas
function clean_(value) {
  var text = String(value == null ? '' : value).trim();
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function jsonResponse_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
