# TypeScript Challenge Instructions

## Candidate notes: 

See my comments here, as well as sprinkled through the code. 

Getting this running: 

In one terminal 

```
cd backend
npm i 
npm start

```

This will start the backend running on port 3001

On another terminal 

```
cd frontend
npm i 
npm start
```

This will start the frontend dev server running

### Tests

Both packages have tests, they can be run with 

```
npm test
```

The tests demonstrate a range of test styles:

- Straight unit tests (handlers.test.ts)
- Contract tests (contractTests.test.ts)
- RTL unit tests (CustomerList.test.tsx, OrderList.test.tsx)
- Whatever you call the file loading test, where it's conducting real IO operations. 

### Error handling 

I haven't included an error boundary in the React application, but that would be the standard thing to do. 
There's a UX design question what should happen if something 403s, 500s, just blow the whole application up and show them a error screen? 

For the API, errors can be handled up in the error middleware. 

For the data ingestions, my solution is to blow up the application but see my notes about maybe we want to write out to logs instead. 

### Async data loading

Cool challenge. 

I'm using [stream-json](https://www.npmjs.com/package/stream-json) to stream the file. 

Write a Node project that:
 1. reads in the file `data.json` transforms it into a format that matches `example-output.json`
 2. load transformed data into a datastore - store can be of your choice, in memory or a local database
 3. Create an API that has 2 get API calls. One for customers and one for orders that pull data from the datastore
 4. Create a simple UI that calls the API and displays the customer and the customers orders

### Pagination 

These endpoints aren't paginated, and they probably should be. I think a good approach for any list data is to make the end points return a paginated like structure, eg. 

```
{
    "data": [
     ...
    ], 
    pageInfo: {
        pageNumber: 0, 
        totalResults: 100, 
        resultsPerPage: "all", 
    }
}
```

Even if you're not implementing any pagination functionality. That way, if later you _do_ need to implement pagination, you don't need to change your response structure. 

## General Approach and Assumptions

- Solution should be implemetned in TypeScript.
- Read JSON `data.json` async from it's directory, convert data async, write into datastore async
- Solution should be run from the command line using `npm run`.
- Solution should be non-blocking.
- Solution should use React or modern equivilent for UI
- Solution APIs should be REST compliant

## Criteria

Your work will be evaluated primarily on:

- Consistency of coding style.
- Correct use of promises, including proper error handling.
- Correct use of TypeScript, including interface/object definitions.
- Absence of "callback hell".
- Correct and complete unit test coverage.
- General quality of code and technical communication.

## How to submit your work

 1. Fork this project on github.
 2. Update this README.md file with instructions on how to build/test/run your script.
 3. When you're finished, send us the URL of your public repository.
