import db from './db'

// type dataToDump = {
//     id: number,
//     main_point: number,
//     sex: string,
//     age: string,
//     params: null,
//     createdAt: string,
//     updatedAt: string,
// }

// export const createDumpTable = async (allDumpData: dataToDump[]) => {
//     await db.wp_s3cu_form_on_landing.deleteMany({})
//     allDumpData.map(async data => {
//         const nextDump = await db.wp_s3cu_form_on_landing.create({
//             data: {
//                 id: data.id,
//                 main_point: data.main_point,
//                 sex: data.sex,
//                 age: data.age,
//                 params: data.params,
//                 createdAt: data.createdAt,
//                 updatedAt: data.updatedAt,
//             }
//         })
//         console.log(nextDump);
//     })
// }

export const dumpTable = async () => {
    const allDumpData = await db.wp_s3cu_form_on_landing.findMany({})
    await db.wp_s3cu_form_on_landing.deleteMany({})

    const allDumpedData = await Promise.all(
        allDumpData.map(async (data) => {
            const nextDump = await db.wp_s3cu_form_on_landing.create({
                data: {
                    id: data.id,
                    main_point: data.main_point,
                    sex: data.sex,
                    age: data.age,
                    params: data.params,
                    createdAt: data.createdAt,
                    updatedAt: data.updatedAt,
                },
            });
            console.log(nextDump);
            return nextDump;
        })
    );

    console.log(allDumpedData);
    return allDumpedData;
};