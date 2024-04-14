const getRelevance = (value, keyword) => {
  value = value.toLowerCase() // lowercase to make search not case sensitive
  keyword = keyword.toLowerCase()

  var index = value.indexOf(keyword) // index of the keyword
  var word_index = value.indexOf(' ' + keyword) // index of the keyword if it is not on the first index, but a word

  if (index == 0) // value starts with keyword (eg. for 'Dani California' -> searched 'Dan')
    return 3 // highest relevance
  else if (word_index != -1) // value doesnt start with keyword, but has the same word somewhere else (eg. 'Dani California' -> searched 'Cali')
    return 2 // medium relevance
  else if (index != -1) // value contains keyword somewhere (eg. 'Dani California' -> searched 'forn')
    return 1 // low relevance
  else
    return 0 // no matches, no relevance
}

const compareRelevance = (a, b) => {
  return b.relevance - a.relevance
}

export {
    getRelevance,
    compareRelevance
}