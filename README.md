# CharterAssessment
React/Express assessment application for calculating and displaying a customers earned rewards points per transaction over a three month period.

## Getting Started
1. Clone Repo to local machine
1. Open in desired editor.
1. Execute `npm install`
1. Build with webpack, run `npm run build` and then `npm start`. Or run in dev mode `npm run dev`.
1. Home page will load on `localhost:8080` with an input box for dropping the address of JSON data-sets.
1. Default data-set is provided, but any data set should work following Data Set Instructions [section](##Data-Set-Instructions). On my machine a relative path is working, however if it is not loading go copy the absolute location of `/CharterAssessment/test-data/dataSet.json` and paste into input box.
1. Click Submit button to load a drop-down selector for selecting a customer's ID. 
1. Once customer's ID is selected, select submit, the customer's total points and points from the last 3 months will load.
1. If desired at any point to load a new dataset, you can select the button in the top-right.

## Testing
To run tests, just use `npm run test`. This will cause the jest unit tests to run on the backend. Tests are run from the data-set testDataSet.json. This data-set has multiple sub sets designed to be run on the unit tests. If you have your own test data set you'd like to insert, the only one that will work right away is `"testSanitizeDS"` everything else is based of the middleware chains individual outputs.
## Data Set Instructions
To run your own data set you have to follow the format as shown in `/CharterAssessment/test-data/dataSet.json`. The application is expecting a functioning JSON file with the following format.
```
{
  "transactions": [
    {
      "customer_id": number or string with no alpha characters,
      "date-time" : date string of MM/DD/YYYY with optional HH:mm:ss GMT(timezone)},
      "transaction_amount": number (int or float) or string("$XX.XX" or "XX.XX")
    },
    {more customer transactions with same format}
  ]
}

```
