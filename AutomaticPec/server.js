const fs = require('fs');
const http = require('http')
const formidable = require('formidable');
var Nightmare = require('nightmare');
const { start } = require('repl');
const nightmare = Nightmare({
    show: true
});
exports.startServer = startServer;

//startServer();

function startServer() {


    var arrayCsv = [];
    var i = 0;
    var dataNow = takeData();
    var s = ('PEC-' + dataNow + '.csv')


    var dir = './pec';
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    } else console.log('Already existing');



    fs.readFile('./index.html', function(err, html) {
        if (err) {
            throw err;
        }

        var server = http.createServer(function(req, res) {

            res.writeHeader(200, { "Content-Type": "text/html" });
            if (req.url == '/') {
                res.write(html);
            } else if (req.url == '/fileupload') {
                var form = new formidable.IncomingForm();
                form.parse(req, function(err, fields, files) {
                    var path = files.filetoupload.path;
                    var Filecsv = fs.readFileSync(path);
                    var stringCsv = Filecsv.toString();
                    arrayCsv = stringCsv.split('\r\n');
                    var lunghezza = arrayCsv.length;
                    let stringaPagina = '<html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge">\
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">\
                            <title>Document</title>\
                            <style>\
                                h1 {color: black;}\
                                body {background-color: gainsboro;}\
                                .div-box {margin-top: 10%;\
                                    width: 500px;\
                                    height: 300px;\
                                    margin-left: 33.5%;\
                                    border: solid 2px black;\
                                    background-color: gainsboro;}\
                                .interno {\
                                    margin-top: 10%;\
                                    margin-left: 32.5%;\
                                    width: 500px;\
                                    height: 200px;}\
                                .border {\
                                    border: solid 2px black;\
                                    padding: 1px 30px 30px 30px;\
                                    background-color: whitesmoke;}\
                            </style>\
                        </head>\
                        <body>\
                            <div class="box-div">\
                                <div class="interno">\
                                    <div class="border">\
                                        <h3>Aspettare il completamento della conversione e la chiusura dell"applicativo e poi premere per il download</h3>\
                                        <a href="/' + s + '"> <input type="button" value="Vai al download"></a>\
                                    </div>\
                                </div>\
                            </div>\
                        </body>\
                        </html>'
                    fs.writeFileSync('./pec/filepec.csv', '');
                    var tempo = setInterval(() => nightmareLoop(arrayCsv, lunghezza, tempo), 8000)
                    res.write(stringaPagina);
                    res.end();

                });


            } else if (req.url == '/' + s + '') {
                var file2 = fs.readFileSync('./pec/filepec.csv', 'utf-8')
                res.writeHead(200, { 'Content-Type': 'text/csv' });
                res.write(file2);
                res.end();
                server.close();

            } else res.write('Error: 404')


        }).listen(8080);
    });

    function nightmareLoop(arrayCsv, lung, te) {
        nightmare.goto('https://www.ufficiocamerale.it/cerca-pec-azienda')
        console.log('mi sono collegato');
        nightmare.insert('#partita_iva', arrayCsv[i])
        nightmare.click('#button_calcola')
        nightmare.wait(2000);
        nightmare.evaluate(() => {
            return document.querySelector('#codice').innerText;
        })

        nightmare.then(text => {

            var stringToWrite = arrayCsv[i] + ',' + text + '\n';


            if (text == null || text == '') {
                console.log('Questa partita Iva non è presente:  ' + arrayCsv[i])
                fs.writeFileSync('./pec/filepec.csv', stringToWrite, {
                    encoding: "utf8",
                    flag: "a+",
                    mode: 0o666
                })

                console.log('salvato')
                i++;
                nightmare.refresh();


            } else {
                console.log('PEC: ' + text + ' Partita Iva:  ' + arrayCsv[i]);
                fs.writeFileSync('./pec/filepec.csv', stringToWrite, {
                    encoding: "utf8",
                    flag: "a+",
                    mode: 0o666
                })
                console.log('salvato')
                i++;

                nightmare.refresh();
            }


        })
        if (i >= lung - 1) {
            clearInterval(te);
            nightmare.end();
        }


    }


    function takeData() {
        var data = new Date();
        var gg, mesedioggi, year, Hh, Mm, Ss;
        Hh = data.getHours() + "";
        Mm = data.getMinutes() + "";
        Ss = data.getSeconds() + "";
        gg = data.getDate() + "_";
        mesedioggi = data.getMonth() + 1
        let stringamese = mesedioggi.toString()
        if (stringamese.length == 1)
            mesegiusto = '0' + stringamese
        year = data.getFullYear() + '';
        return DataPec = year + mesegiusto + gg + Hh + Mm + Ss
    }


}