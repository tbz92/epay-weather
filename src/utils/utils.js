const getRelevance = (value, keyword) => {
  value = value.toLowerCase()
  keyword = keyword.toLowerCase()

  var index = value.indexOf(keyword)
  var word_index = value.indexOf(' ' + keyword)

  if (index == 0)
    return 3
  else if (word_index != -1)
    return 2
  else if (index != -1)
    return 1
  else
    return 0
}

const compareRelevance = (a, b) => {
  return b.relevance - a.relevance
}

export {
    getRelevance,
    compareRelevance
}