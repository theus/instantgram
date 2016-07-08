function outdated(data) {
  console.warn("[instantgram] is outdated. Please go to http://theus.github.io/instantgram to update")
  console.warn(`[instantgram] local version: ${data.version} | new update: ${data.gitVersion}`)
}

function determineIfGetUpdateIsNecessary() {
  let data = localStorage.getItem('instantgram')
  if (data) {
    data = JSON.parse(data)
    // compare versions cached
    if (data.version !== data.gitVersion) {
      outdated(data)
    }
    // compare date now with expiration
    if ( Date.now() > data.dateExpiration ) {
      return true // must have update new informations from github
    }else {
      return false // have localStorage and is on the date
    }

  }else{
    return true // dont have localStorage
  }
}

function update() {
  let v = "$version"
  let vNumber = v.replace(/\./g, "")
  vNumber = parseInt(vNumber)

  if ( determineIfGetUpdateIsNecessary() ) {
    let xhr = new XMLHttpRequest()
    xhr.addEventListener("readystatechange", function () {
    console.info("[instantgram] is contacting server looking for updates...")

      if (this.readyState === 4) {
        let limitDate = new Date()
        // verify update each 2 days
        limitDate.setDate(limitDate.getDate()+2)

        localStorage.setItem('instantgram', JSON.stringify({
          version: v,
          gitVersion: JSON.parse(this.responseText).version,
          lastVerification: Date.now(),
          dateExpiration: limitDate.valueOf()
        }))

        let gitV = JSON.parse(this.responseText).version
        gitV = gitV.replace(/\./g, "")
        gitV = parseInt(gitV)

        console.info("[instantgram] updated local data")

        // if git had a update, notify in console and a alert
        if (vNumber < gitV) {
          var data = JSON.parse(localStorage.getItem('instantgram'))
          alert ('[instantgram] found a update.\n please go to theus.github.io/instantgram for update')
          outdated(data)
        }else {
          console.info(localStorage.getItem('instantgram'))
        }

      }
    })

    xhr.open("GET", "https://theus.github.io/instantgram/package.json")
    xhr.send()
  }
}

export default update