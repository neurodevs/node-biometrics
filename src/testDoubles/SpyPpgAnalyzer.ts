import PpgAnalyzerImpl from '../impl/PpgAnalyzer.js'
import { PpgAnalyzerOptions } from '../types.js'

export default class SpyPpgAnalyzer extends PpgAnalyzerImpl {
    public constructor(options: PpgAnalyzerOptions) {
        super(options)
    }

    public getSampleRate() {
        return this.sampleRate
    }

    public getDetector() {
        return this.detector
    }

    public calculateHeartRateVariability(rrIntervals: number[]) {
        return super.calculateHeartRateVariability(rrIntervals)
    }
}
