var PRONOUNS = [
  ["she's", "they're"],
  ["he's", "they're"],
  ['he', 'they'], 
  ['she', 'they'],
  ['him', 'them'],
  ['hers', 'theirs'],
  ['her', 'them'],
  ['herself', 'themselves'],
  ['himself', 'themselves'],
  ['his', 'their'],
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
var FORMAT_TAG_OPEN = '<span class="changetext">'
var FORMAT_TAG_CLOSE = "</span>"

var VERB_ES_SUFFIXES = ['ses', 'zes', 'xes', 'ches', 'shes'];

function convert(s) {
  s = pluralize_verbs(s);
  for(i = 0; i < PRONOUNS.length; i++) {
    s = pronoun_replace(s, PRONOUNS[i][0], PRONOUNS[i][1]);
  }
  s = highlight_gendered(s);
  return s;
}

function highlight_gendered(s) {
  var regexstr = '';
  // TODO: Make accents work
  var others = ['girl[a-z]*', 
      'boy[a-z]*', 'female[a-z]*', 'male', 
      'fianc(e|&eacute;|é)e?', 'husband', 
      'wife', 'wive', 'actor', '[a-z]*ess(es)?', '[a-z]*ster', 'ms', 
      'mr', 'miss(es)?', 'mister', 'madam', 'maiden', 'lad', 
      'lass(es)?', 'latin(o|a)', '[a-z]*ette', 'comedienne', '(lady|ladies)', 'femme', 
      'feminine', 'masculine', 'masseuse', 'ghc', 'anita([a-z]| )*borg', 'grace([a-z]| )*hopper', 
      'ghc', 'ncwit', 'ada', 'lovelace'];
  for (i = 0; i<others.length; i++) {
    regexstr += '\\b' + others[i] + 's?\\b|';
  }
  regexstr += '\\b[a-z]*m(a|e)ns?\\b';
  var re = new RegExp(regexstr, 'gi');
  var sep = ' ';
  while((match = re.exec(s)) != null) {
    replace = '<span class="highlighttext">' + match[0] + '</span>';
    s = s.substring(0, match.index) + replace + s.substring(re.lastIndex, s.length);
    re.lastIndex += replace.length - match[0].length;
  }
  return s;
}

function pluralize_verbs(s) {
  var re = new RegExp('\\bs?he\\b\\s+(.+?)\\b', 'gi');
  var sep = /\b/gi;
  while((match = re.exec(s)) != null) {
    split = match[0].split(sep);
    replace = split[0] + split[1] + pluralize_verb(split[2]);
    s = s.replace(match[0], replace);
  }
  return s;
}

function pluralize_verb(verb) {
  var uppercase = verb === verb.toUpperCase();
  var new_verb = pluralize_lowercase_verb(verb.toLowerCase());
  if (uppercase) {
    new_verb = new_verb.toUpperCase();
  }
  if (verb != new_verb) {
    new_verb = FORMAT_TAG_OPEN + new_verb + FORMAT_TAG_CLOSE;
  }
  return new_verb;
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
    if (p == 'her') {
      replace_map[j][1] = '<span class="her">' + replace_map[j][1] + '</span>';
    } else {
      replace_map[j][1] = FORMAT_TAG_OPEN + replace_map[j][1] + FORMAT_TAG_CLOSE;
    }
  }

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
    $("#output").html(convert($('#input').val()));
  });
  $('#example').click(function() {
    jQuery.get('sample.txt', function(data) {
      $("#input").val(data);
    });
  });
});
