const puppeteer = require('puppeteer');
const { exec } = require('child_process');
async function takePDFOfHTML(htmlContent, outputPath) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Set the HTML content in the page
    await page.setContent(htmlContent);
    
  // Get the height of the rendered HTML
  const bodyHandle = await page.$('body');
  const { height,width } = await bodyHandle.boundingBox();
  await bodyHandle.dispose();
    // Adjust the viewport to your desired size
    await page.setViewport({ width: Math.ceil(width), height: Math.ceil(height) });

    // Take a screenshot of the HTML page
    // await page.screenshot({ path: outputPath });

    // await browser.close();
    await page.pdf({
      path: outputPath,
      format: 'A4', // Page format
      printBackground: true // To include background color and images
    });
  
    await browser.close();
}
// Create an HTML template with inline CSS

  
const products = [
    {
      name: "product 1",
      price: 300,
      quantaity: 1,
    },
    {
      name: "product 2",
      price: 300,
      quantaity: 1,
    },
    {
      name: "product 3",
      price: 300,
      quantaity: 1,
    },
    {
      name: "product 4",
      price: 300,
      quantaity: 1,
    },
    {
      name: "product 5",
      price: 300,
      quantaity: 1,
    },
    {
      name: "product 6",
      price: 300,
      quantaity: 1,
    },
    {
      name: "product 7",
      price: 300,
      quantaity: 1,
    },
    {
      name: "product 8",
      price: 300,
      quantaity: 1,
    },
    {
      name: "product 9",
      price: 300,
      quantaity: 1,
    },
    {
      name: "product 10",
      price: 300,
      quantaity: 1,
    },
  ];
  
  const productRows = products
  .map(
    (product) => `
    
<div class="u-row-container" style="padding: 0px 10px;background-color: rgba(255,255,255,0)">
<div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
  <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
<!-- ..........................................Product Name & Quantity.......................................... -->
<div class="u-col u-col-66p67" style="max-width: 320px;min-width: 400px;display: table-cell;vertical-align: top;">
<div style="height: 100%;width: 100% !important;">
<!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->

<table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
<tbody>
  <tr>
    <td style="overflow-wrap:break-word;word-break:break-word;padding:28px 20px 20px;font-family:'Lato',sans-serif;" align="left">
      
<div style="font-size: 14px; color: #333333; line-height: 140%; text-align: left; word-wrap: break-word;">
  <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 12px; line-height: 20px;">${product.name}</span></p>
<p style="font-size: 14px; line-height: 140%;"><span style="font-size: 12px; line-height: 20px; color: #17c297;">Quantity : ${product.quantaity} x $${product.price}</span></p>
</div>

    </td>
  </tr>
</tbody>
</table>

<!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
</div>
</div>
<!-- ..................................................................................................... -->

<!-- ....................................Total Price of one product type................................ -->
<div class="u-col u-col-33p33" style="max-width: 320px;min-width: 200px;display: table-cell;vertical-align: top;">
<div style="height: 100%;width: 100% !important;">
<!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->

<table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
<tbody>
  <tr>
    <td style="overflow-wrap:break-word;word-break:break-word;padding:40px 20px 20px;font-family:'Lato',sans-serif;" align="left">
      
<div style="font-size: 14px; color: #333333; line-height: 120%; text-align: left; word-wrap: break-word;">
  <p style="font-size: 14px; line-height: 120%;"><span style="font-size: 14px; line-height: 20px;"><strong><span style="line-height: 20px; font-size: 14px;">$${product.quantaity * product.price}</span></strong></span></p>
</div>

    </td>
  </tr>
</tbody>
</table>

<!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
</div>
</div>
<!-- ..................................................................................................... -->
  </div>
</div>
</div>

    
`
  )
  .join("");
