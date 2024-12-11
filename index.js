// index.js
const puppeteer = require('puppeteer');
const merge = require('easy-pdf-merge');

// configuration
// *** EDIT THIS:
const admin_url = "http://my_site.com/admin_url";
const user = '*****';
const pasw = '*****';

// desired pages
// *** EDIT THIS:
const pdfUrls = [
    "/page/edit/?id=1054&modal=1",
    "/page/edit/?id=1016&modal=1",
    "/page/edit/?id=1019&modal=1",
    "/setup/field/edit?id=1#inputfieldConfig",
    "/setup/field/edit?id=1&modal=1#inputfieldConfig"
];

const pdfFiles = [];

// START
async function main() {
    const browser = await puppeteer.launch({ headless: true, args: ['--start-maximized'] });
    const page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 768 });

    // login
    await page.goto(admin_url, { waitUntil: 'networkidle0' });
    await page.type('#login_name', user);
    await page.type('#login_pass', pasw);
    // login submit
    await Promise.all([
        page.click('#Inputfield_login_submit'),
        page.waitForNavigation({ waitUntil: 'networkidle0' })
    ]);

    for (let i = 0; i < pdfUrls.length; i++) {
        await page.goto(admin_url + pdfUrls[i], { waitUntil: 'networkidle0' });
        const pdfFileName = `page${i + 1}.pdf`;
        pdfFiles.push(pdfFileName);
        await page.pdf({
            path: pdfFileName,
            format: 'A4',
            printBackground: true,
            margin: { top: 0, right: 0, bottom: 0, left: 0 }
        });
    }

    await browser.close();
    await mergeMultiplePDF(pdfFiles);
};

const mergeMultiplePDF = (pdfFiles) => {
    return new Promise((resolve, reject) => {
        merge(pdfFiles, 'processwire.pdf', function (err) {
            if (err) {
                console.log(err);
                reject(err);
            }
            console.log('Success');
            resolve();
        });
    });
};

// run all this and exit
main().then(process.exit);
