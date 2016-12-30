var PRONOUNS = [
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
var IRREGULAR_VERBS = [
    ['was', 'were'],
    ['has', 'have'],
    ['is', 'are'],
    ['does', 'do'],
    ['doesn', 'don'],
    ['hasn', 'haven'],
    ['isn', 'aren'],
    ['goes', 'go'],
  ];

var VERB_ES_SUFFIXES = ['ses', 'zes', 'xes', 'ches', 'shes'];

function convert(s) {
  s = pluralize_verbs(s);
  for(i = 0; i < PRONOUNS.length; i++) {
    s = pronoun_replace(s, PRONOUNS[i][0], PRONOUNS[i][1]);
  }
  return s;
}

function pluralize_verbs(s) {
  var re = new RegExp('\\bs?he\\b\\s+(.+?)\\b', 'gi');
  var sep = ' ';
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
  for (i = 0; i < IRREGULAR_VERBS.length; i++) {
    if (verb == IRREGULAR_VERBS[i][0]) {
      return IRREGULAR_VERBS[i][1];
    }
  }
  if (verb.endsWith('ies')) {
    return verb.substring(0, verb.length - 3) + 'y';
  } 
  for (i = 0; i < VERB_ES_SUFFIXES.length; i++) {
    var suffix = VERB_ES_SUFFIXES[i];
    if (verb.endsWith(suffix)) {
      return verb.substring(0, verb.length - 2);
    }
  }
  if (verb.endsWith('s')) {
    return verb.substring(0, verb.length - 1);
  }
  return verb;
}

function pronoun_replace(s, p, r) {
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
  $('#example').click(function() {
    jQuery.get('sample.txt', function(data) {
      $("#input").val(data);
    });
  });
});
