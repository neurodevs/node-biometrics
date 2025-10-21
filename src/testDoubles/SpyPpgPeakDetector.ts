import PpgPeakDetector from '../impl/PpgPeakDetector'
import { PpgPeakDetectorOptions } from '../types'

export default class SpyPpgPeakDetector extends PpgPeakDetector {
    public static constructorHitCount = 0

    public static clear() {
        SpyPpgPeakDetector.constructorHitCount = 0
    }

    public constructor(options: PpgPeakDetectorOptions) {
        SpyPpgPeakDetector.constructorHitCount += 1
        super(options)
    }

    public getNumTaps() {
        return this.numTaps
    }
}
