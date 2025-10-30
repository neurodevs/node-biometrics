import * as fs from 'fs'
import { parse } from 'fast-csv'

import { CsvRow } from '../types.js'

export async function loadCsv(filePath: string): Promise<CsvRow[]> {
    return new Promise((resolve, reject) => {
        const results: CsvRow[] = []

        fs.createReadStream(filePath)
            .pipe(parse({ headers: true }))
            .on('data', (row: CsvRow) => results.push(row))
            .on('end', () => resolve(results))
            .on('error', (error: any) => reject(error))
    })
}
