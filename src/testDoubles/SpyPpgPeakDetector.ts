import PpgPeakDetector from '../impl/PpgPeakDetector'
import { PpgPeakDetectorOptions } from '../types'

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
