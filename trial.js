let errReturn = [];
const requests = {
  getAppFields: async (app) => {
    try {
      const url = app.guestSpace ? `guest/${app.spaceID}/` : '';
      const resp = await fetch(
        `https://pluginmarketplace.kintone.com/k/${url}v1/app/form/fields.json?app=${app.appID}`,
        {
          method: 'GET',
          headers: {
            'X-Cybozu-API-Token': app.key,
            'X-Requested-With': 'XMLHttpRequest',
            'Access-Control-Allow-Origapp.keyin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
          }
        }
      );
      const json = await resp.json();
      return json.properties;
    } catch (error) {
      errReturn.push(error);
    }
  },
  getRecordsofApp: async (app) => {
    try {
      const url = app.guestSpace ? `guest/${app.spaceID}/` : '';
      const resp = await fetch(
        `https://pluginmarketplace.kintone.com/k/${url}v1/records.json?app=${app.appID}`,
        {
          method: 'GET',
          headers: {
            'X-Cybozu-API-Token': app.key,
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
          }
        }
      );
      const json = await resp.json();
      return json.records;
    } catch (error) {
      errReturn.push(error);
    }
  },
  updateRecordByID: async (app, inputRecord) => {
    try {
      const url = app.guestSpace ? `guest/${app.spaceID}/` : '';
      const resp = await fetch(
        `https://pluginmarketplace.kintone.com/k/${url}v1/record.json`,
        {
          method: 'PUT',
          headers: {
            'X-Cybozu-API-Token': app.key,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
          },
          body: JSON.stringify(inputRecord)
        }
      );
      return resp;
    } catch (error) {
      errReturn.push(error);
    }
  },
  addRecord: async (app, inputRecord) => {
    try {
      const url = app.guestSpace ? `guest/${app.spaceID}/` : '';
      const resp = await fetch(
        `https://pluginmarketplace.kintone.com/k/${url}v1/records.json`,
        {
          method: 'POST',
          headers: {
            'X-Cybozu-API-Token': app.key,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
          },
          body: JSON.stringify(inputRecord)
        }
      );
      const json = await resp.json();
      return json;
    } catch (error) {
      errReturn.push(error);
    }
  }
};

const findInJSON = (needle) => {
  let space;
  API_MAP.keys.map((key) => {
    // edge case where two apps could share same name? => go by id instead?
    if (key.appName.includes(needle)) space = key;
    return key;
  });
  return space;
};

const API_MAP = {
  "keys": [
    {
      "id": "0",
      "space": "N/A",
      "spaceID": null,
      "guestSpace": false,
      "appName": "PluginMarketPlace : Trial Customer",
      "appID": 129,
      "key": "JspXTSKOtsumXV1kNOvObF8YUZwAwgtme9V9vnfT"
    },
    {
      "id": "1",
      "space": "GrapeCity",
      "spaceID": 7,
      "guestSpace": true,
      "appName": "Customer: GrapeCity",
      "appID": 62,
      "key": "wONr1k1qtyXrCLtDze1q22EApf59jiWiMXdNETAP"
    },
    {
      "id": "2",
      "space": "R3",
      "spaceID": 4,
      "guestSpace": true,
      "appName": "Customer: R3 institute",
      "appID": 44,
      "key": "Ib4HNWXWZc3Of2cjWFn6Y2XdBSxaTdSYpCUE1oYg"
    },
    {
      "id": "3",
      "space": "OPRO",
      "spaceID": 2,
      "guestSpace": true,
      "appName": "Customer: OPRO",
      "appID": 28,
      "key": "KMZNCbsNE9BL8Hb7BO7iS4db0vs9wY8sHbWEkIyh"
    },
    {
      "id": "4",
      "space": "RadicalBridge",
      "spaceID": 3,
      "guestSpace": true,
      "appName": "Customer: RadicalBridge",
      "appID": 39,
      "key": "MuysqvZlDcEvjiWu4bHXyf76Q6iWfvVlb6FETCJE"
    },
    {
      "id": "5",
      "space": "Soulware",
      "spaceID": 9,
      "guestSpace": true,
      "appName": "Customer: Soulware",
      "appID": 76,
      "key": "TpwJPs2uM397K5e9rVGh59q7ZPS7N1ER6tag8JJv"
    },
    {
      "id": "6",
      "space": "KAM",
      "spaceID": 12,
      "guestSpace": true,
      "appName": "Customer: KDDI",
      "appID": 106,
      "key": "YGI7ruciZ0HLmzOCY5XQHAG2ba4YAzMxQFtZ1j7I"
    },
    {
      "id": "7",
      "space": "NovelWorks",
      "spaceID": 8,
      "guestSpace": true,
      "appName": "Customer: NovelWorks",
      "appID": 73,
      "key": "RoGfkIKHDTZIt2Qes7ghWIUqg3mhSYWpdXzMekxv"
    }
  ]
};

const sourceApp = API_MAP.keys[0];
// get the records of the app we requested
const inputRecords = await requests.getRecordsofApp(sourceApp);
// go through input records and request records of app in space we want to integrate with
await Promise.all(inputRecords.map(async (inputRecord) => {
  // skip if this record is already processed
  if (inputRecord.ReqProcessed.value.length) return inputRecord;

  // skip if this record is a unverified Kintone reseller
  if (inputRecord.resellercheck.value === 'Yes' && !inputRecord.Verify.value.length) return inputRecord;

  // find the app we need to request from list of JSON apps
  const appToAdd = findInJSON(inputRecord.VendorName.value);
  // if undefined then we could not find an app for this vendor
  if (!appToAdd) return inputRecord;

  // request records from app we want to add to
  let appFields = await requests.getAppFields(appToAdd);
  
  // build record package to add to app using records from both apps
  const inputRecordKeys = Object.keys(inputRecord);
  const appFieldsKeys = Object.keys(appFields);
  
  const keysToAdd = inputRecordKeys.map((key) => {
    if (appFieldsKeys.includes(key) && 
      key !== '$id' && 
      key !== 'Record_number' &&
      key !== 'Updated_datetime' &&
      key !== 'Created_datetime' &&
      key !== 'Updated_by' &&
      key !== 'Created_by') return key;
    return false;
  });
  
  // add to the found app the new record
  let content = {
    'app': appToAdd.appID,
    'records': []
  };
  
  let builder = {};
  keysToAdd.map((key) => {
    if (!key) return null;
    builder[key] = {
      value: inputRecord[key].value
    };
    return true;
  });
  content.records.push(builder);
  
  const addedRequest = await requests.addRecord(appToAdd, content);
  if(addedRequest) {
    // update record
    let updatePackage = {
      'app': sourceApp.appID,
      'id': inputRecord.Record_number.value,
      'record': {
        'ReqProcessed': {
          'value': [ 'Requested to the vendor' ]
        },
        'Ref_ID': {
          'value': addedRequest.ids[0]
        }
      }
    };
    await requests.updateRecordByID(sourceApp, updatePackage);
  }
  
  return inputRecord;
}));

output = {id: 1, errs: errReturn};