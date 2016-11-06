function convert(s) {
  var words = [
    ['he', 'they'], 
    ['she', 'they'],
    ['him', 'them'],
    ['her', 'them'],
    ['herself', 'themself'],
    ['himself', 'themself'],
    ['his', 'their'],
    ['her', 'their'],
  ];
  original_words_length = words.length;
  for (i = 0; i < original_words_length; i++) {
    words.push([capitalize(words[i][0]), capitalize(words[i][1])])
    words.push([words[i][0].toUpperCase(), words[i][1].toUpperCase()])
  }

  for(i = 0; i < words.length; i++) {
    var r = new RegExp('\b' + words[i][0] + '\b', 'g');
    console.log(r)
    s = s.replace(r, words[i][1]);
  }
  return s;
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

$(document).ready(function() {
  var button = $('button');
  button.click(function() {
    $("#output").val(convert($('#input').val()));
  });
});
