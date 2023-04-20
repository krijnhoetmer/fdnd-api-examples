import express from 'express'

const app = express()

async function fetchJson(url) {
 return await fetch(url).then((response) => response.json()).catch((error) => error)
}

const data = {
 'buurtcampus': {
  api: 'https://api.buurtcampus-oost.fdnd.nl/api/v1/stekjes?first=10',
  title: 'Buurtcampus'
 },
 'coding-the-curbs': {
  api: 'https://api.codingthecurbs.fdnd.nl/api/v1/smartzones?first=20',
  title: 'Coding the Curbs'
 },
 'oba': {
  api: 'https://api.oba.fdnd.nl/api/v1/vestigingen?first=10',
  title: 'OBA'
 },
 'ultitv': {
  api: 'https://api.ultitv.fdnd.nl/api/v1/players?first=100',
  title: 'UltiTV'
 },
 'vervoerregio': {
  api: 'https://api.vervoerregio-amsterdam.fdnd.nl/api/v1/websites?first=20',
  title: 'Vervoerregio'
 },
 'vini-mini': {
  api: 'https://api.vinimini.fdnd.nl/api/v1/producten',
  title: 'Vini Mini'
 },
 'visual-thinking': {
  api: 'https://api.visualthinking.fdnd.nl/api/v1/methods?first=20',
  title: 'Visual Thinking'
 },
}

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(express.static('public'))

app.get('/', function(req, res) {
 res.render('home', {title: 'TODO', nav: data})
})

app.get('/:slug', function(req, res) {
 fetchJson(data[req.params.slug].api).then((json) => {
  res.render(req.params.slug, {title: data[req.params.slug].title, nav: data, data: json});
 })
})

app.set('port', 8000)

app.listen(app.get('port'), function() {
 console.log(`Application started on http://localhost:8000`)
})