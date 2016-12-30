function convert(s) {
  var words = [
    ["she's", "they're"],
    ["he's", "they're"],
    ['he', 'they'], 
    ['she', 'they'],
    ['him', 'them'],
    ['her', 'them'],
    ['herself', 'themselves'],
    ['himself', 'themselves'],
    ['his', 'their'],
    ['her', 'their'],
  ];

// irregular
 // was -> were
 // has -> have
 // is -> are
 // does -> do
 // goes -> go
 
 // ies -> y
 // flies -> fly
 
 // drop es:
 // ses -> s
 // zes -> z
 // xes -> x
 // ches -> ches
 // shes -> shes

 // drop s

  s = pluralize_verbs(s);
  for(i = 0; i < words.length; i++) {
    s = ireplace(s, words[i][0], words[i][1]);
  }

  return s;
}

function pluralize_verbs(s) {
  var re = new RegExp('\\bs?he\\b\\s+(.+?)\\b', 'gi');
  var sep = ' ';
  console.log('hi');
  while((match = re.exec(s)) != null) {
    split = match[0].split(sep);
    replace = split[0] + sep + pluralize_verb(split[1]);
    s = s.replace(match[0], replace);
  }
  return s;
}

function pluralize_verb(verb) {
  var uppercase = verb === verb.toUpperCase();
  verb = pluralize_lowercase_verb(verb.toLowerCase());
  if (uppercase) {
    return verb.toUpperCase();
  }
  return verb;
}

function pluralize_lowercase_verb(verb) {
  var drop_es = ['s', 'z', 'x', 'ch', 'sh'];
  var replaces = [
      ['was', 'were'],
      ['has', 'have'],
      ['is', 'are'],
      ['does', 'do'],
      ['doesn', 'don'],
      ['hasn', 'haven'],
      ['isn', 'aren'],
      ['goes', 'go'],
    ];
  for (i = 0; i < replaces.length; i++) {
    if (verb == replaces[i][0]) {
      return replaces[i][1];
    }
  }
  if (verb.endsWith('ies')) {
    return verb.substring(0, verb.length - 3) + 'y';
  } 
  for (i = 0; i < drop_es.length; i++) {
    var suffix = drop_es[i];
    if (verb.endsWith(suffix + 'es')) {
      return verb.substring(0, verb.length - 2);
    }
  }
  if (verb.endsWith('s')) {
    return verb.substring(0, verb.length - 1);
  }
  return verb;
}

function ireplace(s, p, r) {
  replace_map = [[p, r]];
  replace_map.push([capitalize(p), capitalize(r)]);
  replace_map.push([p.toUpperCase(), r.toUpperCase()]);

  for (j = 0; j < replace_map.length; j++) {
    var re = new RegExp('\\b' + replace_map[j][0] + '\\b', 'g');
    s = s.replace(re, replace_map[j][1]);


  }
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
