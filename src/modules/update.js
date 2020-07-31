import localize from '../helpers/localize.js'

function outdated (data) {
  console.warn(localize('modules.update@oudated_outdated'))
  console.warn(localize('modules.update@oudated_localInfo').replace('${data.version}', data.version).replace('${data.gitVersion}', data.gitVersion))
}

function determineIfGetUpdateIsNecessary () {
  let data = window.localStorage.getItem('instantgram')
  if (data) {
    data = JSON.parse(data)
    // compare versions cached
    if (data.version !== data.gitVersion) {
      outdated(data)
    }
    // compare date now with expiration
    if (Date.now() > data.dateExpiration) {
      return true // must have update new informations from github
    } else {
      return false // have localStorage and is on the date
    }
  } else {
    return true // dont have localStorage
  }
}

function update (v) {

  let vNumber = v.replace(/\./g, '')
  vNumber = parseInt(vNumber)

  if (determineIfGetUpdateIsNecessary()) {
    let xhr = new window.XMLHttpRequest()
    xhr.addEventListener('readystatechange', function () {
      console.info(localize('modules.update@determineIfGetUpdateIsNecessary_contacting'))

      if (this.readyState === 4) {
        let limitDate = new Date()
        // verify update each 2 days
        limitDate.setDate(limitDate.getDate() + 2)

        window.localStorage.setItem('instantgram', JSON.stringify({
          version: v,
          gitVersion: JSON.parse(this.responseText).version,
          lastVerification: Date.now(),
          dateExpiration: limitDate.valueOf()
        }))

        let gitV = JSON.parse(this.responseText).version
        gitV = gitV.replace(/\./g, '')
        gitV = parseInt(gitV)

        console.info(localize('modules.update@determineIfGetUpdateIsNecessary_updated'))

        // if git had a update, notify in console and a alert
        if (vNumber < gitV) {
          var data = JSON.parse(window.localStorage.getItem('instantgram'))
          window.alert(localize('modules.update@determineIfGetUpdateIsNecessary_@alert_found'))
          outdated(data)
        } else {
          console.info(window.localStorage.getItem('instantgram'))
        }
      }
    })

    xhr.open('GET', 'https://thinkbig-company.github.io/instantgram/package.json')
    xhr.send()
  }
}

export default update
