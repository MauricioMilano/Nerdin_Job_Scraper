const { scrapeJobPostings } = require("./scrapping");
const notify = require('./notify.js')
const jsondb = require("./jsondb.js");
const { wait } = require("./utils.js");

// Example usage:
async function work() {
    // const url = 'https://www.nerdin.com.br/vagas'; // Replace with the actual URL
      const url = 'https://www.nerdin.com.br/vagas?CodigoNivel=4,3,7,6'; // Replace with the actual URL
//   const url = 'https://www.nerdin.com.br/vagas?CodigoCidade=0&UF=HO&PalavraChave=junior'; // Replace with the actual URL
  const jobPostings = await scrapeJobPostings(url);
  const vagasSP = jobPostings.filter(v=> v.local =="São Paulo-SP")
  const vagasHomeOffice = jobPostings.filter(v=> v.local =="Home Office" || v.local =="São Paulo-SP")
  const vagassjc = jobPostings.filter(v=> v.local =="São José dos Campos-SP")
  const ho_path = './vagas_home_office.json'

  const old = jsondb.readJSONFromFile(ho_path)
  if (Object.keys(old).length === 0) { 
    jsondb.saveJSONToFile(ho_path, vagasHomeOffice)
  }else{
    let vagasNovas = vagasHomeOffice.filter(vaga=> !old.find(elem=> elem.link === vaga.link))
    if (vagasNovas.length !== 0) {
      vagasNovas = vagasNovas.map(vaga=> { return {...vaga, nova: true}})
      notify.sendWindowsNotification("Veja no arquivo de vagas", "Vaga nova no Nerdin")
      jsondb.saveJSONToFile(ho_path, [...vagasNovas, ...old])
    }
  }

  if (jobPostings) {
    console.log(jobPostings);
  } else {
    console.log("No job postings found or error during scraping.");
  }
}




async function trabaia() {
    while(true) {
    
        console.log("comecei a trabaia")
        await work()
        const seconds = 1200
        await wait(1000 * seconds)
    }
    
}

trabaia()