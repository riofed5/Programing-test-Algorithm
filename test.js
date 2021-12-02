const strrmatch = (strr, pattern, n, m) => {
  // empty pattern can only match with empty string
  if (m === 0) {
    return n === 0;
  }

  // lookup table for storing results of subproblems
  let lookup = new Array(n + 1);
  for (let a = 0; a < lookup.length; a++) {
    lookup[a] = new Array(m + 1).fill(false);
  }

  // empty pattern can match with empty string
  lookup[0][0] = true;

  // Only '*' can match with empty string
  for (let j = 1; j < m + 1; j++) {
    if (pattern[j - 1] == "*" || pattern[j - 1] == "\\") {
      lookup[0][j] = lookup[0][j - 1];
    }
  }

  // fill the table in bottom-up fashion
  for (let i = 1; i < n + 1; i++) {
    for (let j = 1; j < m + 1; j++) {
      // Two cases if we see a '*'
      // (a) We ignore ‘*’ character and move
      // to next character in the pattern,
      // i.e., ‘*’ indicates an empty sequence.
      // (b) '*' character matches with ith
      // character in input
      if (pattern[j - 1] == "*") {
        lookup[i][j] = lookup[i][j - 1] || lookup[i - 1][j];
      }

      // Current characters are considered as
      // matching in two cases
      // (a) current character of pattern is '?'
      // (b) characters actually match
      else if (pattern[j - 1] == "?" || strr[i - 1] == pattern[j - 1]) {
        lookup[i][j] = lookup[i - 1][j - 1];
      }

      // Same as (a) in '*' case
      else if (pattern[j - 1] == "\\") {
        lookup[i][j] = lookup[i][j - 1];
      }

      // Two cases if we see a '*'
      // (a) same as '?'
      // i.e., ‘*’ indicates an empty sequence.
      // (b) same as (b) in '*'
      else if (pattern[j - 1] == "+") {
        lookup[i][j] = lookup[i - 1][j - 1] || lookup[i - 1][j];
      }

      // If character don't match
      else {
        lookup[i][j] = false;
      }
    }
  }
  return lookup[n][m];
};

// Test case

// const pattern = "a"
// const strr = "aa"

// const pattern = "*"
// const strr = "aa"

// const pattern = "?a"
// const strr = "cb"

// const pattern = "*a*b"
// const strr = "adceb"

// const pattern = "a*c?b"
// const strr = "acdcb"

// const pattern = "trust\\?-no-one";
// const strr = "trust-no-one"

// const pattern = "trust\\?-no-one";
// const strr = "trust?-no-one"

// const pattern = "trust\\?-no-one";
// const strr = "trust--no-one";

// const pattern = "a+b"
// const strr = "ab"

// const pattern = "a+b"
// const strr = "acb"

// const pattern = "a+b"
// const strr = "a-------b"

const strr = "-"
const pattern = "\\?" 

const result = strrmatch(strr, pattern, strr.length, pattern.length);
if (strrmatch(strr, pattern, strr.length, pattern.length)) {
  console.log("Matched");
} else {
  console.log("No matched");
}