const totalPrice = products.reduce((acc, product) => acc + product.price * product.quantaity, 0);
const emailTemplate = `
<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title></title>
  
    <style type="text/css">
      @media only screen and (min-width: 620px) {
  .u-row {
    width: 600px !important;
  }
  .u-row .u-col {
    vertical-align: top;
  }

  .u-row .u-col-33p33 {
    width: 199.98px !important;
  }

  .u-row .u-col-50 {
    width: 300px !important;
  }

  .u-row .u-col-66p67 {
    width: 400.02px !important;
  }

  .u-row .u-col-100 {
    width: 600px !important;
  }

}

@media (max-width: 620px) {
  .u-row-container {
    max-width: 100% !important;
    padding-left: 0px !important;
    padding-right: 0px !important;
  }
  .u-row .u-col {
    min-width: 320px !important;
    max-width: 100% !important;
    display: block !important;
  }
  .u-row {
    width: 100% !important;
  }
  .u-col {
    width: 100% !important;
  }
  .u-col > div {
    margin: 0 auto;
  }
}
body {
  margin: 0;
  padding: 0;
}

table,
tr,
td {
  vertical-align: top;
  border-collapse: collapse;
}

p {
  margin: 0;
}

.ie-container table,
.mso-container table {
  table-layout: fixed;
}

* {
  line-height: inherit;
}

a[x-apple-data-detectors='true'] {
  color: inherit !important;
  text-decoration: none !important;
}

table, td { color: #000000; } </style>
  
  

<link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700&display=swap" rel="stylesheet" type="text/css"><link href="https://fonts.googleapis.com/css?family=Lato:400,700&display=swap" rel="stylesheet" type="text/css"><!--<![endif]-->

</head>
 

<body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #707070;color: #000000">
  <table style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #707070;width:100%" cellpadding="0" cellspacing="0">
  <tbody>
  <tr style="vertical-align: top">
    <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">

  
<!-- ..........................................logo............................................................ -->
<div class="u-row-container" style="padding: 29px 10px 0px;background-color: rgba(255,255,255,0);">
  <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #17c297;">
    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
      
      

<div class="u-col u-col-33p33" style="max-width: 320px;min-width: 200px;display: table-cell;vertical-align: top;">
  <div style="height: 200px;width: 100% !important;">
  <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
  
<table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:20px;font-family:'Lato',sans-serif;" align="left">
        
<table width="100%" cellpadding="0" cellspacing="0" border="0">
  <tr>
    <td style="padding-right: 0px;padding-left: 0px;" align="center">
      
      <img align="center" border="0" src="images/logo.png" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 160px;" width="160"/>
      
    </td>
  </tr>
</table>

      </td>
    </tr>
  </tbody>
</table>
</div>
  </div>
</div>

    </div>
  </div>
  </div>
<!-- ....................... ................................................................................-->
  
<!-- ..................................Shipping Address And invoice Number .................................. -->
<div class="u-row-container" style="padding: 0px 10px;background-color: rgba(255,255,255,0)">
  <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #f5f5f5;">
    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
      
      
<!-- ......................................Shipping Address.......................................................... -->
<div class="u-col u-col-50" style="max-width: 320px;min-width: 300px;display: table-cell;vertical-align: top;">
  <div style="height: 160px;width: 100% !important;">
  <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
  
<table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:35px 20px 10px;font-family:'Lato',sans-serif;" align="left">
        
  <div style="font-size: 14px; line-height: 120%; text-align: left; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 120%;"><span style="font-size: 24px; line-height: 28.8px; color: #18c197;"><strong>Shipping Address</strong></span></p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

<table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px 20px 30px;font-family:'Lato',sans-serif;" align="left">
        
  <div style="font-size: 14px; color: #757575; line-height: 160%; text-align: left; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 160%;"><span style="font-size: 14px; line-height: 22.4px;">Mr Lorem Omeos</span></p>
<p style="font-size: 14px; line-height: 160%;"><span style="font-size: 14px; line-height: 22.4px;">Street XYZ, Iste&nbsp;Town</span></p>
<p style="font-size: 14px; line-height: 160%;"><span style="font-size: 14px; line-height: 22.4px;">LZ123 London, UK</span></p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

  </div>
  </div>
</div>
<!-- ........................................................................................................... -->
<!-- ........................................invoice Number..................................................... -->
<div class="u-col u-col-50" style="max-width: 320px;min-width: 300px;display: table-cell;vertical-align: top;">
  <div style="height: 160px;width: 100% !important;">
  <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
  
<table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:35px 20px 10px;font-family:'Lato',sans-serif;" align="left">
        
  <div style="font-size: 14px; color: #333333; line-height: 120%; text-align: left; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 120%;"><strong><span style="font-size: 24px; line-height: 28.8px;">Invoice Number</span></strong></p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

<table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px 20px 30px;font-family:'Lato',sans-serif;" align="left">
        
  <div style="font-size: 14px; color: #333333; line-height: 120%; text-align: left; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 120%;"><span style="font-size: 20px; line-height: 24px;"><strong>#9878748</strong></span></p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

  </div>
  </div>
</div>
<!-- .............................................................................................................. -->
    </div>
  </div>
  </div>
<!-- ............................................................................................... -->
  
  <!--..................................... ...Purchesed Items....................................... -->
<div class="u-row-container" style="padding: 0px 10px;background-color: rgba(255,255,255,0)">
  <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
      <!-- .....................................the DIV Item.............................................. -->
<div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  <div style="height: 100%;width: 100% !important;">
  <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
  
<table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:30px 20px 20px;font-family:'Lato',sans-serif;" align="left">
        
  <div style="font-size: 14px; color: #333333; line-height: 120%; text-align: left; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 120%;"><strong><span style="font-size: 24px; line-height: 28.8px;">Purchesed Items</span></strong></p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

<table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:0px;font-family:'Lato',sans-serif;" align="left">
        
  <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #e3e3e3;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
    <tbody>
      <tr style="vertical-align: top">
        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
          <span>&#160;</span>
        </td>
      </tr>
    </tbody>
  </table>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
      <!-- ................................................................................. -->
    </div>
  </div>
  </div>  
  <!-- ................................................................................................ -->

<!-- ...........................................each row................................................... -->

${productRows}

<!-- ........................................................................................................... -->

   
<!--........................ write line to seprate between product and total Price..................................   -->
<div class="u-row-container" style="padding: 0px 10px;background-color: rgba(255,255,255,0)">
  <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
      
      

<div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  <div style="height: 100%;width: 100% !important;">
 <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
  
<table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:0px;font-family:'Lato',sans-serif;" align="left">
        
  <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #e3e3e3;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
    <tbody>
      <tr style="vertical-align: top">
        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
          <span>&#160;</span>
        </td>
      </tr>
    </tbody>
  </table>

      </td>
    </tr>
  </tbody>
</table>

 </div>
  </div>
</div>

    </div>
  </div>
  </div>
  <!-- .................................................................................. -->


  

  <!-- ..........................make another line to make it  more bold.............................. -->
<div class="u-row-container" style="padding: 0px 10px;background-color: rgba(255,255,255,0)">
  <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
      

<div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  <div style="height: 100%;width: 100% !important;">
  <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
  
<table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:0px;font-family:'Lato',sans-serif;" align="left">
        
  <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #e3e3e3;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
    <tbody>
      <tr style="vertical-align: top">
        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
          <span>&#160;</span>
        </td>
      </tr>
    </tbody>
  </table>

      </td>
    </tr>
  </tbody>
</table>

</div>
  </div>
</div>

    </div>
  </div>
  </div>
<!-- ........................................................................................................... -->

  <!--.................................................Total Price ........................................................... -->
  
<div class="u-row-container" style="padding: 0px 10px;background-color: rgba(255,255,255,0)">
  <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
      
      <!--....................................... the Total Price lable ................................. -->
<div class="u-col u-col-66p67" style="max-width: 320px;min-width: 400px;display: table-cell;vertical-align: top;">
  <div style="height: 100%;width: 100% !important;">
<div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
  
<table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:28px 20px 25px;font-family:'Lato',sans-serif;" align="left">
        
  <div style="font-size: 14px; color: #333333; line-height: 140%; text-align: left; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 14px; line-height: 20.6px;"><strong><span style="line-height: 26px; font-size: 20px;">Grand Total</span></strong></span></p>
<p style="font-size: 14px; line-height: 140%;"><span style="font-size: 16px; line-height: 23px; color: #17c297;">+ GST $50 </span></p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

 </div>
  </div>
</div>
<!-- ...................................................................................................... -->

<!--................................................. Total Price value ................................... -->
<div class="u-col u-col-33p33" style="max-width: 320px;min-width: 200px;display: table-cell;vertical-align: top;">
  <div style="height: 100%;width: 100% !important;">
  <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
  
<table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:35px 20px 20px;font-family:'Lato',sans-serif;" align="left">
        
  <div style="font-size: 14px; color: #333333; line-height: 120%; text-align: left; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 120%;"><strong><span style="font-size: 20px; line-height: 26px;">$${totalPrice}</span></strong></p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

  </div>
</div>

    </div>
<!-- ............................................................................................................. -->

  </div>
  </div>
  </div>
  <!-- .......................................................................................................... -->


  
  
  <!-- ........................................Footer .............................................-->
  
<div class="u-row-container" style="padding: 0px 10px 20px;background-color: rgba(255,255,255,0)">
  <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #17c297;">
    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
      <!-- ...........................Item in footer............................................ -->
<div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  <div style="height: 100%;width: 100% !important;">
 <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
  
<table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:30px 20px;font-family:'Lato',sans-serif;" align="left">
        
  <div style="font-size: 14px; color: #ffffff; line-height: 140%; text-align: center; word-wrap: break-word;">

<p >&nbsp;<a href="http://sarri.sa/" style="text-decoration: none;">
<span style="font-size: 16px; line-height: 24px;font-family:'Lato',sans-serif; color: #ffffff;">Sarri Tech</span></a></p>
</a></p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

  </div>
</div>

    </div>
<!-- ............................................................................................ -->
  </div>
  </div>
</div>
<!-- .............................................................................................. -->

  



  </td>
  </tr>
  </tbody>
  </table>

</body>

</html>

`;
  // const outputFilePath = 'screenshot.png'; // Replace with your desired file path

  // takeScreenshotOfHTML(emailTemplate, outputFilePath)
  //   .then(() => {
  //     console.log(`Screenshot saved to ${outputFilePath}`);
  //   })
  //   .catch(error => {
  //     console.error('Error:', error);
  //   });

  // Take a PDF of the HTML page
 


 const outputFilePath = 'invoice.pdf'; // Replace with your desired file path

// //const emailTemplate = `<html><body>Your HTML content goes here</body></html>`; // Replace with your HTML content

takePDFOfHTML(emailTemplate, outputFilePath)
  .then(() => {
    console.log(`PDF saved to ${outputFilePath}`);
  })
  .catch(error => {
    console.error('Error:', error);
  });

// Replace 'input_image.jpg' and 'output_image.pdf' with the actual filenames
// const command = 'convert screenshot.jpg invoice.pdf';

// exec(command, (error, stdout, stderr) => {
//   if (error) {
//     console.error(`Error: ${error.message}`);
//     return;
//   }
//   if (stderr) {
//     console.error(`stderr: ${stderr}`);
//     return;
//   }
//   console.log(`Image converted to PDF: output_image.pdf`);
// });
