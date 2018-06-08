/**
 * Created by honoka on 18/5/16.
 */
let ResumeItem = function (text) {
  if (text) {
    const obj = JSON.parse(text)
    this.author = obj.author
    this.title = obj.title
    this.head = obj.head
    this.blogLink = obj.blogLink
    this.workExperience = obj.workExperience
    this.projectExperience = obj.projectExperience
    this.skill = obj.skill
    this.selfAssessment = obj.selfAssessment
  } else {
    this.author = ''
    this.title = ''
    this.head = null
    this.blogLink = null
    this.workExperience = null
    this.projectExperience = null
    this.skill = null
    this.selfAssessment = null
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
  
  save: function (title, head, blogLink, workExp, projectExp, skill, selfAssessment) {
    title = title || Blockchain.transaction.from
    const resumeItem = new ResumeItem()
    resumeItem.author = Blockchain.transaction.from
    resumeItem.title = title
    resumeItem.head = head
    resumeItem.blogLink = blogLink
    resumeItem.workExperience = workExp
    resumeItem.projectExperience = projectExp
    resumeItem.skill = skill
    resumeItem.selfAssessment = selfAssessment
    this.resume.put(title, resumeItem)
  },
  
  get: function (title) {
    title = title || Blockchain.transaction.from
    return this.resume.get(title)
  }
}

module.exports = NebResume
