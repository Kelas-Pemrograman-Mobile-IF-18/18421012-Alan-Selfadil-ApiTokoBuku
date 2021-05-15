const buku = require('../model/Buku.js')
const response = require('../config/response')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

exports.inputDataBuku = (data, gambar) =>
new Promise(async (resolve, reject) => {
    const bukuBaru = new buku({
        kodeBuku: data.kodeBuku,
        judulBuku: data.judulBuku,
        penerbit: data.penerbit,
        pengarang: data.pengarang,
        tahunTerbit: data.tahunTerbit,
        hargaBuku: data.hargaBuku,
        gambar: gambar
    })

    await buku.findOne({kodeBuku: data.kodeBuku})
    .then(buku => {
        if (buku){
            reject(response.commonErrorMsg('Mofon Maaf Kode Buku Sudah Ada'))
        }else{
            bukuBaru.save()
                .then(r=>{
                    resolve(response.commonSuccessMsg('Berhasil Menginput Data'))
            }).catch(err => {
                    reject(response.commonErrorMsg('Mofon Maaf Gagal Menginput Data'))
            })
        }
    }).catch(err => {
        reject(response.commonErrorMsg('Mofon Maaf Terjadi Kesalahan Pada Server'))
    })
})

exports.lihatDataBuku = () =>
new Promise(async (resolve, reject) => {
    buku.find({})
    .then(result => {
        resolve(response.commonResult(result))
    })
    .catch(() => reject(response.commonErrorMsg('Mofon Maaf Terjadi Kesalahan Pada Server')))
})

exports.lihatDetailDataBuku = (kodeBuku) =>
new Promise(async (resolve, reject) => {
    buku.findOne({kodeBuku: kodeBuku})
    .then(result => {
        resolve(response.commonResult(result))
    })
    .catch(() => reject(response.commonErrorMsg('Mofon Maaf Terjadi Kesalahan Pada Server')))
})

exports.updateBuku = (id, data, gambar) =>
new Promise(async (resolve, reject) => {
    buku.updateOne(
        {_id : ObjectId(id)},
        {
            $set: {
                kodeBuku: data.kodeBuku,
                judulBuku: data.judulBuku,
                penerbit: data.penerbit,
                pengarang: data.pengarang,
                tahunTerbit: data.tahunTerbit,
                hargaBuku: data.hargaBuku,
                gambar: gambar
            }
        }
    ).then(buku => {
        resolve(response.commonSuccessMsg('Berhasil Menginput Data'))
    }).catch(err => {
        reject(response.commonErrorMsg('Mofon Maaf Gagal Menginput Data'))
    })
})


exports.hapusbuku = (_id) =>
new Promise(async (resolve, reject) => {
    await buku.remove({_id: ObjectId(_id)})
    .then(() => {
        resolve(response.commonSuccessMsg('Berhasil Menghapus Data'))
    }).catch(() => {
        reject(response.commonErrorMsg('Mofon Maaf Gagal Menghapus Data'))
    })
})