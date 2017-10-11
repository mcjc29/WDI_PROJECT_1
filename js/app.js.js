var $lines = $('.prompt');

$lines.hide();
var lineContents = new Array();

function terminal() {
  const skip = 0;

  function typeLine(index) {
    index === null && (index = 0);
    const element = $lines.eq(index);
    //.eqinteger 0 element
    let content = lineContents[index];
    if (typeof content === 'undefined') {
      $('.skip').hide();
      return;
    }
    let characterindex = 0;

    function typeCharacter() {
      const rand = Math.round(Math.random() * 150) + 25;

      setTimeout(function() {
        const character = content[characterindex++];
        element.append(character);
        if(typeof character !== 'undefined')
          typeCharacter();
        else {
          element.append('<br/><span class="output">' + element.text().slice(9, -1) + '</span>');
          element.removeClass('active');
          typeLine(++index);
        }
      }, skip ? 0 : rand);
    }
    content = '' + content + '';
    element.append(' ').addClass('active');
    typeCharacter();
  }

  $lines.each(function(i) {
    lineContents[i] = $(this).text();
    $(this).text('').show();
  });

  typeLine();
}

terminal();
