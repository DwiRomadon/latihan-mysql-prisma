const express = require('express')
const app = express()
const port = 3000

const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

//Jika menggunakan method post/put wajib ditambahkan
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/data-karyawan', async (req, res) => {
    const dataKaryawan = await prisma.$queryRawUnsafe('SELECT * FROM karyawan')
    res.json(dataKaryawan)
})

app.get('/gaji-karyawan', async (req, res) => {
    const gajiKaryawan = await prisma.$queryRawUnsafe('SELECT * FROM karyawan INNER JOIN gaji_karyawan ON karyawan.nip=gaji_karyawan.nip')
    res.json(gajiKaryawan)
})

app.get('/cari-gaji-karyawan', async (req, res) => {
    const nip = req.query.nip
    const gajiKaryawan = await prisma.$queryRawUnsafe(`SELECT * FROM karyawan INNER JOIN gaji_karyawan ON karyawan.nip=gaji_karyawan.nip WHERE karyawan.nip = '${nip}'`)
    res.json(gajiKaryawan)
})

app.post('/input-karyawan', async (req, res) => {
    const nip = req.body.nip
    const nama = req.body.nama
    const noTelp = req.body.notelp
    const inpuData = await prisma.$queryRawUnsafe(`INSERT INTO karyawan VALUES (NULL, '${nip}', '${nama}', '${noTelp}')`)
    res.json({ pesan: 'Berhasil input data' })
})

//gaji-karyawan


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})