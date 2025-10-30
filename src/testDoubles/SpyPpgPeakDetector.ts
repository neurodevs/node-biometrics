import PpgPeakDetector from '../impl/PpgPeakDetector.js'
import { PpgPeakDetectorOptions } from '../types.js'

export default class SpyPpgPeakDetector extends PpgPeakDetector {
    public static callsToConstructor: PpgPeakDetectorOptions[] = []

    public constructor(options: PpgPeakDetectorOptions) {
        super(options)

        SpyPpgPeakDetector.callsToConstructor.push(options)
    }

    public getNumTaps() {
        return this.numTaps
    }

    public static resetTestDouble() {
        SpyPpgPeakDetector.callsToConstructor = []
    }
}
