# Excel Add-in PoC

Based on Svelte + Vite + TypeScript.

## Installation

```
npm install
```


## Run with Excel

```
npm run start
```

(please don't forget to run `npm run stop` later).


For full functionality you need MS Excel installed on your computer. Otherwise you can open the project in a web browser but not all the features will be available.

## Run without Excel and in debug mode

To run in a hybrid mode (development, debug) please

1. Run ```npm run dev``` - addin will be available in a browser as (https://localhost:5173/taskpane.html)[https://localhost:5173/taskpane.html]
2. If you need, in **other** terminal run ```npm run start``` which will open Excel.

### Sideload and cleanup

https://learn.microsoft.com/en-us/office/dev/add-ins/testing/sideload-an-office-add-in-on-mac

https://learn.microsoft.com/en-us/office/dev/add-ins/testing/debug-office-add-ins-on-ipad-and-mac#clearing-the-office-applications-cache-on-a-mac
