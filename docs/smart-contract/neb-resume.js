/**
 * Created by honoka on 18/5/16.
 */
let ResumeItem = function (text) {
  if (text) {
    const obj = JSON.parse(text)
    this.author = obj.author
    this.title = obj.title
    this.resumeUrl = obj.resumeUrl
  } else {
    this.author = ''
    this.title = ''
    this.resumeUrl = ''
  }
}

ResumeItem.prototype = {
  toString: function () {
    return JSON.stringify(this)
  }
}

let NebResume = function () {
  LocalContractStorage.defineMapProperty(this, 'resume', {
    parse: function (text) {
      return new ResumeItem(text);
    },
    stringify: function (o) {
      return o.toString();
    }
  })
}

NebResume.prototype = {
  init: function () {
  
  },
  
  save: function (title, resumeUrl) {
    if (!title || !resumeUrl) {
      throw new Error('empty title or resume')
    }
    const from = Blockchain.transaction.from
    // 如有相同直接覆盖
    resumeItem = new ResumeItem()
    resumeItem.author = from
    resumeItem.title = title
    resumeItem.resumeUrl = resumeUrl
    this.resume.put(title, resumeItem)
  },
  
  get: function (title) {
    if (!title) {
      throw new Error('empty title')
    }
    return this.resume.get(title)
  }
}

module.exports = NebResume
