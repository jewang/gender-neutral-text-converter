function convert(s) {
  var words = [
    ["she's", "they're"],
    ["he's", "they're"],
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
    console.log(i);
    s = ireplace(s, words[i][0], words[i][1]);
  }

  return s;
}

function ireplace(s, p, r) {
  replace_map = [[p, r]];
  replace_map.push([capitalize(p), capitalize(r)]);
  replace_map.push([p.toUpperCase(), r.toUpperCase()]);

  for (j = 0; j < replace_map.length; j++) {
    var re = new RegExp('\\b' + replace_map[j][0] + '\\b', 'g');
    s = s.replace(re, replace_map[j][1]);

    re = new RegExp('\\b' + replace_map[j][0] + '\'', 'g');
    s = s.replace(re, replace_map[j][1] + '\'');
  }
  //console.log(s);
  return s
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
