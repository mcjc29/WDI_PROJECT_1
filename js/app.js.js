var $lines = $('.prompt p');

$lines.hide();
var lineContents = new Array();

function terminal() {
  const skip = 0;

  function typeLine(idx) {
    idx === null && (idx = 0);
    const element = $lines.eq(idx);
    const content = lineContents[idx];
    if (typeof content === 'undefined') {
      $('.skip').hide();
      return;
    }
    var charIdx = 0;

    function typeChar() {
      const rand = Math.round(Math.random() * 150) + 25;

      setTimeout(function() {
        var char = content[charIdx++];
        element.append(char);
        if(typeof char !== 'undefined')
        typeChar();
        else {
          element.append('<br/><span class="output">' + element.text().slice(9, -1) + '</span>');
          element.removeClass('active');
          typeLine(++idx);
        }
      }, skip ? 0 : rand);
    }
    content = '' + content + '';
    element.append(' ').addClass('active');
    typeChar();
  }

  $lines.each(function(i) {
    lineContents[i] = $(this).text();
    $(this).text('').show();
  });

  typeLine();
}

terminal();
