
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

  for(i = 0; i < words.length; i++) {
    var r = new RegExp(/\bwords[i][0]\b/, 'g');
    console.log(r)
    s = s.replace(r, words[i][1]);
  }
  return s;
}

$(document).ready(function() {
  var button = $('button');
  button.click(function() {
    $("#output").val(convert($('#input').val()));
  });
});
