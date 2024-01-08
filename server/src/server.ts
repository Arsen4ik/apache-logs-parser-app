import express from 'express'
const app = express()
import cors from 'cors'
import { dumpTable } from '../utils/actions'

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.get('/', async (_, res) => {
    // console.log('/');
    // const valuesToDump = [
    //     { id: 1, main_point: 6, sex: 'male', age: '36-50', params: null, createdAt: '2023-11-29 22:06:47', updatedAt: '2023-11-29 22:06:47' },
    //     { id: 2, main_point: 10, sex: 'male', age: '36-50', params: null, createdAt: '2023-11-29 22:10:07', updatedAt: '2023-11-29 22:10:07' },
    //     { id: 3, main_point: 2, sex: 'male', age: '14-22', params: null, createdAt: '2023-11-29 22:13:59', updatedAt: '2023-11-29 22:13:59' },
    //     { id: 4, main_point: 9, sex: 'male', age: '36-50', params: null, createdAt: '2023-11-30 08:10:53', updatedAt: '2023-11-30 08:10:53' },
    //     { id: 5, main_point: 4, sex: 'male', age: '36-50', params: null, createdAt: '2023-12-04 18:49:03', updatedAt: '2023-12-04 18:49:03' },
    //     { id: 6, main_point: 4, sex: 'male', age: '36-50', params: null, createdAt: '2023-12-04 18:49:06', updatedAt: '2023-12-04 18:49:06' },
    //     { id: 7, main_point: 4, sex: 'female', age: '50+', params: null, createdAt: '2023-12-04 18:55:20', updatedAt: '2023-12-04 18:55:20' },
    //     { id: 8, main_point: 4, sex: 'male', age: '50+', params: null, createdAt: '2023-12-05 08:44:51', updatedAt: '2023-12-05 08:44:51' },
    // ]
    const dataToBack = await dumpTable()
    // createDumpTable(valuesToDump)

    res.json({ data: dataToBack })
})

export default app