let plainTextArea;
let htmlTextArea;

function init(){
    plainTextArea = document.getElementById("plain-text_list");
    htmlTextArea = document.getElementById("html_list");

    // Add default value:
    plainTextArea.value = 'List 1 item 1\nList 1 item 2\n\nList 2 item 1\nList 2 item 2';
    processPlainTextArea();

    // Add event listeners:
    plainTextArea.addEventListener("change", (e) => processPlainTextArea());
    htmlTextArea.addEventListener("change", (e) => processHTMLTextArea());
}

function updateText(element){
    const event = new Event('change');

    if (element == plainTextArea) plainTextArea.dispatchEvent(event);
    else htmlTextArea.dispatchEvent(event);
}

function processPlainTextArea(){
    console.log('plain')
    const plainText = plainTextArea.value.trim();
    if (plainText.length == 0){
        htmlTextArea.value = '';
        return;
    }
    let lists = plainText.split("\n\n");
    lists = lists.map((list) => list.split("\n"));

    let htmlText = '';

    lists.forEach(list => {
        htmlText += '<ul>';
        list.forEach(item => {
            if (item.length > 0) htmlText += '<li>' + item + '</li>';
        });
        htmlText += '</ul>\n';
    });

    htmlTextArea.value = htmlText;
}

function processHTMLTextArea(){
    console.log('html')
    const htmlText = htmlTextArea.value.trim();
    if (htmlText.length == 0){
        plainTextArea.value = '';
        return;
    }
    let lines = htmlText.split("\n");
    
    let plainText = '';

    lines.forEach(line => {
        const lineTrimmed = line.trim();
        if (!lineTrimmed.startsWith('<ul>') || !lineTrimmed.endsWith('</ul>')){
            plainText += line + '\n';
        }
        else {
            const list = lineTrimmed.replace(/<\/?ul>/g, '');
            if (!list.startsWith('<li>') || !list.endsWith('</li>')){
                plainText += line + '\n';
            }
            else {
                if (plainText.length > 0) plainText += '\n';
                const items = list.split('</li><li>');
                items.forEach(item => {
                    plainText += item.replace(/<\/?li>/g, '') + '\n';
                });
            }
        }
    });

    plainTextArea.value = plainText;
}