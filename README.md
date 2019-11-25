# Admin pages to PDF

This example shows how to remotely login to Processwire administration back-end and print desired pages to PDF using Node.js and headless browser Puppeteer. More details about this is [here](https://processwire.com/talk/topic/20101-how-to-render-admin-page-into-a-variable-to-create-a-pdf/?do=findComment&comment=174364).

## Requirements
1) Running Node.js on your machine
2) Working/Project directory

## Steps:
1) Run this command inside project directory:
```
npm i puppeteer easy-pdf-merge
```
This command will install modules: Puppeteer, Chromium browser and Easy PDF.

2) Download and edit [index.js](https://github.com/OLSA/admin-to-pdf/index.js) file.
Please note that you need to **edit [index.js](https://github.com/OLSA/admin-to-pdf/index.js)** file with **your login details and desired URL's.**

3) Start process:
```
node index.js
```
After a few seconds you will find PDF files in project directory (partials and 1 merged with all).

## Notes
In this case, export to PDF is only one example what can be done with Node.js and Puppeteer (headless browser). 
There are many other scenarios for what and how to use same techniques (remote login, automated processing, deep testing, etc...).
