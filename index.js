import { inquirerMenu, listPlaces, pause, readInput } from './helpers/inquirer.js'
import Searches from './models/searches.js'

const main = async () => {
  let opt
  const searches = new Searches()

  do {
    opt = await inquirerMenu()

    switch (opt) {
      case 1: {
        // Show Message
        const termino = await readInput('Ciudad: ')

        // Search for places
        const places = await searches.city(termino)

        // Select places
        const id = await listPlaces(places)
        if (id === '0') continue

        const selPlace = places.find(l => l.id === id)

        // Save Db
        searches.addHistory(selPlace.name)

        // Weather
        const weather = await searches.cityWeather(selPlace.lat, selPlace.lng)

        // Show results
        console.clear()
        console.log('\nInformation of the city\n'.green)
        console.log('City:', selPlace.nombre.green)
        console.log('Lat:', selPlace.lat)
        console.log('Lng:', selPlace.lng)
        console.log('Temperature:', weather.temp)
        console.log('Mín:', weather.min)
        console.log('Máx:', weather.max)
        console.log('How is the weather?:', weather.desc.green)

        break
      }

      case 2: {
        searches.capitalizedHistory.forEach((place, i) => {
          const idx = `${i + 1}.`.green
          console.log(`${idx} ${place} `)
        })

        break
      }
    }

    if (opt !== 0) await pause()
  } while (opt !== 0)
}
main()
