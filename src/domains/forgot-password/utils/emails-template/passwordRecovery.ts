export function passwordRecovery(link: string) {
  return `
    <!doctype html>
    <html>
    
    <head>
      <meta name="viewport" content="width=device-width" />
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <title> </title>
      <style>
        /* -------------------------------------
              GLOBAL RESETS
          ------------------------------------- */
        img {
          border: none;
          -ms-interpolation-mode: bicubic;
          max-width: 100%;
        }
    
        body {
          background-color: #f6f6f6;
          font-family: sans-serif;
          -webkit-font-smoothing: antialiased;
          font-size: 14px;
          line-height: 1.4;
          margin: 0;
          padding: 0;
          -ms-text-size-adjust: 100%;
          -webkit-text-size-adjust: 100%;
        }
    
        table {
          border-collapse: separate;
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
          width: 100%;
        }
    
        table td {
          font-family: sans-serif;
          font-size: 14px;
          vertical-align: top;
        }
    
        /* -------------------------------------
              BODY & CONTAINER
          ------------------------------------- */
        .body {
          background-color: #f6f6f6;
          width: 100%;
        }
    
        /* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */
        .container {
          display: block;
          margin: 0 auto !important;
          /* makes it centered */
          max-width: 580px;
          padding: 10px;
          width: 580px;
        }
    
        /* This should also be a block element, so that it will fill 100% of the .container */
        .content {
          box-sizing: border-box;
          display: block;
          margin: 0 auto;
          max-width: 580px;
          padding: 10px;
        }
    
        /* -------------------------------------
              HEADER, FOOTER, MAIN
          ------------------------------------- */
        .main {
          background: #ffffff;
          border-radius: 3px;
          width: 100%;
        }
    
        .wrapper {
          box-sizing: border-box;
          padding: 20px;
        }
    
        .content-block {
          padding-bottom: 10px;
          padding-top: 10px;
        }
    
        .footer {
          clear: both;
          margin-top: 10px;
          text-align: center;
          width: 100%;
        }
    
        .footer td,
        .footer p,
        .footer span,
        .footer a {
          color: #999999;
          font-size: 12px;
          text-align: center;
        }
    
        /* -------------------------------------
              TYPOGRAPHY
          ------------------------------------- */
        h1,
        h2,
        h3,
        h4 {
          color: #000000;
          font-family: sans-serif;
          font-weight: 400;
          line-height: 1.4;
          margin: 0;
          margin-bottom: 30px;
        }
    
        h1 {
          font-size: 35px;
          font-weight: 400;
          text-align: center;
        }
    
        h4 {
          font-size: 20px;
          font-weight: 300;
          text-align: center;
        }
    
        p,
        ul,
        ol {
          font-family: sans-serif;
          font-size: 14px;
          font-weight: normal;
          margin: 0;
          margin-bottom: 15px;
        }
    
        p li,
        ul li,
        ol li {
          list-style-position: inside;
          margin-left: 5px;
        }
    
        p{text-align: center;}
    
        a {
          color: #3498db;
          text-decoration: underline;
        }
    
        /* -------------------------------------
              BUTTONS
          ------------------------------------- */
        .btn {
          box-sizing: border-box;
          width: 100%;
        }
    
        .btn>tbody>tr>td {
          padding-bottom: 15px;
        }
    
        .btn table {
          width: auto;
        }
    
        .btn table td {
          background-color: #ffffff;
          border-radius: 5px;
          text-align: center;
        }
    
        .btn a {
          background-color: #ffffff;
          border: solid 1px #3498db;
          border-radius: 5px;
          box-sizing: border-box;
          color: #3498db;
          cursor: pointer;
          display: inline-block;
          font-size: 14px;
          font-weight: bold;
          margin: 0;
          padding: 12px 25px;
          text-decoration: none;
        }
    
        .btn-primary table td {
          background-color: #3498db;
        }
    
        .btn-primary a {
          background-color: #3498db;
          border-color: #3498db;
          color: #ffffff;
        }
    
        .bt-link{
          padding: 12px 25px 12px 25px;
          border-radius: 3px;
          font-size: 20px;
          border-radius: 5px;
          border-bottom: 5px solid #025937;
          line-height: normal;
          background-color: #025937;
        }
    
        /* -------------------------------------
              OTHER STYLES THAT MIGHT BE USEFUL
          ------------------------------------- */
        .last {
          margin-bottom: 0;
        }
    
        .first {
          margin-top: 0;
        }
    
        .align-center {
          text-align: center;
        }
    
        .align-right {
          text-align: right;
        }
    
        .align-left {
          text-align: left;
        }
    
        .clear {
          clear: both;
        }
    
        .mt0 {
          margin-top: 0;
        }
    
        .mb0 {
          margin-bottom: 0;
        }
    
        .mb40 {
          margin-bottom: 40px;
        }
    
        .preheader {
          color: transparent;
          display: none;
          height: 0;
          max-height: 0;
          max-width: 0;
          opacity: 0;
          overflow: hidden;
          mso-hide: all;
          visibility: hidden;
          width: 0;
        }
    
        .logo {
          text-align: center;
          margin-bottom: 30px;
        }
    
        .powered-by {
          font-size: 9px !important;
        }
    
        .powered-by a {
          text-decoration: none;
          font-size: 9px;
        }
    
        hr {
          border: 0;
          border-bottom: 1px solid #f6f6f6;
          margin: 20px 0;
        }
    
        .word-break {
          -ms-word-break: break-all;
          word-break: break-all;
          word-break: break-word;
        }
    
        .img-header{
          margin: 2rem 0 1rem ;
        }
    
        /* -------------------------------------
              RESPONSIVE AND MOBILE FRIENDLY STYLES
          ------------------------------------- */
        @media only screen and (max-width: 620px) {
          table[class=body] h1 {
            font-size: 28px !important;
            margin-bottom: 10px !important;
          }
    
          table[class=body] p,
          table[class=body] ul,
          table[class=body] ol,
          table[class=body] td,
          table[class=body] span,
          table[class=body] a {
            font-size: 16px !important;
          }
    
          table[class=body] .wrapper,
          table[class=body] .article {
            padding: 10px !important;
          }
    
          table[class=body] .content {
            padding: 0 !important;
          }
    
          table[class=body] .container {
            padding: 0 !important;
            width: 100% !important;
          }
    
          table[class=body] .main {
            border-left-width: 0 !important;
            border-radius: 0 !important;
            border-right-width: 0 !important;
          }
    
          table[class=body] .btn table {
            width: 100% !important;
          }
    
          table[class=body] .btn a {
            width: 100% !important;
          }
    
          table[class=body] .img-responsive {
            height: auto !important;
            max-width: 100% !important;
            width: auto !important;
          }
        }
    
        /* -------------------------------------
              PRESERVE THESE STYLES IN THE HEAD
          ------------------------------------- */
        @media all {
          .ExternalClass {
            width: 100%;
          }
    
          .apple-link a {
            color: inherit !important;
            font-family: inherit !important;
            font-size: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
            text-decoration: none !important;
          }
    
          #MessageViewBody a {
            color: inherit;
            text-decoration: none;
            font-size: inherit;
            font-family: inherit;
            font-weight: inherit;
            line-height: inherit;
          }
    
          .btn-primary table td:hover {
            background-color: #34495e !important;
          }
    
          .btn-primary a:hover {
            background-color: #34495e !important;
            border-color: #34495e !important;
          }
        }
      </style>
    </head>
    
    <body class="">
      <!-- <span class="preheader">SGPS</span> -->
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body">
        <tr>
          <td>&nbsp;</td>
          <td class="container">
            <div class="content">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td class="align-center">
                    <!-- <img src=<> width="200" height="32" alt="SGPS" data-imagetype="External" class="img-header"/> -->
                  </td>
                </tr>
              </table>
            </div>
          </td>
          <td class="container">
            <div class="content">
              <!-- START CENTERED WHITE CONTAINER -->
              <table role="presentation" class="main">
                <!-- START MAIN CONTENT AREA -->
                <tr>
                  <td class="wrapper">
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td>
                          <h1>Recuperação de conta<h1>
                          <h4>Clique em <b>"Recuperar conta"</b> para iniciar o processo de recuperação da sua conta SAlog.</h4>
                          <p class="mb40">
                            <a class="bt-link" href=${link} target="_blank" rel="noopener noreferrer" style="display:inline-block; color:#ffffff; text-decoration:none" data-linkindex="5"><span style="color:#ffffff; font-weight:bold">Recuperar conta</span></a>
                          </p>
                          <p>Caso não tenha requisitado a recuperação de conta, desconsidere este email.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
    
                <!-- END MAIN CONTENT AREA -->
              </table>
              <!-- END CENTERED WHITE CONTAINER -->
    
              <!-- START FOOTER -->
              <div class="footer">
                <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                  <tr>
                    <td class="content-block">
                      <span class="apple-link"><b>Equipe SAlog</b></span>.
                    </td>
                  </tr>
                </table>
              </div>
              <!-- END FOOTER -->
    
            </div>
          </td>
          <td>&nbsp;</td>
        </tr>
      </table>
    </body>
    
    </html>
  
  `
}
