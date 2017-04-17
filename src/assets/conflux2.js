/*
* This is free and unencumbered software released into the public domain.
*
* Anyone is free to copy, modify, publish, use, compile, sell, or
* distribute this software, either in source code form or as a compiled
* binary, for any purpose, commercial or non-commercial, and by any
* means.
*
* In jurisdictions that recognize copyright laws, the author or authors
* of this software dedicate any and all copyright interest in the
* software to the public domain. We make this dedication for the benefit
* of the public at large and to the detriment of our heirs and
* successors. We intend this dedication to be an overt act of
* relinquishment in perpetuity of all present and future rights to this
* software under copyright law.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
* MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
* IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
* OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
* ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*
* For more information, please refer to <http://unlicense.org/>
*/


function Confluxor() {
  this.version = "1.1"
  this.wordList = []
  this.initials = []
  this.pairs = []
  this.generated = []
}

function ConfluxorPair(letters, successor) {
  this.letters = letters
  this.successor = [successor]
}

ConfluxorPair.prototype.addSuccessor = function addSuccessor(successor) {
  if (this.successor.indexOf(successor) === -1) {
    this.successor.push(successor)
  }
}

ConfluxorPair.prototype.toString = function toString() {
  return `{${this.letters}:${this.successor.join(",")}}`
}

Confluxor.prototype.getInitial = function getInitial(str) {
  let i
  if (!str || typeof str !== "string") {
    return null
  }
  for (i = 0; i < this.initials.length; i++) {
    if (this.initials[i].letters.toLowerCase() === str.toLowerCase()) {
      return this.initials[i]
    }
  }
  return null
}

Confluxor.prototype.getPair = function getPair(str) {
  let i
  if (!str || typeof str !== "string") {
    return null
  }
  for (i = 0; i < this.pairs.length; i++) {
    if (this.pairs[i].letters.toLowerCase() === str.toLowerCase()) {
      return this.pairs[i]
    }
  }
  return null
}

Confluxor.prototype.prettyPrintPairs = function prettyPrintPairs() {
  const output = []
  for (let i = 0; i < this.pairs.length; i++) {
    output.push(this.pairs[i].toString())
  }
  return output.join(",")
}

Confluxor.prototype.prettyPrintInitials = function prettyPrintInitials() {
  const output = []
  for (let i = 0; i < this.initials.length; i++) {
    output.push(this.initials[i].toString())
  }
  return output.join(",")
}

Confluxor.prototype.prettyPrintGeneratedWords = function prettyPrintGeneratedWords(separator) {
  return this.generated.join((separator && typeof separator === "string") ? separator : "\n")
}

Confluxor.prototype.parse = function parse(data, separator) {
  let bit

  this.wordList = data.split(separator)
  for (let i = 0; i < this.wordList.length; i++) {
    const word = `${(this.wordList[i]).trim()} `
    for (let j = 0; j < word.length - 2; j++) {
      if (j === 0 && word.length > 2) {
        bit = this.getInitial(word.substr(0, 2))
        if (bit !== null) {
          bit.addSuccessor(word.substr(2, 1))
        }
        else {
          this.initials.push(new ConfluxorPair(word.substr(0, 2), word.substr(2, 1)))
        }
      }
      else {
        bit = this.getPair(word.substr(j, 2))
        if (bit !== null) {
          bit.addSuccessor(word.substr(j + 2, 1))
        }
        else {
          this.pairs.push(new ConfluxorPair(word.substr(j, 2), word.substr(j + 2, 1)))
        }
      }
    }
  }
}

Confluxor.prototype.generate = function generate(numberArg, minLengthArg, maxLengthArg, separatorArg) {
  function choose(array) {
    return array[Math.floor(Math.random() * array.length)]
  }

  const number = (numberArg && typeof numberArg === "number") ? numberArg : 10
  const minLength = (minLengthArg && typeof minLengthArg === "number") ? minLengthArg : 4
  let maxLength = (maxLengthArg && typeof maxLengthArg === "number") ? maxLengthArg : 12
  const separator = (separatorArg && typeof separatorArg === "string") ? separatorArg : "\n" // eslint-disable-line
  if (maxLength <= minLength) {
    maxLength = minLength + 1
  }
  const newWords = []
  while (newWords.length < number) {
    const bit = choose(this.initials)
    let word = bit.letters + choose(bit.successor)
    while (word.indexOf(" ") < 0) {
      word += choose(this.getPair(word.substr(word.length - 2, 2)).successor)
    }
    if (word.length > minLength && word.length <= maxLength + 1) {
      newWords.push(word)
    }
  }
  this.generated = newWords
  return newWords
}

export {
  Confluxor,
  ConfluxorPair,
}
