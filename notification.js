const md5File = require('md5-file')
const axios = require('axios');
const path = require('path');
const argv = require('minimist')(process.argv.slice(2));
const fs = require("fs");
const appDirectory = fs.realpathSync(process.cwd());

const previewPath = path.resolve(appDirectory, './preview.jpg');

function sendQrCode (imageBase64, hash) {
  return axios({
    headers: { "Content-Type": 'application/json' },
    method: 'post',
    url: argv.u,
    data: {
      "msgtype": "image",
      "image": {
        "base64": imageBase64,
        "md5": hash
      }
    }
  });
}

(async () => {
  try {
    const imageData = fs.readFileSync(previewPath);
    const hash = md5File.sync(previewPath)
    const imageBase64 = imageData.toString("base64");
    await sendQrCode(imageBase64, hash);

  } catch(e) {
    console.error(e);
    process.exit(1);
  }
})()
